// pages/choose-ai.js — "Choose the Right AI" — interactive capability map
//
// A spatial, interconnected capability map that helps users pick the right
// kind of AI for their task. Not a documentation page — an exploration.
//
// Presentation:
//   • Desktop: a radial map. Root ("What are you trying to achieve?") sits at
//     centre; 12 capability nodes are positioned around it on a deterministic
//     radial layout (computed in code — no graph library). Curved SVG
//     connectors trace from root to each node. Hovering a node highlights its
//     pathway; clicking opens a detail panel that animates in OVER the map so
//     spatial continuity is preserved (no scroll-jump).
//   • Mobile: the same root→branches idea as a vertical traced pathway with
//     focused node expansion. Readable, tappable, no horizontal scroll.
//
// Depth/mood: ambient grid + radial glow background, gradient connectors,
// soft node elevation on hover — a calm "AI operating system" feel.
//
// All driven by one CATEGORIES array, so future expansion (prompts, pricing,
// pairings) is additive. No heavy libraries; pure React state + SVG + CSS.

import Head from 'next/head'
import { useState } from 'react'
import Footer from '../components/Footer'
import { Nav } from '../components/ui'
import { Search, PenLine, Code2, Palette, Clapperboard, Mic, Presentation, Zap, LineChart, Bot, GraduationCap, MessagesSquare, Sparkles, X } from 'lucide-react'

