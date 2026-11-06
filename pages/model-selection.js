// pages/model-selection.js — AI Model Selection Framework
import Head from 'next/head'
import Footer from '../components/Footer'
import { useState } from 'react'
import { Nav, Card, SectionLabel, Button, Reveal } from '../components/ui'
import Icon from '../components/Icon'
import Link from 'next/link'

const MODELS = [
  {
    "name": "GPT-6 Astra",
    "provider": "OpenAI",
    "inputUSD": "Check live",
    "outputUSD": "Check live",
    "inputAUD": "Check live",
    "outputAUD": "Check live",
    "speed": "Benchmark",
    "context": "Check docs",
    "privacy": "Verify deployment",
    "best": "Complex reasoning; check access",
    "tier": "frontier"
  },
  {
    "name": "GPT-6.1 Sol",
    "provider": "OpenAI",
    "inputUSD": "Check live",
    "outputUSD": "Check live",
    "inputAUD": "Check live",
    "outputAUD": "Check live",
    "speed": "Benchmark",
    "context": "Check docs",
    "privacy": "Verify deployment",
    "best": "Professional work and reasoning",
    "tier": "frontier"
  },
  {
    "name": "GPT-6 Luna",
    "provider": "OpenAI",
    "inputUSD": "Check live",
    "outputUSD": "Check live",
    "inputAUD": "Check live",
    "outputAUD": "Check live",
    "speed": "Benchmark",
    "context": "Check docs",
    "privacy": "Verify deployment",
    "best": "Cost-sensitive everyday tasks",
    "tier": "efficient"
  },
  {
    "name": "Claude Opus 5.5",
    "provider": "Anthropic",
    "inputUSD": "Check live",
    "outputUSD": "Check live",
    "inputAUD": "Check live",
    "outputAUD": "Check live",
    "speed": "Benchmark",
    "context": "Check docs",
    "privacy": "Verify deployment",
    "best": "Complex coding and knowledge work",
    "tier": "frontier"
  },
  {
    "name": "Claude Sonnet 5.5",
    "provider": "Anthropic",
    "inputUSD": "Check live",
    "outputUSD": "Check live",
    "inputAUD": "Check live",
    "outputAUD": "Check live",
    "speed": "Benchmark",
    "context": "Check docs",
    "privacy": "Verify deployment",
    "best": "Writing, analysis and development",
    "tier": "efficient"
  },
  {
    "name": "Claude Haiku 5.5",
    "provider": "Anthropic",
    "inputUSD": "Check live",
    "outputUSD": "Check live",
    "inputAUD": "Check live",
    "outputAUD": "Check live",
    "speed": "Benchmark",
    "context": "Check docs",
    "privacy": "Verify deployment",
    "best": "High-volume classification and extraction",
    "tier": "efficient"
  },
  {
    "name": "Gemini 4 Argon",
    "provider": "Google",
    "inputUSD": "Check live",
    "outputUSD": "Check live",
    "inputAUD": "Check live",
    "outputAUD": "Check live",
    "speed": "Benchmark",
    "context": "Check docs",
    "privacy": "Verify deployment",
    "best": "Complex reasoning; check features",
    "tier": "frontier"
  },
  {
    "name": "Gemini 3.8 Flash",
    "provider": "Google",
    "inputUSD": "Check live",
    "outputUSD": "Check live",
    "inputAUD": "Check live",
    "outputAUD": "Check live",
    "speed": "Benchmark",
    "context": "Check docs",
    "privacy": "Verify deployment",
    "best": "Fast, high-volume tasks",
    "tier": "efficient"
  },
  {
    "name": "Open-weight models",
    "provider": "Various",
    "inputUSD": "Check live",
    "outputUSD": "Check live",
    "inputAUD": "Check live",
    "outputAUD": "Check live",
    "speed": "Benchmark",
    "context": "Check docs",
    "privacy": "Verify deployment",
    "best": "Self-hosted use cases; check licences",
    "tier": "opensource"
  }
]

