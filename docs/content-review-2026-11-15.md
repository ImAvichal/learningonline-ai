# LeO AI content review — 15 November 2026

**Last reviewed:** 2026-11-15 (Australia/Sydney)  
**Status:** documentation-only audit; NOT merged, NOT deployed. Release HOLD.

## DONE — primary-source and repository checks
- Reviewed draft PR #4 changed-file inventory: changes remain confined to `data/ai-landscape.js`, `data/modules.js`, `pages/glossary.js`, `pages/model-selection.js`, `pages/preview.js` and `docs/content-review-*.md`. No price, entitlement, checkout, customer or email files appear in this inventory.
- Inspected GitHub Actions run [43311784945](https://github.com/ImAvichal/learningonline-ai/actions/runs/43311784945): `npm ci` succeeded, `npm run check:release` failed, `npm run build` skipped. This is a historical run, not evidence that today's HEAD passed.
- **New useful primary-source clarification:** Google staff [explained on 6 November](https://discuss.ai.google.dev/t/gemini-2-5-flash-metadata-succeeds-but-generatecontent-returned-http-404-request-for-project-eligibility-clarification/197853) that `models.list` exposes the general catalog while Gemini 2.5 generation access is restricted to projects with prior usage. New workloads should consider `gemini-3.5-flash-lite` or `gemini-3.8-flash`. Therefore, teach learners that a listed model does not guarantee account/project generation eligibility; handle 404s by checking actual API response and access restrictions, not by assuming global retirement.
- Google's [Gemini API deprecation page](https://ai.google.dev/gemini-api/docs/deprecations) remains the canonical lifecycle reference; platform-specific and conflicting indexed snapshots preclude an unqualified Gemini 2.5 shutdown date.
- Reviewed the [OpenAI API changelog](https://developers.openai.com/api/docs/changelog): the visible November updates (GPT-6 Cyber, GPT Image 2.6, outbound SIP) were already covered in earlier draft reviews. No duplicate curriculum change proposed.
- Public https://learningonline.ai could not be retrieved through the available reader (internal error). Do not call this an outage or confirmed broken link.

## PROPOSED — bounded curriculum update (not yet committed)
Add a short practical example in model selection: call `models.list`, then make a safe minimal `generateContent` test with the exact model and project; record HTTP status and provider error, verify project eligibility and billing separately, and avoid exposing API keys. Differentiate catalog presence, model lifecycle and project access. Source: Google staff reply dated 2026-11-06 above.
Continue auditing outdated comparisons, unsupported ROI promises, agent permissions/prompt injection and public commercial wording; verify actual checkout before correcting monthly-versus-one-time claims.

## BLOCKED — release
- Most recently inspected Quality Gate failed; app build skipped. No verified green build or security/dependency clearance.
- Complete browser link crawl, authenticated learner journeys, checkout, entitlements, accessibility and email privacy regression evidence unavailable.
- No fresh production deployment verification from this run.

## NEXT
Prepare the small model-eligibility lesson change within draft PR #4 only after source-code context and tests are checked; rerun checks. Resolve the separate release-check and dependency issues before any merge or publication. No changes to prices, entitlements, customer data or email.

## Changelog
- **2026-11-15:** Documented Google's 6 November project-eligibility clarification and rechecked PR scope and historical CI. Documentation only; no curriculum, operational or production modifications.
