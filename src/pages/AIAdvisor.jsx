import { useState } from 'react'
import { CROPS, SOIL_TYPES, WATER_LEVELS, SEASONS, getAdvisorRecommendation } from '../lib/advisor'
import { useLanguage } from '../i18n/LanguageContext'
import Card from '../components/Card'

export default function AIAdvisor() {
  const { t } = useLanguage()
  const [crop, setCrop] = useState('')
  const [soilType, setSoilType] = useState('')
  const [waterAvailability, setWaterAvailability] = useState('')
  const [season, setSeason] = useState('')
  const [result, setResult] = useState(null)

  function getRecommendation() {
    setResult(getAdvisorRecommendation({ crop, soilType, waterAvailability, season }))
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2">
          {t('nav.advisor')} <span className="text-[10px] bg-forest-100 text-forest-700 px-1.5 py-0.5 rounded">{t('nav.ruleBased')}</span>
        </h1>
        <p className="text-sm text-gray-500 mb-4">{t('advisor.subtitle')}</p>

        <Card className="space-y-3">
          <Select label={t('advisor.selectCrop')} value={crop} onChange={setCrop} options={CROPS} placeholder={t('advisor.selectPlaceholder')} />
          <Select label={t('advisor.soilType')} value={soilType} onChange={setSoilType} options={SOIL_TYPES} placeholder={t('advisor.selectPlaceholder')} />
          <Select
            label={t('advisor.waterAvailability')}
            value={waterAvailability}
            onChange={setWaterAvailability}
            options={WATER_LEVELS}
            placeholder={t('advisor.selectPlaceholder')}
          />
          <Select label={t('advisor.season')} value={season} onChange={setSeason} options={SEASONS} placeholder={t('advisor.selectPlaceholder')} />

          <button
            onClick={getRecommendation}
            className="w-full bg-forest-700 hover:bg-forest-800 text-white font-semibold py-2.5 rounded-lg text-sm"
          >
            {t('advisor.getRecommendation')}
          </button>
        </Card>
      </div>

      <div>
        <p className="font-semibold text-sm mb-2 lg:mt-9">{t('advisor.recommendation')}</p>
        <Card className="min-h-[220px] flex flex-col">
          {!result && <p className="text-sm text-gray-400 m-auto text-center">{t('advisor.emptyState')}</p>}
          {result && (
            <>
              <ul className="space-y-3 flex-1">
                {result.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span>{r.icon}</span>
                    <span>{t(r.tipKey)}</span>
                  </li>
                ))}
              </ul>
              {result.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap pt-3 mt-3 border-t border-gray-100">
                  {result.tags.map((tag) => (
                    <span key={tag.labelKey} className="text-xs bg-forest-50 text-forest-700 px-2 py-1 rounded-full font-medium">
                      {tag.icon} {t(tag.labelKey)}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

function Select({ label, value, onChange, options, placeholder }) {
  const { t } = useLanguage()
  return (
    <label className="block text-xs font-medium text-gray-500">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 bg-white"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {t(o.labelKey)}
          </option>
        ))}
      </select>
    </label>
  )
}
