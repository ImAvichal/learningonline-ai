// pages/api/create-checkout-session.js
//
// One-time purchases for both tiers (mode: 'payment', charged immediately —
// no trial). Two paths, both region-aware:
//   1. Fresh purchase  — full price for the tier being bought.
//   2. Upgrade         — if the user already has a COMPLETED, actually-paid
//      purchase of the lower tier (Journey), Pro is priced as the
//      difference, computed server-side via Stripe's inline price_data
//      since the exact discount is unique per user (it depends on what they
//      actually paid, not just today's list price).
// Both tiers carry a 7-day money-back guarantee (handled as a manual refund
// via Stripe, not a delayed/trial charge) — see pages/checkout.js copy.
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  // One MULTI-CURRENCY price per tier (AUD default + INR/PHP/USD currency
  // options on the same Price object). The session's `currency` param below
  // selects which option Stripe presents, keeping it in lock-step with the
  // region OUR site showed the user.
  const priceMap = {
    journey: process.env.STRIPE_PRICE_JOURNEY_ONETIME,
    pro:     process.env.STRIPE_PRICE_PRO_ONETIME,
  }
  const currencyByRegion = { AU: 'aud', IN: 'inr', PH: 'php', US: 'usd' }
  // Regional list prices in MINOR units (cents/paise/centavos), for computing
  // an upgrade discount. Mirrors data/tiers.js REGIONAL_PRICING.
  const MINOR_UNIT_PRICING = {
    AU: { journey: 14900, pro: 29900 },
    US: { journey: 9900,  pro: 19900 },
    IN: { journey: 49900, pro: 199900 },
    PH: { journey: 59900, pro: 199900 },
  }

  const tierAliasMap = { individual: 'journey', smb: 'journey', enterprise: 'pro' }
  const { tierId: rawTierId, region = 'AU', userId, email, name, promoCode } = req.body
  const tierId = tierAliasMap[rawTierId] || rawTierId

  // ANTI-ARBITRAGE: billing region is derived SERVER-SIDE from the request's
  // own geolocation (Vercel edge header). The client-supplied region is only a
  // fallback for local dev, where geo headers don't exist.
  const geoCountry = req.headers['x-vercel-ip-country'] || null
  const geoRegion = geoCountry ? ({ IN: 'IN', PH: 'PH', US: 'US' }[geoCountry] || 'AU') : null
  const safeRegion = geoRegion || (currencyByRegion[region] ? region : 'AU')

  if (!priceMap.hasOwnProperty(tierId)) return res.status(400).json({ error: `Invalid plan: ${tierId}` })

  console.log('[Stripe] Creating session for', { tierId, region: safeRegion })

  try {
    const baseParams = {
      payment_method_types: ['card'],
      mode: 'payment',
      currency: currencyByRegion[safeRegion],
      customer_creation: 'always',
      invoice_creation: { enabled: true },
      customer_email: email,
      client_reference_id: userId,
      allow_promotion_codes: true,
      automatic_tax: { enabled: true },
      tax_id_collection: { enabled: true },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/pricing?cancelled=true`,
    }
    if (promoCode && promoCode.startsWith('promo_')) {
      baseParams.discounts = [{ promotion_code: promoCode }]
    }

    let session

    // ── Upgrade detection: only Pro purchases can be an upgrade (there's
    // nothing lower than Journey to upgrade from). Checks for a COMPLETED,
    // actually-paid Journey purchase — amount > 0 rules out any edge case
    // where a purchase row exists but nothing was ever charged. ──
    if (tierId === 'pro' && userId) {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
      const { data: journeyPurchases } = await supabase
        .from('purchases')
        .select('amount, currency')
        .eq('user_id', userId)
        .eq('tier', 'journey')
        .eq('payment_status', 'completed')
        .gt('amount', 0)
        .order('created_at', { ascending: false })
        .limit(1)

      const lastJourneyPurchase = journeyPurchases?.[0] || null
      // SAFETY: only credit the previous purchase if it was made in the SAME
      // currency as this checkout. Subtracting an amount recorded in one
      // currency (e.g. USD cents) from a Pro price in another (e.g. INR
      // paise) is comparing different units and produces a nonsensical,
      // under-charged result — this guard is what prevents that.
      const currencyMatches = lastJourneyPurchase?.currency?.toLowerCase() === currencyByRegion[safeRegion]
      const alreadyPaid = currencyMatches ? lastJourneyPurchase.amount : 0

      if (lastJourneyPurchase && !currencyMatches) {
        console.warn('[Stripe] Upgrade purchase found but currency mismatch — not discounting.',
          'Recorded:', lastJourneyPurchase.currency, '| Current:', currencyByRegion[safeRegion])
      }

      if (alreadyPaid > 0) {
        const proListPriceMinor = MINOR_UNIT_PRICING[safeRegion].pro
        const diff = Math.max(proListPriceMinor - alreadyPaid, 0)
        console.log('[Stripe] Upgrade detected — already paid', alreadyPaid, '| Pro list', proListPriceMinor, '| charging', diff)

        if (diff <= 0) {
          // Fully covered — grant Pro directly without a Stripe charge.
          await supabase.from('users_profile').update({ selected_tier: 'pro', user_type: 'pro' }).eq('id', userId)
          await supabase.from('purchases').insert({
            user_id: userId, tier: 'pro', amount: 0, currency: currencyByRegion[safeRegion],
            payment_status: 'completed', region: safeRegion,
          })
          return res.status(200).json({ url: `${process.env.NEXT_PUBLIC_APP_URL}/success?upgraded=true` })
        }

        session = await stripe.checkout.sessions.create({
          ...baseParams,
          line_items: [{
            price_data: {
              currency: currencyByRegion[safeRegion],
              product_data: { name: 'LeO AI — Pro (upgrade from Journey)' },
              unit_amount: diff,
              tax_behavior: 'inclusive',
            },
            quantity: 1,
          }],
          metadata: { userId, tierId: 'pro', region: safeRegion, name: name || '', purchaseType: 'upgrade' },
        })
      }
    }

    // ── Fresh purchase (Journey, or Pro with no prior Journey purchase) ──
    if (!session) {
      const priceId = priceMap[tierId]
      if (!priceId) {
        return res.status(400).json({
          error: `Stripe price not configured for ${tierId}. Please set STRIPE_PRICE_${tierId.toUpperCase()}_ONETIME in environment variables.`,
        })
      }
      session = await stripe.checkout.sessions.create({
        ...baseParams,
        line_items: [{ price: priceId, quantity: 1 }],
        metadata: { userId, tierId, region: safeRegion, name: name || '', purchaseType: 'fresh' },
      })
    }

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    res.status(500).json({ error: err.message })
  }
}
