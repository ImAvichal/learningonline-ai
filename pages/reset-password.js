// pages/reset-password.js
// Handles the #access_token fragment Supabase sends in password reset emails.
// Supabase appends: /#access_token=...&type=recovery
// This page picks that up, lets the user set a new password.

import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/auth'
import { Input, Spinner, Logo } from '../components/ui'

export default function ResetPassword() {
  const router = useRouter()
  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [success,   setSuccess]   = useState(false)
  const [ready,     setReady]     = useState(false)
  const [tokenError, setTokenError] = useState(false)

  useEffect(() => {
    // Supabase puts the token in the URL hash: #access_token=...&type=recovery
    // The supabase client picks this up automatically via onAuthStateChange
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          // Session is now set — user can update password
          setReady(true)
        }
      }
    )

    // Also check if there's already a session (user arrived via email link)
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) setReady(true)
      else {
        // Give it 2 seconds for the hash to be processed
        setTimeout(async () => {
          const { data: { session: s2 } } = await supabase.auth.getSession()
          if (s2) setReady(true)
          else setTokenError(true)
        }, 2000)
      }
    }
    checkSession()

    return () => subscription.unsubscribe()
  }, [])

  const handleReset = async (e) => {
    e.preventDefault()
    if (!password) { setError('Please enter a new password.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirm) { setError("Passwords don't match."); return }

    setLoading(true)
    setError('')

    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError(updateError.message || 'Failed to update password. Please request a new reset link.')
      setLoading(false)
      return
    }

    // Sign out first, then show success — no auto-redirect (causes stuck spinner)
    try { await supabase.auth.signOut() } catch(e) {}
    setSuccess(true)
    setLoading(false)
  }

  return (
    <>
      <Head><title>Reset Password — Le On AI</title></Head>
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Logo />
          </div>

          {success ? (
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h1 className="font-display font-bold text-2xl mb-2">Password updated</h1>
              <p className="text-muted text-sm mb-6">Your password has been changed successfully. Click below to sign in.</p>
              <Link href="/login"
                className="block w-full py-3.5 bg-blue hover:bg-blue-bright text-white font-display font-bold text-sm rounded-lg transition-all text-center">
                Sign In Now →
              </Link>
            </div>
          ) : tokenError ? (
            <div className="text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h1 className="font-display font-bold text-2xl mb-2">Link expired</h1>
              <p className="text-muted text-sm mb-6">
                This password reset link has expired or already been used.
                Please request a new one.
              </p>
              <Link href="/forgot-password"
                className="px-6 py-3 bg-blue hover:bg-blue-bright text-white font-display font-bold text-sm rounded-lg transition-all inline-block">
                Request new link →
              </Link>
            </div>
          ) : !ready ? (
            <div className="text-center">
              <div className="flex justify-center mb-4"><Spinner size="lg" /></div>
              <p className="text-muted text-sm">Verifying your reset link...</p>
            </div>
          ) : (
            <>
              <h1 className="font-display font-bold text-2xl mb-2">Set new password</h1>
              <p className="text-muted text-sm mb-8">Choose a strong password for your account.</p>

              {error && (
                <div className="mb-5 p-4 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm">{error}</div>
              )}

              <form onSubmit={handleReset} className="space-y-4">
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Repeat new password"
                  value={confirm}
                  onChange={e => { setConfirm(e.target.value); setError('') }}
                />
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-blue hover:bg-blue-bright text-white font-display font-bold rounded-lg transition-all shadow-[0_0_24px_rgba(26,110,255,0.4)] disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <><Spinner /> Updating...</> : 'Update Password →'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
