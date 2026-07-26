// data/ai-landscape.js
// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for fast-moving AI facts referenced across the
// curriculum (model names, indicative prices, regulatory dates).
//
// WHY THIS FILE EXISTS: model names and prices change every few weeks and
// regulation shifts every few months. Hard-coding them into 14 modules of
// lesson HTML guarantees the course goes stale. Update THIS file on a regular
// cadence instead — lessons should reference these tiers and principles rather
// than pinning specific product names.
//
// Everything below is a point-in-time snapshot. Treat figures as INDICATIVE and
// verify against primary sources before relying on them for a business case.
// ─────────────────────────────────────────────────────────────────────────────

export const LANDSCAPE_LAST_REVIEWED = '2026-07-25'
export const LANDSCAPE_REVIEW_CADENCE =
  'Review quarterly, or whenever a major model family or regulatory change lands.'

// ── Model landscape ──────────────────────────────────────────────────────────
// Teach by CAPABILITY TIER, not by brand. The specific names are examples only
// and date quickly; the tiering and the "use when" guidance are the durable
// lesson. The field is currently producing a new state-of-the-art model roughly
// every couple of weeks, so expect the example names to move.
export const MODEL_TIERS = [
  {
    id: 'frontier',
    label: 'Frontier / flagship',
    useWhen:
      'Hardest reasoning, ambiguous or high-stakes work, long-horizon agentic tasks. The most capable — and most expensive — option.',
    examples: [
      'OpenAI GPT-5.6 (flagship family)',
      'Anthropic Claude Opus 4.8 (plus the frontier Mythos tier above it)',
      'Google Gemini 3.x Pro',
      'xAI Grok 4.5',
    ],
    indicativeCost: '~$2–15 per M input / $10–60 per M output tokens',
  },
  {
    id: 'mid',
    label: 'Mid-tier / workhorse',
    useWhen:
      'The right default for most production workloads — strong quality at a fraction of frontier cost.',
    examples: [
      'Anthropic Claude Sonnet 5',
      'Google Gemini 3.x Flash',
      'OpenAI GPT-5.6 (mid tier)',
    ],
    indicativeCost: '~$1–5 per M input / $5–15 per M output tokens',
  },
  {
    id: 'small',
    label: 'Small / fast',
    useWhen:
      'High-volume, well-defined tasks — classification, extraction, routing, simple drafting. Frequently matches big models on a narrow task at a fraction of the cost. Right-size before reaching for a flagship.',
    examples: [
      'Anthropic Claude Haiku 4.5',
      'Google Gemini Flash-Lite',
      'Small / "mini" variants across vendors',
    ],
    indicativeCost: '~$0.10–1 per M input / $0.40–4 per M output tokens',
  },
  {
    id: 'reasoning',
    label: 'Reasoning-tuned',
    useWhen:
      'Multi-step logic, maths, planning, and hard code. Worth the extra latency and cost ONLY when the task genuinely needs deliberate step-by-step reasoning — most tasks do not.',
    examples: [
      'Extended-thinking / reasoning modes now built into the frontier families (OpenAI o-series lineage, Claude extended thinking, Gemini "thinking")',
    ],
    indicativeCost:
      'A premium over the equivalent non-reasoning model; billed on total tokens including the hidden reasoning tokens.',
  },
  {
    id: 'open',
    label: 'Open-weight',
    useWhen:
      'Data-residency and privacy control, self-hosting, cost control at scale, and fine-tuning. Now within single-digit percentage points of the proprietary leaders on many benchmarks.',
    examples: [
      'Meta (Llama / Muse lineage)',
      'DeepSeek V4',
      'Alibaba Qwen 3.x',
      'Mistral',
    ],
    indicativeCost:
      'Lowest — self-hosted (you pay infrastructure) or roughly $0.30–2 per M tokens via hosted providers.',
  },
]

// ── Cost trend — teach the direction, not the sticker price ──────────────────
export const COST_TREND_NOTE =
  'Inference prices have fallen roughly an order of magnitude per year. Model your cost FLOOR and re-check pricing each quarter — never build a business case around today\u2019s per-token price.'

// ── Regulatory landscape — verify dates, this is actively shifting ───────────
export const AI_REGULATION = [
  {
    framework: 'EU AI Act (Regulation 2024/1689)',
    whatItIs:
      'The world\u2019s first comprehensive, risk-tiered AI law. Extraterritorial — it applies to anyone placing AI on the EU market, wherever they are based. Penalties up to 7% of global turnover.',
    keyDates: [
      'In force 1 Aug 2024, rolling out in phases.',
      '2 Aug 2025 — general-purpose AI (GPAI) obligations, governance structures and the penalty regime begin.',
      '2 Aug 2026 — transparency duties (Art. 50), full GPAI enforcement and the penalty regime start to bite.',
      'High-risk (Annex III) obligations deferred to 2 Dec 2027, and product-embedded high-risk (Annex I) to 2 Aug 2028, under the Digital Omnibus agreed May 2026.',
    ],
  },
  {
    framework: 'ISO/IEC 42001',
    whatItIs:
      'The certifiable AI Management System standard — the "how do we govern AI operationally" standard enterprises adopt to demonstrate assurance to customers and regulators.',
  },
  {
    framework: 'NIST AI Risk Management Framework (US)',
    whatItIs:
      'A voluntary but widely referenced framework for identifying and managing AI risk across the system lifecycle.',
  },
  {
    framework: 'Australia',
    whatItIs:
      'A voluntary AI Safety Standard is in effect, with proposed mandatory guardrails for high-risk AI in development. Sector regulators are issuing guidance and running assurance sandboxes.',
  },
]

// ── Convenience helpers for lessons / a future "current landscape" page ──────
export const modelTier = (id) => MODEL_TIERS.find((t) => t.id === id) || null
export const regulation = (name) =>
  AI_REGULATION.find((r) => r.framework.toLowerCase().includes(name.toLowerCase())) || null
