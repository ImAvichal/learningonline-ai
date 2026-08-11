// scripts/send-journey-upgrade.mjs
// ─────────────────────────────────────────────────────────────────────────────
// CLI fallback for the Journey upgrade campaign. The primary way to run this
// is now the admin dashboard (/admin/campaigns) — no terminal, no env vars to
// type, uses the settings already configured in Vercel. Use this script only
// if the site itself is unreachable and you need to send urgently.
//
// Shares its email content AND its sent-tracking with the admin dashboard
// (lib/campaigns.js + the campaign_sends table) — so running this script and
// clicking the dashboard button can never double-email the same person.
//
// SAFETY: dry-run by default. It will NOT send until you pass SEND=true.
//
// USAGE (from the repo root):
//   1. Preview (no emails sent):
//        NEXT_PUBLIC_SUPABASE_URL=... \
//        SUPABASE_SERVICE_ROLE_KEY=... \
//        RESEND_API_KEY=... \
//        node scripts/send-journey-upgrade.mjs
//
//   2. Actually send:
//        ...same env... BUSINESS_ADDRESS="..." SEND=true node scripts/send-journey-upgrade.mjs
//
// ENV:
//   NEXT_PUBLIC_SUPABASE_URL   (or SUPABASE_URL)   — your project URL
//   SUPABASE_SERVICE_ROLE_KEY                       — service role key (server-side only!)
//   RESEND_API_KEY                                  — Resend API key
//   EMAIL_FROM        (optional) default: 'LeO AI <hello@learningonline.ai>'
//   EMAIL_REPLY_TO    (optional) default: 'hello@learningonline.ai'
//   BUSINESS_ADDRESS  REQUIRED before a real send — physical mailing address
//                      for the compliance footer (Australian Spam Act 2003).
//   TIER              (optional) default: 'journey' — who to target
//   SEND              set to 'true' to actually send (otherwise dry run)
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js'
import { buildJourneyUpgradeEmail, sendCampaignEmail } from '../lib/campaigns.js'

const CAMPAIGN = 'journey-upgrade-2026'  // must match pages/api/admin/send-journey-campaign.js

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY
const RESEND_KEY   = process.env.RESEND_API_KEY
const FROM         = process.env.EMAIL_FROM || 'LeO AI <hello@learningonline.ai>'
const REPLY_TO      = process.env.EMAIL_REPLY_TO || 'hello@learningonline.ai'
const BUSINESS_ADDRESS = process.env.BUSINESS_ADDRESS || ''
const TIER          = process.env.TIER || 'journey'
const APP_URL       = process.env.NEXT_PUBLIC_APP_URL || 'https://www.learningonline.ai'
const LIVE          = process.env.SEND === 'true'

function fail(msg) { console.error(`\n❌ ${msg}\n`); process.exit(1) }
if (!SUPABASE_URL) fail('Missing NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL).')
if (!SERVICE_KEY)  fail('Missing SUPABASE_SERVICE_ROLE_KEY.')
if (!RESEND_KEY && LIVE) fail('Missing RESEND_API_KEY (required to actually send).')
if (!BUSINESS_ADDRESS && LIVE) fail(
  'Missing BUSINESS_ADDRESS. Commercial email in Australia legally requires a valid ' +
  'physical postal address in the footer (Spam Act 2003). Set BUSINESS_ADDRESS and re-run.'
)

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } })

async function main() {
  console.log(`\n📣 Journey upgrade campaign — ${LIVE ? '🔴 LIVE SEND' : '🟡 DRY RUN (no emails will be sent)'}`)
  console.log(`   Target tier: ${TIER}\n`)

  const { data, error } = await supabase
    .from('users_profile')
    .select('email, full_name')
    .eq('selected_tier', TIER)
    .not('email', 'is', null)
  if (error) fail(`Supabase query failed: ${error.message}`)

  const { data: alreadySent, error: sErr } = await supabase
    .from('campaign_sends')
    .select('email')
    .eq('campaign', CAMPAIGN)
  if (sErr) fail(`Could not read campaign_sends: ${sErr.message}`)
  const sentSet = new Set((alreadySent || []).map((r) => r.email.toLowerCase()))

  const recipients = data.filter((u) => !sentSet.has(u.email.toLowerCase()))

  console.log(`   ${data.length} user(s) on '${TIER}'. ${sentSet.size} already emailed (skipped). ${recipients.length} to send.\n`)

  if (!LIVE) {
    recipients.forEach((u, i) => console.log(`   ${String(i + 1).padStart(2)}. ${u.email}  (${u.full_name || 'no name'})`))
    console.log(`\n   Dry run only. Re-run with SEND=true (and BUSINESS_ADDRESS set) to send these ${recipients.length} email(s).\n`)
    return
  }

  let ok = 0, failed = 0
  for (const [i, u] of recipients.entries()) {
    try {
      const { subject, text, html } = buildJourneyUpgradeEmail(u.full_name, { appUrl: APP_URL, businessAddress: BUSINESS_ADDRESS })
      await sendCampaignEmail({ apiKey: RESEND_KEY, from: FROM, replyTo: REPLY_TO, to: u.email, subject, html, text })
      await supabase.from('campaign_sends').insert({ campaign: CAMPAIGN, email: u.email.toLowerCase() })
      ok++
      console.log(`   ✓ ${String(i + 1).padStart(2)}/${recipients.length}  ${u.email}`)
    } catch (err) {
      failed++
      console.error(`   ✗ ${String(i + 1).padStart(2)}/${recipients.length}  ${u.email} — ${err.message}`)
    }
    await new Promise((r) => setTimeout(r, 600))  // gentle pacing for Resend rate limits
  }

  console.log(`\n   Done. ${ok} sent, ${failed} failed.\n`)
}

main().catch((e) => fail(e.message))
