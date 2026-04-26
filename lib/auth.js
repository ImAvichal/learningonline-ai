// lib/auth.js — Real Supabase auth
// Swapped from localStorage demo to production Supabase auth.
//
// DEV BYPASS: append ?dev_key=loa_dev_avi_2025 to any URL
// → instant enterprise access, no signup, no payment needed.

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'

// ── Supabase client ───────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const DEV_KEY = 'loa_dev_avi_2025'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // ── Session restore & dev bypass ─────────────────────────────────────────
  useEffect(() => {
    // Dev bypass — check URL param first
    const params = new URLSearchParams(window.location.search)
    if (params.get('dev_key') === DEV_KEY) {
      const devUser = {
        id: 'dev-avi', name: 'Avi (Dev)',
        email: 'avi@learningonline.ai',
        tier: 'enterprise', user_type: 'enterprise',
        isDevUser: true,
        enrolledAt: new Date().toISOString(),
        progress: {},
      }
      setUser(devUser)
      setLoading(false)
      // Clean dev key from URL
      const url = new URL(window.location.href)
      url.searchParams.delete('dev_key')
      window.history.replaceState({}, '', url.toString())
      return
    }

    // Restore Supabase session
    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          await loadUser(session.user)
        }
      } catch (err) {
        console.error('Session restore error:', err)
      }
      setLoading(false)
    }
    init()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadUser(session.user)
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // ── Load user profile from DB ─────────────────────────────────────────────
  const loadUser = async (authUser) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (error || !data) {
        // User exists in auth but not in users table yet — create record
        const newUser = {
          id:    authUser.id,
          email: authUser.email,
          name:  authUser.user_metadata?.name || authUser.email.split('@')[0],
          tier:  null,
          enrolled_at: null,
        }
        await supabase.from('users').upsert(newUser)
        setUser({ ...newUser, progress: {} })
      } else {
        // Load progress
        const { data: progressData } = await supabase
          .from('progress')
          .select('lesson_id')
          .eq('user_id', authUser.id)

        const progress = {}
        progressData?.forEach(p => { progress[p.lesson_id] = true })
        setUser({ ...data, progress })
      }
    } catch (err) {
      console.error('Load user error:', err)
    }
  }

  // ── Auth methods ──────────────────────────────────────────────────────────
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return { success: false, error: error.message }
      await loadUser(data.user)
      return { success: true }
    } catch (err) {
      return { success: false, error: 'Something went wrong. Please try again.' }
    }
  }

  const signup = async (email, password, name) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      })
      if (error) return { success: false, error: error.message }

      // Create user record in users table
      if (data.user) {
        await supabase.from('users').upsert({
          id:    data.user.id,
          email: data.user.email,
          name:  name || email.split('@')[0],
          tier:  null,
        })
        setUser({
          id: data.user.id, email, name: name || email.split('@')[0],
          tier: null, progress: {}
        })
      }
      return { success: true }
    } catch (err) {
      return { success: false, error: 'Something went wrong. Please try again.' }
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  const updateUser = async (updates) => {
    const updated = { ...user, ...updates }
    setUser(updated)
    if (user?.id && !user?.isDevUser) {
      // Persist to DB
      const dbUpdates = {}
      if (updates.tier)       dbUpdates.tier        = updates.tier
      if (updates.name)       dbUpdates.name        = updates.name
      if (updates.company)    dbUpdates.company     = updates.company
      if (updates.jobTitle)   dbUpdates.job_title   = updates.jobTitle
      if (updates.enrolledAt) dbUpdates.enrolled_at = updates.enrolledAt
      if (Object.keys(dbUpdates).length) {
        await supabase.from('users').update(dbUpdates).eq('id', user.id)
      }
    }
  }

  const markLessonComplete = async (lessonId) => {
    // Update local state immediately
    const updated = { ...user, progress: { ...(user?.progress || {}), [lessonId]: true } }
    setUser(updated)

    // Persist to Supabase (skip for dev user)
    if (user?.id && !user?.isDevUser) {
      await supabase.from('progress').upsert(
        { user_id: user.id, lesson_id: lessonId, completed_at: new Date().toISOString() },
        { onConflict: 'user_id,lesson_id' }
      )
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser, markLessonComplete, supabase }}>
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

  const isCompleted = (id) => !!user?.progress?.[id]

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
      if (!user)      { router.push('/login');   return }
      if (!user.tier) { router.push('/pricing'); return }
    }, [user, loading, router])
    if (loading || !user || !user.tier) return null
    return <Component {...props} />
  }
}

// ── Export supabase client for direct use elsewhere ───────────────────────────
export { supabase }
