# LeO AI content and early-launch review — 2026-11-22

Last reviewed: **2026-11-22 (Australia/Sydney)**. **DRAFT ONLY — NOT DEPLOYED.**

## Confirmed findings and sources

1. **Refund-policy conflict in the pending content branch (new high-priority finding).** The draft `pages/contact.js` confirmation shown after a refund request says "within the 7-day policy"; the public contact page says **3-day / 72-hour** refund policy. The draft also claims a confirmation email was sent, which must be tested against the actual contact endpoint before release. Treat the approved Terms & Refund Policy and actual support process as the source of truth. Do not change the refund period or customer entitlements based on this audit alone.
   - Draft: https://github.com/ImAvichal/learningonline-ai/blob/content/2026-10-30-model-freshness/pages/contact.js
   - Public: https://www.learningonline.ai/contact
2. **Current public commercial copy remains inconsistent.** Public contact says Journey **$19/month** and Pro **$39/month**, while the published Australian homepage and live Stripe one-time prices reflect A$149/A$299 one-time purchases. Legacy recurring prices/subscriptions also exist. Obtain approved offer mapping and retain existing subscription terms; only then prepare copy-only corrections.
   - https://www.learningonline.ai/contact
   - https://www.learningonline.ai/
3. **Model-selection content is still outdated in production.** Main `pages/model-selection.js` hardcodes GPT-4o, Claude 3.5 Sonnet, Gemini 1.5, static USD/AUD costs and unsubstantiated savings and ROI, including 18,450% ROI and unsupported RAG quality differences. The draft branch replaces some models but currently includes **GPT-6 Astra / GPT-6.1 Sol / GPT-6 Luna**: verify each exact public API model ID against official catalogue and project access before using them in learner-facing examples. Do not equate consumer product labels with callable API IDs.
   - https://github.com/ImAvichal/learningonline-ai/blob/main/pages/model-selection.js
   - https://github.com/ImAvichal/learningonline-ai/blob/content/2026-10-30-model-freshness/pages/model-selection.js
   - https://developers.openai.com/api/docs/changelog
   - https://developers.openai.com/api/docs/models
   - https://ai.google.dev/gemini-api/docs/models
   - https://docs.anthropic.com/en/docs/about-claude/models
4. **Safety and teaching recommendation:** Use synthetic support-ticket and document examples; compare factual accuracy, groundedness, hallucinations, prompt-injection resistance, latency, total cost and human-review requirements. Make privacy, retention, residency and tool permissions provider/deployment-specific, never categorical.
   - https://developers.openai.com/api/docs/guides/safety-best-practices
   - https://www.nist.gov/itl/ai-risk-management-framework
5. **Deployment gate unchanged:** Vercel production still reports main SHA `7195f6d772c1b07711dd4a5145b3a05b004e220c`; draft PR #4 remains separate. Earlier release-validation failure, dependency/security and live auth/payment/entitlement tests prevent merging or publishing. No full link crawl, build, Playwright or checkout test was executed in this run.
   - https://github.com/ImAvichal/learningonline-ai/pull/4
   - https://github.com/ImAvichal/learningonline-ai/pull/5

## Changelog

- **2026-11-22:** Added newly identified 7-day versus 3-day refund copy discrepancy in draft branch; flagged unverified email confirmation claim and exact model API identifiers; refreshed production deployment and release hold. **Documentation only.**
- **2026-11-21:** Prior audit recorded one-time versus legacy recurring Stripe distinction and early-launch access/security gates.

## Proposed bounded changes, subject to approved terms

- Correct draft refund-confirmation wording only after validating approved policy and email behavior; avoid any alteration to refund policy itself.
- Replace unsupported numerical savings/ROI with labelled hypothetical exercises and calculation methodology.
- Replace hardcoded model recommendations with dated official links and tested API IDs; include safety/privacy checks.
- Run link crawl, build, release check, security and entitlement regressions before owner-authorized merge.

**No price, subscription, entitlement, customer-data, email, merge or deployment changes were made.**
