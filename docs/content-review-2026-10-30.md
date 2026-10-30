# LeO AI content review — 30 October 2026

**Status:** Draft changes on a non-production branch. **Last reviewed:** 30 October 2026 (Sydney). **Scope:** Public homepage and selected course content on GitHub `main`, plus current vendor documentation. No prices, entitlements, customer data, email campaigns or production deployments changed.

## Changelog — proposed, not published

- **Free preview:** Removed Q1 2025 GPT-4o/mini and Claude Haiku price tables, stale model-choice quiz, unsourced business ROI and project-success multipliers. Replaced with clearly labelled *illustrative* input/output token arithmetic, links to live provider pricing, and a task-based model comparison exercise.
- **Model selection guide:** Retired GPT-4o, Claude 3 and Gemini 1.5 comparison rows, stale fixed AUD exchange-rate conversion, false claims of measured accuracy/ROI, and fixed deployment-residency promises. Added dated model-family examples with provider verification prompts. Cost scenarios are labelled input-only illustrations.
- **Glossary:** Replaced unsupported proprietary parameter-count speculation, 2025 model pricing, misleading universal prompt ROI and inaccurate token-savings figures. Renamed dated section to Modern AI (2026).
- **AI landscape:** Updated last-reviewed date to 2026-10-30, refreshed selected OpenAI/Claude/Gemini references, and replaced several dated source URLs with primary documentation.
- **Core curriculum:** Verified `MODULES` contains **16** module IDs (1–16), corrected outdated 14-module comment and 2024 AI Index reference, removed an obsolete mid-2026 model list, qualified the EU AI Act human-oversight statement, and softened unsupported savings and model-learning assertions.

## Primary sources checked

- OpenAI model catalogue: https://developers.openai.com/api/docs/models
- OpenAI API pricing: https://platform.openai.com/pricing
- OpenAI GPT-6 family: https://openai.com/index/introducing-gpt-6-sol-and-luna/
- Anthropic model documentation: https://platform.claude.com/docs/en/models/overview
- Anthropic pricing: https://platform.claude.com/docs/en/about-claude/pricing
- Gemini models: https://ai.google.dev/gemini-api/docs/models
- Gemini pricing: https://ai.google.dev/gemini-api/docs/pricing
- Stanford 2026 AI Index: https://hai.stanford.edu/ai-index
- EU AI Act Article 14: https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-14
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework

## Findings requiring separate follow-up

1. **Content refresh reliability:** `scripts/content-refresh.mjs` defaults to `claude-sonnet-4-5`, an older model ID. When `ANTHROPIC_API_KEY` is absent, it exits successfully without refreshing anything. The script writes model-generated JavaScript directly and only checks for an `export` token; it does not run syntax validation, tests or a reviewed pull-request gate. **Proposed:** separate engineering PR to update the model, make missing credentials an explicit status, validate source provenance and generated syntax, and require human review before publishing.
2. **Remaining marketing claims:** Homepage and pricing page promise regular content refresh, 12 months of updates, a 7-day refund, and purchase invoicing. Verify actual fulfilment and payment flows before representing these as operational guarantees.
3. **Remaining illustrative scenarios:** Other lessons include numerical savings, project anecdotes and some broad causal claims that need evidence or explicit hypothetical labels. Review by lesson, prioritising ROI, governance and Parents & Caregivers.
4. **Links:** Stanford's older AI Index URL redirects to the current 2026 report; Claude's older docs hostname redirects to the current docs. These are not confirmed broken links. A full automated internal/external link crawl and authenticated course audit have **not** been completed.
5. **Production security:** Signup, profile RLS compatibility, checkout, email recipient isolation, OAuth and dependency vulnerability status have not been retested in this content review. No production release should rely on this content-only pass.

## Validation / release gate

- Confirmed 16 numbered module records in `data/modules.js`.
- Confirmed stale GPT-4o / Claude 3.5 / Gemini 1.5 price references removed from the updated public preview, glossary and model-selection guide.
- **Vercel preview build:** READY for the reviewed content commit. This confirms a preview build completed, **not** a production release or end-to-end functional verification.
- **GitHub Quality Gate:** FAILED at `npm run check:release`; `npm run build` was skipped. The failing India (₹499) and Philippines (₱330) assertions expect Unicode-escaped strings with spaces, while `data/tiers.js` uses literal currency symbols and compact formatting. The displayed prices match the intended values; this is a brittle textual assertion, not evidence of a price change. Do not change prices to satisfy it. Fix tests separately.
- **Dependency security warning:** `npm ci` reported **8 vulnerabilities (3 moderate, 4 high, 1 critical)** and warned that `next@14.2.5` has a known security issue. Requires dependency/security remediation before production approval.
- **Not yet verified:** Playwright tests, accessibility, mobile rendering, live internal links, checkout, authentication, or full production security regression.
- **Release:** Draft PR only. Do not merge or publish until build, security and production-stability checks pass.

## Next review

Audit remaining high-risk numerical claims and example provenance in the full 16-module curriculum; separately harden the automated refresh pipeline and complete production regression testing.
