# Senior Engineer Review: Pre-Launch Production Readiness Audit

**Author:** Claude (acting as senior engineer)
**Date:** 12 May 2026
**Status:** Pre-launch, after final cosmetic patch
**Scope:** Honest review of auth, payment, entitlement, code quality, and known risks

This document is deliberately blunt. Its job is to flag what could go wrong, not to celebrate what's working. If you read this and feel uncomfortable about shipping, that's the document doing its job.

---

## ⚠️ Critical: Known Issues That Will Affect Real Customers

### 1. Auth ↔ Profile ID Mismatch — UNFIXED IN CODE
**Severity: HIGH**

A user signed up via Google OAuth, the resulting `auth.users` row got a UUID different from the orphaned `users_profile` row that already had their email. The upsert logic in `lib/auth.js` cannot self-heal this: it tries to insert a new profile, the email unique constraint fires, and the user is stuck on the free `/preview` page forever.

**This happened to the founder on 12 May 2026.** A SQL migration was run to manually relink the rows. The migration restored access, but the code-level bug is still in `lib/auth.js`.

**What this means for real customers:**
- A returning user whose auth.users row gets recreated (could happen if their OAuth provider's email confirmation flow ever re-issues an ID, or if an admin ever deletes an auth.users row by accident) will become uncontactable through normal flows.
- The first real customer who hits this will need a manual DB migration from the founder.

**Recommended fix:** in `lib/auth.js`'s `loadUser()`, when profile lookup by `id` returns no row but lookup by `email` returns a row, run an UPDATE to set the profile's `id` to match `auth.uid()`. This was deliberately deferred per founder's choice (Path B). Recommend prioritising before customer #2.

### 2. Webhook Subscription Status — UNVERIFIED
**Severity: HIGH**

The Stripe webhook destination at `https://www.learningonline.ai/api/stripe-webhook` is subscribed to "4 events" but the specific events list was never confirmed during the debug session. If `checkout.session.completed` is NOT subscribed, every real customer payment will:
- Succeed in Stripe (money taken)
- Fail to create an entitlement in our DB
- Stuck at the same `/preview` screen the founder hit on 12 May

The 0% error rate on the webhook destination is misleading — it just means our endpoint returns 200 for the events it does receive (we have no error path for the events we never subscribed to).

**Recommended verification:**
1. Stripe Dashboard → Webhooks → endpoint → screenshot the **Subscribed events** list
2. Confirm `checkout.session.completed` is one of the 4
3. If not: add it. Save. Redeploy nothing.
4. Test with one $14.96 purchase. Refund.

This is the **single most important verification before going live**.

### 3. Stripe Tax `automatic_tax` Patch — UNDEPLOYED
**Severity: MEDIUM**

The patch `learningonline-ai-stripe-tax-checkout.zip` adds `automatic_tax: { enabled: true }` to `pages/api/create-checkout-session.js`. Stripe Tax is configured in the dashboard (Inclusive AU GST), but until this code patch is deployed, checkout sessions don't request automatic tax calculation. **Result: invoices won't include GST line items even though Stripe Tax is "ready".**

The founder's $45 test purchase on 12 May happened WITHOUT this patch deployed, which is part of why the invoice flow didn't show GST cleanly.

**Recommended action:** deploy the patch, then run one test purchase to verify the invoice PDF shows the GST line item.

---

## 🟡 Medium Risks

### 4. End-to-End Flow Not Yet Verified With A Real New User
**Severity: MEDIUM**

The only payment flow ever attempted in production was by the founder, whose account had pre-existing data and triggered the auth↔profile bug. No fresh-signup user has completed a purchase end-to-end. **The first real customer is effectively the production QA test.**

**Recommended:** before opening to real customers, sign up with a completely fresh email (`avichal+test1@gmail.com`), pay, verify entitlement, verify access. Then refund.

### 5. OAuth Reliability Unverified
**Severity: MEDIUM**

Google + LinkedIn sign-in flows have been written and patched repeatedly. The `?next=` redirect logic was added to survive cross-domain auth roundtrips. But no automated test exercises these flows end-to-end. Failures here would manifest as: user clicks "Continue with Google" → goes to Google → returns to the site → ends up on `/login` instead of their destination.

**Recommended:** manual walkthrough of both Google and LinkedIn login on production before going live. Add Playwright tests later.

### 6. Email Sending Requires Manual Setup
**Severity: LOW (if deferred), MEDIUM (at launch)**

The Resend API key was created at some point ("Supabase" key, 13 days ago) but the actual `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_REPLY_TO`, and `CONTACT_INBOX` env vars have not been confirmed as set in Vercel. Without these:
- Purchase confirmation emails do not send
- Contact form submissions do not notify the team (silently land in DB only)
- Refund requests submitted via the contact form may sit unread

**Recommended:** verify env vars are set in Vercel BEFORE launch. The code gracefully no-ops without them, so testing is easy: submit a test contact form, check if you receive an email. If not, env vars aren't set.

### 7. Stripe `automatic_tax` May Require Additional Fields
**Severity: LOW**

The `automatic_tax: { enabled: true }` setting, when paired with subscriptions and `tax_id_collection`, may require additional parameters that aren't currently set:
- `customer_update.address` (so Stripe can update the customer's address)
- `customer_update.name` (so the customer's legal name is captured for the invoice)

Currently the code sets `customer_update: undefined` and deletes it. This might cause subscription updates to fail in edge cases. Investigation needed once a successful test purchase confirms baseline behaviour.

---

## 🟢 Low Risks / Working Systems

### 8. Footer Component — Newly Introduced
A new `components/Footer.js` was created. It has two variants (light/dark) and is now included on:
- index, pricing, contact, terms, mindset, glossary, model-selection, roi-calculator

Risk: visual regression on any page where the surrounding theme doesn't quite match. Should be visually QA'd on production after deploy.

### 9. Mindset Page — New Content
`pages/mindset.js` was added as a new route. Replaces the "Value Calculator" nav link with "Mindset". The ROI calculator is now linked from the Mindset page rather than directly from nav.

Risk: SEO impact — anyone with `/roi-calculator` bookmarked still gets the page (kept for backward compat). Nav link gone could reduce traffic to the calculator. Acceptable trade-off per founder brief.

### 10. Curriculum Section Layout — Restructured
The homepage curriculum section was changed from "list-left, detail-right" to "tile-grid-top, detail-bottom". Tiles use responsive grid (2/3/4 columns on mobile/tablet/desktop).

Risk: visual on production should be QA'd. The detail panel below could feel disconnected from the selected tile on mobile because of the scrolling distance. If users report confusion, add a smooth scroll-to-detail-panel on tile click.

### 11. Email Template Polish
Mobile media queries added. Trading name disclosure added. CTA button shadow added. Color-scheme meta tag added.

Risk: HTML emails are notoriously fragile across clients (Outlook, Gmail, Apple Mail). Send a test email to each major provider before considering this verified.

---

## 🔍 Code Quality / Hygiene

### 12. Dead Code
- `pages/dashboard/templates.js` is still in the codebase but unreachable (sidebar removed, no links to it). Should be deleted in a future cleanup.
- `data/templates.js` similarly orphaned.
- `lib/i18n.js` includes Hindi and Tagalog translations that aren't surfaced anywhere except the plan name. Either ship a language switcher or remove the unused translations.

### 13. Duplicated Logic
The `TIER_MIGRATION` map (`individual → journey`, `smb → journey`, `enterprise → pro`) exists in BOTH `pages/api/stripe-webhook.js` AND `pages/api/verify-checkout.js`. Should be moved to a shared constants file (e.g. `lib/tiers.js`).

### 14. Error Handling
The webhook handler catches errors silently in a few places (try/catch with only `console.error`). Errors that should fail loudly are being swallowed. Specifically the "send confirmation email" wrapper is wrapped in try/catch — which is correct for resilience but masks failures from production monitoring.

**Recommended:** integrate Sentry or similar before launch so silent failures become visible.

### 15. No Subscription Cancellation UI
Customers can subscribe but cannot self-cancel through the app — the Contact page is the only path. The webhook does handle `customer.subscription.deleted` (revokes access) so if a customer cancels via Stripe's customer portal directly, the system handles it. But there's no Stripe customer portal link in the LeO AI UI, so customers have no obvious way to find it.

**Recommended:** add a "Manage subscription" button in the dashboard that opens Stripe's customer portal (one Stripe API call to generate the portal URL).

---

## 🛡️ Security Review

### 16. Service Role Key Usage
`pages/api/stripe-webhook.js` and `pages/api/verify-checkout.js` use `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS. This is correct — these endpoints need elevated privileges to insert purchase rows for any user. But:
- The service role key MUST remain in env vars only, never committed to the repo. ✓ Verified.
- The service role key must NEVER be exposed to the client. ✓ Verified — only used in API routes.

### 17. Webhook Signature Verification
`pages/api/stripe-webhook.js` verifies the Stripe signature using `STRIPE_WEBHOOK_SECRET`. ✓ Correct.

Risk: if the webhook secret in Vercel doesn't match the one in Stripe Dashboard (after the URL was updated from non-www to www earlier in the SEV-1 work), signature verification will fail and all webhooks will be rejected with 400. **Worth verifying** the secret matches.

### 18. Route Protection
Dashboard routes use `useAuth().user` to redirect unauthenticated users. ✓ Correct pattern. But: this is client-side enforcement. A determined attacker could still hit `/api/*` endpoints. Most of those endpoints check `user_id` via the auth header, so this is fine — but worth confirming each endpoint requires authentication where intended.

### 19. Personal Data Handling
Customer emails, names, and purchase history are stored in Supabase. Reasonable. No payment data is stored on our side (Stripe handles all of it). ✓ Compliant with PCI by virtue of using Stripe Checkout (we never see card data).

---

## 📱 Accessibility & Mobile

### 20. Mobile Responsiveness — Partial Sweep
Headlines and CTAs have been made responsive on the homepage, dashboard, course player, and Mindset page. **NOT yet sweep-verified on:** roadmap (if exists), glossary, signup, login, success, course-complete, terms.

### 21. Colour Contrast
The dark-themed pages use white text on near-black backgrounds — high contrast, fine. The light-themed pages use `text-gray-600` and `text-gray-500` for body copy, which is around 4.5:1 contrast — passes WCAG AA but is borderline. The `text-gray-400` used for column headings in the new footer may fail contrast — should be checked.

### 22. Focus States
Keyboard navigation hasn't been audited. CTAs and links should have visible focus rings. Some custom buttons may not.

---

## 🚦 Go / No-Go Recommendation

### Honest Assessment

**For pre-launch (no real customers yet):** Ship.
The cosmetic patches are safe. The core flow works **if** the auth↔profile bug doesn't trigger and **if** the webhook is properly subscribed.

**For real customers:** I would NOT recommend opening to real customers without:

1. ✅ Verifying `checkout.session.completed` is in the webhook subscription list (Step 1 above)
2. ✅ Deploying the `learningonline-ai-stripe-tax-checkout.zip` patch
3. ✅ Running ONE full end-to-end test purchase with a completely fresh email
4. ✅ Confirming the auth↔profile self-healing fix is in code (NOT just in your DB row)

These four items, in this order, are the launch gate.

Steps 1, 2, and 3 are each <5 minutes of work. Step 4 is ~30 minutes of code.

If you launch without step 4, expect to manually run SQL migrations for the first few customers who hit the bug.

### Approval Status

- ✅ Cosmetic/UX patch from 12 May brief: approved (build clean, no regressions detected)
- ⚠️ Production launch: NOT approved until items 1–4 above are completed
- ⚠️ The "everything will be fine" reassurance the founder might be hoping for: not provided. Real risk remains.

---

## Final Note On Tonight's Brief

The brief said "no more 'should work' or 'likely fixed.'" I've tried to honour that. Where I'm uncertain, I've said so. Where I think we're shipping past real risk, I've flagged it explicitly. The Path B choice (push cosmetic through, fix edges as they come) is legitimate — but only if you go in with eyes open about what hasn't been verified.

The cosmetic patches are good work. The launch gate is upstream of them.

— Claude (acting as senior engineer)
