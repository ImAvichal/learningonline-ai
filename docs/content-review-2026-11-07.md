# LeO AI content review — 7 November 2026

**Last reviewed:** 7 November 2026 (Australia/Sydney).  
**Status:** Content-only updates committed to draft PR #4; not merged or published.  
**Release decision:** HOLD pending dependency/security, CI, authenticated flow and production stability verification.

## Verified primary-source update

OpenAI's official API deprecations page lists a new **5 November 2026** notice: `gpt-5.5-cyber-preview` is deprecated and scheduled for API shutdown on **1 February 2027**. This is a specialised preview model, **not** a retirement of the entire GPT-5.5 family. OpenAI recommends migration to the most capable cyber model available to the customer, rather than naming a universal drop-in replacement. The same page documents the optional `shutdown_date` field on the List/Retrieve model APIs and shorter notice for preview models. Educational guidance should teach a tested fallback and task-specific migration validation, not automatic equivalence.

Primary source, reviewed 7 November: https://developers.openai.com/api/docs/deprecations

Anthropic's canonical deprecations table was rechecked: `claude-sonnet-4-5-20250929` remains deprecated with a **30 November 2026** retirement and `claude-sonnet-5-5` as recommended replacement on Anthropic-operated platforms. The repository's `scripts/content-refresh.mjs` still defaults to `claude-sonnet-4-5`; remediation requires a separate engineering change and testing. Primary source: https://platform.claude.com/docs/en/about-claude/model-deprecations

**Unresolved source verification:** Google's Gemini deprecations page redirected to Google AI Studio and the reader rejected its Markdown content type on 7 November. The draft 5 November Gemini 2.5 automatic-reroute claim was **not independently reverified today**. Do not treat a failed reader fetch as a broken website, or the existing claim as newly verified. Confirm directly before publishing.

## Public website sample and marketing review

- Homepage was retrieved (reader snapshot from 2 November). It advertises **one-time payments**, **12 months of updates**, an **itemised tax invoice by email**, and a **7-day refund**. These are operational promises requiring Stripe, entitlement, email and refund-process verification.
- Privacy page was retrieved (older cached snapshot). It refers to **subscriptions, billing intervals and renewals**, conflicting with the homepage and terms' one-time-payment language. Obtain operational and legal confirmation before editing the policy.
- Model-selection page was retrieved (older cached snapshot). It still shows **Q1 2025** prices/models, a fixed AUD conversion, and unsupported **10× / 94% / 99%** savings or routing claims. Corrected copy is in draft PR #4, not verified live.
- Terms page retrieved (cached snapshot); it describes one-time purchases and no renewals.
- /preview and /choose-ai returned reader cache misses. **Not confirmed broken.** Full HTTP link crawl and authenticated page inspection are outstanding.

Sampled public URLs: https://www.learningonline.ai/ ; https://www.learningonline.ai/model-selection ; https://www.learningonline.ai/privacy ; https://www.learningonline.ai/terms

## Changelog — content only

1. Advanced `LANDSCAPE_LAST_REVIEWED` to `2026-11-07`.
2. Added a narrowly scoped, sourced preview-model retirement notice, including `gpt-5.5-cyber-preview` and the `shutdown_date` API field.
3. Added this dated audit record; did **not** change pricing, customer entitlements, authentication, checkout, customer data, email sending, or production settings.

## Validation and outstanding work

- Static review confirms the new model notice is within `CURRENT_AI_SHIFTS` and the export schema remains unchanged; full build/CI results must be checked separately.
- Main still pins `next@14.2.5`; dependency security remediation remains outstanding.
- The release-check Unicode price assertion correction is in separate draft PR #5.
- Complete dependency audit, Next.js upgrade review, CI build, Playwright smoke/parents/payment tests, authentication/RLS, email privacy and live link crawl before considering release.
- Verify the Gemini 2.5 lifecycle using directly readable Google primary documentation.
- Fix the scheduled refresh worker's old Claude default, silent skip on missing credentials, and generated-code validation in a separate engineering PR.

**Production unchanged; PR not merged; no customer email sent.**
