// pages/api/create-portal-session.js
//
// Creates a Stripe Customer Billing Portal session for the logged-in user.
// The portal is a Stripe-hosted page where the customer can:
//   - cancel their subscription
//   - update payment method
//   - view/download invoices
//
// When a customer cancels via the portal, Stripe fires
// `customer.subscription.deleted`, which our stripe-webhook.js already
// handles by revoking the user's entitlement. So there is nothing to build
// on our side beyond creating the session and redirecting.
//
// Flow:
//   1. Client POSTs { userId }
//   2. We look up the user's stripe_customer_id in Supabase
//   3. We create a portal session for that customer
//   4. We return the portal URL; client redirects to it

import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { userId } = req.body || {}
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    // Look up the Stripe customer ID for this user
    const { data: profile, error } = await supabase
      .from('users_profile')
      .select('stripe_customer_id')
      .eq('id', userId)
      .maybeSingle()

    if (error) {
      console.error('[portal] Supabase lookup error:', error.message)
      return res.status(500).json({ error: 'Could not look up your account.' })
    }

    if (!profile?.stripe_customer_id) {
      // No Stripe customer means no paid subscription to manage.
      return res.status(404).json({
        error: 'No active subscription found. If you believe this is an error, please contact support.',
      })
    }

    // Create the billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/account`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    // Most common cause: the Customer Portal hasn't been activated in the
    // Stripe Dashboard (Settings → Billing → Customer portal). The error
    // message from Stripe is explicit about this.
    console.error('[portal] Error creating portal session:', err.message)
    return res.status(500).json({
      error: 'Could not open the billing portal. Please try again or contact support.',
    })
  }
}
