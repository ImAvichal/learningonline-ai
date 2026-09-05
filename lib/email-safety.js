// lib/email-safety.js
// Privacy guardrail for every customer-facing email path.
//
// POLICY: one visible recipient per message. Never send customer communications
// with multiple addresses in To or CC. Bulk communications must fan out into
// separate messages (or use a provider broadcast feature that keeps recipients
// private).

export function assertSingleRecipient(to) {
  if (Array.isArray(to)) {
    if (to.length !== 1) {
      throw new Error('EMAIL_PRIVACY_BLOCK: customer email must have exactly one visible recipient')
    }
    to = to[0]
  }

  if (typeof to !== 'string') {
    throw new Error('EMAIL_PRIVACY_BLOCK: recipient must be a single email address')
  }

  const recipient = to.trim()
  if (!recipient || recipient.includes(',') || recipient.includes(';') || /\s+/.test(recipient)) {
    throw new Error('EMAIL_PRIVACY_BLOCK: multiple or malformed recipients are not allowed')
  }

  // Lightweight format check. Provider validation remains authoritative.
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(recipient)) {
    throw new Error('EMAIL_PRIVACY_BLOCK: invalid recipient email address')
  }

  return recipient
}

export function privateRecipientPayload(to) {
  return [assertSingleRecipient(to)]
}
