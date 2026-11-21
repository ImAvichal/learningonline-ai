# LeO AI content review — 19 November 2026

**Last reviewed:** 2026-11-19 (Australia/Sydney)  
**Status:** Documentation-only update on existing draft content branch / PR #4. NOT merged or deployed. Release HOLD.

## DONE
- Retrieved the public homepage successfully. It describes Starting the Journey ($149) and The Pro ($299) as one-time purchases, and the FAQ explicitly says neither is a subscription. This verifies the homepage's public wording, **not** actual Stripe checkout configuration. Source: https://www.learningonline.ai/
- Verified GitHub repository `ImAvichal/learningonline-ai` main's latest retrieved commit is `7195f6d`. PR #4's changed-file inventory contains `data/ai-landscape.js`, `data/modules.js`, reference/curriculum pages, and dated review documentation only. No pricing, customer, entitlement, checkout or email files in that PR inventory.
- OpenAI's current model release notes now list GPT-6.2 Astra and GPT-6.2 Sol in the API, with model identifiers `gpt-6.2-astra` and `gpt-6.2-sol`. The note has no explicit date heading for this entry, so record **observed 19 November**, not a fabricated launch date. The note describes Astra for complex coding/professional work and Sol for multimodal/tool workflows. Source: https://help.openai.com/en/articles/9624314-model-release-notes
- Google staff confirm model catalogue visibility and project eligibility can differ, and Gemini Developer API vs Cloud lifecycle dates can differ. Avoid a single universal Gemini 2.5 retirement claim. Sources: https://discuss.ai.google.dev/t/auth-key-can-list-models-but-generatecontent-returns-http-404-not-found-for-gemini-2-5-flash/180197 and https://discuss.ai.google.dev/t/deprecation-shutdown-date-for-gemini-2-5-pro-conflicting-information/183251

## PROPOSED
1. Add GPT-6.2 Astra/Sol to the dated model comparison with explicit API-vs-ChatGPT distinction, vendor-sourced capabilities, no fixed performance or price claims, and an exercise comparing quality, latency, cost, tool support and human review. First check for duplicates in draft curriculum.
2. Reconcile previously observed contact-page monthly payment language against actual checkout and the homepage's one-time wording before any commercial copy edit. **Do not change prices or entitlements.**
3. Audit outdated prompt/evals/Agent Builder exercises against OpenAI's November deprecation documentation, then change only affected lessons. Source: https://developers.openai.com/api/docs/deprecations
4. Complete a systematic internal/external link crawl and evidence inventory for outcome claims. Homepage successfully retrieved; this is not a full link audit.

## BLOCKED
- No verified successful current CI build, dependency security clearance, or full authenticated, checkout, entitlement, accessibility and email-privacy regression suite. Prior scheduled content refresh failed `check:release` and skipped automated PR creation: https://github.com/ImAvichal/learningonline-ai/actions/runs/43777893569
- Engineering changes to release validation and the refresh worker are outside content-only scope and require separate review.

## NEXT
- Inspect affected model-selection and lesson entries before making narrowly bounded content edits; avoid duplicating existing material.
- Resolve release checks and security vulnerabilities in separate engineering work, run preview and production-critical tests; do not merge/publish until verified.

## Changelog
- **2026-11-19:** Added sourced observation of GPT-6.2 Astra/Sol API models, confirmed public homepage one-time purchase wording and main commit, revalidated PR #4 content-only file scope, and retained Gemini lifecycle caution. Documentation only; no production edits.
