// Rule-based farming advisor. This intentionally does NOT call an LLM
// or any paid API — it's a plain rules engine, matching the
// "AI Advisor (Rule-based)" label in the design. That keeps this
// feature fully free: no Cloud Functions, no external API cost.
//
// Every displayable string here is a translation KEY (e.g.
// 'advisor.tip.dripIrrigation'), not literal text — the matching
// logic below runs on stable English `value`s ('tomato', 'loamy', …)
// so switching language never changes which rules fire. Components
// call t(key) from useLanguage() to render the actual text.
//
// COVERAGE: every combination of crop (6) x soil (4) x water (3) x
// season (3) — and any partial selection — now returns advice:
//   1. "Fit" notes: how well the crop matches the chosen season, water
//      level and soil (tables CROP_SEASON_FIT / CROP_WATER_FIT /
//      CROP_SOIL_FIT below).
//   2. General tips for each chosen soil / water level / season / crop.
//   3. Combination tips (e.g. sandy soil + low water).
//
// The new text for these tips is registered into TRANSLATIONS (en, hi,
// mr) at the bottom of this file, so no other file needs to change.

import { TRANSLATIONS } from '../i18n/translations'

// ---------------------------------------------------------------------
// Option lists (unchanged)
// ---------------------------------------------------------------------

// value = stable match key used by the rules; labelKey = translation
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

// ---------------------------------------------------------------------
// Suitability tables — one row per crop.
// season/soil grades: 'good' | 'ok' | 'poor'
// water kinds: 'good' | 'lowOk' | 'highOk' | 'medThirsty' | 'poorLow'
// ---------------------------------------------------------------------

const CROP_SEASON_FIT = {
  tomato:    { summer: 'ok',   monsoon: 'ok',   winter: 'good' },
  rice:      { summer: 'ok',   monsoon: 'good', winter: 'ok' },
  wheat:     { summer: 'poor', monsoon: 'poor', winter: 'good' },
  cotton:    { summer: 'ok',   monsoon: 'good', winter: 'poor' },
  sugarcane: { summer: 'ok',   monsoon: 'good', winter: 'good' },
  maize:     { summer: 'ok',   monsoon: 'good', winter: 'good' },
}

const CROP_WATER_FIT = {
  tomato:    { low: 'lowOk',   medium: 'good',       high: 'highOk' },
  rice:      { low: 'poorLow', medium: 'medThirsty', high: 'good' },
  wheat:     { low: 'lowOk',   medium: 'good',       high: 'highOk' },
  cotton:    { low: 'lowOk',   medium: 'good',       high: 'highOk' },
  sugarcane: { low: 'poorLow', medium: 'medThirsty', high: 'good' },
  maize:     { low: 'lowOk',   medium: 'good',       high: 'highOk' },
}

const CROP_SOIL_FIT = {
  tomato:    { loamy: 'good', sandy: 'ok',   clay: 'ok',   silt: 'good' },
  rice:      { loamy: 'good', sandy: 'poor', clay: 'good', silt: 'good' },
  wheat:     { loamy: 'good', sandy: 'poor', clay: 'good', silt: 'good' },
  cotton:    { loamy: 'good', sandy: 'ok',   clay: 'good', silt: 'ok' },
  sugarcane: { loamy: 'good', sandy: 'poor', clay: 'good', silt: 'good' },
  maize:     { loamy: 'good', sandy: 'ok',   clay: 'ok',   silt: 'good' },
}

const FIT_ICON = { good: '✅', ok: 'ℹ️', poor: '⚠️' }

// Turns a water "kind" into a good/ok/poor grade (for icons and tags).
function waterGrade(kind) {
  if (kind === 'good') return 'good'
  if (kind === 'poorLow') return 'poor'
  return 'ok'
}

