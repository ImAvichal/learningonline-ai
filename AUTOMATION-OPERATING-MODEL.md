# LearningOnline.ai — Self-Sustaining Operating Model

GitHub `main` is the production source of truth. Vercel deploys from GitHub. Supabase is the source of truth for users, entitlements, progress, purchases, feedback, and commercial telemetry.

## Automated loops

- Weekly official-source AI landscape refresh, limited to `data/ai-landscape.js`, proposed through a pull request.
- Every release pull request runs release invariants and a clean Next.js build, alongside the existing Playwright workflow.
- Daily Journey expiry/reminder cron.
- Weekly commercial-health summary: signups, purchases, feedback, and revenue separated by currency.

## Guardrails

Pricing, payment logic, database DDL, mass email, and core curriculum changes require a reviewed release. They are intentionally outside autonomous content publishing.

## Launch economics

Australia remains the higher-value benchmark. India Journey is ₹499 one-time after the complimentary month. Philippines Journey is ₱330 one-time after the complimentary month. Paid acquisition should scale only after conversion data establishes a sustainable CAC ceiling.

## Required secrets

GitHub Actions needs the existing Supabase public values and, for automated content refresh, `ANTHROPIC_API_KEY`. Vercel needs the existing Supabase/Stripe/Resend variables plus `CRON_SECRET` and `BUSINESS_REPORT_EMAIL`.
