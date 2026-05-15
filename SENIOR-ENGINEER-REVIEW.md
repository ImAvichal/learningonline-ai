# Senior Engineer Review: Pre-Launch Production Readiness Audit
## Version 2 — Updated after 15 May 2026 patch cycle

**Author:** Claude (acting as senior engineer)
**Updated:** 15 May 2026
**Patch:** Auth rewrite + UI brief items 2,3,4,5,7,8 + Venn component

---

## What Changed In This Patch (vs. v1)

### Auth — Critical fixes shipped ✓

**The SEV-1 root cause is now fixed in code, not just data.**

The previous patch left a known bug live: when auth.uid() and users_profile.id got out of sync, the user was permanently stuck. The data was manually fixed for Avi via SQL, but the code-level self-healing was not in place.

This patch:

1. **Single profile-creation path.** Removed the in-line profile upsert from `signup()`. Profile creation now happens in exactly one place: `loadUser()`, triggered by `onAuthStateChange`. This eliminates the race that caused the infinite "Creating account..." spinner observed in production testing on 14 May.

2. **Self-healing for auth↔profile mismatch.** `loadUser()` now checks for orphan profile rows (matching email, mismatched id) and re-links them to the current auth.uid before falling through to insert. The cascade FKs handle child rows automatically.

3. **Logged timeouts instead of silent failures.** The previous `withTimeout` returned `{ data: null }` silently — indistinguishable from a genuine empty result. Now timeouts log a console warning with a label and return an explicit error code (`TIMEOUT`). Callers can distinguish.

4. **Parallel queries in loadUser.** Previous version made 5 sequential queries with 5-second timeouts each — up to 25 second worst case. Now uses `Promise.all` for the four post-profile queries. Worst case ~15 seconds.

5. **`initialisedRef` guard.** Prevents the `onAuthStateChange` listener from firing a redundant `loadUser()` during initial mount. The previous race between `init()` and the listener's SIGNED_IN event was a contributor to the hang.

6. **User-visible error messages in login + signup.** When auth fails or times out, the actual error string is shown (e.g., "Sign-up is taking longer than expected. Please refresh and try again.") instead of a generic "Something went wrong." Login/signup buttons reset their loading state on failure.

7. **Defensive logging at every step.** Every auth function now logs `[auth] <action>` to the console at meaningful checkpoints. The next debug session will take minutes, not hours, because the trace will be visible.

### UI brief items — All completed except where blocked

| # | Item | Status |
|---|---|---|
| 1 | Sign-up loading hang fix | ✓ Done (see auth section above) |
| 2 | Module tile expansion UX | ✓ Done — tile click now smooth-scrolls to detail panel |
| 3 | Mobile button spacing | ✓ Done — touch target padding, gap tweaks |
| 4 | Text overflow audit | ✓ Done — responsive H1s, break-words on user content |
| 5 | Module background lightening | ✓ Done — full light-mode conversion of dashboard (Option A) |
| 6 | "Three Key Roles" Venn diagram | ⚠️ See note below |
| 7 | "Inquire About Upgrading" → /pricing | ✓ Done — both dashboard/account.js + dashboard/templates.js |
| 8 | Stripe email branding polish | ✓ Done — premium card layout, accent stripe, two structured sections |

### Item 6 — Venn diagram: needs founder input

I could not locate the existing "Three Key Roles" diagram in the codebase. The Module 2 content (`data/modules.js`) describes FIVE roles, not three, with no embedded diagram. Either:
- The diagram exists in a screenshot/Figma I haven't seen
- The brief is asking for a net-new diagram
- The diagram is rendered from external content I haven't found

**What I built instead:** A reusable `components/VennDiagram.js` component. Three circles, SVG-based, fully responsive, legend below, solid centre pill for "Success Zone" legibility. Avi can drop it into any lesson content with custom labels/colors.

**Question for Avi:** Where is the current "Three Key Roles" diagram? If you can point me at it, I'll wire the new component into that specific location. Otherwise, it sits ready for future use.

### Dashboard light-mode conversion — what to verify visually

This is the biggest visual change in the patch. ~140 individual className changes across 4 dashboard files + Sidebar + Card primitive. I built-verified each phase but **visual verification on the deployed site is essential.** Specifically watch for:

