// pages/api/stripe-webhook.js
// Receives Stripe payment events and grants course access in Supabase.
// Set your webhook endpoint in Stripe Dashboard to:
//   https://learningonline.ai/api/stripe-webhook
// Events to listen for: checkout.session.completed

import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// Disable body parsing — Stripe needs raw body for signature verification
export const config = { api: { bodyParser: false } }

const getRawBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', c => chunks.push(c))
    req.on('end',  () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const stripe   = new Stripe(process.env.STRIPE_SECRET_KEY)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // service role bypasses RLS
  )

  const rawBody = await getRawBody(req)
  const sig     = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const { userId, tierId, name } = session.metadata

    try {
      // 1. Grant course access
      const { error: userErr } = await supabase
        .from('users')
        .upsert({
          id:                 userId,
          tier:               tierId,
          user_type:          tierId,
          stripe_customer_id: session.customer,
          enrolled_at:        new Date().toISOString(),
        }, { onConflict: 'id' })

      if (userErr) throw userErr

      // 2. Record payment
      const { error: payErr } = await supabase
        .from('payments')
        .insert({
          user_id:               userId,
          stripe_session_id:     session.id,
          stripe_payment_intent: session.payment_intent,
          tier:                  tierId,
          amount:                session.amount_total,
          currency:              session.currency,
          status:                'completed',
        })

      if (payErr) throw payErr

      console.log(`✓ ${tierId} access granted to user ${userId}`)
    } catch (err) {
      console.error('DB error after payment:', err)
      return res.status(500).json({ error: 'Database update failed' })
    }
  }

  res.status(200).json({ received: true })
}
