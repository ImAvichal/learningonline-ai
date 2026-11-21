# LeO AI content review — 3 November 2026

**Last reviewed:** 3 November 2026 (Australia/Sydney).
**Status:** Draft-only content updates in PR #4; not merged or published.
**Scope:** Current AI model/API lifecycle, accuracy of learning guidance, selected public-site claims and primary-source link verification. No pricing, entitlements, customer data, emails, authentication or production settings changed.

## Changelog — new proposed updates (not deployed)

1. Updated `LANDSCAPE_LAST_REVIEWED` from 2026-11-02 to 2026-11-03 in `data/ai-landscape.js`.
2. Added **1 December 2026** Gemini API migration warning: `gemini-2.5-pro` calls will automatically route to `gemini-3.8-flash`, and `gemini-2.5-flash` calls will route to `gemini-3.5-flash-lite`. Google warns of breaking API changes and different billing. Do not treat this as a simple, behaviour-preserving model rename. `gemini-2.5-flash-lite` is not included in the retirement. Source: https://ai.google.dev/gemini-api/docs/deprecations
3. Added **30 November 2026** OpenAI tooling retirements: Evals became read-only on **31 October 2026**, and its dashboard/API are scheduled to shut down on 30 November; Agent Builder is scheduled to shut down on 30 November (ChatKit remains available). This is distinct from the reusable prompts API retirement already noted. Source: https://developers.openai.com/api/docs/deprecations
4. Confirmed current model examples against official OpenAI, Claude and Google catalogues; no unsupported new model names were added. Sources: https://developers.openai.com/api/docs/models ; https://platform.claude.com/docs/en/models/overview ; https://ai.google.dev/gemini-api/docs/models
5. Rechecked the publicly indexed homepage. It still describes Parents & Caregivers as **9 practical modules** while the repository's tier description calls these **9 practical lessons**; retain this as a terminology consistency issue for a separate reviewed marketing change. The homepage also promises **12 months of updates**, **7-day refunds**, one-time billing and emailed tax invoices. These require operational/legal verification, not unsupported editorial changes.

## Safety and teaching implications

- For Gemini 2.5 Pro/Flash migrations, require regression evaluations using representative inputs, API parameter compatibility checks, safety checks and cost comparisons. Automatic rerouting can change results and spend.
- For Evals and Agent Builder migration examples, explain how to preserve evaluation datasets, test coverage, permission boundaries and human approval of consequential actions.
- Do not imply any shutdown affects all Gemini or OpenAI models. These are specific API models/products.
- Existing teaching guidance about hallucinations, privacy, representative testing and human oversight remains in the draft content from earlier reviews.

## Checks performed

- Read the existing 2 November changelog, the AI landscape content file, the main repository's package manifest, content-refresh script and homepage source.
- Verified all new retirement claims against official vendor pages. Official pages were accessible during review.
- Checked that the new content retains the existing JavaScript export names and does not touch tier prices or entitlement files (source-text checks, not an application build).
- Inspected Vercel preview status for the prior content commit: READY; no authenticated browser, checkout or security regression was performed.
- **Not a full link crawl.** A previously extracted 86-link inventory remains outstanding for exhaustive checks.

## Release blockers and next steps

1. Main still pins `next@14.2.5`; dependency remediation and a current audit are outstanding. Previous runs reported critical vulnerabilities.
2. The content branch's Quality Gate may fail the two currency-format assertions; the fix is isolated in PR #5 and must be integrated and retested without changing prices.
3. Verify production promises (refunds, tax invoices, 12-month updates) and resolve contradictory renewal wording in legal copy only after checking actual payment behaviour.
4. Run full build, security, authentication, entitlement, Stripe checkout/webhook, email privacy, accessibility and link regression checks on a protected preview.
5. Harden `scripts/content-refresh.mjs` against silent success when credentials or source retrieval are missing and avoid automatically trusting model-generated JavaScript.

**Release decision: HOLD.** Content changes are draft-only, not deployed.
