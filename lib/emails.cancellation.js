// lib/emails.cancellation.js
// Cancellation email helper using the Resend HTTP API directly, matching the
// rest of the app's dependency-light email approach.

import { privateRecipientPayload } from './email-safety'

export async function sendCancellationEmail({ to, firstName, expiryDate, immediate = false }) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[emails] RESEND_API_KEY not set — skipping cancellation email')
    return { skipped: true }
  }

  const from = process.env.EMAIL_FROM || 'LeO AI <hello@learningonline.ai>'
  const accessLine = immediate
    ? 'Your access to paid courses and premium resources has now ended.'
    : `You will retain access until ${expiryDate}.`
  const subject = 'Your Learning Online AI Subscription Has Been Cancelled'

  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a2236;line-height:1.6;">
    <div style="padding:28px 0;text-align:center;border-bottom:1px solid #eef1f6;"><span style="font-size:20px;font-weight:800;color:#1A6EFF;">LeO AI</span></div>
    <div style="padding:32px 8px;">
      <p>Hi ${firstName},</p>
      <p>Your subscription has been successfully cancelled.</p>
      <p>${accessLine}</p>
      <p>After that, you'll continue to have access to complimentary learning content, including Parents &amp; Caregivers, but paid courses and premium resources will no longer be available.</p>
      <p>We're sorry to see you go. Your account history will remain available if you decide to re-enrol in the future.</p>
      <p>If you have any questions, simply reply to this email.</p>
      <p style="margin-top:24px;">Kind regards,<br/>The Learning Online AI Team</p>
    </div>
    <div style="padding:18px 8px;border-top:1px solid #eef1f6;text-align:center;color:#8a93a6;font-size:12px;">learningonline.ai</div>
  </div>`

  const text = `Hi ${firstName},\n\nYour subscription has been successfully cancelled.\n\n${accessLine}\n\nAfter that, you'll continue to have access to complimentary learning content, including Parents & Caregivers, but paid courses and premium resources will no longer be available.\n\nWe're sorry to see you go. Your account history will remain available if you decide to re-enrol in the future.\n\nIf you have any questions, simply reply to this email.\n\nKind regards,\nThe Learning Online AI Team`

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: privateRecipientPayload(to), subject, html, text }),
    })
    if (!response.ok) throw new Error(`Resend returned ${response.status}: ${await response.text()}`)
    return { sent: true }
  } catch (err) {
    console.error('[emails] cancellation email failed:', err.message)
    return { sent: false, error: err.message }
  }
}
