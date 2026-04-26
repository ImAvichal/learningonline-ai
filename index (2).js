// pages/api/create-checkout-session.js
// Called by /checkout to create a Stripe Checkout session.
// In demo mode this is never reached — payment is simulated client-side.
//
// SUPABASE SCHEMA (run once in Supabase SQL Editor):
// ─────────────────────────────────────────────────
// CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
//
// CREATE TABLE public.users (
//   id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//   email             TEXT UNIQUE NOT NULL,
//   name              TEXT,
//   tier              TEXT,          -- 'individual' | 'smb' | 'enterprise'
//   user_type         TEXT,
//   company           TEXT,
//   job_title         TEXT,
//   stripe_customer_id TEXT,
//   enrolled_at       TIMESTAMPTZ,
//   created_at        TIMESTAMPTZ DEFAULT NOW()
// );
//
// CREATE TABLE public.progress (
//   id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//   user_id      UUID REFERENCES public.users(id) ON DELETE CASCADE,
//   lesson_id    TEXT NOT NULL,
//   module_id    TEXT NOT NULL,
//   completed    BOOLEAN DEFAULT FALSE,
//   completed_at TIMESTAMPTZ,
//   UNIQUE(user_id, lesson_id)
// );
//
// CREATE TABLE public.payments (
//   id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//   user_id               UUID REFERENCES public.users(id),
//   stripe_session_id     TEXT UNIQUE,
//   stripe_payment_intent TEXT,
//   tier                  TEXT NOT NULL,
//   amount                INTEGER,
//   currency              TEXT DEFAULT 'aud',
//   status                TEXT DEFAULT 'pending',
//   created_at            TIMESTAMPTZ DEFAULT NOW()
// );
//
// CREATE TABLE public.teams (
//   id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//   name       TEXT,
//   owner_id   UUID REFERENCES public.users(id),
//   tier       TEXT DEFAULT 'enterprise',
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// CREATE TABLE public.team_members (
//   team_id   UUID REFERENCES public.teams(id) ON DELETE CASCADE,
//   user_id   UUID REFERENCES public.users(id) ON DELETE CASCADE,
//   role      TEXT DEFAULT 'member',
//   joined_at TIMESTAMPTZ DEFAULT NOW(),
//   PRIMARY KEY (team_id, user_id)
// );
//
// -- Enable Row Level Security
// ALTER TABLE public.users        ENABLE ROW LEVEL SECURITY;
// ALTER TABLE public.progress     ENABLE ROW LEVEL SECURITY;
// ALTER TABLE public.payments     ENABLE ROW LEVEL SECURITY;
// ALTER TABLE public.teams        ENABLE ROW LEVEL SECURITY;
// ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
//
// CREATE POLICY "users_own"  ON public.users    FOR ALL USING (auth.uid() = id);
// CREATE POLICY "prog_own"   ON public.progress FOR ALL USING (auth.uid() = user_id);
// CREATE POLICY "pay_read"   ON public.payments FOR SELECT USING (auth.uid() = user_id);

import Stripe from 'stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  const priceMap = {
    individual: process.env.STRIPE_PRICE_INDIVIDUAL,
    smb:        process.env.STRIPE_PRICE_SMB,
    enterprise: process.env.STRIPE_PRICE_ENTERPRISE,
  }

  const { tierId, userId, email, name } = req.body
  const priceId = priceMap[tierId]
  if (!priceId) return res.status(400).json({ error: 'Invalid tier' })

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      customer_email: email,
      client_reference_id: userId,
      metadata: { userId, tierId, name },
      // Australian GST (Stripe calculates automatically)
      automatic_tax: { enabled: true },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?tier=${tierId}&payment_success=true`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/checkout?tier=${tierId}&cancelled=true`,
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    res.status(500).json({ error: err.message })
  }
}
