-- migrations/journey-grandfather-v2.sql
-- v2.1 — Journey model reverted: buy-once + 7-day refund (matching Pro), no
-- more free-card-free trial. Users who already received the earlier free-month
-- grant are grandfathered to PERMANENT Journey access rather than having it
-- expire out from under them mid-course. Run once in the Supabase SQL editor.
-- Idempotent — safe to run more than once.

-- Dry run first if you want to see who this affects:
-- select id, email, selected_tier, journey_expires_at
-- from public.users_profile
-- where selected_tier = 'journey' and journey_expires_at is not null;

-- Grandfather: clear the expiry for every current Journey user. Their access
-- becomes permanent — no clock, no downgrade, matches what they were told.
update public.users_profile
set    journey_expires_at = null,
       journey_reminder_sent_at = null
where  selected_tier = 'journey';

-- Note: journey_expires_at / journey_reminder_sent_at columns are left in the
-- schema (harmless, unused going forward) rather than dropped — the app code
-- no longer sets or reads them for enforcement as of this release.
