import { createClient } from '@supabase/supabase-js'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.learningonline.ai'
const REPORT_TO = process.env.BUSINESS_REPORT_EMAIL || process.env.EMAIL_REPLY_TO || 'hello@learningonline.ai'

export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ error: 'Unauthorised' })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  )
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  try {
    const [{ data: users, error: usersError }, { data: purchases, error: purchaseError }, { data: feedback, error: feedbackError }] = await Promise.all([
      supabase.from('users_profile').select('id, selected_tier, created_at, journey_expires_at').gte('created_at', since),
      supabase.from('purchases').select('tier, amount, currency, region, payment_status, created_at').eq('payment_status', 'completed').gte('created_at', since),
      supabase.from('feedback').select('rating, feedback_type, created_at').gte('created_at', since),
    ])
    if (usersError) throw usersError
    if (purchaseError) throw purchaseError
    if (feedbackError) throw feedbackError

    const revenueMinorUnitsByCurrency = {}
    for (const p of purchases || []) {
      const currency = (p.currency || 'unknown').toUpperCase()
      revenueMinorUnitsByCurrency[currency] = (revenueMinorUnitsByCurrency[currency] || 0) + (p.amount || 0)
    }

    const rated = (feedback || []).filter((f) => Number(f.rating) > 0)
    const averageRating = rated.length
      ? Number((rated.reduce((sum, f) => sum + Number(f.rating), 0) / rated.length).toFixed(2))
      : null

    const summary = {
      signups: users?.length || 0,
      purchases: purchases?.length || 0,
      revenueMinorUnitsByCurrency,
      feedbackItems: feedback?.length || 0,
      averageRating,
      generatedAt: new Date().toISOString(),
    }

    if (process.env.RESEND_API_KEY) {
      const text = [
        'LearningOnline.ai weekly commercial health',
        '',
        `New signups: ${summary.signups}`,
        `Completed purchases: ${summary.purchases}`,
        `Revenue (minor units, by currency): ${JSON.stringify(revenueMinorUnitsByCurrency)}`,
        `Feedback items: ${summary.feedbackItems}`,
        `Average rating: ${summary.averageRating ?? 'n/a'}`,
        '',
        `Feedback dashboard: ${APP_URL}/admin/feedback`,
        '',
        'Currencies are intentionally reported separately and are not added together.',
      ].join('\n')

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'LeO AI <hello@learningonline.ai>',
          to: REPORT_TO,
          subject: 'LearningOnline.ai — weekly commercial health',
          text,
        }),
      }).catch((err) => console.error('[commercial-health] email failed:', err.message))
    }

    return res.status(200).json({ ok: true, ...summary })
  } catch (err) {
    console.error('[commercial-health] failed:', err)
    return res.status(500).json({ error: err.message })
  }
}
