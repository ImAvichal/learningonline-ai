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
import { sendPurchaseConfirmation, sendPaymentFailedEmail } from '../../lib/emails'

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
        await handlePaymentFailed(event.data.object, supabase, stripe)
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
    journey_expires_at: null,
    journey_reminder_sent_at: null,
  }, { onConflict: 'id' })

  console.log(`[webhook] ✓ ${tierId} access granted to ${userId}`)

  // ── Upgrade handling: if this purchase is Pro, look for any existing
  //    Journey subscription for this user and cancel it in Stripe so the
  //    customer isn't billed twice.
  //
  //    Soft-failure design: if cancellation fails (e.g. restricted Stripe key,
  //    already cancelled, network issue), we LOG with a clear marker but DO
  //    NOT fail the new purchase. The customer's Pro access is unaffected;
  //    the worst case is a manual cleanup of one subscription in Stripe.
  if (tierId === 'pro') {
    try {
      const { data: oldPurchases, error: oldErr } = await supabase
        .from('purchases')
        .select('stripe_subscription_id, tier')
        .eq('user_id', userId)
        .eq('tier', 'journey')
        .eq('payment_status', 'completed')
        .not('stripe_subscription_id', 'is', null)

      if (oldErr) {
        console.warn('[webhook] Could not query old subscriptions:', oldErr.message)
      } else if (oldPurchases?.length) {
        for (const old of oldPurchases) {
          if (!old.stripe_subscription_id) continue
          // Safety: never cancel the subscription that was JUST created
          if (old.stripe_subscription_id === session.subscription) continue

          try {
            await stripe.subscriptions.cancel(old.stripe_subscription_id)
            await supabase
              .from('purchases')
              .update({ payment_status: 'cancelled' })
              .eq('stripe_subscription_id', old.stripe_subscription_id)
            console.log(`[webhook] ✓ Cancelled old ${old.tier} subscription ${old.stripe_subscription_id} (user upgraded to pro)`)
          } catch (cancelErr) {
            // Distinguish "already cancelled" (benign) from other errors (need attention)
            const msg = cancelErr.message || String(cancelErr)
            if (msg.includes('No such subscription') || msg.includes('already been canceled')) {
              console.log(`[webhook] Old subscription ${old.stripe_subscription_id} was already cancelled — skipping`)
              await supabase
                .from('purchases')
                .update({ payment_status: 'cancelled' })
                .eq('stripe_subscription_id', old.stripe_subscription_id)
            } else {
              console.error(`[webhook] ⚠️ MANUAL ACTION REQUIRED: Could not cancel old subscription ${old.stripe_subscription_id} for user ${userId} — please cancel in Stripe Dashboard. Reason: ${msg}`)
            }
          }
        }
      } else {
        // Not an upgrade — fresh Pro purchase, nothing to cancel
        console.log(`[webhook] No prior Journey subscription found for ${userId} — nothing to cancel`)
      }
    } catch (err) {
      // Outer guard: any unexpected error must NEVER fail the new purchase
      console.error('[webhook] Upgrade old-sub cleanup error (non-fatal):', err.message)
    }
  }

  // ── Send branded confirmation email (gracefully no-ops if RESEND_API_KEY missing) ──
  // We fetch profile here for the email — defensive in case earlier read failed.
  try {
    const { data: profile } = await supabase
      .from('users_profile')
      .select('email, full_name')
      .eq('id', userId)
      .limit(1)
    const recipient = profile?.[0]
    if (recipient?.email) {
      await sendPurchaseConfirmation({
        to: recipient.email,
        name: recipient.full_name,
        tier: tierId,
        interval,
        amount: session.amount_total,
        currency: session.currency,
        region,
      })
    } else {
      console.warn('[webhook] No profile email found for confirmation send')
    }
  } catch (err) {
    // Email failure must NEVER fail the webhook — log and continue.
    console.error('[webhook] Confirmation email error (non-fatal):', err.message)
  }
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

  // IMPORTANT: a Journey trial subscription is only ever "cancelled" for two
  // very different reasons, and they must NOT be treated the same:
  //   (a) cancelled DURING the trial, before the day-8 charge — genuinely
  //       nothing was paid; access should be revoked.
  //   (b) the subscription object cancelled AFTER the day-8 charge already
  //       succeeded (either our own cancel_at_period_end housekeeping, or a
  //       confused customer clicking "cancel" in the portal on what is now a
  //       vestigial object) — they already paid and OWN Journey permanently;
  //       revoking here would incorrectly take away something they bought.
  // We distinguish by checking whether a completed purchase with amount > 0
  // exists for this subscription.
  const { data: paidPurchase } = await supabase
    .from('purchases')
    .select('id, amount')
    .eq('stripe_subscription_id', subscription.id)
    .eq('payment_status', 'completed')
    .gt('amount', 0)
    .maybeSingle()

  if (paidPurchase) {
    console.log(`[webhook] Subscription ${subscription.id} deleted, but it was already charged (purchase ${paidPurchase.id}) — access NOT revoked, this is expected post-charge housekeeping.`)
    return
  }

  // Mark purchases as cancelled (only reaches here for genuinely-unpaid trials)
  await supabase
    .from('purchases')
    .update({ payment_status: 'cancelled' })
    .eq('stripe_subscription_id', subscription.id)

  // Revoke entitlement — drop to the free 'parents' base, never null.
  await supabase
    .from('users_profile')
    .update({ selected_tier: 'parents', user_type: 'parents' })
    .eq('id', profile.id)

  console.log(`[webhook] ✗ Trial cancelled before charge for ${profile.id} — reverted to parents`)
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
// Neither tier uses subscriptions as of v2.3 (both charge immediately via
// mode: 'payment', which doesn't generate Invoice objects at all — a failed
// card is handled synchronously on Stripe's own checkout page, never reaches
// this webhook). Kept as harmless defensive handling in case a future
// subscription-based product is added.
async function handlePaymentFailed(invoice, supabase, stripe) {
  console.warn(`[webhook] Payment failed for customer ${invoice.customer}, invoice ${invoice.id}`)
  try {
    const { data: profile } = await supabase
      .from('users_profile')
      .select('id, email, full_name')
      .eq('stripe_customer_id', invoice.customer)
      .maybeSingle()
    if (profile?.email) {
      await sendPaymentFailedEmail({ to: profile.email, name: profile.full_name, amount: invoice.amount_due, currency: invoice.currency })
    }
  } catch (err) {
    console.error('[webhook] Payment-failed email error (non-fatal):', err.message)
  }
}

