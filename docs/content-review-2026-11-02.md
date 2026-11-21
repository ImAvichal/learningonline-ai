# LeO AI content review — 2 November 2026

**Last reviewed:** 2 November 2026 (Australia/Sydney).
**Status:** Draft-only updates to content PR #4. Not merged or published to production.
**Scope:** Teaching examples, sustainability guidance, model lifecycle notices, source-link maintenance. No pricing, authentication, entitlements, customer data, payment, marketing emails or production settings changed.

## Changelog (proposed; not deployed)

1. Removed unsupported 20/80 adoption and 90% stalled-program claims. Recast a government-agency case as explicitly hypothetical instead of implying an observed client outcome.
2. Replaced an unsourced “10×” production data-fix cost multiplier and “2–4 months saved” claim with qualified advice to measure the learner's own baseline.
3. Replaced unverified GPT-4 training electricity (50+ GWh), AI-versus-search inference (10×), and attributed GPT-4 water-consumption (700,000 litres) figures. Teach that energy and water impacts depend on the workload, hardware, infrastructure and methodology. Primary background: International Energy Agency, *Energy and AI*, 10 April 2025, https://www.iea.org/reports/energy-and-ai .
4. Recast a 95% straight-through invoice-processing outcome as an illustrative workflow whose results require measurement.
5. Rewrote the accent-sensitive transcription quiz to distinguish evaluated group-level accuracy from per-output confidence, avoid unsupported accuracy percentages and require representative testing plus human review.
6. Added dated OpenAI API retirement notices to `data/ai-landscape.js`: reusable prompts **30 Nov 2026**; selected older image models **1 Dec 2026**; specified GPT-5 and o3 API snapshots **11 Dec 2026**; selected text-to-speech models **6 Jan 2027**. Note that migration to `gpt-realtime-2.1-mini` requires switching to the Realtime API; it is not a drop-in replacement on `/v1/audio/speech`. Source: https://developers.openai.com/api/docs/deprecations and https://developers.openai.com/api/docs/guides/text-to-speech .
7. Updated `LANDSCAPE_LAST_REVIEWED` to **2026-11-02** (draft branch only) and added the IEA report to primary reference sources.
8. Replaced an outdated Claude prompting-doc URL with its observed canonical destination: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview .

## Verified vendor context

- Google's Gemini API deprecations page lists **17 Nov 2026** as the earliest shutdown date for `gemini-3.1-flash-tts-preview` and `gemini-3.1-flash-live-preview`. Its note says listed dates are the *earliest possible* retirement dates; do not overstate them as guaranteed precise cutoff dates. https://ai.google.dev/gemini-api/docs/deprecations
- OpenAI's 14 Oct 2026 notice lists **14 Jan 2027** shutdowns for specified GPT-4o/GPT-4.1 API snapshots. This does not mean all GPT-4-named services stop working. https://developers.openai.com/api/docs/deprecations
- Claude's old prompting documentation redirects to its current platform documentation. https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
- OAIC guidance supports minimising disclosure of personal information to commercially available AI systems, evaluating privacy risks and maintaining appropriate oversight. https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products

## Review / validation evidence

- Read the current `main` files and the existing content branch; this branch is ahead of main and contains only content/doc changes.
- Source-text checks confirmed removal of the targeted unsourced figures and inclusion of the new date notices; checked that the draft review date is 2026-11-02.
- Extracted **86 unique absolute URLs** from the five reviewed content files (93 occurrences); **not a full link crawl**.
- Spot-checked seven external references via public web retrieval: Claude prompt docs (redirects successfully), Gartner article, Gartner reprint PDF, McKinsey article (redirects successfully), NIST AI RMF, OAIC guidance all retrieved; one Agility-at-Scale page could not be fetched by the reader (inconclusive, not confirmed broken).
- The live homepage and model-selection guide were publicly readable, but `/preview` was not retrievable by the reader. No authenticated browser or checkout testing was performed.
- GitHub CI and Vercel preview must be checked for the latest commit before release; source-text checks are not a build or security test.

## Release blockers / next actions

1. Main pins `next@14.2.5` and has previously reported critical dependency vulnerabilities. Security patching, dependency audit and regression testing are outstanding.
2. The content branch's Quality Gate has been blocked by a regional currency assertion; its proposed correction remains in separate PR #5. Do not change prices to satisfy the check.
3. Verify signup/profile RLS, Google OAuth, paid entitlements, checkout, Stripe webhooks, email recipient isolation, mobile accessibility and the full link set.
4. Reconcile public one-time-payment claims with subscription/renewal language in the privacy policy and verify any 12-month-update/refund promises operationally before editing legal text.
5. Harden `scripts/content-refresh.mjs` so missing credentials/source retrieval do not silently report success and AI-produced code is not automatically trusted. Keep all generated changes review-only.

**Release decision: HOLD.** No merges, production deployments, price/entitlement changes, customer-data changes or customer emails were made.
