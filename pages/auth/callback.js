// pages/auth/callback.js
// Handles Supabase OAuth redirect (Google etc.)
// Supabase redirects here after Google consent with ?code=...
// We exchange the code for a session, upsert the profile,
// check entitlement, then redirect appropriately.

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/auth'
import { Spinner, Logo } from '../../components/ui'

export default function AuthCallback() {
  const router = useRouter()
  const [status, setStatus] = useState('Completing sign-in...')

  useEffect(() => {
    handleCallback()
  }, [])

  const handleCallback = async () => {
    try {
      // Exchange the code in the URL for a session
      // Supabase JS v2 does this automatically via detectSessionInUrl
      // But we explicitly call getSession to ensure it's complete
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (sessionError || !session) {
        // Try exchanging code manually (PKCE flow)
        const code = new URLSearchParams(window.location.search).get('code')
        if (code) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)
          if (error || !data.session) {
            setStatus('Sign-in failed. Redirecting...')
            setTimeout(() => router.push('/login?error=oauth_failed'), 1500)
            return
          }
        } else {
          setStatus('No session found. Redirecting...')
          setTimeout(() => router.push('/login'), 1500)
          return
        }
      }

      // Re-fetch session after potential code exchange
      const { data: { session: activeSession } } = await supabase.auth.getSession()
      if (!activeSession) {
        router.push('/login')
        return
      }

      const authUser = activeSession.user
      setStatus('Setting up your account...')

      // ── Upsert users_profile ─────────────────────────────────────────────
      const fullName = authUser.user_metadata?.full_name
        || authUser.user_metadata?.name
        || authUser.email?.split('@')[0]
        || 'User'

      // Check if profile exists
      const { data: existing } = await supabase
        .from('users_profile')
        .select('id, selected_tier, user_type')
        .eq('id', authUser.id)
        .single()

      if (!existing) {
        // Create new profile — no tier granted
        await supabase.from('users_profile').insert({
          id:            authUser.id,
          email:         authUser.email,
          full_name:     fullName,
          user_type:     'prospect',
          selected_tier: null,
        })
      }

      // ── Entitlement check ────────────────────────────────────────────────
      setStatus('Checking your access...')

      const profile = existing || { selected_tier: null }

      // Check for valid purchase
      const { data: purchase } = await supabase
        .from('purchases')
        .select('tier, payment_status')
        .eq('user_id', authUser.id)
        .in('payment_status', ['paid', 'complete', 'completed'])
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      const activeTier = purchase?.tier || profile?.selected_tier || null

      // ── Redirect based on entitlement and intended destination ──────────
      // PRIMARY: Read 'next' from URL (passed through OAuth flow, survives browser security wipes)
      // FALLBACK: localStorage (set as secondary backup before OAuth)
      let intendedRedirect = null
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search)
        intendedRedirect = urlParams.get('next')
        if (!intendedRedirect) {
          intendedRedirect = localStorage.getItem('postAuthRedirect')
        }
        try { localStorage.removeItem('postAuthRedirect') } catch {}
      }

      if (activeTier) {
        // User is already paid — go to dashboard (skip checkout even if intended)
        if (!existing?.selected_tier) {
          await supabase
            .from('users_profile')
            .update({ selected_tier: activeTier, user_type: activeTier })
            .eq('id', authUser.id)
        }
        setStatus('Access confirmed. Loading dashboard...')
        // If intendedRedirect was a checkout URL, skip it (they're already paid).
        // If it was /parents or /dashboard, honour it.
        const isCheckoutUrl = intendedRedirect && intendedRedirect.startsWith('/checkout')
        router.push(isCheckoutUrl ? '/dashboard' : (intendedRedirect || '/dashboard'))
      } else {
        // User is not paid — honour intended destination (checkout or parents)
        if (intendedRedirect) {
          setStatus('Loading your selected plan...')
          router.push(intendedRedirect)
        } else {
          setStatus('Signed in. Redirecting...')
          router.push('/preview')
        }
      }
    } catch (err) {
      console.error('Auth callback error:', err)
      setStatus('Something went wrong. Redirecting...')
      setTimeout(() => router.push('/login'), 1500)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-sm mx-auto px-6">
        <div className="mb-8"><Logo /></div>
        <div className="flex justify-center mb-5"><Spinner size="lg" /></div>
        <p className="text-muted text-sm">{status}</p>
      </div>
    </div>
  )
}
