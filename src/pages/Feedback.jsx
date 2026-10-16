
import { useCallback, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useLanguage } from '../i18n/LanguageContext'
import './Feedback.css'

const MAX_COMMENT_LENGTH = 1000

export default function Feedback() {
  const { language, t } = useLanguage()

  const [user, setUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loadingFeedback, setLoadingFeedback] = useState(false)
  const [feedbackList, setFeedbackList] = useState([])
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [loadMessage, setLoadMessage] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser)
        setAuthChecked(true)
      },
      (error) => {
        console.error('Authentication error:', error)
        setAuthChecked(true)
        setUser(null)
      }
    )

    return unsubscribe
  }, [])

  const loadMyFeedback = useCallback(async () => {
    if (!auth.currentUser) {
      setFeedbackList([])
      setLoadingFeedback(false)
      return
    }

    setLoadingFeedback(true)
    setLoadMessage('')

    try {
      const feedbackQuery = query(
        collection(db, 'feedback'),
        limit(100)
      )

      const snapshot = await getDocs(feedbackQuery)

      const items = snapshot.docs.map((feedbackDoc) => ({
        id: feedbackDoc.id,
        ...feedbackDoc.data(),
      }))

      items.sort((a, b) => {
        const timeA = a.createdAt?.toMillis?.() ?? 0
        const timeB = b.createdAt?.toMillis?.() ?? 0
        return timeB - timeA
      })

      setFeedbackList(items)
    } catch (error) {
      console.error('Error loading feedback:', error)

      if (error.code === 'permission-denied') {
        setLoadMessage(t('feedback.loadPermissionError'))
      } else {
        setLoadMessage(t('feedback.loadError'))
      }
    } finally {
      setLoadingFeedback(false)
    }
  }, [t])

  useEffect(() => {
    if (!authChecked) return

    if (user) {
      loadMyFeedback()
    } else {
      setFeedbackList([])
      setLoadingFeedback(false)
    }
  }, [authChecked, user, loadMyFeedback])

  function handleRatingSelect(selectedRating) {
    setRating(selectedRating)
    setMessage('')
    setMessageType('')
  }

  function handleCommentChange(event) {
    setComment(event.target.value)
    setMessage('')
    setMessageType('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setMessage('')
    setMessageType('')

    if (!auth.currentUser) {
      setMessage(t('feedback.loginToSubmit'))
      setMessageType('error')
      return
    }

    if (rating < 1 || rating > 5) {
      setMessage(t('feedback.selectRating'))
      setMessageType('error')
      return
    }

    const cleanComment = comment.trim()

    if (!cleanComment) {
      setMessage(t('feedback.writeComment'))
      setMessageType('error')
      return
    }

    if (cleanComment.length > MAX_COMMENT_LENGTH) {
      setMessage(t('feedback.commentTooLong'))
      setMessageType('error')
      return
    }

    setSubmitting(true)

    try {
      const currentUser = auth.currentUser

      await addDoc(collection(db, 'feedback'), {
        uid: currentUser.uid,
        userName:
          currentUser.displayName ||
          currentUser.email?.split('@')[0] ||
          'GreenGrow User',
        rating,
        comment: cleanComment,
        createdAt: serverTimestamp(),
      })

      setRating(0)
      setComment('')
      setMessage(t('feedback.submitSuccess'))
      setMessageType('success')

      await loadMyFeedback()
    } catch (error) {
      console.error('Error submitting feedback:', error)

      if (error.code === 'permission-denied') {
        setMessage(t('feedback.submitPermissionError'))
      } else {
        setMessage(t('feedback.submitError'))
      }

      setMessageType('error')
    } finally {
      setSubmitting(false)
    }
  }

  function formatDate(timestamp) {
    if (!timestamp) return t('feedback.datePending')

    try {
      const date = timestamp?.toDate
        ? timestamp.toDate()
        : new Date(timestamp)

      if (Number.isNaN(date.getTime())) {
        return t('feedback.datePending')
      }

      const localeByLanguage = {
        en: 'en-IN',
        hi: 'hi-IN',
        mr: 'mr-IN',
      }

      return new Intl.DateTimeFormat(
        localeByLanguage[language] || 'en-IN',
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }
      ).format(date)
    } catch {
      return t('feedback.datePending')
    }
  }

  if (!authChecked) {
    return (
      <main className="feedback-page">
        <div className="feedback-loading">
          {t('feedback.checkingLogin')}
        </div>
      </main>
    )
  }

  return (
    <main className="feedback-page">
      <header className="feedback-header">
        <p className="feedback-eyebrow">
          {t('feedback.eyebrow')}
        </p>
        <h1>{t('feedback.title')}</h1>
        <p className="feedback-subtitle">
          {t('feedback.subtitle')}
        </p>
      </header>

      {!user ? (
        <section className="feedback-card">
          <h2>{t('feedback.loginTitle')}</h2>
          <p>{t('feedback.loginRequired')}</p>
        </section>
      ) : (
        <>
          <section className="feedback-card">
            <div className="feedback-section-heading">
              <h2>{t('feedback.rateTitle')}</h2>
              <p>{t('feedback.rateDescription')}</p>
            </div>

            {message && (
              <div
                className={`feedback-message ${messageType}`}
                role="status"
                aria-live="polite"
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <fieldset className="feedback-rating-fieldset">
                <legend>{t('feedback.yourRating')}</legend>

                <div
                  className="feedback-stars"
                  role="group"
                  aria-label={t('feedback.chooseRating')}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`feedback-star ${
                        star <= rating ? 'selected' : ''
                      }`}
                      onClick={() => handleRatingSelect(star)}
                      aria-label={
                        star === 1
                          ? t('feedback.oneStar')
                          : t('feedback.manyStars', {
                              rating: star,
                            })
                      }
                      aria-pressed={rating === star}
                    >
                      {star <= rating ? '★' : '☆'}
                    </button>
                  ))}
                </div>

                <p className="feedback-help-text">
                  {rating
                    ? t('feedback.ratingSelected', { rating })
                    : t('feedback.tapStar')}
                </p>
              </fieldset>

              <div className="feedback-field">
                <label htmlFor="feedback-comment">
                  {t('feedback.comments')}
                </label>

                <textarea
                  id="feedback-comment"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder={t('feedback.commentPlaceholder')}
                  rows={5}
                  maxLength={MAX_COMMENT_LENGTH}
                  required
                />

                <p className="feedback-character-count">
                  {t('feedback.characterCount', {
                    count: comment.length,
                  })}
                </p>
              </div>

              <button
                type="submit"
                className="feedback-submit-button"
                disabled={submitting}
              >
                {submitting
                  ? t('feedback.submitting')
                  : t('feedback.submit')}
              </button>
            </form>
          </section>

          <section className="feedback-card feedback-community">
            <div className="feedback-section-heading">
              <h2>{t('feedback.historyTitle')}</h2>
              <p>{t('feedback.historyDescription')}</p>
            </div>

            {loadMessage && (
              <div
                className="feedback-message error"
                role="alert"
              >
                {loadMessage}
              </div>
            )}

            {loadingFeedback ? (
              <p className="feedback-loading">
                {t('feedback.loading')}
              </p>
            ) : feedbackList.length === 0 ? (
              !loadMessage && (
                <div className="feedback-empty">
                  <h3>{t('feedback.emptyTitle')}</h3>
                  <p>{t('feedback.emptyDescription')}</p>
                </div>
              )
            ) : (
              <div className="feedback-list">
                {feedbackList.map((item) => (
                  <article
                    className="feedback-item"
                    key={item.id}
                  >
                    <div className="feedback-item-header">
                      <div className="feedback-author">
                        <span className="feedback-author-avatar">
                          {(item.userName || 'G')
                            .trim()
                            .charAt(0)
                            .toUpperCase()}
                        </span>

                        <div>
                          <h3>
                            {item.userName || 'GreenGrow User'}
                          </h3>
                          <p className="feedback-date">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div
                        className="feedback-item-rating"
                        aria-label={t(
                          'feedback.ratingSelected',
                          { rating: item.rating || 0 }
                        )}
                      >
                        <span aria-hidden="true">
                          {'★'.repeat(
                            Math.max(
                              0,
                              Math.min(5, Number(item.rating) || 0)
                            )
                          )}
                          {'☆'.repeat(
                            5 -
                              Math.max(
                                0,
                                Math.min(
                                  5,
                                  Number(item.rating) || 0
                                )
                              )
                          )}
                        </span>
                      </div>
                    </div>

                    <p className="feedback-item-comment">
                      {item.comment}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  )
}
