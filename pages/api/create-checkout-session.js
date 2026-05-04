// pages/api/create-checkout-session.js
import Stripe from 'stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  // Region-aware price mapping: tier + interval + region → Stripe price ID
  const priceMap = {
    AU: {
      journey: {
        monthly: process.env.STRIPE_PRICE_JOURNEY_MONTHLY,
        annual:  process.env.STRIPE_PRICE_JOURNEY_ANNUAL,
      },
      pro: {
        monthly: process.env.STRIPE_PRICE_PRO_MONTHLY,
        annual:  process.env.STRIPE_PRICE_PRO_ANNUAL,
      },
    },
    IN: {
      journey: {
        monthly: process.env.STRIPE_PRICE_JOURNEY_MONTHLY_INR,
        annual:  process.env.STRIPE_PRICE_JOURNEY_ANNUAL_INR,
      },
      pro: {
        monthly: process.env.STRIPE_PRICE_PRO_MONTHLY_INR,
        annual:  process.env.STRIPE_PRICE_PRO_ANNUAL_INR,
      },
    },
  }

  // Legacy aliases (map old tier IDs to new structure)
  const tierAliasMap = { individual: 'journey', smb: 'journey', enterprise: 'pro' }

  const { tierId: rawTierId, interval = 'monthly', region = 'AU', userId, email, name, promoCode } = req.body
  const tierId = tierAliasMap[rawTierId] || rawTierId
  const safeRegion = priceMap[region] ? region : 'AU'
  const tierPrices = priceMap[safeRegion][tierId]
  if (!tierPrices) return res.status(400).json({ error: `Invalid plan: ${tierId}` })
  const priceId = tierPrices[interval]
  if (!priceId) {
    const envVarName = `STRIPE_PRICE_${tierId.toUpperCase()}_${interval.toUpperCase()}${safeRegion === 'IN' ? '_INR' : ''}`
    return res.status(400).json({ 
      error: `Stripe price not configured for ${tierId} ${interval} (${safeRegion}). Please set ${envVarName} in environment variables.` 
    })
  }

  console.log('[Stripe] Creating session for', { tierId, interval, region: safeRegion, priceId: priceId.substring(0, 12) + '...' }).json({ error: `Stripe price not configured for ${tierId} (${interval}). Please set ${interval === 'annual' ? tierPrices && 'STRIPE_PRICE_' + tierId.toUpperCase() + '_ANNUAL' : 'STRIPE_PRICE_' + tierId.toUpperCase() + '_MONTHLY'} in environment variables.` })

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
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?tier=${tierId}&interval=${interval}&region=${safeRegion}&payment_success=true`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/checkout?tier=${tierId}&interval=${interval}&region=${safeRegion}&cancelled=true`,
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