// Returns the crop-fit notes for whatever the user has selected.
// Also returns the worst/best grades so tags can summarise them.
function getFitNotes(i) {
  const notes = []
  const grades = []
  if (i.crop && i.season && CROP_SEASON_FIT[i.crop]?.[i.season]) {
    const g = CROP_SEASON_FIT[i.crop][i.season]
    grades.push(g)
    notes.push({ tipKey: `advisor.fit.season.${i.crop}.${i.season}`, icon: FIT_ICON[g] })
  }
  if (i.crop && i.waterAvailability && CROP_WATER_FIT[i.crop]?.[i.waterAvailability]) {
    const g = waterGrade(CROP_WATER_FIT[i.crop][i.waterAvailability])
    grades.push(g)
    notes.push({ tipKey: `advisor.fit.water.${i.crop}.${i.waterAvailability}`, icon: FIT_ICON[g] })
  }
  if (i.crop && i.soilType && CROP_SOIL_FIT[i.crop]?.[i.soilType]) {
    const g = CROP_SOIL_FIT[i.crop][i.soilType]
    grades.push(g)
    notes.push({ tipKey: `advisor.fit.soil.${i.crop}.${i.soilType}`, icon: FIT_ICON[g] })
  }
  return { notes, grades }
}

// ---------------------------------------------------------------------
// Tip rules. To extend: add a row here and its text in NEW_TIPS below.
// ---------------------------------------------------------------------

const RULES = [
  // --- water ---
  { match: (i) => i.waterAvailability === 'low', tipKey: 'advisor.tip.dripIrrigation', icon: '💧' },
  { match: (i) => i.waterAvailability === 'low' && i.season === 'summer', tipKey: 'advisor.tip.mulchSummer', icon: '🌾' },
  { match: (i) => i.waterAvailability === 'medium', tipKey: 'advisor.tip.mediumWater', icon: '💧' },
  { match: (i) => i.waterAvailability === 'high', tipKey: 'advisor.tip.highWater', icon: '💧' },

  // --- soil ---
  { match: (i) => i.soilType === 'loamy', tipKey: 'advisor.tip.compostLoamy', icon: '🌱' },
  { match: (i) => i.soilType === 'sandy', tipKey: 'advisor.tip.compostSandy', icon: '🌱' },
  { match: (i) => i.soilType === 'clay', tipKey: 'advisor.tip.drainageClay', icon: '🌱' },
  { match: (i) => i.soilType === 'silt', tipKey: 'advisor.tip.siltSoil', icon: '🌱' },

  // --- soil + water combinations ---
  { match: (i) => i.soilType === 'sandy' && i.waterAvailability === 'low', tipKey: 'advisor.tip.sandyLowWater', icon: '🏜️' },
  { match: (i) => i.soilType === 'clay' && i.waterAvailability === 'high', tipKey: 'advisor.tip.clayHighWater', icon: '🚜' },

  // --- crop ---
  { match: (i) => i.crop === 'tomato', tipKey: 'advisor.tip.tomatoStake', icon: '🍅' },
  { match: (i) => i.crop === 'tomato', tipKey: 'advisor.tip.tomatoWater', icon: '🍅' },
  { match: (i) => i.crop === 'tomato' && i.season === 'summer', tipKey: 'advisor.tip.tomatoNeem', icon: '🐞' },
  { match: (i) => i.crop === 'rice', tipKey: 'advisor.tip.riceWater', icon: '🌾' },
  { match: (i) => i.crop === 'wheat', tipKey: 'advisor.tip.wheatSow', icon: '🌾' },
  { match: (i) => i.crop === 'wheat', tipKey: 'advisor.tip.wheatIrrigation', icon: '💧' },
  { match: (i) => i.crop === 'cotton', tipKey: 'advisor.tip.cottonPest', icon: '🌿' },
  { match: (i) => i.crop === 'sugarcane', tipKey: 'advisor.tip.sugarcaneCare', icon: '🎋' },
  { match: (i) => i.crop === 'maize', tipKey: 'advisor.tip.maizeCare', icon: '🌽' },

  // --- season ---
  { match: (i) => i.season === 'summer', tipKey: 'advisor.tip.summerGeneral', icon: '☀️' },
  { match: (i) => i.season === 'monsoon', tipKey: 'advisor.tip.monsoonDrainage', icon: '🌧️' },
  { match: (i) => i.season === 'winter', tipKey: 'advisor.tip.winterGeneral', icon: '❄️' },
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
  const { notes, grades } = getFitNotes(inputs)

  const recommendations = [
    ...notes,
    ...RULES.filter((r) => r.match(inputs)).map((r) => ({ tipKey: r.tipKey, icon: r.icon })),
  ]

  const tags = OUTCOME_TAGS.filter((t) => t.match(inputs)).map((t) => ({
    labelKey: t.labelKey,
    icon: t.icon,
  }))
  if (grades.includes('poor')) {
    tags.push({ labelKey: 'advisor.tag.needsCare', icon: '⚠️' })
  } else if (grades.length > 0 && grades.every((g) => g === 'good')) {
    tags.push({ labelKey: 'advisor.tag.goodFit', icon: '✅' })
  }

  if (recommendations.length === 0) {
    recommendations.push({ tipKey: 'advisor.tip.fillForm', icon: 'ℹ️' })
  }

  return { recommendations, tags }
}

