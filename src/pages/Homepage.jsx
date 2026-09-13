import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'

const FEATURES = [
  { icon: '📚', titleKey: 'home.featureTopicsTitle', descKey: 'home.featureTopicsDesc' },
  { icon: '✅', titleKey: 'home.featureQuizTitle', descKey: 'home.featureQuizDesc' },
  { icon: '🤖', titleKey: 'home.featureAdvisorTitle', descKey: 'home.featureAdvisorDesc' },
  { icon: '🏆', titleKey: 'home.featureLeaderboardTitle', descKey: 'home.featureLeaderboardDesc' },
  { icon: '💬', titleKey: 'home.featureCommunityTitle', descKey: 'home.featureCommunityDesc' },
]

export default function Homepage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-4 sm:px-8 py-5 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="font-bold text-forest-900">GreenGrow</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link to="/login" className="text-sm font-semibold text-forest-700 hidden sm:block">
            {t('home.login')}
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-8">
        <section className="text-center py-12 sm:py-20">
          <span className="inline-block text-xs font-semibold bg-forest-100 text-forest-700 px-3 py-1 rounded-full mb-4">
            {t('home.freeBadge')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 max-w-2xl mx-auto leading-tight">
            {t('home.heroTitle')}
          </h1>
          <p className="text-gray-500 mt-4 max-w-md mx-auto text-sm sm:text-base">{t('home.heroSubtitle')}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-8">
            <Link
              to="/signup"
              className="w-full sm:w-auto text-center bg-forest-700 hover:bg-forest-800 text-white font-semibold px-6 py-3 rounded-lg text-sm"
            >
              {t('home.getStarted')}
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto text-center border border-gray-200 hover:bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-lg text-sm"
            >
              {t('home.login')}
            </Link>
          </div>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
          {FEATURES.map((f) => (
            <div key={f.titleKey} className="bg-white rounded-xl2 border border-gray-100 shadow-card p-5">
              <span className="text-2xl">{f.icon}</span>
              <p className="font-semibold text-sm mt-3">{t(f.titleKey)}</p>
              <p className="text-xs text-gray-500 mt-1">{t(f.descKey)}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="text-center text-xs text-gray-400 pb-8">🌿 GreenGrow — {t('common.tagline')}</footer>
    </div>
  )
}