const EXAMPLES = [
  {
    "id": "triage",
    "title": "Customer Support Triage",
    "icon": "🎫",
    "task": "Classify 800 support emails/day",
    "input": "300 input tokens/email",
    "volume": "800 calls/day",
    "costs": [
      {
        "model": "Illustrative US$1/M input",
        "daily": "US$0.24",
        "monthly": "US$7.20",
        "annual": "US$87.60"
      },
      {
        "model": "Illustrative US$0.10/M input",
        "daily": "US$0.024",
        "monthly": "US$0.72",
        "annual": "US$8.76"
      }
    ],
    "recommendation": "Benchmark accuracy, safety and cost",
    "reasoning": "Input-only calculation, assuming 30-day months and 365-day years. Output tokens, retries, caching and infrastructure are additional. Test on representative emails.",
    "saving": "Illustrative input-cost difference; not an observed customer saving"
  },
  {
    "id": "report",
    "title": "Executive Report Generation",
    "icon": "📊",
    "task": "Draft a weekly report from several sources",
    "input": "8,000 input tokens/report",
    "volume": "1 report/week",
    "costs": [
      {
        "model": "Illustrative US$1/M input",
        "daily": "~US$0.001",
        "monthly": "~US$0.03",
        "annual": "~US$0.42"
      },
      {
        "model": "Illustrative US$0.10/M input",
        "daily": "<US$0.001",
        "monthly": "<US$0.01",
        "annual": "~US$0.04"
      }
    ],
    "recommendation": "Prioritise evidence quality and review effort",
    "reasoning": "Input-only illustration. Output tokens and staff review may dominate total cost. Test factual accuracy and citations.",
    "saving": "No ROI claim without measuring review time and output cost"
  },
  {
    "id": "rag",
    "title": "Document Archive Search (RAG)",
    "icon": "🗄️",
    "task": "Answer questions over a document archive",
    "input": "5,000 input tokens/query",
    "volume": "200 queries/day",
    "costs": [
      {
        "model": "Illustrative US$1/M input",
        "daily": "US$1.00",
        "monthly": "US$30",
        "annual": "US$365"
      },
      {
        "model": "Illustrative US$0.10/M input",
        "daily": "US$0.10",
        "monthly": "US$3",
        "annual": "US$36.50"
      }
    ],
    "recommendation": "Test retrieval and answer grounding",
    "reasoning": "Input-only illustration. Embeddings, storage, output and human verification are additional costs.",
    "saving": "Input cost is only one part of total RAG cost"
  },
  {
    "id": "meeting",
    "title": "Meeting Transcription + Action Items",
    "icon": "🎙️",
    "task": "Transcribe meetings and draft action items",
    "input": "Audio plus extracted text",
    "volume": "20 meetings/day",
    "costs": [
      {
        "model": "Audio transcription",
        "daily": "Varies",
        "monthly": "Varies",
        "annual": "Varies"
      },
      {
        "model": "Text extraction",
        "daily": "Varies",
        "monthly": "Varies",
        "annual": "Varies"
      }
    ],
    "recommendation": "Price audio and text separately",
    "reasoning": "Audio duration, transcription accuracy, generated text and human correction determine cost. Obtain consent and check privacy.",
    "saving": "No assumed labour saving or guaranteed return"
  }
]

const DECISION_STEPS = [
  {
    step: 1, title: 'What is your input type?',
    options: [
      { label: 'Text only',              sub: 'Emails, documents, tickets, reports' },
      { label: 'Structured data',        sub: 'Tables, databases, CSV, JSON' },
      { label: 'Images / visual docs',   sub: 'PDFs with images, photos, forms' },
      { label: 'Audio',                  sub: 'Calls, meetings, voice messages' },
      { label: 'Multiple input types',   sub: 'Combination of the above' },
    ],
  },
  {
    step: 2, title: 'What is the task type?',
    options: [
      { label: 'Summarise',    sub: 'Condense long content into shorter form' },
      { label: 'Classify',     sub: 'Categorise into predefined groups' },
      { label: 'Generate',     sub: 'Create new content from a brief or data' },
      { label: 'Extract',      sub: 'Pull specific fields from unstructured text' },
      { label: 'Search / Q&A', sub: 'Find answers across documents' },
      { label: 'Reason',       sub: 'Complex multi-step analysis or decisions' },
    ],
  },
  {
    step: 3, title: 'What are your output requirements?',
    options: [
      { label: 'Accuracy critical',   sub: 'Errors have significant consequences' },
      { label: 'Speed critical',      sub: 'Real-time response needed' },
      { label: 'Cost critical',       sub: 'High volume, budget constrained' },
      { label: 'Privacy critical',    sub: 'Data must not leave your region' },
      { label: 'Format controlled',   sub: 'Specific JSON or structured output needed' },
    ],
  },
]

