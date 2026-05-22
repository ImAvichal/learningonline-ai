// lib/gtm.js
//
// Lightweight helper for pushing events into the GTM dataLayer.
// The GTM container itself is installed in pages/_document.js.
//
// These events follow Google's recommended GA4 ecommerce event schema
// (sign_up, begin_checkout, purchase) so that GA4 and Google Ads recognise
// them natively when you map them to tags inside the GTM dashboard.
//
// IMPORTANT — consent:
// These pushes are safe to call regardless of consent state. They only write
// to the in-page dataLayer array. Whether a TAG actually fires (and sets
// cookies / sends data to Google) is controlled inside GTM by your triggers
// and, once configured, Google Consent Mode. Pushing to dataLayer does not
// itself set any cookie.

export function pushEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: eventName, ...params })
}

// ── Convenience wrappers for the key funnel events ──

// Fires when a user successfully creates an account.
export function trackSignUp({ method = 'email', tier } = {}) {
  pushEvent('sign_up', { method, ...(tier ? { tier } : {}) })
}

// Fires when a user lands on checkout with a tier selected.
export function trackBeginCheckout({ tier, interval, value, currency = 'AUD' } = {}) {
  pushEvent('begin_checkout', {
    currency,
    value,
    items: [{ item_id: `${tier}_${interval}`, item_name: tier, item_category: interval }],
  })
}

// Fires on the success page after a completed payment.
// `transactionId` should be the Stripe session/subscription id for dedup.
export function trackPurchase({ transactionId, tier, interval, value, currency = 'AUD', isUpgrade = false } = {}) {
  pushEvent('purchase', {
    transaction_id: transactionId,
    currency,
    value,
    ...(isUpgrade ? { upgrade: true } : {}),
    items: [{ item_id: `${tier}_${interval}`, item_name: tier, item_category: interval }],
  })
}
