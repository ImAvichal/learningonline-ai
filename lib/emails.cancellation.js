// ──────────────────────────────────────────────────────────────────────────────
// APPEND THIS to your existing lib/emails.js
//
// It follows the same Resend pattern as sendPurchaseConfirmation: it no-ops
// gracefully if RESEND_API_KEY is not set, so it never throws and never blocks
// the cancellation flow.
//
// If your lib/emails.js already imports/initialises Resend at the top, you do
// NOT need to duplicate that — just add the exported function below and reuse
// the existing `resend` instance and FROM address.
// ──────────────────────────────────────────────────────────────────────────────

export async function sendCancellationEmail({ to, firstName, expiryDate, immediate = false }) {
  // If email isn't configured, no-op (matches existing behaviour).
  if (!process.env.RESEND_API_KEY) {
    console.log('[emails] RESEND_API_KEY not set — skipping cancellation email')
    return { skipped: true }
  }

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)
  const FROM = process.env.EMAIL_FROM || 'LeO AI <hello@learningonline.ai>'

  const accessLine = immediate
    ? `Your access to paid courses and premium resources has now ended.`
    : `You will retain access until ${expiryDate}.`

  const subject = 'Your Learning Online AI Subscription Has Been Cancelled'

  const html = `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a2236;line-height:1.6;">
    <div style="padding:28px 0;text-align:center;border-bottom:1px solid #eef1f6;">
      <span style="font-size:20px;font-weight:800;color:#1A6EFF;">LeO AI</span>
    </div>
    <div style="padding:32px 8px;">
      <p>Hi ${firstName},</p>
      <p>Your subscription has been successfully cancelled.</p>
      <p>${accessLine}</p>
      <p>After that, you'll continue to have access to any free learning content, including AI for Parents, but your paid courses and premium resources will no longer be available.</p>
      <p>We're sorry to see you go and hope you've found value in your learning journey.</p>
      <p>You're always welcome back, and your account history will remain available should you decide to re-enrol in the future.</p>
      <p>If you have any questions, simply reply to this email.</p>
      <p style="margin-top:24px;">Kind regards,<br/>The Learning Online AI Team</p>
    </div>
    <div style="padding:18px 8px;border-top:1px solid #eef1f6;text-align:center;color:#8a93a6;font-size:12px;">
      learningonline.ai
    </div>
  </div>`

  const text = `Hi ${firstName},

Your subscription has been successfully cancelled.

${accessLine}

After that, you'll continue to have access to any free learning content, including AI for Parents, but your paid courses and premium resources will no longer be available.

We're sorry to see you go and hope you've found value in your learning journey.

You're always welcome back, and your account history will remain available should you decide to re-enrol in the future.

If you have any questions, simply reply to this email.

Kind regards,
The Learning Online AI Team`

  try {
    await resend.emails.send({ from: FROM, to, subject, html, text })
    return { sent: true }
  } catch (err) {
    console.error('[emails] cancellation email failed:', err.message)
    return { sent: false, error: err.message }
  }
}
