// pages/signup.js
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/auth'
import { Input, Spinner, TierBadge } from '../components/ui'
import { TIERS } from '../data/tiers'

export default function Signup() {
  const { signup, loginWithGoogle, loginWithLinkedIn } = useAuth()
  const router     = useRouter()
  const { tier: tierId = 'smb' } = router.query
  const tier = TIERS[tierId] || TIERS.smb

  const [form,    setForm]    = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
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
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    const res = await signup(form.email, form.password, form.name)
    if (res.success) router.push(`/checkout?tier=${tierId}`)
    else { setErrors({ server: 'Something went wrong. Please try again.' }); setLoading(false) }
  }

  const set = (f) => (e) => { setForm(p => ({ ...p, [f]: e.target.value })); setErrors(p => ({ ...p, [f]: '' })) }

  return (
    <>
      <Head><title>Create Account — Le On AI</title></Head>
      <div className="min-h-screen flex">
        {/* Left */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 bg-navy-mid border-r border-white/5 p-12">
          <Link href="/" className="font-display font-black text-xl">
            Le On <span className="text-blue">AI</span>
          </Link>
          <div>
            <div className="text-xs font-display font-bold text-gray-400 dark:text-white/40 uppercase tracking-wider mb-3">You're enrolling in</div>
            <h2 className="font-display font-bold text-2xl mb-1">{tier.name}</h2>
            <div className="font-display font-bold text-3xl text-blue-bright mb-1">{tier.priceDisplay}</div>
            <div className="text-xs text-gray-400 dark:text-white/40 mb-8">{tier.billing}</div>
            <div className="space-y-2.5">
              {tier.features.slice(0, 5).map(f => (
                <div key={f} className="flex gap-2.5 items-start text-xs">
                  <span className="text-success mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-gray-600 dark:text-white/60 leading-relaxed">{f}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
              <div className="border-l-2 border-success/30 pl-3">
                <div className="text-[11px] font-display font-bold text-gray-700 dark:text-white/50">AI for Parents</div>
                <div className="text-[10px] text-gray-400 dark:text-white/25">Free pathway — always available</div>
              </div>
              <div className="border-l-2 border-blue/30 pl-3">
                <div className="text-[11px] font-display font-bold text-gray-700 dark:text-white/50">AI Awareness · $49</div>
              </div>
              <div className="border-l-2 border-amber-400/30 pl-3">
                <div className="text-[11px] font-display font-bold text-gray-700 dark:text-white/50">AI Implementation · $99</div>
              </div>
              <div className="border-l-2 border-purple-400/30 pl-3">
                <div className="text-[11px] font-display font-bold text-gray-700 dark:text-white/50">AI Transformation · $149</div>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted">learningonline.ai · Le On AI</p>
        </div>

        {/* Right */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            <div className="lg:hidden mb-8">
              <Link href="/" className="font-display font-black text-xl">
                Le On <span className="text-blue">AI</span>
              </Link>
            </div>

            <h1 className="font-display font-bold text-2xl mb-2">Create your account</h1>
            <p className="text-muted text-sm mb-8">
              Already have one?{' '}
              <Link href="/login" className="text-blue-bright hover:underline">Sign in</Link>
            </p>

            {errors.server && (
              <div className="mb-5 p-4 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm">{errors.server}</div>
            )}

            {/* Google sign-in */}
            <button type="button" onClick={loginWithGoogle}
              className="w-full flex items-center justify-center gap-3 py-3 border border-white/15 rounded-lg hover:border-white/30 hover:bg-white/[0.04] transition-all text-sm font-display font-bold text-white mb-5">
              <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 6.294C4.672 4.169 6.656 3.58 9 3.58z"/></svg>
              Continue with Google
            </button>

            {/* LinkedIn sign-in */}
            <button type="button" onClick={loginWithLinkedIn}
              className="w-full flex items-center justify-center gap-3 py-3 border border-white/15 rounded-lg hover:border-white/30 hover:bg-white/[0.04] transition-all text-sm font-display font-bold text-white mb-5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Continue with LinkedIn
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-muted">or sign up with email</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <form onSubmit={submit} className="space-y-4">
              <Input label="Full Name"        type="text"     placeholder="Your name"        value={form.name}     onChange={set('name')}     error={errors.name} />
              <Input label="Work Email"       type="email"    placeholder="you@company.com"  value={form.email}    onChange={set('email')}    error={errors.email} />
              <Input label="Password"         type="password" placeholder="Min 8 characters" value={form.password} onChange={set('password')} error={errors.password} />
              <Input label="Confirm Password" type="password" placeholder="••••••••"         value={form.confirm}  onChange={set('confirm')}  error={errors.confirm} />

              <p className="text-xs text-muted">
                By signing up you agree to our{' '}
                <a href="#" className="text-blue-bright hover:underline">Terms</a> and{' '}
                <a href="#" className="text-blue-bright hover:underline">Privacy Policy</a>.
              </p>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 bg-blue hover:bg-blue-bright text-white font-display font-bold rounded-lg transition-all shadow-[0_0_24px_rgba(26,110,255,0.4)] disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <><Spinner /> Creating account...</> : 'Create Account & Continue →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
