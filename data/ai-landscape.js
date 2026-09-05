// data/ai-landscape.js
// Fast-moving AI facts used as the course's current-landscape reference.
// Durable lessons should teach capability tiers and decision principles; this
// file supplies dated examples that can be refreshed without rewriting them.

export const LANDSCAPE_LAST_REVIEWED = '2026-09-05'
export const LANDSCAPE_REVIEW_CADENCE =
  'Review weekly against primary vendor and regulator sources; publish material changes with a learner-facing change log.'

export const MODEL_TIERS = [
  {
    id: 'frontier',
    label: 'Frontier / flagship',
    useWhen: 'Hardest reasoning, coding, research, multimodal and long-horizon agentic work. Use only when the quality gain clears the extra cost, latency and governance burden.',
    examples: [
      'OpenAI GPT-6 Astra (September 2026 rollout; availability may be limited)',
      'OpenAI GPT-5.6 Sol',
      'Anthropic Claude Fable 5.1 / Claude Mythos 5.1',
      'Anthropic Claude Opus 5',
      'Google Gemini 3.6 Flash / Gemini 3.5 family',
    ],
    indicativeCost: 'Pricing changes frequently — benchmark current vendor pricing against your own task and volume before selecting a model.',
  },
  {
    id: 'mid',
    label: 'Mid-tier / workhorse',
    useWhen: 'The default for most production workloads: strong quality, lower latency and lower unit cost than the flagship tier.',
    examples: ['Anthropic Claude Sonnet 5', 'Google Gemini 3.6 Flash / 3.5 Flash', 'Current OpenAI general-purpose production models'],
    indicativeCost: 'Treat cost per completed task — not cost per token alone — as the decision metric.',
  },
  {
    id: 'small',
    label: 'Small / fast',
    useWhen: 'High-volume, well-defined classification, extraction, routing and simple drafting. Test this tier first for narrow tasks.',
    examples: ['Google Gemini 3.5 Flash-Lite', 'Small / mini variants across major vendors', 'Task-specific open-weight models'],
    indicativeCost: 'Usually the lowest hosted cost and latency; verify accuracy on a representative evaluation set.',
  },
  {
    id: 'agentic',
    label: 'Agentic / computer-use capable',
    useWhen: 'Multi-step tasks that require tools, applications, browsers or APIs. The design problem is permissions, approvals, observability and recovery — not simply whether the model can act.',
    examples: ['Google Gemini 3.5 Flash computer use', 'Gemini Spark', 'OpenAI computer-use capable reasoning models', 'Claude long-running agent workflows'],
    indicativeCost: 'Model the full trajectory: reasoning + tool calls + retries + external API costs. Agent cost can be many times a single chat response.',
  },
  {
    id: 'multimodal',
    label: 'Native multimodal',
    useWhen: 'Workflows combining text, images, audio, video or live interaction. Prefer native multimodal models where they simplify orchestration and improve context continuity.',
    examples: ['Google Gemini Omni / Omni Flash', 'Gemini 3.5 Live Translate', 'Frontier OpenAI and Anthropic multimodal families'],
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
  { name: 'OpenAI release notes', url: 'https://openai.com/products/release-notes/' },
  { name: 'OpenAI model release notes', url: 'https://help.openai.com/en/articles/9624314' },
  { name: 'Anthropic newsroom', url: 'https://www.anthropic.com/news' },
  { name: 'Google AI updates', url: 'https://blog.google/innovation-and-ai/technology/ai/' },
  { name: 'NIST AI RMF', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
]

export const modelTier = (id) => MODEL_TIERS.find((t) => t.id === id) || null
export const regulation = (name) => AI_REGULATION.find((r) => r.framework.toLowerCase().includes(name.toLowerCase())) || null
