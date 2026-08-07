// pages/api/cron/journey-expiry.js
//
// Daily cron (see vercel.json). Two jobs:
//   1. Reminder — email users whose Journey free month ends within 7 days
//      (once each, tracked by journey_reminder_sent_at).
//   2. Downgrade — move users whose free month has passed from 'journey' to the
//      free 'parents' base. (The app also does this at read-time; this covers
//      users who never log back in.)
//
// Auth: Vercel Cron sends `Authorization: Bearer <CRON_SECRET>` when CRON_SECRET
// is set in the project env. We reject anything else.

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY
const RESEND_KEY   = process.env.RESEND_API_KEY
const FROM         = process.env.EMAIL_FROM || 'LeO AI <hello@learningonline.ai>'
const REPLY_TO     = process.env.EMAIL_REPLY_TO || 'hello@learningonline.ai'
const APP_URL      = process.env.NEXT_PUBLIC_APP_URL || 'https://www.learningonline.ai'

function reminderEmail(name, daysLeft) {
  const firstName = (name || '').split(' ')[0] || 'there'
  const when = daysLeft <= 1 ? 'tomorrow' : `in ${daysLeft} days`
  const subject = `Your free month of Journey ends ${when}`
  const text = `Hi ${firstName},

A quick heads-up — your complimentary month of Journey ends ${when}.

We'd love to know what you thought. If it's been useful, you can own Journey outright with a single payment — or go Pro for the complete 16-module curriculum. One payment, yours for good, no subscription.

See your options: ${APP_URL}/pricing

From AI anxiety to AI awareness,
The LearningOnline.ai team`
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;background:#eef1f7;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1a2138;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#eef1f7;padding:32px 16px;"><tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(16,24,54,0.08);">
      <tr><td style="background:#05091A;padding:28px 40px;"><span style="font-weight:800;font-size:20px;color:#fff;letter-spacing:-0.02em;">LeO <span style="color:#3D8BFF;">AI</span></span></td></tr>
      <tr><td style="padding:36px 40px 8px;"><h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#05091A;">Your free month ends ${when}</h1></td></tr>
      <tr><td style="padding:8px 40px;font-size:15px;line-height:1.6;color:#2a3350;">
        <p style="margin:0 0 16px;">Hi ${firstName},</p>
        <p style="margin:0 0 16px;">A quick heads-up — your complimentary month of <strong>Journey</strong> ends ${when}. We'd love to know what you thought.</p>
        <p style="margin:0 0 16px;">If it's been useful, you can <strong>own Journey outright</strong> with a single payment — or go <strong>Pro</strong> for the complete 16-module curriculum. One payment, yours for good, no subscription.</p>
      </td></tr>
      <tr><td align="center" style="padding:8px 40px 36px;"><a href="${APP_URL}/pricing" style="display:inline-block;background:#1A6EFF;color:#fff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 32px;border-radius:10px;">See your options →</a></td></tr>
      <tr><td style="padding:20px 40px;border-top:1px solid #eceff5;"><p style="margin:0;color:#8a93a8;font-size:12px;">From AI anxiety to AI awareness. · <a href="${APP_URL}" style="color:#1A6EFF;text-decoration:none;">learningonline.ai</a></p></td></tr>
    </table>
  </td></tr></table>
</body></html>`
  return { subject, text, html }
}

async function sendEmail(to, name, daysLeft) {
  if (!RESEND_KEY) return { skipped: true }
  const { subject, text, html } = reminderEmail(name, daysLeft)
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to, reply_to: REPLY_TO, subject, html, text }),
  })
  if (!res.ok) throw new Error(`${res.status} ${await res.text().catch(() => '')}`)
  return { sent: true }
}

export default async function handler(req, res) {
  // Auth — reject unless the request carries the cron secret.
  const secret = process.env.CRON_SECRET
  const authed = secret && req.headers.authorization === `Bearer ${secret}`
  if (!authed) return res.status(401).json({ error: 'Unauthorised' })

  if (!SUPABASE_URL || !SERVICE_KEY) {
    return res.status(500).json({ error: 'Missing Supabase service credentials' })
  }
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } })
  const now = new Date()
  const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  const result = { reminded: 0, remindFailed: 0, downgraded: 0 }

  try {
    // 1. REMINDERS — journey users expiring within 7 days, not yet reminded.
    const { data: expiring, error: e1 } = await supabase
      .from('users_profile')
      .select('id, email, full_name, journey_expires_at')
      .eq('selected_tier', 'journey')
      .not('journey_expires_at', 'is', null)
      .is('journey_reminder_sent_at', null)
      .gt('journey_expires_at', now.toISOString())
      .lte('journey_expires_at', in7Days.toISOString())
    if (e1) throw e1

    for (const u of expiring || []) {
      if (!u.email) continue
      const daysLeft = Math.max(1, Math.ceil((new Date(u.journey_expires_at) - now) / 86400000))
      try {
        await sendEmail(u.email, u.full_name, daysLeft)
        await supabase.from('users_profile')
          .update({ journey_reminder_sent_at: now.toISOString() })
          .eq('id', u.id)
        result.reminded++
      } catch (err) {
        result.remindFailed++
        console.error('[cron] reminder failed for', u.email, err.message)
      }
    }

    // 2. DOWNGRADES — journey users whose free month has passed.
    const { data: expired, error: e2 } = await supabase
      .from('users_profile')
      .update({ selected_tier: 'parents', user_type: 'parents' })
      .eq('selected_tier', 'journey')
      .lt('journey_expires_at', now.toISOString())
      .select('id')
    if (e2) throw e2
    result.downgraded = expired?.length || 0

    return res.status(200).json({ ok: true, ...result, ranAt: now.toISOString() })
  } catch (err) {
    return res.status(500).json({ error: err.message, ...result })
  }
}
