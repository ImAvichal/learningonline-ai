-- migrations/campaign-sends.sql
-- Durable tracking of one-off email campaigns, so re-running a send from the
-- admin dashboard (or the CLI script) never double-emails anyone. Replaces
-- the CLI script's local .json sent-log, which cannot work from a serverless
-- API route (no persistent filesystem between invocations).
-- Idempotent — safe to run more than once.

create table if not exists public.campaign_sends (
  id          uuid primary key default gen_random_uuid(),
  campaign    text not null,              -- e.g. 'journey-upgrade-2026'
  email       text not null,
  sent_at     timestamptz not null default now(),
  unique (campaign, email)
);

create index if not exists campaign_sends_campaign_idx on public.campaign_sends (campaign);

alter table public.campaign_sends enable row level security;
-- No public policies: this table is only ever touched by server-side code
-- using the service-role key (the admin API route), which bypasses RLS.
-- Regular users have no legitimate reason to read or write it.
