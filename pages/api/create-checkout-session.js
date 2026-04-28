// pages/api/create-checkout-session.js
import Stripe from 'stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  const priceMap = {
    individual: process.env.STRIPE_PRICE_INDIVIDUAL, // $99
    smb:        process.env.STRIPE_PRICE_SMB,        // $299
    enterprise: process.env.STRIPE_PRICE_ENTERPRISE, // $399
  }

  const { tierId, userId, email, name } = req.body
  const priceId = priceMap[tierId]
  if (!priceId) return res.status(400).json({ error: 'Invalid tier' })

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      customer_email: email,
      client_reference_id: userId,
      metadata: { userId, tierId, name },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?tier=${tierId}&payment_success=true`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/checkout?tier=${tierId}&cancelled=true`,
    })
    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    res.status(500).json({ error: err.message })
  }
}
