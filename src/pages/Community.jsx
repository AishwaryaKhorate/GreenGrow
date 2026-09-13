import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'
import { createCommunityPost, fetchCommunityPosts, likePost } from '../lib/firestore'
import Card from '../components/Card'

const DATE_LOCALES = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN' }

export default function Community() {
  const { profile } = useAuth()
  const { t, language } = useLanguage()
  const [posts, setPosts] = useState(null)
  const [draft, setDraft] = useState('')
  const [posting, setPosting] = useState(false)

  async function load() {
    setPosts(await fetchCommunityPosts(30))
  }

  useEffect(() => {
    load()
  }, [])

  async function handlePost() {
    if (!draft.trim()) return
    setPosting(true)
    await createCommunityPost({ uid: profile.uid, authorName: profile.name, body: draft.trim() })
    setDraft('')
    await load()
    setPosting(false)
  }

  async function handleLike(postId) {
    await likePost(postId, profile.uid)
    await load()
  }

  function formatWhen(ts) {
    if (!ts?.toDate) return t('community.justNow')
    const date = ts.toDate()
    const diffMin = Math.round((Date.now() - date.getTime()) / 60000)
    if (diffMin < 1) return t('community.justNow')
    if (diffMin < 60) return t('community.minutesAgo', { minutes: diffMin })
    const diffHr = Math.round(diffMin / 60)
    if (diffHr < 24) return t('community.hoursAgo', { hours: diffHr })
    return date.toLocaleDateString(DATE_LOCALES[language] || 'en-IN')
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold">{t('nav.community')}</h1>
        <p className="text-sm text-gray-500">{t('community.subtitle')}</p>
      </div>

      <Card className="flex gap-2 items-start">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={t('community.placeholder')}
          rows={2}
          className="flex-1 text-sm border-none focus:outline-none resize-none"
        />
        <button
          onClick={handlePost}
          disabled={posting || !draft.trim()}
          className="bg-forest-700 hover:bg-forest-800 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg shrink-0"
        >
          {t('community.post')}
        </button>
      </Card>

      {posts === null && <p className="text-sm text-gray-400">{t('common.loading')}</p>}
      {posts?.length === 0 && <p className="text-sm text-gray-400">{t('community.empty')}</p>}

      <ul className="space-y-3">
        {posts?.map((p) => {
          const liked = p.likeUids?.includes(profile?.uid)
          return (
            <li key={p.id}>
              <Card>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center text-xs font-semibold">
                    {(p.authorName || t('common.farmer')).slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{p.authorName}</p>
                    <p className="text-[11px] text-gray-400">{formatWhen(p.createdAt)}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{p.body}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <button onClick={() => handleLike(p.id)} className={liked ? 'text-forest-700 font-semibold' : ''}>
                    👍 {p.likeUids?.length ?? 0}
                  </button>
                  <span>💬 {p.replyCount ?? 0}</span>
                </div>
              </Card>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
