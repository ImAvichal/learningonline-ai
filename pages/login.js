// pages/login.js
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/auth'
import { Input, Spinner } from '../components/ui'

export default function Login() {
  const { login } = useAuth()
  const router    = useRouter()
  const { redirect = '/dashboard' } = router.query

  const [form,    setForm]    = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    setLoading(true); setError('')
    const res = await login(form.email, form.password)
    if (res.success) router.push(redirect)
    else { setError('Invalid credentials. Try again.'); setLoading(false) }
  }

  return (
    <>
      <Head><title>Sign In — Le On AI</title></Head>
      <div className="min-h-screen flex">
        {/* Left panel */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 bg-navy-mid border-r border-white/5 p-12">
          <Link href="/" className="font-display font-black text-xl">
            Le On <span className="text-blue">AI</span>
          </Link>
          <div>
            <div className="text-6xl mb-8">🎯</div>
            <h2 className="font-display font-bold text-3xl mb-4 leading-tight">
              Welcome back.<br/>Your AI journey<br/>is waiting.
            </h2>
            <p className="text-muted leading-relaxed max-w-sm">
              Pick up exactly where you left off. All your lessons, templates, and deliverables are saved.
            </p>
          </div>
          <p className="text-xs text-muted">learningonline.ai · Le On AI</p>
        </div>

        {/* Right — form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            <div className="lg:hidden mb-8">
              <Link href="/" className="font-display font-black text-xl">
                Le On <span className="text-blue">AI</span>
              </Link>
            </div>

            <h1 className="font-display font-bold text-2xl mb-2">Sign in</h1>
            <p className="text-muted text-sm mb-8">
              No account?{' '}
              <Link href="/signup" className="text-blue-bright hover:underline">Create one free</Link>
            </p>

            {error && (
              <div className="mb-5 p-4 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm">{error}</div>
            )}

            <form onSubmit={submit} className="space-y-4">
              <Input label="Email"    type="email"    placeholder="you@company.com" value={form.email}    onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              <Input label="Password" type="password" placeholder="••••••••"       value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
              <div className="text-right">
                <Link href="/forgot-password" className="text-xs text-muted hover:text-blue-bright transition-colors">
                  Forgot your password?
                </Link>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3.5 bg-blue hover:bg-blue-bright text-white font-display font-bold rounded-lg transition-all shadow-[0_0_24px_rgba(26,110,255,0.4)] disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <><Spinner /> Signing in...</> : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
