-- migrations/feedback-system.sql
-- LearningOnline.ai v2.0 — structured user feedback capture.
-- Idempotent: safe to run multiple times.

create table if not exists public.feedback (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete set null,
  course        text,                       -- e.g. 'journey', 'pro', 'parents'
  module        text,                       -- module / lesson id or slug (nullable)
  rating        smallint check (rating is null or rating between 1 and 5),
  feedback_type text not null default 'general'
                check (feedback_type in ('general','rating','suggestion','bug','missing_topic')),
  comments      text,
  status        text not null default 'new'
                check (status in ('new','reviewed','actioned','archived')),
  created_at    timestamptz not null default now()
);

create index if not exists feedback_user_id_idx   on public.feedback (user_id);
create index if not exists feedback_created_at_idx on public.feedback (created_at desc);
create index if not exists feedback_status_idx     on public.feedback (status);

alter table public.feedback enable row level security;

-- Users may insert their own feedback rows.
drop policy if exists "feedback_insert_own" on public.feedback;
create policy "feedback_insert_own" on public.feedback
  for insert to authenticated
  with check (auth.uid() = user_id);

-- Users may read their own feedback.
drop policy if exists "feedback_select_own" on public.feedback;
create policy "feedback_select_own" on public.feedback
  for select to authenticated
  using (auth.uid() = user_id);

-- Admin reads go through /api/admin/feedback using the service-role key,
-- which bypasses RLS — no admin SELECT policy is required here.
