// pages/choose-ai.js — "Choose the Right AI" capability explorer
//
// A calm, progressive drill-down that helps users pick the right *category*
// of AI tool for their task — reducing tool paralysis without becoming an
// exhaustive comparison database.
//
// UX model:
//   Level 1: central prompt "What are you trying to achieve?" + category grid
//   Level 2: tap a category → detail view (what it's for, tools, why, best-for, note)
//
// The category data lives in a single CATEGORIES array so future expansion
// (prompts, pricing tiers, tutorials, beginner/advanced paths) is a matter of
// adding fields — no structural rework needed.
//
// No heavy libraries. Pure React state + CSS transitions. Mobile-first.

import Head from 'next/head'
import { useState } from 'react'
import Footer from '../components/Footer'
import { Nav, Reveal } from '../components/ui'
import { Search, PenLine, Code2, Palette, Clapperboard, Mic, Presentation, Zap, LineChart, Bot, GraduationCap, MessagesSquare } from 'lucide-react'

// ── Category data ────────────────────────────────────────────────────────────
// Each category is self-contained. `tools` is an ordered list; tag each tool
// with an optional badge ('versatile' | 'free' | 'enterprise' | 'beginner').
const CATEGORIES = [
  {
    id: 'research',
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
  const active = CATEGORIES.find(c => c.id === activeId)

  return (
    <>
      <Head>
        <title>Choose the Right AI — LeO AI</title>
        <meta name="description" content="A calm, practical guide to choosing the right AI tool for your task. Explore categories of AI capability and find what fits — without the overwhelm." />
      </Head>

      <Nav />

      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">

          {/* ── Level 1: prompt + interactive tree ── */}
          {!active && (
            <Reveal>
              <div className="text-center mb-10">
                <p className="text-xs uppercase tracking-[0.18em] text-blue-bright font-display font-bold mb-4">
                  AI Capability Explorer
                </p>
                <h1 className="font-display font-black text-3xl sm:text-5xl mb-4 leading-tight">
                  What are you trying to achieve?
                </h1>
                <p className="text-muted max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                  Each branch is a different kind of AI. Follow one to see the tools worth knowing and what each is genuinely good at — no hype, no overwhelm.
                </p>
              </div>

              <CapabilityTree
                categories={CATEGORIES}
                onSelect={(id) => { setActiveId(id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              />

              <p className="text-center text-xs text-muted mt-10 max-w-lg mx-auto leading-relaxed">
                Different AI tools serve different purposes. The goal isn&rsquo;t to find one winner — it&rsquo;s to match the right capability to the task in front of you.
              </p>
            </Reveal>
          )}

          {/* ── Level 2: category detail ── */}
          {active && (
            <Reveal key={active.id}>
              <button
                onClick={() => setActiveId(null)}
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-white font-display font-bold mb-8 transition-colors"
              >
                ← All capabilities
              </button>

              <div className="flex items-start gap-4 mb-6">
                <span className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue/12 border border-blue/25 flex items-center justify-center text-blue-bright">
                  <active.icon size={30} strokeWidth={1.75} />
                </span>
                <div>
                  <h1 className="font-display font-black text-3xl sm:text-4xl leading-tight mb-2">{active.name}</h1>
                  <p className="text-muted text-base leading-relaxed max-w-2xl">{active.blurb}</p>
                </div>
              </div>

              {/* Best for */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="text-xs text-muted font-display font-bold uppercase tracking-wider mr-1 self-center">Best for:</span>
                {active.bestFor.map(b => (
                  <span key={b} className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white/80">{b}</span>
                ))}
              </div>

              {/* Tools */}
              <div className="space-y-3 mb-8">
                {active.tools.map(tool => {
                  const badge = tool.badge ? BADGES[tool.badge] : null
                  return (
                    <div key={tool.name} className="p-5 rounded-2xl border border-white/8 bg-white/[0.02]">
                      <div className="flex items-start justify-between gap-3 mb-1.5 flex-wrap">
                        <h3 className="font-display font-bold text-base">{tool.name}</h3>
                        {badge && (
                          <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-display font-bold ${badge.cls}`}>
                            {badge.label}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/75 leading-relaxed">{tool.why}</p>
                    </div>
                  )
                })}
              </div>

              {/* Important note */}
              <div className="flex items-start gap-3 p-5 rounded-2xl bg-amber-400/[0.06] border border-amber-400/25 mb-10">
                <span className="text-xl mt-0.5">💡</span>
                <div>
                  <div className="text-[10px] font-display font-bold text-amber-300 uppercase tracking-wider mb-1">Worth knowing</div>
                  <p className="text-sm text-white/80 leading-relaxed">{active.note}</p>
                </div>
              </div>

              {/* Cross-nav to other categories */}
              <div className="border-t border-white/8 pt-8">
                <p className="text-xs text-muted font-display font-bold uppercase tracking-wider mb-4">Explore another capability</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.filter(c => c.id !== active.id).map(c => (
                    <button
                      key={c.id}
                      onClick={() => { setActiveId(c.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/8 hover:border-blue/40 hover:bg-blue/[0.06] text-xs text-white/80 transition-all"
                    >
                      <c.icon size={14} strokeWidth={1.75} /> {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

        </div>
      </main>

      <Footer />
    </>
  )
}

// ── CapabilityTree ───────────────────────────────────────────────────────────
// Renders the 12 capabilities as an interactive tree.
//   • Desktop/tablet (sm+): an SVG tree — central trunk, branches curving out
//     to nodes alternating left/right, growing upward. Branches animate in.
//   • Mobile: a vertical "vine" — the trunk runs top-to-bottom with leaf nodes
//     alternating left/right off it. Readable, tappable, no horizontal scroll.
// Both layouts are driven by the same `categories` array.
function CapabilityTree({ categories, onSelect }) {
  // Split categories into left/right columns for the desktop tree.
  // Alternate so the tree feels balanced.
  const positioned = categories.map((c, i) => ({
    ...c,
    side: i % 2 === 0 ? 'left' : 'right',
    row: Math.floor(i / 2),
  }))
  const rows = Math.ceil(categories.length / 2)

  // SVG geometry (desktop)
  const ROW_H = 96            // vertical spacing between branch rows
  const TOP_PAD = 60          // space above first branch (canopy)
  const BOT_PAD = 70          // space below last branch (roots/base)
  const H = TOP_PAD + rows * ROW_H + BOT_PAD
  const W = 900
  const cx = W / 2            // trunk centre x
  const nodeOffsetX = 250     // how far nodes sit from the trunk
  const branchTopY = (row) => TOP_PAD + row * ROW_H + 30

  return (
    <div className="relative">
      {/* ───────── Desktop / tablet: SVG tree ───────── */}
      <div className="hidden sm:block relative mx-auto" style={{ maxWidth: W }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible" role="img" aria-label="AI capability tree">
          <defs>
            <linearGradient id="trunkGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--blue)" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Trunk */}
          <path
            d={`M ${cx} ${H - BOT_PAD + 40} C ${cx} ${H * 0.6}, ${cx} ${H * 0.4}, ${cx} ${TOP_PAD - 10}`}
            stroke="url(#trunkGrad)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />

          {/* Branches — a curved path from trunk out to each node anchor */}
          {positioned.map((c, i) => {
            const y = branchTopY(c.row)
            const dir = c.side === 'left' ? -1 : 1
            const endX = cx + dir * nodeOffsetX
            const startY = y + 18
            // Cubic curve for an organic branch
            const d = `M ${cx} ${startY} C ${cx + dir * 80} ${startY - 6}, ${endX - dir * 70} ${y - 4}, ${endX} ${y}`
            return (
              <path
                key={c.id}
                d={d}
                stroke="var(--blue)"
                strokeOpacity="0.4"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                className="capability-branch"
                style={{ animationDelay: `${i * 90}ms` }}
              />
            )
          })}
        </svg>

        {/* Node buttons positioned over the SVG anchors */}
        <div className="absolute inset-0">
          {positioned.map((c, i) => {
            const y = branchTopY(c.row)
            const dir = c.side === 'left' ? -1 : 1
            const endX = cx + dir * nodeOffsetX
            const leftPct = (endX / W) * 100
            const topPct = (y / H) * 100
            return (
              <button
                key={c.id}
                onClick={() => onSelect(c.id)}
                className="capability-node group absolute -translate-y-1/2 flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-blue/50 hover:bg-blue/[0.08] transition-all duration-200 whitespace-nowrap"
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  transform: `translate(${c.side === 'left' ? '-100%' : '0'}, -50%)`,
                  animationDelay: `${i * 90 + 200}ms`,
                }}
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue/12 border border-blue/20 flex items-center justify-center text-blue-bright transition-transform duration-200 group-hover:scale-110">
                  <c.icon size={17} strokeWidth={1.75} />
                </span>
                <span className="font-display font-bold text-sm">{c.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ───────── Mobile: vertical vine ───────── */}
      <div className="sm:hidden relative pl-6">
        {/* vertical trunk line */}
        <div className="absolute left-[10px] top-2 bottom-2 w-[3px] bg-gradient-to-b from-blue/60 via-blue/40 to-blue/20 rounded-full" />
        <div className="space-y-3">
          {categories.map((c, i) => (
            <div key={c.id} className="relative">
              {/* little branch stub connecting to the trunk */}
              <div className="absolute -left-[14px] top-1/2 w-3.5 h-[2px] bg-blue/40" />
              <button
                onClick={() => onSelect(c.id)}
                className="capability-node group w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-blue/40 hover:bg-blue/[0.06] transition-all duration-200"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue/12 border border-blue/20 flex items-center justify-center text-blue-bright transition-transform duration-200 group-hover:scale-110">
                  <c.icon size={20} strokeWidth={1.75} />
                </span>
                <span className="font-display font-bold text-sm">{c.name}</span>
                <span className="ml-auto text-muted text-xs">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
