import { useState } from 'react'

const BLOCKS = {
  frontend: {
    label: 'Centrally Driven · Consistent Frontend',
    color: 'success',
    items: [
      { id: 'exp', name: 'Experience Consistency', desc: 'Ensures users get a consistent AI experience regardless of which model or tool sits behind the scenes.', why: 'Prevents confusion and builds user trust across different AI touchpoints.', example: 'A customer interacts with AI via chat, email, and phone — all feel like the same service.' },
      { id: 'int', name: 'Interaction Design', desc: 'Defines how users interact with AI — prompts, forms, chat, workflows, and guided experiences.', why: 'Good interaction design reduces mistakes and directly improves adoption rates.', example: 'Instead of a blank prompt box, users get guided forms that structure their request.' },
      { id: 'trust', name: 'Transparency & Trust', desc: 'Explains what AI is doing, where answers come from, and when human review is needed.', why: 'Trust is essential when AI supports business decisions — opacity kills adoption.', example: 'AI responses show source citations and confidence levels.' },
      { id: 'pers', name: 'Personalise', desc: 'Tailors AI responses based on user role, context, preferences, or workflow stage.', why: 'Generic AI is ignored. Personalised AI becomes indispensable.', example: 'A finance user sees cost-focused insights; a sales user sees pipeline data.' },
      { id: 'guard', name: 'Guidance & Guardrails', desc: 'Provides safe boundaries, instructions, policies, and limits for AI usage.', why: 'Prevents misuse, reduces operational risk, and protects the organisation.', example: 'AI refuses to process requests containing personal health data without approval.' },
      { id: 'perf', name: 'Performance Expectations', desc: 'Sets clear expectations around speed, accuracy, limitations, and when AI may be wrong.', why: 'Prevents over-reliance and manages the gap between expectation and reality.', example: '"This summary is AI-generated. Accuracy is typically 92%. Please verify key figures."' },
      { id: 'feed', name: 'Feedback & Adoption', desc: 'Captures user feedback and usage signals to improve the AI experience over time.', why: 'AI that does not improve based on usage becomes stale and abandoned.', example: 'Thumbs up/down on every AI response feeds into monthly quality reviews.' },
      { id: 'exc', name: 'Exception Management', desc: 'Defines what happens when AI is uncertain, wrong, or unable to complete the task.', why: 'Good exception handling prevents silent failures — the most dangerous AI outcome.', example: 'When confidence drops below 70%, the request routes to a human queue.' },
      { id: 'ops', name: 'Operate Model', desc: 'Defines roles, responsibilities, support processes, governance, and ownership.', why: 'AI needs an operating model, not just a tool — someone must own it after launch.', example: 'Named owner, weekly review, incident response plan, escalation path.' },
    ]
  },
  providers: {
    label: 'AI Providers & Models',
    color: 'blue',
    items: [
      { id: 'now', name: 'ServiceNow Now Assist', desc: 'Enterprise AI embedded into the ServiceNow workflow platform for IT, HR, and customer service.', why: 'Platform AI accelerates adoption where workflows already exist.', example: 'IT service desk auto-classifies and routes tickets using embedded AI.' },
      { id: 'amazon', name: 'Amazon Q', desc: 'AWS generative AI assistant for business intelligence, code, and enterprise knowledge.', why: 'Connects AI to organisational data, applications, and enterprise workflows.', example: 'Business analysts query sales data conversationally; developers get code suggestions grounded in internal repos.' },
      { id: 'copilot', name: 'Microsoft Copilot', desc: 'Productivity AI across documents, email, meetings, and office workflows.', why: 'Often the fastest entry point for everyday AI adoption.', example: 'Meeting notes, email drafts, and document summaries generated in Microsoft 365.' },
      { id: 'watson', name: 'IBM Watsonx', desc: 'IBM\'s enterprise AI and data platform for building, deploying, and governing AI models.', why: 'Provides governance, explainability, and compliance tooling for regulated industries.', example: 'Financial services firm uses Watsonx for credit decisioning with full audit trail and regulatory explainability.' },
      { id: 'inhouse', name: 'In-House AI', desc: 'Custom AI built or configured internally for organisation-specific needs.', why: 'Useful when privacy, control, specialisation, or integration matters.', example: 'Custom claims processing model trained on proprietary data.' },
    ]
  },
  backend: {
    label: 'Centrally Driven · Consistent Backend',
    color: 'blue',
    items: [
      { id: 'know', name: 'Knowledge', desc: 'Curated organisational knowledge used by AI to provide accurate and relevant answers.', why: 'AI is only as good as the knowledge it can access — garbage in, garbage out.', example: 'Policy documents, FAQs, and procedures indexed for AI retrieval.' },
      { id: 'prompts', name: 'Prompts', desc: 'Structured instructions that guide AI behaviour and output format.', why: 'Prompts shape consistency, quality, and reliability of every AI response.', example: 'Versioned prompt library with tested templates for each use case.' },
      { id: 'ethics', name: 'Ethics, Compliance & Responsible AI', desc: 'Policies and controls ensuring AI is safe, fair, compliant, and accountable.', why: 'Non-negotiable for trust, regulation, and risk management.', example: 'Bias testing before deployment, explainability for regulated decisions.' },
      { id: 'data', name: 'Dataset incl. Training', desc: 'Data used to train, tune, test, or ground AI systems.', why: 'Poor data creates poor AI outcomes — data quality is the foundation.', example: '3 years of labelled customer emails, cleaned and standardised.' },
      { id: 'orch', name: 'Orchestrator', desc: 'The coordination layer that decides which model, tool, or workflow should handle each request.', why: 'Standardise orchestration, not one model — the key to cost control and flexibility.', example: 'Simple queries route to GPT-4o-mini; complex analysis routes to Claude Sonnet.' },
      { id: 'cmd', name: 'Command Centre', desc: 'Central monitoring and management for AI performance, incidents, governance, and adoption.', why: 'AI needs operational oversight after launch — not set-and-forget.', example: 'Dashboard showing accuracy, cost, volume, and incidents across all AI systems.' },
      { id: 'ctx', name: 'Context & Memory', desc: 'Information AI uses to understand the current user, situation, history, and workflow.', why: 'Better context produces better outcomes — and reduces hallucination.', example: 'Customer history, previous interactions, and account tier passed to AI.' },
      { id: 'strat', name: 'Model Strategy', desc: 'The plan for choosing which models to use, when, and why.', why: 'Controls cost, performance, risk, and scalability across the AI portfolio.', example: 'Quarterly model review: benchmark new models against current production performance.' },
      { id: 'mon', name: 'Monitoring & Feedback Loop', desc: 'Continuous measurement of quality, usage, errors, risk, and user feedback.', why: 'AI must be continuously improved — unmonitored AI degrades silently.', example: 'Weekly automated accuracy report with drift detection alerts.' },
    ]
  },
  controls: {
    label: 'Operating Controls',
    color: 'purple',
    items: [
      { id: 'comm', name: 'Commercial Model', desc: 'Licensing, token cost management, vendor contracts, scaling economics, and budget governance across AI systems.', why: 'Without commercial governance, AI costs scale unpredictably with usage — the most common budget overrun.', example: 'Monthly token cost review per use case, vendor contract benchmarking, and automated budget alerts at 80% threshold.' },
      { id: 'perfeff', name: 'Performance & Efficiency', desc: 'Latency SLAs, throughput monitoring, operational cost per transaction, response quality scoring, and resource utilisation.', why: 'AI systems degrade without measurement. Performance monitoring prevents silent quality erosion.', example: 'Customer chat: under 2s latency. Batch processing: under $0.005/transaction. Accuracy: above 91% weekly average.' },
      { id: 'crit', name: 'Critical Functions', desc: 'High-risk workflows requiring enhanced governance: mandatory human review, fallback procedures, audit trails, and regulatory compliance controls.', why: 'A misrouted email is recoverable. A wrong financial decision is not. Risk level determines control level.', example: 'Financial approvals over $10K: human review mandatory. Medical triage: AI assists but clinician decides. Legal: AI drafts, lawyer approves.' },
    ]
  }
}

