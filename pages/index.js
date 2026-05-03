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
            {t === null ? 'All Industries' : t === 'smb' ? 'AI Implementation' : TIERS[t]?.name}
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
                    <TierBadge tier={industry.recommendedTier} label={industry.recommendedTier === 'smb' ? 'AI Implementation' : tier.name} />
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
        <title>Le On AI — AI Anxiety → AI Awareness</title>
        <meta name="description" content="The execution-focused AI program for professionals, business owners, and enterprise leaders. 40 learning modules, 40 templates, ROI calculator, and model selection framework." />
      </Head>
      <Nav transparent />

      {/* ── Hero ── */}
      <section className="flex items-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage:'linear-gradient(rgba(26,110,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(26,110,255,0.04) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 py-8 md:py-10 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display font-black leading-[1.05] tracking-tight mb-4" style={{ fontSize:'clamp(26px,3.8vw,44px)' }}>
              AI Anxiety <span className="text-blue">→</span> AI Awareness
            </h1>
            <p className="text-base text-muted leading-relaxed max-w-lg mx-auto mb-1">
              Practical learning for professionals, parents, businesses and enterprise leaders — without the hype.
            </p>

            <p className="text-xs text-white/30 mb-4 font-display tracking-widest uppercase">
              40 learning modules · 4 tiers · 40+ implementation tools · live in 14 days
            </p>
            {user?.tier && (
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="large" href="/dashboard">Go to Dashboard →</Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Learning Tracks (4 cards: Parents free + 3 paid tiers) ── */}
      <section id="learning-tracks" className="py-4">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>Learning Paths</SectionLabel>
              <h2 className="font-display font-bold text-3xl mb-3">Choose Your AI Learning Path</h2>
              <p className="text-muted max-w-xl mx-auto text-sm">Whether you’re curious, cautious, implementing AI in business, or leading transformation — start where you are.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                pill: 'Free Module', pillClass: 'bg-success/15 border-success/30 text-success',
                title: 'AI for Parents', price: 'Free', billing: 'Free · Sign in required',
                hook: '9 practical modules · Helping families navigate AI confidently.',
                desc: 'A practical, reassuring guide for parents wanting to better understand how AI is shaping how children learn, think, communicate, and grow.',
                idealFor: 'Parents and caregivers wanting healthier AI conversations and sensible boundaries at home.',
                bullets: ['How kids are using AI today','Benefits vs risks explained simply','Warning signs to watch for','Conversation starters for families','Practical household AI boundaries','Parent downloadable guide'],
                cta: 'Start Free Module', ctaClass: 'bg-success/10 border border-success/30 text-success hover:bg-success/20',
                href: user ? '/parents' : '/login?redirect=/parents',
                cardClass: 'border-success/25 bg-success/[0.02]',
              },
              {
                pill: 'Individual', pillClass: 'bg-blue/15 border-blue/30 text-blue-bright',
                title: 'AI Awareness', price: '$49', billing: 'One-time · Lifetime access',
                hook: '10 modules · Build confidence with AI — no technical background needed.',
                desc: 'Designed for professionals wanting practical AI understanding, clearer conversations, and confidence in a rapidly changing world.',
                idealFor: 'Business professionals, team members, and people leaders wanting practical AI literacy.',
                bullets: ['AI foundations and model awareness','Prompting, context, memory and tools','Practical business examples','Leadership conversation readiness','Module Q&A scoring','Downloadable guides and cheat sheets'],
                cta: 'Enrol Now', ctaClass: 'border border-blue/40 text-blue-bright hover:bg-blue/10',
                href: user ? '/checkout?tier=individual' : '/login?redirect=/checkout?tier=individual',
                cardClass: '',
              },
              {
                pill: 'Business', pillClass: 'bg-amber-400/15 border-amber-400/30 text-amber-400', mostPopular: true,
                title: 'AI Implementation', price: '$99', popular: true, billing: 'One-time · Lifetime access',
                hook: '25 cumulative modules · From AI curiosity to practical execution.',
                desc: 'Built for business owners and operational teams preparing to introduce AI into workflows, reporting, customer engagement, and decision-making.',
                idealFor: 'Enterprise leaders, business owners, operations managers, and department leaders preparing for AI adoption.',
                bullets: ['Everything in AI Awareness','Use case identification and prioritisation','Workflow design frameworks','Data readiness and structuring','ROI modelling and measurement','People and change adoption toolkit'],
                cta: 'Enrol Now', ctaClass: 'bg-amber-400 hover:bg-amber-300 text-navy',
                href: user ? '/checkout?tier=smb' : '/login?redirect=/checkout?tier=smb',
                cardClass: 'border-amber-400/30 bg-amber-400/[0.02]',
              },
              {
                pill: 'Enterprise', pillClass: 'bg-blue/15 border-blue/30 text-blue-bright',
                title: 'AI Transformation', price: '$149', billing: 'One-time · Lifetime access',
                hook: '40 cumulative modules · Lead AI adoption with structure and governance.',
                desc: 'Created for enterprise leaders driving organisation-wide AI capability, governance, operating models, and long-term transformation.',
                idealFor: 'CIOs, transformation directors, and enterprise leaders responsible for scalable AI adoption.',
                bullets: ['Everything in AI Implementation','Enterprise AI operating model','Responsible AI and governance','Sustainability and AI impact planning','Multimodal AI orchestration','90-day execution roadmap'],
                cta: 'Enrol Now', ctaClass: 'border border-blue/40 text-blue-bright hover:bg-blue/10',
                href: user ? '/checkout?tier=enterprise' : '/login?redirect=/checkout?tier=enterprise',
                cardClass: '',
              },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 80}>
                <Card hover className={`p-6 h-full flex flex-col ${card.cardClass}`}>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`px-2.5 py-1 border rounded-full text-[10px] font-display font-bold ${card.pillClass}`}>{card.pill}</span>
                    {card.popular && <span className="px-2.5 py-1 bg-amber-400 text-navy rounded-full text-[10px] font-display font-bold">MOST POPULAR</span>}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-1">{card.title}</h3>
                  <p className="text-xs text-white/40 italic mb-3">{card.hook}</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-display font-black text-3xl">{card.price}</span>
                  </div>
                  <div className="text-[10px] text-muted mb-4">{card.billing}</div>
                  <p className="text-xs text-muted leading-relaxed mb-4">{card.desc}</p>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 mb-4">
                    <div className="text-[10px] font-display font-bold text-muted uppercase tracking-wider mb-1">Ideal for</div>
                    <p className="text-[11px] text-white/70 leading-relaxed">{card.idealFor}</p>
                  </div>
                  <ul className="space-y-1.5 mb-5 flex-1">
                    {card.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2 text-xs text-white/70">
                        <span className="text-success flex-shrink-0 mt-0.5">✓</span>{b}
                      </li>
                    ))}
                  </ul>
                  <Link href={card.href}
                    className={`w-full text-center py-2.5 rounded-lg font-display font-bold text-sm transition-all block ${card.ctaClass}`}>
                    {card.cta}
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ── Learning Evolution ── */}
      <section className="py-16 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionLabel>Learning Evolution</SectionLabel>
            <h2 className="font-display font-bold text-3xl mb-3">Where We're Heading</h2>
            <p className="text-muted max-w-lg mx-auto text-sm">AI is evolving. Our platform evolves with it.</p>
          </div>

          {/* Metro line */}
          <div className="relative">
            {/* Vertical connector */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-success/40 via-blue/30 via-amber-400/20 to-purple-400/10" />

            {[
              { dot: 'bg-success', title: 'Beta Foundations', desc: 'We began by building practical AI awareness.', label: 'Complete' },
              { dot: 'bg-success', title: 'Version 1 Launch', desc: 'Foundational learning modules, templates, and practical AI guidance.', label: 'Current' },
              { dot: 'bg-blue', title: 'Industry Intelligence', desc: 'Industry-specific pathways and operational AI patterns.', label: 'Planned' },
              { dot: 'bg-amber-400', title: 'AI Agents at Work', desc: 'Ready-to-use AI copilots and workflow assistants.', label: 'Future' },
              { dot: 'bg-purple-400', title: 'Agentic Organisations', desc: 'Connected AI ecosystems and orchestrated workflows.', label: 'Long-term' },
              { dot: 'bg-gray-400 dark:bg-white/20', title: 'Human + AI Orchestration', desc: 'Long-term responsible collaboration between humans and AI.', label: 'Beyond' },
            ].map((stage, i) => (
              <div key={i} className="relative flex items-start gap-4 md:gap-6 pb-6 last:pb-0">
                <div className={`relative z-10 w-3 h-3 rounded-full ${stage.dot} mt-1.5 flex-shrink-0 ring-4 ring-white dark:ring-navy`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-bold text-sm text-gray-900 dark:text-white">{stage.title}</span>
                    <span className="text-[9px] font-display font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider">{stage.label}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-white/40 mt-0.5">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/roadmap" className="text-xs text-blue hover:text-blue-bright font-display font-bold transition-colors">
              View Full Roadmap →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section id="curriculum" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>Learning Paths</SectionLabel>
              <h2 className="font-display font-bold text-4xl mb-4">40 learning modules. Zero filler.</h2>
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
                        if (firstTier && firstTier !== 'individual') return <TierBadge tier={firstTier} label={firstTier === 'smb' ? 'AI Implementation+' : 'AI Transformation'} />
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
                  <Link href="#curriculum"      className="block text-sm text-muted hover:text-white">Learning Paths</Link>
                  <Link href="#find-your-path"  className="block text-sm text-muted hover:text-white">Find My Tier</Link>
                  <Link href="/model-selection" className="block text-sm text-muted hover:text-white">Model Guide</Link>
                  <Link href="/roi-calculator"  className="block text-sm text-muted hover:text-white">AI Value Calculator</Link>
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
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Get in Touch</div>
                <div className="space-y-2">
                  <a href="mailto:hello@learningonline.ai"    className="block text-sm text-muted hover:text-white">hello@learningonline.ai</a>
                  <Link href="/contact"                        className="block text-sm text-muted hover:text-white">Enterprise enquiries</Link>
                  <Link href="/contact"                        className="block text-sm text-muted hover:text-white">Talk to Us</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/5 gap-3 text-xs text-muted">
            <p>© 2025 Le On AI · learningonline.ai</p>
            <p>7-day money-back guarantee · Secure payments via Stripe</p>
          </div>
        </div>
      </footer>
    </>
  )
}

