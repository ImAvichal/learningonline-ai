// pages/api/create-checkout-session.js
//
// Three purchase paths, all region-aware:
//   1. Journey (fresh signup)  → SUBSCRIPTION mode, 7-day trial, card captured
//      today, charged once on day 8, then never renews (see webhook).
//   2. Pro (fresh purchase)    → PAYMENT mode, one-time, unchanged from before —
//      "leave instant buy for Pro" means this branch's behaviour is untouched.
//   3. Pro (upgrade from a Journey user who was ALREADY CHARGED)
//                              → PAYMENT mode, but the price is computed
//      server-side as (Pro price − amount actually paid for Journey), using
//      Stripe's inline price_data since the discount is unique per user.
//      A Journey user still mid-trial (never charged) does NOT get this
//      discount — they pay full Pro price, and the existing webhook logic
//      already cancels their pending trial subscription automatically.
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  // One MULTI-CURRENCY price per product (AUD default + INR/PHP/USD currency
  // options on the same Price object) — same pattern as the existing one-time
  // prices. JOURNEY_TRIAL must be a RECURRING (monthly) price — Stripe trials
  // only exist on subscriptions — but because we cancel it after the single
  // charge (see webhook), it behaves as a one-off fee to the customer.
  const priceMap = {
    journey: process.env.STRIPE_PRICE_JOURNEY_ONETIME,   // used only for legacy/demo fallback
    journeyTrial: process.env.STRIPE_PRICE_JOURNEY_TRIAL, // the real Journey signup path
    pro:     process.env.STRIPE_PRICE_PRO_ONETIME,
  }
  const currencyByRegion = { AU: 'aud', IN: 'inr', PH: 'php', US: 'usd' }
  // Regional Pro/Journey list prices in MINOR units (cents/paise/centavos),
  // for computing an upgrade discount. Mirrors data/tiers.js REGIONAL_PRICING
  // — kept here in minor units since that's what Stripe/purchases.amount use.
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

  if (!['journey', 'pro'].includes(tierId)) {
    return res.status(400).json({ error: `Invalid plan: ${tierId}` })
  }

  console.log('[Stripe] Creating session for', { tierId, region: safeRegion })

  try {
    const baseParams = {
      payment_method_types: ['card'],
      currency: currencyByRegion[safeRegion],
      customer_creation: 'always',
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

    // ── PATH 1: Journey — 7-day free trial, card captured now, charged once
    let session

    if (tierId === 'journey') {
      const priceId = priceMap.journeyTrial
      if (!priceId) {
        return res.status(400).json({
          error: 'Stripe price not configured for the Journey trial. Please set STRIPE_PRICE_JOURNEY_TRIAL in environment variables (a RECURRING multi-currency price).',
        })
      }
      session = await stripe.checkout.sessions.create({
        ...baseParams,
        mode: 'subscription',
        line_items: [{ price: priceId, quantity: 1 }],
        // Force card capture even though $0 is due today (default Checkout
        // behaviour may skip payment-method collection when nothing is due).
        payment_method_collection: 'always',
        subscription_data: {
          trial_period_days: 7,
          metadata: { userId, tierId: 'journey', region: safeRegion, name: name || '', purchaseType: 'trial' },
        },
        metadata: { userId, tierId: 'journey', region: safeRegion, name: name || '', purchaseType: 'trial' },
      })

    // ── PATH 2 & 3: Pro — instant buy (fresh) or upgrade (discounted) ──
    } else {
      if (!userId) return res.status(400).json({ error: 'Missing userId' })

      // Detect an upgrade: has this user ALREADY BEEN CHARGED for Journey?
      // (payment_status='completed' AND amount > 0 — a purchase row with
      // amount=0 means they're still mid-trial and haven't paid yet, so they
      // are NOT eligible for the discount and pay full Pro price instead.)
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
      const { data: journeyPurchases } = await supabase
        .from('purchases')
        .select('amount, currency, created_at')
        .eq('user_id', userId)
        .eq('tier', 'journey')
        .eq('payment_status', 'completed')
        .gt('amount', 0)
        .order('created_at', { ascending: false })
        .limit(1)

      const alreadyPaid = journeyPurchases?.[0]?.amount || 0
      const proListPriceMinor = MINOR_UNIT_PRICING[safeRegion].pro

      if (alreadyPaid > 0) {
        // Upgrade path — charge only the difference, floored at a minimum of
        // 50 minor units (Stripe's practical minimum charge) to avoid a $0
        // line item; if the credit fully covers Pro, treat as a free upgrade.
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
          mode: 'payment',
          line_items: [{
            price_data: {
              currency: currencyByRegion[safeRegion],
              product_data: { name: 'LeO AI — Pro (upgrade from Journey)' },
              unit_amount: diff,
              tax_behavior: 'inclusive',
            },
            quantity: 1,
          }],
          invoice_creation: { enabled: true },
          metadata: { userId, tierId: 'pro', region: safeRegion, name: name || '', purchaseType: 'upgrade' },
        })
      } else {
        // Fresh Pro purchase — unchanged, exactly as before.
        const priceId = priceMap.pro
        if (!priceId) {
          return res.status(400).json({ error: 'Stripe price not configured for pro. Please set STRIPE_PRICE_PRO_ONETIME in environment variables.' })
        }
        session = await stripe.checkout.sessions.create({
          ...baseParams,
          mode: 'payment',
          line_items: [{ price: priceId, quantity: 1 }],
          invoice_creation: { enabled: true },
          metadata: { userId, tierId: 'pro', region: safeRegion, name: name || '', purchaseType: 'fresh' },
        })
      }
    }

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    res.status(500).json({ error: err.message })
  }
}
