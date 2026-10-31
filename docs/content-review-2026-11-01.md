# LeO AI content review — 1 November 2026

**Last reviewed:** 1 November 2026 (Australia/Sydney).
**Status:** Draft-only changes in content PR #4. **Not merged, published, or deployed to production.**
**Scope:** Curriculum case-study provenance, free-preview module count, model lifecycle notices, live-homepage marketing claims, and primary-source safety guidance. No prices, entitlements, customer records, email or application security code changed.

## Changelog — proposed, not published

1. **10 unsourced numerical business examples** in `data/modules.js` rewritten as explicitly hypothetical scenarios, removing unsupported percentages, adoption claims, financial outcomes, timelines and purported customer experiences. Examples covered retail classification, document costs, hospitality reporting, credit assessment, product descriptions, telecom case summaries, recruitment bias, caching, workforce adoption and proposal drafting.
2. **Recruitment safety** example now directs Australian learners to the OAIC's AI privacy guidance and calls for bias evaluation, accountable human review and an appeal pathway. This is practical risk guidance, not a claim that any particular product is legally compliant.
3. **Reference-link clarity:** Updated the Stanford AI Index link label in the curriculum to match its actual destination (`hai.stanford.edu/ai-index`); this is a label correction, not evidence that the previous destination was broken.\n4. **Curriculum count:** `pages/preview.js` now says “+ 12 more modules” after modules 2–4, consistent with 16 numbered modules in `data/modules.js`.
5. **Live homepage finding, not changed in this PR:** The Parents & Caregivers offer says “9 practical modules” but `data/tiers.js` describes “9 practical lessons for parents.” Confirm actual structure and correct the homepage copy in a separate coordinated release, avoiding conflict with the homepage redesign PR #3.
6. **Privacy-policy terminology mismatch (live site):** The privacy policy describes a subscription tier, billing interval, renewals and payment subscriptions, while the homepage says Journey/Pro are one-time payments with no renewals. Verify the actual Stripe and data-processing arrangements and obtain policy/legal review before amending any privacy or contractual terms. Public source: https://www.learningonline.ai/privacy\n7. **Live marketing claims requiring evidence:** “12 months of content updates,” automatic tax invoices, and a 7-day refund/3–5 business day processing promise must be reconciled with operational policies and payment/email implementation before changing them. No customer promises were altered here.

## Model lifecycle facts verified on 1 November 2026

- OpenAI announced on 14 October 2026 that selected GPT-4o / GPT-4.1 API snapshots will shut down **14 January 2027**. This does not mean every product using those family names is being retired. https://developers.openai.com/api/docs/deprecations
- Google lists **17 November 2026** shutdown dates for `gemini-3.1-flash-tts-preview`, `gemini-3.1-flash-live-preview` and certain 2.5 audio previews. Recommended successors include Gemini 3.8 Flash TTS and Gemini 3.8 Live. https://ai.google.dev/gemini-api/docs/deprecations
- Anthropic's current model overview lists Fable 5.1, Opus 5.5, Sonnet 5.5 and Haiku 5.5. Verify availability per platform before teaching a fixed “best model.” https://platform.claude.com/docs/en/models/overview
- Google Gemini changelog confirms Gemini 4 Argon GA on 13 October 2026 and that Gemini 3.5 Flash / 3.7 Flash aliases have been superseded. https://ai.google.dev/gemini-api/docs/changelog

## Safety sources checked

- OAIC: privacy risks when entering personal and especially sensitive information into publicly available generative AI tools, plus accuracy and significant-decision obligations. https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products
- EU AI Act Article 14: proportional human oversight for high-risk AI systems. https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-14

## Validation performed

- Source edit scan: exactly **10** quantified case-study paragraphs replaced; original unverified $180,000 and $2.3 million figures absent from those paragraphs.
- Free-preview sidebar now reflects **16** curriculum modules (module 1 + modules 2–4 + 12 more).
- All changed code remains in the existing draft content branch. The GitHub/Vercel build and security results must be checked after this commit; text-level checks are **not** substitutes for build or browser tests.
- Public homepage was retrievable on 1 November 2026 at https://www.learningonline.ai/; this was **not** a complete crawl or authenticated course test.

## Release blockers and next actions

1. Main still pins unsupported `next@14.2.5`; fix security advisories and rerun dependency audit before any release.
2. Existing content PR #4 has a Quality Gate blocked by brittle Unicode price-label assertions; fix is drafted separately in PR #5 and must pass in the actual integration branch without altering prices.
3. Test signup/profile RLS, Google OAuth, paid access, checkout, Stripe webhooks, email recipient isolation, mobile accessibility and internal/external links.
4. Harden `scripts/content-refresh.mjs`: fail clearly on missing API credentials or zero official sources, validate model output as data, and require reviewed PRs rather than auto-publication.
5. Coordinate homepage copy fix with PR #3 and confirm operational promises with business owners before changing terms.
