-- migrations/journey-free-month.sql
-- v2.0 — Journey is FREE for one month, enforced by an expiry timestamp.
-- Run in the Supabase SQL editor. Idempotent — safe to run more than once.

-- 1. Columns: when the free month ends, and whether the 7-day reminder was sent.
alter table public.users_profile add column if not exists journey_expires_at       timestamptz;
alter table public.users_profile add column if not exists journey_reminder_sent_at timestamptz;

-- 2. Release activation: give every existing non-Pro account one fresh 30-day Journey window.
-- Paid Pro users are deliberately excluded. This statement is intended to be run once
-- during the coordinated release window, after the matching application code is live-ready.
update public.users_profile
set    selected_tier = 'journey',
       user_type = 'journey',
       journey_expires_at = now() + interval '30 days',
       journey_reminder_sent_at = null
where  coalesce(selected_tier, 'parents') <> 'pro';

-- 3. Index to make the daily cron's date lookups fast.
create index if not exists users_profile_journey_expiry_idx
  on public.users_profile (journey_expires_at);

-- Note: enforcement is handled in the app (read-time, in lib/auth.js) and by the
-- daily cron (/api/cron/journey-expiry) — no DB trigger required.
