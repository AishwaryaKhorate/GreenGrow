import { Link, useParams } from 'react-router-dom'
import { TOPICS, getTopicById, localize } from '../data/topics'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'
import { computeTopicProgress, markLessonComplete } from '../lib/firestore'
import Card from '../components/Card'

export function TopicsList() {
  const { t, language } = useLanguage()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">{t('nav.topics')}</h1>
        <p className="text-sm text-gray-500">{t('topics.subtitle')}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOPICS.map((topic) => (
          <Link key={topic.id} to={`/dashboard/topics/${topic.id}`}>
            <Card className="h-full hover:border-forest-300 transition-colors">
              <span className="text-3xl">{topic.icon}</span>
              <p className="font-semibold mt-2">{localize(topic.title, language)}</p>
              <p className="text-xs text-gray-500 mt-1">{localize(topic.description, language)}</p>
              <p className="text-xs text-forest-700 font-semibold mt-3">
                {t('topics.lessonsCount', { count: topic.lessons.length })}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function TopicDetail() {
  const { topicId } = useParams()
  const { profile, refreshProfile } = useAuth()
  const { t, language } = useLanguage()
  const topic = getTopicById(topicId)

  if (!topic) return <p>{t('topics.notFound')}</p>

  const percent = computeTopicProgress(profile, topic)

  async function toggleLesson(lessonId) {
    await markLessonComplete({ uid: profile.uid, lessonId })
    await refreshProfile()
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <Link to="/dashboard/topics" className="text-sm text-forest-700">
        {t('topics.backToList')}
      </Link>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{topic.icon}</span>
        <div>
          <h1 className="text-xl font-bold">{localize(topic.title, language)}</h1>
          <p className="text-sm text-gray-500">{localize(topic.description, language)}</p>
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-sm">{t('topics.lessonsCount', { count: topic.lessons.length })}</p>
          <p className="text-xs text-gray-500">{t('topics.percentComplete', { percent })}</p>
        </div>
        <ul className="divide-y divide-gray-100">
          {topic.lessons.map((lesson) => {
            const done = !!profile?.lessonsCompleted?.[lesson.id]
            return (
              <li key={lesson.id} className="flex items-center justify-between py-2.5">
                <span className="text-sm">{localize(lesson.title, language)}</span>
                <button
                  onClick={() => toggleLesson(lesson.id)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    done ? 'bg-forest-100 text-forest-700' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {done ? t('topics.completed') : t('topics.markDone')}
                </button>
              </li>
            )
          })}
        </ul>
      </Card>

      <Link
        to={`/dashboard/topics/${topic.id}/quiz`}
        className="block text-center bg-forest-700 hover:bg-forest-800 text-white font-semibold py-3 rounded-lg"
      >
        {t('topics.takeQuiz')}
      </Link>
    </div>
  )
}