const COLORS = {
  success: { bg: 'bg-success/10', border: 'border-success/30', text: 'text-success', headerBg: 'bg-success/15', activeBg: 'bg-success/20' },
  blue: { bg: 'bg-blue/10', border: 'border-blue/30', text: 'text-blue-bright', headerBg: 'bg-blue/15', activeBg: 'bg-blue/20' },
  purple: { bg: 'bg-purple-400/10', border: 'border-purple-400/30', text: 'text-purple-400', headerBg: 'bg-purple-400/15', activeBg: 'bg-purple-400/20' },
}

export default function MultimodalDiagram() {
  const [active, setActive] = useState(null)
  const [activeZone, setActiveZone] = useState(null)

  const activeItem = active
    ? Object.values(BLOCKS).flatMap(z => z.items).find(i => i.id === active)
    : null

  return (
    <div className="mt-6 mb-8">
      <p className="text-xs text-gray-500 dark:text-white/30 mb-4 font-display uppercase tracking-wider text-center">
        Tap any block to learn more
      </p>

      {/* Main 3-column layout — stacks on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 mb-4">

        {/* Frontend */}
        <Zone zone={BLOCKS.frontend} active={active} setActive={setActive} setActiveZone={setActiveZone} />

        {/* Centre — Providers */}
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="text-[10px] font-display font-bold text-gray-500 dark:text-white/30 uppercase tracking-wider mb-1 text-center">
            AI Providers
          </div>
          {BLOCKS.providers.items.map(item => (
            <button
              key={item.id}
              onClick={() => { setActive(active === item.id ? null : item.id); setActiveZone('providers'); }}
              className={`w-full max-w-[180px] px-3 py-2 rounded-lg border text-xs font-display font-bold text-center transition-all ${
                active === item.id
                  ? 'border-blue/50 bg-blue/20 text-blue-bright scale-105'
                  : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] text-gray-700 dark:text-white/60 hover:border-blue/30'
              }`}
            >
              {item.name}
            </button>
          ))}
          <div className="text-center mt-1">
            <div className="text-[10px] text-gray-400 dark:text-white/20">↕</div>
            <div className="text-[10px] text-gray-400 dark:text-white/20 font-display">Model Layer</div>
          </div>
        </div>

        {/* Backend */}
        <Zone zone={BLOCKS.backend} active={active} setActive={setActive} setActiveZone={setActiveZone} />
      </div>

      {/* Controls — full width */}
      <div className="mb-4">
        <div className={`rounded-xl border ${COLORS.purple.border} p-3`}>
          <div className={`text-[10px] font-display font-bold ${COLORS.purple.text} uppercase tracking-wider mb-2 text-center`}>
            {BLOCKS.controls.label}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {BLOCKS.controls.items.map(item => (
              <button
                key={item.id}
                onClick={() => { setActive(active === item.id ? null : item.id); setActiveZone('controls'); }}
                className={`px-3 py-2 rounded-lg border text-[11px] font-display font-bold text-center transition-all ${
                  active === item.id
                    ? `${COLORS.purple.activeBg} border-purple-400/50 text-purple-400 scale-105`
                    : `bg-purple-400/5 border-purple-400/15 text-gray-600 dark:text-white/50 hover:border-purple-400/30`
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail card */}
      {activeItem && (
        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02] p-5 transition-all">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h4 className="font-display font-bold text-base text-gray-900 dark:text-white">{activeItem.name}</h4>
            <button onClick={() => setActive(null)} className="text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 text-lg leading-none flex-shrink-0">×</button>
          </div>
          <p className="text-sm text-gray-700 dark:text-white/70 leading-relaxed mb-3">{activeItem.desc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
              <div className="text-[10px] font-display font-bold text-gray-500 dark:text-white/30 uppercase tracking-wider mb-1">Why it matters</div>
              <p className="text-xs text-gray-600 dark:text-white/60 leading-relaxed">{activeItem.why}</p>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
              <div className="text-[10px] font-display font-bold text-gray-500 dark:text-white/30 uppercase tracking-wider mb-1">Example</div>
              <p className="text-xs text-gray-600 dark:text-white/60 leading-relaxed">{activeItem.example}</p>
            </div>
          </div>
        </div>
      )}

      {/* End users label */}
      <div className="text-center mt-4">
        <span className="text-xs text-gray-400 dark:text-white/25 font-display">
          End Users — internal staff, partners, customers
        </span>
      </div>
    </div>
  )
}

function Zone({ zone, active, setActive, setActiveZone }) {
  const colors = COLORS[zone.color]
  return (
    <div className={`rounded-xl border-2 border-dashed ${colors.border} p-3`}>
      <div className={`text-[10px] font-display font-bold ${colors.text} uppercase tracking-wider mb-2 text-center`}>
        {zone.label}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {zone.items.map(item => (
          <button
            key={item.id}
            onClick={() => { setActive(active === item.id ? null : item.id); setActiveZone(zone.color); }}
            className={`px-2 py-2.5 rounded-lg border text-[9px] font-display font-bold text-center leading-tight break-words hyphens-auto transition-all ${
              active === item.id
                ? `${colors.activeBg} ${colors.border} ${colors.text} scale-105 shadow-sm`
                : `${colors.bg} border-transparent text-gray-600 dark:text-white/50 hover:${colors.border}`
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  )
}
