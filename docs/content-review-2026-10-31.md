# LeO AI content review — 31 October 2026

**Last reviewed:** 31 October 2026 (Australia/Sydney).  
**Status:** Draft changes only, appended to the existing content-only PR #4. Not merged or published.  
**Scope:** `pages/glossary.js` and `data/ai-landscape.js`; no pricing, access, authentication, customer data, email or infrastructure changes.

## Changelog — proposed, not deployed

1. **AI model retirement notice:** Added a dated, primary-source-backed watch item to the AI landscape: OpenAI's 14 October 2026 announcement schedules selected GPT-4o and GPT-4.1 API snapshots to shut down on **14 January 2027**; Google's Gemini 3.1 Flash TTS preview is scheduled to shut down on **17 November 2026**. These are API-specific deadlines, not claims that all consumer products or model families are discontinued. Added official deprecation-page links.
2. **Model examples:** Refreshed small/fast examples to include Gemini 3.5 Flash-Lite and GPT-6 Luna. Removed a less clearly available Claude Mythos example from the main frontier list while retaining the officially documented Claude Fable 5.1.
3. **Glossary accuracy:** Revised **32** entries/fields to remove unsupported performance figures, productivity guarantees, blanket cost savings and unlabelled anecdotes. Examples include a claimed 99.2% defect-detection accuracy, 80%-for-5% fine-tuning savings, zero-hallucination RAG, 85–92% universal accuracy thresholds, 40–70% data-cleaning effort, and 20/80 technology/change-management split.
4. **Safety and transparency:** Clarified that RAG does not eliminate hallucinations; model confidence scores are not a substitute for calibrated evaluation or human oversight; AI memory may persist across chats depending on product settings; and high-impact decisions require risk-based review.
5. **Review timestamp:** Updated the AI landscape's last-reviewed date to 31 October 2026. The website remains unchanged until PR review, tests and release approval.

## Primary sources verified

- OpenAI current API model catalogue: https://developers.openai.com/api/docs/models
- OpenAI API deprecations (announcement dated 14 October 2026): https://developers.openai.com/api/docs/deprecations
- Claude model overview: https://platform.claude.com/docs/en/models/overview
- Google Gemini models: https://ai.google.dev/gemini-api/docs/models
- Google Gemini deprecations: https://ai.google.dev/gemini-api/docs/deprecations
- NIST AI Risk Management Framework and Playbook: https://www.nist.gov/itl/ai-risk-management-framework
- OpenAI memory feature documentation: https://help.openai.com/en/articles/8590148-memory-in-chatgpt

## Validation and limitations

- Content edits confined to two non-sensitive JavaScript data/presentation files; no changed API, payments, entitlement or email code.
- Existing draft PR #4 already contains a broader content refresh; these corrections extend it rather than opening a conflicting PR.
- Source pages above were accessible in this review. **A full live-site internal/external link crawl was not completed**; search-engine caches for some public pages are stale, and some deep links could not be fetched through the available public reader. No claim that all links are healthy.
- GitHub Actions status and Vercel preview must be checked against the latest commit after the edits. A successful preview build alone is not an auth, payment or security regression pass.
- Outstanding engineering issues on `main`: `next@14.2.5` dependency/security findings, brittle release check (draft PR #5), and content refresh script silently skipping when API credentials are absent. These are outside this content-only PR.
- **Release gate:** do not merge or deploy without dependency remediation, CI, authentication/RLS, payment, email privacy and production-stability verification.

## Next content review

Continue the remaining 16-module curriculum for unsourced numerical case studies, privacy and agent security examples, high-stakes decision guidance, and misleading marketing promises. Verify refund/invoicing and ongoing-update claims operationally before representing them as guarantees.
