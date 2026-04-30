// pages/index.js — Le On AI homepage
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { Nav, Reveal, Card, SectionLabel, Button, TierBadge } from '../components/ui'
import { MODULES } from '../data/modules'
import { TIERS, TIER_ORDER, INDUSTRIES, DISPLAY_ORDER } from '../data/tiers'
import { useAuth } from '../lib/auth'

// ── Decision Tree ─────────────────────────────────────────────────────────────
const TREE = {
  start: {
    id: 'start',
    question: 'What best describes your primary goal right now?',
    options: [
      { label: 'Build my own AI literacy and participate in leadership conversations', icon: '🎯', next: 'individual_depth' },
      { label: 'Implement AI across my team or business operations',                  icon: '🏢', next: 'team_size' },
      { label: 'Design an enterprise AI program with governance and orchestration',   icon: '🏛️', next: 'enterprise_depth' },
    ],
  },
  individual_depth: {
    id: 'individual_depth',
    question: 'What kind of support do you need?',
    options: [
      { label: 'Self-directed learning — foundations, models, use cases, leadership framing', icon: '📚', result: 'individual' },
      { label: 'Learning plus practical frameworks I can apply in my business',              icon: '💡', next: 'smb_confirm' },
    ],
  },
  team_size: {
    id: 'team_size',
    question: 'How many people need access?',
    options: [
      { label: 'Just me — I\'ll share learnings with my team',  icon: '👤', result: 'individual' },
      { label: '2–5 people in my team or department',           icon: '👥', next: 'smb_confirm' },
      { label: '6 or more, across departments',                 icon: '🏢', next: 'enterprise_depth' },
    ],
  },
  smb_confirm: {
    id: 'smb_confirm',
    question: 'Do you need use case frameworks, ROI models, and workflow design tools?',
    options: [
      { label: 'Yes — I need practical implementation templates and financial models', icon: '✅', result: 'smb' },
      { label: 'No — foundational content and examples are enough',                  icon: '📋', result: 'individual' },
    ],
  },
  enterprise_depth: {
    id: 'enterprise_depth',
    question: 'What is most important to your program?',
    options: [
      { label: 'Governance, responsible AI, and compliance frameworks',  icon: '⚖️', result: 'enterprise' },
      { label: 'Data readiness and legacy system standardisation',       icon: '🗄️', result: 'enterprise' },
      { label: 'Multimodal AI and orchestration strategy',              icon: '🎛️', result: 'enterprise' },
      { label: 'We\'re not at enterprise scale yet',                    icon: '📈', result: 'smb' },
    ],
  },
}

