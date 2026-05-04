// lib/region.js — Region detection hook
import { useState, useEffect } from 'react'
import { DEFAULT_REGION, REGIONAL_PRICING } from '../data/tiers'

export function useRegion() {
  const [region, setRegion] = useState(DEFAULT_REGION)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try to get region from API (uses Vercel geo headers)
    fetch('/api/region')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.region && REGIONAL_PRICING[data.region]) {
          setRegion(data.region)
        }
      })
      .catch(() => { /* fallback to default */ })
      .finally(() => setLoading(false))
  }, [])

  return { region, loading }
}

// Manual region setter (for testing or future region selector)
export function setManualRegion(region) {
  if (typeof window !== 'undefined' && REGIONAL_PRICING[region]) {
    try { localStorage.setItem('manualRegion', region) } catch {}
  }
}

export function getManualRegion() {
  if (typeof window === 'undefined') return null
  try { return localStorage.getItem('manualRegion') } catch { return null }
}
