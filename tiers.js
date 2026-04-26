// components/ui.js — all shared UI primitives
// LearningOnline.AI — standalone brand, no parent brand references

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../lib/auth'

// ── Brand ─────────────────────────────────────────────────────────────────────
export const BRAND = {
  name:      'LearningOnline.AI',
  shortName: 'LO.AI',
  tagline:   'AI That Actually Works',
  domain:    'learningonline.ai',
  email:     'hello@learningonline.ai',
  course:    'Flowcore AI Academy',
}

// ── Logo ──────────────────────────────────────────────────────────────────────
export function Logo({ size = 'md', linked = true }) {
  const sizes = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl' }
  const el = (
    <span className={`font-display font-black tracking-tight ${sizes[size]}`}>
      LearningOnline<span className="text-blue">.AI</span>
    </span>
  )
  return linked ? <Link href="/">{el}</Link> : el
}

// ── Nav ───────────────────────────────────────────────────────────────────────
export function Nav({ transparent = false }) {
  const { user, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 h-16 transition-all duration-300 ${
      scrolled || !transparent
        ? 'bg-navy/90 backdrop-blur-xl border-b border-white/5'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between gap-8">
        <Logo />

        <div className="hidden md:flex items-center gap-7">
          <NavLink href="/#curriculum">Curriculum</NavLink>
          <NavLink href="/#industries">Industries</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user?.tier ? (
            <>
              <NavLink href="/dashboard">Dashboard</NavLink>
              <button onClick={logout} className="text-sm text-muted hover:text-white transition-colors">Sign Out</button>
            </>
          ) : (
            <>
              <NavLink href="/login">Sign In</NavLink>
              <Link href="/pricing"
                className="px-5 py-2.5 bg-blue hover:bg-blue-bright text-white text-sm font-display font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(26,110,255,0.35)] hover:-translate-y-px">
                Enrol
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-muted p-1" onClick={() => setOpen(v => !v)}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? <path d="M6 18L18 6M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-navy-mid border-t border-white/5 px-6 py-4 space-y-3">
          <MobileLink href="/#curriculum"  onClick={() => setOpen(false)}>Curriculum</MobileLink>
          <MobileLink href="/#industries"  onClick={() => setOpen(false)}>Industries</MobileLink>
          <MobileLink href="/pricing"      onClick={() => setOpen(false)}>Pricing</MobileLink>
          {user?.tier
            ? <MobileLink href="/dashboard" onClick={() => setOpen(false)}>Dashboard</MobileLink>
            : <MobileLink href="/pricing"   onClick={() => setOpen(false)} bold>Enrol →</MobileLink>
          }
        </div>
      )}
    </nav>
  )
}

const NavLink    = ({ href, children }) => <Link href={href} className="text-sm text-muted hover:text-white transition-colors">{children}</Link>
const MobileLink = ({ href, children, onClick, bold }) => (
  <Link href={href} onClick={onClick} className={`block text-sm ${bold ? 'font-display font-bold text-blue' : 'text-muted'}`}>{children}</Link>
)

