// pages/api/create-checkout-session.js
import Stripe from 'stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  const priceMap = {
    individual: process.env.STRIPE_PRICE_INDIVIDUAL, // $49
    smb:        process.env.STRIPE_PRICE_SMB,        // $99
    enterprise: process.env.STRIPE_PRICE_ENTERPRISE, // $149
  }

  const { tierId, userId, email, name, promoCode } = req.body
  const priceId = priceMap[tierId]
  if (!priceId) return res.status(400).json({ error: 'Invalid tier' })

  try {
    // Build session params — allow_promotion_codes lets Stripe handle discount codes natively
    const sessionParams = {
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      customer_email: email,
      client_reference_id: userId,
      metadata: { userId, tierId, name, promoCode: promoCode || '' },
      allow_promotion_codes: true,  // Enables promo code field in Stripe Checkout UI
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?tier=${tierId}&payment_success=true`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/checkout?tier=${tierId}&cancelled=true`,
    }

    // If a specific Stripe promotion code ID is passed, apply it directly
    if (promoCode && promoCode.startsWith('promo_')) {
      sessionParams.discounts = [{ promotion_code: promoCode }]
      delete sessionParams.allow_promotion_codes
    }

    const session = await stripe.checkout.sessions.create(sessionParams)
    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    res.status(500).json({ error: err.message })
  }
}
