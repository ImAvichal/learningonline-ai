// lib/region.js — Region detection hook with URL override + persistence
import { useState, useEffect } from 'react'
import { DEFAULT_REGION, REGIONAL_PRICING } from '../data/tiers'

const REGION_KEY = 'leon-region'

// Detection priority:
//   1. URL ?region=XX query param (highest — for testing/explicit selection)
//   2. localStorage saved preference (user manually picked)
//   3. /api/region using Vercel geo headers (default for new visitors)
//   4. DEFAULT_REGION (AU) fallback
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
        try { localStorage.setItem(REGION_KEY, urlRegion) } catch {}
        setLoading(false)
        return
      }
    } catch {}

    // 2. Check localStorage saved preference
    try {
      const saved = localStorage.getItem(REGION_KEY)
      if (saved && REGIONAL_PRICING[saved]) {
        setRegionState(saved)
        setSource('saved')
        // Continue to also fetch from API to keep fresh, but don't override
      }
    } catch {}

    // 3. Fetch from API (Vercel geo headers)
    fetch('/api/region')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.region && REGIONAL_PRICING[data.region]) {
          // Only override if there's no saved preference
          try {
            const saved = localStorage.getItem(REGION_KEY)
            if (!saved) {
              setRegionState(data.region)
              setSource('geo')
              localStorage.setItem(REGION_KEY, data.region)
            }
          } catch {
            setRegionState(data.region)
            setSource('geo')
          }
        }
      })
      .catch(() => { /* fallback to default */ })
      .finally(() => setLoading(false))
  }, [])

  // Allow manual region change (used by region selector if added)
  const setRegion = (next) => {
    if (REGIONAL_PRICING[next]) {
      setRegionState(next)
      setSource('manual')
      try { localStorage.setItem(REGION_KEY, next) } catch {}
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