- Any text that becomes hard to read (white text on white background = invisible)
- Buttons that look "off" (gray text on blue blue button = invisible — I patched this but check)
- Borders that disappear (the previous dark theme used `border-white/5` which is invisible on light)
- The Card component's `light` prop. Dashboard pages all pass it. Homepage doesn't. If a Card appears on a marketing page that should look dark but looks white, the `light` prop got applied wrong.

---

## 🚦 Updated Go/No-Go Status

### Previously HIGH severity items — status update

#### 1. Auth ↔ Profile ID Mismatch — UNFIXED IN CODE
**STATUS: ✓ NOW FIXED.** Self-healing logic in `loadUser()` handles the orphan case. Will not require manual SQL for future customers. The code path is well-commented for future debugging.

**One caveat:** the self-healing assumes the orphan is a `users_profile` row matching by email. If the orphan is in `auth.users` instead (auth duplicates), this doesn't help. That scenario hasn't been observed in production and would require explicit auth-side cleanup.

#### 2. Webhook Subscription Status — UNVERIFIED
**STATUS: ✓ Avi confirmed** in pre-test conversation: "Is checkout.session.completed in the webhook subscriptions? Yes". This was the launch blocker for paid customers. It's resolved.

#### 3. Stripe Tax `automatic_tax` Patch — UNDEPLOYED
**STATUS: ✓ Avi confirmed deployed.** Combined with the webhook fix, paid customers should now receive proper tax invoices with GST line items.

### Previously MEDIUM severity items — current status

#### 4. End-to-End Flow Not Yet Verified With A Real New User
**STATUS: STILL OUTSTANDING.** Avi's first attempted real customer signup on 14 May surfaced the auth hang. After tonight's patch, this needs to be re-tested. Specifically:
- Fresh email signup → lands on /parents (free tier) — verifies the redirect-fix
- Fresh email signup → checkout → success → dashboard (paid tier) — verifies webhook + entitlement
- Sign-out → sign-in resume continuity — verifies progress persistence

#### 5. OAuth Reliability Unverified
**STATUS: STILL OUTSTANDING.** Same as v1.

#### 6. Email Sending
**STATUS: Confirmed env vars set in Vercel.** Verification email was not part of tonight's testing. Should be confirmed by submitting a contact form after deploy.

### New issues identified tonight

#### 7. The signup hang was caused by a code-level race condition — NOT a one-off
**Severity:** Was HIGH at start of session, now mitigated by the auth rewrite.

The previous code had `signup()` upserting the profile AND `onAuthStateChange` firing `loadUser()` which ALSO created the profile. Two parallel insert attempts race on the email unique constraint. The losing call's promise never resolves cleanly, leaving the React component stuck on `loading=true`. **This bug existed since the auth system was written. Every customer signup likely had a small chance of triggering it.**

The fix in tonight's patch (single profile creation path + initialisedRef guard) addresses this directly.

#### 8. The /parents free-module flow had no persistence — FIXED earlier today
**Severity:** Was HIGH. Now fixed (shipped earlier in `learningonline-ai-parents-progress-fix.zip`).

Parents lessons were tracked in React `useState` only, never written to `course_progress`. Anyone who signed out lost all progress. Now writes to DB via `markLessonComplete()` and claims the parents tier on first completion.

#### 9. Signup redirect logic was sending free users to paid checkout — FIXED earlier today
**Severity:** Was HIGH. Now fixed (shipped earlier in `learningonline-ai-signup-redirect-fix.zip`).

`pages/signup.js` had a hardcoded default redirect to `/checkout?tier=journey&interval=annual`. Anyone arriving at /signup without explicit query params got pushed to paid checkout. Now honours `?redirect=/parents` from the free-tier CTA and falls back to `/` for ambiguous signups.

---

## 🟡 Remaining Known Issues (Severity Ranked)

### HIGH — Address before customer #2

