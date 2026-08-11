// pages/pricing.js — Subscription pricing: $19/mo Journey, $39/mo Pro
import { useState } from 'react'
import Footer from '../components/Footer'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Nav, Reveal, Card, SectionLabel, Button, TierBadge, BillingToggle } from '../components/ui'
import { TIERS, TIER_ORDER, DISPLAY_ORDER, getPriceLabel } from '../data/tiers'
import { useAuth } from '../lib/auth'
import { useRegion } from '../lib/region'
import { useTranslation } from '../lib/i18n'
import { REGIONAL_PRICING } from '../data/tiers'

// Pricing FAQ — visible Q&A + FAQPage schema. Answers grounded in actual
// platform behaviour (one-time-purchase tiers, 7-day refund, Journey→Pro upgrade,
// self-service cancellation via the billing portal).
const PRICING_FAQS = [
  {
    q: 'Is there a free option?',
    a: 'Yes. The Parents & Caregivers module is completely free, forever, with no card required. The two paid tiers — Starting the Journey and The Pro — unlock the full professional curriculum.',
  },
  {
    q: 'Is this a subscription?',
    a: 'No. Both Starting the Journey and The Pro are one-time payments — pay once and it is yours for good, including 12 months of content updates. Nothing renews and nothing bills you again.',
  },
  {
    q: 'What is the difference between Starting the Journey and The Pro?',
    a: 'Starting the Journey covers the core foundations and execution modules. The Pro includes everything in Journey plus the advanced modules — Responsible AI, Sustainability, Multimodal AI & Orchestration, the 90-Day Execution Plan, AI Security & Data Protection, and AI Policy for Government & Providers — along with all Pro deliverables and frameworks.',
  },
  {
    q: 'Can I upgrade from Journey to Pro later?',
    a: 'Yes, any time from your dashboard. You only pay the difference between what you already paid for Journey and the price of Pro — never the full Pro price again.',
  },
  {
    q: 'What is your refund policy?',
    a: 'Every purchase carries a 7-day money-back guarantee. If you do not believe the platform delivers measurable value within 7 days, contact us for a full refund — no hoops to jump through.',
  },
  {
    q: 'Does pricing differ by country?',
    a: 'Yes. We detect your region automatically and show local pricing for Australia, the United States, India, and the Philippines, so what you see is what you are billed — in your local currency.',
  },
]

