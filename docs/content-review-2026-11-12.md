# LeO AI content review — 12 November 2026

**Last reviewed:** 12 November 2026 (Australia/Sydney).  
**Release decision:** HOLD. **Status:** draft PR #4 only; not merged or deployed.

## DONE — source verification and corrective draft edit

Rechecked the official Google Gemini API deprecations documentation. Indexed official versions are inconsistent:
- English documentation snapshot: stable `gemini-2.5-pro` and `gemini-2.5-flash` show **no announced shutdown date**; several audio preview models also show no shutdown date.
- Other official localized/cached snapshots show different retirement dates (including 16 October 2026 for stable 2.5 models). These conflict with the **1 December 2026 automatic-routing** and **17 November 2026 audio-preview** statements recorded in the 11 November draft.
- Google developer forum discussion dated 16–25 September 2026 notes that Gemini Developer API and Google Cloud Gemini Enterprise Agent Platform can have different lifecycle dates. Do not conflate platform-specific schedules.

**Editorial decision:** The conflicting evidence does not justify asserting a universal transition date or replacement billing rate. Updated `data/ai-landscape.js` to remove the two definitive deadline claims, explain the conflict, and teach model-ID/platform-specific verification and migration testing. Updated landscape last-reviewed date to **2026-11-12**. This supersedes the corresponding assertions in the 11 November review; historical review documents remain unchanged for auditability.

**Primary sources:**
- https://ai.google.dev/gemini-api/docs/deprecations?hl=en (English official table, indexed snapshot checked 12 November 2026)
- https://ai.google.dev/gemini-api/docs/deprecations?hl=zh-CN (official localized snapshot, conflicting dates)
- https://discuss.ai.google.dev/t/deprecation-shutdown-date-for-gemini-2-5-pro-conflicting-information/183251 (platform distinction, September 2026)

## PROPOSED — content and marketing follow-up

- Verify the live contact page's previously observed **$19/month** and **$39/month** wording against the actual checkout configuration and one-time-purchase terms. **Do not change prices or billing copy without commercial/legal confirmation.**
- Continue reviewing unsupported numerical outcomes, dated model comparisons, agent prompt-injection guidance, consent/privacy and human approval examples.
- Run a complete internal/external link crawl and authenticated learner journey; no new broken link is confirmed by this run.

## BLOCKED — release checks

- Public homepage retrieval through the current reader returned an internal error; this is **not evidence of an outage**.
- A new complete CI/security/checkout/auth/entitlement/accessibility verification was not obtained in this review. Previously observed failed regional currency assertions and dependency vulnerabilities remain **unresolved until independently rechecked**.
- `scripts/content-refresh.mjs` migration and safety checks require a separately scoped engineering change; no worker code was modified.

## Changelog — draft PR #4 only

1. `data/ai-landscape.js`: changed last-reviewed date to 12 November 2026.
2. Replaced definitive Gemini stable-model 1 December automatic routing claim with source-conflict and platform-specific verification guidance.
3. Replaced definitive Gemini audio-preview 17 November deadline claim with endpoint-specific verification guidance.
4. Added this dated review and source audit.

**No production deploy, merge, price, entitlement, customer-data, checkout, or email changes.**

## NEXT

Reconcile Google's canonical current lifecycle table and platform-specific release notes; verify PR #4 CI and preview; resolve PR #5 regional release assertions, dependency vulnerabilities and worker migration separately; complete authenticated browser and commercial/legal checks before any release.
