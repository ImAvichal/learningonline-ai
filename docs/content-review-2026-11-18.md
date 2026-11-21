# LeO AI content review — 18 November 2026

**Last reviewed:** 2026-11-18 (Australia/Sydney)  
**Status:** Documentation-only update on draft content branch / PR #4. NOT merged or deployed. Release HOLD.

## DONE
- Rechecked the existing PR #4 changed-file inventory: only `data/ai-landscape.js`, `data/modules.js`, curriculum/reference pages and dated review documents; no pricing, customer, checkout or entitlement files.
- Rechecked the 17 November review and confirmed prior model-retirement cautions remain appropriate. Google's Gemini Developer API deprecation page currently lists no announced shutdown date for stable `gemini-2.5-pro` or `gemini-2.5-flash`. Google staff clarify that API and Cloud platform schedules can differ. Sources: https://ai.google.dev/gemini-api/docs/deprecations?hl=en and https://discuss.ai.google.dev/t/deprecation-shutdown-date-for-gemini-2-5-pro-conflicting-information/183251
- Identified a new OpenAI API changelog entry dated **16 November 2026**: `omni-moderation-csam-latest` is available to approved organisations for prioritising potentially abusive image material for human review, with separate signals for potential AI-generated content. This is access-restricted and a specialised safety workflow, not a general classroom image-classification tool. Source: https://developers.openai.com/api/docs/changelog
- Identified upcoming **30 November 2026** OpenAI platform changes: `/v1/prompts` and reusable prompt objects deprecated; Evals dashboard/API/graders become read-only; Agent Builder deprecated. Migration paths differ by feature. Source: https://developers.openai.com/api/docs/deprecations
- Inspected scheduled refresh workflow run 43777893569: `npm ci` and `content:refresh` succeeded, `check:release` failed, and PR-creation steps were skipped. Source: https://github.com/ImAvichal/learningonline-ai/actions/runs/43777893569

## PROPOSED
1. Add a short, age-appropriate AI safety note: specialised child-safety classifiers are restricted to approved organisations; never upload sensitive or illegal imagery as a learner exercise; use benign synthetic examples and human escalation procedures instead.
2. Audit any lesson teaching OpenAI prompt objects, Evals API, or Agent Builder, and replace obsolete procedures with feature-specific current guidance. Avoid presenting deprecations as universal removal of all agent or evaluation capabilities.
3. Continue validating contact-page monthly pricing wording against actual checkout terms before editing marketing copy; do not alter prices or entitlements.
4. Complete full internal/external link crawl and claims inventory; no new broken links confirmed in this review.

## BLOCKED
- No verified passing release gate, security audit, full build or production-critical regression suite; no publication approval.
- No complete live authenticated crawl or checkout verification.
- Engineering repairs to release checks and content-refresh worker require separately scoped review, outside this content-only update.

## NEXT
- Search curriculum for deprecated OpenAI platform features and draft narrowly bounded examples where actually present.
- Resolve `check:release` in separate engineering scope, rerun CI, dependency checks and authentication/checkout/entitlement/accessibility/email-privacy tests.
- Keep draft PR unmerged until security and production stability are verified.

## Changelog
- **2026-11-18:** Added sourced documentation for the 16 November restricted safety-model announcement and 30 November OpenAI platform deadlines; rechecked Gemini retirement caveats and previously failing automation. No curriculum or production edits.
