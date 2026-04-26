// pages/pricing.js
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Nav, Reveal, Card, SectionLabel, Button, TierBadge } from '../components/ui'
import { TIERS, TIER_ORDER } from '../data/tiers'
import { useAuth } from '../lib/auth'

export default function Pricing() {
  const { user } = useAuth()
  const router   = useRouter()

  const handleEnrol = (tierId) => {
    if (tierId === 'enterprise') {
      window.location.href = 'mailto:hello@learningonline.ai?subject=Enterprise Enquiry — Flowcore AI Academy'
      return
    }
    if (!user) { router.push(`/signup?tier=${tierId}`); return }
    router.push(`/checkout?tier=${tierId}`)
  }

  return (
    <>
      <Head><title>Pricing — Flowcore AI Academy · LearningOnline.AI</title></Head>
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
                One program. Three levels of depth. Pick the tier that matches where you are and where you're going.
              </p>
            </div>
          </Reveal>

          {/* Tier cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {TIER_ORDER.map((tid, i) => {
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

                    <TierBadge tier={tid} className="mb-4" />
                    <div className="font-display font-black text-5xl mb-1">{t.priceDisplay}</div>
                    <div className="text-xs text-muted mb-1">{t.priceRange}</div>
                    <div className="text-xs text-muted mb-5 font-display">{t.billing}</div>
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

                    {owned ? (
                      <Button variant="success" href="/dashboard" className="w-full justify-center">
                        ✓ Your Current Tier → Dashboard
                      </Button>
                    ) : (
                      <button onClick={() => handleEnrol(tid)}
                        className={`w-full py-3.5 rounded-xl font-display font-bold text-sm transition-all ${
                          t.highlighted
                            ? 'bg-amber-400 hover:bg-amber-300 text-navy shadow-[0_0_24px_rgba(245,158,11,0.3)]'
                            : tid === 'enterprise'
                            ? 'border border-purple-400/40 text-purple-300 hover:bg-purple-400/10'
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
            <h3 className="font-display font-bold text-2xl text-center mb-6">What's included at each tier</h3>
            <Card className="overflow-hidden mb-12">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="p-4 text-left text-muted font-display font-bold text-xs uppercase tracking-wider w-1/2">Feature</th>
                      <th className="p-4 text-center"><TierBadge tier="individual" label="Individual" /></th>
                      <th className="p-4 text-center"><TierBadge tier="smb" label="SMB" /></th>
                      <th className="p-4 text-center"><TierBadge tier="enterprise" label="Enterprise" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Core 8-module curriculum',            '✓','✓','✓'],
                      ['Basic template library (8)',          '✓','✓','✓'],
                      ['ROI Calculator',                      '✓','✓','✓'],
                      ['90-Day Execution Plan template',      '✓','✓','✓'],
                      ['Business examples per module',        '—','✓','✓'],
                      ['Use case playbooks by industry',      '—','✓','✓'],
                      ['Implementation templates',            '—','✓','✓'],
                      ['Up to 5 team seats',                  '—','✓','✓'],
                      ['Data readiness program',              '—','—','✓'],
                      ['Enterprise AI operating model',       '—','—','✓'],
                      ['Governance & ethics framework',       '—','—','✓'],
                      ['AI command centre design',            '—','—','✓'],
                      ['Unlimited team seats',                '—','—','✓'],
                      ['Monthly advisory session (1hr)',      '—','—','✓'],
                    ].map(([feature, a, b, c]) => (
                      <tr key={feature} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                        <td className="p-4 text-muted text-sm">{feature}</td>
                        {[a, b, c].map((v, i) => (
                          <td key={i} className={`p-4 text-center font-bold text-sm ${v === '✓' ? 'text-success' : 'text-white/20'}`}>{v}</td>
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
            <Card className="p-8 text-center mb-12">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-display font-bold text-xl mb-3">14-Day Money-Back Guarantee</h3>
              <p className="text-muted max-w-md mx-auto text-sm leading-relaxed">
                Complete Module 1 and don't believe this will deliver measurable value to your organisation — we'll refund you in full. No questions asked.
              </p>
            </Card>
          </Reveal>

          {/* FAQ */}
          <Reveal>
            <h3 className="font-display font-bold text-2xl text-center mb-8">Common questions</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                ['Is this live or self-paced?', 'Fully self-paced. No live sessions to attend. Learn on your schedule — access forever.'],
                ['Do I need technical AI knowledge?', 'No. Designed for business leaders, operators, and transformation professionals. Zero coding required.'],
                ['What\'s the difference between Individual and Small & Medium Business?', 'SMB adds industry-specific playbooks, implementation templates, and up to 5 team seats — so your team can learn together.'],
                ['What does Enterprise include beyond SMB?', 'The full enterprise operating model, data readiness program, governance frameworks, unlimited team seats, and monthly advisory sessions.'],
                ['Can I upgrade tiers later?', 'Yes. Email us and we\'ll apply your previous payment as a credit toward the higher tier.'],
                ['Are payments secure?', 'Yes. All payments are processed by Stripe — the same platform used by Amazon, Shopify, and millions of businesses worldwide. We never see your card details.'],
                ['Can I expense this course?', 'Yes. We provide a tax invoice for professional development expenses on request.'],
                ['Is GST included?', 'GST is calculated and added at checkout for Australian buyers. International buyers pay the listed price with no GST.'],
              ].map(([q, a]) => (
                <Card key={q} className="p-6">
                  <h4 className="font-display font-bold text-sm text-white mb-2">{q}</h4>
                  <p className="text-sm text-muted leading-relaxed">{a}</p>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
