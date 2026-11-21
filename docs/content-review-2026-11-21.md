# LeO AI content and early-launch review — 2026-11-21

Last reviewed: 2026-11-21 (Australia/Sydney). **DRAFT ONLY — not deployed.**

## Verified live claims and customer-safety implications

1. **Public commercial contradiction remains.** The homepage says Journey A$149 and Pro A$299 are one-time purchases, but the contact page advertises "$19/month" and "$39/month". Read-only inspection of the connected live Stripe account on 2026-11-20 confirmed active one-time AUD prices of 14900 and 29900 minor units **and separately existing recurring prices/subscriptions**. Therefore do not simply erase or convert recurring customer terms. Obtain approved offer/legacy-product mapping, then propose *copy-only* changes; never alter Stripe, existing entitlements or customer records.
   - https://www.learningonline.ai/
   - https://www.learningonline.ai/contact

2. **Model-selection guide still serves Q1 2025 comparisons as current.** Its GPT-4o/Claude 3.5/Gemini 1.5 table, static 1.55 AUD exchange rate, 10x overspend claim, "99% cost reduction" assertion, freely swappable models, and unconditional residency guidance are unsuitable for undated practical training. Replace with a last-reviewed methodology, official provider model/pricing links, and a *labelled hypothetical* evaluation worksheet; do not assert an unverified ranking or performance outcome.
   - https://www.learningonline.ai/model-selection
   - https://developers.openai.com/api/docs/changelog
   - https://ai.google.dev/gemini-api/docs/models
   - https://docs.anthropic.com/en/docs/about-claude/models

3. **Model lifecycle and safety:** OpenAI's current API docs distinguish newer model catalogues, migration guidance, deprecated/legacy endpoints and safety guidance. Learners should check exact model IDs, project eligibility, endpoint compatibility, privacy/data handling, tool permission boundaries and human review on the date of use. A safe practical exercise uses synthetic support tickets, tests hallucination/prompt injection, and reports quality, latency, cost and error handling rather than guaranteed savings.
   - https://developers.openai.com/api/docs/changelog
   - https://developers.openai.com/api/docs/deprecations
   - https://ai.google.dev/gemini-api/docs/deprecations

## Early-launch gate (read-only verification, 2026-11-20)

Supabase: 41 auth accounts, 40 profiles, four completed Journey purchase records (all have a matching profile and Stripe session reference), 15 course-progress rows. Stripe: four active subscription records in addition to active one-time price objects. These counts do **not** establish that each subscription has the right course access. One missing profile, trial-expiry behaviour and legacy subscription reconciliation remain to be checked. Supabase security advisor warned leaked-password protection disabled; the profile table's sensitive UPDATE columns were not granted to the authenticated role in the inspected grants. No customer mutation or login impersonation performed.

## Proposed content-only patch scope

- Correct only customer-facing commercial wording **after** owner approval of authoritative terms; preserve descriptions of existing legacy subscriptions where applicable.
- Rewrite model-selection guide as dated, provider-linked decision method with explicit example assumptions and privacy caveats; remove unsupported quantitative marketing claims.
- Add synthetic evaluation/safety examples, citations and last-reviewed stamps; test links and accessibility before release.

## Validation and deployment

Reviewed live homepage, contact and model-selection pages, current official OpenAI changelog, existing PRs #4 and #5, and Vercel production metadata. Production still points to main commit 7195f6d; the content branch is not live. **No full crawl, build, Playwright, checkout, entitlement or dependency audit was executed in this review.** Existing release gate failures and security/customer-access verification keep publication on hold.

## Changelog

- 2026-11-21: Recorded verified Stripe one-time-versus-recurring distinction and early-launch access/security gate; refreshed dated source links and bounded content recommendations. Documentation only; no billing, account, customer email, merge or deployment action.
