# LeO AI content review — 10 November 2026

**Last reviewed:** 10 November 2026 (Australia/Sydney).  
**Scope:** Public-site sample, draft curriculum/reference material, authoritative AI model and safety documentation, GitHub CI and Vercel deployments.  
**Release:** HOLD. Content changes are committed to draft PR #4, **not merged or published**.

## Verified primary-source development (9 November announcement)

Anthropic announced **Claude Fable 5.2** and **Claude Mythos 5.2** on 9 November 2026. Fable 5.2 is available on the Claude API as `claude-fable-5-2`; Anthropic recommends starting with **Opus 5.5** for most coding and knowledge work, and escalating to Fable for particularly demanding open-ended reasoning and long-horizon agentic work. Fable has safeguards that limit some high-risk cybersecurity and biology requests; Mythos requires vetted access. Anthropic's own benchmark and speed figures are vendor-reported and must not be presented as guaranteed user outcomes.

Primary sources (checked 10 November):
- https://www.anthropic.com/claude-fable-and-mythos-5-2 (published 9 November 2026)
- https://platform.claude.com/docs/en/models/overview
- https://platform.claude.com/docs/en/about-claude/model-deprecations

**Curriculum action:** Add Fable 5.2 to the frontier-tier examples and a short model-evaluation exercise using **synthetic, non-sensitive** tasks. Compare Fable 5.2 against Opus 5.5 on task success, factual accuracy, latency, cost per successful task, safety refusals and escalation. Do not infer that one model is universally superior.

## Accuracy correction / unresolved Google documentation

The draft reference previously taught as fact that stable `gemini-2.5-pro` and `gemini-2.5-flash` automatically reroute on 1 December 2026. Accessible official Google Gemini API deprecation search snapshots reviewed today instead list **"No shutdown date announced"** for both stable IDs. Another earlier review reported a conflicting table, and direct page retrieval now returns an unsupported content type or redirect. The 1 December assertion is therefore **not independently confirmed** and has been replaced with platform-specific lifecycle verification guidance. Similarly, the earlier specific 17 November claim for Gemini 3.1 Flash TTS/Live preview is omitted pending direct, unambiguous primary-source confirmation. This is a cautious content correction, **not a claim that Google definitively cancelled any retirement**.

Primary documentation (retrieval partly limited on 10 November): https://ai.google.dev/gemini-api/docs/deprecations

## Existing urgent engineering dependency (read-only finding)

Anthropic still lists `claude-sonnet-4-5-20250929` for retirement on **30 November 2026**, recommending `claude-sonnet-5-5`. The main-branch `scripts/content-refresh.mjs` still defaults to `claude-sonnet-4-5` and includes `temperature: 0`. Anthropic's API version `2026-10-21` removes `temperature`, `top_p` and `top_k`. This needs a **separate engineering PR** and compatibility/evaluation checks; no worker code was changed in this content-only PR. The script also exits successfully if the API key is absent or no sources are retrieved, potentially hiding an incomplete refresh.

Source: https://platform.claude.com/docs/en/about-claude/model-deprecations

## Public site and link sampling

- Public model-selection guide remains retrievable via a cached public snapshot. It displays Q1 2025 prices/model examples and unsupported numerical savings claims. Corrected copy is in the **draft** PR, not production.
- Public privacy policy is retrievable and still refers to subscriptions/renewals, while other public messaging refers to one-time purchases. **Do not alter legal or commercial terms without verifying actual payment behaviour and legal review.**
- Primary links sampled and retrievable: Anthropic's 9 November announcement, Claude models overview, Claude deprecations, OpenAI deprecations, NIST AI RMF and IEA Energy and AI. Google's Gemini deprecation endpoint could not be fully opened in the reader; search excerpts were available. No confirmed broken links from this sample; this **is not** a complete link crawl.
- Public site pages sampled: https://www.learningonline.ai/model-selection and https://www.learningonline.ai/privacy (retrieval may be cached).

## CI and deployment checks

- PR #4 was open and draft at the start of review. Its previous head `6b2c201` failed Quality Gate run https://github.com/ImAvichal/learningonline-ai/actions/runs/42523410920 at `npm run check:release`; build skipped. E2E workflow run https://github.com/ImAvichal/learningonline-ai/actions/runs/42523405570 failed without returned jobs; root cause not confirmed.
- Main's scheduled **Controlled AI Content Refresh** failed on https://github.com/ImAvichal/learningonline-ai/actions/runs/42536920649 after `content:refresh` returned success and `check:release` failed. This is a distinct automation health concern.
- Draft PR #5 (https://github.com/ImAvichal/learningonline-ai/pull/5) holds the separate regional-price assertion fix and remains unmerged.
- The latest inspected production Vercel deployment remains READY on main commit `7195f6d`. The previous content preview for `6b2c201` was READY; the new content commit requires fresh CI and preview verification.
- Earlier dependency checks reported eight vulnerabilities (one critical); **no fresh dependency audit was run today**. Next.js 14.2.5 remains pinned in main. Release requires security remediation and independent functional verification.

## Changelog — 10 November (draft only)

1. `data/ai-landscape.js`: advance last-reviewed date to `2026-11-10`; update frontier example from Claude Fable 5.1 to Fable 5.2; add sourced announcement and a safe, measurable evaluation exercise.
2. `data/ai-landscape.js`: remove unverified absolute Gemini 2.5 automatic-reroute and Gemini preview-shutdown claims; replace with exact-model/platform verification advice. Preserve the confirmed OpenAI GPT-4 API snapshot retirement note.
3. `data/ai-landscape.js`: add Anthropic's 9 November announcement to the primary-source register.
4. `docs/content-review-2026-11-10.md`: document sources, uncertainty, scope, release checks and outstanding issues.

**Targeted static assertions before commit:** 8 passed (review date, new model, source URL, removed two unverified absolutes, exports retained, no commercial terms, changed content). These do not replace CI/build, dependency audit, end-to-end tests, accessibility, authenticated learner journeys, or complete link crawling.

## NEXT / release hold

1. Verify the new draft commit's Quality Gate and Vercel preview. Do **not** merge or publish on a green preview alone.
2. Fix the regional-price release-check assertion in a separately reviewed change; address vulnerable dependencies and Next.js support.
3. Update the retiring Claude worker model and API parameters in a separate engineering PR with fail-closed diagnostics and generated-content validation.
4. Complete full internal/external link crawl; marketing-claim substantiation; auth/RLS, checkout, entitlement, email-privacy, accessibility and browser regression checks; verify production stability.

**No pricing, entitlements, customer records, customer emails, merge or production deployment were changed by this review.**
