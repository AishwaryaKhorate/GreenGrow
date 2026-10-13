import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'
import { TOPICS, localize } from '../data/topics'
import { computeOverallProgress, computeTopicProgress } from '../lib/firestore'
import Card from '../components/Card'

export default function Progress() {
  const { profile } = useAuth()
  const { t, language } = useLanguage()
  const overall = computeOverallProgress(profile)

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold">{t('nav.progress')}</h1>
        <p className="text-sm text-gray-500">{t('progress.subtitle')}</p>
      </div>

      <Card>
        <p className="font-semibold text-sm mb-3">{t('progress.overall')}</p>
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
          <div className="h-full bg-forest-600 rounded-full" style={{ width: `${overall.percent}%` }} />
        </div>
        <div className="grid grid-cols-3 text-center text-xs text-gray-500 gap-2">
          <div>
            <p className="font-bold text-gray-800 text-sm">
              {overall.completedTopics}/{overall.totalTopics}
            </p>
            {t('nav.topics')}
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">{profile?.quizzesCompleted ?? 0}</p>
            {t('progress.quizzes')}
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">{profile?.points ?? 0}</p>
            {t('progress.points')}
          </div>
        </div>
      </Card>

      <Card>
        <p className="font-semibold text-sm mb-3">{t('progress.topicProgress')}</p>
        <ul className="space-y-3">
          {TOPICS.map((topic) => {
            const percent = computeTopicProgress(profile, topic)
            return (
              <li key={topic.id}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">
                    {topic.icon} {localize(topic.title, language)}
                  </span>
                  <span className="text-gray-500">{percent}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-forest-500 rounded-full" style={{ width: `${percent}%` }} />
                </div>
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}
