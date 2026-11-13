# LeO AI content review — 4 November 2026

**Last reviewed:** 4 November 2026 (Australia/Sydney). **Status:** Draft PR #4; not merged or deployed.

## Critical factual correction — proposed, not deployed

The 3 November review incorrectly stated that stable `gemini-2.5-pro` and `gemini-2.5-flash` API requests would automatically reroute on **1 December 2026**. Google's current official deprecations table says **both stable models are not deprecated and have no announced shutdown date**. It says access is restricted for users without prior usage, and recommends newer models for new projects. Removed the false date/rerouting claim from `data/ai-landscape.js`. This supersedes the corresponding claim in `docs/content-review-2026-11-03.md`.

Primary source (checked 4 November): https://ai.google.dev/gemini-api/docs/deprecations

## Revalidated time-sensitive items

- Google's `gemini-3.1-flash-tts-preview`, `gemini-3.1-flash-live-preview`, and certain Gemini 2.5 preview speech models have **17 November 2026** earliest shutdown dates; replacements are listed on Google's deprecations page. These dates are **earliest possible**, not guaranteed exact shutdown dates.
- OpenAI's Evals dashboard/API and Agent Builder have a **30 November 2026** scheduled shutdown; Evals became read-only on **31 October 2026**. ChatKit remains available.
- OpenAI lists **14 January 2027** for specified GPT-4o/GPT-4.1 API snapshots, not blanket GPT-4 retirement.

Primary sources (checked 4 November): https://developers.openai.com/api/docs/deprecations ; https://ai.google.dev/gemini-api/docs/deprecations

## Safety and teaching recommendation

Teach model migration as an evidence-based decision: check the exact model ID, official lifecycle table, availability, regression accuracy, API compatibility, cost and privacy/safety effects. Never infer an API retirement from a model-family name or from AI-generated summaries.

## Changelog

1. Updated landscape review date to 2026-11-04.
2. Replaced incorrect Gemini 2.5 automatic-rerouting claim with the official no-shutdown-date status.
3. Added this source-backed correction notice, preserving the 3 November review for audit history.
4. No prices, access controls, customer data, emails, or production configuration changed.

## Outstanding / release blockers

- Full external-link crawl, live marketing-claim verification, and authenticated lesson review remain incomplete.
- Main repository still pins Next.js 14.2.5; dependency/security remediation is outstanding.
- The separate quality-gate currency-format correction remains in PR #5.
- Full CI/build, checkout/authentication, entitlement, email-privacy and production stability tests must pass before any merge or publish.

**Release decision: HOLD.**
