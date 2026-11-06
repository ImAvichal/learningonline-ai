# LeO AI content review — 6 November 2026

**Last reviewed:** 6 November 2026 (Australia/Sydney)  
**Status:** Content changes committed to draft PR #4; not merged or published.  
**Release decision:** HOLD pending security, CI, authenticated flows and production-stability verification.

## Verified model lifecycle change — Claude Sonnet 4.5

Anthropic's primary model-deprecations table lists `claude-sonnet-4-5-20250929` as **deprecated since 30 September 2026**, with a **30 November 2026** retirement date and `claude-sonnet-5-5` as the recommended replacement. The date is specific to Anthropic-operated platforms; partner-operated providers can differ.

**Repository-specific risk:** `scripts/content-refresh.mjs` currently defaults to `claude-sonnet-4-5` when `CONTENT_REFRESH_MODEL` is unset. Confirm whether that alias resolves to the retiring model, then migrate the scheduled content-refresh job to an explicitly supported model and validate response format, token limits, API parameters and quality. This is an engineering change, not part of this content-only PR.

Primary source: https://platform.claude.com/docs/en/about-claude/model-deprecations (checked 6 November 2026).

## AI safety lesson improvement

Added guidance that retrieved documents, websites and tool outputs can contain malicious instructions. Teach learners to treat these as untrusted data, constrain tool permissions, test adversarial prompts and require human review for consequential decisions.

Primary source: https://developers.openai.com/api/docs/guides/safety-best-practices (checked 6 November 2026); supporting risk-management framework: https://www.nist.gov/itl/ai-risk-management-framework.

## Model lifecycle verification limits

The Google Gemini deprecations endpoint redirected to a page that could not be fetched by the review reader on 6 November. Search caches showed conflicting older snapshots for stable Gemini 2.5 Pro/Flash. **Do not infer or newly assert a Gemini 2.5 retirement or automatic reroute from those caches.** The 5 November claim in the draft landscape needs direct current-source confirmation before production publication. Do not treat the inability to retrieve the page as proof that Google's link is broken.

OpenAI's deprecations page was retrieved successfully; the 30 November Evals, Agent Builder and reusable-prompts notices remain present: https://developers.openai.com/api/docs/deprecations.

## Live-site sampling and marketing review

Public pages successfully retrieved: homepage, terms, privacy and model-selection. The /preview and /choose-ai routes returned **reader cache misses**, which do not prove broken links. Full automated HTTP link crawl and authenticated lesson checks are still outstanding.

**Customer-facing inconsistency remains:** the live privacy policy refers to subscriptions, billing intervals and renewals; the homepage and terms describe one-time purchases. Verify actual Stripe/entitlement operations and obtain legal review before changing the privacy or commercial terms.

**Outdated live marketing content remains:** the model-selection page still shows a Q1 2025 model comparison, fixed AUD conversion, an unsupported 10× model-cost assertion and unverified cost-savings/accuracy figures in the retrieved snapshot. Corrections are in draft PR #4, not production.

## Changelog — content-only

1. Advanced `LANDSCAPE_LAST_REVIEWED` from 2026-11-05 to 2026-11-06.
2. Added the Anthropic Sonnet 4.5 retirement and model migration testing guidance.
3. Added prompt-injection, scoped permissions, human approval and source-validation guidance.
4. Added primary Anthropic deprecation and OpenAI safety documentation URLs.
5. Added this review record; did **not** modify prices, entitlements, customer data, authentication, checkout, email sending or deployment settings.

## Release blockers and next checks

- Main still pins `next@14.2.5`; security upgrade and dependency audit are outstanding.
- Separate draft PR #5 contains the regional-price release-check correction; content PR #4 has not integrated it.
- Run CI release assertions and build, Playwright smoke/parents-journey/payment tests, authenticated access and email-privacy checks.
- Crawl all internal/external content links and verify public preview routes in a browser.
- Verify actual operational refund, invoice, updates and one-time-payment promises before editing legal or commercial copy.
- Confirm current Gemini 2.5 lifecycle using Google's directly accessible canonical docs before publishing that specific claim.

**No PR merged; no production deployment; no customer emails sent.**
