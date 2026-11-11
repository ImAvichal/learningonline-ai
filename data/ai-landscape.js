// data/ai-landscape.js
// Fast-moving AI facts used as the course's current-landscape reference.
// Durable lessons should teach capability tiers and decision principles; this
// file supplies dated examples that can be refreshed without rewriting them.

export const LANDSCAPE_LAST_REVIEWED = '2026-11-12'
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
      'Anthropic Claude Fable 5.2 (check platform access)',
      'Anthropic Claude Opus 5.5',
      'Google Gemini 4 Argon',
      'Google Gemini 4 Carbon (paid access; check task fit)',
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
    title: 'Gemini 4 Carbon expands high-complexity agent choices',
    summary: 'On 10 November 2026, Google expanded Gemini 4 Carbon from restricted testing to paying API developers and enterprise users, with rollout to eligible Google AI Ultra experiences. Google positions Carbon for demanding long-horizon agentic work, complex debugging and scientific reasoning, while recommending Gemini 4 Argon for most everyday engineering and knowledge tasks. Exercise: compare Carbon and Argon on synthetic multi-step tasks, recording accuracy, tool-call reliability, latency, total tokens, cost per successful task and unsafe actions. Treat vendor benchmarks and introductory pricing as time-limited claims, not guaranteed outcomes.',
  },
  {
    title: 'Claude Fable 5.2 expands high-complexity AI choices',
    summary: 'Anthropic announced Claude Fable 5.2 and restricted-access Claude Mythos 5.2 on 9 November 2026. Fable 5.2 is available through the Claude API as claude-fable-5-2; Anthropic recommends starting with Opus 5.5 for most work and considering Fable for difficult, open-ended reasoning and long-horizon agents. Fable includes safeguards for sensitive cybersecurity and biology tasks; Mythos access requires vetting. Exercise: use synthetic, non-sensitive technical tasks to compare Fable and Opus for factual accuracy, completion rate, latency, cost per successful task and refusal/escalation behaviour. Treat vendor benchmark results as claims to test, not guaranteed outcomes.',
  },
  {
    title: 'Model retirement deadlines require migration planning',
    summary: 'OpenAI announced on 14 October 2026 that selected GPT-4o and GPT-4.1 API snapshots are scheduled for shutdown on 14 January 2027. Preview-model deadlines can differ from stable-model deadlines and across platforms. Verify the current vendor deprecations table and test replacements before scheduling migrations.',
  },
  {
    title: 'Late-2026 OpenAI API retirements need attention',
    summary: 'OpenAI lists 30 November 2026 for reusable prompts, 1 December 2026 for selected older image models, and 11 December 2026 for specified GPT-5 and o3 API snapshots. These are endpoint/model-specific deadlines; check the official deprecations table and test supported replacements before migration.',
  },
  {
    title: 'Verify Gemini retirement notices by exact model and platform',
    summary: 'As reviewed 12 November 2026, indexed versions of Google’s official Gemini API deprecations table disagree about shutdown dates for stable gemini-2.5-pro and gemini-2.5-flash: some show no announced date, while others show earlier retirement dates. Do not teach a 1 December 2026 automatic-routing deadline as established until the canonical current API documentation and platform-specific release notes agree. Exercise: inventory exact model IDs and API platform, compare dated official notices, then test supported alternatives on synthetic tasks for quality, structured output, safety, latency and cost.',
  },
  {
    title: 'Gemini audio preview retirement dates need endpoint-specific verification',
    summary: 'Google’s indexed Gemini API deprecations tables also disagree on shutdown dates for several Live and text-to-speech preview model IDs. Do not assert a blanket 17 November 2026 retirement. Check the current documentation for the exact model and platform, record the source retrieval date, and test replacement speech quality, latency and API compatibility before changing production integrations.',
  },
  {
    title: 'OpenAI Evals and Agent Builder have 30 November 2026 retirement deadlines',
    summary: 'OpenAI says existing Evals became read-only on 31 October 2026, with the Evals dashboard/API and Agent Builder scheduled to shut down on 30 November 2026. This is separate from the reusable prompts API retirement on the same date. Migrate evaluation workflows and agent-building projects using the vendor migration guides; ChatKit is not part of the Agent Builder shutdown.',
  },
  {
    title: 'Preview model retirements can have shorter migration windows',
    summary: 'On 5 November 2026, OpenAI deprecated the specialised gpt-5.5-cyber-preview API model with a 1 February 2027 shutdown date. This is not a general GPT-5.5 shutdown. Before building a business-critical workflow around a preview model, check the vendor deprecations page and, where available, the API model shutdown_date field; maintain tested alternatives and a migration plan.',
  },
  {
    title: 'Speech API migrations can require workflow changes',
    summary: 'OpenAI lists 6 January 2027 shutdown dates for tts-1, tts-1-hd and specified GPT-4o mini TTS models. Its recommended gpt-realtime-2.1-mini replacement uses the Realtime API rather than the existing /v1/audio/speech endpoint; this is not a drop-in model-ID change.',
  },
  {
    title: 'OpenAI transcription API models retire on 26 February 2027',
    summary: 'OpenAI lists 26 February 2027 shutdown dates for whisper-1, gpt-4o-transcribe, gpt-4o-mini-transcribe and gpt-4o-transcribe-diarize (including the specified snapshot). Recommended replacements include gpt-live-transcribe or gpt-transcribe. Evaluate streaming, diarization, language coverage, privacy, latency, output formats and integration changes before switching.',
  },
  {
    title: 'Claude Sonnet 4.5 API retires on 30 November 2026',
    summary: 'Anthropic deprecated claude-sonnet-4-5-20250929 on 30 September 2026 and lists 30 November 2026 as its retirement date, recommending claude-sonnet-5-5. Check all configured API model IDs, including scheduled content-refresh jobs, and test replacements for output quality, supported parameters, latency and cost before switching. Model availability and retirement dates can differ on partner-operated platforms.',
  },
  {
    title: 'Treat retrieved text and tool outputs as untrusted instructions',
    summary: 'A document, website or email can contain prompt-injection instructions aimed at an AI assistant. For agent workflows, test adversarial inputs, constrain tool permissions and output formats, keep an auditable trail and require human approval for consequential actions. Validate against source material rather than treating generated answers as verified facts.',
  },
  {
    title: 'New image-generation models expand format and editing choices',
    summary: 'On 4 November 2026, OpenAI released GPT Image 2.6 Sunburst and Flare. Its Image API documentation describes SVG and animated GIF output, complexity controls, and markup-guided editing. Practical exercise: compare a simple graphic across quality/complexity settings; verify text, accessibility, editability, permissions and final output manually. Availability and pricing must be checked before production use.',
  },
  {
    title: 'Specialised AI models require purpose-specific governance',
    summary: 'On 5 November 2026, OpenAI introduced GPT-6-Cyber for authorised defensive security work. Do not treat specialised models as general replacements or grant unrestricted system access: define approved scope, isolate test environments, log activity and require human review before acting on findings.',
  },
  {
    title: 'Model upgrades can break generation-parameter compatibility',
    summary: 'Anthropic documents removal of temperature, top_p and top_k in API version 2026-10-21, with non-default settings also rejected for some newer models on older API versions. When migrating, verify supported request parameters as well as model IDs, evaluate outputs on representative tasks, and do not assume a fixed temperature setting is portable across model families.',
  },
  {
    title: 'Automatic agent review is an additional control, not a blanket authorisation',
    summary: 'OpenAI added optional automatic review for eligible Agents API sessions on 30 October 2026. It can approve or deny supported tool and permission requests, but does not replace sandboxing, network restrictions, application-level authorisation or human approval for consequential actions. Exercise: compare an agent that drafts a supplier payment with one permitted to submit it; require explicit human sign-off for the payment, even when automated review is enabled.',
  },
  {
    title: 'Voice agents can make outbound SIP calls, with consent and oversight requirements',
    summary: 'On 2 November 2026 OpenAI made outbound SIP calling available through GPT-Live for all API organisations using a SIP provider. Exercise: design a hypothetical appointment-reminder workflow that discloses AI use, checks permission to contact, minimises personal data, provides human escalation and handles call failures without duplicate dialling. No real calls are needed for this lesson.',
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
  { name: 'OpenAI API changelog', url: 'https://developers.openai.com/api/docs/changelog' },
  { name: 'OpenAI image generation guide', url: 'https://developers.openai.com/api/docs/guides/image-generation' },
  { name: 'Claude model documentation', url: 'https://platform.claude.com/docs/en/models/overview' },
  { name: 'Anthropic Fable 5.2 launch (9 November 2026)', url: 'https://www.anthropic.com/claude-fable-and-mythos-5-2' },
  { name: 'Claude model deprecations', url: 'https://platform.claude.com/docs/en/about-claude/model-deprecations' },
  { name: 'OpenAI safety best practices', url: 'https://developers.openai.com/api/docs/guides/safety-best-practices' },
  { name: 'Google Gemini models', url: 'https://ai.google.dev/gemini-api/docs/models' },
  { name: 'Gemini model deprecations (checked 11 November 2026)', url: 'https://ai.google.dev/gemini-api/docs/deprecations' },
  { name: 'Google Gemini 4 Carbon availability (10 November 2026)', url: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/' },
  { name: 'IEA Energy and AI report', url: 'https://www.iea.org/reports/energy-and-ai' },
  { name: 'OpenAI Agents API automatic review', url: 'https://developers.openai.com/api/docs/guides/agents-api/sessions/approvals' },
  { name: 'OpenAI GPT-Live session API', url: 'https://developers.openai.com/api/reference/resources/live/methods/create' },
  { name: 'NIST AI RMF', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
]

export const modelTier = (id) => MODEL_TIERS.find((t) => t.id === id) || null
export const regulation = (name) => AI_REGULATION.find((r) => r.framework.toLowerCase().includes(name.toLowerCase())) || null
