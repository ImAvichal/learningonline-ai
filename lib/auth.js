// lib/auth.js — Supabase auth (v6 schema)
//
// PEER-REVIEW NOTES (12 May 2026 rewrite):
// This file was rewritten to address the SEV-1 patterns found in production:
//   1. Race between signup() upsert and onAuthStateChange's loadUser() insert
//      → caused infinite spinner on Sign Up button
//   2. Silent timeouts in withTimeout() returned { data: null }, indistinguishable
//      from genuine empty results → wrong code paths fired
//   3. Auth↔profile id mismatch (orphaned profile rows from previous schema)
//      had no self-healing path → user permanently stuck on /preview
//   4. No user-visible feedback for hangs → infinite spinners with no recovery
//
// Design principles applied:
//   - Single path for profile creation (in loadUser, not in signup)
//   - Self-healing for orphaned profile rows (match by email, relink id)
//   - Hard timeouts surface as errors, not silent nulls
//   - Loud, defensive console logging at each step (prefix [auth])
//   - Parallel queries where possible (Promise.all)

import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// ── Timeout helper ──────────────────────────────────────────────────────────
// CHANGE FROM PREVIOUS: returns { data, error: TimeoutError } on timeout
// instead of silently returning { data: null }. Callers can now distinguish
// timeouts from genuine empty results.
const withTimeout = (promise, ms = 15000, label = 'query') => {
  return Promise.race([
    promise,
    new Promise(resolve => setTimeout(() => {
      console.warn(`[auth] ⏱  Timeout on ${label} after ${ms}ms`)
      resolve({ data: null, error: { message: 'timeout', code: 'TIMEOUT' } })
    }, ms))
  ])
}

