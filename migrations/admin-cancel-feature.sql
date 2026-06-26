-- ════════════════════════════════════════════════════════════════════════════
-- Admin "cancel subscription" feature — Supabase schema changes
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- Safe to run once. Uses IF NOT EXISTS so re-running won't error.
-- ════════════════════════════════════════════════════════════════════════════

-- 1. Admin flag on user profiles -------------------------------------------------
ALTER TABLE users_profile
  ADD COLUMN IF NOT EXISTS is_admin boolean NOT NULL DEFAULT false;

-- 2. Last-login tracking (optional but used by the admin list) -------------------
--    If your users_profile already has last_sign_in_at, this is a no-op.
--    Note: Supabase Auth tracks last_sign_in_at on auth.users automatically;
--    if you prefer, you can read it from there instead. This column lets you
--    mirror it into users_profile for easy display.
ALTER TABLE users_profile
  ADD COLUMN IF NOT EXISTS last_sign_in_at timestamptz;

-- 3. Audit log table -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id                bigserial PRIMARY KEY,
  admin_id          uuid,
  admin_email       text,
  action            text NOT NULL,
  target_user_id    uuid,
  target_user_email text,
  cancellation_type text,           -- 'period_end' | 'immediate' | null
  reason            text,           -- optional free text
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_target ON admin_audit_log (target_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_created ON admin_audit_log (created_at DESC);

-- 4. Row Level Security ----------------------------------------------------------
-- The admin API routes use the SERVICE ROLE key, which bypasses RLS, so these
-- policies are a defence-in-depth measure to ensure the audit log and admin
-- flag are never readable/writable by ordinary client sessions.
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- No policy = no access for anon/authenticated roles. Service role still works.
-- (If you want admins to read the audit log from a client-side session later,
--  add a policy that checks users_profile.is_admin for auth.uid().)

-- ════════════════════════════════════════════════════════════════════════════
-- 5. MAKE YOURSELF AN ADMIN
-- Replace the email with YOUR account email, then run:
-- ════════════════════════════════════════════════════════════════════════════
-- UPDATE users_profile SET is_admin = true WHERE email = 'you@example.com';

-- Verify:
-- SELECT id, email, is_admin FROM users_profile WHERE is_admin = true;
