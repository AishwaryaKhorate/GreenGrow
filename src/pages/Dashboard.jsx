import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'
import { TOPICS, localize } from '../data/topics'
import { computeOverallProgress } from '../lib/firestore'
import Card from '../components/Card'

export default function Dashboard() {
  const { profile } = useAuth()
  const { t, language } = useLanguage()
  const progress = computeOverallProgress(profile)

  const stats = [
    { labelKey: 'dashboard.yourPoints', value: profile?.points ?? 0, icon: '⭐' },
    { labelKey: 'dashboard.yourLevel', value: profile?.level ?? 1, icon: '🍃' },
    { labelKey: 'dashboard.quizzesCompleted', value: profile?.quizzesCompleted ?? 0, icon: '✅' },
    {
      labelKey: 'dashboard.farmSize',
      value: profile?.farmSizeAcres ? `${profile.farmSizeAcres} ${t('dashboard.acres')}` : '—',
      icon: '📍',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {t('dashboard.hello')}, {profile?.name || t('common.farmer')}! 👋
        </h1>
        <p className="text-gray-500 text-sm">{t('dashboard.subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <Card key={s.labelKey} className="flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <p className="text-lg font-bold leading-tight">{s.value}</p>
              <p className="text-xs text-gray-500 leading-tight">{t(s.labelKey)}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1 flex flex-col items-start gap-2">
          <span className="text-2xl">🤖</span>
          <p className="font-semibold text-sm">
            {t('nav.advisor')}{' '}
            <span className="text-[10px] bg-forest-100 text-forest-700 px-1.5 py-0.5 rounded ml-1">
              {t('nav.ruleBased')}
            </span>
          </p>
          <p className="text-xs text-gray-500 flex-1">{t('dashboard.advisorDesc')}</p>
          <Link
            to="/dashboard/advisor"
            className="w-full text-center bg-forest-700 hover:bg-forest-800 text-white text-sm font-semibold py-2 rounded-lg"
          >
            {t('dashboard.askAdvisor')}
          </Link>
        </Card>

        <Card className="lg:col-span-1 flex flex-col gap-2">
          <p className="font-semibold text-sm">{t('dashboard.todaysChallenge')}</p>
          <p className="text-xs text-gray-500">{t('dashboard.challengeDesc')}</p>
          <span className="text-xs font-semibold text-wheat-600">{t('dashboard.points100')}</span>
          <Link
            to="/dashboard/topics/soil-health"
            className="mt-auto text-center bg-forest-100 hover:bg-forest-200 text-forest-800 text-sm font-semibold py-2 rounded-lg"
          >
            {t('dashboard.start')}
          </Link>
        </Card>

        <Card className="lg:col-span-1 flex items-center gap-4">
          <ProgressRing percent={progress.percent} />
          <div className="text-xs text-gray-500 space-y-1">
            <p className="font-semibold text-sm text-gray-800">{t('dashboard.yourProgress')}</p>
            <p>
              {t('dashboard.topicsDone')}{' '}
              <span className="font-semibold text-gray-700">
                {progress.completedTopics}/{progress.totalTopics}
              </span>
            </p>
            <p>
              {t('dashboard.daysActive')}{' '}
              <span className="font-semibold text-gray-700">{profile?.daysActive ?? 0}</span>
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-sm">{t('dashboard.exploreTopics')}</p>
          <Link to="/dashboard/topics" className="text-xs text-forest-700 font-semibold">
            {t('dashboard.viewAll')}
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {TOPICS.map((topic) => (
            <Link
              key={topic.id}
              to={`/dashboard/topics/${topic.id}`}
              className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-50 text-center"
            >
              <span className="text-2xl">{topic.icon}</span>
              <span className="text-[11px] font-medium text-gray-600">{localize(topic.title, language)}</span>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}

function ProgressRing({ percent }) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <svg width="72" height="72" viewBox="0 0 72 72" className="shrink-0">
      <circle cx="36" cy="36" r={radius} fill="none" stroke="#eef2f0" strokeWidth="8" />
      <circle
        className="progress-ring"
        cx="36"
        cy="36"
        r={radius}
        fill="none"
        stroke="#16855a"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 36 36)"
      />
      <text x="36" y="41" textAnchor="middle" fontSize="16" fontWeight="700" fill="#146a49">
        {percent}%
      </text>
    </svg>
  )
}
