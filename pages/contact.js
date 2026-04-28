// pages/contact.js
import Head from 'next/head'
import { useState } from 'react'
import { Nav, Card, SectionLabel, Input, Spinner } from '../components/ui'

const QUERY_TYPES = ['General', 'Individual Upskill', 'SMB Owner', 'Enterprise Leader', 'Bespoke Support']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', query_type: '', message: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const set = (f) => (e) => { setForm(p => ({ ...p, [f]: e.target.value })); setErrors(p => ({ ...p, [f]: '' })) }

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name       = 'Name is required'
    if (!form.email)          e.email      = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.query_type)     e.query_type = 'Please select a query type'
    if (!form.message.trim()) e.message    = 'Message is required'
    return e
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setServerError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Server error')
      setSubmitted(true)
    } catch (err) {
      setServerError('Something went wrong. Please email us directly at hello@learningonline.ai')
    }
    setLoading(false)
  }

  return (
    <>
      <Head><title>Contact Us — Le On AI</title></Head>
      <Nav />
      <div className="pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>Contact</SectionLabel>
            <h1 className="font-display font-black text-5xl tracking-tight mb-4">Get in touch</h1>
            <p className="text-muted text-xl max-w-lg mx-auto">
              Questions about the program, bespoke enterprise support, or anything else — we'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-10">
            {/* Form */}
            <div>
              {submitted ? (
                <Card className="p-12 text-center">
                  <div className="text-5xl mb-5">✅</div>
                  <h2 className="font-display font-bold text-2xl mb-3">Message received</h2>
                  <p className="text-muted leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out. We'll get back to you at <strong className="text-white">{form.email}</strong> within 1 business day.
                  </p>
                </Card>
              ) : (
                <Card className="p-8">
                  {serverError && (
                    <div className="mb-5 p-4 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm">{serverError}</div>
                  )}
                  <form onSubmit={submit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Input label="Full Name"  type="text"  placeholder="Your name"        value={form.name}    onChange={set('name')}    error={errors.name} />
                      <Input label="Work Email" type="email" placeholder="you@company.com"  value={form.email}   onChange={set('email')}   error={errors.email} />
                    </div>
                    <Input label="Company (optional)" type="text" placeholder="Your organisation" value={form.company} onChange={set('company')} />

                    <div>
                      <label className="block text-xs font-display font-bold text-muted uppercase tracking-wider mb-2">Query Type</label>
                      <select value={form.query_type} onChange={set('query_type')}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-blue transition-colors">
                        <option value="" disabled>Select a query type</option>
                        {QUERY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.query_type && <p className="mt-1.5 text-xs text-red-400">{errors.query_type}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-display font-bold text-muted uppercase tracking-wider mb-2">Message</label>
                      <textarea value={form.message} onChange={set('message')} rows={5} placeholder="Tell us what you're looking for..."
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder-muted/50 outline-none focus:border-blue transition-colors resize-none" />
                      {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                    </div>

                    <button type="submit" disabled={loading}
                      className="w-full py-4 bg-blue hover:bg-blue-bright text-white font-display font-bold rounded-xl transition-all shadow-[0_0_24px_rgba(26,110,255,0.4)] disabled:opacity-50 flex items-center justify-center gap-2">
                      {loading ? <><Spinner /> Sending...</> : 'Send Message →'}
                    </button>
                  </form>
                </Card>
              )}
            </div>

            {/* Info sidebar */}
            <div className="space-y-5">
              <Card className="p-6">
                <h3 className="font-display font-bold text-base mb-4">How we can help</h3>
                <div className="space-y-4">
                  {[
                    { icon: '🎓', title: 'Individual Upskill', desc: 'Questions about the $99 individual program and what\'s included.' },
                    { icon: '🏢', title: 'SMB Owner', desc: 'Implementing AI in your business — use the $299 SMB tier or speak to us first.' },
                    { icon: '🏛️', title: 'Enterprise Leader', desc: 'Large-scale AI transformation, operating model, governance frameworks.' },
                    { icon: '🤝', title: 'Bespoke Support', desc: 'Custom engagements beyond the platform — advisory, implementation, or tailored programs.' },
                  ].map(item => (
                    <div key={item.title} className="flex gap-3">
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <div className="font-display font-bold text-sm text-white mb-0.5">{item.title}</div>
                        <div className="text-xs text-muted leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-display font-bold text-base mb-3">Direct contact</h3>
                <a href="mailto:hello@learningonline.ai"
                  className="flex items-center gap-3 text-sm text-blue-bright hover:underline">
                  <span>✉️</span> hello@learningonline.ai
                </a>
                <p className="text-xs text-muted mt-3 leading-relaxed">
                  We respond to all enquiries within 1 business day.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-display font-bold text-base mb-3">Already enrolled?</h3>
                <p className="text-sm text-muted mb-3">Sign in to access your dashboard, continue your modules, and download templates.</p>
                <a href="/dashboard" className="text-sm font-display font-bold text-blue-bright hover:underline">
                  Go to Dashboard →
                </a>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted">
          <span className="font-display font-black text-white">Le On <span className="text-blue">AI</span></span>
          <p>© 2025 Le On AI · learningonline.ai</p>
        </div>
      </footer>
    </>
  )
}
