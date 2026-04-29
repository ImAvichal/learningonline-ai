// lib/theme.js — Theme: dark (default) / light / system
// Applies data-theme attribute to <html> for clean CSS targeting.
// Persists to localStorage.

import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({ theme: 'dark', setTheme: () => {}, resolvedTheme: 'dark' })

const getSystemTheme = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light' : 'dark'

const applyTheme = (t) => {
  if (typeof document === 'undefined') return
  const resolved = t === 'system' ? getSystemTheme() : t
  document.documentElement.setAttribute('data-theme', resolved)
  // Keep legacy light-mode class in sync for any existing CSS
  if (resolved === 'light') document.documentElement.classList.add('light-mode')
  else document.documentElement.classList.remove('light-mode')
}

export function ThemeProvider({ children }) {
  const [theme,         setThemeState]   = useState('dark')
  const [resolvedTheme, setResolvedTheme] = useState('dark')

  useEffect(() => {
    const saved = localStorage.getItem('leon-theme') || 'dark'
    const resolved = saved === 'system' ? getSystemTheme() : saved
    setThemeState(saved)
    setResolvedTheme(resolved)
    applyTheme(saved)
  }, [])

  // React to OS preference changes when in system mode
  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const handler = () => {
      const resolved = getSystemTheme()
      setResolvedTheme(resolved)
      applyTheme('system')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const setTheme = (t) => {
    const resolved = t === 'system' ? getSystemTheme() : t
    setThemeState(t)
    setResolvedTheme(resolved)
    localStorage.setItem('leon-theme', t)
    applyTheme(t)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
