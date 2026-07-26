// pages/checkout.js — Combined checkout: in-page auth + order summary + payment
//
// Collapses the old pricing → login → signup → checkout → Stripe funnel into a
// single authenticated page. Unauthenticated visitors authenticate in place
// (left column); authenticated visitors see their identity + the payment action.
//
// Stripe model: HOSTED CHECKOUT (redirect). handlePay() POSTs to
// /api/create-checkout-session and redirects to session.url. Unchanged.
//
// States rendered:
//   - loading            → spinner (auth still settling)
//   - unauthenticated    → left: CheckoutAuthPanel, right: order summary
//   - already owns tier  → "You already have access" panel
//   - free (Parents)     → authed, skip payment, "Enrol for free" → dashboard
//   - paid / upgrade     → authed, redirect to hosted Stripe
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/auth'
import { useRegion } from '../lib/region'
import { REGIONAL_PRICING } from '../data/tiers'
import { Card, Spinner, TierBadge, Input } from '../components/ui'
import { TIERS } from '../data/tiers'
import { trackBeginCheckout } from '../lib/gtm'

// ── In-page auth panel (left column when not signed in) ──────────────────────
// Sign-up and sign-in complete IN PLACE — no navigation. Supabase email
// confirmation is off, so signup()/login() return a live session; the parent
// page re-renders into the authenticated state as soon as `user` populates via
// onAuthStateChange. OAuth round-trips through /auth/callback, which honours the
// ?next= we pass as returnUrl, landing the user back on this exact checkout.
function CheckoutAuthPanel({ returnUrl }) {
  const { login, signup, loginWithGoogle, loginWithLinkedIn } = useAuth()
  const [mode, setMode]             = useState('signup')   // 'signup' | 'signin'
  const [form, setForm]             = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors]         = useState({})
  const [submitting, setSubmitting] = useState(false)

  const set = (f) => (e) => { setForm(p => ({ ...p, [f]: e.target.value })); setErrors(p => ({ ...p, [f]: '' })) }
  const switchMode = (m) => { setMode(m); setErrors({}) }

  const validateSignup = () => {
    const e = {}
    if (!form.name.trim())  e.name     = 'Name is required'
    if (!form.email)        e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.password)     e.password = 'Password required'
    else if (form.password.length < 8) e.password = 'Min 8 characters'
    if (form.password !== form.confirm) e.confirm = "Passwords don't match"
    return e
  }

  const submit = async (e) => {
    e.preventDefault()
    setErrors({})

    if (mode === 'signup') {
      const errs = validateSignup()
      if (Object.keys(errs).length) { setErrors(errs); return }
      setSubmitting(true)
      const res = await signup(form.email, form.password, form.name)
      if (res.success) {
        // Hard-navigate to the same checkout URL so a fresh mount re-reads the
        // persisted session via init(). This avoids relying on the
        // onAuthStateChange listener to propagate `user` in place, which is
        // unreliable (the async listener can hold an auth lock across loadUser).
        window.location.assign(returnUrl)
        return
      }
      const msg = res.error || ''
      if (/already (registered|exists|been registered)|user already/i.test(msg)) {
        setErrors({ server: 'An account with this email already exists — please sign in instead.' })
        setMode('signin')
      } else {
        setErrors({ server: msg || 'Something went wrong. Please try again.' })
      }
      setSubmitting(false)
    } else {
      if (!form.email || !form.password) { setErrors({ server: 'Please enter your email and password.' }); return }
      setSubmitting(true)
      const res = await login(form.email, form.password)
      if (res.success) {
        window.location.assign(returnUrl)
        return
      }
      const msg = res.error || ''
      const friendly = /invalid login credentials/i.test(msg)
        ? 'Email or password is incorrect.'
        : (msg || 'Could not sign in. Please try again.')
      setErrors({ server: friendly })
      setSubmitting(false)
    }
  }

  if (submitting) {
    return (
      <Card className="p-8 text-center">
        <div className="flex justify-center mb-4"><Spinner size="lg" /></div>
        <div className="font-display font-bold text-sm mb-1">Setting up your account…</div>
        <p className="text-xs text-muted">This usually takes a few seconds.</p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h2 className="font-display font-bold text-lg mb-1">
        {mode === 'signup' ? 'Create your account' : 'Sign in to continue'}
      </h2>
      <p className="text-muted text-sm mb-6">
        {mode === 'signup' ? (
          <>Already have an account?{' '}
            <button type="button" onClick={() => switchMode('signin')} className="text-blue-bright hover:underline">Sign in</button>
          </>
        ) : (
          <>New to LeO AI?{' '}
            <button type="button" onClick={() => switchMode('signup')} className="text-blue-bright hover:underline">Create an account</button>
          </>
        )}
      </p>

      {errors.server && (
        <div className="mb-5 p-4 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm break-words">{errors.server}</div>
      )}

      <button type="button" onClick={() => loginWithGoogle(returnUrl)}
        className="w-full flex items-center justify-center gap-3 py-3 border border-white/15 rounded-lg hover:border-white/30 hover:bg-white/[0.04] transition-all text-sm font-display font-bold mb-3">
        <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 6.294C4.672 4.169 6.656 3.58 9 3.58z"/></svg>
        Continue with Google
      </button>

      <button type="button" onClick={() => loginWithLinkedIn(returnUrl)}
        className="w-full flex items-center justify-center gap-3 py-3 border border-white/15 rounded-lg hover:border-white/30 hover:bg-white/[0.04] transition-all text-sm font-display font-bold mb-5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        Continue with LinkedIn
      </button>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-muted">or {mode === 'signup' ? 'sign up' : 'sign in'} with email</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <form onSubmit={submit} className="space-y-4">
        {mode === 'signup' && (
          <Input label="Full Name" type="text" placeholder="Your name" value={form.name} onChange={set('name')} error={errors.name} />
        )}
        <Input label={mode === 'signup' ? 'Work Email' : 'Email'} type="email" placeholder="you@company.com" value={form.email} onChange={set('email')} error={errors.email} />
        <Input label="Password" type="password" placeholder={mode === 'signup' ? 'Min 8 characters' : '••••••••'} value={form.password} onChange={set('password')} error={errors.password} />
        {mode === 'signup' && (
          <Input label="Confirm Password" type="password" placeholder="••••••••" value={form.confirm} onChange={set('confirm')} error={errors.confirm} />
        )}
        {mode === 'signin' && (
          <div className="text-right">
            <Link href="/forgot-password" className="text-xs text-muted hover:text-blue-bright transition-colors">Forgot your password?</Link>
          </div>
        )}
        <button type="submit"
          className="w-full py-3.5 bg-blue hover:bg-blue-bright text-white font-display font-bold rounded-lg transition-all shadow-[0_0_24px_rgba(26,110,255,0.4)] flex items-center justify-center gap-2">
          {mode === 'signup' ? 'Create account & continue →' : 'Sign in & continue →'}
        </button>
        {mode === 'signup' && (
          <p className="text-xs text-muted">
            By creating an account you agree to our{' '}
            <Link href="/terms" className="text-blue-bright hover:underline">Terms</Link> and{' '}
            <Link href="/privacy" className="text-blue-bright hover:underline">Privacy Policy</Link>.
          </p>
        )}
      </form>
    </Card>
  )
}

