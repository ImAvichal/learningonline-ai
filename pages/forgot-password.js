// pages/forgot-password.js
// Sends a Supabase password reset email to the user.

import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '../lib/auth'
import { Input, Spinner, Logo } from '../components/ui'

export default function ForgotPassword() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) { setError('Please enter your email address.'); return }
    setLoading(true)
    setError('')

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://learningonline.ai/reset-password',
    })

    if (resetError) {
      setError(resetError.message || 'Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <>
      <Head><title>Forgot Password — LeO AI</title></Head>
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Logo />
          </div>

          {sent ? (
            <div className="text-center">
              <div className="text-5xl mb-4">📧</div>
              <h1 className="font-display font-bold text-2xl mb-2">Check your email</h1>
              <p className="text-muted text-sm mb-2">
                We've sent a password reset link to <strong className="text-white">{email}</strong>
              </p>
              <p className="text-muted text-sm mb-6">
                Click the link in the email to set a new password. The link expires in 1 hour.
              </p>
              <p className="text-xs text-muted">
                Didn't receive it?{' '}
                <button onClick={() => setSent(false)} className="text-blue-bright hover:underline">
                  Try again
                </button>
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-display font-bold text-2xl mb-2">Reset your password</h1>
              <p className="text-muted text-sm mb-8">
                Enter your email and we'll send you a reset link.
              </p>

              {error && (
                <div className="mb-5 p-4 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email address"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                />
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-blue hover:bg-blue-bright text-white font-display font-bold rounded-lg transition-all shadow-[0_0_24px_rgba(26,110,255,0.4)] disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <><Spinner /> Sending...</> : 'Send Reset Link →'}
                </button>
              </form>

              <p className="text-center text-sm text-muted mt-6">
                Remembered it?{' '}
                <Link href="/login" className="text-blue-bright hover:underline">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
