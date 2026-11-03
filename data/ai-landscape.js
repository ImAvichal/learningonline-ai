// data/ai-landscape.js
// Fast-moving AI facts used as the course's current-landscape reference.
// Durable lessons should teach capability tiers and decision principles; this
// file supplies dated examples that can be refreshed without rewriting them.

export const LANDSCAPE_LAST_REVIEWED = '2026-11-04'
export const LANDSCAPE_REVIEW_CADENCE =
  'Review weekly against primary vendor and regulator sources; publish material changes with a learner-facing change log.'

export const MODEL_TIERS = [
  {
    id: 'frontier',
    label: 'Frontier / flagship',
    useWhen: 'Hardest reasoning, coding, research, multimodal and long-horizon agentic work. Use only when the quality gain clears the extra cost, latency and governance burden.',
    examples: [
      'OpenAI GPT-6 Astra (verify availability)',
      'OpenAI GPT-6.1 Sol',
      'Anthropic Claude Fable 5.1 (check platform access)',
      'Anthropic Claude Opus 5.5',
      'Google Gemini 4 Argon',
    ],
    indicativeCost: 'Pricing changes frequently — benchmark current vendor pricing against your own task and volume before selecting a model.',
  },
  {
    id: 'mid',
    label: 'Mid-tier / workhorse',
    useWhen: 'The default for most production workloads: strong quality, lower latency and lower unit cost than the flagship tier.',
    examples: ['Anthropic Claude Sonnet 5.5', 'Google Gemini 3.8 Flash', 'OpenAI GPT-6.1 Sol (check task fit)'],
    indicativeCost: 'Treat cost per completed task — not cost per token alone — as the decision metric.',
  },
  {
    id: 'small',
    label: 'Small / fast',
    useWhen: 'High-volume, well-defined classification, extraction, routing and simple drafting. Test this tier first for narrow tasks.',
    examples: ['Anthropic Claude Haiku 5.5', 'Google Gemini 3.5 Flash-Lite', 'OpenAI GPT-6 Luna', 'Small / mini variants across major vendors', 'Task-specific open-weight models'],
    indicativeCost: 'Usually the lowest hosted cost and latency; verify accuracy on a representative evaluation set.',
  },
  {
    id: 'agentic',
    label: 'Agentic / computer-use capable',
    useWhen: 'Multi-step tasks that require tools, applications, browsers or APIs. The design problem is permissions, approvals, observability and recovery — not simply whether the model can act.',
    examples: ['Computer-use capable models (check current model docs)', 'Managed agent tools (check current availability)', 'OpenAI computer-use capable reasoning models', 'Claude long-running agent workflows'],
    indicativeCost: 'Model the full trajectory: reasoning + tool calls + retries + external API costs. Agent cost can be many times a single chat response.',
  },
  {
    id: 'multimodal',
    label: 'Native multimodal',
    useWhen: 'Workflows combining text, images, audio, video or live interaction. Prefer native multimodal models where they simplify orchestration and improve context continuity.',
    examples: ['Google multimodal models (check supported modalities)', 'Current live voice and translation models (check docs)', 'Frontier OpenAI and Anthropic multimodal families'],
    indicativeCost: 'Price and latency vary materially by modality. Measure the whole workflow, not just text-token rates.',
  },
  {
    id: 'open',
    label: 'Open-weight',
    useWhen: 'Self-hosting, customisation, privacy/data-residency control and cost optimisation at sustained scale.',
    examples: ['Meta open-weight families', 'DeepSeek', 'Qwen', 'Mistral'],
    indicativeCost: 'Include infrastructure, operations, evaluation and security costs when comparing with hosted APIs.',
  },
]

export const COST_TREND_NOTE =
  'Model capability and price are moving quickly. Re-benchmark regularly and optimise for cost per successful business outcome, not brand prestige or a static token price.'

