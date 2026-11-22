# LeO AI content review — 2026-11-20

Last reviewed: 2026-11-20 (Australia/Sydney). Status: draft documentation only; not deployed.

## Findings

1. **Public contact page contradicts homepage commercial wording.** The contact page describes Starting the Journey as "$19/month" and The Pro as "$39/month", while the homepage describes one-time purchases ($149 and $299 respectively). Do not change prices or customer terms on the strength of marketing pages; verify authoritative checkout configuration and approved commercial policy before any copy change.
   - https://www.learningonline.ai/contact
   - https://www.learningonline.ai/

2. **Public model-selection page remains materially stale.** It says "Updated Q1 2025", recommends Gemini 1.5 Pro/Flash and Claude 3.5 Sonnet, and presents fixed AUD conversion (1.55x), categorical data-residency recommendations and illustrative savings as if generally applicable. It also claims "Most organisations use models that are 10× more expensive than necessary", "swap models freely", and "99% cost reduction ... with frontier accuracy" without substantiation. Replace unsupported claims with scenario-labelled assumptions, current vendor links, evaluation methodology and clear deployment/residency qualification.
   - https://www.learningonline.ai/model-selection
   - https://platform.openai.com/docs/models
   - https://docs.anthropic.com/en/docs/about-claude/models
   - https://ai.google.dev/gemini-api/docs/models

3. **Gemini 2.5 access vs retirement:** Google developer support said on 21 September 2026 that access to 2.5 models was limited to prior users, while the models were not deprecated at that time. Avoid asserting that model catalogue presence guarantees project access or equating restricted availability with a universal shutdown date.
   - https://discuss.ai.google.dev/t/why-2-5-pro-missing/183860/5
   - https://ai.google.dev/gemini-api/docs/deprecations

## Proposed bounded content changes

- Replace obsolete model-selection recommendations with a dated comparison methodology, not unverified rankings or hard-coded prices.
- Label cost scenarios as illustrative; include input/output token assumptions, cache and tool charges, currency date, and model/version.
- Add a practical safety evaluation using synthetic data: test prompt injection, hallucination, privacy leakage, model-access errors and human escalation.
- Correct commercial copy only after checkout and entitlement verification; no pricing or billing changes.
- Crawl internal/external links and test logged-in lesson routes without using or modifying customer records.

## Validation and release

Reviewed the public homepage, contact page, model-selection page, and GitHub PR #4/#5 metadata. PR #4 and PR #5 were open/draft/unmerged at review. A complete link crawl, CI, dependency security review, checkout, authentication, entitlement, accessibility and email-privacy regression checks were **not** completed in this review. This document is not evidence of release readiness.

## Changelog

- 2026-11-20: Added sourced findings on live commercial inconsistency, stale model-selection guide, unsupported marketing claims and Gemini availability guidance. Documentation only; no production changes.
