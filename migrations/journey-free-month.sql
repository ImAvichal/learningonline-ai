-- migrations/journey-free-month.sql
-- v2.0 — Journey is FREE for one month, enforced by an expiry timestamp.
-- Run in the Supabase SQL editor. Idempotent — safe to run more than once.

-- 1. Columns: when the free month ends, and whether the 7-day reminder was sent.
alter table public.users_profile add column if not exists journey_expires_at       timestamptz;
alter table public.users_profile add column if not exists journey_reminder_sent_at timestamptz;

-- 2. Give existing Journey users a 30-day window from now (only if not already set).
update public.users_profile
set    journey_expires_at = now() + interval '30 days'
where  selected_tier = 'journey'
  and  journey_expires_at is null;

-- 3. Index to make the daily cron's date lookups fast.
create index if not exists users_profile_journey_expiry_idx
  on public.users_profile (journey_expires_at);

-- Note: enforcement is handled in the app (read-time, in lib/auth.js) and by the
-- daily cron (/api/cron/journey-expiry) — no DB trigger required.
