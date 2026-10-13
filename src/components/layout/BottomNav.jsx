import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'

const NAV_ITEMS = [
  { to: '/dashboard', labelKey: 'nav.home', icon: '🏠', end: true },
  { to: '/dashboard/topics', labelKey: 'nav.topics', icon: '📚' },
  { to: '/dashboard/advisor', labelKey: 'nav.advisorShort', icon: '🤖' },
  { to: '/dashboard/leaderboard', labelKey: 'nav.board', icon: '🏆' },
  { to: '/dashboard/profile', labelKey: 'nav.profile', icon: '👤' },
]

export default function BottomNav() {
  const { t } = useLanguage()

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-stretch pb-[env(safe-area-inset-bottom)] z-20"
      aria-label="Primary"
    >
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium ${
              isActive ? 'text-forest-700' : 'text-gray-400'
            }`
          }
        >
          <span className="text-lg leading-none">{item.icon}</span>
          {t(item.labelKey)}
        </NavLink>
      ))}
    </nav>
  )
}
