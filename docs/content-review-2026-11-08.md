# LeO AI content review — 8 November 2026

**Last reviewed:** 8 November 2026 (Australia/Sydney).  
**Status:** Content-only changes committed to draft PR #4; not merged or published.  
**Release decision:** HOLD until security, CI and authenticated production-stability checks pass.

## New, verified primary-source developments

1. **4 November — GPT Image 2.6.** OpenAI's API changelog announces GPT Image 2.6 Sunburst and Flare. Its image guide documents SVG and animated GIF output, markup-guided edits and complexity settings. The AI landscape now suggests a bounded, practical evaluation exercise: compare outputs and check text accuracy, accessibility, permissions and editability. This is educational guidance, not a claim of guaranteed quality or universal model availability.  
   Primary sources (reviewed 8 November): https://developers.openai.com/api/docs/changelog ; https://developers.openai.com/api/docs/guides/image-generation

2. **5 November — GPT-6-Cyber.** OpenAI's API changelog lists a specialised cyber model for authorised security work. The curriculum now distinguishes specialised defensive capabilities from general-purpose models and emphasises approved scope, isolated environments, logging and human review.  
   Primary sources (reviewed 8 November): https://developers.openai.com/api/docs/changelog ; https://developers.openai.com/api/docs/models/gpt-6-cyber

3. **API parameter migration warning.** Anthropic's model-deprecation documentation states that `temperature`, `top_p` and `top_k` are removed in API version `2026-10-21`, with additional incompatibilities for non-default settings on newer models and earlier API versions. The course now tells learners to test request parameters as well as model IDs. This is directly relevant to the repository's `scripts/content-refresh.mjs`, which still sets `temperature: 0` and defaults to the retiring `claude-sonnet-4-5`. No script change was made in this content-only PR.  
   Primary source (reviewed 8 November): https://platform.claude.com/docs/en/about-claude/model-deprecations

4. **Retirement reminder.** Anthropic lists 30 November 2026 for `claude-sonnet-4-5-20250929`, recommending `claude-sonnet-5-5` on Anthropic-operated platforms. Test a replacement before changing a scheduled production job.  
   Primary source (reviewed 8 November): https://platform.claude.com/docs/en/about-claude/model-deprecations

## Website, marketing and links — sampled review

- The public homepage, model-selection page, privacy page and terms page were retrievable in the reader, but snapshots were cached (not a verified live browser crawl).
- The public model-selection snapshot still includes Q1 2025 model comparisons, a fixed AUD conversion and an unsupported assertion that most organisations use models 10× more expensive than necessary. Draft PR #4 contains corrected copy, **not deployed**.
- The public homepage describes the Parents & Caregivers track as nine modules while the course configuration calls them nine lessons; align terminology after reviewing actual learner navigation.
- The privacy-policy snapshot still refers to subscriptions, billing intervals and renewals, while terms and homepage advertise one-time payments. Confirm actual payment/entitlement behaviour and obtain legal review before changing policy or customer-facing promises.
- Official source URL samples retrieved: OpenAI API changelog, OpenAI image-generation guide, Anthropic model deprecations, NIST AI RMF, IEA Energy and AI.
- `/preview`, `/choose-ai`, `/glossary`, `/parents` and `/roadmap` could not be conclusively fetched by the reader (cache miss or unexpected status). **Not confirmed broken**; require a browser/HTTP link crawl. Google's official Gemini deprecations page returned an unsupported Markdown content type in the reader; the previously drafted Gemini 2.5 reroute claim was **not independently reverified today**. Do not present this as a new confirmation.

Public sample URLs: https://www.learningonline.ai/ ; https://www.learningonline.ai/model-selection ; https://www.learningonline.ai/privacy ; https://www.learningonline.ai/terms

## Changelog — content only

1. Advanced `LANDSCAPE_LAST_REVIEWED` from `2026-11-07` to `2026-11-08`.
2. Added three sourced `CURRENT_AI_SHIFTS` entries: image-generation capabilities, specialised-model governance, and API request-parameter compatibility.
3. Added OpenAI's official changelog and image-generation guide to `PRIMARY_REFRESH_SOURCES`.
4. Added this dated review record; left prices, entitlements, authentication, checkout, customer data, mailers, CI and production settings unchanged.

## CI, security and release gates

- Previous PR #4 commit `857a24c` had a failed GitHub Quality Gate run #42296211586: `npm ci` passed, `npm run check:release` failed, and `npm run build` was skipped. The separate Unicode-price assertion correction remains in draft PR #5. New commit CI status must be checked independently.
- Production Vercel alias `www.learningonline.ai` was inspected and still served main commit `7195f6d` at review time. Preview success is not a production release.
- Main still pins Next.js 14.2.5. Prior audits reported dependency vulnerabilities; **a new dependency audit was not run in this review**.
- Required before merge/publish: passing dependency/security audit, quality gate, application build, Playwright smoke/journey/payment tests, auth/RLS and entitlement regression checks, email-privacy checks, browser accessibility and link crawl, and production stability verification.
- Engineering follow-up outside content-only scope: retire old Claude default, remove unsupported generation parameters after compatibility tests, fail clearly when credentials/source fetches are missing, and validate AI-generated code before writes.

**No PR merged, no deployment promoted, no prices/entitlements/customer data changed, and no customer emails sent.**
