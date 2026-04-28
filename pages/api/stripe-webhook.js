// pages/api/stripe-webhook.js
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export const config = { api: { bodyParser: false } }

const getRawBody = (req) => new Promise((resolve, reject) => {
  const chunks = []
  req.on('data', c => chunks.push(c))
  req.on('end',  () => resolve(Buffer.concat(chunks)))
  req.on('error', reject)
})

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const stripe   = new Stripe(process.env.STRIPE_SECRET_KEY)
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

  const rawBody = await getRawBody(req)
  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const { userId, tierId, name } = session.metadata

    try {
      // Update user profile with tier
      await supabase.from('users_profile').upsert({
        id:                userId,
        selected_tier:     tierId,
        user_type:         tierId,
        stripe_customer_id: session.customer,
      }, { onConflict: 'id' })

      // Record purchase
      await supabase.from('purchases').insert({
        user_id:          userId,
        tier:             tierId,
        amount:           session.amount_total,
        stripe_session_id: session.id,
        payment_status:   'completed',
      })

      console.log(`✓ ${tierId} access granted to ${userId}`)
    } catch (err) {
      console.error('DB error after payment:', err)
      return res.status(500).json({ error: 'DB update failed' })
    }
  }

  res.status(200).json({ received: true })
}
