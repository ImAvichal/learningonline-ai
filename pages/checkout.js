// pages/checkout.js
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/auth'
import { Logo, Card, Spinner, TierBadge } from '../components/ui'
import { TIERS } from '../data/tiers'

export default function Checkout() {
  const { user, updateUser } = useAuth()
  const router = useRouter()
  const { tier: tierId = 'smb' } = router.query
  const tier = TIERS[tierId] || TIERS.smb

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState('')

  useEffect(() => {
    if (!user) router.push(`/signup?tier=${tierId}`)
  }, [user, tierId, router])

  useEffect(() => {
    if (router.query.payment_success === 'true' && user) grant()
  }, [router.query, user])

  const grant = () => {
    updateUser({ tier: tierId, user_type: tierId, enrolledAt: new Date().toISOString() })
    setSuccess(true)
    setTimeout(() => router.push('/dashboard'), 2000)
  }

  const pay = async () => {
    setLoading(true); setError('')
    try {
      // PRODUCTION:
      // const res = await fetch('/api/create-checkout-session', {
      //   method:'POST', headers:{'Content-Type':'application/json'},
      //   body: JSON.stringify({ tierId, userId: user.id, email: user.email, name: user.name })
      // })
      // const { url } = await res.json()
      // window.location.href = url

      await new Promise(r => setTimeout(r, 1600))
      grant()
    } catch {
      setError('Payment failed. Please try again or contact hello@learningonline.ai')
      setLoading(false)
    }
  }

  if (!user) return null
  if (success) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center"><div className="text-6xl mb-6">🎉</div>
        <h1 className="font-display font-black text-3xl mb-4">Payment Successful!</h1>
        <p className="text-muted">Redirecting to your dashboard...</p>
      </div>
    </div>
  )

  return (
    <>
      <Head><title>Checkout — Flowcore AI Academy</title></Head>
      <div className="min-h-screen pt-8 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/5">
            <Logo />
            <div className="text-xs text-muted flex items-center gap-1.5">🔒 Secure checkout via Stripe</div>
          </div>

          <div className="grid md:grid-cols-[1fr_360px] gap-10">
            <div>
              <h1 className="font-display font-bold text-3xl mb-8">Complete your enrolment</h1>
              {error && <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm">{error}</div>}

              <Card className="p-6 mb-5">
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-4">Account</div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue/20 border border-blue/30 flex items-center justify-center font-display font-bold text-blue-bright">
                    {user.name?.[0]?.toUpperCase() || 'S'}
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm">{user.name}</div>
                    <div className="text-xs text-muted">{user.email}</div>
                  </div>
                  <TierBadge tier={tierId} className="ml-auto" />
                </div>
              </Card>

              <Card className="p-6 mb-5">
                <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-4">Payment</div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-display font-bold text-muted uppercase tracking-wider mb-2">Card Number</label>
                    <div className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-muted text-sm flex justify-between">
                      <span>•••• •••• •••• 4242</span><span>💳</span>
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
                <div className="mt-4 p-3 rounded-lg bg-blue/8 border border-blue/20 text-xs text-blue-bright">
                  🔒 In production this is replaced with Stripe Elements. Card data never touches your server.
                </div>
              </Card>

              <button onClick={pay} disabled={loading}
                className="w-full py-4 bg-blue hover:bg-blue-bright text-white font-display font-bold text-base rounded-xl transition-all shadow-[0_0_30px_rgba(26,110,255,0.4)] disabled:opacity-50 flex items-center justify-center gap-3">
                {loading ? <><Spinner size="md"/> Processing...</> : `🔒 Pay ${tier.priceDisplay} · Enrol Now`}
              </button>
              <p className="text-center text-xs text-muted mt-3">14-day money-back guarantee · Instant access after payment</p>
            </div>

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
                  {tier.features.slice(0,5).map(f => (
                    <div key={f} className="flex gap-2 text-xs text-muted"><span className="text-success flex-shrink-0">✓</span>{f}</div>
                  ))}
                </div>
                <div className="space-y-2 pt-4 border-t border-white/5 mb-4">
                  <div className="flex justify-between text-sm"><span className="text-muted">Subtotal</span><span>{tier.priceDisplay}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted">GST</span><span className="text-muted">Calculated at payment</span></div>
                </div>
                <div className="flex justify-between items-baseline pt-4 border-t border-white/5 mb-6">
                  <span className="font-display font-bold">Total</span>
                  <span className="font-display font-black text-3xl">{tier.priceDisplay}</span>
                </div>
                <div className="space-y-1.5 text-xs text-muted">
                  <div>🔒 256-bit SSL</div>
                  <div>💳 Powered by Stripe</div>
                  <div>📧 Receipt to your email</div>
                  <div>♾️ Instant lifetime access</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
