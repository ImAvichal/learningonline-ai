// pages/api/contact.js
//
// Handles contact form submissions:
//   1. Saves to Supabase `contact_queries` table (durable record)
//   2. Notifies the team via email (so refund requests don't get missed)
//   3. Sends the submitter a confirmation email
//
// Email steps gracefully no-op if RESEND_API_KEY is not configured.

import { createClient } from '@supabase/supabase-js'

const RESEND_API_URL = 'https://api.resend.com/emails'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, company, query_type, message } = req.body

  if (!name || !email || !query_type || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // ── 1. Save to DB (the source of truth — never skip this) ──────────────
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { error: dbError } = await supabase.from('contact_queries').insert({
      name, email, company: company || null,
      query_type, message,
    })

    if (dbError) {
      console.error('[contact] DB insert failed:', dbError.message)
      throw dbError
    }

    // ── 2. Notify the team (email to CONTACT_INBOX) ────────────────────────
    // Fire-and-forget so a slow email doesn't slow the user response.
    notifyTeam({ name, email, company, query_type, message })
      .catch(err => console.error('[contact] Team notification failed (non-fatal):', err.message))

    // ── 3. Confirm receipt to the submitter ────────────────────────────────
    confirmToSubmitter({ name, email, query_type })
      .catch(err => console.error('[contact] Confirmation email failed (non-fatal):', err.message))

    res.status(200).json({ success: true })
  } catch (err) {
    console.error('[contact] Submission error:', err.message)
    res.status(500).json({ error: 'Failed to save message' })
  }
}

// ── Email: notify the team ───────────────────────────────────────────────────
async function notifyTeam({ name, email, company, query_type, message }) {
  const apiKey = process.env.RESEND_API_KEY
  const inbox = process.env.CONTACT_INBOX
  const from = process.env.EMAIL_FROM || 'LeO AI <hello@learningonline.ai>'

  if (!apiKey || !inbox) {
    console.log('[contact] Team notification skipped — RESEND_API_KEY or CONTACT_INBOX not set')
    return
  }

  // Urgency flag for refund requests — these have a 72-hour SLA
  const isRefund = query_type.toLowerCase().includes('refund')
  const subject = isRefund
    ? `⚠️ REFUND REQUEST — ${name}`
    : `[LeO AI Contact] ${query_type} — ${name}`

  const html = `<!DOCTYPE html><html><body style="font-family:-apple-system,sans-serif;color:#0a1628;padding:24px;max-width:600px;margin:0 auto;">
    ${isRefund ? '<div style="background:#fff3cd;border:1px solid #ffc107;padding:12px 16px;border-radius:8px;margin-bottom:20px;font-weight:600;">⚠️ Refund request — respond promptly (7-day refund window)</div>' : ''}
    <h2 style="margin:0 0 16px;">${query_type} enquiry from ${escapeHtml(name)}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-size:14px;width:100%;">
      <tr><td style="color:#6b7891;width:120px;">Name</td><td><strong>${escapeHtml(name)}</strong></td></tr>
      <tr><td style="color:#6b7891;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      ${company ? `<tr><td style="color:#6b7891;">Company</td><td>${escapeHtml(company)}</td></tr>` : ''}
      <tr><td style="color:#6b7891;">Type</td><td>${escapeHtml(query_type)}</td></tr>
    </table>
    <h3 style="margin:24px 0 8px;font-size:14px;color:#6b7891;text-transform:uppercase;letter-spacing:1px;">Message</h3>
    <div style="background:#f7f8fa;padding:16px;border-radius:8px;white-space:pre-wrap;font-size:14px;line-height:1.6;">${escapeHtml(message)}</div>
    <p style="margin-top:24px;font-size:12px;color:#9aa5bd;">Submitted via learningonline.ai/contact</p>
  </body></html>`

  const text = `${query_type} enquiry from ${name}\n\nEmail: ${email}\n${company ? `Company: ${company}\n` : ''}Type: ${query_type}\n\nMessage:\n${message}\n\n— Submitted via learningonline.ai/contact`

  await sendEmail({ from, to: inbox, replyTo: email, subject, html, text })
}

// ── Email: confirm to the submitter ─────────────────────────────────────────
async function confirmToSubmitter({ name, email, query_type }) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM || 'LeO AI <hello@learningonline.ai>'
  const replyTo = process.env.EMAIL_REPLY_TO || 'hello@learningonline.ai'

  if (!apiKey) {
    console.log('[contact] Submitter confirmation skipped — RESEND_API_KEY not set')
    return
  }

  const firstName = (name || '').split(' ')[0] || 'there'
  const isRefund = query_type.toLowerCase().includes('refund')

  const subject = isRefund
    ? "We've received your refund request — LeO AI"
    : "We've received your message — LeO AI"

  const introCopy = isRefund
    ? "We've received your refund request and will review it shortly. Refund requests within the 7-day policy window are typically approved and processed within 3–5 business days."
    : "We've received your message and will get back to you within one business day."

  const text = `Hi ${firstName},

${introCopy}

You can reply directly to this email if you need to add anything.

— The LeO AI team
https://www.learningonline.ai`

  const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f7f8fa;font-family:-apple-system,sans-serif;color:#0a1628;">
    <table cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;">
      <tr><td style="padding:36px 36px 16px;border-bottom:1px solid #e8eaf0;">
        <div style="font-size:22px;font-weight:800;letter-spacing:-0.5px;"><span style="color:#0a1628;">LeO</span> <span style="color:#1a6eff;">AI</span></div>
      </td></tr>
      <tr><td style="padding:32px 36px 8px;">
        <h1 style="margin:0 0 14px;font-size:22px;font-weight:800;line-height:1.3;">Thanks, ${escapeHtml(firstName)} — we've got your message.</h1>
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3d4a63;">${introCopy}</p>
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3d4a63;">You can reply directly to this email if you need to add anything.</p>
      </td></tr>
      <tr><td style="padding:16px 36px 36px;border-top:1px solid #e8eaf0;font-size:12px;color:#9aa5bd;">
        LeO AI · <a href="https://www.learningonline.ai" style="color:#1a6eff;text-decoration:none;">learningonline.ai</a>
      </td></tr>
    </table>
  </body></html>`

  await sendEmail({ from, to: email, replyTo, subject, html, text })
}

// ── Resend API helper ───────────────────────────────────────────────────────
async function sendEmail({ from, to, replyTo, subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const res = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, html, text }),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`Resend API ${res.status}: ${errText}`)
  }
}

// ── HTML escaping — never trust form input in email HTML ────────────────────
function escapeHtml(s) {
  if (typeof s !== 'string') return ''
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
