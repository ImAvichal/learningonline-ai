// pages/checkout.js — Real Stripe integration
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/auth'
import { Logo, Card, Spinner, TierBadge } from '../components/ui'
import { TIERS } from '../data/tiers'

export default function Checkout() {
  const { user, updateUser } = useAuth()
  const router  = useRouter()
  const { tier: tierId = 'smb', payment_success, cancelled } = router.query
  const tier    = TIERS[tierId] || TIERS.smb

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')

  // Redirect if not logged in
  useEffect(() => {
    if (router.isReady && !user) {
      router.push(`/signup?tier=${tierId}`)
    }
  }, [user, tierId, router.isReady])

  // Handle Stripe success return
  useEffect(() => {
    if (payment_success === 'true' && user && !success) {
      grantAccess()
    }
    if (cancelled === 'true') {
      setError('Payment was cancelled. You can try again below.')
    }
  }, [payment_success, cancelled, user])

  const grantAccess = () => {
    updateUser({
      tier:       tierId,
      user_type:  tierId,
      enrolledAt: new Date().toISOString(),
    })
    setSuccess(true)
    setTimeout(() => router.push('/dashboard'), 2500)
  }

  const handlePay = async () => {
    setLoading(true)
    setError('')

    try {
      // Check if Stripe keys are configured (production mode)
      const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      const isConfigured = stripeKey && stripeKey !== 'pk_test_YOUR_KEY' && stripeKey.startsWith('pk_')

      if (isConfigured) {
        // ── PRODUCTION: Create Stripe Checkout session ──────────────────────
        const res = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tierId,
            userId:  user.id,
            email:   user.email,
            name:    user.name,
          }),
        })

        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body.error || `Server error: ${res.status}`)
        }

        const { url } = await res.json()
        if (!url) throw new Error('No checkout URL returned from server.')

        // Redirect to Stripe Checkout
        window.location.href = url

      } else {
        // ── DEMO: Simulate payment (Stripe not yet configured) ──────────────
        console.log('Demo mode: Stripe keys not configured. Simulating payment.')
        await new Promise(r => setTimeout(r, 1600))
        grantAccess()
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err.message || 'Payment failed. Please try again or contact hello@learningonline.ai')
      setLoading(false)
    }
  }

  if (!user) return null

  if (success) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-7xl mb-6">🎉</div>
          <h1 className="font-display font-black text-3xl mb-3">Welcome to Flowcore AI Academy!</h1>
          <p className="text-muted mb-2">Payment confirmed. Your account has been upgraded.</p>
          <p className="text-sm text-muted">Redirecting to your dashboard...</p>
          <div className="mt-6">
            <Link href="/dashboard" className="text-blue-bright hover:underline text-sm font-display font-bold">
              Go now →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const isDemo = !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === 'pk_test_YOUR_KEY'

  return (
    <>
      <Head><title>Checkout — Flowcore AI Academy</title></Head>
      <div className="min-h-screen pt-8 pb-20">
        <div className="max-w-5xl mx-auto px-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/5">
            <div className="font-display font-black text-xl">
              LearningOnline<span className="text-blue">.AI</span>
            </div>
            <div className="text-xs text-muted flex items-center gap-1.5">
              🔒 Secure checkout via Stripe
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_360px] gap-10">
            {/* Left — payment */}
            <div>
              <h1 className="font-display font-bold text-3xl mb-8">Complete your enrolment</h1>

              {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Account */}
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
                  <TierBadge tier={tierId} className="ml-auto" />
                </div>
              </Card>

              {/* Payment */}
              <Card className="p-6 mb-5">
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-4">Payment</div>

                {isDemo ? (
                  // Demo mode UI
                  <div>
                    <div className="space-y-3 mb-4 opacity-50 pointer-events-none">
                      <div>
                        <label className="block text-xs font-display font-bold text-muted uppercase tracking-wider mb-2">Card Number</label>
                        <div className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-muted text-sm flex justify-between">
                          <span>4242 4242 4242 4242</span><span>💳</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-display font-bold text-muted uppercase tracking-wider mb-2">Expiry</label>
                          <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-muted text-sm">12 / 27</div>
                        </div>
                        <div>
                          <label className="block text-xs font-display font-bold text-muted uppercase tracking-wider mb-2">CVC</label>
                          <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-muted text-sm">•••</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-400/10 border border-amber-400/20 text-xs text-amber-400">
                      ⚠️ Demo mode — Stripe keys not yet configured. Click pay to simulate enrolment. Add your Stripe keys in Vercel to enable real payments.
                    </div>
                  </div>
                ) : (
                  // Production: Stripe Elements mount here
                  // When NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is set, we redirect to
                  // Stripe-hosted checkout (more secure, handles card UI for us)
                  <div className="p-4 rounded-lg bg-blue/8 border border-blue/20">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">🔒</span>
                      <div>
                        <div className="font-display font-bold text-sm text-white">Secure payment via Stripe</div>
                        <div className="text-xs text-muted">You'll be redirected to Stripe's secure checkout page</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay'].map(p => (
                        <span key={p} className="text-xs text-muted bg-white/5 border border-white/10 px-2 py-0.5 rounded">{p}</span>
                      ))}
                    </div>
                  </div>
                )}
              </Card>

              <button
                onClick={handlePay}
                disabled={loading}
                className="w-full py-4 bg-blue hover:bg-blue-bright text-white font-display font-bold text-base rounded-xl transition-all shadow-[0_0_30px_rgba(26,110,255,0.4)] hover:shadow-[0_0_50px_rgba(26,110,255,0.6)] disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading
                  ? <><Spinner size="md"/> Processing...</>
                  : isDemo
                  ? `Simulate Payment — ${tier.priceDisplay}`
                  : `🔒 Pay ${tier.priceDisplay} Securely via Stripe`
                }
              </button>

              <p className="text-center text-xs text-muted mt-3">
                14-day money-back guarantee · Instant access after payment
              </p>

              {!isDemo && (
                <p className="text-center text-xs text-muted mt-2">
                  You'll be redirected to Stripe's secure checkout. We never see your card details.
                </p>
              )}
            </div>

            {/* Right — order summary */}
            <div>
              <Card glow className="p-6 sticky top-8">
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-5">Order Summary</div>

                <div className="flex gap-3 mb-6 pb-6 border-b border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-blue/20 border border-blue/30 flex items-center justify-center text-2xl flex-shrink-0">🎓</div>
                  <div>
                    <div className="font-display font-bold text-sm">Flowcore AI Academy</div>
                    <div className="text-xs text-muted mt-0.5">{tier.label} · {tier.billing}</div>
                    <TierBadge tier={tierId} className="mt-2" />
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  {tier.features.slice(0, 5).map(f => (
                    <div key={f} className="flex gap-2 text-xs text-muted">
                      <span className="text-success flex-shrink-0">✓</span>{f}
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-white/5 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Subtotal</span>
                    <span>{tier.priceDisplay}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">GST (10%)</span>
                    <span className="text-muted">
                      {tier.price ? `$${(tier.price * 0.1).toFixed(0)}` : 'Calculated at checkout'}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-4 border-t border-white/5 mb-6">
                  <span className="font-display font-bold">Total (inc. GST)</span>
                  <span className="font-display font-black text-2xl">
                    {tier.price ? `$${(tier.price * 1.1).toFixed(0)}` : tier.priceDisplay}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {[
                    '🔒 256-bit SSL encryption',
                    '💳 Powered by Stripe',
                    '📧 Tax invoice to your email',
                    '♾️ Instant lifetime access',
                    '🛡️ 14-day money-back guarantee',
                  ].map(s => (
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