const CATEGORIES = [
  {
    id: 'research',
    popular: true,
    icon: Search,
    name: 'Deep Research',
    blurb: 'Analyse large amounts of information, summarise reports, compare sources, and generate structured insights.',
    bestFor: ['Professionals', 'Analysts', 'Students', 'Consultants'],
    note: 'Always verify key facts against the original source — AI can summarise confidently but still misread or omit nuance.',
    tools: [
      { name: 'Claude', why: 'Strong long-form reasoning and structured analysis of long documents.', badge: 'versatile' },
      { name: 'Perplexity', why: 'Search-grounded answers with live citations you can click through to.', badge: 'free' },
      { name: 'ChatGPT', why: 'Broad general research with a deep-research mode for multi-step investigations.' },
      { name: 'Gemini', why: 'Very large context window — useful for feeding in lots of material at once.' },
    ],
  },
  {
    id: 'writing',
    popular: true,
    beginnerStart: true,
    icon: PenLine,
    name: 'Writing & Text',
    blurb: 'Draft, edit, rewrite, and refine anything from emails to long-form articles and reports.',
    bestFor: ['Marketers', 'Professionals', 'Beginners', 'Founders'],
    note: 'Use AI for first drafts and editing, not final say. Your voice and judgement are what make the writing yours.',
    tools: [
      { name: 'Claude', why: 'Natural, considered prose and reliable at following detailed tone/style instructions.', badge: 'versatile' },
      { name: 'ChatGPT', why: 'Fast, flexible drafting across almost any format or style.', badge: 'beginner' },
      { name: 'Gemini', why: 'Integrates with Google Docs/Workspace for in-place drafting.' },
    ],
  },
  {
    id: 'coding',
    popular: true,
    icon: Code2,
    name: 'Coding',
    blurb: 'Write, debug, explain, and refactor code — from quick scripts to whole features.',
    bestFor: ['Developers', 'Technical founders', 'Data teams'],
    note: 'Review AI-generated code before shipping. It can introduce subtle bugs or insecure patterns that look correct.',
    tools: [
      { name: 'Claude', why: 'Excellent at multi-file reasoning, refactoring, and explaining unfamiliar code.', badge: 'versatile' },
      { name: 'Cursor', why: 'An AI-native code editor — edits across your codebase with full project context.' },
      { name: 'GitHub Copilot', why: 'In-editor autocomplete that fits naturally into existing dev workflows.' },
      { name: 'ChatGPT', why: 'Strong general coding help and quick one-off problem solving.' },
    ],
  },
  {
    id: 'image',
    popular: true,
    icon: Palette,
    name: 'Image Generation',
    blurb: 'Create illustrations, concept art, product mockups, and marketing visuals from text prompts.',
    bestFor: ['Creators', 'Marketers', 'Designers'],
    note: 'Check usage rights for commercial work, and be mindful of generating images of real people or brands.',
    tools: [
      { name: 'Midjourney', why: 'Best-in-class aesthetic quality and artistic control.', badge: 'versatile' },
      { name: 'DALL·E (ChatGPT)', why: 'Easy conversational image creation — good for quick iterations.', badge: 'beginner' },
      { name: 'Adobe Firefly', why: 'Trained on licensed content; integrates with Adobe tools for commercial work.', badge: 'enterprise' },
    ],
  },
  {
    id: 'video',
    icon: Clapperboard,
    name: 'Video Creation',
    blurb: 'Generate or edit video — from short clips and B-roll to avatar-led explainer videos.',
    bestFor: ['Creators', 'Marketers', 'Training teams'],
    note: 'Quality varies widely by use case. Test on a short clip before committing to a large project.',
    tools: [
      { name: 'Runway', why: 'Powerful generative video and editing for creative work.', badge: 'versatile' },
      { name: 'Synthesia', why: 'Avatar-led explainer and training videos from a script — no filming needed.', badge: 'enterprise' },
      { name: 'Descript', why: 'Edit video by editing the transcript — great for talking-head content.' },
    ],
  },
  {
    id: 'audio',
    icon: Mic,
    name: 'Audio & Voice',
    blurb: 'Generate voiceovers, transcribe recordings, and create or clone natural-sounding speech.',
    bestFor: ['Creators', 'Podcasters', 'Training teams'],
    note: 'Voice cloning has clear ethical and consent implications — only clone voices you have permission to use.',
    tools: [
      { name: 'ElevenLabs', why: 'Highly natural voice generation and cloning across many languages.', badge: 'versatile' },
      { name: 'Whisper (OpenAI)', why: 'Accurate, free transcription — strong with accents and noise.', badge: 'free' },
      { name: 'Descript', why: 'Combined transcription, editing, and voice tools in one workflow.' },
    ],
  },
  {
    id: 'presentations',
    icon: Presentation,
    name: 'Presentations',
    blurb: 'Turn ideas or documents into structured, designed slide decks quickly.',
    bestFor: ['Professionals', 'Founders', 'Consultants'],
    note: 'AI decks are a strong starting point but usually need a human pass for narrative flow and polish.',
    tools: [
      { name: 'Gamma', why: 'Generates clean, modern decks from a prompt or outline.', badge: 'versatile' },
      { name: 'Tome', why: 'Narrative-led presentations with built-in visuals.' },
      { name: 'Copilot (PowerPoint)', why: 'Builds decks inside PowerPoint if you live in Microsoft 365.', badge: 'enterprise' },
    ],
  },
  {
    id: 'automation',
    popular: true,
    icon: Zap,
    name: 'Automation',
    blurb: 'Connect apps and automate repetitive multi-step workflows without code.',
    bestFor: ['Operations', 'Founders', 'Professionals'],
    note: 'Start with one simple, high-frequency workflow. Map it fully before automating — automating a broken process just breaks it faster.',
    tools: [
      { name: 'Zapier', why: 'Huge library of app integrations; the easiest place to start.', badge: 'beginner' },
      { name: 'Make', why: 'More visual and flexible for complex, branching workflows.' },
      { name: 'n8n', why: 'Open-source and self-hostable for teams that want control.', badge: 'enterprise' },
    ],
  },
  {
    id: 'data',
    icon: LineChart,
    name: 'Data Analysis',
    blurb: 'Explore datasets, run calculations, find patterns, and produce charts and summaries.',
    bestFor: ['Analysts', 'Professionals', 'Data teams'],
    note: 'Double-check the numbers on anything consequential — verify the logic, not just the final figure.',
    tools: [
      { name: 'ChatGPT (Advanced Data Analysis)', why: 'Runs real code on your uploaded data to compute and chart results.', badge: 'versatile' },
      { name: 'Claude', why: 'Strong at reasoning through data questions and explaining methodology.' },
      { name: 'Julius AI', why: 'Purpose-built conversational data analysis with clean visualisations.' },
    ],
  },
  {
    id: 'agents',
    icon: Bot,
    name: 'AI Agents',
    blurb: 'Let AI carry out multi-step tasks autonomously — researching, deciding, and acting toward a goal.',
    bestFor: ['Developers', 'Operations', 'Enterprise users'],
    note: 'Give agents clear guardrails and human checkpoints. The more autonomy, the more important your limits and oversight.',
    tools: [
      { name: 'Claude (with tools)', why: 'Reliable multi-step reasoning and tool use within defined boundaries.', badge: 'versatile' },
      { name: 'ChatGPT (with actions)', why: 'Connects to external tools to complete tasks end-to-end.' },
      { name: 'Custom (LangGraph / CrewAI)', why: 'Frameworks for building bespoke multi-agent systems.', badge: 'enterprise' },
    ],
  },
  {
    id: 'learning',
    icon: GraduationCap,
    name: 'Learning & Education',
    blurb: 'Explain concepts, tutor a subject, create study materials, and adapt to your level.',
    bestFor: ['Students', 'Beginners', 'Parents', 'Lifelong learners'],
    note: 'Use AI to understand, not just to answer. Ask it to explain its reasoning so you actually learn the concept.',
    tools: [
      { name: 'Claude', why: 'Patient, clear explanations that adapt to your level on request.', badge: 'beginner' },
      { name: 'ChatGPT', why: 'Versatile tutoring across almost any subject.' },
      { name: 'Khanmigo', why: 'Education-specific tutor with guardrails designed for learners.' },
    ],
  },
  {
    id: 'customer-service',
    icon: MessagesSquare,
    name: 'Customer Service',
    blurb: 'Draft responses, triage enquiries, and power support chatbots and help centres.',
    bestFor: ['Operations', 'Founders', 'Enterprise users'],
    note: 'Keep a human in the loop for sensitive or high-value cases. Set clear escalation rules before going live.',
    tools: [
      { name: 'Intercom Fin', why: 'Purpose-built support agent that resolves common queries automatically.', badge: 'enterprise' },
      { name: 'Claude / ChatGPT (via API)', why: 'Flexible foundation for custom support assistants.', badge: 'versatile' },
      { name: 'Zendesk AI', why: 'Fits naturally if you already run Zendesk.' },
    ],
  },
]

