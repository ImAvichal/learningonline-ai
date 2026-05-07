// pages/api/verify-checkout.js
//
// PURPOSE: Defensive backup for entitlement creation.
//
// The Stripe webhook is the PRIMARY mechanism that grants entitlements.
// But webhooks can be:
//   - Delayed (especially in cold-start serverless environments)
//   - Missed (if signature verification fails or function crashes)
//   - Misconfigured (if the user hasn't set up the webhook endpoint)
//
// This endpoint is called from the /success page and:
//   1. Verifies the Stripe session is genuinely paid (server-to-server)
//   2. Idempotently creates the entitlement if not already created
//   3. Returns the tier info so the success page can show confirmation
//
// IDEMPOTENCY: Safe to call multiple times — checks for existing record
// before inserting. Webhook + this endpoint cannot create duplicates.

import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// Legacy tier names → new consolidated tier names
const TIER_MIGRATION = { individual: 'journey', smb: 'journey', enterprise: 'pro' }
const normaliseTier = (t) => TIER_MIGRATION[t] || t

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { session_id } = req.body
  if (!session_id) return res.status(400).json({ error: 'Missing session_id' })

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    // Step 1: Retrieve the session from Stripe (server-to-server, can't be spoofed)
    const session = await stripe.checkout.sessions.retrieve(session_id)

    // Step 2: Verify it was actually paid
    if (session.payment_status !== 'paid') {
      return res.status(400).json({
        error: `Payment not completed. Status: ${session.payment_status}`,
      })
    }

    // Step 3: Extract entitlement details from session metadata
    const userId = session.metadata?.userId || session.client_reference_id
    const tierId = normaliseTier(session.metadata?.tierId)
    const interval = session.metadata?.interval || 'monthly'

    if (!userId || !tierId) {
      return res.status(400).json({
        error: 'Session missing required metadata (userId/tierId)',
      })
    }

    // Step 4: Idempotently create/update entitlement
    // Check if purchase already exists for this session_id (avoids duplicate from webhook)
    const { data: existingPurchase } = await supabase
      .from('purchases')
      .select('id, tier, payment_status')
      .eq('stripe_session_id', session_id)
      .maybeSingle()

    if (!existingPurchase) {
      // Webhook hasn't fired yet — create entitlement now
      console.log(`[verify-checkout] Creating entitlement (webhook fallback) for user ${userId}, tier ${tierId}`)

      // Insert purchase record
      const { error: purchaseError } = await supabase.from('purchases').insert({
        user_id: userId,
        tier: tierId,
        amount: session.amount_total,
        currency: session.currency,
        stripe_session_id: session_id,
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription || null,
        billing_interval: interval,
        payment_status: 'completed',
      })

      if (purchaseError) {
        console.error('[verify-checkout] Purchase insert error:', purchaseError)
        // Try minimal insert (in case some fields don't exist in user's DB)
        await supabase.from('purchases').insert({
          user_id: userId,
          tier: tierId,
          amount: session.amount_total,
          stripe_session_id: session_id,
          payment_status: 'completed',
        })
      }

      // Update users_profile so app immediately reflects entitlement
      await supabase
        .from('users_profile')
        .update({
          selected_tier: tierId,
          user_type: tierId,
          stripe_customer_id: session.customer,
        })
        .eq('id', userId)
    } else {
      // Webhook already created it — just ensure profile is in sync
      console.log(`[verify-checkout] Entitlement already exists for ${userId} (webhook fired)`)

      // Defensive: make sure profile reflects the tier (fixes legacy edge cases)
      await supabase
        .from('users_profile')
        .update({
          selected_tier: tierId,
          user_type: tierId,
        })
        .eq('id', userId)
    }

    return res.status(200).json({
      success: true,
      tierId,
      interval,
      amount: session.amount_total,
      currency: session.currency,
    })
  } catch (err) {
    console.error('[verify-checkout] Error:', err)
    return res.status(500).json({
      error: err.message || 'Verification failed',
    })
  }
}