function DecisionTree({ onResult }) {
  const [history,  setHistory]  = useState(['start'])
  const [selected, setSelected] = useState(null)
  const [result,   setResult]   = useState(null)

  const current = TREE[history[history.length - 1]]
  const tier    = result ? TIERS[result] : null

  const choose = (option) => {
    setSelected(option.label)
    setTimeout(() => {
      setSelected(null)
      if (option.result) { setResult(option.result); onResult && onResult(option.result) }
      else if (option.next) setHistory(h => [...h, option.next])
    }, 250)
  }

  const back  = () => { if (history.length > 1) { setHistory(h => h.slice(0, -1)); setResult(null) } }
  const reset = () => { setHistory(['start']); setResult(null); setSelected(null); onResult && onResult(null) }

  if (result && tier) return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-success/20 border border-success/30 flex items-center justify-center text-xl flex-shrink-0">✓</div>
        <div>
          <div className="text-xs font-display font-bold text-success uppercase tracking-wider mb-1">Your Recommended Tier</div>
          <TierBadge tier={result} label={tier.label} className="text-sm px-4 py-1.5" />
        </div>
      </div>
      <h3 className="font-display font-bold text-2xl mb-2">{tier.name}</h3>
      <p className="text-muted text-sm leading-relaxed mb-3">{tier.description}</p>
      <div className="p-4 bg-white/[0.03] border border-white/5 rounded-xl mb-5">
        <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-1">Ideal for</div>
        <p className="text-sm text-white/80 leading-relaxed">{tier.idealFor}</p>
      </div>
      <div className="flex items-center justify-between p-4 bg-blue/5 border border-blue/20 rounded-xl mb-6">
        <div>
          <div className="font-display font-black text-3xl">{tier.priceDisplay}</div>
          <div className="text-xs text-muted">{tier.billing}</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button href="/pricing">Enrol — {tier.priceDisplay} →</Button>
        <button onClick={reset} className="px-5 py-2.5 border border-white/10 text-muted hover:text-white hover:border-blue font-display font-bold text-sm rounded-lg transition-all">
          Start Over
        </button>
      </div>
    </div>
  )

  return (
    <div>
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {history.map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-muted text-xs">›</span>}
            <span className={`text-xs font-display font-bold px-2 py-1 rounded-full ${i === history.length - 1 ? 'bg-blue/20 text-blue-bright border border-blue/30' : 'text-muted'}`}>
              Step {i + 1}
            </span>
          </div>
        ))}
      </div>
      <h3 className="font-display font-bold text-xl mb-6 leading-tight">{current.question}</h3>
      <div className="space-y-3 mb-6">
        {current.options.map((opt, i) => (
          <button key={i} onClick={() => choose(opt)}
            className={`w-full text-left p-4 rounded-xl border transition-all group flex items-center gap-4 ${selected === opt.label ? 'border-blue/60 bg-blue/15' : 'border-white/10 hover:border-blue/40 hover:bg-blue/8'}`}>
            <span className="text-2xl flex-shrink-0">{opt.icon}</span>
            <span className="text-sm text-white/80 group-hover:text-white transition-colors leading-snug">{opt.label}</span>
            <svg className="w-4 h-4 text-muted group-hover:text-blue-bright flex-shrink-0 ml-auto transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        ))}
      </div>
      {history.length > 1 && (
        <button onClick={back} className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          Back
        </button>
      )}
    </div>
  )
}

// ── Industry Matcher ──────────────────────────────────────────────────────────
function IndustryMatcher() {
  const [selected,   setSelected]   = useState(null)
  const [filterTier, setFilterTier] = useState(null)

  const visible  = INDUSTRIES.filter(ind => !filterTier || ind.recommendedTier === filterTier)
  const industry = selected !== null ? INDUSTRIES[selected] : null
  const tier     = industry ? TIERS[industry.recommendedTier] : null

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-sm text-muted self-center mr-1">Filter:</span>
        {[null, 'individual', 'smb', 'enterprise'].map(t => (
          <button key={t || 'all'} onClick={() => { setFilterTier(t); setSelected(null) }}
            className={`px-3 py-1.5 rounded-full text-xs font-display font-bold border transition-all ${
              filterTier === t
                ? t === null ? 'bg-white/10 border-white/20 text-white' : `tier-${t}`
                : 'border-white/10 text-muted hover:border-white/20 hover:text-white'
            }`}>
            {t === null ? 'All Industries' : t === 'smb' ? 'Business Owner' : TIERS[t]?.name}
          </button>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-80 flex-shrink-0">
          <div className="grid grid-cols-2 gap-2">
            {visible.map((ind) => {
              const origIdx = INDUSTRIES.indexOf(ind)
              return (
                <button key={ind.id} onClick={() => setSelected(origIdx)}
                  className={`p-4 rounded-xl border text-left transition-all ${selected === origIdx ? 'border-blue/50 bg-blue/10' : 'border-white/8 bg-white/[0.02] hover:border-white/15'}`}>
                  <div className="text-2xl mb-2">{ind.icon}</div>
                  <div className={`text-xs font-display font-bold leading-tight ${selected === origIdx ? 'text-white' : 'text-white/70'}`}>{ind.name}</div>
                  <div className="mt-2">
                    <TierBadge tier={ind.recommendedTier} label={ind.recommendedTier === 'smb' ? 'Business' : TIERS[ind.recommendedTier]?.name} className="text-[9px] px-2 py-0.5" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
        <div className="flex-1">
          {industry && tier ? (
            <Card glow className="p-8 h-full">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-5xl flex-shrink-0">{industry.icon}</span>
                <div>
                  <h3 className="font-display font-bold text-2xl mb-2">{industry.name}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted">Recommended:</span>
                    <TierBadge tier={industry.recommendedTier} label={industry.recommendedTier === 'smb' ? 'Business Owner' : tier.name} />
                    <span className="text-sm font-display font-bold text-white">{tier.priceDisplay}</span>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Top AI use cases</div>
                <div className="space-y-2">
                  {industry.useCases.map((uc, i) => (
                    <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <span className="text-blue text-sm flex-shrink-0 mt-0.5 font-bold">{i + 1}</span>
                      <span className="text-sm text-white/80">{uc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-success/5 border border-success/20 mb-6">
                <div className="text-xs font-display font-bold text-success uppercase tracking-wider mb-1">Expected Outcome</div>
                <p className="text-sm text-white/80 leading-relaxed">{industry.outcome}</p>
              </div>
              <Button href="/pricing">Enrol — {tier.priceDisplay} →</Button>
            </Card>
          ) : (
            <Card className="p-8 h-full flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="text-5xl mb-4">👈</div>
              <h3 className="font-display font-bold text-lg mb-2">Select your industry</h3>
              <p className="text-muted text-sm max-w-xs leading-relaxed">Pick your sector to see specific AI use cases and the recommended tier.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const { user } = useAuth()
  const [activeModule,  setActiveModule]  = useState(0)
  const [activeSection, setActiveSection] = useState('tree')

  return (
    <>
      <Head>
        <title>Le On AI — From AI Anxiety to AI Awareness</title>
        <meta name="description" content="The execution-focused AI program for professionals, business owners, and enterprise leaders. 14 modules, 40 templates, ROI calculator, and model selection framework." />
      </Head>
      <Nav transparent />

      {/* ── Hero ── */}
      <section className="flex items-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage:'linear-gradient(rgba(26,110,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(26,110,255,0.04) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-20 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-blue/30 bg-blue/10 text-blue-bright text-xs font-display font-bold mb-6 tracking-wide">
              <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse" />
              learningonline.ai
            </div>
            <h1 className="font-display font-black leading-[1.05] tracking-tight mb-4" style={{ fontSize:'clamp(40px,6vw,72px)' }}>
              From AI Anxiety<br/>to <span className="text-blue">AI Awareness</span>
            </h1>
            <p className="text-base text-muted leading-relaxed max-w-lg mb-2">
              Practical learning for professionals, parents, businesses and enterprise leaders — without the hype.
            </p>
            <p className="text-xs text-white/30 mb-7 font-display tracking-widest uppercase">
              14 modules · 3 tiers · 40 templates · first live use case in 14 days
            </p>
            <div className="flex flex-wrap gap-3">
              {user?.tier
                ? <Button variant="large" href="/dashboard">Go to Dashboard →</Button>
                : <>
                    <Button variant="large" href="#learning-tracks">Start Learning ↓</Button>
                    <Button variant="ghost" href="/pricing" className="text-sm px-6 py-3">View Courses</Button>
                  </>
              }
            </div>
          </div>
        </div>
      </section>

      {/* ── Learning Tracks (4 cards: Parents free + 3 paid tiers) ── */}
      <section id="learning-tracks" className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>Learning Tracks</SectionLabel>
              <h2 className="font-display font-bold text-3xl mb-3">Start Where You Are</h2>
              <p className="text-muted max-w-xl mx-auto text-sm">Free guidance for parents. Practical depth for professionals, business owners, and enterprise leaders.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {DISPLAY_ORDER.map((tid, i) => {
              const t = TIERS[tid]
              const isFree = t.free
              return (
                <Reveal key={tid} delay={i * 80}>
                  <Card hover className={`p-6 h-full flex flex-col ${
                    isFree ? 'border-success/25 bg-success/[0.02]' :
                    t.highlighted ? 'border-amber-400/30 bg-amber-400/[0.02]' : ''
                  }`}>
                    {isFree ? (
                      <span className="self-start mb-4 px-2.5 py-1 bg-success/15 border border-success/30 rounded-full text-[10px] font-display font-bold text-success">FREE MODULE</span>
                    ) : (
                      <TierBadge tier={tid} label={t.label} className="mb-4" />
                    )}
                    <div className="font-display font-black text-4xl mb-1">{t.priceDisplay}</div>
                    <div className="text-xs text-muted mb-4">{t.billing}</div>
                    <p className="text-sm text-muted leading-relaxed flex-1 mb-4">{t.description}</p>
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 mb-5">
                      <div className="text-[10px] font-display font-bold text-muted uppercase tracking-wider mb-1">Ideal for</div>
                      <p className="text-xs text-white/70 leading-relaxed">{t.idealFor}</p>
                    </div>
                    {isFree ? (
                      <Link href={user ? '/parents' : '/login?redirect=/parents'}
                        className="w-full text-center py-2.5 rounded-lg font-display font-bold text-sm bg-success/10 border border-success/30 text-success hover:bg-success/20 transition-all">
                        {user ? 'Continue →' : 'Start Free Module →'}
                      </Link>
                    ) : (
                      <Button href="/pricing" variant={t.highlighted ? 'primary' : 'ghost'} className="w-full justify-center">{t.cta}</Button>
                    )}
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Find Your Path ── */}
      <section id="find-your-path" className="py-24 bg-navy-mid border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-10">
              <SectionLabel>Find Your Program</SectionLabel>
              <h2 className="font-display font-bold text-4xl mb-4">Which program is right for you?</h2>
              <p className="text-muted max-w-xl mx-auto">Use the decision tree to find your tier in under a minute — or browse by industry to see AI use cases specific to your sector.</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex gap-1 bg-white/[0.04] border border-white/8 rounded-xl p-1 mb-8 max-w-md mx-auto">
              {[{ id:'tree', icon:'🌳', label:'Decision Tree' }, { id:'industry', icon:'🏭', label:'By Industry' }].map(tab => (
                <button key={tab.id} onClick={() => setActiveSection(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-display font-bold transition-all ${activeSection === tab.id ? 'bg-blue text-white shadow-[0_0_15px_rgba(26,110,255,0.4)]' : 'text-muted hover:text-white'}`}>
                  <span>{tab.icon}</span>{tab.label}
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Card glow className="p-8">
              {activeSection === 'tree' ? <DecisionTree /> : <IndustryMatcher />}
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ── Platform tools strip ── */}
      <section className="py-10 bg-navy-mid border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon:'🎯', title:'Model Selection Guide', desc:'Choose the right AI model', href:'/model-selection' },
              { icon:'📊', title:'ROI Calculator',        desc:'Model your investment',     href:'/roi-calculator' },
              { icon:'🏭', title:'Industry Matcher',      desc:'Use cases for your sector', href:'/#find-your-path' },
              { icon:'🎓', title:'14-Module Curriculum',  desc:'From foundations to 14-day plan', href:'/#curriculum' },
            ].map((tool, i) => (
              <Link key={i} href={tool.href}
                className="p-5 rounded-xl border border-white/8 bg-white/[0.02] hover:border-blue/40 hover:bg-blue/[0.03] transition-all group">
                <div className="text-2xl mb-2">{tool.icon}</div>
                <div className="font-display font-bold text-sm text-white mb-1 group-hover:text-blue-bright transition-colors">{tool.title}</div>
                <div className="text-xs text-muted">{tool.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Model Selection Promo ── */}
      <section className="py-20 bg-navy-mid border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <SectionLabel>Free Resource</SectionLabel>
                <h2 className="font-display font-bold text-3xl mb-4">AI Model Selection Framework</h2>
                <p className="text-muted leading-relaxed max-w-xl mb-4">
                  Most organisations use models that are 10× more expensive than necessary.
                  Our free model selection guide shows you exactly which AI model to use for each task —
                  with real cost calculations across GPT-4o, Claude, Gemini, and open-source options.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {['Decision tree','Cost comparison table','4 worked examples','Enterprise strategy'].map(f => (
                    <span key={f} className="text-xs font-display font-bold px-3 py-1.5 rounded-full bg-blue/10 border border-blue/25 text-blue-bright">{f}</span>
                  ))}
                </div>
                <Button href="/model-selection" variant="primary">Explore the Model Guide →</Button>
              </div>
              <div className="hidden lg:block">
                <Card className="p-6 min-w-[280px]">
                  <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Quick example</div>
                  <div className="space-y-2">
                    {[
                      { task:'Email triage (800/day)',    model:'Claude Haiku', cost:'$22/yr',   saving:'94% cheaper' },
                      { task:'Exec report generation',   model:'Claude Sonnet', cost:'$1.40/yr', saving:'Quality choice' },
                      { task:'Document search (RAG)',    model:'GPT-4o-mini',  cost:'$55/yr',   saving:'17× cheaper' },
                    ].map((ex, i) => (
                      <div key={i} className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                        <div className="text-xs text-muted mb-1">{ex.task}</div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-display font-bold text-white">{ex.model}</span>
                          <div className="text-right">
                            <div className="text-xs text-success font-display font-bold">{ex.cost}</div>
                            <div className="text-[10px] text-muted">{ex.saving}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section id="curriculum" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>Full Curriculum</SectionLabel>
              <h2 className="font-display font-bold text-4xl mb-4">14 modules. Zero filler.</h2>
              <p className="text-muted max-w-xl mx-auto">Every lesson produces a real deliverable. Every module builds on the last.</p>
            </div>
          </Reveal>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-80 flex-shrink-0 lg:max-h-[600px] lg:overflow-y-auto lg:pr-1 space-y-2">
              {MODULES.map((mod, i) => (
                <button key={mod.id} onClick={() => setActiveModule(i)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${activeModule === i ? 'border-blue/40 bg-blue/10' : 'border-white/5 bg-white/[0.02] hover:border-white/10'}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0 mt-0.5">{mod.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-display font-bold text-muted mb-0.5">Module {mod.number}</div>
                      <div className={`text-sm font-display font-bold leading-snug ${activeModule === i ? 'text-white' : 'text-white/80'}`}>{mod.title}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex-1">
              <Card glow className="p-8" style={{ minHeight:'480px' }}>
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-4xl">{MODULES[activeModule].icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="px-3 py-1 bg-blue/10 border border-blue/25 rounded-full text-xs font-display font-bold text-blue-bright">Module {MODULES[activeModule].number}</span>
                      {(() => {
                        const firstTier = MODULES[activeModule].lessons[0]?.tier
                        if (firstTier && firstTier !== 'individual') return <TierBadge tier={firstTier} label={firstTier === 'smb' ? 'Business Owner+' : 'Enterprise Leader'} />
                      })()}
                    </div>
                    <h3 className="font-display font-bold text-2xl mb-2">{MODULES[activeModule].title}</h3>
                    <p className="text-muted text-sm">{MODULES[activeModule].description}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  {MODULES[activeModule].lessons.map((l, i) => (
                    <div key={l.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="w-6 h-6 rounded-full bg-navy-light border border-white/10 flex items-center justify-center text-xs text-muted font-display font-bold flex-shrink-0">{i + 1}</div>
                      <span className="text-sm text-white/80 flex-1">{l.title}</span>
                      {l.duration && <span className="text-xs text-muted flex-shrink-0">{l.duration}</span>}
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



      {/* ── Preview Section ── Patch 4 */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-10">
              <SectionLabel>Free Preview</SectionLabel>
              <h2 className="font-display font-bold text-4xl mb-4">Preview what you'll learn</h2>
              <p className="text-muted max-w-xl mx-auto">Two real lessons from Module 1, available free. No sign-up required.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {[
              { icon:'🧠', module:'Module 1', title:'AI Foundations', teaser:'What AI actually is, what it isn\'t, and the 5 failure modes that sink most business AI projects before they start.', free: true },
              { icon:'💰', module:'Modules 3–4', title:'Use Cases & ROI', teaser:'How to identify, score, and build the financial case for your highest-value AI opportunities using a proven 5-factor model.', free: false },
              { icon:'⚡', module:'Modules 5–12', title:'Workflows, Data & Adoption', teaser:'Design the human + AI workflow, prepare your data, and build the change program that makes AI actually stick.', free: false },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 80}>
                <Card hover className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{card.icon}</span>
                    <span className="text-xs font-display font-bold text-muted">{card.module}</span>
                    {card.free
                      ? <span className="ml-auto px-2 py-0.5 bg-success/10 border border-success/25 rounded-full text-[10px] font-display font-bold text-success">FREE</span>
                      : <span className="ml-auto text-muted text-sm">🔒</span>
                    }
                  </div>
                  <h3 className="font-display font-bold text-base mb-2">{card.title}</h3>
                  <p className="text-sm text-muted leading-relaxed flex-1 mb-4">{card.teaser}</p>
                  {card.free
                    ? <Link href="/preview" className="text-sm font-display font-bold text-blue-bright hover:underline flex items-center gap-1">Preview lesson →</Link>
                    : <span className="text-xs text-muted font-display">Included with enrolment</span>
                  }
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="text-center">
            <Button href="/preview">Try Free Preview →</Button>
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
              { q:'"I\'ve sat through dozens of AI webinars. This is the first thing that gave me a plan I could walk into my CRO with."', name:'Operations Director', role:'Financial Services, 2,400 employees', tier:'smb' },
              { q:'"The ROI calculator alone paid for this program. We got approval for a $340K AI project within 3 weeks of completing Module 9."', name:'Transformation Lead', role:'Telecommunications, ASX200', tier:'enterprise' },
              { q:'"Our CTO called it the most practical AI planning document he\'d seen come from inside the business."', name:'Head of Customer Ops', role:'Retail, 1,100 employees', tier:'smb' },
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
                    <TierBadge tier={t.tier} label={t.tier === 'smb' ? 'Business' : 'Enterprise'} />
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 text-center bg-navy-mid border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <div className="text-5xl mb-6">🚀</div>
            <h2 className="font-display font-bold text-4xl mb-4">Stop experimenting. Start delivering.</h2>
            <p className="text-muted text-lg mb-8">First use case live within 14 days — or your money back.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="large" href="#find-your-path">Find My Program ↑</Button>
              <Button variant="ghost" href="/pricing" className="text-base px-8 py-4">View All Pricing</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <div className="font-display font-black text-xl mb-0.5">Le On <span className="text-blue">AI</span></div>
              <div className="text-xs text-muted mb-3">Learning Online · Artificial Intelligence</div>
              <p className="text-sm text-muted max-w-xs leading-relaxed">The execution-focused AI program for professionals, business owners, and enterprise leaders.</p>
            </div>
            <div className="flex gap-12 flex-wrap">
              <div>
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Platform</div>
                <div className="space-y-2">
                  <Link href="#curriculum"      className="block text-sm text-muted hover:text-white">Curriculum</Link>
                  <Link href="#find-your-path"  className="block text-sm text-muted hover:text-white">Find My Tier</Link>
                  <Link href="/model-selection" className="block text-sm text-muted hover:text-white">Model Guide</Link>
                  <Link href="/roi-calculator"  className="block text-sm text-muted hover:text-white">ROI Calculator</Link>
                  <Link href="/pricing"         className="block text-sm text-muted hover:text-white">Pricing</Link>
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
                  <a href="mailto:hello@learningonline.ai"    className="block text-sm text-muted hover:text-white">hello@learningonline.ai</a>
                  <Link href="/contact"                        className="block text-sm text-muted hover:text-white">Enterprise enquiries</Link>
                  <Link href="/contact"                        className="block text-sm text-muted hover:text-white">Contact us</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/5 gap-3 text-xs text-muted">
            <p>© 2025 Le On AI · learningonline.ai</p>
            <p>14-day money-back guarantee · Secure payments via Stripe</p>
          </div>
        </div>
      </footer>
    </>
  )
}

