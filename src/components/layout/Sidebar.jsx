import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'

const NAV_ITEMS = [
  { to: '/dashboard', labelKey: 'nav.dashboard', icon: '🏠', end: true },
  { to: '/dashboard/topics', labelKey: 'nav.topics', icon: '📚' },
  { to: '/dashboard/advisor', labelKey: 'nav.advisor', icon: '🤖', badgeKey: 'nav.ruleBased' },
  { to: '/dashboard/leaderboard', labelKey: 'nav.leaderboard', icon: '🏆' },
  { to: '/dashboard/progress', labelKey: 'nav.progress', icon: '📊' },
  { to: '/dashboard/community', labelKey: 'nav.community', icon: '💬' },
]

export default function Sidebar() {
  const { logout } = useAuth()
  const { t } = useLanguage()

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 bg-forest-900 text-white min-h-screen sticky top-0">
      <div className="px-6 py-6 flex items-center gap-2">
        <span className="text-2xl">🌿</span>
        <div>
          <p className="font-bold leading-tight">GreenGrow</p>
          <p className="text-[11px] text-forest-200 leading-tight">{t('common.tagline')}</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-forest-700 text-white' : 'text-forest-100 hover:bg-forest-800'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="flex-1">{t(item.labelKey)}</span>
            {item.badgeKey && (
              <span className="text-[10px] bg-forest-600 text-forest-50 px-1.5 py-0.5 rounded">{t(item.badgeKey)}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-6 pt-2 border-t border-forest-800 space-y-1">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive ? 'bg-forest-700 text-white' : 'text-forest-100 hover:bg-forest-800'
            }`
          }
        >
          <span className="text-lg">👤</span>
          {t('nav.profile')}
        </NavLink>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-forest-100 hover:bg-forest-800"
        >
          <span className="text-lg">🚪</span>
          {t('nav.logout')}
        </button>
      </div>
    </aside>
  )
}
