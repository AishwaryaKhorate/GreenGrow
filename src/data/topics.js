// Static course content. In an MVP this can live in code; once you have
// more than a handful of topics, move this into a Firestore "topics"
// collection instead so you can edit it without redeploying.
//
// Every user-facing string is an { en, hi, mr } object — use localize()
// to read the right one for the current language, with English as the
// fallback if a translation is ever missing. correctIndex refers to the
// option's position, which is the same across all three languages, so
// keep each language's options array in the same order as English.

export const TOPICS = [
  {
    id: 'soil-health',
    icon: '🌱',
    title: { en: 'Soil Health', hi: 'मृदा स्वास्थ्य', mr: 'मातीचे आरोग्य' },
    description: {
      en: 'Learn how to improve and maintain soil health for better yield.',
      hi: 'बेहतर पैदावार के लिए मिट्टी के स्वास्थ्य को सुधारना और बनाए रखना सीखें।',
      mr: 'चांगल्या उत्पन्नासाठी मातीचे आरोग्य सुधारणे आणि टिकवणे शिका.',
    },
    lessons: [
      { id: 'intro-soil', title: { en: 'Introduction to Soil', hi: 'मिट्टी का परिचय', mr: 'मातीची ओळख' } },
      { id: 'soil-nutrients', title: { en: 'Soil Nutrients', hi: 'मिट्टी के पोषक तत्व', mr: 'मातीतील पोषक घटक' } },
      { id: 'soil-testing', title: { en: 'Soil Testing', hi: 'मिट्टी परीक्षण', mr: 'माती परीक्षण' } },
      {
        id: 'soil-fertility',
        title: { en: 'Soil Fertility Management', hi: 'मिट्टी उर्वरता प्रबंधन', mr: 'माती सुपीकता व्यवस्थापन' },
      },
      {
        id: 'organic-matter',
        title: { en: 'Organic Matter & Compost', hi: 'जैविक पदार्थ और खाद', mr: 'सेंद्रिय पदार्थ आणि कंपोस्ट' },
      },
    ],
    quiz: [
      {
        question: {
          en: 'Which of the following improves soil fertility?',
          hi: 'निम्नलिखित में से कौन मिट्टी की उर्वरता में सुधार करता है?',
          mr: 'खालीलपैकी कोणती गोष्ट मातीची सुपीकता सुधारते?',
        },
        options: {
          en: ['Chemical Fertilizers', 'Burning Crop Residue', 'Organic Compost', 'Over Irrigation'],
          hi: ['रासायनिक उर्वरक', 'फसल अवशेष जलाना', 'जैविक खाद', 'अत्यधिक सिंचाई'],
          mr: ['रासायनिक खते', 'पिकांचे अवशेष जाळणे', 'सेंद्रिय खत', 'अति सिंचन'],
        },
        correctIndex: 2,
      },
      {
        question: {
          en: 'What is the ideal soil pH range for most crops?',
          hi: 'अधिकांश फसलों के लिए आदर्श मिट्टी pH रेंज क्या है?',
          mr: 'बहुतेक पिकांसाठी आदर्श माती pH श्रेणी काय आहे?',
        },
        options: {
          en: ['3.0 - 4.5', '6.0 - 7.5', '9.0 - 10.0', '1.0 - 2.5'],
          hi: ['3.0 - 4.5', '6.0 - 7.5', '9.0 - 10.0', '1.0 - 2.5'],
          mr: ['3.0 - 4.5', '6.0 - 7.5', '9.0 - 10.0', '1.0 - 2.5'],
        },
        correctIndex: 1,
      },
      {
        question: {
          en: 'Crop rotation mainly helps with:',
          hi: 'फसल चक्र मुख्य रूप से किसमें मदद करता है:',
          mr: 'पीक फेरपालट मुख्यतः कशात मदत करते:',
        },
        options: {
          en: ['Faster harvesting', 'Preventing nutrient depletion', 'Reducing rainfall need', 'Increasing soil salinity'],
          hi: ['तेज़ कटाई', 'पोषक तत्वों की कमी को रोकना', 'वर्षा की आवश्यकता कम करना', 'मिट्टी की लवणता बढ़ाना'],
          mr: ['जलद कापणी', 'पोषक तत्वांची घट रोखणे', 'पावसाची गरज कमी करणे', 'मातीची क्षारता वाढवणे'],
        },
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'water-management',
    icon: '💧',
    title: { en: 'Water Management', hi: 'जल प्रबंधन', mr: 'जल व्यवस्थापन' },
    description: {
      en: 'Use water efficiently and protect your crops from drought or flooding.',
      hi: 'पानी का कुशलतापूर्वक उपयोग करें और अपनी फसलों को सूखे या बाढ़ से बचाएं।',
      mr: 'पाण्याचा कार्यक्षम वापर करा आणि तुमच्या पिकांचे दुष्काळ किंवा पुरापासून संरक्षण करा.',
    },
    lessons: [
      { id: 'irrigation-basics', title: { en: 'Irrigation Basics', hi: 'सिंचाई की मूल बातें', mr: 'सिंचनाची मूलतत्त्वे' } },
      { id: 'drip-irrigation', title: { en: 'Drip Irrigation', hi: 'ड्रिप सिंचाई', mr: 'ठिबक सिंचन' } },
      {
        id: 'rainwater-harvesting',
        title: { en: 'Rainwater Harvesting', hi: 'वर्षा जल संचयन', mr: 'पर्जन्य जल संधारण' },
      },
    ],
    quiz: [
      {
        question: {
          en: 'Which irrigation method uses water most efficiently?',
          hi: 'कौन सी सिंचाई विधि पानी का सबसे कुशल उपयोग करती है?',
          mr: 'कोणती सिंचन पद्धत पाण्याचा सर्वात कार्यक्षम वापर करते?',
        },
        options: {
          en: ['Flood irrigation', 'Drip irrigation', 'Manual watering can', 'Sprinkler at noon'],
          hi: ['बाढ़ सिंचाई', 'ड्रिप सिंचाई', 'हाथ से पानी देना', 'दोपहर में स्प्रिंकलर'],
          mr: ['पूर सिंचन', 'ठिबक सिंचन', 'हाताने पाणी देणे', 'दुपारी स्प्रिंकलर'],
        },
        correctIndex: 1,
      },
      {
        question: {
          en: 'Mulching around crops mainly helps by:',
          hi: 'फसलों के आसपास मल्चिंग मुख्य रूप से किस प्रकार मदद करती है:',
          mr: 'पिकांभोवती आच्छादन (मल्चिंग) प्रामुख्याने कशी मदत करते:',
        },
        options: {
          en: ['Increasing evaporation', 'Retaining soil moisture', 'Attracting pests', 'Lowering soil temperature only'],
          hi: ['वाष्पीकरण बढ़ाना', 'मिट्टी की नमी बनाए रखना', 'कीटों को आकर्षित करना', 'केवल मिट्टी का तापमान कम करना'],
          mr: ['बाष्पीभवन वाढवणे', 'मातीतील ओलावा टिकवणे', 'कीटकांना आकर्षित करणे', 'फक्त मातीचे तापमान कमी करणे'],
        },
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'crop-management',
    icon: '🌾',
    title: { en: 'Crop Management', hi: 'फसल प्रबंधन', mr: 'पीक व्यवस्थापन' },
    description: {
      en: 'Plan planting, spacing, and harvesting for a healthier crop cycle.',
      hi: 'एक स्वस्थ फसल चक्र के लिए रोपण, दूरी और कटाई की योजना बनाएं।',
      mr: 'निरोगी पीक चक्रासाठी लागवड, अंतर आणि कापणीचे नियोजन करा.',
    },
    lessons: [
      { id: 'crop-planning', title: { en: 'Crop Planning', hi: 'फसल योजना', mr: 'पीक नियोजन' } },
      { id: 'spacing', title: { en: 'Plant Spacing', hi: 'पौधों की दूरी', mr: 'रोपांमधील अंतर' } },
      { id: 'harvest-timing', title: { en: 'Harvest Timing', hi: 'कटाई का समय', mr: 'कापणीची वेळ' } },
    ],
    quiz: [
      {
        question: {
          en: 'Proper plant spacing mainly helps prevent:',
          hi: 'उचित पौध दूरी मुख्य रूप से किसे रोकने में मदद करती है:',
          mr: 'योग्य रोप अंतर प्रामुख्याने कशाला प्रतिबंध करण्यास मदत करते:',
        },
        options: {
          en: ['Excess sunlight', 'Competition for nutrients', 'Too much rainfall', 'Faster ripening'],
          hi: ['अत्यधिक धूप', 'पोषक तत्वों के लिए प्रतिस्पर्धा', 'बहुत अधिक वर्षा', 'तेज़ पकना'],
          mr: ['जास्त सूर्यप्रकाश', 'पोषक तत्वांसाठी स्पर्धा', 'खूप जास्त पाऊस', 'जलद पिकणे'],
        },
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'organic-farming',
    icon: '🍃',
    title: { en: 'Organic Farming', hi: 'जैविक खेती', mr: 'सेंद्रिय शेती' },
    description: {
      en: 'Grow crops without synthetic chemicals using natural methods.',
      hi: 'प्राकृतिक तरीकों का उपयोग करके बिना सिंथेटिक रसायनों के फसल उगाएं।',
      mr: 'नैसर्गिक पद्धती वापरून कृत्रिम रसायनांशिवाय पिके वाढवा.',
    },
    lessons: [
      {
        id: 'organic-basics',
        title: { en: 'Organic Farming Basics', hi: 'जैविक खेती की मूल बातें', mr: 'सेंद्रिय शेतीची मूलतत्त्वे' },
      },
      {
        id: 'natural-pesticides',
        title: { en: 'Natural Pesticides', hi: 'प्राकृतिक कीटनाशक', mr: 'नैसर्गिक कीटकनाशके' },
      },
      {
        id: 'composting',
        title: { en: 'Composting Techniques', hi: 'खाद बनाने की तकनीकें', mr: 'कंपोस्ट खत तयार करण्याचे तंत्र' },
      },
    ],
    quiz: [
      {
        question: {
          en: 'Which of these is an organic pest control method?',
          hi: 'इनमें से कौन सी एक जैविक कीट नियंत्रण विधि है?',
          mr: 'यापैकी कोणती सेंद्रिय कीड नियंत्रण पद्धत आहे?',
        },
        options: {
          en: ['Synthetic pesticide spray', 'Neem oil spray', 'Chemical fumigation', 'Plastic mulch only'],
          hi: ['सिंथेटिक कीटनाशक स्प्रे', 'नीम तेल स्प्रे', 'रासायनिक धूमन', 'केवल प्लास्टिक मल्च'],
          mr: ['कृत्रिम कीटकनाशक फवारणी', 'निंबोळी तेल फवारणी', 'रासायनिक धूरीकरण', 'फक्त प्लास्टिक आच्छादन'],
        },
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'pest-control',
    icon: '🐞',
    title: { en: 'Pest Control', hi: 'कीट नियंत्रण', mr: 'कीड नियंत्रण' },
    description: {
      en: 'Identify and manage common pests without harming your soil.',
      hi: 'अपनी मिट्टी को नुकसान पहुंचाए बिना सामान्य कीटों की पहचान करें और उनका प्रबंधन करें।',
      mr: 'मातीला हानी न पोहोचवता सामान्य कीड ओळखा आणि त्यांचे व्यवस्थापन करा.',
    },
    lessons: [
      {
        id: 'pest-identification',
        title: { en: 'Identifying Common Pests', hi: 'सामान्य कीटों की पहचान', mr: 'सामान्य कीड ओळखणे' },
      },
      {
        id: 'ipm',
        title: { en: 'Integrated Pest Management', hi: 'एकीकृत कीट प्रबंधन', mr: 'एकात्मिक कीड व्यवस्थापन' },
      },
    ],
    quiz: [
      {
        question: {
          en: 'Neem oil spray is best applied:',
          hi: 'नीम तेल स्प्रे सबसे अच्छा कब लगाया जाता है:',
          mr: 'निंबोळी तेल फवारणी सर्वोत्तम कधी करावी:',
        },
        options: {
          en: ['At noon in direct sun', 'Early morning or evening', 'Right before rain', 'Only in winter'],
          hi: ['दोपहर में सीधी धूप में', 'सुबह जल्दी या शाम को', 'बारिश से ठीक पहले', 'केवल सर्दियों में'],
          mr: ['दुपारी थेट उन्हात', 'पहाटे किंवा संध्याकाळी', 'पावसाच्या अगदी आधी', 'फक्त हिवाळ्यात'],
        },
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'sustainable-practices',
    icon: '♻️',
    title: { en: 'Sustainable Practices', hi: 'सतत कृषि पद्धतियां', mr: 'शाश्वत शेती पद्धती' },
    description: {
      en: 'Farming methods that protect long-term land and water health.',
      hi: 'कृषि विधियां जो दीर्घकालिक भूमि और जल स्वास्थ्य की रक्षा करती हैं।',
      mr: 'दीर्घकालीन जमीन आणि पाण्याचे आरोग्य जपणाऱ्या शेती पद्धती.',
    },
    lessons: [
      { id: 'crop-rotation', title: { en: 'Crop Rotation', hi: 'फसल चक्र', mr: 'पीक फेरपालट' } },
      {
        id: 'agroforestry',
        title: { en: 'Agroforestry Basics', hi: 'कृषि वानिकी की मूल बातें', mr: 'कृषी वनीकरणाची मूलतत्त्वे' },
      },
    ],
    quiz: [
      {
        question: {
          en: 'Agroforestry combines farming with:',
          hi: 'कृषि वानिकी खेती को किसके साथ जोड़ती है:',
          mr: 'कृषी वनीकरण शेतीला कशासोबत जोडते:',
        },
        options: {
          en: ['Only livestock', 'Trees and shrubs', 'Greenhouse plastic', 'Desert irrigation'],
          hi: ['केवल पशुधन', 'पेड़ और झाड़ियां', 'ग्रीनहाउस प्लास्टिक', 'रेगिस्तानी सिंचाई'],
          mr: ['फक्त पशुधन', 'झाडे आणि झुडपे', 'हरितगृह प्लास्टिक', 'वाळवंटी सिंचन'],
        },
        correctIndex: 1,
      },
    ],
  },
]

export const getTopicById = (id) => TOPICS.find((t) => t.id === id)

// Reads the right language out of an { en, hi, mr } field, falling back
// to English if a translation is ever missing for that key.
export function localize(field, lang) {
  if (!field) return ''
  return field[lang] ?? field.en ?? ''
}
