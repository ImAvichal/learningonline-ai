-- migrations/backfill-journey-tier.sql
-- v2.0 — grant existing users Journey access and stop tiers ever being NULL.
-- Run in the Supabase SQL editor. Idempotent — safe to run more than once.
-- Pairs with the lib/auth.js change (new signups now default to 'parents').

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 0 (optional) — DRY RUN: see how many rows will change before you commit.
-- Run this SELECT on its own first.
-- ─────────────────────────────────────────────────────────────────────────────
-- select
--   count(*) filter (where selected_tier is null)                    as null_tier,
--   count(*) filter (where selected_tier = 'parents')                as parents_tier,
--   count(*) filter (where selected_tier = 'journey')                as journey_tier,
--   count(*) filter (where selected_tier = 'pro')                    as pro_tier,
--   count(*)                                                         as total
-- from public.users_profile;

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 1 — Backfill: give every existing NON-PRO user Journey access.
-- Pro users are deliberately left untouched (never downgrade a paying customer).
-- ─────────────────────────────────────────────────────────────────────────────
update public.users_profile
set    selected_tier = 'journey',
       user_type     = 'journey'
where  selected_tier is null;

-- If you ALSO want to move existing free 'parents' accounts up to Journey,
-- uncomment this block. (Leave it commented to preserve deliberate parents-only
-- enrolments.)
-- update public.users_profile
-- set    selected_tier = 'journey',
--        user_type     = 'journey'
-- where  selected_tier = 'parents';

-- Safety net: catch any row where only user_type was left NULL.
update public.users_profile
set    user_type = selected_tier
where  user_type is null
  and  selected_tier is not null;

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 2 — Stop new NULLs at the database level (belt-and-braces alongside the
-- lib/auth.js fix). New rows that don't specify a tier default to the free base.
-- ─────────────────────────────────────────────────────────────────────────────
alter table public.users_profile alter column selected_tier set default 'parents';
alter table public.users_profile alter column user_type     set default 'parents';

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 3 (optional, recommended) — enforce NOT NULL so a tier can never be blank
-- again. Apply this ONLY AFTER you've deployed the lib/auth.js change and
-- confirmed a fresh signup writes a tier (otherwise a stray NULL insert would
-- fail). Run the STEP 0 dry run again first to confirm null_tier = 0.
-- ─────────────────────────────────────────────────────────────────────────────
-- alter table public.users_profile alter column selected_tier set not null;
-- alter table public.users_profile alter column user_type     set not null;
