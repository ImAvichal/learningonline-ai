// pages/model-selection.js — AI Model Selection Framework
import Head from 'next/head'
import { useState } from 'react'
import { Nav, Card, SectionLabel, Button, Reveal } from '../components/ui'
import Link from 'next/link'

const MODELS = [
  { name:'GPT-4o',            provider:'OpenAI',    inputUSD:'$2.50',  outputUSD:'$10.00', inputAUD:'$3.88',  outputAUD:'$15.50', speed:'Medium',    context:'128K', privacy:'Azure',      best:'Complex reasoning, multimodal, long documents',      tier:'frontier' },
  { name:'GPT-4o-mini',       provider:'OpenAI',    inputUSD:'$0.15',  outputUSD:'$0.60',  inputAUD:'$0.23',  outputAUD:'$0.93',  speed:'Fast',      context:'128K', privacy:'Azure',      best:'High-volume classification, extraction, triage',     tier:'efficient' },
  { name:'Claude 3.5 Sonnet', provider:'Anthropic', inputUSD:'$3.00',  outputUSD:'$15.00', inputAUD:'$4.65',  outputAUD:'$23.25', speed:'Medium',    context:'200K', privacy:'AWS Bedrock', best:'Nuanced reasoning, long documents, report generation', tier:'frontier' },
  { name:'Claude 3 Haiku',    provider:'Anthropic', inputUSD:'$0.25',  outputUSD:'$1.25',  inputAUD:'$0.39',  outputAUD:'$1.94',  speed:'Very Fast', context:'200K', privacy:'AWS Bedrock', best:'High-volume simple tasks, summarisation at scale',    tier:'efficient' },
  { name:'Gemini 1.5 Pro',    provider:'Google',    inputUSD:'$1.25',  outputUSD:'$5.00',  inputAUD:'$1.94',  outputAUD:'$7.75',  speed:'Medium',    context:'1M',   privacy:'Vertex AI',  best:'Ultra-long context, multimodal, document processing', tier:'frontier' },
  { name:'Gemini 1.5 Flash',  provider:'Google',    inputUSD:'$0.075', outputUSD:'$0.30',  inputAUD:'$0.12',  outputAUD:'$0.47',  speed:'Very Fast', context:'1M',   privacy:'Vertex AI',  best:'Speed-optimised, high-volume, cost-sensitive tasks',  tier:'efficient' },
  { name:'Llama 3.1 70B',     provider:'Meta (OSS)',inputUSD:'Self-hosted', outputUSD:'Self-hosted', inputAUD:'~$500–5K/mo infra', outputAUD:'', speed:'Variable', context:'128K', privacy:'Full control', best:'On-premise, data sovereignty, no external API', tier:'opensource' },
  { name:'Mistral Large',     provider:'Mistral',   inputUSD:'$2.00',  outputUSD:'$6.00',  inputAUD:'$3.10',  outputAUD:'$9.30',  speed:'Medium',    context:'128K', privacy:'Azure',      best:'European data residency requirements',                tier:'frontier' },
]

