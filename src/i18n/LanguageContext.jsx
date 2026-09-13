import { createContext, useContext, useEffect, useState } from 'react'
import { LANGUAGES, TRANSLATIONS } from './translations'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'greengrow_lang'

// Picks a starting language: whatever the user chose last time (stored
// locally on this device), else the browser's language if we support it,
// else English. This runs before login, so it can't read from Firestore —
// if you want the choice to follow the user across devices, save it to
// users/{uid}.language in AuthContext and read it here once profile loads.
function detectDefaultLanguage() {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved && TRANSLATIONS[saved]) return saved
  const browserLang = (navigator.language || 'en').slice(0, 2)
  return TRANSLATIONS[browserLang] ? browserLang : 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(detectDefaultLanguage)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  function setLanguage(code) {
    if (TRANSLATIONS[code]) setLanguageState(code)
  }

  // Falls back to English, then to the raw key, so a missing translation
  // never renders blank. Pass `params` to fill {placeholders} in the
  // string, e.g. t('quiz.progress', { current: 2, total: 5 }) — this
  // lets each language put the numbers in its own natural word order
  // instead of forcing string concatenation in the component.
  function t(key, params) {
    let str = TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? key
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v)
      }
    }
    return str
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
