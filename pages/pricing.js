// pages/pricing.js — Updated pricing: $49 / $99 / $149
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Nav, Reveal, Card, SectionLabel, Button, TierBadge } from '../components/ui'
import { TIERS, TIER_ORDER, DISPLAY_ORDER } from '../data/tiers'
import { useAuth } from '../lib/auth'

export default function Pricing() {
  const { user } = useAuth()
  const router   = useRouter()

  const handleEnrol = (tierId) => {
    if (!user) { router.push(`/signup?tier=${tierId}`); return }
    router.push(`/checkout?tier=${tierId}`)
  }

  return (
    <>
      <Head><title>Pricing — Le On AI</title></Head>
      <Nav />
      <div className="pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6">

          <Reveal>
            <div className="text-center mb-14">
              <SectionLabel>Pricing</SectionLabel>
              <h1 className="font-display font-black tracking-tight mb-4" style={{ fontSize: 'clamp(36px,5vw,58px)' }}>
                Choose your tier
              </h1>
              <p className="text-muted text-xl max-w-lg mx-auto">
                One program. Three levels of depth. Priced on value — not seat count.
              </p>
            </div>
          </Reveal>

          {/* Tier cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {DISPLAY_ORDER.map((tid, i) => {
              const t     = TIERS[tid]
              const owned = user?.tier === tid
              return (
                <Reveal key={tid} delay={i * 80}>
                  <div className={`relative rounded-2xl border p-7 flex flex-col h-full transition-all hover:-translate-y-1 ${
                    t.highlighted
                      ? 'border-amber-400/40 bg-amber-400/[0.03] shadow-[0_0_50px_rgba(245,158,11,0.08)]'
                      : 'border-white/8 bg-white/[0.02]'
                  }`}>
                    {t.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-amber-400 text-navy font-display text-[10px] font-bold px-4 py-1 rounded-full whitespace-nowrap">MOST POPULAR</span>
                      </div>
                    )}

                    <TierBadge tier={tid} label={t.label} className="mb-4" />
                    <div className="font-display font-black text-5xl mb-1">{t.priceDisplay}</div>
                    <div className="text-xs text-muted mb-5">{t.billing}</div>
                    <p className="text-sm text-muted leading-relaxed mb-4 flex-1">{t.description}</p>

                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 mb-5">
                      <div className="text-[10px] font-display font-bold text-muted uppercase tracking-wider mb-1">Ideal for</div>
                      <p className="text-xs text-white/70 leading-relaxed">{t.idealFor}</p>
                    </div>

                    <ul className="space-y-2 mb-7">
                      {t.features.map((f, fi) => (
                        <li key={fi} className="flex gap-2.5 text-sm">
                          <span className="text-success flex-shrink-0 mt-0.5">✓</span>
                          <span className="text-white/80">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {t.free ? (
                      <Link href={user ? '/parents' : '/login?redirect=/parents'}
                        className="w-full py-3.5 rounded-xl font-display font-bold text-sm transition-all text-center block bg-success/10 border border-success/30 text-success hover:bg-success/20">
                        {user ? 'Start Free Module →' : 'Sign In to Access →'}
                      </Link>
                    ) : owned ? (
                      <Button variant="success" href="/dashboard" className="w-full justify-center">
                        ✓ Your Current Tier → Dashboard
                      </Button>
                    ) : (
                      <button onClick={() => handleEnrol(tid)}
                        className={`w-full py-3.5 rounded-xl font-display font-bold text-sm transition-all ${
                          t.highlighted
                            ? 'bg-amber-400 hover:bg-amber-300 text-navy shadow-[0_0_24px_rgba(245,158,11,0.3)]'
                            : tid === 'enterprise'
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
            <h3 className="font-display font-bold text-2xl text-center mb-6">What's included</h3>
            <Card className="overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="p-4 text-left text-muted font-display font-bold text-xs uppercase tracking-wider w-1/2">Feature</th>
                      <th className="p-4 text-center"><TierBadge tier="individual" label="Upskill" /></th>
                      <th className="p-4 text-center"><TierBadge tier="smb" label="SMB" /></th>
                      <th className="p-4 text-center"><TierBadge tier="enterprise" label="Enterprise" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['AI Foundations & token awareness',    '✓','✓','✓'],
                      ['Key roles & leadership frameworks',   '✓','✓','✓'],
                      ['Use case identification',             '✓','✓','✓'],
                      ['Module Q&A scoring',                  '✓','✓','✓'],
                      ['Cheat sheets & prompt guides',        '✓','✓','✓'],
                      ['Use case prioritisation & 5-yr model','—','✓','✓'],
                      ['Workflow design templates',           '—','✓','✓'],
                      ['Data readiness program',              '—','✓','✓'],
                      ['ROI modelling & business case',       '—','✓','✓'],
                      ['People & change adoption toolkit',    '—','✓','✓'],
                      ['Up to 5 team seats',                  '—','✓','✓'],
                      ['Responsible AI framework',            '—','—','✓'],
                      ['Sustainability & AI program',         '—','—','✓'],
                      ['Multimodal AI & orchestration',       '—','—','✓'],
                      ['90-Day execution roadmap',            '—','—','✓'],
                      ['Unlimited team seats',                '—','—','✓'],
                    ].map(([feature, a, b, c]) => (
                      <tr key={feature} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                        <td className="p-4 text-muted text-sm">{feature}</td>
                        {[a,b,c].map((v, i) => (
                          <td key={i} className={`p-4 text-center font-bold text-sm ${v==='✓'?'text-success':'text-white/15'}`}>{v}</td>
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
              <h3 className="font-display font-bold text-xl mb-3">14-Day Money-Back Guarantee</h3>
              <p className="text-muted max-w-md mx-auto text-sm leading-relaxed">
                Complete Module 1 and don't believe this will deliver measurable value — we'll refund you in full. No questions asked.
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
                ['What\'s the difference between the tiers?', 'Individual Upskill is AI literacy for professionals. Business Owner adds implementation tools and frameworks. Enterprise Leader adds governance, orchestration, and the full transformation roadmap.'],
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
      </div>
    </>
  )
}