export const CURRENT_AI_SHIFTS = [
  {
    title: 'AI is moving from answering to acting',
    summary: 'Computer use, tool calling and persistent agents are becoming mainstream. Teach least privilege, approval gates, audit trails and rollback alongside prompting.',
  },
  {
    title: 'Multimodality is becoming native',
    summary: 'Text, image, audio and video increasingly live in one model family, reducing the need for separate pipelines while increasing privacy and evaluation requirements.',
  },
  {
    title: 'Model choice is now a routing decision',
    summary: 'Strong teams route work by complexity, risk, latency and cost rather than choosing one model for everything.',
  },
  {
    title: 'Model retirement deadlines require migration planning',
    summary: 'OpenAI announced on 14 October 2026 that selected GPT-4o and GPT-4.1 API snapshots are scheduled for shutdown on 14 January 2027. Google lists 17 November 2026 shutdown dates for Gemini 3.1 Flash TTS preview and Gemini 3.1 Flash Live preview, with Gemini 3.8 TTS and Gemini 3.8 Live respectively recommended as replacements. Check vendor deprecation pages and test replacements before deadlines.',
  },
  {
    title: 'Late-2026 OpenAI API retirements need attention',
    summary: 'OpenAI lists 30 November 2026 for reusable prompts, 1 December 2026 for selected older image models, and 11 December 2026 for specified GPT-5 and o3 API snapshots. These are endpoint/model-specific deadlines; check the official deprecations table and test supported replacements before migration.',
  },
  {
    title: 'Gemini 2.5 stable API models: no shutdown date announced',
    summary: 'As reviewed on 4 November 2026, Google explicitly says gemini-2.5-pro and gemini-2.5-flash are not deprecated and have no announced shutdown date. Access is limited for new users; Google recommends newer models for new projects. Earlier course copy incorrectly claimed automatic rerouting on 1 December 2026. Do not teach that claim. Check official deprecations and evaluate any voluntary migration for quality, API compatibility, safety and cost.',
  },
  {
    title: 'OpenAI Evals and Agent Builder have 30 November 2026 retirement deadlines',
    summary: 'OpenAI says existing Evals became read-only on 31 October 2026, with the Evals dashboard/API and Agent Builder scheduled to shut down on 30 November 2026. This is separate from the reusable prompts API retirement on the same date. Migrate evaluation workflows and agent-building projects using the vendor migration guides; ChatKit is not part of the Agent Builder shutdown.',
  },
  {
    title: 'Speech API migrations can require workflow changes',
    summary: 'OpenAI lists 6 January 2027 shutdown dates for tts-1, tts-1-hd and specified GPT-4o mini TTS models. Its recommended gpt-realtime-2.1-mini replacement uses the Realtime API rather than the existing /v1/audio/speech endpoint; this is not a drop-in model-ID change.',
  },
  {
    title: 'Capability requires stronger safeguards',
    summary: 'More capable agents increase the impact of mistakes and misuse. Human approval for consequential actions, scoped tools and continuous evaluation are production requirements.',
  },
]

export const AI_REGULATION = [
  {
    framework: 'EU AI Act (Regulation 2024/1689)',
    whatItIs: 'Comprehensive, risk-tiered AI regulation with phased obligations. Exact implementation dates can change, so verify the European Commission implementation timeline before making compliance decisions.',
    keyDates: ['In force since 2024 with obligations phasing in through subsequent years.', 'Treat high-risk, transparency and general-purpose AI obligations as separate compliance workstreams and verify current dates before deployment.'],
  },
  {
    framework: 'ISO/IEC 42001',
    whatItIs: 'Certifiable AI management-system standard for operational governance, accountability and continual improvement.',
  },
  {
    framework: 'NIST AI Risk Management Framework (US)',
    whatItIs: 'Widely used voluntary lifecycle framework organised around Govern, Map, Measure and Manage.',
  },
  {
    framework: 'Australia',
    whatItIs: 'Use the Australian Government AI safety guidance, Privacy Act obligations and sector-specific regulation as the baseline; verify current mandatory requirements for your sector and use case.',
  },
]

export const PRIMARY_REFRESH_SOURCES = [
  { name: 'OpenAI model catalogue', url: 'https://developers.openai.com/api/docs/models' },
  { name: 'OpenAI API pricing', url: 'https://platform.openai.com/pricing' },
  { name: 'OpenAI API deprecations', url: 'https://developers.openai.com/api/docs/deprecations' },
  { name: 'Claude model documentation', url: 'https://platform.claude.com/docs/en/about-claude/models/overview' },
  { name: 'Google Gemini models', url: 'https://ai.google.dev/gemini-api/docs/models' },
  { name: 'Gemini model deprecations', url: 'https://ai.google.dev/gemini-api/docs/deprecations' },
  { name: 'IEA Energy and AI report', url: 'https://www.iea.org/reports/energy-and-ai' },
  { name: 'NIST AI RMF', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
]

export const modelTier = (id) => MODEL_TIERS.find((t) => t.id === id) || null
export const regulation = (name) => AI_REGULATION.find((r) => r.framework.toLowerCase().includes(name.toLowerCase())) || null
