
import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import LanguageSwitcher from '../LanguageSwitcher'

const NAV_ITEMS = [
  { to: '/dashboard', labelKey: 'nav.dashboard', icon: '🏠', end: true },
  { to: '/dashboard/topics', labelKey: 'nav.topics', icon: '📚' },
  {
    to: '/dashboard/advisor',
    labelKey: 'nav.advisor',
    icon: '🤖',
    badgeKey: 'nav.ruleBased',
  },
  { to: '/dashboard/leaderboard', labelKey: 'nav.leaderboard', icon: '🏆' },
  { to: '/dashboard/progress', labelKey: 'nav.progress', icon: '📊' },
  { to: '/dashboard/community', labelKey: 'nav.community', icon: '💬' },
]

const LABELS = {
  en: {
    profile: 'Profile',
    feedback: 'Feedback',
    open: 'Open menu',
    close: 'Close menu',
  },
  hi: {
    profile: 'प्रोफ़ाइल',
    feedback: 'प्रतिक्रिया',
    open: 'मेनू खोलें',
    close: 'मेनू बंद करें',
  },
  mr: {
    profile: 'प्रोफाइल',
    feedback: 'अभिप्राय',
    open: 'मेनू उघडा',
    close: 'मेनू बंद करा',
  },
}

export default function Sidebar() {
  const { logout } = useAuth()
  const { t, language } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const labels = LABELS[language] || LABELS.en

  const closeMenu = () => setMobileOpen(false)

  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  const linkClass = ({ isActive }) =>
    `gg-link${isActive ? ' gg-active' : ''}`

  return (
    <>
      <style>{`
        .gg-mobile-header,
        .gg-sidebar,
        .gg-overlay,
        .gg-sidebar * {
          box-sizing: border-box;
        }

        .gg-mobile-header {
          display: none;
        }

        .gg-sidebar {
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          width: 256px;
          height: 100vh;
          height: 100dvh;
          overflow-x: hidden;
          overflow-y: auto;
          background: #123b2a;
          color: #f0fdf4;
          z-index: 1000;
          overscroll-behavior: contain;
        }

        .gg-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 22px 18px;
          border-bottom: 1px solid rgba(255,255,255,.12);
        }

        .gg-brand-icon {
          flex-shrink: 0;
          font-size: 27px;
        }

        .gg-brand-name {
          margin: 0;
          font-size: 19px;
          font-weight: 750;
        }

        .gg-tagline {
          margin: 4px 0 0;
          color: #c2e0cc;
          font-size: 11px;
          line-height: 1.4;
        }

        .gg-nav {
          flex: 1;
          padding: 14px 12px;
        }

        .gg-link {
          display: flex;
          align-items: center;
          gap: 11px;
          width: 100%;
          min-height: 46px;
          margin: 0 0 5px;
          padding: 11px 12px;
          border: 0;
          border-radius: 9px;
          background: transparent;
          color: #f0fdf4;
          font: inherit;
          font-size: 14px;
          line-height: 1.4;
          text-align: left;
          text-decoration: none;
          cursor: pointer;
          transition: background .18s ease;
        }

        .gg-link:hover {
          background: #20543b;
        }

        .gg-link.gg-active {
          background: #2f704b;
          color: #fff;
          font-weight: 650;
        }

        .gg-link:focus-visible,
        .gg-menu-button:focus-visible,
        .gg-close-button:focus-visible {
          outline: 2px solid #bbf7d0;
          outline-offset: 2px;
        }

        .gg-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 24px;
          font-size: 19px;
        }

        .gg-label {
          flex: 1;
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .gg-badge {
          flex-shrink: 0;
          padding: 3px 6px;
          border-radius: 5px;
          background: rgba(255,255,255,.12);
          color: #f0fdf4;
          font-size: 10px;
        }

        .gg-bottom {
          flex-shrink: 0;
          padding: 12px 12px max(16px, env(safe-area-inset-bottom));
          border-top: 1px solid rgba(255,255,255,.12);
        }

        .gg-overlay,
        .gg-close-button {
          display: none;
        }

        .gg-mobile-language {
          display: none;
        }

        @media (max-width: 1023px) {
          .gg-mobile-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1100;
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            min-height: 60px;
            padding: 8px 12px;
            padding-top: max(8px, env(safe-area-inset-top));
            background: #123b2a;
            color: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,.15);
          }

          .gg-menu-button {
            display: inline-flex;
            flex: 0 0 42px;
            align-items: center;
            justify-content: center;
            width: 42px;
            height: 42px;
            padding: 0;
            border: 1px solid rgba(255,255,255,.22);
            border-radius: 9px;
            background: transparent;
            color: white;
            font-size: 25px;
            cursor: pointer;
          }

          .gg-mobile-brand {
            display: flex;
            align-items: center;
            gap: 7px;
            flex: 1;
            min-width: 0;
            font-size: 17px;
            font-weight: 750;
            white-space: nowrap;
          }

          .gg-mobile-brand .gg-brand-icon {
            font-size: 23px;
          }

          .gg-mobile-language {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: flex-end;
            max-width: 45%;
          }

          .gg-mobile-language > * {
            max-width: 100%;
          }

          .gg-mobile-language select {
            max-width: 100%;
            min-width: 0;
            padding: 8px 6px;
            border: 1px solid rgba(255,255,255,.3);
            border-radius: 8px;
            background: #fff;
            color: #123b2a;
            font-size: 13px;
          }

          .gg-sidebar {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            width: min(310px, 88vw);
            height: 100vh;
            height: 100dvh;
            min-height: 0;
            padding-top: env(safe-area-inset-top);
            padding-bottom: env(safe-area-inset-bottom);
            transform: translateX(-102%);
            visibility: hidden;
            pointer-events: none;
            transition:
              transform .24s ease,
              visibility .24s ease;
            z-index: 1200;
            box-shadow: 8px 0 28px rgba(0,0,0,.2);
          }

          .gg-sidebar.gg-open {
            transform: translateX(0);
            visibility: visible;
            pointer-events: auto;
          }

          .gg-brand {
            flex-shrink: 0;
            padding: 18px 14px;
          }

          .gg-close-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 38px;
            width: 38px;
            height: 38px;
            margin-left: auto;
            border: 0;
            border-radius: 8px;
            background: transparent;
            color: white;
            font-size: 21px;
            cursor: pointer;
          }

          .gg-close-button:hover {
            background: #20543b;
          }

          .gg-nav {
            flex: 1 0 auto;
            padding: 12px;
          }

          .gg-link {
            min-height: 48px;
            padding: 12px;
            font-size: 15px;
          }

          .gg-bottom {
            flex-shrink: 0;
            padding: 12px 12px max(18px, env(safe-area-inset-bottom));
          }

          .gg-overlay {
            position: fixed;
            inset: 0;
            z-index: 1150;
            display: block;
            width: 100%;
            height: 100%;
            padding: 0;
            border: 0;
            background: rgba(0,0,0,.52);
            cursor: pointer;
          }
        }

        @media (max-width: 360px) {
          .gg-mobile-header {
            gap: 7px;
            padding-right: 8px;
            padding-left: 8px;
          }

          .gg-mobile-brand {
            gap: 4px;
            font-size: 15px;
          }

          .gg-mobile-brand .gg-brand-icon {
            font-size: 20px;
          }

          .gg-mobile-language select {
            padding: 7px 4px;
            font-size: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gg-sidebar,
          .gg-link {
            transition: none;
          }
        }
      `}</style>

      {/* Mobile navbar */}
      <header className="gg-mobile-header">
        <button
          type="button"
          className="gg-menu-button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? labels.close : labels.open}
          aria-expanded={mobileOpen}
          aria-controls="gg-sidebar"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        <div className="gg-mobile-brand">
          <span className="gg-brand-icon">🌿</span>
          <span>GreenGrow</span>
        </div>

        <div className="gg-mobile-language">
          <LanguageSwitcher />
        </div>
      </header>

      {mobileOpen && (
        <button
          type="button"
          className="gg-overlay"
          aria-label={labels.close}
          onClick={closeMenu}
        />
      )}

      <aside
        id="gg-sidebar"
        className={`gg-sidebar${mobileOpen ? ' gg-open' : ''}`}
        aria-label="Sidebar navigation"
      >
        <div className="gg-brand">
          <span className="gg-brand-icon">🌿</span>
          <div>
            <p className="gg-brand-name">GreenGrow</p>
            <p className="gg-tagline">{t('common.tagline')}</p>
          </div>

          <button
            type="button"
            className="gg-close-button"
            onClick={closeMenu}
            aria-label={labels.close}
          >
            ✕
          </button>
        </div>

        <nav className="gg-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={linkClass}
              onClick={closeMenu}
            >
              <span className="gg-icon" aria-hidden="true">{item.icon}</span>
              <span className="gg-label">{t(item.labelKey)}</span>

              {item.badgeKey && (
                <span className="gg-badge">{t(item.badgeKey)}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="gg-bottom">
          <NavLink
            to="/dashboard/profile"
            className={linkClass}
            onClick={closeMenu}
          >
            <span className="gg-icon" aria-hidden="true">👤</span>
            <span className="gg-label">{t('nav.profile') || labels.profile}</span>
          </NavLink>

          <NavLink
            to="/dashboard/feedback"
            className={linkClass}
            onClick={closeMenu}
          >
            <span className="gg-icon" aria-hidden="true">⭐</span>
            <span className="gg-label">{t('nav.feedback') || labels.feedback}</span>
          </NavLink>

          <button
            type="button"
            className="gg-link"
            onClick={() => {
              closeMenu()
              logout()
            }}
          >
            <span className="gg-icon" aria-hidden="true">🚪</span>
            <span className="gg-label">{t('nav.logout')}</span>
          </button>
        </div>
      </aside>
    </>
  )
}
