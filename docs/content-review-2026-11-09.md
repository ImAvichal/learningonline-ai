# LeO AI content review — 9 November 2026

**Last reviewed:** 9 November 2026 (Australia/Sydney).  
**Scope:** Content-only review of learningonline.ai and draft PR #4 against official AI platform documentation.  
**Release:** HOLD. All edits below are committed to a **draft** branch; not merged or deployed.

## Verified primary-source developments

1. **30 October — optional automatic review for eligible OpenAI Agents API projects.** OpenAI's changelog and automatic-review documentation confirm that `review: "auto_review"` can approve or deny supported requests. It is not a universal safety approval: it does not override network restrictions, requires a suitable environment, and may incur extra token charges. Added a practical supplier-payment approval exercise emphasising separate human authorisation for consequential actions.  
   Sources (checked 9 November): https://developers.openai.com/api/docs/changelog ; https://developers.openai.com/api/docs/guides/agents-api/sessions/approvals

2. **2 November — outbound GPT-Live SIP calling.** OpenAI's changelog and Live API session reference confirm outbound SIP calling via a telephony provider. The reference warns that retrying a timed-out request can create duplicate calls. Added a hypothetical appointment-reminder exercise covering contact permission, disclosure, data minimisation, escalation and idempotent retry handling. **No calls made.**  
   Sources (checked 9 November): https://developers.openai.com/api/docs/changelog ; https://developers.openai.com/api/reference/resources/live/methods/create

3. **Claude Sonnet 4.5 retirement still imminent.** Anthropic's deprecation table still lists 30 November 2026 for `claude-sonnet-4-5-20250929`, with `claude-sonnet-5-5` recommended. Its API version `2026-10-21` removes `temperature`, `top_p` and `top_k`. The production content-refresh script still defaults to `claude-sonnet-4-5` and sends `temperature: 0`. This is a separate engineering change, not authorised within the content-only PR.  
   Source (checked 9 November): https://platform.claude.com/docs/en/about-claude/model-deprecations

4. **No later OpenAI API changelog entry than 5 November was visible during this review.** Avoid adding speculative launches or retirement dates. Google's Gemini deprecation page returned an unsupported content type to the reader, so the previously drafted Gemini 2.5 reroute claim was **not independently reverified** on 9 November. Do not treat a retrieval failure as a confirmed change.  
   Source: https://ai.google.dev/gemini-api/docs/deprecations

## Curriculum and reference quality — changes

- Corrected Module 1's over-generalisation that task-specific AI is 'useless' at other tasks. General-purpose models can serve multiple tasks; suitability requires evaluation.
- Removed the unsupported claim that general AI is approaching faster than organisations are prepared for. The lesson now describes AGI as a research goal without a promised timetable.
- Corrected a misleading displayed link label for an accessible MIT Sloan article about AI and smart KPIs; the link destination is unchanged. Source checked 9 November: https://mitsloan.mit.edu/ideas-made-to-matter/generative-ai-smart-kpis-and-discovery-groups-new-mit-sloan-management-review
- Advanced `LANDSCAPE_LAST_REVIEWED` to `2026-11-09`, added two dated and sourced AI-landscape items and two primary-source URLs.

## Live website and link checks

- Public homepage, model-selection guide, privacy policy and terms were retrievable in the web reader, but some snapshots were cached. Not a browser-based live crawl.
- Public model-selection snapshot still displays Q1 2025 model tables, fixed AUD conversion and unsupported 10x cost claim. Corrections remain **draft only**.
- Homepage says nine 'modules' for Parents & Caregivers, while configuration calls these nine lessons; confirm actual learner navigation before editing.
- Privacy policy refers to subscriptions, billing intervals and renewals; terms and homepage describe one-time payments. Verify payment behaviour and legal requirements before changing legal or commercial copy.
- `/preview`, `/choose-ai`, `/glossary`, `/parents`, and `/roadmap` returned **cache misses** in the web reader. This does **not** confirm broken links. A browser/HTTP crawl is still required.
- The MIT Sloan source above was retrievable. No full external-link crawl or authenticated learner-route test was performed.

Public pages sampled: https://www.learningonline.ai/ ; https://www.learningonline.ai/model-selection ; https://www.learningonline.ai/privacy ; https://www.learningonline.ai/terms

## Changelog — content-only commits

1. `data/modules.js`: corrected narrow/general AI explanations and MIT Sloan link label.
2. `data/ai-landscape.js`: last-reviewed date 9 November; added automatic agent-review and outbound voice-call examples with source links.
3. `docs/content-review-2026-11-09.md`: this evidence ledger.

## Release gates

- Draft PR #4 remained open and unmerged before this review. The previous head `af0f34e` failed GitHub Quality Gate #42417806646; the separate regional-price assertion fix in draft PR #5 passed its own gate but is unmerged.
- Vercel production alias `www.learningonline.ai` still pointed to main commit `7195f6d` when inspected. Successful preview builds are **not** proof of security or application stability.
- Main pins Next.js 14.2.5; earlier audits reported vulnerabilities. A fresh dependency audit was **not** run in this review.
- Before any release: passing CI/build, dependency/security audit, Playwright smoke and checkout tests, authentication/RLS/entitlement regression, email privacy, accessibility, full link crawl and production stability checks.
- Engineering follow-up: migrate content-refresh model and incompatible request parameters, fail visibly on missing credentials/sources, and validate AI-generated JavaScript before writing it.

**No merge, no production deployment, no pricing/entitlement/customer-data change and no customer email.**