// ---------------------------------------------------------------------
// New translation text (English, Hindi, Marathi).
// Registered into TRANSLATIONS when this file loads.
// ---------------------------------------------------------------------

const NEW_TIPS = {
  'advisor.tip.siltSoil': {
    en: 'Silt soil holds water and nutrients well but crusts and compacts — avoid working it when wet and add organic matter.',
    hi: 'गाद मिट्टी पानी और पोषक तत्व अच्छे से रोकती है, पर सख्त परत बना लेती है — गीली अवस्था में जुताई न करें और जैविक पदार्थ मिलाएं।',
    mr: 'गाळाची माती पाणी व अन्नद्रव्ये चांगली धरून ठेवते, पण तिच्यावर कवच पडते व ती घट्ट होते — ओली असताना मशागत टाळा आणि सेंद्रिय पदार्थ मिसळा.',
  },
  'advisor.tip.mediumWater': {
    en: 'Irrigate on a schedule — water when the top 2–3 cm of soil feels dry instead of on a fixed daily routine.',
    hi: 'शेड्यूल से सिंचाई करें — रोज़ की आदत की जगह तब पानी दें जब ऊपरी 2-3 सेमी मिट्टी सूखी लगे।',
    mr: 'वेळापत्रकाने पाणी द्या — रोजच्या सवयीपेक्षा वरची २-३ सेमी माती कोरडी वाटल्यावर पाणी द्या.',
  },
  'advisor.tip.highWater': {
    en: 'With plenty of water, avoid over-irrigation — it washes away nutrients and invites root diseases. Keep field drainage working.',
    hi: 'पानी भरपूर हो तो अधिक सिंचाई से बचें — इससे पोषक तत्व बह जाते हैं और जड़ों के रोग लगते हैं। जल निकासी चालू रखें।',
    mr: 'पाणी भरपूर असल्यास जास्त पाणी देणे टाळा — त्यामुळे अन्नद्रव्ये वाहून जातात व मुळांचे रोग होतात. निचऱ्याची व्यवस्था चालू ठेवा.',
  },
  'advisor.tip.sandyLowWater': {
    en: 'Sandy soil with limited water dries out fast — mulch heavily and irrigate in small, frequent doses.',
    hi: 'सीमित पानी में बलुई मिट्टी जल्दी सूख जाती है — भारी मल्च करें और थोड़ी-थोड़ी मात्रा में बार-बार सिंचाई करें।',
    mr: 'मर्यादित पाण्यात वालुकामय माती लवकर कोरडी होते — जाड आच्छादन करा आणि थोड्या थोड्या प्रमाणात वारंवार पाणी द्या.',
  },
  'advisor.tip.clayHighWater': {
    en: 'Clay soil with high water availability raises the risk of waterlogging — use raised beds or furrows.',
    hi: 'चिकनी मिट्टी में अधिक पानी से जलभराव का खतरा बढ़ता है — ऊंची क्यारियां या नालियां (फरो) बनाएं।',
    mr: 'चिकण मातीत जास्त पाण्यामुळे पाणी साचण्याचा धोका वाढतो — गादीवाफे किंवा सऱ्या तयार करा.',
  },
  'advisor.tip.tomatoWater': {
    en: 'Water evenly — irregular watering causes fruit cracking and blossom-end rot.',
    hi: 'समान रूप से पानी दें — अनियमित सिंचाई से फल फटते हैं और फल के सिरे पर सड़न होती है।',
    mr: 'नियमित पाणी द्या — अनियमित पाण्यामुळे फळे तडकतात व फळाच्या टोकाला कूज होते.',
  },
  'advisor.tip.wheatIrrigation': {
    en: 'Irrigate at critical stages — crown root initiation, tillering, flowering and grain filling.',
    hi: 'महत्वपूर्ण अवस्थाओं — ताज-मूल अवस्था, कल्ले फूटना, फूल आना और दाना भरना — पर सिंचाई करें।',
    mr: 'महत्त्वाच्या टप्प्यांवर — मुकुटमूळ अवस्था, फुटवे, फुलोरा आणि दाणे भरताना — पाणी द्या.',
  },
  'advisor.tip.cottonPest': {
    en: 'Keep wide plant spacing and monitor for bollworm and whitefly using pheromone and sticky traps.',
    hi: 'पौधों के बीच चौड़ी दूरी रखें और फेरोमोन व चिपचिपे जालों से बॉलवर्म और सफेद मक्खी पर नज़र रखें।',
    mr: 'रोपांमध्ये रुंद अंतर ठेवा आणि कामगंध (फेरोमोन) व चिकट सापळ्यांनी बोंडअळी व पांढऱ्या माशीवर लक्ष ठेवा.',
  },
  'advisor.tip.sugarcaneCare': {
    en: 'Plant disease-free setts, mulch with cane trash and earth up the base to prevent lodging.',
    hi: 'रोग-मुक्त बीज-टुकड़े (सेट) लगाएं, गन्ने की पत्तियों से मल्च करें और गिरने से बचाने के लिए जड़ों पर मिट्टी चढ़ाएं।',
    mr: 'रोगमुक्त बेणे लावा, उसाच्या पाचटाचे आच्छादन करा आणि पीक लोळू नये म्हणून बुडाला मातीची भर द्या.',
  },
  'advisor.tip.maizeCare': {
    en: 'Apply nitrogen in split doses, weed early, and scout regularly for fall armyworm.',
    hi: 'नाइट्रोजन को दो-तीन बार में बांटकर डालें, शुरुआत में निराई करें और फॉल आर्मीवर्म पर नियमित नज़र रखें।',
    mr: 'नत्र खत हप्त्यांमध्ये विभागून द्या, सुरुवातीलाच तण काढा आणि लष्करी अळीवर नियमित लक्ष ठेवा.',
  },
  'advisor.tip.summerGeneral': {
    en: 'Irrigate early morning or evening to cut evaporation loss.',
    hi: 'वाष्पीकरण से होने वाला नुकसान घटाने के लिए सुबह जल्दी या शाम को सिंचाई करें।',
    mr: 'बाष्पीभवनामुळे होणारे नुकसान कमी करण्यासाठी सकाळी लवकर किंवा संध्याकाळी पाणी द्या.',
  },
  'advisor.tip.winterGeneral': {
    en: 'Protect young plants from cold nights and frost, and irrigate lightly since evaporation is low.',
    hi: 'छोटे पौधों को ठंडी रातों और पाले से बचाएं और कम सिंचाई करें क्योंकि वाष्पीकरण कम होता है।',
    mr: 'कोवळ्या रोपांना थंड रात्री व दंवापासून वाचवा आणि बाष्पीभवन कमी असल्याने हलके पाणी द्या.',
  },
  'advisor.tag.goodFit': {
    en: 'Good match',
    hi: 'अच्छा मेल',
    mr: 'चांगली जुळणी',
  },
  'advisor.tag.needsCare': {
    en: 'Needs extra care',
    hi: 'अतिरिक्त देखभाल ज़रूरी',
    mr: 'अधिक काळजी आवश्यक',
  },
}

