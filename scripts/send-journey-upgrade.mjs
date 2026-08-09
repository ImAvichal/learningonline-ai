// scripts/send-journey-upgrade.mjs
// ─────────────────────────────────────────────────────────────────────────────
// One-off campaign: tell existing users they've been given complimentary Journey
// access, and invite feedback. Self-contained (Node 18+ global fetch + supabase-js).
//
// SAFETY: dry-run by default. It will NOT send until you pass SEND=true.
// It also keeps a local sent-log so re-running never double-emails anyone.
//
// USAGE (from the repo root):
//   1. Preview (no emails sent):
//        NEXT_PUBLIC_SUPABASE_URL=... \
//        SUPABASE_SERVICE_ROLE_KEY=... \
//        RESEND_API_KEY=... \
//        node scripts/send-journey-upgrade.mjs
//
//   2. Actually send:
//        ...same env... SEND=true node scripts/send-journey-upgrade.mjs
//
// ENV:
//   NEXT_PUBLIC_SUPABASE_URL   (or SUPABASE_URL)   — your project URL
//   SUPABASE_SERVICE_ROLE_KEY                       — service role key (server-side only!)
//   RESEND_API_KEY                                  — Resend API key
//   EMAIL_FROM        (optional) default: 'LeO AI <hello@learningonline.ai>'
//   EMAIL_REPLY_TO    (optional) default: 'hello@learningonline.ai'
//   TIER              (optional) default: 'journey' — who to target
//   SEND              set to 'true' to actually send (otherwise dry run)
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SENT_LOG = join(__dirname, '.journey-upgrade-sent.json')

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY
const RESEND_KEY   = process.env.RESEND_API_KEY
const FROM         = process.env.EMAIL_FROM || 'LeO AI <hello@learningonline.ai>'
const REPLY_TO     = process.env.EMAIL_REPLY_TO || 'hello@learningonline.ai'
const TIER         = process.env.TIER || 'journey'
const APP_URL      = process.env.NEXT_PUBLIC_APP_URL || 'https://www.learningonline.ai'
const LIVE         = process.env.SEND === 'true'

function fail(msg) { console.error(`\n❌ ${msg}\n`); process.exit(1) }
if (!SUPABASE_URL) fail('Missing NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL).')
if (!SERVICE_KEY)  fail('Missing SUPABASE_SERVICE_ROLE_KEY.')
if (!RESEND_KEY && LIVE) fail('Missing RESEND_API_KEY (required to actually send).')

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } })

