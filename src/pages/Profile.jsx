import { useState } from 'react'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'
import Card from '../components/Card'

export default function Profile() {
  const { profile, refreshProfile, logout } = useAuth()
  const { t } = useLanguage()
  const [farmSize, setFarmSize] = useState(profile?.farmSizeAcres ?? '')
  const [saving, setSaving] = useState(false)

  async function save() {
    setSaving(true)
    await updateDoc(doc(db, 'users', profile.uid), { farmSizeAcres: Number(farmSize) || null })
    await refreshProfile()
    setSaving(false)
  }

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-xl font-bold">{t('nav.profile')}</h1>
      <Card className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center text-xl font-semibold">
            {(profile?.name || t('common.farmer')).slice(0, 1).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">{profile?.name}</p>
            <p className="text-xs text-gray-500">{profile?.email}</p>
          </div>
        </div>

        <label className="block text-xs font-medium text-gray-500">
          {t('profile.farmSize')}
          <input
            type="number"
            min="0"
            step="0.1"
            value={farmSize}
            onChange={(e) => setFarmSize(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
          />
        </label>
        <button
          onClick={save}
          disabled={saving}
          className="w-full bg-forest-700 hover:bg-forest-800 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-lg"
        >
          {saving ? t('common.saving') : t('common.save')}
        </button>
      </Card>

      <button onClick={logout} className="w-full border border-gray-200 text-sm font-semibold py-2.5 rounded-lg text-gray-600">
        {t('nav.logout')}
      </button>
    </div>
  )
}
