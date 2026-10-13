import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getTopicById, localize } from '../data/topics'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'
import { submitQuizResult } from '../lib/firestore'
import Card from '../components/Card'

export default function Quiz() {
  const { topicId } = useParams()
  const { profile, refreshProfile } = useAuth()
  const { t, language } = useLanguage()
  const navigate = useNavigate()
  const topic = getTopicById(topicId)

  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const [saving, setSaving] = useState(false)

  if (!topic) return <p>{t('topics.notFound')}</p>

  const question = topic.quiz[step]
  const isLast = step === topic.quiz.length - 1
  const alreadyCompleted = !!profile?.topicsCompleted?.[topic.id]

  function choose(index) {
    setSelected(index)
  }

  async function next() {
    const isCorrect = selected === question.correctIndex
    const newCorrect = correctCount + (isCorrect ? 1 : 0)
    setCorrectCount(newCorrect)

    if (isLast) {
      setSaving(true)
      const points = await submitQuizResult({
        uid: profile.uid,
        topicId: topic.id,
        correctCount: newCorrect,
        totalQuestions: topic.quiz.length,
        alreadyCompleted,
      })
      await refreshProfile()
      setEarnedPoints(points)
      setSaving(false)
      setFinished(true)
    } else {
      setStep(step + 1)
      setSelected(null)
    }
  }

  if (finished) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <div className="text-5xl">🎉</div>
        <h1 className="text-xl font-bold">{t('quiz.complete')}</h1>
        <p className="text-gray-500 text-sm">
          {t('quiz.scoreResult', { count: correctCount, total: topic.quiz.length })}
        </p>
        <p className="text-forest-700 font-semibold">{t('quiz.pointsEarned', { points: earnedPoints })}</p>
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={() => navigate(`/dashboard/topics/${topic.id}`)}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold"
          >
            {t('quiz.backToTopic')}
          </button>
          <Link to="/dashboard/leaderboard" className="px-4 py-2 rounded-lg bg-forest-700 text-white text-sm font-semibold">
            {t('quiz.seeLeaderboard')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Link to={`/dashboard/topics/${topic.id}`} className="text-sm text-forest-700">
        {t('quiz.backToTopicLink')}
      </Link>
      <p className="text-xs text-gray-400">{t('quiz.progress', { current: step + 1, total: topic.quiz.length })}</p>

      <Card>
        <p className="font-semibold mb-4">{localize(question.question, language)}</p>
        <div className="space-y-2">
          {localize(question.options, language).map((opt, i) => (
            <button
              key={opt}
              onClick={() => choose(i)}
              className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                selected === i
                  ? 'border-forest-600 bg-forest-50 text-forest-800 font-semibold'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </Card>

      <button
        onClick={next}
        disabled={selected === null || saving}
        className="w-full bg-forest-700 hover:bg-forest-800 disabled:opacity-50 text-white font-semibold py-3 rounded-lg"
      >
        {saving ? t('common.saving') : isLast ? t('quiz.finish') : t('quiz.next')}
      </button>
    </div>
  )
}
