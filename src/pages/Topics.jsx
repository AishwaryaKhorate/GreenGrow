import { Link, useParams } from 'react-router-dom'
import { TOPICS, getTopicById, localize } from '../data/topics'
import { TOPIC_LEARNING } from '../data/topicLearning'
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
  const learning = TOPIC_LEARNING[topicId]

  if (!topic) return <p>{t('topics.notFound')}</p>

  const percent = computeTopicProgress(profile, topic)

  async function toggleLesson(lessonId) {
    await markLessonComplete({ uid: profile.uid, lessonId })
    await refreshProfile()
  }

  return (
    <div className="space-y-6 max-w-3xl">
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

      {/* New: localized topic reading material appears before the quiz button. */}
      {learning && (
        <Card>
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-forest-700">
                📖 {t('topics.learningLabel')}
              </p>
              <h2 className="text-xl font-bold mt-2">{t('topics.readTitle')}</h2>
              <p className="text-sm text-gray-600 mt-2 leading-7">
                {localize(learning.introduction, language)}
              </p>
            </div>

            {learning.sections.map((section, index) => (
              <section key={`${topicId}-${index}`} className="border-t border-gray-100 pt-4">
                <h3 className="font-semibold text-base text-gray-900">
                  {localize(section.title, language)}
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-7">
                  {localize(section.content, language)}
                </p>
              </section>
            ))}

            <div className="rounded-lg bg-forest-50 border border-forest-100 p-4">
              <h3 className="font-semibold text-forest-800">{t('topics.keyTakeaway')}</h3>
              <p className="text-sm text-forest-800 mt-2 leading-6">
                {localize(learning.takeaway, language)}
              </p>
            </div>

            <Link
              to={`/dashboard/topics/${topic.id}/quiz`}
              className="block w-full text-center bg-forest-700 hover:bg-forest-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {t('topics.readThenQuiz')} →
            </Link>
            <p className="text-xs text-center text-gray-500">{t('topics.readHint')}</p>
          </div>
        </Card>
      )}

      {/* Existing lesson completion and progress feature — preserved. */}
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

      {/* Existing quiz link is retained as a fallback. */}
      <Link
        to={`/dashboard/topics/${topic.id}/quiz`}
        className="block text-center border border-forest-700 text-forest-700 hover:bg-forest-50 font-semibold py-3 rounded-lg"
      >
        {t('topics.takeQuiz')}
      </Link>
    </div>
  )
}