export default function ModelSelection() {
  const [activeExample, setActiveExample] = useState(0)

  const [filterTier, setFilterTier]       = useState('all')

  const filteredModels = MODELS.filter(m => filterTier === 'all' || m.tier === filterTier)

  return (
    <>
      <Head>
        <title>AI Model Selection Guide — Le On AI</title>
        <meta name="description" content="How to choose the right AI model for your business. Decision tree, cost comparison, and real-world examples." />
      </Head>
      <Nav />

      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">

          {/* Hero */}
          <div className="text-center mb-16">
            <SectionLabel>Model Selection Framework</SectionLabel>
            <h1 className="font-display font-black text-5xl tracking-tight mb-4">
              Choose the Right AI Model
            </h1>
            <p className="text-muted text-xl max-w-2xl mx-auto mb-6">
              Model capabilities, availability and prices change quickly.
              Compare quality, privacy, latency and total cost on your own tasks.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 text-xs font-display font-bold">
              ⚡ From Module 1 &amp; Module 7 — Le On AI Curriculum
            </div>
          </div>

          {/* Key principle */}
          <Reveal>
            <div className="grid md:grid-cols-3 gap-4 mb-14">
              {[
                { icon:'🎯', title:'Right-size first', desc:'Choose the least costly model that meets quality, safety, privacy and latency requirements. Benchmark before committing.' },
                { icon:'⚡', title:'Standardise orchestration', desc:'Don\'t standardise on one model. Standardise on your orchestration layer and swap models freely.' },
                { icon:'💰', title:'Volume changes everything', desc:'Estimate real usage: input and output tokens, tools, retries, caching and human review.' },
              ].map((p, i) => (
                <Card key={i} className="p-6 text-center">
                  <div className="mb-3 text-blue-bright"><Icon name={p.icon} size={26} /></div>
                  <div className="font-display font-bold text-base mb-2">{p.title}</div>
                  <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
                </Card>
              ))}
            </div>
          </Reveal>

          {/* Decision steps */}
          <Reveal>
            <div className="mb-14">
              <h2 className="font-display font-bold text-3xl mb-2">The Decision Framework</h2>
              <p className="text-muted mb-8">Three questions that determine your model selection.</p>
              <div className="grid md:grid-cols-3 gap-5">
                {DECISION_STEPS.map((step) => (
                  <Card key={step.step} className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue/20 border border-blue/30 flex items-center justify-center font-display font-black text-blue-bright flex-shrink-0">
                        {step.step}
                      </div>
                      <h3 className="font-display font-bold text-sm">{step.title}</h3>
                    </div>
                    <div className="space-y-2">
                      {step.options.map((opt, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                          <div className="text-xs font-display font-bold text-white">{opt.label}</div>
                          <div className="text-[11px] text-muted">{opt.sub}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Output requirements matrix */}
              <Card className="p-6 mt-5">
                <h3 className="font-display font-bold text-base mb-4">Output Requirements → Model Direction</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left p-3 text-muted text-xs font-display uppercase tracking-wider">If your priority is...</th>
                        <th className="text-left p-3 text-muted text-xs font-display uppercase tracking-wider">And volume is...</th>
                        <th className="text-left p-3 text-muted text-xs font-display uppercase tracking-wider">Use this model tier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Accuracy critical + quality matters',           'Any',   '→ Evaluate capable models with domain-specific tests', 'text-blue-bright'],
                        ['High volume + accuracy ≥ 90% verified',        'High',  '→ Benchmark smaller, efficient models', 'text-success'],
                        ['Ultra-long context (>100K tokens)',             'Any',   '→ Check current context limits and retrieval options', 'text-amber-400'],
                        ['Data must not leave Australia',                 'Any',   '→ Verify contractual processing and storage regions', 'text-purple-400'],
                        ['Maximum cost efficiency',                       'High',  '→ Benchmark efficient models and caching', 'text-success'],
                        ['On-premise / no external API',                  'Any',   '→ Evaluate licensed open-weight deployments', 'text-amber-400'],
                        ['European data residency',                       'Any',   '→ Confirm EU-region deployment and data controls', 'text-purple-400'],
                      ].map(([condition, vol, direction, color], i) => (
                        <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                          <td className="p-3 text-sm text-white/80">{condition}</td>
                          <td className="p-3 text-sm text-muted">{vol}</td>
                          <td className={`p-3 text-sm font-display font-bold ${color}`}>{direction}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </Reveal>

          {/* Model comparison table */}
          <Reveal>
            <div className="mb-14">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <div>
                  <h2 className="font-display font-bold text-3xl mb-1">Model Comparison</h2>
                  <p className="text-muted text-sm">Examples reviewed 30 October 2026. Check vendors for current pricing, limits and availability.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">Filter:</span>
                  {[['all','All Models'],['frontier','Frontier'],['efficient','Efficient'],['opensource','Open-weight']].map(([val,label]) => (
                    <button key={val} onClick={() => setFilterTier(val)}
                      className={`px-3 py-1.5 rounded-full text-xs font-display font-bold border transition-all ${filterTier === val ? 'bg-blue border-blue text-white' : 'border-white/10 text-muted hover:border-white/20 hover:text-white'}`}>
                      {label}
                    </button>
                  ))}
                  <span className="text-xs text-muted">Check vendor pricing</span>
                </div>
              </div>

              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/[0.02]">
                        <th className="text-left p-4 text-muted text-xs font-display uppercase tracking-wider">Model</th>
                        <th className="text-left p-4 text-muted text-xs font-display uppercase tracking-wider">Provider</th>
                        <th className="text-right p-4 text-muted text-xs font-display uppercase tracking-wider">Input/1M</th>
                        <th className="text-right p-4 text-muted text-xs font-display uppercase tracking-wider">Output/1M</th>
                        <th className="text-left p-4 text-muted text-xs font-display uppercase tracking-wider">Speed</th>
                        <th className="text-left p-4 text-muted text-xs font-display uppercase tracking-wider">Context</th>
                        <th className="text-left p-4 text-muted text-xs font-display uppercase tracking-wider">Privacy</th>
                        <th className="text-left p-4 text-muted text-xs font-display uppercase tracking-wider">Best for</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredModels.map((m, i) => (
                        <tr key={i} className={`border-b border-white/[0.04] hover:bg-white/[0.02] ${m.tier === 'efficient' ? 'bg-success/[0.02]' : ''}`}>
                          <td className="p-4">
                            <div className="font-display font-bold text-sm text-white">{m.name}</div>
                            <div className={`text-[10px] mt-0.5 font-display font-bold ${m.tier === 'frontier' ? 'text-blue-bright' : m.tier === 'efficient' ? 'text-success' : 'text-amber-400'}`}>
                              {m.tier === 'frontier' ? 'Frontier' : m.tier === 'efficient' ? 'Efficient ✓' : 'Open-weight'}
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted">{m.provider}</td>
                          <td className="p-4 text-sm text-right font-display font-bold text-white">
                            {m.inputUSD}
                          </td>
                          <td className="p-4 text-sm text-right font-display font-bold text-white">
                            {m.outputUSD}
                          </td>
                          <td className="p-4 text-sm text-muted">{m.speed}</td>
                          <td className="p-4 text-sm text-muted">{m.context}</td>
                          <td className="p-4 text-sm text-muted">{m.privacy}</td>
                          <td className="p-4 text-xs text-white/70 max-w-[180px]">{m.best}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 border-t border-white/5 text-xs text-muted">
                  Rates vary by model, region, caching and processing tier. No live prices or FX estimates are shown.
                  <a href="https://platform.openai.com/pricing" target="_blank" rel="noopener noreferrer" className="text-blue-bright ml-1 hover:underline">OpenAI</a> ·
                  <a href="https://platform.claude.com/docs/en/about-claude/pricing" target="_blank" rel="noopener noreferrer" className="text-blue-bright ml-1 hover:underline">Anthropic</a> ·
                  <a href="https://ai.google.dev/gemini-api/docs/pricing" target="_blank" rel="noopener noreferrer" className="text-blue-bright ml-1 hover:underline">Google</a>
                </div>
              </Card>
            </div>
          </Reveal>

          {/* Real-world examples */}
          <Reveal>
            <div className="mb-14">
              <h2 className="font-display font-bold text-3xl mb-2">Illustrative Cost Scenarios</h2>
              <p className="text-muted mb-6">Input-only calculations, not vendor quotes or observed customer savings. Output and infrastructure costs are excluded unless noted.</p>

              <div className="flex gap-2 mb-5 flex-wrap">
                {EXAMPLES.map((ex, i) => (
                  <button key={i} onClick={() => setActiveExample(i)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-display font-bold transition-all ${
                      activeExample === i ? 'border-blue/50 bg-blue/10 text-white' : 'border-white/10 text-muted hover:border-white/20 hover:text-white'
                    }`}>
                    <span className="text-blue-bright inline-flex"><Icon name={ex.icon} size={18} /></span>{ex.title}
                  </button>
                ))}
              </div>

              <Card glow className="p-8">
                <div className="grid lg:grid-cols-[1fr_320px] gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue/12 border border-blue/20 flex items-center justify-center text-blue-bright"><Icon name={EXAMPLES[activeExample].icon} size={24} /></span>
                      <div>
                        <h3 className="font-display font-bold text-xl">{EXAMPLES[activeExample].title}</h3>
                        <p className="text-muted text-sm">{EXAMPLES[activeExample].task}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                        <div className="text-[10px] text-muted font-display uppercase tracking-wider mb-1">Input size</div>
                        <div className="text-sm font-display font-bold text-white">{EXAMPLES[activeExample].input}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                        <div className="text-[10px] text-muted font-display uppercase tracking-wider mb-1">Volume</div>
                        <div className="text-sm font-display font-bold text-white">{EXAMPLES[activeExample].volume}</div>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Cost Comparison</div>
                      <div className="space-y-2">
                        {EXAMPLES[activeExample].costs.map((c, i) => (
                          <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${i === 0 && EXAMPLES[activeExample].costs.length > 1 ? 'border-white/5 bg-white/[0.02]' : 'border-success/20 bg-success/[0.03]'}`}>
                            <span className="text-sm font-display font-bold text-white">{c.model}</span>
                            <div className="flex gap-4 text-right">
                              <div>
                                <div className="text-[10px] text-muted">Daily</div>
                                <div className="text-sm font-display font-bold text-white">{c.daily}</div>
                              </div>
                              <div>
                                <div className="text-[10px] text-muted">Monthly</div>
                                <div className="text-sm font-display font-bold text-white">{c.monthly}</div>
                              </div>
                              <div>
                                <div className="text-[10px] text-muted">Annual</div>
                                <div className="text-sm font-display font-bold text-white">{c.annual}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 rounded-xl bg-blue/5 border border-blue/25">
                      <div className="text-xs font-display font-bold text-blue-bright uppercase tracking-wider mb-2">Recommendation</div>
                      <div className="font-display font-bold text-lg text-white mb-3">{EXAMPLES[activeExample].recommendation}</div>
                      <p className="text-sm text-muted leading-relaxed">{EXAMPLES[activeExample].reasoning}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-success/5 border border-success/25">
                      <div className="text-xs font-display font-bold text-success uppercase tracking-wider mb-1">Outcome</div>
                      <div className="text-sm font-display font-bold text-white">{EXAMPLES[activeExample].saving}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Reveal>

          {/* When to mix models */}
          <Reveal>
            <div className="mb-14">
              <h2 className="font-display font-bold text-3xl mb-2">When to Mix Models</h2>
              <p className="text-muted mb-6">Mixing models can help when different steps have different quality, speed and cost requirements.</p>
              <Card className="p-7">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {[
                    { icon:'✅', title:'Use frontier models when', items:['Output quality directly affects customers','Task involves complex multi-step reasoning','Errors have significant cost consequences','Volume is low (< 1,000 calls/day)','Context window > 16K tokens needed'] },
                    { icon:'⚡', title:'Use efficient models when', items:['Task is classification or extraction','Volume is high (> 10,000 calls/day)','Accuracy ≥ 90% verified on your task','Cost is a material concern at scale','Speed matters more than nuance'] },
                    { icon:'🔀', title:'Mix models when', items:['Small model does first-pass triage','Low confidence → routes to frontier','Frontier model for complex steps only','Embedding model for search, LLM for answers','Different tasks in one pipeline'] },
                  ].map((col, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-blue-bright inline-flex"><Icon name={col.icon} size={18} /></span>
                        <h3 className="font-display font-bold text-sm">{col.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {col.items.map((item, j) => (
                          <li key={j} className="text-xs text-muted flex gap-2"><span className="text-white/30 flex-shrink-0">→</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-amber-400/5 border border-amber-400/20">
                  <div className="text-xs font-display font-bold text-amber-400 uppercase tracking-wider mb-2">The Mixing Pattern — Example</div>
                  <div className="text-sm text-white/80 leading-relaxed">
                    <strong className="text-white">Step 1:</strong> A smaller model classifies routine cases after validation<br/>
                    <strong className="text-white">Step 2:</strong> Low-confidence or sensitive cases → route to a stronger model or human reviewer<br/>
                    <strong className="text-white">Result:</strong> Evaluate the trade-off using real accuracy, escalation and cost data
                  </div>
                </div>
              </Card>
            </div>
          </Reveal>

          {/* Enterprise strategy */}
          <Reveal>
            <div className="mb-14">
              <h2 className="font-display font-bold text-3xl mb-2">Enterprise Model Strategy</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <Card className="p-6 border-red-400/20 bg-red-400/[0.02]">
                  <div className="text-xs font-display font-bold text-red-400 uppercase tracking-wider mb-3">❌ Wrong approach</div>
                  <div className="font-display font-bold text-base text-white mb-2">"We will use one model for every AI use case."</div>
                  <ul className="space-y-1.5 text-sm text-muted">
                    <li>→ Over-engineered for simple tasks</li>
                    <li>→ Over-budget at scale</li>
                    <li>→ Vendor lock-in</li>
                    <li>→ Cannot optimise costs later</li>
                  </ul>
                </Card>
                <Card className="p-6 border-success/20 bg-success/[0.02]">
                  <div className="text-xs font-display font-bold text-success uppercase tracking-wider mb-3">✓ Right approach</div>
                  <div className="font-display font-bold text-base text-white mb-2">"We standardise on our orchestration layer and abstract model selection."</div>
                  <ul className="space-y-1.5 text-sm text-muted">
                    <li>→ Switch models without changing code</li>
                    <li>→ A/B test models in production</li>
                    <li>→ Apply cost governance centrally</li>
                    <li>→ Compliance and monitoring in one place</li>
                  </ul>
                </Card>
              </div>
              <Card className="p-6 mt-5">
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-4">Enterprise Model Governance Checklist</div>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    'Maintain a Model Registry — approved models by use case type',
                    'Set cost thresholds — alert if per-use-case token cost exceeds budget',
                    'Quarterly model review — are newer, cheaper models now viable?',
                    'Model retirement policy — deprecate when better options available',
                    'Data residency map — document where each model processes data',
                    'Model abstraction layer — avoid hard-coding a single model',
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <span className="text-blue text-sm flex-shrink-0">□</span>
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal>
            <Card glow className="p-10 text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h2 className="font-display font-bold text-3xl mb-3">Learn to implement this in your organisation</h2>
              <p className="text-muted max-w-xl mx-auto mb-6">
                This model selection framework is covered in depth in Module 1 (foundations) and Module 7 (tools and infrastructure) of the Le On AI curriculum.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="large" href="/pricing">Enrol Now →</Button>
                <Button variant="ghost" href="/roi-calculator">Calculate Your ROI</Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>

      {/* Footer */}
      <Footer variant="dark" />
    </>
  )
}
