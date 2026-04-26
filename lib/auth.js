// lib/auth.js
// Auth context. Demo mode uses localStorage.
// Production: replace login/signup/logout with Supabase auth calls.
//
// DEV BYPASS: append ?dev_key=loa_dev_avi_2025 to any URL
// → instant enterprise access, no signup, no payment.
// Change DEV_KEY below and in .env.local before going live.

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const AuthContext = createContext(null)

const DEV_KEY = 'loa_dev_avi_2025'

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // ── Dev bypass ──────────────────────────────────────────────────────
    const params = new URLSearchParams(window.location.search)
    if (params.get('dev_key') === DEV_KEY) {
      const devUser = {
        id: 'dev-avi', name: 'Avi (Dev)',
        email: 'avi@praiseconsulting.com.au',
        tier: 'enterprise', user_type: 'enterprise',
        isDevUser: true,
        enrolledAt: new Date().toISOString(),
        progress: {},
      }
      localStorage.setItem('loa_user', JSON.stringify(devUser))
      setUser(devUser)
      setLoading(false)
      const url = new URL(window.location.href)
      url.searchParams.delete('dev_key')
      window.history.replaceState({}, '', url.toString())
      return
    }

    // ── Normal session restore ──────────────────────────────────────────
    try {
      const s = localStorage.getItem('loa_user')
      if (s) setUser(JSON.parse(s))
    } catch {}
    setLoading(false)
  }, [])

  // ── Auth methods ──────────────────────────────────────────────────────
  const login = async (email, password) => {
    // Production: const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    await new Promise(r => setTimeout(r, 650))
    const stored = JSON.parse(localStorage.getItem('loa_user') || 'null')
    const u = stored?.email === email
      ? stored
      : { id: 'u_' + Math.random().toString(36).slice(2,9), name: email.split('@')[0], email, tier: null, user_type: null, enrolledAt: null, progress: {} }
    localStorage.setItem('loa_user', JSON.stringify(u))
    setUser(u)
    return { success: true }
  }

  const signup = async (email, password, name) => {
    // Production: const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })
    await new Promise(r => setTimeout(r, 650))
    const u = { id: 'u_' + Math.random().toString(36).slice(2,9), name: name || email.split('@')[0], email, tier: null, user_type: null, enrolledAt: null, progress: {} }
    localStorage.setItem('loa_user', JSON.stringify(u))
    setUser(u)
    return { success: true }
  }

  const logout = () => {
    // Production: supabase.auth.signOut()
    localStorage.removeItem('loa_user')
    setUser(null)
    router.push('/')
  }

  const updateUser = (updates) => {
    const updated = { ...user, ...updates }
    localStorage.setItem('loa_user', JSON.stringify(updated))
    setUser(updated)
  }

  const markLessonComplete = (lessonId) => {
    updateUser({ progress: { ...(user?.progress || {}), [lessonId]: true } })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser, markLessonComplete }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}

// ── Progress hook ─────────────────────────────────────────────────────────────
export function useProgress() {
  const { user, markLessonComplete } = useAuth()
  const { MODULES, ALL_LESSONS } = require('../data/modules')

  const isCompleted  = (id) => !!user?.progress?.[id]

  const getModuleProgress = (mod) => {
    if (!user?.progress) return 0
    const done = mod.lessons.filter(l => !!user.progress[l.id]).length
    return Math.round((done / mod.lessons.length) * 100)
  }

  const getTotalProgress = () => {
    if (!user?.progress) return 0
    const done = ALL_LESSONS.filter(l => !!user.progress[l.id]).length
    return Math.round((done / ALL_LESSONS.length) * 100)
  }

  const getNextLesson = (lessons) => lessons.find(l => !isCompleted(l.id)) || null

  return { isCompleted, markLessonComplete, getModuleProgress, getTotalProgress, getNextLesson }
}

// ── Auth guard HOC ────────────────────────────────────────────────────────────
export function withAuth(Component) {
  return function Protected(props) {
    const { user, loading } = useAuth()
    const router = useRouter()
    useEffect(() => {
      if (loading) return
      if (!user)        { router.push('/login');   return }
      if (!user.tier)   { router.push('/pricing'); return }
    }, [user, loading, router])
    if (loading || !user || !user.tier) return null
    return <Component {...props} />
  }
}
