# LeO AI content review — 5 November 2026

**Last reviewed:** 5 November 2026 (Australia/Sydney). **Status:** Draft PR #4, not merged or deployed. **Release decision:** HOLD.

## High-priority factual correction: Gemini 2.5 API transitions

Google's official deprecations page now explicitly marks `gemini-2.5-pro` and `gemini-2.5-flash` deprecated and states that **on 1 December 2026**:
- Requests to `gemini-2.5-pro` automatically route to `gemini-3.8-flash`, billed at Gemini 3.8 Flash rates.
- Requests to `gemini-2.5-flash` automatically route to `gemini-3.5-flash-lite`, billed at Gemini 3.5 Flash-Lite rates.
- The distinct `gemini-2.5-flash-lite` has **no announced shutdown date**.

Google warns of breaking API changes. Teach migration testing for prompt/output fidelity, schema compatibility, accuracy, safety, latency, token usage and cost. Do not imply an automatic reroute preserves quality or cost. This **supersedes the 4 November 2026 review**, which recorded Google's then-visible statement that neither stable model was deprecated. Preserve both records as an audit trail; use the latest primary source rather than inferring lifecycle from older reviews.

**Primary source checked 5 November:** https://ai.google.dev/gemini-api/docs/deprecations (currently redirects to https://aistudio.google.com/docs/deprecations).

## New OpenAI transcription lifecycle finding

OpenAI's API deprecations page lists **26 February 2027** shutdown for `whisper-1`, `gpt-4o-transcribe`, `gpt-4o-mini-transcribe` and `gpt-4o-transcribe-diarize`. Recommended replacements include `gpt-live-transcribe` and `gpt-transcribe`. Avoid a blanket claim of drop-in equivalence; test supported features, diarization, latency, streaming, privacy and transcript quality.

**Primary source checked 5 November:** https://developers.openai.com/api/docs/deprecations

## Rechecked model documentation and source links

- Claude current model catalogue is accessible at https://platform.claude.com/docs/en/models/overview. Canonicalised the old Claude source link in `data/ai-landscape.js`; the older link redirects.
- OpenAI model catalogue accessible at https://developers.openai.com/api/docs/models.
- Live public homepage, model-selection guide, privacy policy and terms page were retrievable in sampled checks. The free-preview page could not be fetched conclusively through the public reader; this is **not evidence of a broken link**.
- The live model-selection page still displayed a Q1 2025 comparison and unsupported marketing numerics in the retrieved snapshot; corrected model-selection content is present only in this draft PR.
- Live privacy policy uses subscription/renewal terminology, whereas the terms page says one-time payments. Requires legal/operational verification, not an unreviewed policy rewrite.

## Changelog — content-only changes

1. Updated `LANDSCAPE_LAST_REVIEWED` to `2026-11-05`.
2. Replaced 4 November's obsolete Gemini 2.5 no-shutdown-date statement with the current official 1 December automatic reroute details, including different destination models and billing.
3. Added the OpenAI 26 February 2027 transcription model sunset and migration precautions.
4. Canonicalised the Claude documentation source URL.
5. In Module 9's research references, narrowed MIT Sloan's 90% KPI improvement finding to the specific subgroup using AI to create new KPIs, and linked to MIT Sloan's accessible summary (https://mitsloan.mit.edu/ideas-made-to-matter/generative-ai-smart-kpis-and-discovery-groups-new-mit-sloan-management-review). Removed an unverified generic 84% AI-tool discovery claim from the adjacent practitioner-framework reference.\n6. Added this dated review; no pricing, entitlement, authentication, checkout, customer data, emails or deployment configuration changed.

## Validation and release blockers

- Static content assertions passed while preparing the change, including verification of the narrowed KPI claim and removal of the 84% claim (targeted text replacement, one landscape export, expected previous notice removed); **not** a complete runtime test.
- Previous PR #4 head `3623ffa` had a successful Vercel preview build, but GitHub Quality Gate failed at `npm run check:release`; the application build step was skipped.
- The regional-price check fix is separate in draft PR #5 and is not merged.
- Main still pins Next.js 14.2.5. Dependency security remediation and authenticated browser tests (signup, checkout, entitlements, email privacy, access controls), complete link crawl and production stability verification remain outstanding.
- This new commit requires fresh CI and preview verification. **Do not merge or publish until release gates pass.**

## NEXT

Resolve security and CI blockers in a separate engineering PR; verify source-based content and customer-facing promises; run full link and browser regression tests; release only after production safety sign-off.