// Badge styling map
const BADGES = {
  versatile:  { label: 'Most versatile',  cls: 'bg-blue/15 text-blue-bright border-blue/30' },
  free:       { label: 'Best free option', cls: 'bg-success/15 text-success border-success/30' },
  enterprise: { label: 'Enterprise-grade', cls: 'bg-purple-400/15 text-purple-300 border-purple-400/30' },
  beginner:   { label: 'Great for beginners', cls: 'bg-amber-400/15 text-amber-300 border-amber-400/30' },
}


export default function ChooseAI() {
  const [activeId, setActiveId] = useState(null)
  const [hoverId, setHoverId] = useState(null)
  const active = CATEGORIES.find(c => c.id === activeId)

  return (
    <>
      <Head>
        <title>Choose the Right AI — LeO AI</title>
        <meta name="description" content="An interactive map of the AI landscape. Explore capabilities, see which tools fit your task, and understand what each is genuinely good at — without the overwhelm." />
      </Head>

      <Nav />

      <main className="relative min-h-screen overflow-hidden">
        {/* ── Ambient background: grid + radial glow ── */}
        <div className="capmap-bg" aria-hidden="true" />
        <div className="capmap-glow" aria-hidden="true" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-24 pb-24">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-2">
            {/* Brand mark — a minimal AI-inspired geometric node-cluster glyph */}
            <div className="flex justify-center mb-5">
              <span className="capmap-brandmark relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-navy-mid border border-blue/30">
                <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <circle cx="16" cy="16" r="4" fill="var(--blue)" />
                  <circle cx="16" cy="5" r="2.5" fill="var(--blue)" fillOpacity="0.85" />
                  <circle cx="26" cy="22" r="2.5" fill="var(--blue)" fillOpacity="0.85" />
                  <circle cx="6" cy="22" r="2.5" fill="var(--blue)" fillOpacity="0.85" />
                  <path d="M16 16 L16 5 M16 16 L26 22 M16 16 L6 22" stroke="var(--blue)" strokeWidth="1.5" strokeOpacity="0.5" />
                </svg>
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-blue-bright font-display font-bold mb-3">
              AI Capability Map
            </p>
            <h1 className="font-display font-black text-3xl sm:text-5xl leading-tight mb-3">
              What are you trying to achieve?
            </h1>
            <p className="text-muted max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Explore the branches of the AI landscape. Each leads to the tools worth knowing — and what each one is genuinely good at.
            </p>
          </div>

          <CapabilityMap
            categories={CATEGORIES}
            hoverId={hoverId}
            setHoverId={setHoverId}
            activeId={activeId}
            onSelect={setActiveId}
          />

          <p className="text-center text-xs text-muted max-w-lg mx-auto leading-relaxed mt-6">
            Different AI tools serve different purposes. The goal isn&rsquo;t one winner — it&rsquo;s matching the right capability to the task in front of you.
          </p>
        </div>

        {/* ── Detail panel — animates in OVER the map ── */}
        {active && (
          <DetailPanel
            category={active}
            onClose={() => setActiveId(null)}
            onJump={(id) => setActiveId(id)}
            allCategories={CATEGORIES}
          />
        )}
      </main>

      <Footer variant="dark" />
    </>
  )
}

