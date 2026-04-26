// pages/index.js — Le On AI homepage
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { Nav, Reveal, Card, SectionLabel, Button, TierBadge } from '../components/ui'
import { MODULES } from '../data/modules'
import { TIERS, TIER_ORDER, INDUSTRIES } from '../data/tiers'
import { useAuth } from '../lib/auth'

// ── Decision Tree Data ────────────────────────────────────────────────────────
// Each node: { id, question, options: [{ label, icon, next | result }] }
// result: tier id string — terminates the tree
const TREE = {
  start: {
    id: 'start',
    question: 'What best describes your primary goal right now?',
    options: [
      { label: 'Build my own AI skills and deliver a personal project', icon: '🎯', next: 'individual_depth' },
      { label: 'Implement AI across my team or business operations',    icon: '🏢', next: 'team_size' },
      { label: 'Design an enterprise AI program with governance',       icon: '🏛️', next: 'enterprise_depth' },
    ],
  },
  individual_depth: {
    id: 'individual_depth',
    question: 'What kind of support do you need?',
    options: [
      { label: 'Self-directed learning with templates I can use immediately', icon: '📚', result: 'individual' },
      { label: 'Learning plus examples specific to my business context',      icon: '💡', next: 'smb_confirm' },
    ],
  },
  team_size: {
    id: 'team_size',
    question: 'How many people need access to the platform?',
    options: [
      { label: 'Just me — I\'ll share learnings with my team',   icon: '👤', result: 'individual' },
      { label: '2–5 people across my team or department',        icon: '👥', next: 'smb_confirm' },
      { label: '6 or more, or across multiple departments',      icon: '🏢', next: 'enterprise_depth' },
    ],
  },
  smb_confirm: {
    id: 'smb_confirm',
    question: 'Do you need industry-specific playbooks and implementation templates?',
    options: [
      { label: 'Yes — I want examples and templates built for my sector', icon: '✅', result: 'smb' },
      { label: 'No — core curriculum and standard templates are enough',  icon: '📋', result: 'individual' },
    ],
  },
  enterprise_depth: {
    id: 'enterprise_depth',
    question: 'Which of these is most important to your program?',
    options: [
      { label: 'Data readiness and legacy system standardisation',   icon: '🗄️', result: 'enterprise' },
      { label: 'Governance, ethics, and compliance frameworks',      icon: '⚖️', result: 'enterprise' },
      { label: 'AI operating model and orchestration strategy',      icon: '⚙️', result: 'enterprise' },
      { label: 'We\'re not at that scale yet — team implementation', icon: '📈', result: 'smb' },
    ],
  },
}

