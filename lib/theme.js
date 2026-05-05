// lib/theme.js — Locked to light theme for learning platform readability
// Theme toggle removed for premium consistency.
// To re-enable later, restore previous version from git.

import { createContext, useContext, useEffect } from 'react'

const ThemeContext = createContext({ theme: 'dark', setTheme: () => {}, resolvedTheme: 'dark' })

export function ThemeProvider({ children }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', 'light')
      document.documentElement.classList.remove('light-mode')
      // Clear any stale localStorage preference
      try { localStorage.setItem('leon-theme', 'light') } catch {}
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: 'dark', setTheme: () => {}, resolvedTheme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
