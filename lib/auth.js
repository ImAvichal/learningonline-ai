// lib/auth.js — Supabase auth with updated v6 schema
import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const DEV_KEY = 'loa_dev_avi_2025'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Dev bypass
    const params = new URLSearchParams(window.location.search)
    if (params.get('dev_key') === DEV_KEY) {
      setUser({
        id: 'dev-avi', name: 'Avi (Dev)',
        email: 'avi@learningonline.ai',
        tier: 'pro', user_type: 'pro',
        isDevUser: true, enrolledAt: new Date().toISOString(), progress: {}, scores: {},
      })
      setLoading(false)
      const url = new URL(window.location.href)
      url.searchParams.delete('dev_key')
      window.history.replaceState({}, '', url.toString())
      return
    }

    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) await loadUser(session.user)
      } catch (e) { console.error('Session error:', e) }
      setLoading(false)
    }
    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) await loadUser(session.user)
      else setUser(null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const loadUser = async (authUser) => {
    try {
      // Load profile
      const { data: profile } = await supabase
        .from('users_profile')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (!profile) {
        const newProfile = {
          id: authUser.id, email: authUser.email,
          full_name: authUser.user_metadata?.full_name 
            || authUser.user_metadata?.name 
            || authUser.user_metadata?.given_name 
            || authUser.email.split('@')[0],
          user_type: null, selected_tier: null,
        }
        await supabase.from('users_profile').upsert(newProfile)
        setUser({ ...newProfile, name: newProfile.full_name, tier: null, progress: {}, scores: {} })
        return
      }

      // Load progress
      const { data: progressData } = await supabase
        .from('course_progress')
        .select('lesson_id')
        .eq('user_id', authUser.id)
        .eq('completed', true)

      // Load scores
      const { data: scoresData } = await supabase
        .from('assessment_scores')
        .select('module_id, score, score_category')
        .eq('user_id', authUser.id)

      const progress = {}
      progressData?.forEach(p => { progress[p.lesson_id] = true })

      const scores = {}
      scoresData?.forEach(s => { scores[s.module_id] = { score: s.score, category: s.score_category } })

      // Check purchases for entitlement — purchase overrides profile tier
      // Handles case where Stripe webhook wrote to purchases but not profile
      const { data: latestPurchase } = await supabase
        .from('purchases')
        .select('tier, payment_status')
        .eq('user_id', authUser.id)
        .in('payment_status', ['paid', 'complete', 'completed'])
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      // Map legacy tier names to new structure
      const TIER_MIGRATION = { individual: 'journey', smb: 'journey', enterprise: 'pro' }
      const rawTier = latestPurchase?.tier || profile.selected_tier || null
      const activeTier = rawTier && TIER_MIGRATION[rawTier] ? TIER_MIGRATION[rawTier] : rawTier

      // Sync profile tier if purchase found but profile not yet updated
      if (latestPurchase?.tier && !profile.selected_tier) {
        await supabase.from('users_profile')
          .update({ selected_tier: latestPurchase.tier, user_type: latestPurchase.tier })
          .eq('id', authUser.id)
      }

      setUser({
        ...profile,
        name: profile.full_name,
        tier: activeTier,
        progress,
        scores,
      })
    } catch (e) { console.error('Load user error:', e) }
  }

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { success: false, error: error.message }
    await loadUser(data.user)
    return { success: true }
  }

  const signup = async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email, password, options: { data: { name } }
    })
    if (error) return { success: false, error: error.message }
    if (data.user) {
      await supabase.from('users_profile').upsert({
        id: data.user.id, email, full_name: name || email.split('@')[0],
        user_type: null, selected_tier: null,
      })
      setUser({ id: data.user.id, email, name: name || email.split('@')[0], tier: null, progress: {}, scores: {} })
    }
    return { success: true }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }


  const loginWithLinkedIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const updateUser = async (updates) => {
    const updated = { ...user, ...updates }
    setUser(updated)
    if (user?.id && !user?.isDevUser) {
      const dbUpdates = {}
      if (updates.tier)       { dbUpdates.selected_tier = updates.tier; dbUpdates.user_type = updates.tier }
      if (updates.name)         dbUpdates.full_name = updates.name
      if (Object.keys(dbUpdates).length)
        await supabase.from('users_profile').update(dbUpdates).eq('id', user.id)
    }
  }

  const markLessonComplete = async (lessonId, moduleId) => {
    const updated = { ...user, progress: { ...(user?.progress || {}), [lessonId]: true } }
    setUser(updated)
    if (user?.id && !user?.isDevUser) {
      await supabase.from('course_progress').upsert(
        { user_id: user.id, lesson_id: lessonId, module_id: moduleId, completed: true },
        { onConflict: 'user_id,lesson_id' }
      )
    }
  }

  const saveScore = async (moduleId, score, totalQuestions, answers) => {
    const pct = Math.round((score / totalQuestions) * 100)
    const category = pct >= 85 ? 'Advanced' : pct >= 65 ? 'Ready to Apply' : pct >= 45 ? 'Developing' : 'Beginner'
    const updatedScores = { ...(user?.scores || {}), [moduleId]: { score: pct, category } }
    setUser({ ...user, scores: updatedScores })
    if (user?.id && !user?.isDevUser) {
      await supabase.from('assessment_scores').upsert(
        { user_id: user.id, module_id: moduleId, score: pct, score_category: category, answers_json: JSON.stringify(answers) },
        { onConflict: 'user_id,module_id' }
      )
    }
  }

  const trackDownload = async (resourceId) => {
    if (user?.id && !user?.isDevUser) {
      await supabase.from('downloads').insert({ user_id: user.id, resource_id: resourceId })
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, loginWithGoogle, loginWithLinkedIn, updateUser, markLessonComplete, saveScore, trackDownload, supabase }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}

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
    const accessible = ALL_LESSONS.filter(l => {
      // Pro sees everything; Journey sees journey + parents
      const userTier = user.tier || 'journey'
      if (userTier === 'pro') return true
      if (userTier === 'journey') return l.tier === 'journey' || l.tier === 'parents'
      return false
    })
    const done = accessible.filter(l => !!user.progress[l.id]).length
    return accessible.length ? Math.round((done / accessible.length) * 100) : 0
  }

  const getNextLesson = (lessons) => lessons.find(l => !isCompleted(l.id)) || null

  return { isCompleted, markLessonComplete, getModuleProgress, getTotalProgress, getNextLesson }
}

export function withAuth(Component) {
  return function Protected(props) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      // Wait for auth to fully restore before any redirect
      if (loading) return
      if (!user) {
        router.push('/login')
        return
      }
      // Authenticated but no tier — send to preview
      if (!user.tier && !user.isDevUser) {
        router.push('/preview')
        return
      }
    }, [user, loading, router])

    // Show spinner while session is restoring — prevents flash redirect
    if (loading) return (
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ width:32, height:32, border:'3px solid rgba(26,110,255,0.2)', borderTopColor:'#1A6EFF', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 12px' }} />
          <p style={{ fontSize:13, color:'#7A8AAD' }}>Loading your account...</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>
    )

    if (!user || (!user.tier && !user.isDevUser)) return null
    return <Component {...props} />
  }
}