function DecisionTree({ onResult }) {
  const [history,  setHistory]  = useState(['start'])
  const [selected, setSelected] = useState(null) // tracks which option was clicked
  const [result,   setResult]   = useState(null)

  const currentNodeId = history[history.length - 1]
  const currentNode   = TREE[currentNodeId]

  const choose = (option) => {
    setSelected(option.label)
    setTimeout(() => {
      setSelected(null)
      if (option.result) {
        setResult(option.result)
        onResult && onResult(option.result)
      } else if (option.next) {
        setHistory(h => [...h, option.next])
      }
    }, 250)
  }

  const back = () => {
    if (history.length > 1) {
      setHistory(h => h.slice(0, -1))
      setResult(null)
    }
  }

  const reset = () => {
    setHistory(['start'])
    setResult(null)
    setSelected(null)
    onResult && onResult(null)
  }

  const tier = result ? TIERS[result] : null

  return (
    <div>
      {/* Progress breadcrumb */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {history.map((nodeId, i) => (
          <div key={nodeId} className="flex items-center gap-2">
            {i > 0 && <span className="text-muted text-xs">›</span>}
            <span className={`text-xs font-display font-bold px-2 py-1 rounded-full ${
              i === history.length - 1 && !result
                ? 'bg-blue/20 text-blue-bright border border-blue/30'
                : 'text-muted'
            }`}>
              Step {i + 1}
            </span>
          </div>
        ))}
        {result && (
          <>
            <span className="text-muted text-xs">›</span>
            <span className="text-xs font-display font-bold px-2 py-1 rounded-full bg-success/20 text-success border border-success/30">Result</span>
          </>
        )}
      </div>

      {result && tier ? (
        // ── Result ──
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-success/20 border border-success/30 flex items-center justify-center text-2xl flex-shrink-0">✓</div>
            <div>
              <div className="text-xs font-display font-bold text-success uppercase tracking-wider mb-1">Your Recommended Tier</div>
              <TierBadge tier={result} className="text-sm px-4 py-1.5" />
            </div>
          </div>

          <h3 className="font-display font-bold text-2xl mb-2">{tier.name}</h3>
          <p className="text-muted text-sm leading-relaxed mb-3">{tier.description}</p>

          <div className="p-4 bg-white/[0.03] border border-white/5 rounded-xl mb-5">
            <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-2">Why this tier fits you</div>
            <p className="text-sm text-white/80 leading-relaxed">{tier.idealFor}</p>
          </div>

          <div className="flex items-center justify-between p-4 bg-blue/5 border border-blue/20 rounded-xl mb-6">
            <div>
              <div className="font-display font-black text-3xl">{tier.priceDisplay}</div>
              <div className="text-xs text-muted">{tier.billing}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted mb-1">Includes</div>
              <div className="text-xs text-white/80">{tier.features.length} features</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {result === 'enterprise' ? (
              <Button href="mailto:hello@learningonline.ai?subject=Enterprise Enquiry">
                Contact for Enterprise Pricing →
              </Button>
            ) : (
              <Button href={`/pricing`}>
                Enrol — {tier.priceDisplay} →
              </Button>
            )}
            <button onClick={reset}
              className="px-5 py-2.5 border border-white/10 text-muted hover:text-white hover:border-blue font-display font-bold text-sm rounded-lg transition-all">
              Start Over
            </button>
          </div>
        </div>
      ) : (
        // ── Question ──
        <div>
          <h3 className="font-display font-bold text-xl mb-6 leading-tight">{currentNode.question}</h3>

          <div className="space-y-3 mb-6">
            {currentNode.options.map((opt, i) => (
              <button key={i} onClick={() => choose(opt)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group flex items-center gap-4 ${
                  selected === opt.label
                    ? 'border-blue/60 bg-blue/15 scale-[0.99]'
                    : 'border-white/10 hover:border-blue/40 hover:bg-blue/8'
                }`}>
                <span className="text-2xl flex-shrink-0">{opt.icon}</span>
                <span className="text-sm text-white/80 group-hover:text-white transition-colors leading-snug">{opt.label}</span>
                <svg className="w-4 h-4 text-muted group-hover:text-blue-bright flex-shrink-0 ml-auto transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            ))}
          </div>

          {history.length > 1 && (
            <button onClick={back}
              className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
              Back
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ── Industry Matcher ──────────────────────────────────────────────────────────
function IndustryMatcher() {
  const [selected,    setSelected]    = useState(null)
  const [showAll,     setShowAll]     = useState(false)
  const [filterTier,  setFilterTier]  = useState(null)

  const visible = INDUSTRIES.filter(ind => !filterTier || ind.recommendedTier === filterTier)
  const industry = selected !== null ? INDUSTRIES[selected] : null
  const tier     = industry ? TIERS[industry.recommendedTier] : null

  return (
    <div>
      {/* Tier filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-sm text-muted self-center mr-1">Filter by tier:</span>
        {[null, 'individual', 'smb', 'enterprise'].map(t => (
          <button key={t || 'all'} onClick={() => { setFilterTier(t); setSelected(null); }}
            className={`px-3 py-1.5 rounded-full text-xs font-display font-bold border transition-all ${
              filterTier === t
                ? t === null ? 'bg-white/10 border-white/20 text-white'
                  : t === 'smb' ? 'tier-smb' : `tier-${t}`
                : 'border-white/10 text-muted hover:border-white/20 hover:text-white'
            }`}>
            {t === null ? 'All Industries' : t === 'smb' ? 'Business Tier' : TIERS[t]?.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Industry grid */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="grid grid-cols-2 gap-2">
            {visible.map((ind, i) => {
              const origIdx = INDUSTRIES.indexOf(ind)
              return (
                <button key={ind.id} onClick={() => setSelected(origIdx)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                    selected === origIdx
                      ? 'border-blue/50 bg-blue/10'
                      : 'border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
                  }`}>
                  <div className="text-2xl mb-2">{ind.icon}</div>
                  <div className={`text-xs font-display font-bold leading-tight ${selected === origIdx ? 'text-white' : 'text-white/70'}`}>
                    {ind.name}
                  </div>
                  <div className="mt-2">
                    <TierBadge tier={ind.recommendedTier}
                      label={ind.recommendedTier === 'smb' ? 'Business' : TIERS[ind.recommendedTier]?.name}
                      className="text-[9px] px-2 py-0.5" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Industry detail */}
        <div className="flex-1">
          {industry && tier ? (
            <Card glow className="p-8 h-full">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-5xl flex-shrink-0">{industry.icon}</span>
                <div>
                  <h3 className="font-display font-bold text-2xl mb-2">{industry.name}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted">Recommended:</span>
                    <TierBadge tier={industry.recommendedTier}
                      label={industry.recommendedTier === 'smb' ? 'Business Tier' : tier.name} />
                    <span className="text-sm font-display font-bold text-white">{tier.priceDisplay}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">
                  Top AI use cases for {industry.name}
                </div>
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

              <div className="flex flex-wrap gap-3">
                {industry.recommendedTier === 'enterprise' ? (
                  <Button href="mailto:hello@learningonline.ai?subject=Enterprise Enquiry">
                    Contact for Enterprise →
                  </Button>
                ) : (
                  <Button href="/pricing">
                    Enrol — {tier.priceDisplay} →
                  </Button>
                )}
                <Button variant="ghost" href="/pricing">
                  Compare all tiers
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-8 h-full flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="text-5xl mb-4">👈</div>
              <h3 className="font-display font-bold text-lg mb-2">Select your industry</h3>
              <p className="text-muted text-sm max-w-xs leading-relaxed">
                Pick your sector from the left to see the most relevant AI use cases and the recommended tier for your organisation.
              </p>
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
  const [activeModule,    setActiveModule]    = useState(0)
  const [activeSection,   setActiveSection]   = useState('tree') // 'tree' | 'industry'
  const [treeResult,      setTreeResult]      = useState(null)

  return (
    <>
      <Head>
        <title>Le On AI — AI That Actually Works In Your Business</title>
        <meta name="description" content="Le On AI — the execution-focused AI program that takes professionals, small businesses, and enterprise teams from AI ideas to measurable outcomes in weeks." />
      </Head>
      <Nav transparent />

      {/* ── Hero ── */}
      <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40"
          style={{ backgroundImage: 'linear-gradient(rgba(26,110,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(26,110,255,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-28 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue/30 bg-blue/10 text-blue-bright text-xs font-display font-bold mb-10 tracking-wide">
              <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse" />
              learningonline.ai · 14 Modules · 3 Tiers · 8 Industries
            </div>

            <h1 className="font-display font-black leading-[1.0] tracking-tight mb-3"
              style={{ fontSize: 'clamp(52px,7vw,90px)' }}>
              Le On <span className="text-blue">AI</span>
            </h1>

            <p className="text-xl text-white/60 font-light mb-3 tracking-wide">
              Learning Online · Artificial Intelligence
            </p>

            <p className="text-xl text-white/80 italic mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              "AI That Actually Works In Your Business"
            </p>

            <p className="text-lg text-muted leading-relaxed max-w-xl mb-10">
              The execution-focused program that takes professionals, growing businesses, and enterprise teams from AI experiments to measurable operational outcomes — in weeks, not months.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              {user?.tier
                ? <Button variant="large" href="/dashboard">Go to Dashboard →</Button>
                : <>
                    <Button variant="large" href="#find-your-path">Find My Program ↓</Button>
                    <Button variant="ghost" href="/pricing" className="text-base px-8 py-4">View Pricing</Button>
                  </>
              }
            </div>

            <div className="flex flex-wrap gap-10 pt-8 border-t border-white/5">
              {[
                { val: '14',  unit: ' modules',    desc: 'End-to-end curriculum' },
                { val: '3',   unit: ' tiers',      desc: 'Individual · Business · Enterprise' },
                { val: '8',   unit: ' industries', desc: 'Sector-specific playbooks' },
                { val: '90',  unit: ' days',       desc: 'To first live use case' },
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

      {/* ── Find Your Path ── */}
      <section id="find-your-path" className="py-24 bg-navy-mid border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-10">
              <SectionLabel>Find Your Program</SectionLabel>
              <h2 className="font-display font-bold text-4xl mb-4">Which program is right for you?</h2>
              <p className="text-muted max-w-xl mx-auto">
                Use the decision tree to find your tier in under a minute — or browse by your industry to see what AI can do for your sector specifically.
              </p>
            </div>
          </Reveal>

          {/* Toggle tabs */}
          <Reveal delay={80}>
            <div className="flex gap-1 bg-white/[0.04] border border-white/8 rounded-xl p-1 mb-8 max-w-md mx-auto">
              {[
                { id: 'tree',     icon: '🌳', label: 'Decision Tree' },
                { id: 'industry', icon: '🏭', label: 'By Industry' },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveSection(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-display font-bold transition-all ${
                    activeSection === tab.id
                      ? 'bg-blue text-white shadow-[0_0_15px_rgba(26,110,255,0.4)]'
                      : 'text-muted hover:text-white'
                  }`}>
                  <span>{tab.icon}</span>{tab.label}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Card glow className="p-8">
              {activeSection === 'tree' ? (
                <DecisionTree onResult={setTreeResult} />
              ) : (
                <IndustryMatcher />
              )}
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ── Three Tiers overview ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>Three Tiers</SectionLabel>
              <h2 className="font-display font-bold text-4xl mb-4">One program. Three levels of depth.</h2>
              <p className="text-muted max-w-xl mx-auto">Every tier builds on the last. Start where you are — upgrade as you grow.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {TIER_ORDER.map((tid, i) => {
              const t = TIERS[tid]
              return (
                <Reveal key={tid} delay={i * 80}>
                  <Card hover className={`p-7 h-full flex flex-col ${t.highlighted ? 'border-amber-400/30 bg-amber-400/[0.02]' : ''}`}>
                    <TierBadge tier={tid}
                      label={tid === 'smb' ? 'Business' : t.name}
                      className="mb-4" />
                    <div className="font-display font-black text-4xl mb-1">{t.priceDisplay}</div>
                    <div className="text-xs text-muted mb-1">{t.priceRange}</div>
                    <div className="text-xs text-muted mb-5">{t.billing}</div>
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

          {/* Not for comparison */}
          <Reveal delay={200}>
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <h3 className="font-display font-bold text-sm text-center text-muted uppercase tracking-wider mb-5">Quick fit guide</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {TIER_ORDER.map(tid => {
                  const t = TIERS[tid]
                  return (
                    <div key={tid}>
                      <TierBadge tier={tid} label={tid === 'smb' ? 'Business' : t.name} className="mb-3" />
                      <div className="text-xs text-success font-display font-bold mb-1.5">✓ Right for you if...</div>
                      <p className="text-xs text-muted mb-3 leading-relaxed">{t.idealFor}</p>
                      <div className="text-xs text-red-400 font-display font-bold mb-1.5">✕ Not right if...</div>
                      <p className="text-xs text-muted leading-relaxed">{t.notFor}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section id="curriculum" className="py-24 bg-navy-mid border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>Full Curriculum</SectionLabel>
              <h2 className="font-display font-bold text-4xl mb-4">14 modules. Zero filler.</h2>
              <p className="text-muted max-w-xl mx-auto">Every lesson produces a real deliverable. Every module builds on the last.</p>
            </div>
          </Reveal>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-80 space-y-2 flex-shrink-0 lg:max-h-[600px] lg:overflow-y-auto lg:pr-1">
              {MODULES.map((mod, i) => (
                <button key={mod.id} onClick={() => setActiveModule(i)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                    activeModule === i ? 'border-blue/40 bg-blue/10' : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                  }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0 mt-0.5">{mod.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-display font-bold text-muted mb-0.5">Module {mod.number}</div>
                      <div className={`text-sm font-display font-bold leading-snug ${activeModule === i ? 'text-white' : 'text-white/80'}`}>
                        {mod.title}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex-1">
              <Card glow className="p-8" style={{ minHeight: '480px' }}>
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
                      <div className="w-6 h-6 rounded-full bg-navy-light border border-white/10 flex items-center justify-center text-xs text-muted font-display font-bold flex-shrink-0">{i + 1}</div>
                      <span className="text-sm text-white/80 flex-1">{l.title}</span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {l.tier !== 'individual' && (
                          <TierBadge tier={l.tier} label={l.tier === 'smb' ? 'Business' : 'Enterprise'} />
                        )}
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
                    <TierBadge tier={t.tier} label={t.tier === 'smb' ? 'Business' : 'Enterprise'} />
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 text-center bg-navy-mid border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <div className="text-5xl mb-6">🚀</div>
            <h2 className="font-display font-bold text-4xl mb-4">Stop experimenting.<br/>Start delivering.</h2>
            <p className="text-muted text-lg mb-8">First use case live within 90 days — or your money back.</p>
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
              <div className="font-display font-black text-xl mb-0.5">
                Le On <span className="text-blue">AI</span>
              </div>
              <div className="text-xs text-muted mb-3">Learning Online · Artificial Intelligence</div>
              <p className="text-sm text-muted max-w-xs leading-relaxed">
                The execution-focused AI program for professionals, growing businesses, and enterprise teams.
              </p>
            </div>
            <div className="flex gap-12 flex-wrap">
              <div>
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Program</div>
                <div className="space-y-2">
                  <Link href="#curriculum"  className="block text-sm text-muted hover:text-white transition-colors">Curriculum</Link>
                  <Link href="#find-your-path" className="block text-sm text-muted hover:text-white transition-colors">Find My Tier</Link>
                  <Link href="/pricing"     className="block text-sm text-muted hover:text-white transition-colors">Pricing</Link>
                </div>
              </div>
              <div>
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Account</div>
                <div className="space-y-2">
                  <Link href="/login"     className="block text-sm text-muted hover:text-white transition-colors">Sign In</Link>
                  <Link href="/signup"    className="block text-sm text-muted hover:text-white transition-colors">Sign Up</Link>
                  <Link href="/dashboard" className="block text-sm text-muted hover:text-white transition-colors">Dashboard</Link>
                </div>
              </div>
              <div>
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Contact</div>
                <div className="space-y-2">
                  <a href="mailto:hello@learningonline.ai" className="block text-sm text-muted hover:text-white transition-colors">hello@learningonline.ai</a>
                  <a href="mailto:hello@learningonline.ai?subject=Enterprise Enquiry" className="block text-sm text-muted hover:text-white transition-colors">Enterprise enquiries</a>
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
