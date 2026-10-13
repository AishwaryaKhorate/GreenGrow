import { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import LanguageSwitcher from '../LanguageSwitcher'
import { TOPICS, localize } from '../../data/topics'

export default function TopBar() {
  const { profile } = useAuth()
  const { t, language } = useLanguage()
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const boxRef = useRef(null)

  // Build one searchable list from all topics and lessons
  const searchItems = useMemo(() => {
    const list = []
    TOPICS.forEach((topic) => {
      const topicPath = `/dashboard/topics/${topic.id}`
      list.push({
        key: topic.id,
        icon: topic.icon,
        label: localize(topic.title, language),
        english: topic.title.en,
        hint: 'Topic',
        to: topicPath,
      })
      topic.lessons.forEach((lesson) => {
        list.push({
          key: `${topic.id}-${lesson.id}`,
          icon: topic.icon,
          label: localize(lesson.title, language),
          english: lesson.title.en,
          hint: localize(topic.title, language),
          to: topicPath,
        })
      })
    })
    return list
  }, [language])

  // Runs on every letter typed
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return searchItems
      .filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.english.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        // Items that START with the typed letters come first
        const aStarts = a.label.toLowerCase().startsWith(q) || a.english.toLowerCase().startsWith(q)
        const bStarts = b.label.toLowerCase().startsWith(q) || b.english.toLowerCase().startsWith(q)
        return Number(bStarts) - Number(aStarts)
      })
      .slice(0, 7)
  }, [query, searchItems])

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function choose(item) {
    setQuery('')
    setOpen(false)
    setActive(-1)
    navigate(item.to)
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      const item = suggestions[active] || suggestions[0]
      if (item) choose(item)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <header className="flex items-center gap-4 px-4 lg:px-8 py-4 bg-white border-b border-gray-200">
      <div ref={boxRef} className="flex-1 relative max-w-md hidden sm:block">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="search"
          value={query}
          autoComplete="off"
          placeholder={t('common.searchPlaceholder')}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setActive(-1)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white"
        />

        {open && query.trim() && (
          <ul className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-card overflow-hidden">
            {suggestions.length > 0 ? (
              suggestions.map((item, index) => (
                <li
                  key={item.key}
                  onMouseDown={() => choose(item)}
                  onMouseEnter={() => setActive(index)}
                  className={`flex items-center gap-3 px-3 py-2 cursor-pointer text-sm ${
                    index === active ? 'bg-forest-50' : ''
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  <span className="text-xs text-gray-400">{item.hint}</span>
                </li>
              ))
            ) : (
              <li className="px-3 py-3 text-sm text-gray-500">No results found</li>
            )}
          </ul>
        )}
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