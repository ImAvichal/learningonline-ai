// pages/index.js — learningonline.ai homepage
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { Nav, Reveal, Card, SectionLabel, Button, TierBadge, BRAND } from '../components/ui'
import { MODULES } from '../data/modules'
import { TIERS, TIER_ORDER } from '../data/tiers'
import { useAuth } from '../lib/auth'

export default function Home() {
  const { user } = useAuth()
  const [activeModule, setActiveModule] = useState(0)

  return (
    <>
      <Head>
        <title>Flowcore AI Academy — AI That Actually Works</title>
        <meta name="description" content="The execution-focused AI program for professionals, SMBs, and enterprises. Embed AI into real workflows and deliver measurable outcomes in weeks." />
      </Head>
      <Nav transparent />

      {/* ── Hero ── */}
      <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40"
          style={{ backgroundImage:'linear-gradient(rgba(26,110,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(26,110,255,0.04) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-28 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue/30 bg-blue/10 text-blue-bright text-xs font-display font-bold mb-10 tracking-wide">
              <span className="w-1.5 h-1.5 bg-blue rounded-full pulse-dot" />
              By <a href={BRAND.parentUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{BRAND.parent}</a> · 8 Modules · 3 Tiers · 30+ Lessons
            </div>

            <h1 className="font-display font-black leading-[1.0] tracking-tight mb-6"
              style={{ fontSize:'clamp(42px,6.5vw,80px)' }}>
              AI That<br/><span className="text-blue">Actually Works</span><br/>In Your Business
            </h1>

            <p className="text-xl text-muted font-light leading-relaxed max-w-xl mb-3">
              <em>Flowcore AI Academy</em>
            </p>
            <p className="text-lg text-muted leading-relaxed max-w-xl mb-10">
              The execution-focused program that takes professionals, SMBs, and enterprises from AI experiments to measurable business outcomes — in weeks, not months.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              {user?.tier
                ? <Button variant="large" href="/dashboard">Go to Dashboard →</Button>
                : <>
                    <Button variant="large" href="/pricing">View Pricing & Enrol</Button>
                    <Button variant="ghost" href="#curriculum" className="text-base px-8 py-4">See Curriculum ↓</Button>
                  </>
              }
            </div>

            <div className="flex flex-wrap gap-10 pt-8 border-t border-white/5">
              {[
                { val:'8',   unit:'modules',   desc:'End-to-end curriculum' },
                { val:'3',   unit:'tiers',     desc:'Individual · SMB · Enterprise' },
                { val:'30+', unit:'lessons',   desc:'Execution-focused content' },
                { val:'90',  unit:'days',      desc:'To first live use case' },
              ].map(s => (
                <div key={s.unit}>
                  <div className="font-display font-black text-3xl">{s.val}<span className="text-blue text-2xl">{s.unit}</span></div>
                  <div className="text-xs text-muted mt-0.5">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tiers ── */}
      <section className="py-20 bg-navy-mid border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>Three Tiers, One Program</SectionLabel>
              <h2 className="font-display font-bold text-4xl">Pick the level that matches where you are</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {TIER_ORDER.map((tid, i) => {
              const t = TIERS[tid]
              return (
                <Reveal key={tid} delay={i * 80}>
                  <Card hover className={`p-7 h-full flex flex-col ${t.highlighted ? 'border-amber-400/30 bg-amber-400/[0.02]' : ''}`}>
                    <TierBadge tier={tid} className="mb-4" />
                    <div className="font-display font-black text-4xl mb-1">{t.priceDisplay}</div>
                    <div className="text-xs text-muted mb-1">{t.priceRange}</div>
                    <div className="text-xs text-muted mb-5">{t.billing}</div>
                    <p className="text-sm text-muted leading-relaxed flex-1 mb-6">{t.description}</p>
                    <Button href="/pricing" variant={t.highlighted ? 'primary' : 'ghost'} className="w-full justify-center">
                      {t.cta}
                    </Button>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Outcomes ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>What You'll Walk Away With</SectionLabel>
              <h2 className="font-display font-bold text-4xl">Not theory. Actual deliverables.</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon:'🎯', title:'AI Readiness Snapshot',   desc:'Know exactly where your organisation stands and which opportunities are highest priority.' },
              { icon:'📋', title:'Workflow Blueprint',      desc:'A designed, reviewed AI workflow ready for implementation — not a concept. A plan.' },
              { icon:'💰', title:'ROI Business Case',       desc:'A credible financial case your CFO will respect, built on real data from your organisation.' },
              { icon:'⚖️', title:'Governance Framework',   desc:'AI governance plan covering risk, compliance, accountability, and review cadence.' },
              { icon:'🚀', title:'90-Day Execution Plan',   desc:'Week-by-week roadmap from sign-off to live use case — contingency built in.' },
              { icon:'📁', title:'Template Library',        desc:'Up to 18 production-ready templates depending on tier — download and use immediately.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <Card hover className="p-6 h-full">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-display font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section id="curriculum" className="py-24 bg-navy-mid border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>Full Curriculum</SectionLabel>
              <h2 className="font-display font-bold text-4xl mb-4">8 modules. Zero filler.</h2>
              <p className="text-muted max-w-xl mx-auto">Every lesson produces a deliverable. Every module builds on the last.</p>
            </div>
          </Reveal>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-72 space-y-2 flex-shrink-0">
              {MODULES.map((mod, i) => (
                <button key={mod.id} onClick={() => setActiveModule(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    activeModule === i
                      ? 'border-blue/40 bg-blue/10'
                      : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                  }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{mod.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-display font-bold text-muted">Module {mod.number}</div>
                      <div className={`text-sm font-display font-bold truncate ${activeModule===i?'text-white':'text-white/80'}`}>{mod.title}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex-1">
              <Card glow className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-4xl">{MODULES[activeModule].icon}</span>
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue/10 border border-blue/25 rounded-full text-xs font-display font-bold text-blue-bright mb-2">
                      Module {MODULES[activeModule].number}
                    </span>
                    <h3 className="font-display font-bold text-2xl mb-2">{MODULES[activeModule].title}</h3>
                    <p className="text-muted text-sm">{MODULES[activeModule].description}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  {MODULES[activeModule].lessons.map((l, i) => (
                    <div key={l.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="w-6 h-6 rounded-full bg-navy-light border border-white/10 flex items-center justify-center text-xs text-muted font-display font-bold flex-shrink-0">{i+1}</div>
                      <span className="text-sm text-white/80 flex-1">{l.title}</span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {l.tier !== 'individual' && <TierBadge tier={l.tier} />}
                        {l.duration && <span className="text-xs text-muted">{l.duration}</span>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-success/5 border border-success/20">
                  <span className="text-xl">📋</span>
                  <div>
                    <div className="text-[10px] font-display font-bold text-success uppercase tracking-wider">Module Deliverable</div>
                    <div className="text-sm text-white">{MODULES[activeModule].deliverable}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>What Practitioners Say</SectionLabel>
              <h2 className="font-display font-bold text-3xl">Built from real implementation experience</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { q:'"I\'ve sat through dozens of AI webinars. This is the first thing that gave me a plan I could walk into my CRO with."', name:'Operations Director', role:'Financial Services, 2,400 employees' },
              { q:'"The ROI calculator alone paid for this course. We got approval for a $340K AI project within 3 weeks of completing Module 6."', name:'Transformation Lead', role:'Telecommunications, ASX200' },
              { q:'"Our CTO called it the most practical AI planning document he\'d seen come from inside the business."', name:'Head of Customer Ops', role:'Retail, 1,100 employees' },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <Card className="p-6 h-full flex flex-col">
                  <div className="text-yellow-400 text-sm mb-4">★★★★★</div>
                  <p className="text-sm text-muted leading-relaxed flex-1 mb-5 italic">{t.q}</p>
                  <div>
                    <div className="font-display font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-muted">{t.role}</div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Praise Consulting bridge ── */}
      <section className="py-20 bg-navy-mid border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <Card glow className="p-10 text-center">
              <div className="text-4xl mb-5">🏢</div>
              <div className="text-xs font-display font-bold text-muted uppercase tracking-widest mb-3">Powered by</div>
              <h2 className="font-display font-bold text-3xl mb-4">Praise Consulting</h2>
              <p className="text-muted max-w-lg mx-auto mb-6">
                This academy is built by the team at Praise Consulting — an Australian AI transformation consultancy. Need hands-on implementation support beyond the course? We can help.
              </p>
              <a href={BRAND.parentUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-muted hover:text-white hover:border-blue hover:bg-blue/10 font-display font-bold text-sm rounded-lg transition-all">
                Visit Praise Consulting ↗
              </a>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <h2 className="font-display font-bold text-4xl mb-4">Stop experimenting.<br/>Start delivering.</h2>
            <p className="text-muted text-lg mb-8">Pick your tier and begin. First use case live within 90 days — or your money back.</p>
            <Button variant="large" href="/pricing">View Pricing & Enrol →</Button>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <span className="font-display font-black text-white">Flowcore<span className="text-blue">AI</span> <span className="text-muted font-normal text-xs tracking-widest">ACADEMY</span></span>
          <div className="flex gap-6">
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/login"   className="hover:text-white">Sign In</Link>
            <a href={BRAND.parentUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">Praise Consulting ↗</a>
          </div>
          <p>© 2025 Praise Consulting Pty Ltd · learningonline.ai</p>
        </div>
      </footer>
    </>
  )
}