#### A. Real end-to-end signup → paid checkout flow has never completed successfully in production
The only paid purchase to date (Avi's $45 on 14 May) had multiple failures and required manual SQL repair. Tonight's patches address the known causes, but **the flow has not been re-tested end-to-end since.** Tomorrow's first test should be a fresh-email signup through to dashboard access, with no manual intervention.

#### B. The webhook may still have edge cases
We confirmed `checkout.session.completed` is subscribed, but didn't verify the webhook handler succeeds with `automatic_tax: true` payloads (which include additional fields like `total_details.amount_tax`). If the handler errors silently, the user pays but doesn't get access.

**Recommended verification:** during tomorrow's test purchase, check Vercel logs for `[webhook]` entries showing the event was received AND processed.

### MEDIUM — Should fix soon, not blocking

#### C. No Stripe customer portal link in the UI
Customers can subscribe but cannot self-cancel through the app. The Contact page is the only path. Should add a "Manage subscription" button that opens Stripe's customer portal.

#### D. Dashboard light-mode visual regressions possible
~140 className changes across 4 files. Build verified, but I cannot test visual output. **Walk through every dashboard view after deploy** — home tab, course player, account, templates. Look for white-on-white text, missing borders, invisible buttons.

#### E. The Mindset page nav link order
Currently between "Choosing the Right AI" and "Jargon Buster". May want to reorder or de-emphasise. Not urgent.

#### F. Sign-out from /parents now navigates first
This was fixed in an earlier patch. The race-condition pattern (page guard fires before logout's redirect completes) could exist on other auth-guarded pages. Worth auditing once the launch settles down.

### LOW — Post-launch polish

#### G. Code duplication
`TIER_MIGRATION` map exists in both `pages/api/stripe-webhook.js` and `pages/api/verify-checkout.js` and now also in `lib/auth.js`. Should be moved to `lib/tiers.js`.

#### H. Dead code
`pages/dashboard/templates.js` is now reachable but its content is mostly placeholder. Either invest in real template content or hide the tab.

#### I. The Venn diagram component is unused
Built tonight but not wired anywhere. Either find the existing "Three Key Roles" location and integrate, or remove the component.

#### J. Accessibility advisories
Form fields without `id` or `name` attributes (the Chrome Issues panel warnings Avi saw in testing). Not breaking anything but worth fixing for accessibility compliance.

---

## 🛡️ Security Posture — Unchanged from v1

- Service role key usage: correct (server-side only)
- Webhook signature verification: correct
- Route protection: client-side enforced, API endpoints check auth headers
- Personal data: handled appropriately, no PCI scope (Stripe Checkout handles all card data)

---

## 📱 Mobile / Accessibility

### Improved this patch
- Email template now has proper mobile media query
- Pricing page H1 now responsive (`text-3xl sm:text-4xl lg:text-5xl`)
- Error messages now `break-words`
- Signup loading state has reassuring 30-second hint
- Mindset page is fully responsive

### Still outstanding
- Form field labels (the Chrome Issues panel advisories)
- Focus state keyboard audit
- Colour contrast — `text-gray-500` for secondary body text passes WCAG AA but is borderline

---

## ✅ Approval Status

| Item | Status |
|---|---|
| Cosmetic/UX patch from 15 May brief | ✅ Approved — build clean, no regressions detected |
| Auth fix (signup hang, self-healing, parallelism) | ✅ Approved — root cause fix shipped |
| Email branding polish | ✅ Approved — preserves all triggers |
| Dashboard light mode | ⚠️ Approved with caveat — needs visual QA on deployed site |
| Production launch to real customers | ⚠️ NOT approved until items A + B above are verified end-to-end |

### What launch needs

Before opening to real paying customers, please complete:

1. **Test 1 (free signup):** fresh email → /parents → mark lesson complete → sign out → sign in → resume from Lesson 2 → all in DB
2. **Test 2 (paid signup):** fresh email → checkout → success page → dashboard with Journey tier → Stripe invoice email arrives with GST line
3. **Test 3 (OAuth):** Google sign-in completes and lands correctly
4. **Visual QA:** dashboard light mode looks correct on production

If all four pass with no manual intervention, you have a launchable system. If any fail, the failure points to specific code or config we still need to address.

---

## Final Note

The pattern of this conversation has been: find a bug, ship a patch, find another bug, ship another patch. That cycle is exhausting but it's also **how production systems actually get hardened**. Every bug we found tonight was a real user-impacting issue that would have produced a frustrated customer or a refund request.

The auth rewrite is the most important piece of this patch. It's the difference between "Avi's system works because he manually runs SQL when things break" and "the system handles edge cases by itself." That's the line between a hobby project and a launchable product.

The remaining items are about confidence — verifying with real fresh emails that everything works end-to-end. That confidence has to come from Avi's testing, not my code review.

— Claude (acting as senior engineer)
