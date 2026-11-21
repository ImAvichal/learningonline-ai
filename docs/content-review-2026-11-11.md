# LeO AI content review — 11 November 2026

**Last reviewed:** 11 November 2026 (Australia/Sydney).
**Scope:** Public-site route sampling, live marketing copy, GitHub main and draft PR #4, primary AI provider documentation, latest available CI run.
**Release recommendation:** HOLD. Changes below are **committed only to draft PR #4**, not merged, published or deployed to production.

## New primary-source developments

### Google Gemini 4 Carbon — expanded access 10 November 2026

Google announced that Gemini 4 Carbon, previously available to selected defenders, became available to paying API developers and enterprises on **10 November 2026**. Google positions it for complex multi-step coding, long-horizon agents and scientific reasoning, while describing Gemini 4 Argon as the better default for most engineering and knowledge work. Access and introductory pricing vary by product and eligibility. Vendor benchmarks are not guaranteed customer results.

- https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/ (published 10 November 2026)
- https://blog.google/innovation-and-ai/technology/developers-tools/gemini-4-carbon-developers/ (published 10 November 2026)
- https://ai.google.dev/gemini-api/docs/deprecations (checked 11 November 2026; now lists `gemini-4-carbon` as released 10 November)

**Draft curriculum action:** Add Carbon to frontier examples and teach a synthetic-data comparison against Argon: quality, tool reliability, latency, cost per successful task and unsafe actions. No pricing tables changed.

### Confirmed Gemini 2.5 stable-model transitions — 1 December 2026

Google's official Gemini API deprecations page is now directly retrievable through its redirected documentation endpoint. It **explicitly lists**:
- `gemini-2.5-pro`: effective **1 December 2026**, API calls automatically route to `gemini-3.8-flash`, billed at replacement rates.
- `gemini-2.5-flash`: effective **1 December 2026**, API calls automatically route to `gemini-3.5-flash-lite`, billed at replacement rates.
- `gemini-2.5-flash-lite`: **no announced shutdown date**.

The official page warns about **breaking API changes** and labels shutdown dates as *earliest possible dates*. It also lists **17 November 2026** as the earliest shutdown date for specified Gemini 3.1 Flash TTS/Live and Gemini 2.5 audio preview model IDs, not for all Gemini audio services.

Primary source: https://ai.google.dev/gemini-api/docs/deprecations (redirects to https://aistudio.google.com/docs/deprecations; checked 11 November 2026).

**Correction to 10 November review:** Yesterday's documentation stated that the stable Gemini 2.5 transition could not be confirmed and omitted the preview deadlines. Today's direct official table supersedes that uncertainty. The draft landscape has been corrected. This is a documented source-resolution change, not evidence that a retirement was cancelled and reinstated.

## Teaching and marketing accuracy

- **Draft model-selection page:** Removed a meta-description that characterised hypothetical cost scenarios as real-world examples. Replaced unconditional claims that orchestration permits model swaps without code changes and that models should be A/B tested directly in production. Added migration testing, synthetic/approved evaluation data and vendor retirement tracking.
- **Confirmed live marketing mismatch, NOT edited:** The public contact page and main-branch `pages/contact.js` describe Starting the Journey as **$19/month** and The Pro as **$39/month**, while the live homepage and terms describe **one-time purchases**. These are conflicting published offers. No amounts, pricing, billing terms or entitlements were changed. A commercial/legal owner must confirm actual checkout and correct the copy in a separately authorised change.
- **Other live copy:** Homepage says Parents & Caregivers has 9 modules; pricing page says 9 lessons. Free preview still says 14 modules and shows an unsubstantiated $180K / 4% business example and a 3x project-success statistic; corrections are in draft PR #4.
- **Privacy policy:** Still describes subscriptions and renewals despite the one-time-payment terms. Requires operational and legal verification before editing.
- **Contact promise:** The page promises a reply within one business day; verify service capability before keeping this as a guarantee.

Live pages checked 11 November: https://www.learningonline.ai/ ; /model-selection ; /privacy ; /terms ; /preview ; /glossary ; /pricing ; /roi-calculator ; /contact ; /parents ; /ai-landscape. The public reader could retrieve most routes; /parents returned only an iframe and /ai-landscape could not be retrieved. These are **inconclusive retrievals, not confirmed broken links**. This is not a full authenticated browser crawl.

## CI, security and deployment

- PR #4 remains **draft/open** and PR #5 (regional currency-format release assertion fix) remains **draft/open**.
- The last fully inspected Quality Gate for PR #4 (run 42704166440) **failed** at `npm run check:release` on the India and Philippines Journey currency assertions. Nine other assertions passed; `npm run build` was skipped. This run predates today's commits.
- That run's `npm ci` reported **8 vulnerabilities (1 critical, 4 high, 3 moderate)**; main still pins Next.js **14.2.5**. No new dependency audit has been run as part of today's content-only change.
- Main-branch `scripts/content-refresh.mjs` still defaults to `claude-sonnet-4-5`, uses `temperature: 0`, silently exits successfully if its API key is missing or sources cannot be retrieved, and writes generated JavaScript with minimal validation. Anthropic's official retirement table lists Claude Sonnet 4.5 retirement on **30 November 2026** for Anthropic-operated platforms. A **separate engineering PR** is required; this content PR did not touch the worker.
- Security, authenticated course, checkout, entitlement, email privacy, accessibility, full link crawl, production stability and new-commit CI/build checks are still outstanding.

Primary source: https://platform.claude.com/docs/en/about-claude/model-deprecations (checked 11 November 2026).

## Changelog — draft PR #4 only

1. `data/ai-landscape.js`: update last-reviewed date to **2026-11-11**; add Gemini 4 Carbon availability, positioning and synthetic comparison exercise.
2. `data/ai-landscape.js`: replace yesterday's unconfirmed Gemini 2.5 lifecycle note with the now directly verified **1 December 2026** automatic-routing changes; add scoped **17 November 2026** preview audio deadlines and Google source links.
3. `pages/model-selection.js`: replace five misleading or overconfident teaching/marketing phrases; no prices or payment logic changed.
4. `docs/content-review-2026-11-11.md`: record primary sources, corrected facts, site sampling, release gates and unresolved marketing/legal inconsistencies.

**Validation performed:** exact-match checks before each file edit, reread of changed source after writes, and PR file-scope inspection. GitHub CI and deployment checks are separate and must pass before release. No merge, production publish, price/entitlement/customer-data changes or customer emails were performed.

## NEXT

Keep PR #4 as draft. Verify its new Quality Gate and preview, but do not publish on a green build alone. Resolve the currency assertion separately (PR #5), security vulnerabilities, retiring content-refresh worker, marketing/legal billing inconsistencies, and authenticated browser regression testing before a release decision.
