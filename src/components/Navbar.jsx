import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

import {
  Leaf,
  Menu,
  X,
  Home,
  Info,
  BriefcaseBusiness,
  Mail,
  LogIn,
  UserPlus,
} from 'lucide-react'

export default function Navbar() {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const isHomeActive = location.pathname === '/'

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ==================================================
            MAIN NAVBAR
        ================================================== */}
        <div className="h-16 sm:h-[72px] flex items-center justify-between">

          {/* ==================================================
              GREENGROW LOGO
          ================================================== */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 shrink-0"
            aria-label="GreenGrow Home"
          >
            {/* Logo Icon */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-forest-100 flex items-center justify-center shrink-0">
              <span className="text-2xl">🌿</span>
            </div>

            {/* Logo Text */}
            <div>
              <p className="font-bold text-base sm:text-lg leading-tight text-forest-900">
                GreenGrow
              </p>

              <p className="text-[10px] sm:text-[11px] text-gray-400 leading-tight mt-0.5">
                {t('common.tagline')}
              </p>
            </div>
          </Link>

          {/* ==================================================
              DESKTOP NAVIGATION
          ================================================== */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 ml-8">

            {/* HOME */}
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                isHomeActive
                  ? 'text-forest-700 bg-forest-50'
                  : 'text-gray-600 hover:text-forest-700 hover:bg-forest-50'
              }`}
            >
              <Home size={16} strokeWidth={2} />
<span>{t('nav.home')}</span>            </Link>

            {/* ABOUT */}
            <a
              href="/#about"
              className="flex items-center gap-1.5 px-2 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-forest-700 hover:bg-forest-50 transition-colors"
            >
              <Info size={16} strokeWidth={2} />
<span>{t('nav.about')}</span>            </a>

            {/* SERVICES */}
            <a
              href="/#services"
              className="flex items-center gap-1.5 px-2 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-forest-700 hover:bg-forest-50 transition-colors"
            >
              <BriefcaseBusiness
                size={16}
                strokeWidth={2}
              />
<span>{t('nav.services')}</span>            </a>

            {/* CONTACT */}
            <a
              href="/#contact"
              className="flex items-center gap-1.5 px-2 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-forest-700 hover:bg-forest-50 transition-colors"
            >
              <Mail size={16} strokeWidth={2} />
<span>{t('nav.contact')}</span>            </a>

          </div>

          {/* ==================================================
              DESKTOP RIGHT SIDE
          ================================================== */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 ml-auto">

            {/* LANGUAGE */}
            <LanguageSwitcher />

            {/* LOGIN */}
            <Link
              to="/login"
              className="flex items-center justify-center gap-1.5 px-3 lg:px-4 py-2 rounded-lg text-sm font-semibold text-forest-700 hover:bg-forest-50 transition-colors"
            >
              <LogIn size={16} strokeWidth={2} />
<span>{t('home.login')}</span>            </Link>

            {/* GET STARTED */}
            <Link
              to="/signup"
              className="flex items-center justify-center gap-1.5 px-4 lg:px-5 py-2.5 bg-forest-700 hover:bg-forest-800 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              <UserPlus size={16} strokeWidth={2} />
<span>{t('nav.getStarted')}</span>            </Link>

          </div>

          {/* ==================================================
              MOBILE MENU BUTTON
          ================================================== */}
          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? (
              <X size={23} strokeWidth={2} />
            ) : (
              <Menu size={23} strokeWidth={2} />
            )}
          </button>

        </div>

        {/* ==================================================
            MOBILE NAVIGATION
        ================================================== */}
        {menuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden border-t border-gray-100 py-3"
          >
            <div className="flex flex-col gap-1">

              {/* HOME */}
              <Link
                to="/"
                onClick={closeMenu}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isHomeActive
                    ? 'bg-forest-50 text-forest-700'
                    : 'text-gray-700 hover:bg-forest-50'
                }`}
              >
                <Home size={18} strokeWidth={2} />
                <span>{t('nav.home')}</span>
              </Link>

              {/* ABOUT */}
              <a
                href="/#about"
                onClick={closeMenu}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-forest-50 transition-colors"
              >
                <Info size={18} strokeWidth={2} />
                <span>{t('nav.about')}</span>
              </a>

              {/* SERVICES */}
              <a
                href="/#services"
                onClick={closeMenu}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-forest-50 transition-colors"
              >
                <BriefcaseBusiness
                  size={18}
                  strokeWidth={2}
                />
                <span>{t('nav.services')}</span>
              </a>

              {/* CONTACT */}
              <a
                href="/#contact"
                onClick={closeMenu}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-forest-50 transition-colors"
              >
                <Mail size={18} strokeWidth={2} />
                <span>{t('nav.contact')}</span>
              </a>

              {/* DIVIDER */}
              <div className="border-t border-gray-100 my-2" />

              {/* LANGUAGE */}
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>

              {/* LOGIN */}
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 mx-3 mt-1 py-3 rounded-lg border border-forest-200 text-forest-700 hover:bg-forest-50 font-semibold text-sm transition-colors"
              >
                <LogIn size={17} strokeWidth={2} />
                <span>{t('nav.login')}</span>
              </Link>

              {/* GET STARTED */}
              <Link
                to="/signup"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 mx-3 mt-2 py-3 rounded-lg bg-forest-700 hover:bg-forest-800 text-white font-semibold text-sm transition-colors"
              >
                <UserPlus size={17} strokeWidth={2} />
                <span>{t('nav.getStarted')}</span>
              </Link>

            </div>
          </div>
        )}

      </nav>
    </header>
  )
}