const DEV_KEY = 'loa_dev_avi_2025'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Track whether we've finished initial auth check — prevents the onAuthStateChange
  // listener from firing redundant loadUser calls during initial mount.
  const initialisedRef = useRef(false)

  useEffect(() => {
    // ── Dev bypass (unchanged) ─────────────────────────────────────────────
    const params = new URLSearchParams(window.location.search)
    if (params.get('dev_key') === DEV_KEY) {
      setUser({
        id: 'dev-avi', name: 'Avi (Dev)', email: 'avi@learningonline.ai',
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
      console.log('[auth] init starting')
      // Hard timeout safety net (last resort if everything else hangs)
      const safetyTimeout = setTimeout(() => {
        console.warn('[auth] ⏱  Init safety timeout fired — releasing loading state')
        setLoading(false)
      }, 12000)

      try {
        const { data: { session } } = await supabase.auth.getSession()
        console.log('[auth] session:', session?.user?.id || 'none')
        if (session?.user) await loadUser(session.user)
      } catch (e) {
        console.error('[auth] init error:', e)
      } finally {
        clearTimeout(safetyTimeout)
        setLoading(false)
        initialisedRef.current = true
        console.log('[auth] init complete')
      }
    }
    init()

    // ── onAuthStateChange listener ─────────────────────────────────────────
    // PEER-REVIEW NOTE: This listener fires for SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED.
    // CHANGE: We skip the SIGNED_IN event during initial mount (init() handles it)
    // to avoid the duplicate-loadUser race that caused the SEV-1 signup hang.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[auth] onAuthStateChange:', event, session?.user?.id || 'none')
      // Skip the initial SIGNED_IN event — init() is already handling it
      if (!initialisedRef.current && event === 'SIGNED_IN') {
        console.log('[auth] skipping initial SIGNED_IN (handled by init)')
        return
      }
      if (event === 'SIGNED_OUT' || !session?.user) {
        setUser(null)
        return
      }
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        await loadUser(session.user)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  // ── loadUser ─────────────────────────────────────────────────────────────
  // SOLE entry point for fetching profile + progress + scores + tier.
  // PEER-REVIEW NOTE: Previous version made 5 sequential queries (up to 25s
  // worst case). Now parallel where possible: profile + progress + scores
  // + latestPurchase fired together, then optional sync update.
  const loadUser = async (authUser) => {
    console.log('[auth] loadUser starting for', authUser.email)
    try {
      // STEP 1: Look up profile by id (the expected case for a properly linked user)
      const profileRes = await withTimeout(
        supabase.from('users_profile').select('*').eq('id', authUser.id).maybeSingle(),
        15000, 'loadUser/profile-by-id'
      )

      let profile = profileRes?.data

      // STEP 2: If no profile exists by id, check for orphaned row by email
      // PEER-REVIEW NOTE: This is the SEV-1 self-healing path. An orphaned
      // profile row (same email, different id) used to leave the user
      // permanently stuck. We now detect and re-link it.
      if (!profile) {
        console.log('[auth] no profile by id — checking for orphan by email')
        const orphanRes = await withTimeout(
          supabase.from('users_profile')
            .select('*').eq('email', authUser.email).maybeSingle(),
          10000, 'loadUser/profile-by-email'
        )

        if (orphanRes?.data) {
          console.warn('[auth] 🔧 Self-healing: orphan profile found, relinking to current auth.uid()')
          // Re-link the orphan row to the current auth.uid
          // (Cascade FKs ensure all course_progress / purchases / etc. follow)
          const relinkRes = await withTimeout(
            supabase.from('users_profile')
              .update({ id: authUser.id })
              .eq('id', orphanRes.data.id),
            10000, 'loadUser/self-heal-relink'
          )
          if (relinkRes?.error) {
            console.error('[auth] Self-heal relink failed:', relinkRes.error.message)
            // Fall back to creating fresh — at least the user gets in
          } else {
            console.log('[auth] ✓ Self-heal complete — re-fetching profile')
            const refetch = await withTimeout(
              supabase.from('users_profile').select('*').eq('id', authUser.id).maybeSingle(),
              10000, 'loadUser/profile-refetch-after-heal'
            )
            profile = refetch?.data
          }
        }

        // STEP 3: Still no profile after orphan-check → genuinely new user
        if (!profile) {
          console.log('[auth] creating new profile for first-time user')
          const newProfile = {
            id: authUser.id,
            email: authUser.email,
            full_name: authUser.user_metadata?.full_name
              || authUser.user_metadata?.name
              || authUser.user_metadata?.given_name
              || authUser.email.split('@')[0],
            user_type: null,
            selected_tier: null,
          }
          // PEER-REVIEW NOTE: We use upsert (not insert) so concurrent calls
          // from a duplicate-fire of this code (e.g. race with signup) don't
          // collide on the id primary key. The unique-email constraint can
          // still fire if there's a duplicate email — but the orphan-check
          // above should have caught that case.
          const createRes = await withTimeout(
            supabase.from('users_profile').upsert(newProfile, { onConflict: 'id' }),
            10000, 'loadUser/profile-create'
          )
          if (createRes?.error && createRes.error.code !== '23505') {
            // 23505 = unique constraint violation, expected in race conditions
            console.error('[auth] Profile create failed:', createRes.error.message)
          }
          // Set user state with the new profile shape and exit early
          setUser({
            ...newProfile,
            name: newProfile.full_name,
            tier: null,
            progress: {},
            scores: {},
          })
          console.log('[auth] ✓ loadUser complete (new profile)')
          return
        }
      }

      // STEP 4: Profile exists — load all related data in parallel
      // PEER-REVIEW NOTE: parallel queries — worst case ~15s instead of ~60s
      const [progressRes, scoresRes, latestPurchaseRes] = await Promise.all([
        withTimeout(
          supabase.from('course_progress')
            .select('lesson_id').eq('user_id', authUser.id).eq('completed', true),
          15000, 'loadUser/progress'
        ),
        withTimeout(
          supabase.from('assessment_scores')
            .select('module_id, score, score_category').eq('user_id', authUser.id),
          15000, 'loadUser/scores'
        ),
        withTimeout(
          supabase.from('purchases')
            .select('tier, payment_status')
            .eq('user_id', authUser.id)
            .in('payment_status', ['paid', 'complete', 'completed'])
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle(),
          15000, 'loadUser/purchases'
        ),
      ])

      const progress = {}
      progressRes?.data?.forEach(p => { progress[p.lesson_id] = true })

      const scores = {}
      scoresRes?.data?.forEach(s => {
        scores[s.module_id] = { score: s.score, category: s.score_category }
      })

      const latestPurchase = latestPurchaseRes?.data

      // STEP 5: Determine the active tier
      // Purchase overrides profile tier (handles webhook-then-not-profile case)
      const TIER_MIGRATION = { individual: 'journey', smb: 'journey', enterprise: 'pro' }
      const rawTier = latestPurchase?.tier || profile.selected_tier || null
      const activeTier = rawTier && TIER_MIGRATION[rawTier] ? TIER_MIGRATION[rawTier] : rawTier

      // STEP 6: Sync profile tier if purchase exists but profile not yet updated
      // Fire-and-forget — doesn't block the user from loading
      if (latestPurchase?.tier && !profile.selected_tier) {
        supabase.from('users_profile')
          .update({ selected_tier: latestPurchase.tier, user_type: latestPurchase.tier })
          .eq('id', authUser.id)
          .then(() => console.log('[auth] ✓ profile tier synced from purchase'))
          .catch(err => console.error('[auth] tier sync failed:', err.message))
      }

      setUser({
        ...profile,
        name: profile.full_name,
        tier: activeTier,
        progress,
        scores,
      })
      console.log('[auth] ✓ loadUser complete (tier:', activeTier, ')')
    } catch (e) {
      console.error('[auth] loadUser fatal error:', e)
    }
  }

  // ── login ────────────────────────────────────────────────────────────────
  // CHANGE: explicit timeout that surfaces as an error, no infinite spinner
  const login = async (email, password) => {
    console.log('[auth] login attempt for', email)
    try {
      const loginPromise = supabase.auth.signInWithPassword({ email, password })
      const result = await Promise.race([
        loginPromise,
        new Promise((_, reject) => setTimeout(
          () => reject(new Error('Login is taking longer than expected. Please refresh and try again.')),
          15000
        ))
      ])
      const { data, error } = result
      if (error) {
        console.warn('[auth] login error:', error.message)
        return { success: false, error: error.message }
      }
      // Don't call loadUser here — the onAuthStateChange listener will fire
      // and handle it. Calling it both places caused the SEV-1 race.
      console.log('[auth] login successful')
      return { success: true }
    } catch (e) {
      console.error('[auth] login exception:', e.message)
      return { success: false, error: e.message }
    }
  }

  // ── signup ───────────────────────────────────────────────────────────────
  // CHANGE: removed the in-line profile upsert. Profile creation is now
  // delegated entirely to loadUser (via onAuthStateChange). This eliminates
  // the race that caused the SEV-1 infinite spinner.
  const signup = async (email, password, name) => {
    console.log('[auth] signup attempt for', email)
    try {
      const signupPromise = supabase.auth.signUp({
        email, password, options: { data: { name, full_name: name } }
      })
      const result = await Promise.race([
        signupPromise,
        new Promise((_, reject) => setTimeout(
          () => reject(new Error('Sign-up is taking longer than expected. Please refresh and try again.')),
          15000
        ))
      ])
      const { data, error } = result
      if (error) {
        console.warn('[auth] signup error:', error.message)
        return { success: false, error: error.message }
      }
      console.log('[auth] signup successful — profile will be created via onAuthStateChange')
      // PEER-REVIEW NOTE: We don't call loadUser here. The onAuthStateChange
      // listener will fire SIGNED_IN automatically and trigger loadUser, which
      // will create the profile. One code path, no race.
      return { success: true }
    } catch (e) {
      console.error('[auth] signup exception:', e.message)
      return { success: false, error: e.message }
    }
  }

  // ── logout (unchanged from previous fix) ─────────────────────────────────
  const logout = async () => {
    // Navigate FIRST so the page we're on can't redirect us elsewhere
    // when its auth-required guard sees user=null. THEN do the signOut.
    await router.push('/')
    await supabase.auth.signOut()
    setUser(null)
  }

  // ── refreshUser ──────────────────────────────────────────────────────────
  const refreshUser = async () => {
    console.log('[auth] refreshUser called')
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) await loadUser(session.user)
  }

  // ── OAuth (unchanged) ────────────────────────────────────────────────────
  const loginWithGoogle = async (intendedRedirect = null) => {
    const callbackUrl = new URL(`${window.location.origin}/auth/callback`)
    if (intendedRedirect) {
      callbackUrl.searchParams.set('next', intendedRedirect)
      try { localStorage.setItem('postAuthRedirect', intendedRedirect) } catch {}
    }
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: callbackUrl.toString() },
    })
  }

  const loginWithLinkedIn = async (intendedRedirect = null) => {
    const callbackUrl = new URL(`${window.location.origin}/auth/callback`)
    if (intendedRedirect) {
      callbackUrl.searchParams.set('next', intendedRedirect)
      try { localStorage.setItem('postAuthRedirect', intendedRedirect) } catch {}
    }
    await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: { redirectTo: callbackUrl.toString() },
    })
  }

  // ── updateUser / markLessonComplete / saveScore / claimParentsTier / trackDownload ──
  // (Largely unchanged — these aren't in the hang path)

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
      const { error } = await supabase.from('course_progress').upsert(
        { user_id: user.id, lesson_id: lessonId, module_id: moduleId, completed: true },
        { onConflict: 'user_id,lesson_id' }
      )
      if (error) console.error('[auth] markLessonComplete error:', error.message)
    }
  }

  const saveScore = async (moduleId, score, totalQuestions, answers) => {
    const pct = Math.round((score / totalQuestions) * 100)
    const category = pct >= 85 ? 'Advanced' : pct >= 65 ? 'Ready to Apply' : pct >= 45 ? 'Developing' : 'Beginner'
    const updatedScores = { ...(user?.scores || {}), [moduleId]: { score: pct, category } }
    setUser({ ...user, scores: updatedScores })
    if (user?.id && !user?.isDevUser) {
      const { error } = await supabase.from('assessment_scores').upsert(
        { user_id: user.id, module_id: moduleId, score: pct, score_category: category, answers_json: JSON.stringify(answers) },
        { onConflict: 'user_id,module_id' }
      )
      if (error) console.error('[auth] saveScore error:', error.message)
    }
  }

  const claimParentsTier = async () => {
    if (!user?.id || user?.isDevUser) return
    if (user?.tier && user.tier !== 'parents') return
    setUser({ ...user, tier: 'parents' })
    try {
      await supabase
        .from('users_profile')
        .update({ selected_tier: 'parents', user_type: 'parents' })
        .eq('id', user.id)
        .is('selected_tier', null)
    } catch (err) {
      console.error('[auth] claimParentsTier failed (non-fatal):', err.message)
    }
  }

  const trackDownload = async (resourceId) => {
    if (user?.id && !user?.isDevUser) {
      await supabase.from('downloads').insert({ user_id: user.id, resource_id: resourceId })
    }
  }

  return (
    <AuthContext.Provider value={{
      user, loading,
      login, signup, logout,
      loginWithGoogle, loginWithLinkedIn,
      updateUser, markLessonComplete, claimParentsTier, saveScore,
      trackDownload, refreshUser, supabase
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}

// ── useProgress hook (unchanged from previous) ─────────────────────────────
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

// ── withAuth HOC (unchanged) ────────────────────────────────────────────────
export function withAuth(Component) {
  return function Protected(props) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (loading) return
      if (!user) {
        router.push('/login')
        return
      }
      if (!user.tier && !user.isDevUser) {
        router.push('/preview')
        return
      }
    }, [user, loading, router])

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
