# LeO AI content and launch-readiness review — 2026-11-23

Last reviewed: **2026-11-23 (Australia/Sydney)**. **DRAFT DOCUMENTATION ONLY — NOT DEPLOYED.**

## Verified changes and findings

1. **Correction to the 22 November audit: public refund wording is seven days, not three days.** The live /contact page says “Our 7-day policy applies (7 days from purchase)” and its footer says “7-day refund policy”; the homepage likewise advertises a “7-Day Money-Back Guarantee.” The previous audit's assertion that live /contact says three days/72 hours is not supported by the 23 November live page. This does not establish the legally approved policy; review /terms and operational refund handling before any copy change. The draft contact confirmation must not claim a confirmation email was sent without endpoint verification.
   - https://www.learningonline.ai/contact
   - https://www.learningonline.ai/
   - https://www.learningonline.ai/terms
2. **Commercial inconsistency persists.** Live /contact calls Journey $19/month and Pro $39/month, whereas live homepage calls the Australian Journey and Pro offers $149/$299 one-time purchases. Preserve existing recurring customers and billing; obtain approved mapping before content-only edits.
   - https://www.learningonline.ai/contact
   - https://www.learningonline.ai/
3. **Model selection is outdated in production.** The public guide is explicitly “Updated Q1 2025” and recommends GPT-4o, Claude 3.5, Gemini 1.5 with static AUD conversion (1.55×), 10× cost assertion and numerical savings presented as outcomes. These must be dated historical illustrations or replaced with source-linked model evaluation exercises.
   - https://www.learningonline.ai/model-selection
4. **Draft model catalogue verification:** Google's current official catalogue explicitly lists `gemini-4-argon` and `gemini-3.8-flash`. Anthropic's current official catalogue explicitly lists `claude-opus-5-5`, `claude-sonnet-5-5`, and `claude-haiku-5-5`. Their presence in the draft as marketing names is not proof of account API access or that all listed capabilities, pricing or regions are available. OpenAI's official changelog references GPT-6.2; the draft uses GPT-6 Astra / GPT-6.1 Sol / GPT-6 Luna and should not label these as tested callable API IDs until verified against exact official model identifiers.
   - https://aistudio.google.com/docs/models
   - https://platform.claude.com/docs/en/models/overview
   - https://developers.openai.com/api/docs/changelog
   - https://developers.openai.com/api/docs/models
5. **Safety and practical exercises:** Prefer synthetic support tickets and documents, source-grounding, hallucination checks, prompt-injection handling, human review, privacy and deployment-specific residency controls. Mark any cost model as hypothetical with output tokens, retries, caching, labour and FX assumptions.
   - https://www.nist.gov/itl/ai-risk-management-framework
   - https://developers.openai.com/api/docs/guides/safety-best-practices

## Changelog

- **2026-11-23:** Corrected the prior audit's unsupported 3-day public refund assertion; confirmed 7-day live wording, persistent subscription-copy conflict, dated Q1 2025 model guide, and official current Google/Anthropic model IDs. Documented bounded curriculum and safety follow-up. **Documentation only.**
- **2026-11-22:** Prior audit flagged refund copy, marketing consistency and model identifiers; its live refund duration claim is superseded by this review.

## Proposed bounded work (not executed)

- Verify /terms and approved commercial/refund rules; prepare only accurately scoped customer-facing copy corrections, without altering policy, prices, subscriptions or entitlements.
- Replace stale model and unsupported ROI recommendations with dated source links, clear hypothetical cost exercises and synthetic evaluation worksheets.
- Run complete link crawl, build, release validation, dependency security, auth/payment/entitlement and Playwright regressions before owner-approved merge.

## Release state

Draft PR #4 remains under review; engineering release gate PR #5 is separate. No full link crawl, local build, Playwright suite or checkout/entitlement regression was executed in this run. **No merge, production publication, billing, customer-data or customer-email actions.**