// ── Email content ────────────────────────────────────────────────────────────
function buildEmail(name) {
  const firstName = (name || '').split(' ')[0] || 'there'
  const subject = "Journey's on us — we'd love your honest feedback 🙏"

  const text = `Hi ${firstName},

You're one of our early members, and we're building LearningOnline.ai around what people like you actually need — so we'd genuinely love your feedback.

As a thank-you, Journey — our practical, real-world AI learning track — is now yours, permanently. No payment, no catch, nothing to renew.

Here's the ask: as you go through it, tell us what's working, what's confusing, and what's missing. There's a quick feedback panel right on your dashboard, and every response directly shapes what we build next. Honest, critical feedback is the most useful kind — don't hold back.

Explore Journey and share your thoughts: ${APP_URL}/dashboard

Thank you — genuinely.
From AI anxiety to AI awareness,
The LearningOnline.ai team`

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  @media only screen and (max-width:600px){ .pad{padding:24px !important} .btn{padding:14px 28px !important} h1{font-size:22px !important} }
</style></head>
<body style="margin:0;background:#eef1f7;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1a2138;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#eef1f7;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(16,24,54,0.08);">
        <tr><td style="background:#05091A;padding:28px 40px;">
          <span style="font-weight:800;font-size:20px;color:#ffffff;letter-spacing:-0.02em;">LeO <span style="color:#3D8BFF;">AI</span></span>
        </td></tr>
        <tr><td class="pad" style="padding:36px 40px 8px;">
          <h1 style="margin:0 0 8px;font-size:26px;font-weight:800;letter-spacing:-0.02em;color:#05091A;">We'd love your feedback 🙏</h1>
          <p style="margin:0;color:#5b6580;font-size:15px;">And Journey's free for a month as a thank-you — yours to explore.</p>
        </td></tr>
        <tr><td class="pad" style="padding:16px 40px 8px;font-size:15px;line-height:1.6;color:#2a3350;">
          <p style="margin:0 0 16px;">Hi ${firstName},</p>
          <p style="margin:0 0 16px;">You're one of our early members, and we're building LearningOnline.ai around what people like you actually need — so your feedback genuinely matters to us.</p>
          <p style="margin:0 0 16px;">As a thank-you, <strong>Journey</strong> — our practical, real-world AI learning track — is now <strong>yours, permanently</strong>. No payment, no catch, nothing to renew.</p>
          <p style="margin:0 0 16px;">Here's the ask: as you go through it, tell us what's working, what's confusing, and what's missing. There's a quick <strong>feedback panel right on your dashboard</strong>, and every response directly shapes what we build next. Honest, critical feedback is the most useful kind — please don't hold back.</p>
        </td></tr>
        <tr><td class="btn" align="center" style="padding:8px 40px 36px;">
          <a href="${APP_URL}/dashboard" style="display:inline-block;background:#1A6EFF;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 32px;border-radius:10px;">Explore Journey &amp; share feedback →</a>
        </td></tr>
        <tr><td style="padding:20px 40px;border-top:1px solid #eceff5;">
          <p style="margin:0;color:#8a93a8;font-size:12px;">From AI anxiety to AI awareness. · <a href="${APP_URL}" style="color:#1A6EFF;text-decoration:none;">learningonline.ai</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  return { subject, text, html }
}

async function sendOne(to, name) {
  const { subject, text, html } = buildEmail(name)
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to, reply_to: REPLY_TO, subject, html, text }),
  })
  if (!res.ok) throw new Error(`${res.status} ${await res.text().catch(() => '')}`)
  return res.json()
}

async function main() {
  console.log(`\n📣 Journey upgrade campaign — ${LIVE ? '🔴 LIVE SEND' : '🟡 DRY RUN (no emails will be sent)'}`)
  console.log(`   Target tier: ${TIER}\n`)

  const { data, error } = await supabase
    .from('users_profile')
    .select('email, full_name')
    .eq('selected_tier', TIER)
    .not('email', 'is', null)
  if (error) fail(`Supabase query failed: ${error.message}`)

  const sent = existsSync(SENT_LOG) ? new Set(JSON.parse(readFileSync(SENT_LOG, 'utf8'))) : new Set()
  const recipients = data.filter((u) => !sent.has(u.email.toLowerCase()))

  console.log(`   ${data.length} user(s) on '${TIER}'. ${data.length - recipients.length} already emailed (skipped). ${recipients.length} to send.\n`)

  if (!LIVE) {
    recipients.forEach((u, i) => console.log(`   ${String(i + 1).padStart(2)}. ${u.email}  (${u.full_name || 'no name'})`))
    console.log(`\n   Dry run only. Re-run with SEND=true to send these ${recipients.length} email(s).\n`)
    return
  }

  let ok = 0, failed = 0
  for (const [i, u] of recipients.entries()) {
    try {
      await sendOne(u.email, u.full_name)
      sent.add(u.email.toLowerCase())
      writeFileSync(SENT_LOG, JSON.stringify([...sent], null, 2))  // persist after each send
      ok++
      console.log(`   ✓ ${String(i + 1).padStart(2)}/${recipients.length}  ${u.email}`)
    } catch (err) {
      failed++
      console.error(`   ✗ ${String(i + 1).padStart(2)}/${recipients.length}  ${u.email} — ${err.message}`)
    }
    await new Promise((r) => setTimeout(r, 600))  // gentle pacing for Resend rate limits
  }

  console.log(`\n   Done. ${ok} sent, ${failed} failed. Sent-log: ${SENT_LOG}\n`)
}

main().catch((e) => fail(e.message))
