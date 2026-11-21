# LeO AI content review — 16 November 2026

**Last reviewed:** 2026-11-16 (Australia/Sydney)  
**Status:** Draft PR #4 only. NOT merged or deployed. Release HOLD.

## DONE
- Added a bounded practical model-eligibility exercise to `pages/model-selection.js`. Learners distinguish model catalogue listing from actual project generation access, make one safe test request, preserve redacted provider errors, and verify project/platform lifecycle separately. No customer data or API keys are used.
- Primary source: [Google staff explanation, 6 November 2026](https://discuss.ai.google.dev/t/gemini-2-5-flash-metadata-succeeds-but-generatecontent-returned-http-404-request-for-project-eligibility-clarification/197853); [Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations).
- Rechecked [OpenAI API changelog](https://developers.openai.com/api/docs/changelog): November image generation, authorised cyber and outbound SIP developments were already addressed in prior draft reviews; no duplicate update.
- Rechecked [Anthropic model retirement documentation](https://docs.anthropic.com/en/docs/about-claude/model-deprecations) and [Google Gemini deprecations](https://ai.google.dev/gemini-api/docs/deprecations?hl=en). Do not conflate provider platforms or claim an unsupported Gemini 2.5 shutdown date.
- Reviewed public [LeO AI homepage](https://www.learningonline.ai/) indexed snapshot; it advertises one-time purchases. Contact-page monthly-language discrepancy still needs live checkout verification.

## PROPOSED
- Verify commercial wording against real checkout settings before changing public copy. Continue systematic internal/external link crawl and curriculum examples, model comparisons, AI safety and unsupported ROI claim review.
- Separately review retiring/default model and request-parameter compatibility in `scripts/content-refresh.mjs` (engineering scope, not this content PR).

## BLOCKED
- Existing Quality Gate failures prevent release. A green build, security audit and authenticated learner, checkout, entitlement, accessibility and email-privacy regression evidence are required.
- Public-page indexed content is not a full live browser crawl. No broken link confirmed solely from retrieval errors.

## NEXT
- Inspect the CI run for this new commit, repair release checks separately in PR #5, remediate vulnerabilities and complete production-stability verification. Do not merge or publish until gates pass.

## Changelog
- **2026-11-16:** Added one sourced, static, content-only model-eligibility troubleshooting exercise and updated dated review record. Draft only; production unchanged.
