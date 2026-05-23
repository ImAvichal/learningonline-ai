// pages/index.js — LeO AI homepage
import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer'
import { useState } from 'react'
import { Nav, Reveal, Card, SectionLabel, Button, TierBadge, BillingToggle } from '../components/ui'
import Icon from '../components/Icon'
import { Lock, X, Clock, FileCheck2, Sparkles } from 'lucide-react'
import { MODULES } from '../data/modules'
import { TIERS, TIER_ORDER, INDUSTRIES, DISPLAY_ORDER } from '../data/tiers'
import { useAuth } from '../lib/auth'

// ── FAQ content — used for both the on-page Q&A section and the JSON-LD
//    FAQPage schema that Google / AI search consume for rich answers. ──
const FAQS = [
  {
    q: 'What is LeO AI?',
    a: 'LeO AI is a practical AI training platform that takes professionals, business owners, and enterprise leaders from AI anxiety to AI capability. It teaches you how to actually use AI at work through 14 structured modules, each producing a real deliverable you can apply immediately.',
  },
  {
    q: 'Who is LeO AI for?',
    a: 'It is designed for working professionals, business owners, transformation leaders, and teams who want to apply AI practically rather than just understand it in theory. There is also a dedicated Parents & Caregivers track for adults supporting children navigating AI.',
  },
  {
    q: 'Do I need a technical background to use it?',
    a: 'No. The curriculum starts with foundations and builds progressively. It is written in plain language and focuses on practical application, decision-making, and outcomes rather than coding or deep technical theory.',
  },
  {
    q: 'How much does LeO AI cost?',
    a: 'There is a free Parents & Caregivers module, and two paid subscription tiers: Starting the Journey at $19/month or $179/year, and The Pro at $39/month or $349/year. You can upgrade from Journey to Pro at any time.',
  },
  {
    q: 'What will I actually be able to do after completing it?',
    a: 'You will be able to identify high-value AI use cases, build a financial case for AI investment, design human-and-AI workflows, prepare data, choose the right tools, measure ROI, and lead responsible AI adoption — each backed by a concrete deliverable you create as you go.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'Yes. If you do not believe the platform delivers measurable value within 3 days of purchase, you can contact us for a full refund.',
  },
]
import { useRegion } from '../lib/region'
import { useTranslation } from '../lib/i18n'
import { REGIONAL_PRICING } from '../data/tiers'

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
      { label: 'Self-directed learning — foundations, models, use cases, leadership framing', icon: '📚', result: 'journey' },
      { label: 'Learning plus practical frameworks I can apply in my business',              icon: '💡', next: 'smb_confirm' },
    ],
  },
  team_size: {
    id: 'team_size',
    question: 'How many people need access?',
    options: [
      { label: 'Just me — I\'ll share learnings with my team',  icon: '👤', result: 'journey' },
      { label: '2–5 people in my team or department',           icon: '👥', next: 'smb_confirm' },
      { label: '6 or more, across departments',                 icon: '🏢', next: 'enterprise_depth' },
    ],
  },
  smb_confirm: {
    id: 'smb_confirm',
    question: 'Do you need use case frameworks, ROI models, and workflow design tools?',
    options: [
      { label: 'Yes — I need practical implementation guidance and financial models', icon: '✅', result: 'journey' },
      { label: 'No — foundational content and examples are enough',                  icon: '📋', result: 'journey' },
    ],
  },
  enterprise_depth: {
    id: 'enterprise_depth',
    question: 'What is most important to your program?',
    options: [
      { label: 'Governance, responsible AI, and compliance frameworks',  icon: '⚖️', result: 'pro' },
      { label: 'Data readiness and legacy system standardisation',       icon: '🗄️', result: 'pro' },
      { label: 'Multimodal AI and orchestration strategy',              icon: '🎛️', result: 'pro' },
      { label: 'We\'re not at enterprise scale yet',                    icon: '📈', result: 'journey' },
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
            <span className="flex-shrink-0 text-blue-bright"><Icon name={opt.icon} size={22} /></span>
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
        {[null, 'journey', 'pro'].map(t => (
          <button key={t || 'all'} onClick={() => { setFilterTier(t); setSelected(null) }}
            className={`px-3 py-1.5 rounded-full text-xs font-display font-bold border transition-all ${
              filterTier === t
                ? t === null ? 'bg-white/10 border-white/20 text-white' : `tier-${t}`
                : 'border-white/10 text-muted hover:border-white/20 hover:text-white'
            }`}>
            {t === null ? 'All Industries' : TIERS[t]?.name}
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
                  <div className="mb-2 text-blue-bright"><Icon name={ind.icon} size={22} /></div>
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
                <span className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue/12 border border-blue/20 flex items-center justify-center text-blue-bright"><Icon name={industry.icon} size={28} /></span>
                <div>
                  <h3 className="font-display font-bold text-2xl mb-2">{industry.name}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted">Recommended:</span>
                    <TierBadge tier={industry.recommendedTier} label={tier.name} />
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
  const { t } = useTranslation()
  const { user } = useAuth()
  const [interval, setInterval] = useState('monthly')
  const { region } = useRegion()
  const regionalConfig = REGIONAL_PRICING[region] || REGIONAL_PRICING.AU
  const priceFor = (tierKey) => regionalConfig?.plans?.[tierKey]?.[interval]?.label || '—'
  const [activeModule,  setActiveModule]  = useState(0)
  const [activeSection, setActiveSection] = useState('tree')
  const [activePhase,   setActivePhase]   = useState(0)
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)

  // Curriculum phases — group the 14 modules into 3 chronological phases.
  // moduleIndices are 0-based indices into MODULES. `stage` gives each phase an
  // evolution-themed framing for the journey visualisation.
  const PHASES = [
    { label: 'Phase 1', title: 'Foundations & Strategy',     stage: 'Awareness',      moduleIndices: [0, 1, 2, 3] },
    { label: 'Phase 2', title: 'Technical Execution & ROI',  stage: 'Implementation', moduleIndices: [4, 5, 6, 7, 8] },
    { label: 'Phase 3', title: 'Governance, Scale & Action', stage: 'Leadership',     moduleIndices: [9, 10, 11, 12, 13] },
  ]
  // Ensure the active module always belongs to the active phase.
  const selectPhase = (phaseIdx) => {
    setActivePhase(phaseIdx)
    const first = PHASES[phaseIdx].moduleIndices[0]
    setActiveModule(first)
  }

  return (
    <>
      <Head>
        <title>LeO AI — AI Anxiety → AI Awareness</title>
        <meta name="description" content="Practical AI training that takes professionals, business owners, and leaders from AI anxiety to real AI capability — 14 modules, each producing a deliverable you can use at work." />
        <link rel="canonical" href="https://www.learningonline.ai/" />
        {/* Social cards */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="LeO AI" />
        <meta property="og:title" content="LeO AI — AI Anxiety → AI Awareness" />
        <meta property="og:description" content="Practical AI training that takes you from AI anxiety to real capability. 14 modules, real deliverables." />
        <meta property="og:url" content="https://www.learningonline.ai/" />
        <meta property="og:image" content="https://www.learningonline.ai/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LeO AI — AI Anxiety → AI Awareness" />
        <meta name="twitter:description" content="Practical AI training that takes you from AI anxiety to real capability." />
        <meta name="twitter:image" content="https://www.learningonline.ai/og-image.png" />
        {/* FAQPage structured data — helps Google / AI search surface direct answers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQS.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }),
          }}
        />
      </Head>
      <Nav transparent />

      {/* ── Hero ── */}
      <section className="flex items-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage:'linear-gradient(rgba(26,110,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(26,110,255,0.04) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 py-8 md:py-10 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display font-black leading-[1.05] tracking-tight mb-4" style={{ fontSize:'clamp(26px,3.8vw,44px)' }}>
              {t("hero.tagline")}
            </h1>
            <p className="text-base text-muted leading-relaxed max-w-lg mx-auto mb-1">
              {t("hero.subtitle")}
            </p>

            <p className="text-xs text-white/30 mb-4 font-display tracking-widest uppercase">
            </p>
            {user?.tier && (
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="large" href="/dashboard">Go to Dashboard →</Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Learning Tracks (3 cards: Parents free + 2 paid tiers) ── */}
      <section id="learning-tracks" className="py-4">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>{t("learningPaths.label")}</SectionLabel>
              <h2 className="font-display font-bold text-3xl mb-3">{t("learningPaths.title")}</h2>
              <p className="text-muted max-w-xl mx-auto text-sm">{t("learningPaths.subtitle")}</p>
            </div>
          </Reveal>
          
          {/* Billing toggle */}
          <div className="flex justify-center mb-6">
            <BillingToggle interval={interval} onChange={setInterval} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                pill: t('common.freeTier'), pillClass: 'bg-success/15 border-success/30 text-success',
                title: t('plans.parents.name'), price: t('common.free'), billing: t('common.freeSignInRequired'),
                hook: t('plans.parents.hook'),
                desc: t('plans.parents.description'),
                idealFor: t('plans.parents.idealFor'),
                bullets: t('plans.parents.bullets') instanceof Array ? t('plans.parents.bullets') : ['How kids are using AI today','Benefits vs risks explained simply','Warning signs to watch for','Conversation starters for families','Practical household AI boundaries','Parents & Caregivers downloadable guide'],
                cta: t('plans.parents.cta'), ctaClass: 'bg-success/10 border border-success/30 text-success hover:bg-success/20',
                href: user ? '/parents' : '/login?redirect=/parents',
                cardClass: 'border-success/25 bg-success/[0.02]',
              },
              {
                pill: t('plans.journey.name'), pillClass: 'bg-blue/15 border-blue/30 text-blue-bright', mostPopular: true,
                title: t('plans.journey.name'), tierKey: 'journey', popular: true,
                hook: t('plans.journey.hook'),
                desc: t('plans.journey.description'),
                idealFor: t('plans.journey.idealFor'),
                bullets: Array.isArray(t('plans.journey.features')) ? t('plans.journey.features') : ['Foundational AI learning and model awareness','Prompts, context, tools, and practical use','Use case identification and prioritisation','Workflow design and ROI frameworks','Data readiness and people/change adoption','Practical exercises and frameworks'],
                cta: t('plans.journey.cta'), ctaClass: 'bg-blue hover:bg-blue-bright text-white',
                tier: 'journey',
                cardClass: 'border-blue/30 bg-blue/[0.02]',
              },
              {
                pill: t('plans.pro.name'), pillClass: 'bg-purple-400/15 border-purple-400/30 text-purple-400',
                title: t('plans.pro.name'), tierKey: 'pro',
                hook: t('plans.pro.hook'),
                desc: t('plans.pro.description'),
                idealFor: t('plans.pro.idealFor'),
                bullets: Array.isArray(t('plans.pro.features')) ? t('plans.pro.features') : ['Everything in Starting the Journey','Enterprise AI operating model','Responsible AI and governance','Sustainability and AI impact planning','Multimodal AI orchestration','AI economics and 90-day execution roadmap'],
                cta: t('plans.pro.cta'), ctaClass: 'border border-purple-400/40 text-purple-400 hover:bg-purple-400/10',
                tier: 'pro',
                cardClass: '',
              },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 80}>
                <Card hover className={`p-6 h-full flex flex-col ${card.cardClass}`}>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`px-2.5 py-1 border rounded-full text-[10px] font-display font-bold ${card.pillClass}`}>{card.pill}</span>
                    {card.popular && <span className="px-2.5 py-1 bg-amber-400 text-navy rounded-full text-[10px] font-display font-bold">{t("common.mostPopular")}</span>}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-1 text-white">{card.title}</h3>
                  <p className="text-xs text-white/40 italic mb-3">{card.hook}</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-display font-black text-white leading-none whitespace-nowrap" style={{fontSize: 'clamp(18px, 2.2vw, 24px)'}}>
                      {card.tierKey ? priceFor(card.tierKey) : card.price}
                    </span>
                  </div>
                  <div className="text-[10px] text-muted mb-4">{card.tierKey ? (interval === 'annual' ? t('common.billedAnnually') : t('common.billedMonthly')) : card.billing}</div>
                  <p className="text-xs text-muted leading-relaxed mb-4">{card.desc}</p>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 mb-4">
                    <div className="text-[10px] font-display font-bold text-muted uppercase tracking-wider mb-1">{t("common.idealFor") || "Ideal for"}</div>
                    <p className="text-[11px] text-white/70 leading-relaxed">{card.idealFor}</p>
                  </div>
                  <ul className="space-y-2 mb-5 flex-1">
                    {card.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start justify-between gap-2 text-xs text-white/70 pb-1.5 border-b border-white/5 last:border-0">
                        <span className="leading-relaxed flex-1">{b}</span>
                        <span className="text-success font-bold flex-shrink-0 mt-0.5">✓</span>
                      </li>
                    ))}
                  </ul>

                  {/* Subtle Terms link above CTA — only on paid tier cards */}
                  {card.tierKey && (
                    <div className="text-center mb-3 sm:mb-2">
                      <Link href="/terms" className="text-[11px] text-gray-500 hover:text-blue underline underline-offset-2 decoration-gray-300 hover:decoration-blue transition-colors">
                        View Terms &amp; Refund Policy
                      </Link>
                    </div>
                  )}

                  {(() => {
                    // Determine CTA based on user state and tier comparison
                    // Tier hierarchy: pro > journey > parents (free)
                    const tierRank = { parents: 0, journey: 1, pro: 2 }
                    const userRank = user?.tier ? (tierRank[user.tier] ?? 0) : -1
                    const cardRank = card.tierKey ? tierRank[card.tierKey] : 0

                    // Paid card (journey or pro)
                    if (card.tierKey) {
                      // User already has this exact tier OR a higher one → "Continue Learning"
                      if (user?.tier && userRank >= cardRank) {
                        return (
                          <Link href="/dashboard"
                            className={`w-full text-center py-2.5 rounded-lg font-display font-bold text-sm transition-all block ${card.ctaClass}`}>
                            Continue Learning →
                          </Link>
                        )
                      }
                      // User has lower tier → "Upgrade" CTA
                      if (user?.tier && userRank < cardRank) {
                        return (
                          <Link href={`/checkout?tier=${card.tierKey}&interval=${interval}`}
                            className={`w-full text-center py-2.5 rounded-lg font-display font-bold text-sm transition-all block ${card.ctaClass}`}>
                            Upgrade to {card.title} →
                          </Link>
                        )
                      }
                      // Logged in but no tier — go straight to checkout
                      if (user) {
                        return (
                          <Link href={`/checkout?tier=${card.tierKey}&interval=${interval}`}
                            className={`w-full text-center py-2.5 rounded-lg font-display font-bold text-sm transition-all block ${card.ctaClass}`}>
                            {card.cta}
                          </Link>
                        )
                      }
                      // Not logged in — login first, then checkout
                      return (
                        <Link href={`/login?redirect=${encodeURIComponent(`/checkout?tier=${card.tierKey}&interval=${interval}`)}`}
                          className={`w-full text-center py-2.5 rounded-lg font-display font-bold text-sm transition-all block ${card.ctaClass}`}>
                          {card.cta}
                        </Link>
                      )
                    }

                    // Parents (free) card
                    if (user) {
                      return (
                        <Link href="/parents"
                          className={`w-full text-center py-2.5 rounded-lg font-display font-bold text-sm transition-all block ${card.ctaClass}`}>
                          {user?.tier ? 'Open Parent Module →' : card.cta}
                        </Link>
                      )
                    }
                    return (
                      <Link href={card.href}
                        className={`w-full text-center py-2.5 rounded-lg font-display font-bold text-sm transition-all block ${card.ctaClass}`}>
                        {card.cta}
                      </Link>
                    )
                  })()}
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ── Curriculum — Learning Journey ── */}
      <section id="curriculum" className="py-24 relative overflow-hidden">
        <div className="journey-ambient" aria-hidden="true" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>{t("learningPaths.label")}</SectionLabel>
              <h2 className="font-display font-bold text-4xl mb-4">Build real AI capability.</h2>
              <p className="text-muted max-w-xl mx-auto">A guided journey from awareness to leadership. Every module produces a real deliverable — and builds on the last.</p>
            </div>
          </Reveal>

          {/* Stage rail — the three evolution stages, connected */}
          <div className="flex items-stretch justify-center gap-0 mb-10 max-w-3xl mx-auto">
            {PHASES.map((phase, pi) => (
              <div key={pi} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => selectPhase(pi)}
                  className={`group relative flex flex-col items-center text-center transition-all duration-300 ${activePhase === pi ? '' : 'opacity-60 hover:opacity-100'}`}
                >
                  <span className={`relative w-11 h-11 rounded-full flex items-center justify-center font-display font-black text-sm border-2 transition-all duration-300 ${activePhase === pi ? 'bg-blue border-blue text-white shadow-[0_0_20px_rgba(26,110,255,0.5)]' : 'bg-navy-mid border-white/20 text-white/70'}`}>
                    {pi + 1}
                  </span>
                  <span className={`mt-2 text-[11px] sm:text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap ${activePhase === pi ? 'text-blue-bright' : 'text-muted'}`}>{phase.stage}</span>
                </button>
                {pi < PHASES.length - 1 && (
                  <div className="flex-1 h-[2px] mx-2 sm:mx-3 mb-5 rounded-full bg-gradient-to-r from-blue/40 to-white/10" />
                )}
              </div>
            ))}
          </div>

          {/* Active phase title */}
          <div className="text-center mb-8">
            <h3 className="font-display font-bold text-xl sm:text-2xl">{PHASES[activePhase].title}</h3>
            <p className="text-xs text-muted mt-1">Modules {PHASES[activePhase].moduleIndices[0] + 1}–{PHASES[activePhase].moduleIndices[PHASES[activePhase].moduleIndices.length - 1] + 1}</p>
          </div>

          {/* ── Stable two-column layout: module list (left) + fixed preview (right) ── */}
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6 items-start">
            {/* Module nodes — selecting one updates the panel in place (no scroll) */}
            <div className="space-y-2.5">
              {PHASES[activePhase].moduleIndices.map((i) => {
                const mod = MODULES[i]
                const isActive = activeModule === i
                return (
                  <button
                    key={mod.id}
                    onClick={() => { setActiveModule(i); setMobileSheetOpen(true) }}
                    className={`w-full text-left flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-200 ${isActive ? 'border-blue/50 bg-blue/[0.10] shadow-[0_0_18px_rgba(26,110,255,0.15)]' : 'border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'}`}
                  >
                    <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${isActive ? 'bg-blue/20 border-blue/40 text-blue-bright' : 'bg-blue/10 border-blue/15 text-blue-bright'}`}>
                      <Icon name={mod.icon} size={19} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-display font-bold text-muted">Module {mod.number}</div>
                      <div className={`text-sm font-display font-bold leading-snug truncate ${isActive ? 'text-white' : 'text-white/85'}`}>{mod.title}</div>
                    </div>
                    {i !== 0 && <span className="flex-shrink-0 text-muted" title="Included with enrolment"><Lock size={13} /></span>}
                  </button>
                )
              })}
            </div>

            {/* Preview panel — DESKTOP: sticky, fixed-height, updates in place.
                The key={activeModule} triggers a gentle cross-fade on change but
                the panel container never moves — no page reflow, no scroll jump. */}
            <div className="hidden lg:block sticky top-24">
              <ModulePreview mod={MODULES[activeModule]} key={activeModule} />
            </div>
          </div>
        </div>

        {/* Preview panel — MOBILE: slides up as a bottom sheet over the journey,
            so selecting a module never pushes the page layout. */}
        {mobileSheetOpen && (
          <div className="lg:hidden fixed inset-0 z-[90] flex items-end">
            <div className="absolute inset-0 bg-navy/70 backdrop-blur-sm journey-backdrop" onClick={() => setMobileSheetOpen(false)} aria-hidden="true" />
            <div className="journey-sheet relative w-full max-h-[85vh] overflow-y-auto bg-navy-mid border-t border-white/12 rounded-t-3xl">
              <div className="sticky top-0 flex justify-center pt-3 pb-2 bg-navy-mid">
                <span className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <div className="px-5 pb-8">
                <ModulePreview mod={MODULES[activeModule]} onClose={() => setMobileSheetOpen(false)} />
              </div>
            </div>
          </div>
        )}
      </section>


      {/* Preview section removed — free-preview affordance now lives inside
          Module 1 in the curriculum, and module access is indicated by the
          lock icons on each module node. This eliminates the duplicate content. */}

      {/* ── Learning Evolution ── */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>{t("evolution.label")}</SectionLabel>
            <h2 className="font-display font-bold text-3xl mb-3">{t("evolution.heading")}</h2>
            <p className="text-muted max-w-lg mx-auto text-sm">{t("evolution.subtitle")}</p>
          </div>

          {/* Horizontal metro line — scrollable */}
          <div className="overflow-x-auto pb-6 -mx-6 px-6">
            <div className="flex min-w-[900px]">
              {[
                { title: t('evolution.stages.beta.title'), desc: t('evolution.stages.beta.desc'), dot: 'bg-gray-300 dark:bg-white/25', active: false },
                { title: t('evolution.stages.v1.title'), desc: t('evolution.stages.v1.desc'), dot: 'bg-success', active: true },
                { title: t('evolution.stages.industry.title'), desc: t('evolution.stages.industry.desc'), dot: 'bg-blue', active: false },
                { title: t('evolution.stages.agents.title'), desc: t('evolution.stages.agents.desc'), dot: 'bg-amber-400', active: false },
                { title: 'Agentic Organisations', desc: 'Connected AI ecosystems and orchestrated operations.', dot: 'bg-purple-400', active: false },
                { title: 'Human + AI', desc: 'Long-term collaboration between humans and intelligent systems.', dot: 'bg-gray-300 dark:bg-white/15', active: false },
              ].map((s, i, arr) => (
                <div key={i} className="flex-1 relative" style={{ minWidth: '140px' }}>
                  {/* Node row: dot + line */}
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${s.dot} ${s.active ? 'ring-4 ring-success/20' : ''}`} />
                    {i < arr.length - 1 && <div className={`h-px flex-1 ${s.active ? 'bg-success/30' : 'bg-gray-200 dark:bg-white/8'}`} />}
                  </div>
                  {/* Label below */}
                  <div className="pr-6 mt-3">
                    <div className={`text-xs font-display font-bold leading-tight ${s.active ? 'text-success' : 'text-gray-700 dark:text-white/50'}`}>{s.title}</div>
                    <p className="text-[10px] text-gray-400 dark:text-white/25 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/roadmap" className="text-xs text-blue hover:text-blue-bright font-display font-bold transition-colors">
              Explore the full evolution roadmap →
            </Link>
          </div>
        </div>
      </section>


      {/* ── FAQ — Q&A formatting for SEO + AI search (with JSON-LD schema) ── */}
      <section id="faq" className="py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="font-display font-bold text-4xl mb-4">Common questions</h2>
              <p className="text-muted max-w-xl mx-auto">Straight answers about what LeO AI is, who it&rsquo;s for, and how it works.</p>
            </div>
          </Reveal>
          <div className="space-y-8">
            {FAQS.map((f, i) => (
              <Reveal key={i} delay={i * 40}>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2 text-white">{f.q}</h3>
                  <p className="text-muted leading-relaxed">{f.a}</p>
                </div>
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
            <p className="text-muted text-lg mb-8">Practical AI capability, built one focused module at a time.</p>
            <div className="flex flex-wrap gap-4 sm:gap-4 justify-center">
              <a href="#learning-tracks"
                onClick={(e) => {
                  e.preventDefault()
                  const target = document.getElementById('learning-tracks')
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    // Update URL hash without triggering navigation
                    history.replaceState(null, '', '#learning-tracks')
                  }
                }}
                className="inline-flex items-center justify-center gap-2 font-display font-bold text-base rounded-lg transition-all duration-200 px-8 py-4 bg-blue hover:bg-blue-bright text-white shadow-[0_0_30px_rgba(26,110,255,0.4)] hover:-translate-y-0.5 cursor-pointer">
                Find My Program ↑
              </a>
              <Button variant="ghost" href="/pricing" className="text-base px-8 py-4">View All Pricing</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer variant="dark" />
    </>
  )
}


// ── ModulePreview ────────────────────────────────────────────────────────────
// The fixed-height preview panel shown beside the journey (desktop) or in the
// bottom sheet (mobile). It updates IN PLACE when a module is selected — the
// container never moves, so there's no page reflow or scroll jump. A subtle
// cross-fade (via key={activeModule} on the parent) keeps changes smooth.
function ModulePreview({ mod, onClose }) {
  const firstTier = mod.lessons[0]?.tier
  const mappedTier = firstTier && firstTier !== 'individual'
    ? (firstTier === 'smb' ? 'journey' : firstTier === 'enterprise' ? 'pro' : firstTier)
    : null

  return (
    <Card glow className="journey-preview p-6 sm:p-8 relative">
      {onClose && (
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/12 text-muted hover:text-white flex items-center justify-center lg:hidden" aria-label="Close">
          <X size={16} />
        </button>
      )}

      <div className="flex items-start gap-4 mb-6">
        <span className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue/12 border border-blue/20 flex items-center justify-center text-blue-bright">
          <Icon name={mod.icon} size={28} />
        </span>
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-3 py-1 bg-blue/10 border border-blue/25 rounded-full text-xs font-display font-bold text-blue-bright">Module {mod.number}</span>
            {mappedTier && <TierBadge tier={mappedTier} />}
          </div>
          <h3 className="font-display font-bold text-2xl mb-2 leading-tight">{mod.title}</h3>
          <p className="text-muted text-sm leading-relaxed">{mod.description}</p>
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-2 mb-6">
        {mod.lessons.map((l, i) => (
          <div key={l.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="w-6 h-6 rounded-full bg-navy-light border border-white/10 flex items-center justify-center text-xs text-muted font-display font-bold flex-shrink-0">{i + 1}</div>
            <span className="text-sm text-white/80 flex-1">{l.title}</span>
            {l.duration && <span className="text-xs text-muted flex-shrink-0 inline-flex items-center gap-1"><Clock size={11} /> {l.duration}</span>}
          </div>
        ))}
      </div>

      {/* Deliverable — premium outcome */}
      <div className="relative flex items-start gap-3 p-5 rounded-xl bg-success/[0.07] border border-success/30 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-1 bg-success/60" />
        <span className="text-success mt-0.5"><FileCheck2 size={22} /></span>
        <div className="flex-1">
          <div className="text-[10px] font-display font-bold text-success uppercase tracking-wider mb-1">You'll walk away with</div>
          <div className="text-base font-display font-bold text-white leading-snug">{mod.deliverable}</div>
        </div>
      </div>

      {/* Free-preview affordance — only Module 1 */}
      {mod.number === 1 && (
        <div className="mt-4">
          <Link href="/preview" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue/15 border border-blue/40 text-blue-bright font-display font-bold text-sm hover:bg-blue/25 transition-all duration-200">
            <Sparkles size={16} /> Preview Free Lesson <span className="text-blue-bright/70 font-normal">(No Sign-up)</span>
          </Link>
        </div>
      )}
    </Card>
  )
}
