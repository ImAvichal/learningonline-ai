# Admin Cancel Subscription — Test Cases

These are manual/integration test cases. Run them against Stripe **test mode**
with a test user. Each lists the setup, action, and expected result.

## Prerequisites
- SQL migration applied (`migrations/admin-cancel-feature.sql`)
- Your account set to `is_admin = true`
- A test user with an active subscription (go through test-mode checkout)
- `sendCancellationEmail` added to `lib/emails.js`

---

## TC1 — End-of-period cancellation (the default, happy path)
**Setup:** Test user has an active Journey or Pro subscription.
**Action:** Admin calls `POST /api/admin/cancel-subscription` with
`{ userId, mode: 'period_end' }` (valid admin bearer token).
**Expected:**
- HTTP 200, `{ success: true, mode: 'period_end', status: 'cancel_at_period_end', expiryDate: <ISO> }`
- In Stripe: subscription shows **"Cancels at period end"** (still active until then)
- In Supabase: the purchase row `payment_status = 'cancel_at_period_end'`
- User's `selected_tier` is **still set** (access continues until period end) ✅
- Audit row written with `cancellation_type = 'period_end'`
- Cancellation email received, expiry date matches Stripe's period end

## TC2 — Immediate cancellation
**Setup:** Test user has an active subscription.
**Action:** `{ userId, mode: 'immediate' }`.
**Expected:**
- HTTP 200, `status: 'cancelled'`, `expiryDate` ≈ now
- In Stripe: subscription **Canceled** immediately
- In Supabase: purchase row `payment_status = 'cancelled'`
- User's `selected_tier` and `user_type` set to **null** (access revoked now) ✅
- Audit row with `cancellation_type = 'immediate'`
- Email received with "access has now ended" wording

## TC3 — Failed Stripe API call (resilience)
**Setup:** Temporarily use an invalid/cancelled `stripe_subscription_id`, or
revoke the Stripe key's permission, to force a Stripe error.
**Action:** Either mode.
**Expected:**
- HTTP 502, `{ error: 'Stripe cancellation failed: ... No changes were made.' }`
- In Supabase: **nothing changed** — purchase status and tier untouched ✅
- **No** audit row written (action didn't complete)
- **No** email sent
- This proves we don't corrupt state when Stripe fails.

## TC4 — User with no active subscription
**Setup:** Free user, or a user whose subscription is already cancelled.
**Action:** Either mode.
**Expected:** HTTP 404, `{ error: 'No active subscription found for this user.' }`. No side effects.

## TC5 — Non-admin caller (security)
**Setup:** A normal (non-admin) logged-in user's bearer token.
**Action:** Call the endpoint.
**Expected:** HTTP 403, `{ error: 'Admin access required.' }`. No action taken.

## TC6 — Unauthenticated caller (security)
**Action:** Call with no Authorization header, or a garbage token.
**Expected:** HTTP 401, `{ error: 'Not authenticated.' }` or `'Invalid or expired session.'`

## TC7 — Forged admin attempt (security)
**Action:** Send `{ userId, mode, isAdmin: true }` in the body with a non-admin token.
**Expected:** HTTP 403. The body `isAdmin` is ignored — only the verified token + DB `is_admin` matter.

## TC8 — Data integrity after cancellation
**Setup:** User who completed lessons/quizzes before cancellation.
**Action:** Immediate cancellation.
**Expected:** After cancellation, in Supabase the user still has: their account row,
all purchase rows (status changed, not deleted), completed-lesson records, quiz
results, and any certificates. **Nothing is deleted** — only tier + status change. ✅

## TC9 — Access rules after period-end expiry
**Setup:** TC1 done; wait for (or simulate via Stripe test clock) the period to end.
**Action:** Stripe fires `customer.subscription.deleted` → existing webhook runs.
**Expected:** Webhook clears `selected_tier`/`user_type`; user can still sign in,
access free + Parents content, but paid courses/templates are gated.

## TC10 — Email failure doesn't break cancellation
**Setup:** Unset `RESEND_API_KEY` (or break it).
**Action:** Either mode.
**Expected:** Cancellation still succeeds (HTTP 200), `emailSent: false`. Stripe +
Supabase + audit all completed; only the email was skipped.

## TC11 — Audit log written
**Action:** Any successful cancellation.
**Expected:** `admin_audit_log` has a row: admin id+email, action='cancel_subscription',
target user id+email, cancellation_type, optional reason, timestamp.

## TC12 — List + search endpoints (admin only)
**Action:** `GET /api/admin/users?q=<name or email>` with admin token.
**Expected:** 200 with matching users. With a non-admin token → 403. With no token → 401.
