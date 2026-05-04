// pages/api/create-checkout-session.js
import Stripe from 'stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  // Price mapping: tier + interval → Stripe price ID
  const priceMap = {
    journey: {
      monthly: process.env.STRIPE_PRICE_JOURNEY_MONTHLY,
      annual:  process.env.STRIPE_PRICE_JOURNEY_ANNUAL,
    },
    pro: {
      monthly: process.env.STRIPE_PRICE_PRO_MONTHLY,
      annual:  process.env.STRIPE_PRICE_PRO_ANNUAL,
    },
    // Legacy aliases
    individual: { monthly: process.env.STRIPE_PRICE_JOURNEY_MONTHLY, annual: process.env.STRIPE_PRICE_JOURNEY_ANNUAL },
    smb:        { monthly: process.env.STRIPE_PRICE_JOURNEY_MONTHLY, annual: process.env.STRIPE_PRICE_JOURNEY_ANNUAL },
    enterprise: { monthly: process.env.STRIPE_PRICE_PRO_MONTHLY,     annual: process.env.STRIPE_PRICE_PRO_ANNUAL },
  }

  const { tierId, interval = 'monthly', userId, email, name, promoCode } = req.body
  const tierPrices = priceMap[tierId]
  if (!tierPrices) return res.status(400).json({ error: 'Invalid tier' })
  const priceId = tierPrices[interval] || tierPrices.monthly
  if (!priceId) return res.status(400).json({ error: 'Stripe price not configured for this plan. Please contact support.' })

  try {
    // Build session params — allow_promotion_codes lets Stripe handle discount codes natively
    const sessionParams = {
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      customer_email: email,
      client_reference_id: userId,
      metadata: { userId, tierId, name, promoCode: promoCode || '' },
      allow_promotion_codes: true,  // Enables promo code field in Stripe Checkout UI
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?tier=${tierId}&interval=${interval}&payment_success=true`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/checkout?tier=${tierId}&interval=${interval}&cancelled=true`,
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
