import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function Login() {
  const { login } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login({ email, password })
      navigate('/dashboard')
    } catch (err) {
      setError(t(authErrorKey(err)))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-end mb-3">
          <LanguageSwitcher />
        </div>

        <div className="text-center mb-8">
          <div className="text-3xl mb-1">🌿</div>
          <h1 className="text-xl font-bold text-forest-900">GreenGrow</h1>
          <p className="text-xs text-gray-500">{t('common.tagline')}</p>
        </div>

        <div className="bg-white rounded-xl2 border border-gray-100 shadow-card p-6">
          <h2 className="font-semibold text-lg mb-1">{t('login.welcomeBack')}</h2>
          <p className="text-sm text-gray-500 mb-5">{t('login.subtitle')}</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              placeholder={t('login.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-forest-500"
            />
            <input
              type="password"
              required
              placeholder={t('login.passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-forest-500"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest-700 hover:bg-forest-800 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
            >
              {loading ? t('login.submitting') : t('login.submit')}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            {t('login.noAccount')}{' '}
            <Link to="/signup" className="text-forest-700 font-semibold">
              {t('login.signUpLink')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

// Firebase Auth error codes are technical (e.g. "auth/invalid-credential");
// map them to a translation key so any language can render them. Returns
// a key into TRANSLATIONS, not display text — call t() on the result.
export function authErrorKey(err) {
  const code = err?.code || ''
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) {
    return 'errors.invalidCredential'
  }
  if (code.includes('email-already-in-use')) return 'errors.emailInUse'
  if (code.includes('weak-password')) return 'errors.weakPassword'
  if (code.includes('invalid-email')) return 'errors.invalidEmail'
  return 'errors.generic'
}
