// pages/api/create-checkout-session.js
// One-time Journey / Pro purchases. Regional amounts are defined server-side
// and sent to Stripe as inline price_data so the amount charged cannot drift
// from the launch pricing shown by the application.
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const CURRENCY_BY_REGION = { AU: 'aud', IN: 'inr', PH: 'php', US: 'usd' }
const MINOR_UNIT_PRICING = {
  AU: { journey: 14900, pro: 29900 },
  US: { journey: 9900,  pro: 19900 },
  IN: { journey: 49900, pro: 199900 },
  PH: { journey: 33000, pro: 199900 },
}
const TIER_NAMES = {
  journey: 'LeO AI — Starting the Journey',
  pro: 'LeO AI — The Pro',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(503).json({ error: 'Payments are temporarily unavailable.' })
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(503).json({ error: 'Account service is temporarily unavailable.' })
  }

  const tierAliasMap = { individual: 'journey', smb: 'journey', enterprise: 'pro' }
  const { tierId: rawTierId, region = 'AU', name, promoCode } = req.body || {}
  const tierId = tierAliasMap[rawTierId] || rawTierId
  if (!['journey', 'pro'].includes(tierId)) {
    return res.status(400).json({ error: `Invalid plan: ${tierId}` })
  }

  const authHeader = req.headers.authorization || ''
  const accessToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!accessToken) return res.status(401).json({ error: 'Please sign in before checkout.' })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  )
  const { data: authData, error: authError } = await supabase.auth.getUser(accessToken)
  if (authError || !authData?.user) {
    return res.status(401).json({ error: 'Your session has expired. Please sign in again.' })
  }
  const userId = authData.user.id
  const email = authData.user.email

  // Billing geography is derived server-side where Vercel provides a country
  // header. The client region is only a local-development fallback.
  const geoCountry = req.headers['x-vercel-ip-country'] || null
  const geoRegion = geoCountry ? ({ IN: 'IN', PH: 'PH', US: 'US', AU: 'AU' }[geoCountry] || 'AU') : null
  const safeRegion = geoRegion || (CURRENCY_BY_REGION[region] ? region : 'AU')
  const currency = CURRENCY_BY_REGION[safeRegion]
  const listAmount = MINOR_UNIT_PRICING[safeRegion][tierId]

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.learningonline.ai'

  const baseParams = {
    payment_method_types: ['card'],
    mode: 'payment',
    customer_creation: 'always',
    invoice_creation: { enabled: true },
    customer_email: email,
    client_reference_id: userId,
    allow_promotion_codes: true,
    automatic_tax: { enabled: true },
    tax_id_collection: { enabled: true },
    success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/pricing?cancelled=true`,
  }
  if (promoCode && promoCode.startsWith('promo_')) {
    baseParams.discounts = [{ promotion_code: promoCode }]
  }

  const inlineLineItem = (amount, label = TIER_NAMES[tierId]) => ({
    price_data: {
      currency,
      product_data: { name: label },
      unit_amount: amount,
      tax_behavior: 'inclusive',
    },
    quantity: 1,
  })

  try {
    let amountToCharge = listAmount
    let purchaseType = 'fresh'
    let productLabel = TIER_NAMES[tierId]

    // A Pro buyer receives credit only for a completed, paid Journey purchase
    // in the same currency. This avoids cross-currency arithmetic errors.
    if (tierId === 'pro') {
      const { data: journeyPurchases, error: purchaseQueryError } = await supabase
        .from('purchases')
        .select('amount, currency')
        .eq('user_id', userId)
        .eq('tier', 'journey')
        .eq('payment_status', 'completed')
        .gt('amount', 0)
        .order('created_at', { ascending: false })
        .limit(1)
      if (purchaseQueryError) throw purchaseQueryError

      const lastJourneyPurchase = journeyPurchases?.[0] || null
      const sameCurrency = lastJourneyPurchase?.currency?.toLowerCase() === currency
      if (sameCurrency) {
        amountToCharge = Math.max(listAmount - lastJourneyPurchase.amount, 0)
        purchaseType = 'upgrade'
        productLabel = 'LeO AI — The Pro (upgrade from Journey)'
      } else if (lastJourneyPurchase) {
        console.warn('[Stripe] Journey purchase currency differs from current checkout; no upgrade credit applied.')
      }

      if (amountToCharge <= 0) {
        const { error: entitlementError } = await supabase
          .from('users_profile')
          .update({
            selected_tier: 'pro',
            user_type: 'pro',
            journey_expires_at: null,
            journey_reminder_sent_at: null,
          })
          .eq('id', userId)
        if (entitlementError) throw entitlementError

        const { error: recordError } = await supabase.from('purchases').insert({
          user_id: userId,
          tier: 'pro',
          amount: 0,
          currency,
          payment_status: 'completed',
          region: safeRegion,
        })
        if (recordError) throw recordError
        return res.status(200).json({ url: `${appUrl}/success?upgraded=true` })
      }
    }

    const session = await stripe.checkout.sessions.create({
      ...baseParams,
      line_items: [inlineLineItem(amountToCharge, productLabel)],
      metadata: {
        userId,
        tierId,
        region: safeRegion,
        name: name || '',
        purchaseType,
      },
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('[Stripe] checkout creation failed:', err)
    return res.status(500).json({ error: 'We could not start checkout. Please try again.' })
  }
}