// ── Dashboard Sidebar ─────────────────────────────────────────────────────────
export function Sidebar({ activeTab, onTab, user }) {
  const { logout } = useAuth()
  const initial = user?.name?.[0]?.toUpperCase() || 'S'
  const tabs = [
    { id: 'home',      icon: '⬛', label: 'Dashboard' },
    { id: 'course',    icon: '📚', label: 'My Course' },
    { id: 'templates', icon: '📁', label: 'Templates' },
    { id: 'account',   icon: '👤', label: 'Account' },
  ]
  return (
    <aside className="hidden lg:flex flex-col w-56 bg-navy-mid border-r border-white/5 fixed inset-y-0 left-0 z-30">
      <div className="px-5 pt-6 pb-4 border-b border-white/5">
        <Logo size="sm" />
        <div className="text-[9px] text-muted tracking-[2px] uppercase mt-1">learningonline.ai</div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => onTab(t.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
              activeTab === t.id
                ? 'bg-blue/10 text-white font-display font-bold border border-blue/20'
                : 'text-muted hover:text-white hover:bg-white/[0.03]'
            }`}>
            <span className="text-base w-5 text-center">{t.icon}</span>{t.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5">
        {user?.tier && <TierBadge tier={user.tier} className="mb-3 w-full justify-center text-center" />}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full bg-blue/20 border border-blue/30 flex items-center justify-center text-xs font-display font-bold text-blue-bright flex-shrink-0">
            {initial}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-display font-bold text-white truncate">{user?.name}</div>
            <div className="text-[10px] text-muted truncate">{user?.email}</div>
          </div>
        </div>
        <button onClick={logout} className="text-xs text-muted hover:text-white w-full text-left">Sign Out →</button>
      </div>
    </aside>
  )
}

// ── Primitives ────────────────────────────────────────────────────────────────
export function Button({ children, variant = 'primary', href, onClick, type = 'button', disabled = false, className = '' }) {
  const base = 'inline-flex items-center justify-center gap-2 font-display font-bold text-sm rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  const v = {
    primary: 'px-6 py-3 bg-blue hover:bg-blue-bright text-white shadow-[0_0_24px_rgba(26,110,255,0.35)] hover:-translate-y-px',
    ghost:   'px-6 py-3 border border-white/10 text-muted hover:text-white hover:border-blue hover:bg-blue/10',
    success: 'px-5 py-2.5 bg-success/10 border border-success/30 text-success hover:bg-success/20',
    large:   'px-8 py-4 text-base bg-blue hover:bg-blue-bright text-white shadow-[0_0_30px_rgba(26,110,255,0.4)] hover:-translate-y-0.5',
  }
  const cls = `${base} ${v[variant]} ${className}`
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button type={type} className={cls} onClick={onClick} disabled={disabled}>{children}</button>
}

export function Card({ children, className = '', glow = false, hover = false }) {
  return (
    <div className={`bg-white/[0.03] border border-white/[0.07] rounded-xl
      ${glow  ? 'shadow-[0_0_40px_rgba(26,110,255,0.08)] border-blue/20' : ''}
      ${hover ? 'hover:border-blue/40 hover:-translate-y-1 transition-all duration-300' : ''}
      ${className}`}>
      {children}
    </div>
  )
}

export function ProgressBar({ value, className = '', color = 'blue' }) {
  const c = { blue: 'bg-blue', success: 'bg-success', amber: 'bg-amber-400', purple: 'bg-purple-400' }
  return (
    <div className={`h-1.5 bg-white/5 rounded-full overflow-hidden ${className}`}>
      <div className={`h-full ${c[color]} rounded-full transition-all duration-700`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  )
}

export function Input({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="block text-xs font-display font-bold text-muted uppercase tracking-wider mb-2">{label}</label>}
      <input className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm placeholder-muted/50 outline-none focus:border-blue focus:bg-blue/[0.03] transition-colors" {...props} />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  )
}

export function SectionLabel({ children, className = '' }) {
  return (
    <span className={`block font-display text-xs font-bold tracking-[3px] uppercase text-blue mb-4 ${className}`}>
      {children}
    </span>
  )
}

export function TierBadge({ tier, label, className = '' }) {
  const cfg = {
    individual: { cls: 'tier-individual', text: label || 'Individual' },
    smb:        { cls: 'tier-smb',        text: label || 'Small & Medium Business' },
    enterprise: { cls: 'tier-enterprise', text: label || 'Enterprise' },
  }
  const c = cfg[tier] || cfg.individual
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-display font-bold ${c.cls} ${className}`}>
      {c.text}
    </span>
  )
}

export function Spinner({ size = 'sm' }) {
  const s = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' }
  return (
    <svg className={`animate-spin ${s[size]}`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'} ${className}`}>
      {children}
    </div>
  )
}
