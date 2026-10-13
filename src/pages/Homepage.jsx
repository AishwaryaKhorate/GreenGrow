import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useLanguage } from '../i18n/LanguageContext'

const FEATURES = [
  {
    icon: '📚',
    titleKey: 'home.featureTopicsTitle',
    descriptionKey: 'home.featureTopicsDesc',
  },
  {
    icon: '✅',
    titleKey: 'home.featureQuizTitle',
    descriptionKey: 'home.featureQuizDesc',
  },
  {
    icon: '🤖',
    titleKey: 'home.featureAdvisorTitle',
    descriptionKey: 'home.featureAdvisorDesc',
  },
  {
    icon: '🏆',
    titleKey: 'home.featureLeaderboardTitle',
    descriptionKey: 'home.featureLeaderboardDesc',
  },
  {
    icon: '💬',
    titleKey: 'home.featureCommunityTitle',
    descriptionKey: 'home.featureCommunityDesc',
  },
  {
    icon: '📈',
    titleKey: 'home.trackProgressTitle',
    descriptionKey: 'home.trackProgressDesc',
  },
]

export default function Homepage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-50 via-white to-green-50 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[650px] py-16 lg:py-20">

            {/* Hero Content */}
            <div>

              <span className="inline-flex items-center gap-2 bg-forest-100 text-forest-700 px-4 py-2 rounded-full text-xs font-semibold mb-6">
                🌱 {t('home.smartBadge')}
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
  <span className="block leading-[1.4]">
    {t('home.heroHeading1')}
  </span>

  <span className="block leading-[1.4] mt-2 text-forest-700">
    {t('home.heroHeading2')}
  </span>
</h1>

              <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl mt-6">
                {t('home.heroDescription')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">

                <Link
                  to="/signup"
                  className="text-center bg-forest-700 hover:bg-forest-800 text-white font-semibold px-7 py-3.5 rounded-xl shadow-sm transition-all"
                >
                  {t('home.startLearning')}
                </Link>

                <a
                  href="#services"
                  className="text-center border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-7 py-3.5 rounded-xl transition-all"
                >
                  {t('home.exploreServices')}
                </a>

              </div>

              <div className="flex items-center gap-8 mt-10">

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    6+
                  </p>
                  <p className="text-xs text-gray-500">
                    {t('home.learningFeatures')}
                  </p>
                </div>

                <div className="w-px h-10 bg-gray-200" />

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    AI
                  </p>
                  <p className="text-xs text-gray-500">
                    {t('home.smartAdvisor')}
                  </p>
                </div>

                <div className="w-px h-10 bg-gray-200" />

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    100%
                  </p>
                  <p className="text-xs text-gray-500">
                    {t('home.learningFocused')}
                  </p>
                </div>

              </div>

            </div>

            {/* Hero Visual */}
            <div className="hidden lg:flex justify-center">

              <div className="relative w-[440px] h-[440px]">

                <div className="absolute inset-0 bg-forest-100 rounded-[40px] rotate-6" />

                <div className="absolute inset-0 bg-white border border-gray-100 rounded-[40px] shadow-xl flex flex-col items-center justify-center">

                  <div className="text-8xl mb-5">
                    🌱
                  </div>

                  <h2 className="text-2xl font-bold text-forest-900">
                    GreenGrow
                  </h2>

                  <p className="text-gray-500 text-sm mt-2">
                    {t('common.tagline')}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mt-8">

                    <div className="bg-forest-50 rounded-xl p-4 text-center">
                      <div className="text-xl">📚</div>
                      <p className="text-[10px] mt-1 text-gray-500">
                        {t('home.learn')}
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <div className="text-xl">🤖</div>
                      <p className="text-[10px] mt-1 text-gray-500">
                        {t('home.ai')}
                      </p>
                    </div>

                    <div className="bg-yellow-50 rounded-xl p-4 text-center">
                      <div className="text-xl">🏆</div>
                      <p className="text-[10px] mt-1 text-gray-500">
                        {t('home.achieve')}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-2xl mx-auto text-center">

            <span className="text-xs font-semibold text-forest-700 uppercase tracking-wider">
              {t('home.aboutLabel')}
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              {t('home.aboutTitle')}
            </h2>

            <p className="text-gray-500 mt-4 leading-relaxed">
              {t('home.aboutDescription')}
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">

            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="text-3xl">🌱</div>

              <h3 className="font-semibold mt-4">
                {t('home.sustainable')}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {t('home.sustainableDesc')}
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="text-3xl">🎓</div>

              <h3 className="font-semibold mt-4">
                {t('home.educational')}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {t('home.educationalDesc')}
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="text-3xl">🤖</div>

              <h3 className="font-semibold mt-4">
                {t('home.intelligent')}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {t('home.intelligentDesc')}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section
        id="services"
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto">

            <span className="text-xs font-semibold text-forest-700 uppercase tracking-wider">
              {t('home.servicesLabel')}
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              {t('home.servicesTitle')}
            </h2>

            <p className="text-gray-500 mt-4">
              {t('home.servicesDescription')}
            </p>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">

            {FEATURES.map((feature) => (
              <div
                key={feature.titleKey}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all"
              >

                <div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center text-2xl">
                  {feature.icon}
                </div>

                <h3 className="font-semibold text-lg mt-5">
                  {t(feature.titleKey)}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed mt-2">
                  {t(feature.descriptionKey)}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-forest-800">

        <div className="max-w-4xl mx-auto text-center px-4">

          <div className="text-5xl">
            🌾
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-5">
            {t('home.ctaTitle')}
          </h2>

          <p className="text-forest-100 mt-4 max-w-xl mx-auto">
            {t('home.ctaDescription')}
          </p>

          <Link
            to="/signup"
            className="inline-block mt-8 bg-white text-forest-800 font-semibold px-7 py-3.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {t('home.createAccount')}
          </Link>

        </div>

      </section>

      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className="py-20 bg-white"
      >

        <div className="max-w-4xl mx-auto px-4 text-center">

          <span className="text-xs font-semibold text-forest-700 uppercase tracking-wider">
            {t('home.contactLabel')}
          </span>

          <h2 className="text-3xl font-bold mt-3">
            {t('home.contactTitle')}
          </h2>

          <p className="text-gray-500 mt-4">
            {t('home.contactDescription')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

            <div className="border border-gray-100 rounded-xl px-6 py-4">
              📧 support@greengrow.com
            </div>

            <div className="border border-gray-100 rounded-xl px-6 py-4">
              🌱 {t('home.support')}
            </div>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-400">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          <div className="flex flex-col md:flex-row justify-between gap-8">

            <div>

              <div className="flex items-center gap-2">

                <span className="text-2xl">
                  🌿
                </span>

                <span className="text-white font-bold text-lg">
                  GreenGrow
                </span>

              </div>

              <p className="text-sm mt-3 max-w-sm">
                {t('home.footerDescription')}
              </p>

            </div>

            <div className="flex gap-8 text-sm">

              <a
                href="#about"
                className="hover:text-white"
              >
                {t('nav.about')}
              </a>

              <a
                href="#services"
                className="hover:text-white"
              >
                {t('nav.services')}
              </a>

              <a
                href="#contact"
                className="hover:text-white"
              >
                {t('nav.contact')}
              </a>

            </div>

          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-xs">
            © {new Date().getFullYear()} GreenGrow. {t('home.footerRights')}
          </div>

        </div>

      </footer>

    </div>
  )
}