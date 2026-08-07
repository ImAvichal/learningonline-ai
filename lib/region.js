// lib/region.js — Region detection hook with URL override + persistence
import { useState, useEffect } from 'react'
import { DEFAULT_REGION, REGIONAL_PRICING } from '../data/tiers'

const REGION_KEY = 'leon-region'

// Detection priority (display only — billing currency is enforced server-side
// in /api/create-checkout-session from the request's own geolocation):
//   1. URL ?region=XX query param (session-only, for troubleshooting)
//   2. /api/region using Vercel geo headers
//   3. DEFAULT_REGION (AU) fallback
// localStorage is deliberately NOT consulted: with no user-facing selector
// there is no legitimate writer, and stale values from earlier builds were
// silently overriding real geolocation. Any old key is actively removed.
export function useRegion() {
  const [region, setRegionState] = useState(DEFAULT_REGION)
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState('default')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // 1. Check URL query param first (highest priority)
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const urlRegion = urlParams.get('region')
      if (urlRegion && REGIONAL_PRICING[urlRegion]) {
        setRegionState(urlRegion)
        setSource('url')
        // Display-only for this visit (troubleshooting) — never persisted, and
        // never trusted for billing (the checkout API derives region server-side).
        setLoading(false)
        return
      }
    } catch {}

    // Clean up any stale persisted region from earlier builds (selector /
    // persisting URL param) — self-heals every affected browser on next visit.
    try { localStorage.removeItem(REGION_KEY) } catch {}

    // 2. Fetch from API (Vercel geo headers)
    fetch('/api/region')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.region && REGIONAL_PRICING[data.region]) {
          setRegionState(data.region)
          setSource('geo')
        }
      })
      .catch(() => { /* fallback to default */ })
      .finally(() => setLoading(false))

    // Live-sync: when any RegionSelector (or other caller) sets a region,
    // every mounted useRegion instance updates immediately — without this,
    // a selector in one component wouldn't refresh prices rendered by another.
    const onRegionChange = (e) => {
      if (e?.detail && REGIONAL_PRICING[e.detail]) {
        setRegionState(e.detail)
        setSource('manual')
      }
    }
    window.addEventListener('leon-region-change', onRegionChange)
    return () => window.removeEventListener('leon-region-change', onRegionChange)
  }, [])

  // Allow manual region change (used by region selector if added)
  const setRegion = (next) => {
    if (REGIONAL_PRICING[next]) {
      setRegionState(next)
      setSource('manual')
      // Session-only: no persistence (no user-facing selector exists).
      try { window.dispatchEvent(new CustomEvent('leon-region-change', { detail: next })) } catch {}
    }
  }

  return { region, loading, source, setRegion }
}

// Manual region setter (for testing or future region selector)
export function setManualRegion(region) {
  if (typeof window !== 'undefined' && REGIONAL_PRICING[region]) {
    try { localStorage.setItem(REGION_KEY, region) } catch {}
  }
}

export function getManualRegion() {
  if (typeof window === 'undefined') return null
  try { return localStorage.getItem(REGION_KEY) } catch { return null }
}
