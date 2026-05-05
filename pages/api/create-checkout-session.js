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
    PH: {
      journey: {
        monthly: process.env.STRIPE_PRICE_JOURNEY_MONTHLY_PHP,
        annual:  process.env.STRIPE_PRICE_JOURNEY_ANNUAL_PHP,
      },
      pro: {
        monthly: process.env.STRIPE_PRICE_PRO_MONTHLY_PHP,
        annual:  process.env.STRIPE_PRICE_PRO_ANNUAL_PHP,
      },
    },
    US: {
      journey: {
        monthly: process.env.STRIPE_PRICE_JOURNEY_MONTHLY_USD,
        annual:  process.env.STRIPE_PRICE_JOURNEY_ANNUAL_USD,
      },
      pro: {
        monthly: process.env.STRIPE_PRICE_PRO_MONTHLY_USD,
        annual:  process.env.STRIPE_PRICE_PRO_ANNUAL_USD,
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
    const suffixMap = { AU: '', IN: '_INR', PH: '_PHP', US: '_USD' }
    const envVarName = `STRIPE_PRICE_${tierId.toUpperCase()}_${interval.toUpperCase()}${suffixMap[safeRegion] || ''}`
    return res.status(400).json({ 
      error: `Stripe price not configured for ${tierId} ${interval} (${safeRegion}). Please set ${envVarName} in environment variables.` 
    })
  }

  console.log('[Stripe] Creating session for', { tierId, interval, region: safeRegion, priceId: priceId.substring(0, 12) + '...' })

  try {
    // Build session params — allow_promotion_codes lets Stripe handle discount codes natively
    const sessionParams = {
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      customer_email: email,
      client_reference_id: userId,
      metadata: { userId, tierId, interval, region: safeRegion, name: name || '', promoCode: promoCode || '' },
      allow_promotion_codes: true,  // Enables promo code field in Stripe Checkout UI
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/pricing?cancelled=true`,
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