export default function Checkout() {
  const { user, loading: authLoading, updateUser } = useAuth()
  const router  = useRouter()
  const { tier: tierId = 'journey', interval = 'monthly', payment_success, cancelled } = router.query
  const tier    = TIERS[tierId] || TIERS.journey
  const { region } = useRegion()
  const regionalConfig = REGIONAL_PRICING[region] || REGIONAL_PRICING.AU
  const priceLabel = regionalConfig?.plans?.[tierId]?.[interval]?.label || tier.priceDisplay

  const isFreeTier = tierId === 'parents' || tier.free === true

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')

  // Where OAuth returns to (survives the provider round-trip via /auth/callback)
  const returnUrl = `/checkout?tier=${tierId}&interval=${interval}`

  // Tier hierarchy for entitlement comparison: parents (free) < journey < pro
  const TIER_RANK = { parents: 0, journey: 1, pro: 2 }
  const userRank   = user?.tier && user.tier !== 'parents' ? (TIER_RANK[user.tier] ?? 0) : -1
  const targetRank = TIER_RANK[tierId] ?? 0
  const isUpgrade  = userRank >= 0 && userRank < targetRank
  const alreadyHas = userRank >= targetRank && user?.tier !== 'parents' && !isFreeTier

  // Demo-mode / legacy success handling (kept — harmless, supports no-Stripe preview)
  useEffect(() => {
    if (payment_success === 'true' && user && !success) grantAccess()
    if (cancelled === 'true') setError('Payment was cancelled. You can try again below.')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment_success, cancelled, user])

  // begin_checkout — fire once for an authenticated user viewing a paid tier they don't own
  useEffect(() => {
    if (!router.isReady || !user || alreadyHas || isFreeTier) return
    const amountLabel = regionalConfig?.plans?.[tierId]?.[interval]?.amount
    trackBeginCheckout({
      tier: tierId,
      interval,
      value: typeof amountLabel === 'number' ? amountLabel : undefined,
      currency: regionalConfig?.currency || 'AUD',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, user, tierId, interval, alreadyHas, isFreeTier])

  const grantAccess = () => {
    updateUser({ tier: tierId, user_type: tierId, enrolledAt: new Date().toISOString() })
    setSuccess(true)
    setTimeout(() => router.push('/dashboard'), 2500)
  }

  // Free Parents path: auth is already enforced by render; skip payment, enrol, go to dashboard
  const handleFreeEnrol = async () => {
    setLoading(true); setError('')
    try {
      await updateUser({ tier: tierId, user_type: tierId, enrolledAt: new Date().toISOString() })
      router.push('/dashboard')
    } catch (err) {
      setError('Could not complete enrolment. Please try again.')
      setLoading(false)
    }
  }

  // Journey is free for one month. If this user already used their month, send
  // them to Pro rather than granting a second free month.
  const handleJourneyGrant = async () => {
    if (user?.journeyExpiresAt && new Date(user.journeyExpiresAt).getTime() < Date.now()) {
      setError('Your free month of Journey has ended. Upgrade to Pro to keep learning.')
      return
    }
    setLoading(true); setError('')
    try {
      const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      await updateUser({ tier: 'journey', journeyExpiresAt: expires, enrolledAt: new Date().toISOString() })
      router.push('/dashboard')
    } catch (err) {
      setError('Could not start your free month. Please try again.')
      setLoading(false)
    }
  }

  const handlePay = async () => {
    setLoading(true); setError('')
    console.log('[Checkout] Plan:', tierId, '| Interval:', interval, '| Region:', region, '| Price:', priceLabel)
    try {
      const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      const isConfigured = stripeKey && !stripeKey.includes('YOUR_KEY') && stripeKey.startsWith('pk_')

      if (isConfigured) {
        const res = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tierId, interval, region, userId: user.id, email: user.email, name: user.name }),
        })
        if (!res.ok) { const b = await res.json(); throw new Error(b.error || 'Server error') }
        const { url } = await res.json()
        window.location.href = url
      } else {
        await new Promise(r => setTimeout(r, 1600))
        grantAccess()
      }
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again or contact hello@learningonline.ai')
      setLoading(false)
    }
  }

  // ── Loading — wait for auth to settle before choosing what to show ──
  if (authLoading || !router.isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-3"><Spinner size="lg" /></div>
          <p className="text-sm text-muted">Loading checkout…</p>
        </div>
      </div>
    )
  }

  // ── Success screen (demo / legacy grant) ──
  if (success) return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-7xl mb-6">🎉</div>
        <h1 className="font-display font-black text-3xl mb-3">Welcome to LeO AI!</h1>
        <p className="text-muted mb-2">Payment confirmed. Your account has been upgraded.</p>
        <p className="text-sm text-muted">Redirecting to your dashboard...</p>
        <div className="mt-6">
          <Link href="/dashboard" className="text-blue-bright hover:underline text-sm font-display font-bold">Go now →</Link>
        </div>
      </div>
    </div>
  )

  // ── Already-owns guard: friendly panel, never a duplicate purchase ──
  if (user && alreadyHas) return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/5">
          <Link href="/" className="font-display font-black text-xl" style={{letterSpacing: "-0.02em"}}>
            <span style={{letterSpacing: "-0.04em"}}>LeO</span>{" "}<span className="text-blue">AI</span>
          </Link>
        </div>
        <Card className="p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-success/15 border border-success/30 flex items-center justify-center text-success text-2xl mx-auto mb-5">✓</div>
          <h1 className="font-display font-bold text-2xl mb-2">You already have access</h1>
          <p className="text-muted text-sm mb-7 max-w-md mx-auto">
            Your {TIERS[user.tier]?.name || 'current'} plan already includes everything in {tier.name}. There's nothing to purchase.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard" className="px-6 py-3 bg-blue hover:bg-blue-bright text-white font-display font-bold rounded-lg transition-all">Go to Dashboard</Link>
            <Link href="/dashboard/course" className="px-6 py-3 border border-white/15 hover:border-white/30 font-display font-bold rounded-lg transition-all">Continue Learning</Link>
          </div>
        </Card>
      </div>
    </div>
  )

  const isDemo = !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.includes('YOUR_KEY')

  const headingText = !user
    ? `You're enrolling in ${tier.name}`
    : isUpgrade   ? 'Upgrade your subscription'
    : isFreeTier  ? `Enrol in ${tier.name}`
    : isJourneyFree ? `Start your free month of ${tier.name}`
    : 'Complete your enrolment'

  const isJourneyFree = tierId === 'journey'

  const primaryLabel = loading
    ? 'Processing…'
    : isFreeTier ? 'Enrol for free →'
    : isJourneyFree ? 'Start your free month →'
    : isDemo     ? `Simulate Payment — ${priceLabel}`
    : `🔒 Pay ${priceLabel} Securely`

  const onPrimary = isFreeTier ? handleFreeEnrol : isJourneyFree ? handleJourneyGrant : handlePay

  // ── Main two-column checkout ──
  return (
    <>
      <Head><title>Checkout — LeO AI</title></Head>
      <div className="min-h-screen pt-8 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/5">
            <Link href="/" className="font-display font-black text-xl" style={{letterSpacing: "-0.02em"}}>
              <span style={{letterSpacing: "-0.04em"}}>LeO</span>{" "}<span className="text-blue">AI</span>
            </Link>
            {!isFreeTier && (
              <div className="text-xs text-muted flex items-center gap-1.5">🔒 Secure checkout via Stripe</div>
            )}
          </div>

          <div className="grid md:grid-cols-[1fr_340px] gap-10">
            {/* LEFT — auth (unauthenticated) or account + payment action (authenticated) */}
            <div>
              <h1 className="font-display font-bold text-3xl mb-8">{headingText}</h1>

              {!user ? (
                <CheckoutAuthPanel returnUrl={returnUrl} />
              ) : (
                <>
                  {isUpgrade && (
                    <Card className="p-6 mb-5 bg-blue/[0.04] border-blue/25">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl mt-0.5">↑</div>
                        <div className="flex-1">
                          <div className="font-display font-bold text-base mb-2">
                            Upgrading from {TIERS[user.tier]?.name} to {tier.name}
                          </div>
                          <p className="text-sm text-white/85 leading-relaxed mb-3">
                            You'll unlock the remaining modules: <strong>Responsible AI</strong>, <strong>Sustainability</strong>, <strong>Multimodal AI & Orchestration</strong>, and the <strong>90-Day Execution Plan</strong> — plus all Pro deliverables and frameworks.
                          </p>
                          <div className="text-xs text-muted leading-relaxed">
                            <strong className="text-white/80">Billing:</strong> Your Pro subscription starts today at {priceLabel} and bills from now on. Your existing {TIERS[user.tier]?.name} subscription will be cancelled automatically, so you won't be billed for it again.
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}

                  {error && <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm">{error}</div>}

                  <Card className="p-6 mb-5">
                    <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-4">Enrolled as</div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue/20 border border-blue/30 flex items-center justify-center font-display font-bold text-blue-bright flex-shrink-0">
                        {user.name?.[0]?.toUpperCase() || 'S'}
                      </div>
                      <div>
                        <div className="font-display font-bold text-sm">{user.name}</div>
                        <div className="text-xs text-muted">{user.email}</div>
                      </div>
                      <TierBadge tier={tierId} label={tier.label} className="ml-auto" />
                    </div>
                  </Card>

                  <Card className="p-6 mb-5">
                    <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-4">
                      {(isFreeTier || isJourneyFree) ? 'Enrolment' : 'Payment'}
                    </div>
                    {(isFreeTier || isJourneyFree) ? (
                      <div className="p-4 rounded-lg bg-success/8 border border-success/20">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">🎁</span>
                          <div>
                            <div className="font-display font-bold text-sm text-white">No payment required</div>
                            <div className="text-xs text-muted">{isJourneyFree ? "Journey is free for one month — no card needed." : "This module is free — you'll get instant access after enrolling."}</div>
                          </div>
                        </div>
                      </div>
                    ) : isDemo ? (
                      <div className="p-3 rounded-lg bg-amber-400/10 border border-amber-400/20 text-xs text-amber-400">
                        ⚠️ Demo mode — Stripe keys not configured. Click Pay to simulate enrolment.
                      </div>
                    ) : (
                      <div className="p-4 rounded-lg bg-blue/8 border border-blue/20">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xl">🔒</span>
                          <div>
                            <div className="font-display font-bold text-sm text-white">Secure payment via Stripe</div>
                            <div className="text-xs text-muted">You'll be redirected to Stripe's secure checkout page</div>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay'].map(p => (
                            <span key={p} className="text-xs text-muted bg-white/5 border border-white/10 px-2 py-0.5 rounded">{p}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>

                  <button onClick={onPrimary} disabled={loading}
                    className="w-full py-4 bg-blue hover:bg-blue-bright text-white font-display font-bold text-base rounded-xl transition-all shadow-[0_0_30px_rgba(26,110,255,0.4)] disabled:opacity-50 flex items-center justify-center gap-3">
                    {loading ? <><Spinner size="md" /> Processing...</> : primaryLabel}
                  </button>

                  {isFreeTier ? (
                    <p className="text-center text-xs text-muted mt-3">Instant access after enrolling · no card required</p>
                  ) : isJourneyFree ? (
                    <div className="mt-4 p-4 rounded-lg bg-success/[0.06] border border-success/25 text-center max-w-md mx-auto">
                      <div className="font-display font-bold text-sm mb-1">🎁 Free for one month</div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        No card, no charge. We'll remind you before it ends — then you can upgrade to Pro to keep going.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-center text-xs text-muted mt-3 leading-relaxed max-w-md mx-auto">
                        <span className="font-bold">3-day refund policy</span> — request a refund within 72 hours of enrolment if you don't believe the platform delivers value. <span className="italic">Approved refunds processed in 3–5 business days.</span>
                      </p>
                      <p className="text-center text-[10px] text-muted/70 mt-1">Instant access after payment</p>
                    </>
                  )}
                </>
              )}
            </div>

            {/* RIGHT — order summary */}
            <div>
              <Card glow className="p-6 sticky top-8">
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-5">Order Summary</div>
                <div className="flex gap-3 mb-6 pb-6 border-b border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-blue/20 border border-blue/30 flex items-center justify-center text-2xl flex-shrink-0">🎓</div>
                  <div>
                    <div className="font-display font-bold text-sm">LeO AI</div>
                    <div className="text-xs text-muted mt-0.5">
                      {tier.name}{isFreeTier ? ' · Free module' : isJourneyFree ? ' · Free for one month' : ` · ${interval === 'annual' ? 'Annual' : 'Monthly'}`}
                    </div>
                    <TierBadge tier={tierId} label={tier.label} className="mt-2" />
                  </div>
                </div>
                <div className="space-y-2 mb-5">
                  {tier.features.slice(0, 4).map(f => (
                    <div key={f} className="flex gap-2 text-xs text-muted">
                      <span className="text-success flex-shrink-0">✓</span>{f}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-baseline pt-4 border-t border-white/5 mb-6">
                  <span className="font-display font-bold">Total</span>
                  <span className="font-display font-black whitespace-nowrap" style={{fontSize: 'clamp(20px, 2.4vw, 26px)'}}>{isJourneyFree ? 'Free' : priceLabel}</span>
                </div>
                <div className="space-y-1.5">
                  {((isFreeTier || isJourneyFree)
                    ? ['🔒 256-bit SSL encryption', '📧 Confirmation to your email', '♾️ Instant access', '🎁 No card required']
                    : ['🔒 256-bit SSL encryption', '💳 Powered by Stripe', '📧 Receipt to your email', '♾️ Instant access', '🛡️ 3-day refund policy']
                  ).map(s => (
                    <div key={s} className="text-xs text-muted">{s}</div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
