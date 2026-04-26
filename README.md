// pages/index.js — LearningOnline.AI homepage
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { Nav, Reveal, Card, SectionLabel, Button, TierBadge, BRAND } from '../components/ui'
import { MODULES } from '../data/modules'
import { TIERS, TIER_ORDER, INDUSTRIES } from '../data/tiers'
import { useAuth } from '../lib/auth'

export default function Home() {
  const { user } = useAuth()
  const [activeModule,   setActiveModule]   = useState(0)
  const [activeIndustry, setActiveIndustry] = useState(0)
  const [quizStep,       setQuizStep]       = useState(0)
  const [quizAnswers,    setQuizAnswers]     = useState({})
  const [quizResult,     setQuizResult]     = useState(null)

  // ── Tier quiz logic ──────────────────────────────────────────────────────
  const quizQuestions = [
    {
      q: 'What best describes your situation?',
      answers: [
        { label: 'I\'m an individual professional or consultant', value: 'individual' },
        { label: 'I lead a team or department in a business', value: 'smb' },
        { label: 'I\'m responsible for AI across a large organisation', value: 'enterprise' },
      ],
    },
    {
      q: 'How many people need access to the learning platform?',
      answers: [
        { label: 'Just me', value: 'individual' },
        { label: '2–5 people on my team', value: 'smb' },
        { label: '6 or more across the organisation', value: 'enterprise' },
      ],
    },
    {
      q: 'What\'s your primary goal?',
      answers: [
        { label: 'Build my own AI skills and deliver a use case', value: 'individual' },
        { label: 'Implement AI in my business operations', value: 'smb' },
        { label: 'Design an enterprise AI operating model with governance', value: 'enterprise' },
      ],
    },
  ]

  const handleQuizAnswer = (value) => {
    const updated = { ...quizAnswers, [quizStep]: value }
    setQuizAnswers(updated)
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1)
    } else {
      // Score answers
      const scores = { individual: 0, smb: 0, enterprise: 0 }
      Object.values(updated).forEach(v => { scores[v] = (scores[v] || 0) + 1 })
      const result = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
      setQuizResult(result)
    }
  }

  const resetQuiz = () => {
    setQuizStep(0)
    setQuizAnswers({})
    setQuizResult(null)
  }

  return (
    <>
      <Head>
        <title>LearningOnline.AI — Flowcore AI Academy</title>
        <meta name="description" content="The execution-focused AI program that takes professionals, small businesses, and enterprises from AI ideas to measurable business outcomes." />
      </Head>
      <Nav transparent />

      {/* ── Hero ── */}
      <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40"
          style={{ backgroundImage: 'linear-gradient(rgba(26,110,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(26,110,255,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-28 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue/30 bg-blue/10 text-blue-bright text-xs font-display font-bold mb-10 tracking-wide">
              <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse" />
              learningonline.ai · 8 Modules · 3 Tiers · 8 Industries
            </div>

            <h1 className="font-display font-black leading-[1.0] tracking-tight mb-6"
              style={{ fontSize: 'clamp(42px, 6.5vw, 80px)' }}>
              Flowcore<br/><span className="text-blue">AI Academy</span>
            </h1>

            <p className="text-2xl text-white/80 font-light italic mb-4"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              "AI That Actually Works In Your Business"
            </p>

            <p className="text-lg text-muted leading-relaxed max-w-xl mb-10">
              The execution-focused program that takes professionals, small businesses, and enterprise teams from AI experiments to measurable operational outcomes — in weeks, not months.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              {user?.tier
                ? <Button variant="large" href="/dashboard">Go to Dashboard →</Button>
                : <>
                    <Button variant="large" href="/pricing">View Pricing & Enrol</Button>
                    <Button variant="ghost" href="#find-your-tier" className="text-base px-8 py-4">Find My Tier ↓</Button>
                  </>
              }
            </div>

            <div className="flex flex-wrap gap-10 pt-8 border-t border-white/5">
              {[
                { val: '8',   unit: ' modules',   desc: 'End-to-end curriculum' },
                { val: '3',   unit: ' tiers',     desc: 'Individual · SMB · Enterprise' },
                { val: '8',   unit: ' industries', desc: 'Sector-specific playbooks' },
                { val: '90',  unit: ' days',      desc: 'To first live use case' },
              ].map(s => (
                <div key={s.unit}>
                  <div className="font-display font-black text-3xl">{s.val}<span className="text-blue">{s.unit}</span></div>
                  <div className="text-xs text-muted mt-0.5">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Find Your Tier (Quiz) ── */}
      <section id="find-your-tier" className="py-24 bg-navy-mid border-y border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>Not Sure Where to Start?</SectionLabel>
              <h2 className="font-display font-bold text-4xl mb-4">Find the right tier for you</h2>
              <p className="text-muted max-w-xl mx-auto">Answer 3 questions and we'll recommend the tier that fits your situation.</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <Card glow className="p-8">
              {quizResult ? (
                // Result
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-2">Your Recommended Tier</div>
                  <TierBadge tier={quizResult} className="mb-4 text-sm px-5 py-2" />
                  <h3 className="font-display font-bold text-2xl mb-3">{TIERS[quizResult].name}</h3>
                  <p className="text-muted text-sm leading-relaxed max-w-md mx-auto mb-3">{TIERS[quizResult].description}</p>
                  <p className="text-blue-bright font-display font-bold text-xl mb-6">{TIERS[quizResult].priceDisplay}</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {quizResult === 'enterprise' ? (
                      <Button href="mailto:hello@learningonline.ai?subject=Enterprise Enquiry">Contact for Pricing →</Button>
                    ) : (
                      <Button href={`/pricing`}>Enrol — {TIERS[quizResult].priceDisplay} →</Button>
                    )}
                    <button onClick={resetQuiz}
                      className="px-6 py-3 border border-white/10 text-muted hover:text-white hover:border-blue font-display font-bold text-sm rounded-lg transition-all">
                      Retake Quiz
                    </button>
                  </div>
                </div>
              ) : (
                // Question
                <div>
                  {/* Progress */}
                  <div className="flex gap-2 mb-8">
                    {quizQuestions.map((_, i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= quizStep ? 'bg-blue' : 'bg-white/10'}`} />
                    ))}
                  </div>

                  <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">
                    Question {quizStep + 1} of {quizQuestions.length}
                  </div>
                  <h3 className="font-display font-bold text-xl mb-6">{quizQuestions[quizStep].q}</h3>

                  <div className="space-y-3">
                    {quizQuestions[quizStep].answers.map((a, i) => (
                      <button key={i} onClick={() => handleQuizAnswer(a.value)}
                        className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-blue hover:bg-blue/10 transition-all duration-200 group">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full border border-white/20 group-hover:border-blue flex items-center justify-center flex-shrink-0 transition-colors">
                            <span className="text-xs font-display font-bold text-muted group-hover:text-blue">{i + 1}</span>
                          </div>
                          <span className="text-sm text-white/80 group-hover:text-white transition-colors">{a.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ── Three Tiers ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>Three Tiers</SectionLabel>
              <h2 className="font-display font-bold text-4xl mb-4">One program. Three levels of depth.</h2>
              <p className="text-muted max-w-xl mx-auto">Every tier builds on the last. Start where you are — upgrade as you grow.</p>
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
                    <div className="text-xs text-muted mb-5 font-display">{t.billing}</div>
                    <p className="text-sm text-muted leading-relaxed flex-1 mb-4">{t.description}</p>
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 mb-5">
                      <div className="text-[10px] font-display font-bold text-muted uppercase tracking-wider mb-1">Ideal for</div>
                      <p className="text-xs text-white/70 leading-relaxed">{t.idealFor}</p>
                    </div>
                    <Button href="/pricing" variant={t.highlighted ? 'primary' : 'ghost'} className="w-full justify-center">
                      {t.cta}
                    </Button>
                  </Card>
                </Reveal>
              )
            })}
          </div>

          {/* Side-by-side comparison */}
          <Reveal delay={200}>
            <div className="mt-8 p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <h3 className="font-display font-bold text-base text-center mb-5">Quick comparison</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {TIER_ORDER.map(tid => {
                  const t = TIERS[tid]
                  return (
                    <div key={tid}>
                      <TierBadge tier={tid} className="mb-3" />
                      <div className="text-xs text-success font-display font-bold mb-1">✓ Best for</div>
                      <p className="text-xs text-muted mb-3 leading-relaxed">{t.idealFor}</p>
                      <div className="text-xs text-red-400 font-display font-bold mb-1">✕ Not for</div>
                      <p className="text-xs text-muted leading-relaxed">{t.notFor}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Industries ── */}
      <section id="industries" className="py-24 bg-navy-mid border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>By Industry</SectionLabel>
              <h2 className="font-display font-bold text-4xl mb-4">AI use cases for your sector</h2>
              <p className="text-muted max-w-xl mx-auto">
                Every industry has different workflows, compliance requirements, and ROI drivers. Select yours to see what AI can do.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Industry list */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                {INDUSTRIES.map((ind, i) => (
                  <button key={ind.id} onClick={() => setActiveIndustry(i)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      activeIndustry === i
                        ? 'border-blue/40 bg-blue/10'
                        : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                    }`}>
                    <span className="text-xl flex-shrink-0">{ind.icon}</span>
                    <span className={`text-sm font-display font-bold leading-tight ${activeIndustry === i ? 'text-white' : 'text-white/70'}`}>
                      {ind.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Industry detail */}
            <div className="flex-1">
              <Card glow className="p-8 h-full">
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-5xl">{INDUSTRIES[activeIndustry].icon}</span>
                  <div>
                    <h3 className="font-display font-bold text-2xl mb-2">{INDUSTRIES[activeIndustry].name}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted">Recommended tier:</span>
                      <TierBadge tier={INDUSTRIES[activeIndustry].recommendedTier} />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Top AI Use Cases</div>
                  <div className="space-y-2">
                    {INDUSTRIES[activeIndustry].useCases.map((uc, i) => (
                      <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-white/[0.03] border border-white/5">
                        <span className="text-blue text-sm flex-shrink-0 mt-0.5">→</span>
                        <span className="text-sm text-white/80">{uc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-success/5 border border-success/20 mb-6">
                  <div className="text-xs font-display font-bold text-success uppercase tracking-wider mb-1">Expected Outcome</div>
                  <p className="text-sm text-white/80">{INDUSTRIES[activeIndustry].outcome}</p>
                </div>

                <Button href="/pricing" variant="primary">
                  Enrol & Start Building →
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section id="curriculum" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>Full Curriculum</SectionLabel>
              <h2 className="font-display font-bold text-4xl mb-4">8 modules. Zero filler.</h2>
              <p className="text-muted max-w-xl mx-auto">Every lesson produces a real deliverable. Every module builds on the last.</p>
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
                    <span className="text-xl flex-shrink-0">{mod.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-display font-bold text-muted">Module {mod.number}</div>
                      <div className={`text-sm font-display font-bold truncate ${activeModule === i ? 'text-white' : 'text-white/80'}`}>
                        {mod.title}
                      </div>
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
                      <div className="w-6 h-6 rounded-full bg-navy-light border border-white/10 flex items-center justify-center text-xs text-muted font-display font-bold flex-shrink-0">
                        {i + 1}
                      </div>
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
      <section className="py-20 bg-navy-mid border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>What Practitioners Say</SectionLabel>
              <h2 className="font-display font-bold text-3xl">Built from real implementation experience</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { q: '"I\'ve sat through dozens of AI webinars. This is the first thing that gave me a plan I could walk into my CRO with."', name: 'Operations Director', role: 'Financial Services, 2,400 employees', tier: 'smb' },
              { q: '"The ROI calculator alone paid for this course. We got approval for a $340K AI project within 3 weeks of completing Module 6."', name: 'Transformation Lead', role: 'Telecommunications, ASX200', tier: 'enterprise' },
              { q: '"Our CTO called it the most practical AI planning document he\'d seen come from inside the business."', name: 'Head of Customer Ops', role: 'Retail, 1,100 employees', tier: 'smb' },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <Card className="p-6 h-full flex flex-col">
                  <div className="text-yellow-400 text-sm mb-4">★★★★★</div>
                  <p className="text-sm text-muted leading-relaxed flex-1 mb-5 italic">{t.q}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-display font-bold text-sm">{t.name}</div>
                      <div className="text-xs text-muted">{t.role}</div>
                    </div>
                    <TierBadge tier={t.tier} />
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <div className="text-5xl mb-6">🚀</div>
            <h2 className="font-display font-bold text-4xl mb-4">
              Stop experimenting.<br/>Start delivering.
            </h2>
            <p className="text-muted text-lg mb-8">
              Pick your tier and begin. First use case live within 90 days — or your money back.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="large" href="/pricing">View Pricing & Enrol →</Button>
              <Button variant="ghost" href="#find-your-tier" className="text-base px-8 py-4">Find My Tier ↑</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <div className="font-display font-black text-xl mb-1">
                LearningOnline<span className="text-blue">.AI</span>
              </div>
              <p className="text-sm text-muted max-w-xs leading-relaxed">
                The execution-focused AI program for professionals, small businesses, and enterprise teams.
              </p>
            </div>
            <div className="flex gap-12">
              <div>
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Program</div>
                <div className="space-y-2">
                  <Link href="/#curriculum"  className="block text-sm text-muted hover:text-white">Curriculum</Link>
                  <Link href="/#industries"  className="block text-sm text-muted hover:text-white">Industries</Link>
                  <Link href="/pricing"      className="block text-sm text-muted hover:text-white">Pricing</Link>
                </div>
              </div>
              <div>
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Account</div>
                <div className="space-y-2">
                  <Link href="/login"     className="block text-sm text-muted hover:text-white">Sign In</Link>
                  <Link href="/signup"    className="block text-sm text-muted hover:text-white">Sign Up</Link>
                  <Link href="/dashboard" className="block text-sm text-muted hover:text-white">Dashboard</Link>
                </div>
              </div>
              <div>
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Contact</div>
                <div className="space-y-2">
                  <a href="mailto:hello@learningonline.ai" className="block text-sm text-muted hover:text-white">hello@learningonline.ai</a>
                  <a href="mailto:hello@learningonline.ai?subject=Enterprise Enquiry" className="block text-sm text-muted hover:text-white">Enterprise enquiries</a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/5 gap-3 text-xs text-muted">
            <p>© 2025 LearningOnline.AI · learningonline.ai</p>
            <p>14-day money-back guarantee · Secure payments via Stripe</p>
          </div>
        </div>
      </footer>
    </>
  )
}
