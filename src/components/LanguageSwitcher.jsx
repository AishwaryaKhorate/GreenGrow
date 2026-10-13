import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageSwitcher({ className = '' }) {
  const { language, setLanguage, languages, t } = useLanguage()

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      aria-label={t('common.language')}
      className={`text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 focus:border-forest-500 ${className}`}
    >
      {languages.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  )
}
