import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import LanguageSwitcher from '../LanguageSwitcher'

export default function TopBar() {
  const { profile } = useAuth()
  const { t } = useLanguage()

  return (
    <header className="flex items-center gap-4 px-4 lg:px-8 py-4 bg-white border-b border-gray-200">
      <div className="flex-1 relative max-w-md hidden sm:block">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="search"
          placeholder={t('common.searchPlaceholder')}
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white"
        />
      </div>
      <div className="flex-1 sm:hidden font-bold text-forest-800">🌿 GreenGrow</div>

      <LanguageSwitcher className="hidden sm:block" />

      <button aria-label="Notifications" className="text-xl text-gray-500 hover:text-gray-700">
        🔔
      </button>

      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center font-semibold">
          {(profile?.name || t('common.farmer')).slice(0, 1).toUpperCase()}
        </div>
        <div className="hidden sm:block leading-tight">
          <p className="text-sm font-semibold">{profile?.name || t('common.farmer')}</p>
          <p className="text-xs text-gray-500">{t('common.level')} {profile?.level ?? 1}</p>
        </div>
      </div>
    </header>
  )
}
