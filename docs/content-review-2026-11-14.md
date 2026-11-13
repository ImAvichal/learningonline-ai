# LeO AI content review — 14 November 2026

**Last reviewed:** 2026-11-14 (Australia/Sydney)  
**Status:** documentation-only audit; NOT merged, NOT deployed. Release HOLD.

## DONE — direct repository and primary-source checks
- GitHub PR #4 remains open and draft at `ffb88a5bd8436fbb34e3dedefb7e25b69f5451d0`. Its file inventory is confined to `data/ai-landscape.js`, `data/modules.js`, `pages/glossary.js`, `pages/model-selection.js`, `pages/preview.js` and review documentation.
- PR #5 remains open and unmerged. Main branch remains at `7195f6d772c1b07711dd4a5145b3a05b004e220c`.
- Latest observed PR #4 Quality Gate run [43311784945](https://github.com/ImAvichal/learningonline-ai/actions/runs/43311784945), created 2026-11-12 21:35 UTC: `npm ci` succeeded; `npm run check:release` failed; `npm run build` was skipped. This does **not** establish a successful build.
- [Google Gemini API deprecations](https://ai.google.dev/gemini-api/docs/deprecations) has inconsistent indexed locale/snapshot versions: one English version lists no shutdown announced for stable Gemini 2.5 Pro/Flash, while Chinese and Indonesian indexed versions list 16 October 2026. Do not teach an unqualified shutdown or automatic migration date. Require exact platform/model and a live vendor confirmation before claiming a deadline.
- [Anthropic model deprecations](https://docs.anthropic.com/en/docs/about-claude/model-deprecations) should remain the canonical reference for Claude lifecycle assertions.
- Public https://learningonline.ai could not be retrieved via the available reader (internal error); this is **not** proof of outage or a broken link.

## PROPOSED — bounded follow-ups
1. Verify checkout billing truth against public contact, homepage, terms and actual checkout before correcting monthly-versus-one-time marketing text. **Never alter price configuration or entitlements.**
2. Review remaining AI model references, practical examples, prompt-injection safeguards, privacy and human-approval examples against primary sources. Avoid unsourced benchmark/ROI promises.
3. Perform a full internal/external link crawl in a browser; do not classify reader cache/retrieval errors as broken URLs.
4. Prepare a separate engineering PR for content-refresh model compatibility and for release-check repair; neither belongs in the content-only PR.

## BLOCKED — release gates
- PR #4 Quality Gate failure; build skipped.
- No completed full authenticated learner-flow, checkout, entitlement, email-privacy, accessibility, security/dependency and browser regression evidence.
- Public site retrieval inconclusive; production deployment verification unavailable from this audit.

## NEXT
Re-run PR CI after separately reviewing the release-gate fix; resolve security findings and verify staging against production-critical workflows before considering merge or publish. Keep all changes in draft.

## Changelog
- **2026-11-14:** Added documentation-only source/CI verification and recorded contradictory Google deprecation snapshots. No curriculum or operational code changes. No merge, publish, price, entitlement, customer-data or email actions.
