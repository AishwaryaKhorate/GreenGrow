// Rule-based farming advisor. This intentionally does NOT call an LLM
// or any paid API — it's a plain if/else rules engine, matching the
// "AI Advisor (Rule-based)" label in the design. That keeps this
// feature fully free: no Cloud Functions, no external API cost.
//
// Every displayable string here is a translation KEY (e.g.
// 'advisor.tip.dripIrrigation'), not literal text — the matching
// logic below runs on stable English `value`s ('tomato', 'loamy', …)
// so switching language never changes which rules fire. Components
// call t(key) from useLanguage() to render the actual text.
//
// To extend: add more rows to RULES, and add the matching translation
// key to all three language blocks in i18n/translations.js.

const RULES = [
  {
    match: (i) => i.waterAvailability === 'low',
    tipKey: 'advisor.tip.dripIrrigation',
    icon: '💧',
  },
  {
    match: (i) => i.waterAvailability === 'low' && i.season === 'summer',
    tipKey: 'advisor.tip.mulchSummer',
    icon: '🌾',
  },
  {
    match: (i) => i.soilType === 'loamy',
    tipKey: 'advisor.tip.compostLoamy',
    icon: '🌱',
  },
  {
    match: (i) => i.soilType === 'sandy',
    tipKey: 'advisor.tip.compostSandy',
    icon: '🌱',
  },
  {
    match: (i) => i.soilType === 'clay',
    tipKey: 'advisor.tip.drainageClay',
    icon: '🌱',
  },
  {
    match: (i) => i.crop === 'tomato',
    tipKey: 'advisor.tip.tomatoStake',
    icon: '🍅',
  },
  {
    match: (i) => i.crop === 'tomato' && i.season === 'summer',
    tipKey: 'advisor.tip.tomatoNeem',
    icon: '🐞',
  },
  {
    match: (i) => i.crop === 'rice',
    tipKey: 'advisor.tip.riceWater',
    icon: '🌾',
  },
  {
    match: (i) => i.crop === 'wheat',
    tipKey: 'advisor.tip.wheatSow',
    icon: '🌾',
  },
  {
    match: (i) => i.season === 'monsoon',
    tipKey: 'advisor.tip.monsoonDrainage',
    icon: '🌧️',
  },
]

// Simple summary tags shown at the bottom of the recommendation card.
const OUTCOME_TAGS = [
  { match: (i) => i.soilType && i.waterAvailability, labelKey: 'advisor.tag.higherYield', icon: '📈' },
  { match: (i) => i.waterAvailability === 'low', labelKey: 'advisor.tag.saveWater', icon: '💧' },
  { match: (i) => i.soilType, labelKey: 'advisor.tag.restoreSoil', icon: '🌱' },
]

// inputs: { crop, soilType, waterAvailability, season } — each a lowercase
// value like 'tomato', never translated text. Returns translation keys;
// call t(r.tipKey) / t(tag.labelKey) to render them.
export function getAdvisorRecommendation(inputs) {
  const recommendations = RULES.filter((r) => r.match(inputs)).map((r) => ({
    tipKey: r.tipKey,
    icon: r.icon,
  }))
  const tags = OUTCOME_TAGS.filter((t) => t.match(inputs)).map((t) => ({
    labelKey: t.labelKey,
    icon: t.icon,
  }))

  if (recommendations.length === 0) {
    recommendations.push({ tipKey: 'advisor.tip.fillForm', icon: 'ℹ️' })
  }

  return { recommendations, tags }
}

// value = stable match key used by RULES above; labelKey = translation
// key for the option's display text (see 'advisor.crop.*' etc in
// i18n/translations.js).
export const CROPS = [
  { value: 'tomato', labelKey: 'advisor.crop.tomato' },
  { value: 'rice', labelKey: 'advisor.crop.rice' },
  { value: 'wheat', labelKey: 'advisor.crop.wheat' },
  { value: 'cotton', labelKey: 'advisor.crop.cotton' },
  { value: 'sugarcane', labelKey: 'advisor.crop.sugarcane' },
  { value: 'maize', labelKey: 'advisor.crop.maize' },
]

export const SOIL_TYPES = [
  { value: 'loamy', labelKey: 'advisor.soil.loamy' },
  { value: 'sandy', labelKey: 'advisor.soil.sandy' },
  { value: 'clay', labelKey: 'advisor.soil.clay' },
  { value: 'silt', labelKey: 'advisor.soil.silt' },
]

export const WATER_LEVELS = [
  { value: 'low', labelKey: 'advisor.water.low' },
  { value: 'medium', labelKey: 'advisor.water.medium' },
  { value: 'high', labelKey: 'advisor.water.high' },
]

export const SEASONS = [
  { value: 'summer', labelKey: 'advisor.season.summer' },
  { value: 'monsoon', labelKey: 'advisor.season.monsoon' },
  { value: 'winter', labelKey: 'advisor.season.winter' },
]
