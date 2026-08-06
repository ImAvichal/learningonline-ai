// pages/api/create-checkout-session.js
import Stripe from 'stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  // Region-aware ONE-TIME price mapping: tier + region → Stripe price ID (non-recurring)
  // One MULTI-CURRENCY price per tier (AUD default + INR/PHP/USD currency
  // options on the same Price object). The session's `currency` param below
  // selects which option Stripe presents, keeping it in lock-step with the
  // region OUR site showed the user.
  const priceMap = {
    journey: process.env.STRIPE_PRICE_JOURNEY_ONETIME,
    pro:     process.env.STRIPE_PRICE_PRO_ONETIME,
  }
  const currencyByRegion = { AU: 'aud', IN: 'inr', PH: 'php', US: 'usd' }

  // Legacy aliases (map old tier IDs to new structure)
  const tierAliasMap = { individual: 'journey', smb: 'journey', enterprise: 'pro' }

  const { tierId: rawTierId, interval = 'monthly', region = 'AU', userId, email, name, promoCode } = req.body
  const tierId = tierAliasMap[rawTierId] || rawTierId
  const safeRegion = currencyByRegion[region] ? region : 'AU'
  if (!priceMap.hasOwnProperty(tierId)) return res.status(400).json({ error: `Invalid plan: ${tierId}` })
  const priceId = priceMap[tierId]
  if (!priceId) {
    return res.status(400).json({
      error: `Stripe price not configured for ${tierId}. Please set STRIPE_PRICE_${tierId.toUpperCase()}_ONETIME in environment variables.`
    })
  }

  console.log('[Stripe] Creating session for', { tierId, interval, region: safeRegion, priceId: priceId.substring(0, 12) + '...' })

  try {
    // Build session params — allow_promotion_codes lets Stripe handle discount codes natively
    const sessionParams = {
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      // Present the currency our site promised for this region (multi-currency price).
      currency: currencyByRegion[safeRegion],
      // One-time model: create a Customer + a proper invoice so buyers can
      // expense the purchase and ABN details land on it.
      customer_creation: 'always',
      invoice_creation: { enabled: true },
      customer_email: email,
      client_reference_id: userId,
      metadata: { userId, tierId, interval, region: safeRegion, name: name || '', promoCode: promoCode || '' },
      allow_promotion_codes: true,  // Enables promo code field in Stripe Checkout UI

      // ── Tax handling ────────────────────────────────────────────────────
      // Stripe Tax: automatically calculate GST for AU customers (10% inclusive),
      // treat US/IN/PH as export of services (no AU GST).
      // Requires: each Price object in Stripe has tax_behavior=inclusive + a tax code.
      automatic_tax: { enabled: true },

      // Required when automatic_tax is enabled — lets Stripe update the customer
      // record with the billing address it collects (so future invoices are correct).
      customer_update: undefined,  // set conditionally below — see note

      // Let business customers enter their ABN so it appears on the invoice
      tax_id_collection: { enabled: true },

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/pricing?cancelled=true`,
    }

    // customer_update is only valid when there's a customer attached (not just customer_email).
    // For Stripe Checkout's subscription mode, Stripe creates the customer automatically,
    // so we can safely set address/name update fields. Remove the placeholder so Stripe handles it.
    delete sessionParams.customer_update

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
