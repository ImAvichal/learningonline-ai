// pages/api/admin/send-journey-campaign.js
//
// Admin-only. Replaces the CLI script for day-to-day use — runs entirely on
// Vercel using the env vars already configured there (RESEND_API_KEY,
// EMAIL_FROM, BUSINESS_ADDRESS), no terminal required.
//
// GET  → dry-run preview: who WOULD receive this, how many already have.
// POST → actually sends. Idempotent via the campaign_sends table (unique on
//        campaign+email) — safe to click twice, nobody gets emailed twice.
//        Body { test: true } sends ONE copy to the calling admin's own email
//        instead of the real recipient list — does NOT touch campaign_sends,
//        so it never counts as (or blocks) a real send to that address.

import { requireAdmin } from '../../../lib/adminAuth'
import { buildJourneyUpgradeEmail, sendCampaignEmail } from '../../../lib/campaigns'

const CAMPAIGN = 'journey-upgrade-2026'
const TARGET_TIER = 'journey'

export default async function handler(req, res) {
  if (!['GET', 'POST'].includes(req.method)) return res.status(405).json({ error: 'Method not allowed' })

  const admin = await requireAdmin(req)
  if (!admin.ok) return res.status(admin.status).json({ error: admin.error })
  const supabase = admin.supabase

  const RESEND_KEY = process.env.RESEND_API_KEY
  const FROM = process.env.EMAIL_FROM || 'LeO AI <hello@learningonline.ai>'
  const REPLY_TO = process.env.EMAIL_REPLY_TO || 'hello@learningonline.ai'
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.learningonline.ai'
  const BUSINESS_ADDRESS = process.env.BUSINESS_ADDRESS || ''

  try {
    const { data: candidates, error: qErr } = await supabase
      .from('users_profile')
      .select('id, email, full_name')
      .eq('selected_tier', TARGET_TIER)
      .not('email', 'is', null)
    if (qErr) throw qErr

    const { data: alreadySent, error: sErr } = await supabase
      .from('campaign_sends')
      .select('email')
      .eq('campaign', CAMPAIGN)
    if (sErr) throw sErr
    const sentSet = new Set((alreadySent || []).map((r) => r.email.toLowerCase()))

    const recipients = (candidates || []).filter((u) => !sentSet.has(u.email.toLowerCase()))

    if (req.method === 'GET') {
      return res.status(200).json({
        campaign: CAMPAIGN,
        totalOnTier: candidates?.length || 0,
        alreadySent: sentSet.size,
        toSend: recipients.length,
        recipients: recipients.map((r) => ({ email: r.email, name: r.full_name })),
        resendConfigured: !!RESEND_KEY,
        businessAddressConfigured: !!BUSINESS_ADDRESS,
      })
    }

    // POST — actually send
    if (!RESEND_KEY) return res.status(400).json({ error: 'RESEND_API_KEY is not configured in Vercel environment variables.' })
    if (!BUSINESS_ADDRESS) {
      return res.status(400).json({
        error: 'BUSINESS_ADDRESS is not set. Australian commercial email law requires a physical postal address in the footer — set BUSINESS_ADDRESS in Vercel (Settings → Environment Variables) before sending.',
      })
    }

    // ── Test send: one copy to the admin's own address, real content, no
    // tracking side-effects. Lets you literally see the email before any of
    // the 26 real recipients do. ──
    if (req.body?.test === true) {
      if (!admin.user.email) return res.status(400).json({ error: 'No email on file for your admin account.' })
      const { subject, text, html } = buildJourneyUpgradeEmail(admin.user.full_name, { appUrl: APP_URL, businessAddress: BUSINESS_ADDRESS })
      await sendCampaignEmail({ apiKey: RESEND_KEY, from: FROM, replyTo: REPLY_TO, to: admin.user.email, subject, html, text })
      return res.status(200).json({ test: true, sentTo: admin.user.email })
    }

    if (recipients.length === 0) {
      return res.status(200).json({ sent: 0, failed: 0, message: 'Nothing to send — everyone on this tier has already received this campaign.' })
    }

    let sent = 0, failed = 0
    const failures = []

    for (const r of recipients) {
      try {
        const { subject, text, html } = buildJourneyUpgradeEmail(r.full_name, { appUrl: APP_URL, businessAddress: BUSINESS_ADDRESS })
        await sendCampaignEmail({ apiKey: RESEND_KEY, from: FROM, replyTo: REPLY_TO, to: r.email, subject, html, text })
        // Record success immediately — if a later recipient fails, everyone
        // sent so far is still safely marked, so a retry won't double-email.
        await supabase.from('campaign_sends').insert({ campaign: CAMPAIGN, email: r.email.toLowerCase() })
        sent++
      } catch (err) {
        failed++
        failures.push({ email: r.email, error: err.message })
        console.error(`[admin/send-journey-campaign] Failed for ${r.email}:`, err.message)
      }
      // Gentle pacing for Resend's rate limits.
      await new Promise((resolve) => setTimeout(resolve, 600))
    }

    return res.status(200).json({ sent, failed, failures })
  } catch (err) {
    console.error('[admin/send-journey-campaign] Error:', err.message)
    return res.status(500).json({ error: err.message || 'Failed to process campaign' })
  }
}
