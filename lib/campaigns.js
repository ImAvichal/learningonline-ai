// lib/campaigns.js
//
// Shared email content + send helper for one-off campaigns, used by BOTH the
// admin dashboard (pages/api/admin/send-journey-campaign.js) and the CLI
// fallback (scripts/send-journey-upgrade.mjs) — one copy of the copy, so the
// two paths can never drift out of sync with each other.
//
// DESIGN NOTE (deliberate): this is written as PLAIN, near-unstyled email —
// no logo header, no colour blocks, no graphic CTA button. A branded HTML
// template with a big button is exactly what Gmail's classifier uses to sort
// mail into Promotions, which is the wrong outcome for a personal thank-you
// to people we already know — we want it read, not filed away. Keep any
// future edits to this file in that spirit: plain paragraphs, one inline
// text link, minimal footer.

const RESEND_API_URL = 'https://api.resend.com/emails'

export function buildJourneyUpgradeEmail(name, { appUrl, businessAddress }) {
  const firstName = (name || '').split(' ')[0] || 'there'
  const subject = 'A quick thank-you — and a favour to ask'

  const text = `Hi ${firstName},

You're one of our first members, and we wanted to say thanks personally for being early to LearningOnline.ai.

As a thank-you, Journey is now yours, permanently — no payment, ever, nothing to renew.

In return, we'd love a favour: spend a few minutes in the course and tell us honestly what's working and what isn't. There's a quick feedback box on your dashboard, or just reply to this email directly — we read every one.

Here's the link: ${appUrl}/dashboard

Thanks again,
Avi & Mini
LearningOnline.ai

—
${businessAddress}
Reply "unsubscribe" to opt out of future updates.`

  // Deliberately near-plain HTML: system font, no logo bar, no colour
  // blocks, no button graphic — just a normal-looking paragraph email with
  // one inline link, the way a person would actually write one.
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:24px;background:#ffffff;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;font-size:15px;line-height:1.6;">
  <div style="max-width:540px;">
    <p>Hi ${firstName},</p>
    <p>You're one of our first members, and we wanted to say thanks personally for being early to LearningOnline.ai.</p>
    <p>As a thank-you, <strong>Journey</strong> is now yours, permanently — no payment, ever, nothing to renew.</p>
    <p>In return, we'd love a favour: spend a few minutes in the course and tell us honestly what's working and what isn't. There's a quick feedback box on your dashboard, or just reply to this email directly — we read every one.</p>
    <p>Here's the link: <a href="${appUrl}/dashboard" style="color:#1A6EFF;">${appUrl}/dashboard</a></p>
    <p>Thanks again,<br/>Avi &amp; Mini<br/>LearningOnline.ai</p>
    <p style="margin-top:32px;color:#8a8a8a;font-size:12px;">
      ${businessAddress}<br/>
      <a href="mailto:hello@learningonline.ai?subject=Unsubscribe" style="color:#8a8a8a;">Unsubscribe</a>
    </p>
  </div>
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
