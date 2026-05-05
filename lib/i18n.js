// lib/i18n.js — Lightweight i18n: JSON message files + useTranslation hook
// Designed to be minimal, stable, and easily replaceable with next-intl later.
// English is the default. Hindi and Filipino are beta.

import { createContext, useContext, useState, useEffect } from 'react'
import en from '../messages/en.json'
import hi from '../messages/hi.json'
import tl from '../messages/tl.json'

const MESSAGES = { en, hi, tl }

export const LANGUAGES = [
  { code: 'en', label: 'English',          beta: false },
  { code: 'hi', label: 'हिन्दी',            beta: true },
  { code: 'tl', label: 'Filipino',         beta: true },
]

const DEFAULT_LANG = 'en'

const I18nContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (key) => key,
})

// Resolve a dot-notation key against messages object, with English fallback
function resolveKey(messages, key) {
  const parts = key.split('.')
  let current = messages
  for (const p of parts) {
    if (current && typeof current === 'object' && p in current) current = current[p]
    else return null
  }
  return typeof current === 'string' ? current : null
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG)

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const saved = localStorage.getItem('leon-lang')
      if (saved && MESSAGES[saved]) setLangState(saved)
    } catch {}
  }, [])

  // Sync <html lang="..."> attribute whenever language changes
  // (helps screen readers, search engines, browser translation prompts)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', lang)
    }
  }, [lang])

  const setLang = (next) => {
    if (!MESSAGES[next]) return
    setLangState(next)
    try { localStorage.setItem('leon-lang', next) } catch {}
  }

  const t = (key) => {
    // Try selected language, fall back to English, then return key as last resort
    const resolved = resolveKey(MESSAGES[lang], key) 
      || resolveKey(MESSAGES[DEFAULT_LANG], key) 
      || key
    return resolved
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useTranslation = () => useContext(I18nContext)
