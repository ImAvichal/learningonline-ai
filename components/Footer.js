// components/Footer.js — Site-wide footer.
//
// Two variants:
//   - "dark"  (default) — for the dark-themed homepage
//   - "light"           — for light-themed pages (pricing, terms, contact, mindset, etc.)
//
// Usage:
//   <Footer />                  → dark variant (homepage)
//   <Footer variant="light" />  → light variant (everywhere else)

import Link from 'next/link'
import { useTranslation } from '../lib/i18n'

export default function Footer({ variant = 'light' }) {
  const { t } = useTranslation()
  const isLight = variant === 'light'

  // ── Theme tokens — change in one place to retheme entire footer ─────────
  const tokens = isLight ? {
    container: 'bg-white border-t border-gray-200',
    brand: 'text-gray-900',
    brandAccent: 'text-blue',
    subtle: 'text-gray-500',
    columnHeading: 'text-gray-400',
    link: 'text-gray-600 hover:text-gray-900',
    divider: 'border-gray-200',
    finePrint: 'text-gray-500',
    finePrintBold: 'text-gray-700',
  } : {
    container: 'border-t border-white/5',
    brand: 'text-white',
    brandAccent: 'text-blue',
    subtle: 'text-muted',
    columnHeading: 'text-muted',
    link: 'text-muted hover:text-white',
    divider: 'border-white/5',
    finePrint: 'text-muted',
    finePrintBold: 'text-white',
  }

  // Use safe English fallbacks so this works even when i18n hasn't loaded
  const safeT = (key, fallback) => {
    try {
      const v = t(key)
      return (v && v !== key) ? v : fallback
    } catch { return fallback }
  }

  return (
    <footer className={`${tokens.container} py-10`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">

          {/* Brand block */}
          <div>
            <div className={`font-display font-black text-xl mb-0.5 ${tokens.brand}`}>
              LeO <span className={tokens.brandAccent}>AI</span>
            </div>
            <div className={`text-xs mb-3 ${tokens.subtle}`}>Learning Online · Artificial Intelligence</div>
            <p className={`text-sm max-w-xs leading-relaxed ${tokens.subtle}`}>
              The execution-focused AI program for professionals, families, businesses, and enterprise leaders.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex gap-12 flex-wrap">

            {/* Platform */}
            <div>
              <div className={`text-xs font-display font-bold uppercase tracking-wider mb-3 ${tokens.columnHeading}`}>Platform</div>
              <div className="space-y-2">
                <Link href="/"                className={`block text-sm ${tokens.link}`}>Home</Link>
                <Link href="/model-selection" className={`block text-sm ${tokens.link}`}>Choosing the Right AI</Link>
                <Link href="/mindset"         className={`block text-sm ${tokens.link}`}>Mindset</Link>
                <Link href="/glossary"        className={`block text-sm ${tokens.link}`}>Jargon Buster</Link>
                <Link href="/roadmap"         className={`block text-sm ${tokens.link}`}>Learning Evolution</Link>
                <Link href="/pricing"         className={`block text-sm ${tokens.link}`}>Pricing</Link>
              </div>
            </div>

            {/* Account */}
            <div>
              <div className={`text-xs font-display font-bold uppercase tracking-wider mb-3 ${tokens.columnHeading}`}>Account</div>
              <div className="space-y-2">
                <Link href="/parents"   className={`block text-sm ${tokens.link}`}>Parents &amp; Caregivers</Link>
                <Link href="/login"     className={`block text-sm ${tokens.link}`}>Sign In</Link>
                <Link href="/signup"    className={`block text-sm ${tokens.link}`}>Sign Up</Link>
                <Link href="/dashboard" className={`block text-sm ${tokens.link}`}>Dashboard</Link>
                <Link href="/terms"     className={`block text-sm ${tokens.link}`}>Terms &amp; Refund Policy</Link>
                <Link href="/privacy"   className={`block text-sm ${tokens.link}`}>Privacy &amp; Cookie Policy</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className={`text-xs font-display font-bold uppercase tracking-wider mb-3 ${tokens.columnHeading}`}>Get in Touch</div>
              <div className="space-y-2">
                <a    href="mailto:hello@learningonline.ai" className={`block text-sm ${tokens.link}`}>hello@learningonline.ai</a>
                <Link href="/contact"                       className={`block text-sm ${tokens.link}`}>Contact Us</Link>
                <Link href="/about"                         className={`block text-sm ${tokens.link}`}>About</Link>
              </div>
            </div>

          </div>
        </div>

        {/* Fine print */}
        <div className={`flex flex-col md:flex-row justify-between items-center pt-6 border-t ${tokens.divider} gap-3 text-xs ${tokens.finePrint}`}>
          <p>© {new Date().getFullYear()} LeO AI · learningonline.ai</p>
          <p className="leading-relaxed text-center md:text-right">
            <span className={`font-bold ${tokens.finePrintBold}`}>{safeT('pricing.moneyBack.title', '3-day refund policy')}</span>
            <span> — </span>
            <span>{safeT('pricing.moneyBack.body', "If you don't believe the platform delivers measurable value within 3 days of purchase, contact us for a full refund.")}</span>
            <span> </span>
            <span>{safeT('pricing.moneyBack.tagline', 'Processed in 3–5 business days.')}</span>
          </p>
        </div>

        {/* Legal trading-name line — small, last */}
        <div className={`mt-4 pt-3 border-t ${tokens.divider} text-center text-[11px] ${tokens.finePrint} leading-relaxed`}>
          Learning Online AI is a registered trading name of Praise Consulting Pty Ltd.
        </div>
      </div>
    </footer>
  )
}
