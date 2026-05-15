// lib/emails.js — Transactional email helper for LeO AI
//
// Sends purchase confirmation emails after successful Stripe payment.
// Uses Resend (https://resend.com) — clean API, generous free tier.
//
// === SETUP REQUIRED FOR PRODUCTION ===
// 1. Create a free Resend account at https://resend.com
// 2. Verify your sending domain (learningonline.ai) — Resend will show DNS records
// 3. Create an API key in Resend dashboard
// 4. Add to Vercel env vars:
//      RESEND_API_KEY = re_xxxxxxxxxxxx
//      EMAIL_FROM     = LeO AI <hello@learningonline.ai>
//      EMAIL_REPLY_TO = hello@learningonline.ai   (optional)
// 5. Redeploy
//
// If RESEND_API_KEY is not set, this module logs the email content but does NOT
// fail — the webhook continues working. This means deploy without email config
// is safe; emails just won't be sent until you wire it up.

const RESEND_API_URL = 'https://api.resend.com/emails'

/**
 * Send a purchase confirmation email to the customer.
 * Returns { sent: true } on success, { sent: false, reason } on graceful failure.
 * Never throws — callers don't need try/catch.
 */
export async function sendPurchaseConfirmation({ to, name, tier, interval, amount, currency, region }) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM || 'LeO AI <hello@learningonline.ai>'
  const replyTo = process.env.EMAIL_REPLY_TO || 'hello@learningonline.ai'

  if (!apiKey) {
    console.log('[email] RESEND_API_KEY not configured — skipping send to', to)
    return { sent: false, reason: 'not_configured' }
  }

  const content = buildConfirmationContent({ name, tier, interval, amount, currency, region })

  try {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: replyTo,
        subject: content.subject,
        html: content.html,
        text: content.text,
      }),
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      console.error('[email] Resend API error:', res.status, errText)
      return { sent: false, reason: 'api_error', status: res.status }
    }

    console.log('[email] ✓ Confirmation sent to', to)
    return { sent: true }
  } catch (err) {
    console.error('[email] Send failed:', err.message)
    return { sent: false, reason: 'exception', error: err.message }
  }
}

