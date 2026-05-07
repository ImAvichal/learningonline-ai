// pages/success.js — Post-payment success page
// CRITICAL: This is where Stripe redirects users after successful payment.
// It does THREE things:
//   1. Verifies the Stripe session was actually paid (server-side)
//   2. Acts as a FALLBACK to create entitlement if webhook hasn't fired yet
//   3. Shows confirmation UI so user knows their payment succeeded
//
// Webhook is the primary mechanism for entitlement creation. This page is
// a defensive backup for cases where webhook delivery is delayed or fails.

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { useAuth, supabase } from '../lib/auth'
import { Spinner, Logo } from '../components/ui'
import { TIERS } from '../data/tiers'

export default function Success() {
  const router = useRouter()
  const { user, refreshUser, loading: authLoading } = useAuth()
  const { session_id } = router.query

  const [state, setState] = useState('verifying') // verifying | confirmed | error
  const [tierName, setTierName] = useState(null)
  const [interval, setInterval] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!router.isReady) return
    if (authLoading) return
    if (!session_id) {
      setState('error')
      setErrorMsg('No payment session found. If you just paid, please contact support.')
      return
    }
    verifyPayment()
  }, [router.isReady, authLoading, session_id])

  const verifyPayment = async () => {
    try {
      // Call backend to verify the Stripe session was paid AND grant entitlement
      // (acts as backup if webhook hasn't fired yet)
      const res = await fetch('/api/verify-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id }),
      })

      const data = await res.json()

      if (!res.ok) {
        setState('error')
        setErrorMsg(data.error || 'Could not verify payment')
        return
      }

      // Payment verified
      setTierName(data.tierId)
      setInterval(data.interval || 'monthly')

      // Refresh auth state so user.tier reflects the new entitlement
      if (refreshUser) await refreshUser()

      setState('confirmed')
    } catch (err) {
      console.error('Verification error:', err)
      setState('error')
      setErrorMsg('Network error during verification. Please refresh.')
    }
  }

  const tierObj = tierName ? (TIERS[tierName] || TIERS.journey) : null

  return (
    <>
      <Head><title>Welcome aboard — LeO AI</title></Head>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <Logo size="lg" />
          </div>

          {state === 'verifying' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center shadow-sm">
              <Spinner />
              <h1 className="font-display font-bold text-2xl mt-6 mb-2">Confirming your enrolment…</h1>
              <p className="text-gray-600 text-sm">
                Just a moment while we verify your payment and unlock your access.
              </p>
            </div>
          )}

          {state === 'confirmed' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
                <span className="text-success text-3xl">✓</span>
              </div>
              <h1 className="font-display font-bold text-3xl mb-3">You're in.</h1>
              <p className="text-gray-700 mb-6">
                Welcome to <span className="font-bold">{tierObj?.name || 'LeO AI'}</span>
                {interval && <> · <span className="capitalize">{interval}</span></>}
              </p>

              <div className="bg-gray-50 rounded-lg p-5 mb-6 text-left">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-gray-500 mb-3">
                  What happens next
                </h3>
                <ul className="space-y-2.5 text-sm text-gray-700">
                  <li className="flex gap-2.5">
                    <span className="text-success font-bold flex-shrink-0">1.</span>
                    <span>Your access is active immediately — no waiting.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-success font-bold flex-shrink-0">2.</span>
                    <span>A confirmation receipt has been sent to your email by Stripe.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-success font-bold flex-shrink-0">3.</span>
                    <span>Start with Module 1 and progress at your own pace.</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="block w-full bg-blue text-white font-display font-bold text-center py-4 rounded-xl hover:bg-blue-bright transition-colors"
              >
                Start Learning →
              </Link>

              <p className="text-xs text-gray-500 mt-5">
                Need help? <a href="mailto:hello@learningonline.ai" className="text-blue hover:underline">hello@learningonline.ai</a>
              </p>
            </div>
          )}

          {state === 'error' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-amber-600 text-3xl">!</span>
              </div>
              <h1 className="font-display font-bold text-2xl mb-3">Hmm, we hit a snag</h1>
              <p className="text-gray-700 mb-6">{errorMsg}</p>
              <p className="text-sm text-gray-600 mb-6">
                If your payment went through, your access will activate shortly. You can also
                contact us — we'll sort it out fast.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/dashboard"
                  className="flex-1 bg-gray-100 text-gray-900 font-display font-bold text-center py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Try Dashboard
                </Link>
                <a
                  href="mailto:hello@learningonline.ai"
                  className="flex-1 bg-blue text-white font-display font-bold text-center py-3 rounded-lg hover:bg-blue-bright transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
