-- Le On AI — Supabase Schema v6
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users profile
CREATE TABLE IF NOT EXISTS public.users_profile (
  id                  UUID PRIMARY KEY,
  email               TEXT UNIQUE NOT NULL,
  full_name           TEXT,
  user_type           TEXT,
  selected_tier       TEXT,
  stripe_customer_id  TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Purchases
CREATE TABLE IF NOT EXISTS public.purchases (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID REFERENCES public.users_profile(id) ON DELETE CASCADE,
  tier              TEXT NOT NULL,
  amount            INTEGER,
  stripe_session_id TEXT UNIQUE,
  payment_status    TEXT DEFAULT 'pending',
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Course progress
CREATE TABLE IF NOT EXISTS public.course_progress (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES public.users_profile(id) ON DELETE CASCADE,
  module_id   TEXT NOT NULL,
  lesson_id   TEXT NOT NULL,
  completed   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Assessment scores
CREATE TABLE IF NOT EXISTS public.assessment_scores (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES public.users_profile(id) ON DELETE CASCADE,
  module_id      TEXT NOT NULL,
  score          INTEGER,
  score_category TEXT,
  answers_json   TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Contact queries
CREATE TABLE IF NOT EXISTS public.contact_queries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  company     TEXT,
  message     TEXT NOT NULL,
  query_type  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Downloads
CREATE TABLE IF NOT EXISTS public.downloads (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID REFERENCES public.users_profile(id) ON DELETE CASCADE,
  resource_id    TEXT NOT NULL,
  downloaded_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Resources (populated manually or via seed)
CREATE TABLE IF NOT EXISTS public.resources (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id     TEXT NOT NULL,
  title         TEXT NOT NULL,
  description   TEXT,
  tier_required TEXT DEFAULT 'individual',
  file_url      TEXT,
  format        TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.users_profile    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_progress  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads        ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "users_own_profile"   ON public.users_profile    FOR ALL USING (auth.uid() = id);
CREATE POLICY "users_own_purchases" ON public.purchases        FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "users_own_progress"  ON public.course_progress  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_scores"    ON public.assessment_scores FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_downloads" ON public.downloads        FOR ALL USING (auth.uid() = user_id);

-- Resources and contact_queries are public read or service-role only
CREATE POLICY "resources_public_read" ON public.resources FOR SELECT USING (true);
