// lib/campaigns.js
//
// Shared email content + send helper for one-off campaigns, used by BOTH the
// admin dashboard (pages/api/admin/send-journey-campaign.js) and the CLI
// fallback (scripts/send-journey-upgrade.mjs) — one copy of the copy, so the
// two paths can never drift out of sync with each other.

const RESEND_API_URL = 'https://api.resend.com/emails'

export function buildJourneyUpgradeEmail(name, { appUrl, businessAddress }) {
  const firstName = (name || '').split(' ')[0] || 'there'
  const subject = "Journey's on us — we'd love your honest feedback 🙏"

  const text = `Hi ${firstName},

You're one of our early members, and we're building LearningOnline.ai around what people like you actually need — so we'd genuinely love your feedback.

As a thank-you, Journey — our practical, real-world AI learning track — is now yours, permanently. No payment, no catch, nothing to renew.

Here's the ask: as you go through it, tell us what's working, what's confusing, and what's missing. There's a quick feedback panel right on your dashboard, and every response directly shapes what we build next. Honest, critical feedback is the most useful kind — don't hold back.

Explore Journey and share your thoughts: ${appUrl}/dashboard

Thank you — genuinely.
From AI anxiety to AI awareness,
The LearningOnline.ai team

—
${businessAddress}
You're receiving this as a LearningOnline.ai member. Reply with "Unsubscribe" to opt out.`

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  @media only screen and (max-width:600px){ .pad{padding:24px !important} .btn{padding:14px 28px !important} h1{font-size:22px !important} }
</style></head>
<body style="margin:0;background:#eef1f7;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1a2138;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    A permanent thank-you, and 30 seconds of feedback that shapes what we build next.
  </div>
  <div style="display:none;max-height:0;overflow:hidden;">&#8203;&#847; &#8203;&#847; &#8203;&#847; &#8203;&#847; &#8203;&#847;</div>
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#eef1f7;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(16,24,54,0.08);">
        <tr><td style="background:#05091A;padding:28px 40px;">
          <span style="font-weight:800;font-size:20px;color:#ffffff;letter-spacing:-0.02em;">LeO <span style="color:#3D8BFF;">AI</span></span>
        </td></tr>
        <tr><td class="pad" style="padding:36px 40px 8px;">
          <h1 style="margin:0 0 8px;font-size:26px;font-weight:800;letter-spacing:-0.02em;color:#05091A;">We'd love your feedback 🙏</h1>
          <p style="margin:0;color:#5b6580;font-size:15px;">Journey is yours, permanently, as a thank-you — no payment, ever.</p>
        </td></tr>
        <tr><td class="pad" style="padding:16px 40px 8px;font-size:15px;line-height:1.6;color:#2a3350;">
          <p style="margin:0 0 16px;">Hi ${firstName},</p>
          <p style="margin:0 0 16px;">You're one of our early members, and we're building LearningOnline.ai around what people like you actually need — so your feedback genuinely matters to us.</p>
          <p style="margin:0 0 16px;">As a thank-you, <strong>Journey</strong> — our practical, real-world AI learning track — is now <strong>yours, permanently</strong>. No payment, no catch, nothing to renew.</p>
          <p style="margin:0 0 16px;">Here's the ask: as you go through it, tell us what's working, what's confusing, and what's missing. There's a quick <strong>feedback panel right on your dashboard</strong>, and every response directly shapes what we build next. Honest, critical feedback is the most useful kind — please don't hold back.</p>
        </td></tr>
        <tr><td class="btn" align="center" style="padding:8px 40px 36px;">
          <a href="${appUrl}/dashboard" style="display:inline-block;background:#1A6EFF;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 32px;border-radius:10px;">Explore Journey &amp; share feedback →</a>
        </td></tr>
        <tr><td style="padding:20px 40px;border-top:1px solid #eceff5;">
          <p style="margin:0 0 8px;color:#8a93a8;font-size:12px;">From AI anxiety to AI awareness. · <a href="${appUrl}" style="color:#1A6EFF;text-decoration:none;">learningonline.ai</a></p>
          <p style="margin:0;color:#a8afc0;font-size:11px;line-height:1.6;">
            ${businessAddress}<br/>
            You're receiving this as a LearningOnline.ai member. <a href="mailto:hello@learningonline.ai?subject=Unsubscribe" style="color:#a8afc0;">Unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  return { subject, text, html }
}

// Sends one email via Resend, with the List-Unsubscribe header Gmail/Yahoo's
// 2024 bulk-sender rules expect. Throws on failure — callers decide how to
// handle/report that (both current callers catch per-recipient, so one
// failure doesn't abort the whole batch).
export async function sendCampaignEmail({ apiKey, from, replyTo, to, subject, html, text }) {
  const res = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from, to, reply_to: replyTo, subject, html, text,
      headers: { 'List-Unsubscribe': `<mailto:${replyTo}?subject=Unsubscribe>` },
    }),
  })
  if (!res.ok) throw new Error(`${res.status} ${await res.text().catch(() => '')}`)
  return res.json()
}