// ── Email content templates — tier-specific tone ─────────────────────────────
function buildConfirmationContent({ name, tier, interval, amount, currency, region }) {
  const firstName = (name || '').split(' ')[0] || 'there'
  const tierName = tier === 'pro' ? 'The Pro'
                 : tier === 'journey' ? 'Starting the Journey'
                 : tier === 'parents' ? 'Parents & Caregivers'
                 : 'LeO AI'
  const billingLabel = interval === 'annual' ? 'Annual' : 'Monthly'

  // Format the amount per region
  const formattedAmount = formatAmount(amount, currency)

  // Tier-specific intro paragraph
  const intro = tier === 'parents'
    ? `Welcome to Parents & Caregivers. You're about to take a calm, practical step toward understanding how AI is shaping your family's world — and how to guide it confidently.`
    : tier === 'journey'
    ? `Welcome to Starting the Journey. You've taken a meaningful step toward building practical AI capability — the kind that translates to better work, sharper thinking, and real productivity gains.`
    : tier === 'pro'
    ? `Welcome to The Pro. You're now part of a focused group of leaders building the strategy, governance and operating models to drive AI at enterprise scale.`
    : `Welcome to LeO AI. Your learning journey starts now.`

  const subject = `Welcome to LeO AI — your ${tierName} access is active`

  // Plain-text version (for email clients that don't render HTML)
  const text = `Hi ${firstName},

${intro}

Your enrolment is confirmed.

  Pathway:  ${tierName}
  Billing:  ${billingLabel}${interval === 'annual' ? '' : ' (renewing each month)'}
  Amount:   ${formattedAmount}

Start learning now: https://www.learningonline.ai/dashboard

What happens next:
  1. Your access is active immediately.
  2. You can pick up and put down lessons at your own pace — progress is saved automatically.
  3. A Stripe receipt is on its way separately for your records.

Need a hand?
Just reply to this email — we read every message.

— The LeO AI team
https://www.learningonline.ai`

  // HTML version
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${subject}</title>
  <style>
    /* Tighter mobile spacing — overrides desktop padding */
    @media only screen and (max-width: 480px) {
      .email-pad      { padding: 24px !important; }
      .email-pad-top  { padding: 28px 24px 8px !important; }
      .email-cta      { padding: 8px 24px 28px !important; }
      .email-cta-btn  { padding: 14px 28px !important; font-size: 15px !important; }
      h1.email-title  { font-size: 22px !important; }
    }
    a { color: #1a6eff; }
  </style>
</head>
<body style="margin:0;padding:0;background:#f7f8fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0a1628;-webkit-font-smoothing:antialiased;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;">
    <!-- Top accent stripe (premium feel) -->
    <tr>
      <td style="height:4px;background:linear-gradient(90deg,#1a6eff 0%,#3a8aff 100%);font-size:0;line-height:0;">&nbsp;</td>
    </tr>

    <!-- Header -->
    <tr>
      <td class="email-pad" style="padding:40px 40px 24px;text-align:left;">
        <div style="font-size:26px;font-weight:800;letter-spacing:-0.5px;line-height:1;">
          <span style="color:#0a1628;">LeO</span> <span style="color:#1a6eff;">AI</span>
        </div>
        <div style="font-size:11px;color:#9aa5bd;font-weight:600;letter-spacing:0.5px;margin-top:4px;text-transform:uppercase;">
          Learning Online · Artificial Intelligence
        </div>
      </td>
    </tr>

    <!-- Hero -->
    <tr>
      <td class="email-pad-top" style="padding:24px 40px 8px;">
        <h1 class="email-title" style="margin:0 0 18px;font-size:30px;font-weight:800;line-height:1.2;letter-spacing:-0.5px;color:#0a1628;">
          You're in, ${firstName}.
        </h1>
        <p style="margin:0;font-size:16px;line-height:1.65;color:#3d4a63;">
          ${intro}
        </p>
      </td>
    </tr>

    <!-- Enrolment Summary - premium card with subtle border + dividers -->
    <tr>
      <td style="padding:28px 40px 8px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#fbfcfd;border:1px solid #e8eaf0;border-radius:12px;">
          <tr>
            <td style="padding:24px 26px 6px;">
              <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:#1a6eff;text-transform:uppercase;">
                Your Enrolment
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 26px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size:14px;color:#3d4a63;">
                <tr>
                  <td style="padding:10px 0;color:#6b7891;width:40%;border-bottom:1px solid #eef0f5;">Pathway</td>
                  <td style="padding:10px 0;font-weight:600;color:#0a1628;text-align:right;border-bottom:1px solid #eef0f5;">${tierName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#6b7891;border-bottom:1px solid #eef0f5;">Billing</td>
                  <td style="padding:10px 0;font-weight:600;color:#0a1628;text-align:right;border-bottom:1px solid #eef0f5;">${billingLabel}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0 22px;color:#6b7891;">Amount paid</td>
                  <td style="padding:10px 0 22px;font-weight:700;color:#0a1628;text-align:right;font-size:15px;">${formattedAmount}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- CTA -->
    <tr>
      <td class="email-cta" style="padding:24px 40px 32px;text-align:center;">
        <a href="https://www.learningonline.ai/dashboard"
           class="email-cta-btn" style="display:inline-block;padding:16px 40px;background:#1a6eff;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;border-radius:10px;box-shadow:0 6px 16px rgba(26,110,255,0.28);letter-spacing:0.2px;">
          Open your dashboard →
        </a>
        <p style="margin:14px 0 0;font-size:12px;color:#9aa5bd;">
          Or visit <a href="https://www.learningonline.ai/dashboard" style="color:#1a6eff;text-decoration:none;">learningonline.ai/dashboard</a> any time.
        </p>
      </td>
    </tr>

    <!-- What you have access to -->
    <tr>
      <td class="email-pad" style="padding:8px 40px 28px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;color:#6b7891;text-transform:uppercase;margin-bottom:14px;">
          What you have access to
        </div>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size:14px;line-height:1.6;color:#3d4a63;">
          <tr>
            <td style="padding:6px 0;width:24px;vertical-align:top;color:#1a6eff;font-weight:700;">✓</td>
            <td style="padding:6px 0;">All ${tierName} learning modules — start at any module, complete in any order.</td>
          </tr>
          <tr>
            <td style="padding:6px 0;vertical-align:top;color:#1a6eff;font-weight:700;">✓</td>
            <td style="padding:6px 0;">Progress tracking — pick up exactly where you left off, on any device.</td>
          </tr>
          <tr>
            <td style="padding:6px 0;vertical-align:top;color:#1a6eff;font-weight:700;">✓</td>
            <td style="padding:6px 0;">Knowledge checks at the end of each module to test what stuck.</td>
          </tr>
          <tr>
            <td style="padding:6px 0;vertical-align:top;color:#1a6eff;font-weight:700;">✓</td>
            <td style="padding:6px 0;">A separate Stripe tax invoice for your records (arriving shortly).</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Next steps -->
    <tr>
      <td class="email-pad" style="padding:0 40px 32px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;color:#6b7891;text-transform:uppercase;margin-bottom:14px;">
          Suggested next steps
        </div>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size:14px;line-height:1.6;color:#3d4a63;">
          <tr>
            <td style="padding:5px 0;width:28px;vertical-align:top;color:#1a6eff;font-weight:700;font-size:13px;">1.</td>
            <td style="padding:5px 0;">Open your dashboard and start Module 1 — it sets the foundation for everything else.</td>
          </tr>
          <tr>
            <td style="padding:5px 0;vertical-align:top;color:#1a6eff;font-weight:700;font-size:13px;">2.</td>
            <td style="padding:5px 0;">Aim for 15–20 minutes per session — that's all it takes to make real progress.</td>
          </tr>
          <tr>
            <td style="padding:5px 0;vertical-align:top;color:#1a6eff;font-weight:700;font-size:13px;">3.</td>
            <td style="padding:5px 0;">Reply to this email any time with questions — we read every message.</td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:28px 40px 36px;border-top:1px solid #e8eaf0;font-size:13px;color:#6b7891;line-height:1.6;">
        <p style="margin:0 0 12px;font-size:14px;color:#3d4a63;">
          Need a hand? Just reply — <span style="color:#0a1628;font-weight:600;">we read every message.</span>
        </p>
        <p style="margin:18px 0 0;font-size:12px;color:#9aa5bd;">
          <a href="https://www.learningonline.ai" style="color:#1a6eff;text-decoration:none;font-weight:600;">learningonline.ai</a>
          <span style="color:#d4dae3;margin:0 6px;">·</span>
          <a href="https://www.learningonline.ai/terms" style="color:#9aa5bd;text-decoration:none;">Terms &amp; Refund Policy</a>
          <span style="color:#d4dae3;margin:0 6px;">·</span>
          <a href="https://www.learningonline.ai/contact" style="color:#9aa5bd;text-decoration:none;">Contact</a>
        </p>
        <p style="margin:14px 0 0;font-size:11px;color:#b1bccc;line-height:1.55;">
          Learning Online AI is a registered trading name of Praise Consulting Pty Ltd.<br>
          You received this email because you enrolled at learningonline.ai.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { subject, text, html }
}

// Format amount in smallest currency unit to a display string
function formatAmount(amount, currency) {
  if (typeof amount !== 'number') return ''
  const cur = (currency || 'aud').toUpperCase()
  const symbol = { AUD: '$', USD: '$', INR: '₹', PHP: '₱', EUR: '€', GBP: '£' }[cur] || ''
  // Most currencies use 2 decimals; INR/PHP smallest unit is still hundredths in Stripe
  const value = (amount / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return `${symbol}${value} ${cur}`
}
