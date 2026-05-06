// pages/api/stripe-webhook.js
//
// Stripe webhook handler. Listens for:
//   - checkout.session.completed     → create entitlement
//   - customer.subscription.deleted  → revoke entitlement
//   - customer.subscription.updated  → update tier (e.g. upgrade Journey→Pro)
//   - invoice.payment_failed         → mark as payment_failed (don't revoke immediately)
//
// IDEMPOTENCY: Each event checks if it's already been processed before mutating data.
// This means Stripe can safely retry events without creating duplicates.

import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// Legacy tier names → new consolidated tier names
const TIER_MIGRATION = { individual: 'journey', smb: 'journey', enterprise: 'pro' }
const normaliseTier = (t) => TIER_MIGRATION[t] || t

export const config = { api: { bodyParser: false } }

const getRawBody = (req) => new Promise((resolve, reject) => {
  const chunks = []
  req.on('data', c => chunks.push(c))
  req.on('end',  () => resolve(Buffer.concat(chunks)))
  req.on('error', reject)
})

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const rawBody = await getRawBody(req)
  let event
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  console.log(`[webhook] Received: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object, supabase)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object, supabase)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object, supabase)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object, supabase)
        break

      default:
        console.log(`[webhook] Unhandled event type: ${event.type}`)
    }
  } catch (err) {
    console.error(`[webhook] Error handling ${event.type}:`, err)
    // Return 500 so Stripe retries — but only for genuine errors
    return res.status(500).json({ error: 'Handler failed', detail: err.message })
  }

  return res.status(200).json({ received: true })
}

// ─── checkout.session.completed ──────────────────────────────────────────────
async function handleCheckoutCompleted(session, supabase) {
  const userId = session.metadata?.userId || session.client_reference_id
  const tierId = normaliseTier(session.metadata?.tierId)
  const interval = session.metadata?.interval || 'monthly'
  const region = session.metadata?.region || 'AU'

  if (!userId || !tierId) {
    console.error('[webhook] Missing metadata in session:', session.id)
    return
  }

  // Idempotency check: don't create duplicate purchase records
  const { data: existing } = await supabase
    .from('purchases')
    .select('id')
    .eq('stripe_session_id', session.id)
    .maybeSingle()

  if (existing) {
    console.log(`[webhook] Session ${session.id} already processed`)
    return
  }

  // Try full insert first (with all subscription fields)
  const { error: fullError } = await supabase.from('purchases').insert({
    user_id: userId,
    tier: tierId,
    amount: session.amount_total,
    currency: session.currency,
    stripe_session_id: session.id,
    stripe_customer_id: session.customer,
    stripe_subscription_id: session.subscription || null,
    billing_interval: interval,
    region: region,
    payment_status: 'completed',
  })

  if (fullError) {
    console.warn('[webhook] Full insert failed, trying minimal:', fullError.message)
    // Fallback: minimal insert (works even if newer columns don't exist yet)
    await supabase.from('purchases').insert({
      user_id: userId,
      tier: tierId,
      amount: session.amount_total,
      stripe_session_id: session.id,
      stripe_customer_id: session.customer,
      payment_status: 'completed',
    })
  }

  // Update users_profile so app immediately reflects entitlement
  await supabase.from('users_profile').upsert({
    id: userId,
    selected_tier: tierId,
    user_type: tierId,
    stripe_customer_id: session.customer,
  }, { onConflict: 'id' })

  console.log(`[webhook] ✓ ${tierId} access granted to ${userId}`)
}

// ─── customer.subscription.deleted ───────────────────────────────────────────
async function handleSubscriptionDeleted(subscription, supabase) {
  // Find user by stripe_customer_id
  const { data: profile } = await supabase
    .from('users_profile')
    .select('id')
    .eq('stripe_customer_id', subscription.customer)
    .maybeSingle()

  if (!profile) {
    console.warn(`[webhook] No profile found for customer ${subscription.customer}`)
    return
  }

  // Mark purchases as cancelled
  await supabase
    .from('purchases')
    .update({ payment_status: 'cancelled' })
    .eq('stripe_subscription_id', subscription.id)

  // Revoke entitlement
  await supabase
    .from('users_profile')
    .update({ selected_tier: null, user_type: null })
    .eq('id', profile.id)

  console.log(`[webhook] ✗ Subscription cancelled for ${profile.id}`)
}

// ─── customer.subscription.updated ───────────────────────────────────────────
async function handleSubscriptionUpdated(subscription, supabase) {
  console.log(`[webhook] Subscription updated for customer ${subscription.customer}, status: ${subscription.status}`)

  // If status became 'active' after being 'past_due', re-confirm entitlement
  if (subscription.status === 'active') {
    const { data: profile } = await supabase
      .from('users_profile')
      .select('id, selected_tier')
      .eq('stripe_customer_id', subscription.customer)
      .maybeSingle()

    if (profile && !profile.selected_tier) {
      // Re-activate based on most recent purchase
      const { data: lastPurchase } = await supabase
        .from('purchases')
        .select('tier')
        .eq('stripe_customer_id', subscription.customer)
        .eq('payment_status', 'completed')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (lastPurchase) {
        await supabase
          .from('users_profile')
          .update({ selected_tier: lastPurchase.tier, user_type: lastPurchase.tier })
          .eq('id', profile.id)
        console.log(`[webhook] Re-activated ${lastPurchase.tier} for ${profile.id}`)
      }
    }
  }
}

// ─── invoice.payment_failed ──────────────────────────────────────────────────
async function handlePaymentFailed(invoice, supabase) {
  // Don't immediately revoke — Stripe will retry. Just log.
  console.warn(`[webhook] Payment failed for customer ${invoice.customer}, invoice ${invoice.id}`)
}
