# LeO AI content review — 17 November 2026

**Last reviewed:** 2026-11-17 (Australia/Sydney)  
**Status:** Draft PR #4 only. NOT merged or deployed. Release HOLD.

## DONE
- Reviewed public homepage snapshot: https://www.learningonline.ai/ . One-time payment wording remains on the homepage; do not change prices or entitlements.
- Checked official OpenAI API changelog (https://developers.openai.com/api/docs/changelog): November 2 outbound SIP, November 4 image models, November 5 authorised cyber model are already covered in earlier draft content; no duplicate lesson added.
- Checked official Gemini API deprecations (https://ai.google.dev/gemini-api/docs/deprecations?hl=en) and Google staff platform-specific explanation (https://discuss.ai.google.dev/t/deprecation-shutdown-date-for-gemini-2-5-pro-conflicting-information/183251). Retrieved official listing states no shutdown date announced for stable gemini-2.5-pro and gemini-2.5-flash; do not teach a universal automatic migration date across Google API and Cloud.
- Verified draft PR #4 and draft PR #5 remain open and unmerged. PR #4 changed-file inventory remains confined to curriculum, reference pages and documentation.
- Investigated scheduled content refresh run 43777893569 (16 Nov UTC): npm ci and content:refresh succeeded, but check:release failed, preventing any automated content PR creation. This is an existing release gate blocker, not evidence of successful publication.

## PROPOSED
- Reconcile monthly-price language on contact page against live checkout and one-time-payment homepage before any copy edit; preserve all commercial settings.
- Complete systematic internal/external link crawl, practical AI safety and unsupported ROI/marketing-claim review.
- Fix release-check assertions in separately reviewed engineering PR #5 and migrate content-refresh worker model/API compatibility in separate engineering scope.

## BLOCKED
- No passing release gate or verified successful production regression suite. Security, authenticated learner, checkout, entitlement, accessibility and email-privacy checks remain outstanding.
- Public homepage retrieval is a web snapshot, not a complete authenticated live browser crawl; no broken link is inferred from a reader error.

## NEXT
- Inspect and resolve check:release failure; rerun CI and dependency audit; verify production-critical workflows and link crawl before any merge or deployment.

## Changelog
- **2026-11-17:** Added sourced audit and diagnosed scheduled content-refresh workflow failure. No curriculum edits today. Documentation-only draft; production unchanged.