// Fit-note sentence templates, built per language from the existing
// crop / soil / season names so wording stays consistent.
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const FIT_TEXT = {
  en: {
    crop: (s) => s.toLowerCase(),
    soil: (s) => `${s.toLowerCase()} soil`,
    season: (s) => s.toLowerCase(),
    join: ' or ',
    seasonText: {
      good: (c, s) => `${cap(c)} is well suited to the ${s} season.`,
      ok: (c, s) => `${cap(c)} can be grown in the ${s} season, but it needs extra care and irrigation.`,
      poor: (c, s, goods) => `The ${s} season is not the best fit for ${c} — if possible, sow in the ${goods} season instead.`,
    },
    waterText: {
      good: (c) => `Your water availability suits ${c} well.`,
      lowOk: (c) => `Water is limited for ${c} — irrigate only at critical growth stages and mulch to hold moisture.`,
      highOk: (c) => `Water is plentiful for ${c}, more than it needs — irrigate only as required and avoid waterlogging.`,
      medThirsty: (c) => `${cap(c)} needs a lot of water and your supply is moderate — irrigate regularly and avoid dry spells during key growth stages.`,
      poorLow: (c, a1, a2) => `${cap(c)} needs plenty of water, so a low supply will cut yield — use drip irrigation and mulching, or consider a less thirsty crop such as ${a1} or ${a2}.`,
    },
    soilText: {
      good: (c, s) => `${cap(c)} grows well in ${s}.`,
      ok: (c, s) => `${cap(c)} can grow in ${s}, but improve the soil with organic matter first.`,
      poor: (c, s) => `${cap(s)} is a weak match for ${c} — add plenty of compost and organic matter and irrigate more often, or choose a better-suited crop.`,
    },
  },
  hi: {
    crop: (s) => s,
    soil: (s) => s,
    season: (s) => s,
    join: ' / ',
    seasonText: {
      good: (c, s) => `${s} का मौसम ${c} के लिए उपयुक्त है।`,
      ok: (c, s) => `${s} के मौसम में ${c} की खेती हो सकती है, पर अतिरिक्त देखभाल और सिंचाई ज़रूरी है।`,
      poor: (c, s, goods) => `${s} का मौसम ${c} के लिए सबसे अच्छा नहीं है — संभव हो तो ${goods} में बुवाई करें।`,
    },
    waterText: {
      good: (c) => `आपकी जल उपलब्धता ${c} के लिए उपयुक्त है।`,
      lowOk: (c) => `${c} के लिए पानी सीमित है — केवल महत्वपूर्ण वृद्धि अवस्थाओं में सिंचाई करें और नमी बचाने के लिए मल्च लगाएं।`,
      highOk: (c) => `${c} की ज़रूरत से ज़्यादा पानी उपलब्ध है — ज़रूरत के अनुसार ही सिंचाई करें और जलभराव से बचें।`,
      medThirsty: (c) => `${c} को ज़्यादा पानी चाहिए और आपके पास मध्यम उपलब्धता है — नियमित सिंचाई करें और मुख्य वृद्धि अवस्थाओं में सूखे से बचाएं।`,
      poorLow: (c, a1, a2) => `${c} को काफ़ी पानी चाहिए, इसलिए कम पानी से पैदावार घटेगी — ड्रिप सिंचाई और मल्चिंग अपनाएं, या ${a1} / ${a2} जैसी कम पानी वाली फसल चुनें।`,
    },
    soilText: {
      good: (c, s) => `${s} ${c} की खेती के लिए अच्छी है।`,
      ok: (c, s) => `${s} में ${c} की खेती हो सकती है, लेकिन पहले जैविक पदार्थ से मिट्टी सुधारें।`,
      poor: (c, s) => `${s} ${c} के लिए कमज़ोर विकल्प है — खूब जैविक खाद डालें और बार-बार सिंचाई करें, या कोई बेहतर उपयुक्त फसल चुनें।`,
    },
  },
  mr: {
    crop: (s) => s,
    soil: (s) => s,
    season: (s) => s,
    join: ' / ',
    seasonText: {
      good: (c, s) => `${s} हंगाम ${c} पिकासाठी योग्य आहे.`,
      ok: (c, s) => `${c} पिकाची लागवड ${s} हंगामात करता येते, पण अतिरिक्त काळजी व सिंचन आवश्यक आहे.`,
      poor: (c, s, goods) => `${s} हंगाम ${c} पिकासाठी सर्वोत्तम नाही — शक्य असल्यास ${goods} हंगामात पेरणी करा.`,
    },
    waterText: {
      good: (c) => `तुमच्याकडील पाण्याची उपलब्धता ${c} पिकासाठी योग्य आहे.`,
      lowOk: (c) => `${c} पिकासाठी पाणी मर्यादित आहे — फक्त वाढीच्या महत्त्वाच्या टप्प्यांवर पाणी द्या आणि ओलावा टिकवण्यासाठी आच्छादन करा.`,
      highOk: (c) => `${c} पिकाच्या गरजेपेक्षा जास्त पाणी उपलब्ध आहे — गरजेनुसारच पाणी द्या आणि पाणी साचू देऊ नका.`,
      medThirsty: (c) => `${c} पिकाला जास्त पाणी लागते आणि तुमच्याकडे मध्यम उपलब्धता आहे — नियमित पाणी द्या आणि वाढीच्या महत्त्वाच्या टप्प्यांवर पाण्याचा ताण पडू देऊ नका.`,
      poorLow: (c, a1, a2) => `${c} पिकाला भरपूर पाणी लागते, त्यामुळे कमी पाण्याने उत्पादन घटेल — ठिबक सिंचन व आच्छादन वापरा किंवा ${a1} / ${a2} सारखे कमी पाण्याचे पीक निवडा.`,
    },
    soilText: {
      good: (c, s) => `${s} ${c} पिकासाठी चांगली आहे.`,
      ok: (c, s) => `${s} असली तरी ${c} पिकाची लागवड करता येते; मात्र आधी सेंद्रिय पदार्थांनी माती सुधारा.`,
      poor: (c, s) => `${s} ${c} पिकासाठी कमकुवत पर्याय आहे — भरपूर सेंद्रिय खत टाका आणि वारंवार पाणी द्या किंवा अधिक योग्य पीक निवडा.`,
    },
  },
}
function registerAdvisorTranslations() {
  for (const lang of Object.keys(TRANSLATIONS)) {
    const dict = TRANSLATIONS[lang]
    const f = FIT_TEXT[lang] || FIT_TEXT.en
    const name = (type, value) => f[type](dict[`advisor.${type}.${value}`] ?? TRANSLATIONS.en[`advisor.${type}.${value}`] ?? value)

    // static tips + tags
    for (const [key, text] of Object.entries(NEW_TIPS)) {
      dict[key] = text[lang] ?? text.en
    }

    // fit notes
    for (const crop of CROPS.map((c) => c.value)) {
      const cName = name('crop', crop)

      const goodSeasons = SEASONS.filter((s) => CROP_SEASON_FIT[crop][s.value] === 'good')
        .map((s) => name('season', s.value))
        .join(f.join)
      for (const { value: season } of SEASONS) {
        const grade = CROP_SEASON_FIT[crop][season]
        dict[`advisor.fit.season.${crop}.${season}`] = f.seasonText[grade](cName, name('season', season), goodSeasons)
      }

      const alts = ['maize', 'cotton'].filter((a) => a !== crop).map((a) => name('crop', a))
      for (const { value: level } of WATER_LEVELS) {
        const kind = CROP_WATER_FIT[crop][level]
        dict[`advisor.fit.water.${crop}.${level}`] = f.waterText[kind](cName, alts[0], alts[1])
      }

      for (const { value: soil } of SOIL_TYPES) {
        const grade = CROP_SOIL_FIT[crop][soil]
        dict[`advisor.fit.soil.${crop}.${soil}`] = f.soilText[grade](cName, name('soil', soil))
      }
    }
  }
}

registerAdvisorTranslations()