export default function Pricing() {
  const { t: tr } = useTranslation()
  const { user } = useAuth()
  const [interval, setInterval] = useState('monthly') // Default to monthly (lower upfront)
  const { region } = useRegion()
  const regionalConfig = REGIONAL_PRICING[region] || REGIONAL_PRICING.AU
  const priceFor = (tierKey) => getPriceLabel(tierKey, region) || '—'
  const router   = useRouter()

  const handleEnrol = (tierId) => {
    // Checkout now handles authentication in-page, so route straight there
    // for everyone — no /login bounce. Auth + payment happen on one page.
    router.push(`/checkout?tier=${tierId}&interval=${interval}`)
  }

  return (
    <>
      <Head><title>{tr("pricing.pageTitle")} — LeO AI</title>
        <meta name="description" content="Simple, transparent pricing for LeO AI. A free Parents module, plus two one-time-purchase tiers: Starting the Journey and The Pro. Full refund within 7 days if it doesn't deliver value." />
        <link rel="canonical" href="https://www.learningonline.ai/pricing" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: PRICING_FAQS.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }),
          }}
        />
      </Head>
      <Nav />
      <div className="pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6">

          <Reveal>
            <div className="text-center mb-14">
              <SectionLabel>{tr("pricing.pageTitle")}</SectionLabel>
              <h1 className="font-display font-black tracking-tight mb-4" style={{ fontSize: 'clamp(36px,5vw,58px)' }}>
                {tr("pricing.pageHeading")}
              </h1>
              <p className="text-muted text-xl max-w-lg mx-auto">
                {tr("pricing.pageSubtitle")}
              </p>
            </div>
          </Reveal>

          {/* Tier cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14">
            {DISPLAY_ORDER.map((tid, i) => {
              const t     = TIERS[tid]
              const tierRank = { parents: 0, journey: 1, pro: 2 }
              const userRank = user?.tier ? (tierRank[user.tier] ?? 0) : -1
              const cardRank = tierRank[tid] ?? 0
              const owned = user?.tier === tid
              const accessibleViaHigher = user?.tier && userRank > cardRank  // e.g. user is 'pro', card is 'journey'
              const upgradeAvailable = user?.tier && userRank < cardRank   // e.g. user is 'journey', card is 'pro'
              return (
                <Reveal key={tid} delay={i * 80}>
                  <div className={`relative rounded-2xl border p-7 flex flex-col h-full transition-all hover:-translate-y-1 ${
                    t.highlighted
                      ? 'border-amber-400/40 bg-amber-400/[0.03] shadow-[0_0_50px_rgba(245,158,11,0.08)]'
                      : 'border-white/8 bg-white/[0.02]'
                  }`}>
                    {t.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-amber-400 text-navy font-display text-[10px] font-bold px-4 py-1 rounded-full whitespace-nowrap">{tr("common.mostPopular")}</span>
                      </div>
                    )}

                    <TierBadge tier={tid} label={t.label} className="mb-4" />
                    <div className="font-display font-black mb-1 leading-none whitespace-nowrap overflow-hidden" style={{fontSize: 'clamp(22px, 2.4vw, 28px)'}}>
                      {tid === 'parents' ? t.priceDisplay : priceFor(tid)}
                    </div>
                    <div className="text-xs text-muted mb-5">{tid === 'parents' ? tr('common.alwaysFree') : 'One payment · yours for good'}</div>
                    {tid === 'pro' && (
                      <div className="text-xs text-success font-display font-bold mb-5 -mt-3">Includes 12 months of content updates</div>
                    )}
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{t.description}</p>

                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 mb-5">
                      <div className="text-[10px] font-display font-bold text-muted uppercase tracking-wider mb-1">{tr("common.idealFor") || "Ideal for"}</div>
                      <p className="text-xs text-gray-500 leading-relaxed">{t.idealFor}</p>
                    </div>

                    <ul className="space-y-2.5 mb-7">
                      {t.features.map((f, fi) => (
                        <li key={fi} className="flex items-start justify-between gap-3 text-sm pb-2 border-b border-gray-100 dark:border-white/5 last:border-0">
                          <span className="text-gray-700 leading-relaxed flex-1">{f}</span>
                          <span className="text-success font-bold flex-shrink-0 mt-0.5">✓</span>
                        </li>
                      ))}
                    </ul>

                    {/* Subtle "View Terms & Refund Policy" link above CTA — paid tiers only */}
                    {!t.free && (
                      <div className="text-center mb-3">
                        <Link href="/terms" className="text-xs text-gray-500 hover:text-blue underline underline-offset-2 decoration-gray-300 hover:decoration-blue transition-colors">
                          View Terms &amp; Refund Policy
                        </Link>
                      </div>
                    )}

                    {t.free ? (
                      <Link href={user ? '/parents' : '/login?redirect=/parents'}
                        className="w-full py-3.5 sm:py-3.5 rounded-xl font-display font-bold text-sm transition-all text-center block bg-success/10 border border-success/30 text-success hover:bg-success/20">
                        {user ? tr('plans.parents.cta') + ' →' : tr('plans.parents.ctaLoggedOut') + ' →'}
                      </Link>
                    ) : (owned || accessibleViaHigher) ? (
                      <Button variant="success" href="/dashboard" className="w-full justify-center">
                        Continue Learning →
                      </Button>
                    ) : upgradeAvailable ? (
                      <button onClick={() => handleEnrol(tid)}
                        className="w-full py-3.5 sm:py-3.5 rounded-xl font-display font-bold text-sm transition-all bg-blue hover:bg-blue-bright text-white">
                        Upgrade to {t.name} →
                      </button>
                    ) : (
                      <button onClick={() => handleEnrol(tid)}
                        className={`w-full py-3.5 rounded-xl font-display font-bold text-sm transition-all ${
                          t.highlighted
                            ? 'bg-amber-400 hover:bg-amber-300 text-navy shadow-[0_0_24px_rgba(245,158,11,0.3)]'
                            : tid === 'pro'
                            ? 'bg-blue hover:bg-blue-bright text-white shadow-[0_0_20px_rgba(26,110,255,0.3)]'
                            : 'border border-blue/40 text-blue-bright hover:bg-blue/10'
                        }`}>
                        {t.cta}
                      </button>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>


          {/* Comparison table */}
          <Reveal>
            <h3 className="font-display font-bold text-2xl text-center mb-6">{tr("pricing.comparisonTitle")}</h3>
            <Card className="overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="p-4 text-left text-muted font-display font-bold text-xs uppercase tracking-wider w-1/2">Feature</th>
                      <th className="p-4 text-center"><TierBadge tier="journey" label="Starting the Journey" /></th>
                      <th className="p-4 text-center"><TierBadge tier="pro" label="The Pro" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['AI Foundations & token awareness',    '✓','✓'],
                      ['Key roles & leadership frameworks',   '✓','✓'],
                      ['Use case identification',             '✓','✓'],
                      ['Module Q&A scoring',                  '✓','✓'],
                      ['Cheat sheets & prompt guides',        '✓','✓'],
                      ['Use case prioritisation & 5-yr model','✓','✓'],
                      
                      ['Data readiness program',              '✓','✓'],
                      ['ROI modelling & business case',       '✓','✓'],
                      ['People & change adoption toolkit',    '✓','✓'],
                      ['Responsible AI framework',            '—','✓'],
                      ['Sustainability & AI program',         '—','✓'],
                      ['Multimodal AI & orchestration',       '—','✓'],
                      ['AI economics & cost management',      '—','✓'],
                      ['90-Day execution roadmap',            '—','✓'],
                      ['Ongoing release-cycle updates',       '✓','✓'],
                    ].map(([feature, a, b]) => (
                      <tr key={feature} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                        <td className="p-4 text-muted text-sm">{feature}</td>
                        {[a,b].map((v, i) => (
                          <td key={i} className={`p-4 text-center font-bold text-sm ${v==='✓'?'text-success':'text-gray-300'}`}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Reveal>

          {/* Guarantee */}
          <Reveal>
            <Card className="p-8 text-center mb-8">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-display font-bold text-xl mb-3">7-Day Money-Back Guarantee</h3>
              <p className="text-muted max-w-md mx-auto text-sm leading-relaxed">
                You may request a full refund within 7 days of purchase if you don't believe the platform delivers value for your learning journey. Approved refunds are typically processed within 3–5 business days.
              </p>
            </Card>
          </Reveal>

          {/* FAQ */}
          <Reveal>
            <h3 className="font-display font-bold text-2xl text-center mb-8">Common questions</h3>
            <div className="grid md:grid-cols-2 gap-5 mb-12">
              {[
                ['Is this self-paced?', 'Yes — fully self-paced with no live sessions. Learn on your schedule and access everything forever.'],
                ['Do I need technical knowledge?', 'No. Designed for business professionals and leaders. Zero coding required.'],
                ['What\'s the difference between the tiers?', 'Starting the Journey provides foundational AI learning, practical implementation guidance, and operational workflows. The Pro adds enterprise orchestration, governance, operating models, and the full transformation roadmap.'],
                ['Can I upgrade later?', 'Yes — email us and we\'ll apply your previous payment as credit toward the higher tier.'],
                ['Are payments secure?', 'Yes. All payments are processed by Stripe. We never see or store your card details.'],
                ['Can I expense this?', 'Yes. We provide a tax invoice for professional development expenses on request.'],
              ].map(([q, a]) => (
                <Card key={q} className="p-6">
                  <h4 className="font-display font-bold text-sm text-white mb-2">{q}</h4>
                  <p className="text-sm text-muted leading-relaxed">{a}</p>
                </Card>
              ))}
            </div>
          </Reveal>

          {/* Bespoke enterprise link */}
          <Reveal>
            <div className="text-center pt-4 border-t border-white/5">
              <p className="text-sm text-muted">
                Need bespoke enterprise support?{' '}
                <Link href="/contact" className="text-blue-bright hover:underline font-display font-bold">
                  Contact us →
                </Link>
              </p>
            </div>
          </Reveal>
        </div>

        {/* FAQ — Q&A formatting for SEO + AI search */}
        <div className="max-w-3xl mx-auto px-6 mt-20">
          <Reveal>
            <div className="text-center mb-10">
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="font-display font-bold text-3xl mb-3">Pricing questions</h2>
            </div>
          </Reveal>
          <div className="space-y-7">
            {PRICING_FAQS.map((f, i) => (
              <Reveal key={i} delay={i * 40}>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2 text-white">{f.q}</h3>
                  <p className="text-muted leading-relaxed">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    <Footer variant="dark" />
    </>
  )
}
