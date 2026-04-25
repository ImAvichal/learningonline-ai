// pages/signup.js
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/auth'
import { Logo, Input, Spinner, TierBadge } from '../components/ui'
import { TIERS } from '../data/tiers'

export default function Signup() {
  const { signup } = useAuth()
  const router = useRouter()
  const { tier: tierId = 'smb' } = router.query
  const tier = TIERS[tierId] || TIERS.smb

  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name    = 'Name is required'
    if (!form.email)        e.email   = 'Email is required'
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
    else { setErrors({ server:'Something went wrong.' }); setLoading(false) }
  }

  const set = (f) => (e) => { setForm(p=>({...p,[f]:e.target.value})); setErrors(p=>({...p,[f]:''})) }

  return (
    <>
      <Head><title>Create Account — Flowcore AI Academy</title></Head>
      <div className="min-h-screen flex">
        <div className="hidden lg:flex flex-col justify-between w-1/2 bg-navy-mid border-r border-white/5 p-12">
          <Logo />
          <div>
            <TierBadge tier={tierId} className="mb-6" />
            <div className="font-display font-black text-5xl mb-1">{tier.priceDisplay}</div>
            <div className="text-sm text-muted mb-8">{tier.billing}</div>
            <div className="space-y-3">
              {tier.features.slice(0,5).map(f => (
                <div key={f} className="flex gap-3 items-center text-sm">
                  <div className="w-5 h-5 rounded-full bg-success/20 border border-success/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-success text-xs">✓</span>
                  </div>
                  <span className="text-white/80">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted">learningonline.ai · Your data is encrypted.</p>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            <div className="lg:hidden mb-8"><Logo /></div>
            <h1 className="font-display font-bold text-2xl mb-2">Create your account</h1>
            <p className="text-muted text-sm mb-8">Already have one? <Link href="/login" className="text-blue-bright hover:underline">Sign in</Link></p>

            {errors.server && <div className="mb-5 p-4 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm">{errors.server}</div>}

            <form onSubmit={submit} className="space-y-4">
              <Input label="Full Name"        type="text"     placeholder="Your name"       value={form.name}     onChange={set('name')}     error={errors.name} />
              <Input label="Work Email"       type="email"    placeholder="you@company.com" value={form.email}    onChange={set('email')}    error={errors.email} />
              <Input label="Password"         type="password" placeholder="Min 8 characters" value={form.password} onChange={set('password')} error={errors.password} />
              <Input label="Confirm Password" type="password" placeholder="••••••••"         value={form.confirm}  onChange={set('confirm')}  error={errors.confirm} />
              <p className="text-xs text-muted">By signing up you agree to our <a href="#" className="text-blue-bright hover:underline">Terms</a> and <a href="#" className="text-blue-bright hover:underline">Privacy Policy</a>.</p>
              <button type="submit" disabled={loading}
                className="w-full py-3.5 bg-blue hover:bg-blue-bright text-white font-display font-bold rounded-lg transition-all shadow-[0_0_24px_rgba(26,110,255,0.4)] disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <><Spinner/> Creating account...</> : 'Create Account & Continue →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
