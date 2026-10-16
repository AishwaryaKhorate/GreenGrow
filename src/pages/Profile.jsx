
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useLanguage } from '../i18n/LanguageContext'
import './Profile.css'

const emptyProfile = {
  name: '',
  email: '',
  mobile: '',
  language: 'mr',
  village: '',
  district: '',
  state: '',
  photoURL: '',
}

const languageCodes = {
  English: 'en',
  Hindi: 'hi',
  Marathi: 'mr',
}

function normalizeLanguage(value) {
  if (!value) return 'mr'

  if (['en', 'hi', 'mr'].includes(value)) return value

  return languageCodes[value] || 'mr'
}

export default function Profile() {
  const { language, setLanguage, t } = useLanguage()

  const [user, setUser] = useState(null)
  const [form, setForm] = useState(emptyProfile)
  const [authChecked, setAuthChecked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [photoError, setPhotoError] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setUser(currentUser)
        setAuthChecked(true)
        setMessage('')
        setMessageType('')

        if (!currentUser) {
          setForm(emptyProfile)
          setLoading(false)
          return
        }

        setLoading(true)

        try {
          const profileRef = doc(db, 'users', currentUser.uid)
          const profileSnapshot = await getDoc(profileRef)

          const savedData = profileSnapshot.exists()
            ? profileSnapshot.data()
            : {}

          setForm({
            ...emptyProfile,
            ...savedData,
            name: savedData.name || currentUser.displayName || '',
            email: currentUser.email || savedData.email || '',
            language: normalizeLanguage(savedData.language),
            photoURL:
              savedData.photoURL || currentUser.photoURL || '',
          })
        } catch (error) {
          console.error('Error loading profile:', error)
          setMessage(t('profile.loadError'))
          setMessageType('error')
        } finally {
          setLoading(false)
        }
      },
      (error) => {
        console.error('Authentication error:', error)
        setAuthChecked(true)
        setLoading(false)
        setMessage(t('profile.loadError'))
        setMessageType('error')
      }
    )

    return unsubscribe
  }, [t])

  function handleChange(event) {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

    setMessage('')
    setMessageType('')
  }

  function handleLanguageChange(event) {
    const selectedLanguage = event.target.value

    setForm((previous) => ({
      ...previous,
      language: selectedLanguage,
    }))

    // Update the language used across the app.
    setLanguage(selectedLanguage)

    setMessage('')
    setMessageType('')
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0]
    setPhotoError('')

    if (!file) return

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ]

    if (!allowedTypes.includes(file.type)) {
      setPhotoError(t('profile.photoTypeError'))
      event.target.value = ''
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError(t('profile.photoSizeError'))
      event.target.value = ''
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        setPhotoError(t('profile.photoReadError'))
        return
      }

      setForm((previous) => ({
        ...previous,
        photoURL: reader.result,
      }))

      setMessage('')
      setMessageType('')
    }

    reader.onerror = () => {
      setPhotoError(t('profile.photoReadError'))
    }

    reader.readAsDataURL(file)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setMessage('')
    setMessageType('')

    if (!user) {
      setMessage(t('profile.loginToSave'))
      setMessageType('error')
      return
    }

    if (!form.name.trim()) {
      setMessage(t('profile.nameRequired'))
      setMessageType('error')
      return
    }

    setSaving(true)

    try {
      const profileRef = doc(db, 'users', user.uid)

      await setDoc(
        profileRef,
        {
          name: form.name.trim(),
          email: user.email || form.email.trim(),
          mobile: form.mobile.trim(),
          language: form.language,
          village: form.village.trim(),
          district: form.district.trim(),
          state: form.state.trim(),
          photoURL: form.photoURL,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      )

      setMessage(t('profile.saved'))
      setMessageType('success')
    } catch (error) {
      console.error('Error saving profile:', error)
      setMessage(t('profile.saveError'))
      setMessageType('error')
    } finally {
      setSaving(false)
    }
  }

  if (!authChecked || loading) {
    return (
      <main className="profile-page">
        <div className="profile-loading">
          {t('profile.loading')}
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="profile-page">
        <section className="profile-card">
          <p className="profile-eyebrow">
            {t('profile.eyebrow')}
          </p>
          <h1>{t('profile.title')}</h1>
          <p>{t('profile.loginRequired')}</p>
        </section>
      </main>
    )
  }

  return (
    <main className="profile-page">
      <header className="profile-header">
        <p className="profile-eyebrow">
          {t('profile.eyebrow')}
        </p>
        <h1>{t('profile.title')}</h1>
        <p className="profile-subtitle">
          {t('profile.subtitle')}
        </p>
      </header>

      <section className="profile-card">
        <div className="profile-section-heading">
          <h2>{t('profile.personalInfo')}</h2>
        </div>

        {message && (
          <div
            className={`profile-message ${messageType}`}
            role="status"
            aria-live="polite"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="profile-photo-section">
            <div className="profile-avatar">
              {form.photoURL ? (
                <img
                  src={form.photoURL}
                  alt={t('profile.photoAlt')}
                />
              ) : (
                <span aria-hidden="true">
                  {form.name.trim().charAt(0).toUpperCase() || '🌱'}
                </span>
              )}
            </div>

            <div className="profile-photo-controls">
              <label
                className="profile-photo-label"
                htmlFor="profile-photo"
              >
                {t('profile.changePhoto')}
              </label>

              <input
                id="profile-photo"
                className="profile-file-input"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoChange}
              />

              <p className="profile-help-text">
                {t('profile.photoHint')}
              </p>

              {photoError && (
                <p className="profile-error" role="alert">
                  {photoError}
                </p>
              )}
            </div>
          </div>

          <div className="profile-form-grid">
            <div className="profile-field">
              <label htmlFor="profile-name">
                {t('profile.name')}
              </label>
              <input
                id="profile-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder={t('profile.namePlaceholder')}
                autoComplete="name"
                required
                maxLength={100}
              />
            </div>

            <div className="profile-field">
              <label htmlFor="profile-email">
                {t('profile.email')}
              </label>
              <input
                id="profile-email"
                name="email"
                type="email"
                value={user.email || form.email}
                readOnly
                autoComplete="email"
              />
              <p className="profile-help-text">
                {t('profile.emailHint')}
              </p>
            </div>

            <div className="profile-field">
              <label htmlFor="profile-mobile">
                {t('profile.mobile')}
              </label>
              <input
                id="profile-mobile"
                name="mobile"
                type="tel"
                value={form.mobile}
                onChange={handleChange}
                placeholder={t('profile.mobilePlaceholder')}
                autoComplete="tel"
                maxLength={20}
              />
            </div>

            <div className="profile-field">
              <label htmlFor="profile-language">
                {t('profile.language')}
              </label>
              <select
                id="profile-language"
                name="language"
                value={form.language || language}
                onChange={handleLanguageChange}
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="mr">मराठी</option>
              </select>
            </div>

            <div className="profile-field">
              <label htmlFor="profile-village">
                {t('profile.village')}
              </label>
              <input
                id="profile-village"
                name="village"
                type="text"
                value={form.village}
                onChange={handleChange}
                placeholder={t('profile.villagePlaceholder')}
                autoComplete="address-level4"
                maxLength={100}
              />
            </div>

            <div className="profile-field">
              <label htmlFor="profile-district">
                {t('profile.district')}
              </label>
              <input
                id="profile-district"
                name="district"
                type="text"
                value={form.district}
                onChange={handleChange}
                placeholder={t('profile.districtPlaceholder')}
                maxLength={100}
              />
            </div>

            <div className="profile-field">
              <label htmlFor="profile-state">
                {t('profile.state')}
              </label>
              <input
                id="profile-state"
                name="state"
                type="text"
                value={form.state}
                onChange={handleChange}
                placeholder={t('profile.statePlaceholder')}
                autoComplete="address-level1"
                maxLength={100}
              />
            </div>
          </div>

          <div className="profile-form-actions">
            <button
              type="submit"
              className="profile-save-button"
              disabled={saving}
            >
              {saving
                ? t('profile.saving')
                : t('profile.save')}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
