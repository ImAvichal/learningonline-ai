// pages/checkout.js — Updated pricing, no GST
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/auth'
import { useRegion } from '../lib/region'
import { REGIONAL_PRICING } from '../data/tiers'
import { Card, Spinner, TierBadge } from '../components/ui'
import { TIERS } from '../data/tiers'

export default function Checkout() {
  const { user, loading: authLoading, updateUser } = useAuth()
  const router  = useRouter()
  const { tier: tierId = 'journey', interval = 'monthly', payment_success, cancelled } = router.query
  const tier    = TIERS[tierId] || TIERS.journey
  const { region } = useRegion()
  const regionalConfig = REGIONAL_PRICING[region] || REGIONAL_PRICING.AU
  const priceLabel = regionalConfig?.plans?.[tierId]?.[interval]?.label || tier.priceDisplay

  const [loading,   setLoading]   = useState(false)
  const [success,   setSuccess]   = useState(false)
  const [error,     setError]     = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [promoMsg,  setPromoMsg]  = useState('')   // 'valid' | 'invalid' | ''

  useEffect(() => {
    if (!router.isReady) return
    if (authLoading) return  // Wait for auth state to fully restore — prevents flash redirect
    if (!user) {
      router.push(`/signup?tier=${tierId}&interval=${interval}`)
      return
    }
    // If user already has paid tier, redirect to dashboard (don't show checkout)
    if (user.tier && !user.isDevUser) {
      router.push('/dashboard')
    }
  }, [user, authLoading, tierId, interval, router.isReady])

  useEffect(() => {
    if (payment_success === 'true' && user && !success) grantAccess()
    if (cancelled === 'true') setError('Payment was cancelled. You can try again below.')
  }, [payment_success, cancelled, user])

  const grantAccess = () => {
    updateUser({ tier: tierId, user_type: tierId, enrolledAt: new Date().toISOString() })
    setSuccess(true)
    setTimeout(() => router.push('/dashboard'), 2500)
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
          body: JSON.stringify({ tierId, interval, region, userId: user.id, email: user.email, name: user.name, promoCode: promoCode.trim() }),
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

  if (!user) return null

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

  const isDemo = !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.includes('YOUR_KEY')

  return (
    <>
      <Head><title>Checkout — LeO AI</title></Head>
      <div className="min-h-screen pt-8 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/5">
            <Link href="/" className="font-display font-black text-xl" style={{letterSpacing: "-0.02em"}}>
              <span style={{letterSpacing: "-0.04em"}}>LeO</span>{" "}<span className="text-blue">AI</span>
            </Link>
            <div className="text-xs text-muted flex items-center gap-1.5">🔒 Secure checkout via Stripe</div>
          </div>

          <div className="grid md:grid-cols-[1fr_340px] gap-10">
            <div>
              <h1 className="font-display font-bold text-3xl mb-8">Complete your enrolment</h1>

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
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-4">Payment</div>
                {isDemo ? (
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

              <button onClick={handlePay} disabled={loading}
                className="w-full py-4 bg-blue hover:bg-blue-bright text-white font-display font-bold text-base rounded-xl transition-all shadow-[0_0_30px_rgba(26,110,255,0.4)] disabled:opacity-50 flex items-center justify-center gap-3">
                {loading
                  ? <><Spinner size="md" /> Processing...</>
                  : isDemo
                  ? `Simulate Payment — ${priceLabel}`
                  : `🔒 Pay ${priceLabel} Securely`
                }
              </button>
              <p className="text-center text-xs text-muted mt-3 leading-relaxed max-w-md mx-auto">
                <span className="font-bold">7-day money-back guarantee</span> — if you don't believe this will deliver measurable value, we'll refund you in full. <span className="italic">No questions asked.</span>
              </p>
              <p className="text-center text-[10px] text-muted/70 mt-1">Instant access after payment</p>
            </div>

            {/* Order summary */}
            <div>
              <Card glow className="p-6 sticky top-8">
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-5">Order Summary</div>
                <div className="flex gap-3 mb-6 pb-6 border-b border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-blue/20 border border-blue/30 flex items-center justify-center text-2xl flex-shrink-0">🎓</div>
                  <div>
                    <div className="font-display font-bold text-sm">LeO AI</div>
                    <div className="text-xs text-muted mt-0.5">{tier.name} · {interval === 'annual' ? 'Annual' : 'Monthly'}</div>
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
                  <span className="font-display font-black text-3xl">{priceLabel}</span>
                </div>
                <div className="space-y-1.5">
                  {['🔒 256-bit SSL encryption', '💳 Powered by Stripe', '📧 Receipt to your email', '♾️ Instant access', '🛡️ 7-day money-back guarantee'].map(s => (
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
