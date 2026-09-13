import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'
import { fetchLeaderboard } from '../lib/firestore'
import Card from '../components/Card'

const MEDALS = ['🥇', '🥈', '🥉']

export default function Leaderboard() {
  const { profile } = useAuth()
  const { t } = useLanguage()
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchLeaderboard(20)
      .then(setRows)
      .catch((e) => setError(e.message))
  }, [])

  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold">{t('nav.leaderboard')}</h1>
        <p className="text-sm text-gray-500">{t('leaderboard.subtitle')}</p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Card className="p-0 overflow-hidden">
        {rows === null && <p className="p-5 text-sm text-gray-400">{t('common.loading')}</p>}
        {rows?.length === 0 && <p className="p-5 text-sm text-gray-400">{t('leaderboard.empty')}</p>}
        <ul className="divide-y divide-gray-100">
          {rows?.map((r) => {
            const isMe = r.id === profile?.uid
            return (
              <li key={r.id} className={`flex items-center gap-3 px-4 py-3 ${isMe ? 'bg-forest-50' : ''}`}>
                <span className="w-6 text-center text-sm font-semibold text-gray-500">{MEDALS[r.rank - 1] || r.rank}</span>
                <div className="w-8 h-8 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center text-xs font-semibold">
                  {(r.name || t('common.farmer')).slice(0, 1).toUpperCase()}
                </div>
                <span className={`flex-1 text-sm ${isMe ? 'font-semibold text-forest-800' : ''}`}>
                  {isMe ? `${r.name} ${t('leaderboard.you')}` : r.name}
                </span>
                <span className="text-sm font-semibold text-gray-700">{t('leaderboard.points', { points: r.points ?? 0 })}</span>
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}
