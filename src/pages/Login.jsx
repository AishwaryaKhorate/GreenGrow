import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import { useLanguage } from '../i18n/LanguageContext'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
 

} from 'lucide-react'

export default function Login() {
  const { login, loginWithGoogle } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // =========================
  // EMAIL + PASSWORD LOGIN
  // =========================
  async function handleSubmit(e) {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {
      await login({
        email: email.trim(),
        password,
      })

      // Successful login → Dashboard
      navigate('/dashboard', {
        replace: true,
      })
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // GOOGLE LOGIN
  // =========================
  async function handleGoogleLogin() {
    setError('')
    setLoading(true)

    try {
      await loginWithGoogle()

      // Successful Google login → Dashboard
      navigate('/dashboard', {
        replace: true,
      })
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // FIREBASE ERROR MESSAGE
  // =========================
  function authErrorMessage(err) {
    const code = err?.code || ''

    if (
      code.includes('invalid-credential') ||
      code.includes('wrong-password') ||
      code.includes('user-not-found')
    ) {
      return 'Invalid email or password.'
    }

    if (code.includes('invalid-email')) {
      return 'Please enter a valid email address.'
    }

    if (code.includes('user-disabled')) {
      return 'This account has been disabled.'
    }

    if (code.includes('too-many-requests')) {
      return 'Too many attempts. Please try again later.'
    }

    if (code.includes('popup-closed-by-user')) {
      return 'Google sign-in was cancelled.'
    }

    if (code.includes('popup-blocked')) {
      return 'The Google sign-in popup was blocked. Please allow popups and try again.'
    }

    if (code.includes('account-exists-with-different-credential')) {
      return 'An account already exists with this email using another sign-in method.'
    }

    return 'Something went wrong. Please try again.'
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =========================
          NAVBAR
      ========================== */}
      <Navbar />

      {/* =========================
          LOGIN SECTION
      ========================== */}
      <main className="min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-8 sm:py-12">

        <div className="w-full max-w-md">

          {/* LOGIN CARD */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-5 sm:p-8">

            {/* =========================
                HEADER
            ========================== */}
            <div className="text-center mb-7">

              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-forest-100 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-2xl">🌿</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4">
{t('login.title')}              </h1>

              <p className="text-sm text-gray-500 mt-2">
{t('login.description')}              </p>

            </div>

            {/* =========================
                FORM
            ========================== */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* EMAIL */}
              <div>

                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
{t('login.emailLabel')}                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    strokeWidth={2}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />

                  <input
                    id="login-email"
                    type="email"
                    required
                    autoComplete="email"
placeholder={t('login.emailPlaceholderFull')}                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  {t('login.passwordLabel')}
                </label>

                <div className="relative">

                  {/* Lock Icon */}
                  <Lock
                    size={18}
                    strokeWidth={2}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />

                  {/* Password Input */}
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
placeholder={t('login.passwordPlaceholderFull')}                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 pl-11 pr-12 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
                  />

                  {/* Eye Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} strokeWidth={2} />
                    ) : (
                      <Eye size={18} strokeWidth={2} />
                    )}
                  </button>

                </div>

              </div>

              {/* ERROR */}
              {error && (
                <div
                  role="alert"
                  className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-3"
                >
                  {error}
                </div>
              )}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-forest-700 hover:bg-forest-800 active:bg-forest-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-colors"
              >
{loading ? t('login.loading') : t('login.submit')}              </button>

            </form>

            {/* =========================
                DIVIDER
            ========================== */}
            <div className="flex items-center gap-3 my-6">

              <div className="flex-1 h-px bg-gray-200" />

              <span className="text-xs text-gray-400 font-medium">
                {t('login.or')}
              </span>

              <div className="flex-1 h-px bg-gray-200" />

            </div>

            {/* =========================
                GOOGLE LOGIN
            ========================== */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full h-12 border border-gray-200 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed text-gray-700 font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-3"
            >
              <svg
  width="19"
  height="19"
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <path
    fill="#4285F4"
    d="M21.35 12.23c0-.79-.07-1.55-.23-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42z"
  />
  <path
    fill="#34A853"
    d="M12 21.67c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.74 9.74 0 0 0 12 21.67z"
  />
  <path
    fill="#FBBC05"
    d="M6.53 13.76A5.86 5.86 0 0 1 6.22 12c0-.61.11-1.2.31-1.76V7.71H3.28A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.03 4.29l3.25-2.53z"
  />
  <path
    fill="#EA4335"
    d="M12 6.21c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.3 14.63 2.33 12 2.33a9.74 9.74 0 0 0-8.72 5.38l3.25 2.53C7.3 7.93 9.46 6.21 12 6.21z"
  />
</svg>
              <span>
{t('login.google')}              </span>
            </button>

            {/* =========================
                SIGNUP LINK
            ========================== */}
            <p className="text-center text-sm text-gray-500 mt-7">

             {t('login.noAccount')}{' '}

              <Link
                to="/signup"
                className="text-forest-700 font-semibold hover:underline"
              >
{t('login.createAccount')}              </Link>

            </p>

          </div>

        </div>

      </main>

    </div>
  )
}