// ── Radial geometry helper ────────────────────────────────────────────────────
// Positions N nodes evenly around a circle, starting at the top.
function radialPositions(n, cx, cy, r) {
  const out = []
  for (let i = 0; i < n; i++) {
    const angle = (-90 + (360 / n) * i) * (Math.PI / 180)
    out.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), angle })
  }
  return out
}

// ── CapabilityMap ──────────────────────────────────────────────────────────────
function CapabilityMap({ categories, hoverId, setHoverId, activeId, onSelect }) {
  // Desktop SVG canvas geometry
  const W = 980, H = 720
  const cx = W / 2, cy = H / 2
  const R = 268                    // node ring radius
  const pos = radialPositions(categories.length, cx, cy, R)

  return (
    <>
      {/* ───────── Desktop / tablet: radial map ───────── */}
      <div className="hidden md:block relative mx-auto" style={{ maxWidth: W }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible" role="img" aria-label="AI capability map">
          <defs>
            <radialGradient id="rootGrad" cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#3D8BFF" />
              <stop offset="100%" stopColor="#1A6EFF" />
            </radialGradient>
            <radialGradient id="rootGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="connGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--blue)" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          {/* Soft glow halo behind the root (ambient depth, not a hard object) */}
          <circle cx={cx} cy={cy} r="92" fill="url(#rootGlow)" />

          {/* Connectors — curved path from just outside the root node → node.
              A connector ILLUMINATES when its node is selected: it brightens,
              thickens, and re-traces from root outward — energising that route. */}
          {pos.map((p, i) => {
            const c = categories[i]
            const isHot = hoverId === c.id
            const isActive = activeId === c.id
            // start the line on the rim of the root node, not dead centre
            const rim = 58
            const dx = p.x - cx, dy = p.y - cy
            const dist = Math.hypot(dx, dy)
            const sx = cx + (dx / dist) * rim
            const sy = cy + (dy / dist) * rim
            const mx = (sx + p.x) / 2 + (p.x - cx) * 0.12
            const my = (sy + p.y) / 2 + (p.y - cy) * 0.12
            const d = `M ${sx} ${sy} Q ${mx} ${my} ${p.x} ${p.y}`
            // dim non-active routes when something is selected
            const dimmed = activeId && !isActive
            return (
              <path
                key={c.id}
                d={d}
                stroke={isActive || isHot ? 'var(--blue)' : 'url(#connGrad)'}
                strokeWidth={isActive ? 3.5 : isHot ? 3 : 2}
                strokeOpacity={isActive ? 1 : isHot ? 0.9 : dimmed ? 0.18 : 0.5}
                fill="none"
                strokeLinecap="round"
                className={`capmap-conn ${isActive ? 'capmap-conn-active' : ''}`}
                style={{ animationDelay: `${i * 70}ms` }}
              />
            )
          })}

          {/* Root node — solid, welcoming blue focal point (no animation) */}
          <circle cx={cx} cy={cy} r="52" fill="url(#rootGrad)" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>

        {/* Root label (HTML over SVG centre) */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
          style={{ left: '50%', top: '50%', width: 110 }}
        >
          <div className="text-white font-display font-black text-sm leading-tight tracking-wide">START<br/>HERE</div>
        </div>

        {/* Node buttons positioned over SVG anchors */}
        <div className="absolute inset-0">
          {pos.map((p, i) => {
            const c = categories[i]
            const IconCmp = c.icon
            const leftPct = (p.x / W) * 100
            const topPct = (p.y / H) * 100
            const dimmed = hoverId && hoverId !== c.id
            const isActive = activeId === c.id
            return (
              <button
                key={c.id}
                onMouseEnter={() => setHoverId(c.id)}
                onMouseLeave={() => setHoverId(null)}
                onFocus={() => setHoverId(c.id)}
                onClick={() => onSelect(c.id)}
                className={`capmap-node group absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 transition-all duration-300 ${dimmed ? 'opacity-45' : 'opacity-100'}`}
                style={{ left: `${leftPct}%`, top: `${topPct}%`, animationDelay: `${i * 70 + 250}ms` }}
              >
                <span className={`capmap-orbit relative w-14 h-14 rounded-full bg-navy-mid border flex items-center justify-center text-blue-bright shadow-lg transition-all duration-300 group-hover:-translate-y-0.5 ${isActive ? 'capmap-orbit-active border-blue/70 shadow-[0_0_24px_rgba(26,110,255,0.4)]' : 'border-white/12 group-hover:border-blue/60 group-hover:shadow-[0_0_24px_rgba(26,110,255,0.35)]'}`}
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <IconCmp size={24} strokeWidth={1.75} />
                </span>
                <span className="font-display font-bold text-xs text-white/90 whitespace-nowrap max-w-[120px] truncate">{c.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Legend (desktop) */}
      <div className="hidden md:flex items-center justify-center gap-5 mt-4 text-[11px] text-muted">
        <span className="flex items-center gap-1.5"><Sparkles size={13} className="text-blue-bright" /> Tap any branch to explore</span>
      </div>

      {/* ───────── Mobile: vertical traced pathway ───────── */}
      <div className="md:hidden relative pl-7 mt-6">
        {/* root marker */}
        <div className="relative mb-4">
          <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-blue flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-white" />
          </div>
          <div className="text-xs font-display font-bold text-blue-bright uppercase tracking-wider">Start here</div>
        </div>
        {/* trunk */}
        <div className="absolute left-[9px] top-7 bottom-3 w-[2px] bg-gradient-to-b from-blue/60 via-blue/35 to-blue/15 rounded-full" />
        <div className="space-y-2.5">
          {categories.map((c, i) => {
            const IconCmp = c.icon
            return (
              <div key={c.id} className="relative">
                <div className="absolute -left-[18px] top-1/2 w-4 h-[2px] bg-blue/35" />
                <button
                  onClick={() => onSelect(c.id)}
                  className="capmap-node group w-full text-left flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 bg-navy-mid/60 hover:border-blue/40 hover:bg-blue/[0.06] transition-all duration-200"
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  <span className="relative flex-shrink-0 w-10 h-10 rounded-full bg-blue/12 border border-blue/20 flex items-center justify-center text-blue-bright">
                    <IconCmp size={20} strokeWidth={1.75} />
                  </span>
                  <span className="font-display font-bold text-sm flex-1">{c.name}</span>
                  <span className="text-muted text-xs">→</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

// ── DetailPanel — slides in over the map ────────────────────────────────────────
function DetailPanel({ category, onClose, onJump, allCategories }) {
  const IconCmp = category.icon
  return (
    <div className="fixed inset-0 z-[90] flex items-stretch sm:items-center justify-end sm:justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-navy/70 backdrop-blur-sm capmap-backdrop" onClick={onClose} aria-hidden="true" />
      {/* panel */}
      <div
        role="dialog"
        aria-label={`${category.name} details`}
        className="capmap-panel relative w-full sm:max-w-lg sm:rounded-3xl sm:my-6 bg-navy-mid border-l sm:border border-white/12 shadow-2xl overflow-y-auto"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue/12 border border-blue/25 flex items-center justify-center text-blue-bright">
                <IconCmp size={28} strokeWidth={1.75} />
              </span>
              <h2 className="font-display font-black text-2xl leading-tight">{category.name}</h2>
            </div>
            <button onClick={onClose} className="flex-shrink-0 w-9 h-9 rounded-full border border-white/12 text-muted hover:text-white hover:border-white/30 flex items-center justify-center transition-colors" aria-label="Close">
              <X size={18} />
            </button>
          </div>

          <p className="text-muted text-sm leading-relaxed mb-5">{category.blurb}</p>

          {/* Best-for tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {category.bestFor.map(b => (
              <span key={b} className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white/80">{b}</span>
            ))}
          </div>

          {/* Tools */}
          <div className="text-[10px] font-display font-bold text-muted uppercase tracking-wider mb-3">Tools worth knowing</div>
          <div className="space-y-3 mb-6">
            {category.tools.map(tool => {
              const badge = tool.badge ? BADGES[tool.badge] : null
              return (
                <div key={tool.name} className="p-4 rounded-2xl border border-white/8 bg-white/[0.02]">
                  <div className="flex items-start justify-between gap-3 mb-1.5 flex-wrap">
                    <h3 className="font-display font-bold text-sm">{tool.name}</h3>
                    {badge && (
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-display font-bold ${badge.cls}`}>{badge.label}</span>
                    )}
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed">{tool.why}</p>
                </div>
              )
            })}
          </div>

          {/* Worth knowing */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-400/[0.06] border border-amber-400/25 mb-6">
            <span className="text-lg mt-0.5">💡</span>
            <div>
              <div className="text-[10px] font-display font-bold text-amber-300 uppercase tracking-wider mb-1">Worth knowing</div>
              <p className="text-sm text-white/80 leading-relaxed">{category.note}</p>
            </div>
          </div>

          {/* Jump to another branch */}
          <div className="border-t border-white/8 pt-5">
            <div className="text-[10px] font-display font-bold text-muted uppercase tracking-wider mb-3">Explore another branch</div>
            <div className="flex flex-wrap gap-2">
              {allCategories.filter(c => c.id !== category.id).slice(0, 6).map(c => {
                const CIcon = c.icon
                return (
                  <button key={c.id} onClick={() => onJump(c.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/8 hover:border-blue/40 hover:bg-blue/[0.06] text-xs text-white/80 transition-all">
                    <CIcon size={13} strokeWidth={1.75} /> {c.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
