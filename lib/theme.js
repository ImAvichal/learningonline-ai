// lib/theme.js — Theme toggle: dark (default) / light / system
// Persists to localStorage. Applies 'light-mode' class to <html>.
// Dark mode is the default (matches existing design).

import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({ theme: 'dark', setTheme: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('dark')

  useEffect(() => {
    // Restore saved preference
    const saved = localStorage.getItem('leon-theme') || 'dark'
    applyTheme(saved)
    setThemeState(saved)
  }, [])

  const applyTheme = (t) => {
    const html = document.documentElement
    if (t === 'light') {
      html.classList.add('light-mode')
    } else if (t === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) html.classList.remove('light-mode')
      else html.classList.add('light-mode')
    } else {
      // dark (default)
      html.classList.remove('light-mode')
    }
  }

  const setTheme = (t) => {
    setThemeState(t)
    localStorage.setItem('leon-theme', t)
    applyTheme(t)
  }

  // Listen for system preference changes when in 'system' mode
  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme('system')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
