// components/CookieConsent.js
//
// Cookie consent banner wired to Google Consent Mode v2.
//
// Behaviour:
//   - Shows on first visit (no saved choice in localStorage)
//   - "Accept all"   → grants analytics + ad storage
//   - "Reject non-essential" → keeps only strictly-necessary storage
//   - Saves the choice to localStorage so returning visitors aren't re-prompted
//   - Calls gtag('consent','update',...) so GTM tags fire/stay-blocked accordingly
//
// The default-denied state and the restore-on-load logic live in _document.js,
// which runs before GTM. This component only handles the user's *active* choice.

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'leo_consent'

function updateConsent({ analytics, ad }) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', {
    ad_storage: ad ? 'granted' : 'denied',
    ad_user_data: ad ? 'granted' : 'denied',
    ad_personalization: ad ? 'granted' : 'denied',
    analytics_storage: analytics ? 'granted' : 'denied',
  })
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show if no prior choice is saved
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) setVisible(true)
    } catch (e) {
      setVisible(true)
    }
  }, [])

  const persist = (choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(choice))
    } catch (e) { /* storage unavailable — choice still applies for this session */ }
  }

  const acceptAll = () => {
    const choice = { analytics: true, ad: true, ts: Date.now() }
    persist(choice)
    updateConsent(choice)
    setVisible(false)
  }

  const rejectNonEssential = () => {
    const choice = { analytics: false, ad: false, ts: Date.now() }
    persist(choice)
    updateConsent(choice)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6"
    >
      <div className="max-w-4xl mx-auto bg-navy-mid border border-white/15 rounded-2xl shadow-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="font-display font-bold text-sm text-white mb-1">
              We use cookies
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              We use strictly necessary cookies to run the site, and — with your consent — analytics and advertising cookies to understand traffic and measure our ads. You can change your choice anytime.{' '}
              <Link href="/privacy" className="text-blue-bright hover:underline">
                Read our Privacy &amp; Cookie Policy
              </Link>.
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={rejectNonEssential}
              className="px-4 py-2.5 rounded-lg border border-white/20 text-white/85 hover:bg-white/5 font-display font-bold text-xs transition-all whitespace-nowrap"
            >
              Reject non-essential
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2.5 rounded-lg bg-blue hover:bg-blue-bright text-white font-display font-bold text-xs transition-all whitespace-nowrap"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