const EXAMPLES = [
  {
    id: 'triage',
    title: 'Customer Support Triage',
    icon: '🎫',
    task: 'Classify 800 support emails/day into 12 categories',
    input: '300 tokens/email average',
    volume: '800 calls/day',
    costs: [
      { model: 'GPT-4o',      daily: '$0.60',  monthly: '$18',   annual: '$219' },
      { model: 'GPT-4o-mini', daily: '$0.04',  monthly: '$1.10', annual: '$13' },
      { model: 'Claude Haiku',daily: '$0.06',  monthly: '$1.80', annual: '$22' },
    ],
    recommendation: 'GPT-4o-mini or Claude Haiku',
    reasoning: 'Classification is a proven task for smaller models. Run 500 test examples first. If accuracy ≥ 90%, deploy the cheaper model. Save $200+/year with negligible quality loss.',
    saving: '94% cost reduction vs GPT-4o',
  },
  {
    id: 'report',
    title: 'Executive Report Generation',
    icon: '📊',
    task: 'Generate weekly 3-page narrative from 5 data sources',
    input: '8,000 tokens/report average',
    volume: '1 report/week',
    costs: [
      { model: 'GPT-4o',          daily: '$0.05', monthly: '$0.20', annual: '$1.69' },
      { model: 'Claude 3.5 Sonnet',daily: '$0.04', monthly: '$0.17', annual: '$1.40' },
      { model: 'GPT-4o-mini',     daily: '$0.003',monthly: '$0.01', annual: '$0.10' },
    ],
    recommendation: 'Claude 3.5 Sonnet or GPT-4o',
    reasoning: 'At this volume, cost difference is irrelevant (<$2/year). Choose based on output quality — benchmark both on your actual data. Claude Sonnet often produces more nuanced narrative from complex inputs. Don\'t use mini — reasoning quality matters here.',
    saving: 'Quality decision, not cost decision at low volume',
  },
  {
    id: 'rag',
    title: 'Document Archive Search (RAG)',
    icon: '🗄️',
    task: 'Answer questions over 10-year contract database (50,000 docs)',
    input: '5,000 tokens/query (retrieved chunks)',
    volume: '200 queries/day',
    costs: [
      { model: 'GPT-4o',      daily: '$2.50', monthly: '$75',   annual: '$913' },
      { model: 'GPT-4o-mini', daily: '$0.15', monthly: '$4.50', annual: '$55' },
      { model: 'Claude Haiku',daily: '$0.25', monthly: '$7.50', annual: '$91' },
    ],
    recommendation: 'GPT-4o-mini for retrieval Q&A',
    reasoning: 'RAG architecture means the retrieved context does the heavy lifting. The LLM just synthesises clear chunks — this doesn\'t require frontier reasoning. Accuracy difference vs GPT-4o: typically < 5% for well-structured RAG. Cost difference: 17×.',
    saving: '94% cost reduction with <5% quality impact',
  },
  {
    id: 'meeting',
    title: 'Meeting Transcription + Action Items',
    icon: '🎙️',
    task: 'Transcribe 20 meetings/day (45 min avg), extract action items',
    input: 'Whisper transcription + 4,000 tokens/meeting for LLM',
    volume: '20 meetings/day',
    costs: [
      { model: 'Whisper + Claude Haiku', daily: '$5.42', monthly: '$163', annual: '$1,978' },
      { model: 'Whisper + GPT-4o',       daily: '$5.50', monthly: '$165', annual: '$2,013' },
    ],
    recommendation: 'Whisper (transcription) + Claude Haiku (extraction)',
    reasoning: 'Action item extraction is a structured extraction task — perfect for Haiku. Whisper dominates the cost. At 10 staff saving 30 min/day of note-taking at $100/hr: $365,000/year value vs $1,978/year cost. ROI: 18,450%.',
    saving: '$363,022/year net benefit',
  },
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
  const [currency, setCurrency]           = useState('AUD')
  const [filterTier, setFilterTier]       = useState('all')

  const filteredModels = MODELS.filter(m => filterTier === 'all' || m.tier === filterTier)

  return (
    <>
      <Head>
        <title>AI Model Selection Guide — LeO AI</title>
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
              Most organisations use models that are 10× more expensive than necessary.
              This framework tells you exactly which model to use — and why.
            </p>
          </div>

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
                        ['Accuracy critical + quality matters',           'Any',   '→ GPT-4o or Claude Sonnet', 'text-blue-bright'],
                        ['High volume + accuracy ≥ 90% verified',        'High',  '→ GPT-4o-mini or Claude Haiku', 'text-success'],
                        ['Ultra-long context (>100K tokens)',             'Any',   '→ Gemini 1.5 Pro (1M context)', 'text-amber-400'],
                        ['Data must not leave Australia',                 'Any',   '→ Azure OpenAI (AUS region) or AWS Bedrock (Sydney)', 'text-purple-400'],
                        ['Maximum cost efficiency',                       'High',  '→ Gemini 1.5 Flash or Claude Haiku', 'text-success'],
                        ['On-premise / no external API',                  'Any',   '→ Llama 3.1 70B (self-hosted)', 'text-amber-400'],
                        ['European data residency',                       'Any',   '→ Mistral Large (Azure EU)', 'text-purple-400'],
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
                  <p className="text-muted text-sm">All prices per 1 million tokens. Updated Q1 2025.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">Filter:</span>
                  {[['all','All Models'],['frontier','Frontier'],['efficient','Efficient'],['opensource','Open Source']].map(([val,label]) => (
                    <button key={val} onClick={() => setFilterTier(val)}
                      className={`px-3 py-1.5 rounded-full text-xs font-display font-bold border transition-all ${filterTier === val ? 'bg-blue border-blue text-white' : 'border-white/10 text-muted hover:border-white/20 hover:text-white'}`}>
                      {label}
                    </button>
                  ))}
                  <button onClick={() => setCurrency(c => c === 'AUD' ? 'USD' : 'AUD')}
                    className="px-3 py-1.5 rounded-full text-xs font-display font-bold border border-white/10 text-muted hover:text-white ml-2">
                    {currency}
                  </button>
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
                              {m.tier === 'frontier' ? 'Frontier' : m.tier === 'efficient' ? 'Efficient ✓' : 'Open Source'}
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted">{m.provider}</td>
                          <td className="p-4 text-sm text-right font-display font-bold text-white">
                            {currency === 'AUD' ? m.inputAUD : m.inputUSD}
                          </td>
                          <td className="p-4 text-sm text-right font-display font-bold text-white">
                            {currency === 'AUD' ? m.outputAUD : m.outputUSD}
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
                  Prices in {currency}. AUD conversion at 1.55×. Verify at provider pricing pages before committing.
                  <a href="https://openai.com/pricing" target="_blank" rel="noopener noreferrer" className="text-blue-bright ml-1 hover:underline">OpenAI</a> ·
                  <a href="https://anthropic.com/pricing" target="_blank" rel="noopener noreferrer" className="text-blue-bright ml-1 hover:underline">Anthropic</a> ·
                  <a href="https://cloud.google.com/vertex-ai/pricing" target="_blank" rel="noopener noreferrer" className="text-blue-bright ml-1 hover:underline">Google</a>
                </div>
              </Card>
            </div>
          </Reveal>

          {/* Real-world examples */}
          <Reveal>
            <div className="mb-14">
              <h2 className="font-display font-bold text-3xl mb-2">Real-World Cost Examples</h2>
              <p className="text-muted mb-6">Actual cost calculations for common business AI use cases.</p>

              <div className="flex gap-2 mb-5 flex-wrap">
                {EXAMPLES.map((ex, i) => (
                  <button key={i} onClick={() => setActiveExample(i)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-display font-bold transition-all ${
                      activeExample === i ? 'border-blue/50 bg-blue/10 text-white' : 'border-white/10 text-muted hover:border-white/20 hover:text-white'
                    }`}>
                    <span>{ex.icon}</span>{ex.title}
                  </button>
                ))}
              </div>

              <Card glow className="p-8">
                <div className="grid lg:grid-cols-[1fr_320px] gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{EXAMPLES[activeExample].icon}</span>
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
              <p className="text-muted mb-6">The highest-ROI architecture uses different models for different steps.</p>
              <Card className="p-7">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {[
                    { icon:'✅', title:'Use frontier models when', items:['Output quality directly affects customers','Task involves complex multi-step reasoning','Errors have significant cost consequences','Volume is low (< 1,000 calls/day)','Context window > 16K tokens needed'] },
                    { icon:'⚡', title:'Use efficient models when', items:['Task is classification or extraction','Volume is high (> 10,000 calls/day)','Accuracy ≥ 90% verified on your task','Cost is a material concern at scale','Speed matters more than nuance'] },
                    { icon:'🔀', title:'Mix models when', items:['Small model does first-pass triage','Low confidence → routes to frontier','Frontier model for complex steps only','Embedding model for search, LLM for answers','Different tasks in one pipeline'] },
                  ].map((col, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">{col.icon}</span>
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
                    <strong className="text-white">Step 1:</strong> Small model classifies (99% of volume, very cheap)<br/>
                    <strong className="text-white">Step 2:</strong> Below 70% confidence → route to frontier model (1% of volume)<br/>
                    <strong className="text-white">Result:</strong> 99% cost reduction on classification with frontier accuracy on edge cases
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
                  <div className="font-display font-bold text-base text-white mb-2">"We will standardise on GPT-4o for all AI use cases."</div>
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
                    'Model abstraction layer — code never calls GPT-4o directly',
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
                This model selection framework is covered in depth in Module 1 (foundations) and Module 7 (tools and infrastructure) of the LeO AI curriculum.
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
      <footer className="border-t border-white/5 py-8 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted">
          <span className="font-display font-black text-white">Le On <span className="text-blue">AI</span></span>
          <p>© 2025 LeO AI · learningonline.ai</p>
          <div className="flex gap-4">
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
