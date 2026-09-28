// Flat key -> string dictionaries, one per language. Keep keys identical
// across all three so t() can always fall back to English if a key is
// ever added to one file and forgotten in another.
//
// To add a fourth language: add an entry to LANGUAGES, copy the `en`
// object below to a new block, and translate each value.

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'mr', label: 'मराठी' },
]

export const TRANSLATIONS = {
  en: {
    'common.tagline': 'Grow Sustainably, Live Better.',
    'common.language': 'Language',
    'common.farmer': 'Farmer',
    'common.level': 'Level',
    'common.searchPlaceholder': 'Search anything...',

    'home.heroTitle': 'Grow Smarter, Farm Sustainably',
    'home.heroSubtitle': 'Free lessons, quizzes, and a rule-based advisor built for everyday farmers.',
    'home.freeBadge': '100% Free',
    'home.getStarted': 'Get Started Free',
    'home.login': 'Login',
    'home.featureTopicsTitle': 'Learn the Basics',
    'home.featureTopicsDesc': 'Bite-sized lessons on soil, water, crops, and pest control.',
    'home.featureQuizTitle': 'Test Your Knowledge',
    'home.featureQuizDesc': 'Quick quizzes turn what you learn into points and levels.',
    'home.featureAdvisorTitle': 'Get Instant Advice',
    'home.featureAdvisorDesc': 'A rule-based advisor gives practical tips for your crop and soil.',
    'home.featureLeaderboardTitle': 'Climb the Leaderboard',
    'home.featureLeaderboardDesc': 'See how you rank against farmers across the season.',
    'home.featureCommunityTitle': 'Join the Community',
    'home.featureCommunityDesc': "Ask questions and share what's working on your farm.",

    'login.welcomeBack': 'Welcome Back!',
    'login.subtitle': 'Login to continue your farming journey',
    'login.emailPlaceholder': 'Email / Phone Number',
    'login.passwordPlaceholder': 'Password',
    'login.submit': 'Login',
    'login.submitting': 'Logging in…',
    'login.noAccount': "Don't have an account?",
    'login.signUpLink': 'Sign Up',

    'signup.createAccount': 'Create Account',
    'signup.subtitle': 'Join GreenGrow and start your journey',
    'signup.namePlaceholder': 'Full Name',
    'signup.confirmPasswordPlaceholder': 'Confirm Password',
    'signup.terms': 'I agree to the Terms & Conditions',
    'signup.submit': 'Sign Up',
    'signup.submitting': 'Creating account…',
    'signup.haveAccount': 'Already have an account?',
    'signup.loginLink': 'Login',
    'signup.passwordMismatch': 'Passwords do not match.',
    'signup.agreeRequired': 'Please agree to the Terms & Conditions.',

    'errors.invalidCredential': 'Incorrect email or password.',
    'errors.emailInUse': 'An account with this email already exists.',
    'errors.weakPassword': 'Password should be at least 6 characters.',
    'errors.invalidEmail': 'Enter a valid email address.',
    'errors.generic': 'Something went wrong. Please try again.',

    'nav.dashboard': 'Dashboard',
    'nav.home': 'Home',
    'nav.topics': 'Topics',
    'nav.advisor': 'AI Advisor',
    'nav.advisorShort': 'Advisor',
    'nav.ruleBased': 'Rule-based',
    'nav.leaderboard': 'Leaderboard',
    'nav.board': 'Board',
    'nav.progress': 'Progress',
    'nav.community': 'Community',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',

    'dashboard.hello': 'Hello',
    'dashboard.subtitle': "Let's grow sustainably together.",
    'dashboard.yourPoints': 'Your Points',
    'dashboard.yourLevel': 'Your Level',
    'dashboard.quizzesCompleted': 'Quizzes Completed',
    'dashboard.farmSize': 'Farm Size',
    'dashboard.acres': 'Acres',
    'dashboard.askAdvisor': 'Ask AI Advisor',
    'dashboard.advisorDesc': 'Get farming advice based on proven rules and best practices.',
    'dashboard.todaysChallenge': "Today's Challenge",
    'dashboard.challengeDesc': 'Use Organic Fertilizer — improve soil health naturally.',
    'dashboard.points100': '+100 Points',
    'dashboard.start': 'Start',
    'dashboard.yourProgress': 'Your Progress',
    'dashboard.topicsDone': 'Topics done',
    'dashboard.daysActive': 'Days active',
    'dashboard.exploreTopics': 'Explore Main Topics',
    'dashboard.viewAll': 'View All',

    'common.loading': 'Loading…',
    'common.saving': 'Saving…',
    'common.save': 'Save',

    'topics.subtitle': 'Learn and understand important farming practices.',
    'topics.backToList': '← Topics',
    'topics.lessonsCount': '{count} Lessons',
    'topics.notFound': 'Topic not found.',
    'topics.percentComplete': '{percent}% complete',
    'topics.completed': '✓ Completed',
    'topics.markDone': 'Mark done',
    'topics.takeQuiz': 'Take Quiz',

    'quiz.backToTopicLink': '← Topic',
    'quiz.progress': 'Question {current} of {total}',
    'quiz.complete': 'Quiz Complete!',
    'quiz.scoreResult': 'You got {count} of {total} correct.',
    'quiz.pointsEarned': '+{points} points',
    'quiz.backToTopic': 'Back to Topic',
    'quiz.seeLeaderboard': 'See Leaderboard',
    'quiz.next': 'Next',
    'quiz.finish': 'Finish',

    'leaderboard.subtitle': 'Top farmers by points this season.',
    'leaderboard.empty': 'No farmers yet — be the first to earn points!',
    'leaderboard.you': '(You)',
    'leaderboard.points': '{points} pts',

    'progress.subtitle': "Track how far you've come.",
    'progress.overall': 'Overall Progress',
    'progress.quizzes': 'Quizzes',
    'progress.points': 'Points',
    'progress.topicProgress': 'Topic Progress',

    'community.subtitle': 'Ask questions, share tips and success stories.',
    'community.placeholder': 'Write your question or share something…',
    'community.post': 'Post',
    'community.empty': 'No posts yet — start the conversation!',
    'community.justNow': 'just now',
    'community.minutesAgo': '{minutes}m ago',
    'community.hoursAgo': '{hours}h ago',

    'profile.farmSize': 'Farm Size (acres)',

    'advisor.subtitle': 'Get simple, practical recommendations for your farm.',
    'advisor.selectCrop': 'Select Crop',
    'advisor.soilType': 'Soil Type',
    'advisor.waterAvailability': 'Water Availability',
    'advisor.season': 'Season',
    'advisor.getRecommendation': 'Get Recommendation',
    'advisor.recommendation': 'Recommendation',
    'advisor.emptyState': 'Fill in the form and tap "Get Recommendation".',
    'advisor.selectPlaceholder': 'Select…',

    'advisor.crop.tomato': 'Tomato',
    'advisor.crop.rice': 'Rice',
    'advisor.crop.wheat': 'Wheat',
    'advisor.crop.cotton': 'Cotton',
    'advisor.crop.sugarcane': 'Sugarcane',
    'advisor.crop.maize': 'Maize',
    'advisor.soil.loamy': 'Loamy',
    'advisor.soil.sandy': 'Sandy',
    'advisor.soil.clay': 'Clay',
    'advisor.soil.silt': 'Silt',
    'advisor.water.low': 'Low',
    'advisor.water.medium': 'Medium',
    'advisor.water.high': 'High',
    'advisor.season.summer': 'Summer',
    'advisor.season.monsoon': 'Monsoon',
    'advisor.season.winter': 'Winter',

    'advisor.tip.dripIrrigation': 'Use drip irrigation to save water',
    'advisor.tip.mulchSummer': 'Apply mulch to retain soil moisture',
    'advisor.tip.compostLoamy': 'Apply organic compost to improve soil health',
    'advisor.tip.compostSandy': 'Add compost and organic matter — sandy soil drains fast and loses nutrients quickly',
    'advisor.tip.drainageClay': 'Improve drainage with organic matter to prevent waterlogging',
    'advisor.tip.tomatoStake': 'Stake or cage plants and watch for early signs of blight',
    'advisor.tip.tomatoNeem': 'Prefer neem oil spray for pest control over synthetic pesticides',
    'advisor.tip.riceWater': 'Maintain consistent standing water depth of 2–5 cm during vegetative growth',
    'advisor.tip.wheatSow': 'Sow before the first week of the season window for best yield',
    'advisor.tip.monsoonDrainage': 'Ensure field drainage channels are clear before heavy rain',
    'advisor.tip.fillForm': 'Fill in crop, soil type, water availability, and season for tailored advice.',

    'advisor.tag.higherYield': 'Higher yield',
    'advisor.tag.saveWater': 'Save water',
    'advisor.tag.restoreSoil': 'Restore soil',
    // ================= HOME EXTRA =================

'home.smartBadge': 'Smart & Sustainable Agriculture',
'home.heroHeading1': 'Grow Knowledge.',
'home.heroHeading2': 'Grow Better.',
'home.heroDescription':
  'GreenGrow is a learning platform that helps farmers and agriculture learners discover sustainable farming practices, test their knowledge and get personalized guidance.',
'home.startLearning': 'Start Learning →',
'home.exploreServices': 'Explore Services',

'home.learningFeatures': 'Learning Features',
'home.smartAdvisor': 'Smart Advisor',
'home.learningFocused': 'Learning Focused',
'home.learn': 'Learn',
'home.ai': 'AI',
'home.achieve': 'Achieve',

'home.aboutLabel': 'About GreenGrow',
'home.aboutTitle': 'Making agricultural learning simple',
'home.aboutDescription':
  'GreenGrow combines educational content, quizzes, progress tracking, community interaction and an AI-powered advisor into one easy-to-use platform.',

'home.sustainable': 'Sustainable',
'home.sustainableDesc':
  'Discover environmentally responsible farming practices.',

'home.educational': 'Educational',
'home.educationalDesc':
  'Learn through structured topics, lessons and quizzes.',

'home.intelligent': 'Intelligent',
'home.intelligentDesc':
  'Get personalized assistance through the AI advisor.',

'home.servicesLabel': 'Our Services',
'home.servicesTitle': 'Everything you need to grow',
'home.servicesDescription':
  'Explore tools designed to make agricultural learning engaging and practical.',

'home.ctaTitle': 'Ready to grow your knowledge?',
'home.ctaDescription':
  'Join GreenGrow and start learning sustainable farming practices today.',
'home.createAccount': 'Create Free Account →',

'home.contactLabel': 'Contact',
'home.contactTitle': 'Have questions?',
'home.contactDescription':
  "We'd love to hear from you. Connect with the GreenGrow team.",
'home.support': 'GreenGrow Support',
'home.footerDescription': 'Smart learning for sustainable agriculture.',
'home.footerRights': 'All rights reserved.',


// ================= NAVBAR =================

'nav.about': 'About',
'nav.services': 'Services',
'nav.contact': 'Contact',
'nav.getStarted': 'Get Started',
'nav.openMenu': 'Open menu',
'nav.closeMenu': 'Close menu',


// ================= LOGIN EXTRA =================

'login.title': 'Welcome Back',
'login.description': 'Login to continue your GreenGrow journey.',
'login.emailLabel': 'Email',
'login.passwordLabel': 'Password',
'login.emailPlaceholderFull': 'Enter your email',
'login.passwordPlaceholderFull': 'Enter your password',
'login.loading': 'Logging in...',
'login.google': 'Continue with Google',
'login.or': 'OR',
'login.createAccount': 'Create Account',


// ================= SIGNUP EXTRA =================

'signup.title': 'Create Your Account',
'signup.description': 'Start your sustainable farming learning journey.',
'signup.nameLabel': 'Full Name',
'signup.emailLabel': 'Email',
'signup.passwordLabel': 'Password',
'signup.confirmPasswordLabel': 'Confirm Password',
'signup.namePlaceholderFull': 'Enter your name',
'signup.emailPlaceholderFull': 'Enter your email',
'signup.passwordPlaceholderFull': 'Create a password',
'signup.confirmPasswordPlaceholderFull': 'Confirm your password',
'signup.loading': 'Creating account...',
'signup.google': 'Continue with Google',
'signup.or': 'OR',


// ================= ERRORS =================

'errors.passwordMismatch': 'Passwords do not match.',
'errors.agreeRequired': 'Please agree to the Terms & Conditions.',
'errors.userDisabled': 'This account has been disabled.',
'errors.googleCancelled': 'Google sign-in was cancelled.',
'errors.googlePopupBlocked':
  'The Google sign-in popup was blocked. Please allow popups and try again.',
'errors.differentCredential':
  'An account already exists with this email using another sign-in method.',
'errors.tooManyRequests':
  'Too many attempts. Please try again later.',
  'home.trackProgressTitle': 'Track Progress',
'home.trackProgressDesc':
  'Monitor your learning journey, completed lessons, quizzes and achievements.',
  },

  hi: {
    'common.tagline': 'स्थायी रूप से उगाएं, बेहतर जिएं।',
    'common.language': 'भाषा',
    'common.farmer': 'किसान',
    'common.level': 'स्तर',
    'common.searchPlaceholder': 'कुछ भी खोजें...',

    'home.heroTitle': 'समझदारी से उगाएं, टिकाऊ खेती करें',
    'home.heroSubtitle': 'हर किसान के लिए मुफ़्त पाठ, क्विज़ और नियम-आधारित सलाहकार।',
    'home.freeBadge': '100% मुफ़्त',
    'home.getStarted': 'मुफ़्त में शुरू करें',
    'home.login': 'लॉगिन करें',
    'home.featureTopicsTitle': 'बुनियादी बातें सीखें',
    'home.featureTopicsDesc': 'मिट्टी, पानी, फसल और कीट नियंत्रण पर संक्षिप्त पाठ।',
    'home.featureQuizTitle': 'अपना ज्ञान परखें',
    'home.featureQuizDesc': 'छोटी क्विज़ से जो सीखा उसे अंक और स्तर में बदलें।',
    'home.featureAdvisorTitle': 'तुरंत सलाह पाएं',
    'home.featureAdvisorDesc': 'नियम-आधारित सलाहकार आपकी फसल और मिट्टी के लिए व्यावहारिक सुझाव देता है।',
    'home.featureLeaderboardTitle': 'लीडरबोर्ड में आगे बढ़ें',
    'home.featureLeaderboardDesc': 'देखें कि इस सीज़न में आप अन्य किसानों की तुलना में कहां खड़े हैं।',
    'home.featureCommunityTitle': 'समुदाय से जुड़ें',
    'home.featureCommunityDesc': 'सवाल पूछें और अपने खेत में जो काम कर रहा है उसे साझा करें।',

    'login.welcomeBack': 'पुनः स्वागत है!',
    'login.subtitle': 'अपनी खेती की यात्रा जारी रखने के लिए लॉगिन करें',
    'login.emailPlaceholder': 'ईमेल / फ़ोन नंबर',
    'login.passwordPlaceholder': 'पासवर्ड',
    'login.submit': 'लॉगिन करें',
    'login.submitting': 'लॉगिन हो रहा है…',
    'login.noAccount': 'खाता नहीं है?',
    'login.signUpLink': 'साइन अप करें',

    'signup.createAccount': 'खाता बनाएं',
    'signup.subtitle': 'GreenGrow से जुड़ें और अपनी यात्रा शुरू करें',
    'signup.namePlaceholder': 'पूरा नाम',
    'signup.confirmPasswordPlaceholder': 'पासवर्ड की पुष्टि करें',
    'signup.terms': 'मैं नियम और शर्तों से सहमत हूं',
    'signup.submit': 'साइन अप करें',
    'signup.submitting': 'खाता बनाया जा रहा है…',
    'signup.haveAccount': 'पहले से खाता है?',
    'signup.loginLink': 'लॉगिन करें',
    'signup.passwordMismatch': 'पासवर्ड मेल नहीं खाते।',
    'signup.agreeRequired': 'कृपया नियम और शर्तों से सहमत हों।',

    'errors.invalidCredential': 'गलत ईमेल या पासवर्ड।',
    'errors.emailInUse': 'इस ईमेल से पहले से एक खाता मौजूद है।',
    'errors.weakPassword': 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।',
    'errors.invalidEmail': 'मान्य ईमेल पता दर्ज करें।',
    'errors.generic': 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।',

    'nav.dashboard': 'डैशबोर्ड',
    'nav.home': 'होम',
    'nav.topics': 'विषय',
    'nav.advisor': 'एआई सलाहकार',
    'nav.advisorShort': 'सलाहकार',
    'nav.ruleBased': 'नियम-आधारित',
    'nav.leaderboard': 'लीडरबोर्ड',
    'nav.board': 'बोर्ड',
    'nav.progress': 'प्रगति',
    'nav.community': 'समुदाय',
    'nav.profile': 'प्रोफ़ाइल',
    'nav.logout': 'लॉगआउट',

    'dashboard.hello': 'नमस्ते',
    'dashboard.subtitle': 'आइए मिलकर स्थायी रूप से आगे बढ़ें।',
    'dashboard.yourPoints': 'आपके अंक',
    'dashboard.yourLevel': 'आपका स्तर',
    'dashboard.quizzesCompleted': 'पूर्ण किए गए क्विज़',
    'dashboard.farmSize': 'खेत का आकार',
    'dashboard.acres': 'एकड़',
    'dashboard.askAdvisor': 'एआई सलाहकार से पूछें',
    'dashboard.advisorDesc': 'सिद्ध नियमों और सर्वोत्तम प्रथाओं के आधार पर खेती की सलाह पाएं।',
    'dashboard.todaysChallenge': 'आज की चुनौती',
    'dashboard.challengeDesc': 'जैविक उर्वरक का उपयोग करें — मिट्टी के स्वास्थ्य को स्वाभाविक रूप से सुधारें।',
    'dashboard.points100': '+100 अंक',
    'dashboard.start': 'शुरू करें',
    'dashboard.yourProgress': 'आपकी प्रगति',
    'dashboard.topicsDone': 'पूर्ण किए गए विषय',
    'dashboard.daysActive': 'सक्रिय दिन',
    'dashboard.exploreTopics': 'मुख्य विषय देखें',
    'dashboard.viewAll': 'सभी देखें',

    'common.loading': 'लोड हो रहा है…',
    'common.saving': 'सहेजा जा रहा है…',
    'common.save': 'सहेजें',

    'topics.subtitle': 'महत्वपूर्ण कृषि पद्धतियों को सीखें और समझें।',
    'topics.backToList': '← विषय',
    'topics.lessonsCount': '{count} पाठ',
    'topics.notFound': 'विषय नहीं मिला।',
    'topics.percentComplete': '{percent}% पूर्ण',
    'topics.completed': '✓ पूर्ण',
    'topics.markDone': 'पूर्ण करें',
    'topics.takeQuiz': 'क्विज़ लें',

    'quiz.backToTopicLink': '← विषय',
    'quiz.progress': '{total} में से प्रश्न {current}',
    'quiz.complete': 'क्विज़ पूरा हुआ!',
    'quiz.scoreResult': 'आपने {total} में से {count} सही किए।',
    'quiz.pointsEarned': '+{points} अंक',
    'quiz.backToTopic': 'विषय पर वापस जाएं',
    'quiz.seeLeaderboard': 'लीडरबोर्ड देखें',
    'quiz.next': 'अगला',
    'quiz.finish': 'समाप्त करें',

    'leaderboard.subtitle': 'इस सीज़न में अंकों के आधार पर शीर्ष किसान।',
    'leaderboard.empty': 'अभी तक कोई किसान नहीं — अंक अर्जित करने वाले पहले बनें!',
    'leaderboard.you': '(आप)',
    'leaderboard.points': '{points} अंक',

    'progress.subtitle': 'देखें आपने कितनी प्रगति की है।',
    'progress.overall': 'कुल प्रगति',
    'progress.quizzes': 'क्विज़',
    'progress.points': 'अंक',
    'progress.topicProgress': 'विषय प्रगति',

    'community.subtitle': 'प्रश्न पूछें, सुझाव और सफलता की कहानियां साझा करें।',
    'community.placeholder': 'अपना प्रश्न लिखें या कुछ साझा करें…',
    'community.post': 'पोस्ट करें',
    'community.empty': 'अभी तक कोई पोस्ट नहीं — बातचीत शुरू करें!',
    'community.justNow': 'अभी अभी',
    'community.minutesAgo': '{minutes} मिनट पहले',
    'community.hoursAgo': '{hours} घंटे पहले',

    'profile.farmSize': 'खेत का आकार (एकड़)',

    'advisor.subtitle': 'अपने खेत के लिए सरल, व्यावहारिक सुझाव पाएं।',
    'advisor.selectCrop': 'फसल चुनें',
    'advisor.soilType': 'मिट्टी का प्रकार',
    'advisor.waterAvailability': 'जल उपलब्धता',
    'advisor.season': 'मौसम',
    'advisor.getRecommendation': 'सुझाव पाएं',
    'advisor.recommendation': 'सुझाव',
    'advisor.emptyState': 'फॉर्म भरें और "सुझाव पाएं" पर टैप करें।',
    'advisor.selectPlaceholder': 'चुनें…',

    'advisor.crop.tomato': 'टमाटर',
    'advisor.crop.rice': 'धान',
    'advisor.crop.wheat': 'गेहूं',
    'advisor.crop.cotton': 'कपास',
    'advisor.crop.sugarcane': 'गन्ना',
    'advisor.crop.maize': 'मक्का',
    'advisor.soil.loamy': 'दोमट मिट्टी',
    'advisor.soil.sandy': 'बलुई मिट्टी',
    'advisor.soil.clay': 'चिकनी मिट्टी',
    'advisor.soil.silt': 'गाद मिट्टी',
    'advisor.water.low': 'कम',
    'advisor.water.medium': 'मध्यम',
    'advisor.water.high': 'अधिक',
    'advisor.season.summer': 'गर्मी',
    'advisor.season.monsoon': 'मानसून',
    'advisor.season.winter': 'सर्दी',

    'advisor.tip.dripIrrigation': 'पानी बचाने के लिए ड्रिप सिंचाई का उपयोग करें',
    'advisor.tip.mulchSummer': 'मिट्टी की नमी बनाए रखने के लिए मल्च लगाएं',
    'advisor.tip.compostLoamy': 'मिट्टी के स्वास्थ्य को सुधारने के लिए जैविक खाद डालें',
    'advisor.tip.compostSandy':
      'खाद और जैविक पदार्थ मिलाएं — बलुई मिट्टी से पानी तेज़ी से निकलता है और पोषक तत्व जल्दी खत्म हो जाते हैं',
    'advisor.tip.drainageClay': 'जलभराव को रोकने के लिए जैविक पदार्थ से जल निकासी में सुधार करें',
    'advisor.tip.tomatoStake': 'पौधों को सहारा दें या पिंजरे में रखें और झुलसा रोग के शुरुआती लक्षणों पर नज़र रखें',
    'advisor.tip.tomatoNeem': 'कीट नियंत्रण के लिए सिंथेटिक कीटनाशकों की जगह नीम तेल स्प्रे को प्राथमिकता दें',
    'advisor.tip.riceWater': 'वानस्पतिक वृद्धि के दौरान 2-5 सेमी खड़े पानी की गहराई बनाए रखें',
    'advisor.tip.wheatSow': 'सर्वोत्तम पैदावार के लिए मौसम की पहली सप्ताह से पहले बुवाई करें',
    'advisor.tip.monsoonDrainage': 'भारी बारिश से पहले खेत की जल निकासी नालियों को साफ रखें',
    'advisor.tip.fillForm': 'व्यक्तिगत सलाह के लिए फसल, मिट्टी का प्रकार, जल उपलब्धता और मौसम भरें।',

    'advisor.tag.higherYield': 'अधिक पैदावार',
    'advisor.tag.saveWater': 'पानी बचाएं',
    'advisor.tag.restoreSoil': 'मिट्टी सुधारें',
    // ================= HOME EXTRA =================

'home.smartBadge': 'स्मार्ट और टिकाऊ कृषि',
'home.heroHeading1': 'ज्ञान बढ़ाएं।',
'home.heroHeading2': 'बेहतर खेती करें।',
'home.heroDescription':
  'GreenGrow एक लर्निंग प्लेटफॉर्म है जो किसानों और कृषि शिक्षार्थियों को टिकाऊ खेती के तरीकों को सीखने, अपने ज्ञान का परीक्षण करने और व्यक्तिगत मार्गदर्शन प्राप्त करने में मदद करता है।',
'home.startLearning': 'सीखना शुरू करें →',
'home.exploreServices': 'सेवाएं देखें',

'home.learningFeatures': 'लर्निंग फीचर्स',
'home.smartAdvisor': 'स्मार्ट सलाहकार',
'home.learningFocused': 'सीखने पर केंद्रित',
'home.learn': 'सीखें',
'home.ai': 'एआई',
'home.achieve': 'उपलब्धि',

'home.aboutLabel': 'GreenGrow के बारे में',
'home.aboutTitle': 'कृषि सीखने को आसान बनाना',
'home.aboutDescription':
  'GreenGrow शैक्षिक सामग्री, क्विज़, प्रगति ट्रैकिंग, सामुदायिक बातचीत और एआई सलाहकार को एक आसान प्लेटफॉर्म में जोड़ता है।',

'home.sustainable': 'टिकाऊ',
'home.sustainableDesc':
  'पर्यावरण के अनुकूल खेती के तरीकों की जानकारी प्राप्त करें.',

'home.educational': 'शैक्षिक',
'home.educationalDesc':
  'संरचित विषयों, पाठों और क्विज़ के माध्यम से सीखें।',

'home.intelligent': 'बुद्धिमान',
'home.intelligentDesc':
  'एआई सलाहकार के माध्यम से व्यक्तिगत सहायता प्राप्त करें।',

'home.servicesLabel': 'हमारी सेवाएं',
'home.servicesTitle': 'बेहतर खेती सीखने के लिए सब कुछ',
'home.servicesDescription':
  'कृषि सीखने को रोचक और व्यावहारिक बनाने के लिए बनाए गए टूल देखें।',

'home.ctaTitle': 'अपना ज्ञान बढ़ाने के लिए तैयार हैं?',
'home.ctaDescription':
  'GreenGrow से जुड़ें और आज से टिकाऊ खेती सीखना शुरू करें।',
'home.createAccount': 'मुफ़्त खाता बनाएं →',

'home.contactLabel': 'संपर्क',
'home.contactTitle': 'कोई सवाल है?',
'home.contactDescription':
  'हम आपसे सुनना पसंद करेंगे। GreenGrow टीम से जुड़ें।',
'home.support': 'GreenGrow सहायता',
'home.footerDescription': 'टिकाऊ कृषि के लिए स्मार्ट लर्निंग।',
'home.footerRights': 'सर्वाधिकार सुरक्षित।',


// ================= NAVBAR =================

'nav.about': 'हमारे बारे में',
'nav.services': 'सेवाएं',
'nav.contact': 'संपर्क',
'nav.getStarted': 'शुरू करें',
'nav.openMenu': 'मेनू खोलें',
'nav.closeMenu': 'मेनू बंद करें',


// ================= LOGIN EXTRA =================

'login.title': 'पुनः स्वागत है',
'login.description': 'अपनी GreenGrow यात्रा जारी रखने के लिए लॉगिन करें।',
'login.emailLabel': 'ईमेल',
'login.passwordLabel': 'पासवर्ड',
'login.emailPlaceholderFull': 'अपना ईमेल दर्ज करें',
'login.passwordPlaceholderFull': 'अपना पासवर्ड दर्ज करें',
'login.loading': 'लॉगिन हो रहा है...',
'login.google': 'Google के साथ जारी रखें',
'login.or': 'या',
'login.createAccount': 'खाता बनाएं',


// ================= SIGNUP EXTRA =================

'signup.title': 'अपना खाता बनाएं',
'signup.description': 'अपनी टिकाऊ कृषि सीखने की यात्रा शुरू करें।',
'signup.nameLabel': 'पूरा नाम',
'signup.emailLabel': 'ईमेल',
'signup.passwordLabel': 'पासवर्ड',
'signup.confirmPasswordLabel': 'पासवर्ड की पुष्टि करें',
'signup.namePlaceholderFull': 'अपना नाम दर्ज करें',
'signup.emailPlaceholderFull': 'अपना ईमेल दर्ज करें',
'signup.passwordPlaceholderFull': 'पासवर्ड बनाएं',
'signup.confirmPasswordPlaceholderFull': 'अपना पासवर्ड दोबारा दर्ज करें',
'signup.loading': 'खाता बनाया जा रहा है...',
'signup.google': 'Google के साथ जारी रखें',
'signup.or': 'या',


// ================= ERRORS =================

'errors.passwordMismatch': 'पासवर्ड मेल नहीं खाते।',
'errors.agreeRequired': 'कृपया नियम और शर्तों से सहमत हों।',
'errors.userDisabled': 'यह खाता बंद कर दिया गया है।',
'errors.googleCancelled': 'Google साइन-इन रद्द कर दिया गया।',
'errors.googlePopupBlocked':
  'Google साइन-इन पॉपअप ब्लॉक हो गया है। कृपया पॉपअप की अनुमति दें और फिर प्रयास करें।',
'errors.differentCredential':
  'इस ईमेल से पहले से एक खाता किसी अन्य साइन-इन तरीके से मौजूद है।',
'errors.tooManyRequests':
  'बहुत अधिक प्रयास किए गए। कृपया बाद में पुनः प्रयास करें।',
  'home.trackProgressTitle': 'प्रगति देखें',
'home.trackProgressDesc':
  'अपनी सीखने की यात्रा, पूरी की गई सीख, क्विज़ और उपलब्धियों पर नज़र रखें।',
  },

  mr: {
    'common.tagline': 'शाश्वत पद्धतीने पिकवा, अधिक चांगले जगा.',
    'common.language': 'भाषा',
    'common.farmer': 'शेतकरी',
    'common.level': 'पातळी',
    'common.searchPlaceholder': 'काहीही शोधा...',

    'home.heroTitle': 'हुशारीने पिकवा, शाश्वत शेती करा',
    'home.heroSubtitle': 'प्रत्येक शेतकऱ्यासाठी मोफत धडे, क्विझ आणि नियम-आधारित सल्लागार.',
    'home.freeBadge': '100% मोफत',
    'home.getStarted': 'मोफत सुरू करा',
    'home.login': 'लॉगिन करा',
    'home.featureTopicsTitle': 'मूलभूत गोष्टी शिका',
    'home.featureTopicsDesc': 'माती, पाणी, पिके आणि कीड नियंत्रणावरील छोटे धडे.',
    'home.featureQuizTitle': 'तुमचे ज्ञान तपासा',
    'home.featureQuizDesc': 'छोट्या क्विझमधून शिकलेल्या गोष्टींचे गुण आणि पातळीत रूपांतर करा.',
    'home.featureAdvisorTitle': 'तात्काळ सल्ला मिळवा',
    'home.featureAdvisorDesc': 'नियम-आधारित सल्लागार तुमच्या पिकासाठी आणि मातीसाठी व्यावहारिक सूचना देतो.',
    'home.featureLeaderboardTitle': 'लीडरबोर्डवर पुढे जा',
    'home.featureLeaderboardDesc': 'या हंगामात तुम्ही इतर शेतकऱ्यांच्या तुलनेत कुठे आहात ते पहा.',
    'home.featureCommunityTitle': 'समुदायात सामील व्हा',
    'home.featureCommunityDesc': 'प्रश्न विचारा आणि तुमच्या शेतात काय चांगले काम करत आहे ते शेअर करा.',

    'login.welcomeBack': 'पुन्हा स्वागत आहे!',
    'login.subtitle': 'तुमचा शेतीचा प्रवास सुरू ठेवण्यासाठी लॉगिन करा',
    'login.emailPlaceholder': 'ईमेल / फोन नंबर',
    'login.passwordPlaceholder': 'पासवर्ड',
    'login.submit': 'लॉगिन करा',
    'login.submitting': 'लॉगिन होत आहे…',
    'login.noAccount': 'खाते नाही?',
    'login.signUpLink': 'साइन अप करा',

    'signup.createAccount': 'खाते तयार करा',
    'signup.subtitle': 'GreenGrow मध्ये सामील व्हा आणि तुमचा प्रवास सुरू करा',
    'signup.namePlaceholder': 'पूर्ण नाव',
    'signup.confirmPasswordPlaceholder': 'पासवर्डची पुष्टी करा',
    'signup.terms': 'मी अटी व शर्तींशी सहमत आहे',
    'signup.submit': 'साइन अप करा',
    'signup.submitting': 'खाते तयार होत आहे…',
    'signup.haveAccount': 'आधीच खाते आहे?',
    'signup.loginLink': 'लॉगिन करा',
    'signup.passwordMismatch': 'पासवर्ड जुळत नाहीत.',
    'signup.agreeRequired': 'कृपया अटी व शर्तींशी सहमत व्हा.',

    'errors.invalidCredential': 'चुकीचा ईमेल किंवा पासवर्ड.',
    'errors.emailInUse': 'या ईमेलने आधीच एक खाते अस्तित्वात आहे.',
    'errors.weakPassword': 'पासवर्ड किमान 6 अक्षरांचा असावा.',
    'errors.invalidEmail': 'वैध ईमेल पत्ता टाका.',
    'errors.generic': 'काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.',

    'nav.dashboard': 'डॅशबोर्ड',
    'nav.home': 'होम',
    'nav.topics': 'विषय',
    'nav.advisor': 'एआय सल्लागार',
    'nav.advisorShort': 'सल्लागार',
    'nav.ruleBased': 'नियम-आधारित',
    'nav.leaderboard': 'लीडरबोर्ड',
    'nav.board': 'बोर्ड',
    'nav.progress': 'प्रगती',
    'nav.community': 'समुदाय',
    'nav.profile': 'प्रोफाइल',
    'nav.logout': 'लॉगआउट',

    'dashboard.hello': 'नमस्कार',
    'dashboard.subtitle': 'चला एकत्र शाश्वतपणे वाढूया.',
    'dashboard.yourPoints': 'तुमचे गुण',
    'dashboard.yourLevel': 'तुमची पातळी',
    'dashboard.quizzesCompleted': 'पूर्ण झालेल्या क्विझ',
    'dashboard.farmSize': 'शेताचा आकार',
    'dashboard.acres': 'एकर',
    'dashboard.askAdvisor': 'एआय सल्लागाराला विचारा',
    'dashboard.advisorDesc': 'सिद्ध नियम आणि उत्तम पद्धतींवर आधारित शेतीचा सल्ला मिळवा.',
    'dashboard.todaysChallenge': 'आजचे आव्हान',
    'dashboard.challengeDesc': 'सेंद्रिय खताचा वापर करा — मातीचे आरोग्य नैसर्गिकरित्या सुधारा.',
    'dashboard.points100': '+100 गुण',
    'dashboard.start': 'सुरू करा',
    'dashboard.yourProgress': 'तुमची प्रगती',
    'dashboard.topicsDone': 'पूर्ण झालेले विषय',
    'dashboard.daysActive': 'सक्रिय दिवस',
    'dashboard.exploreTopics': 'मुख्य विषय एक्सप्लोर करा',
    'dashboard.viewAll': 'सर्व पहा',

    'common.loading': 'लोड होत आहे…',
    'common.saving': 'जतन होत आहे…',
    'common.save': 'जतन करा',

    'topics.subtitle': 'महत्त्वाच्या शेती पद्धती शिका आणि समजून घ्या.',
    'topics.backToList': '← विषय',
    'topics.lessonsCount': '{count} धडे',
    'topics.notFound': 'विषय सापडला नाही.',
    'topics.percentComplete': '{percent}% पूर्ण',
    'topics.completed': '✓ पूर्ण',
    'topics.markDone': 'पूर्ण करा',
    'topics.takeQuiz': 'क्विझ सोडवा',

    'quiz.backToTopicLink': '← विषय',
    'quiz.progress': '{total} पैकी प्रश्न {current}',
    'quiz.complete': 'क्विझ पूर्ण झाली!',
    'quiz.scoreResult': 'तुम्ही {total} पैकी {count} बरोबर दिले.',
    'quiz.pointsEarned': '+{points} गुण',
    'quiz.backToTopic': 'विषयाकडे परत जा',
    'quiz.seeLeaderboard': 'लीडरबोर्ड पहा',
    'quiz.next': 'पुढे',
    'quiz.finish': 'पूर्ण करा',

    'leaderboard.subtitle': 'या हंगामातील गुणांनुसार आघाडीचे शेतकरी.',
    'leaderboard.empty': 'अजून कोणी शेतकरी नाही — गुण मिळवणारे पहिले व्हा!',
    'leaderboard.you': '(तुम्ही)',
    'leaderboard.points': '{points} गुण',

    'progress.subtitle': 'तुम्ही किती प्रगती केली आहे ते पहा.',
    'progress.overall': 'एकूण प्रगती',
    'progress.quizzes': 'क्विझ',
    'progress.points': 'गुण',
    'progress.topicProgress': 'विषय प्रगती',

    'community.subtitle': 'प्रश्न विचारा, टिप्स आणि यशोगाथा शेअर करा.',
    'community.placeholder': 'तुमचा प्रश्न लिहा किंवा काहीतरी शेअर करा…',
    'community.post': 'पोस्ट करा',
    'community.empty': 'अजून पोस्ट नाही — संभाषण सुरू करा!',
    'community.justNow': 'आत्ताच',
    'community.minutesAgo': '{minutes} मिनिटांपूर्वी',
    'community.hoursAgo': '{hours} तासांपूर्वी',

    'profile.farmSize': 'शेताचा आकार (एकर)',

    'advisor.subtitle': 'तुमच्या शेतासाठी सोपे, व्यावहारिक सल्ले मिळवा.',
    'advisor.selectCrop': 'पीक निवडा',
    'advisor.soilType': 'मातीचा प्रकार',
    'advisor.waterAvailability': 'पाण्याची उपलब्धता',
    'advisor.season': 'हंगाम',
    'advisor.getRecommendation': 'सल्ला मिळवा',
    'advisor.recommendation': 'सल्ला',
    'advisor.emptyState': 'फॉर्म भरा आणि "सल्ला मिळवा" वर टॅप करा.',
    'advisor.selectPlaceholder': 'निवडा…',

    'advisor.crop.tomato': 'टोमॅटो',
    'advisor.crop.rice': 'भात',
    'advisor.crop.wheat': 'गहू',
    'advisor.crop.cotton': 'कापूस',
    'advisor.crop.sugarcane': 'ऊस',
    'advisor.crop.maize': 'मका',
    'advisor.soil.loamy': 'पोयट्याची माती',
    'advisor.soil.sandy': 'वालुकामय माती',
    'advisor.soil.clay': 'चिकण माती',
    'advisor.soil.silt': 'गाळाची माती',
    'advisor.water.low': 'कमी',
    'advisor.water.medium': 'मध्यम',
    'advisor.water.high': 'जास्त',
    'advisor.season.summer': 'उन्हाळा',
    'advisor.season.monsoon': 'पावसाळा',
    'advisor.season.winter': 'हिवाळा',

    'advisor.tip.dripIrrigation': 'पाणी वाचवण्यासाठी ठिबक सिंचन वापरा',
    'advisor.tip.mulchSummer': 'मातीतील ओलावा टिकवण्यासाठी आच्छादन (मल्चिंग) करा',
    'advisor.tip.compostLoamy': 'मातीचे आरोग्य सुधारण्यासाठी सेंद्रिय खत टाका',
    'advisor.tip.compostSandy':
      'कंपोस्ट आणि सेंद्रिय पदार्थ मिसळा — वालुकामय मातीतून पाणी लवकर निचरा होते आणि पोषक घटक लवकर कमी होतात',
    'advisor.tip.drainageClay': 'पाणी साचणे टाळण्यासाठी सेंद्रिय पदार्थांनी निचरा सुधारावा',
    'advisor.tip.tomatoStake': 'रोपांना आधार द्या किंवा पिंजऱ्यात ठेवा आणि करपा रोगाच्या सुरुवातीच्या लक्षणांवर लक्ष ठेवा',
    'advisor.tip.tomatoNeem': 'कीड नियंत्रणासाठी कृत्रिम कीटकनाशकांऐवजी निंबोळी तेल फवारणीला प्राधान्य द्या',
    'advisor.tip.riceWater': 'वाढीच्या काळात शेतात सातत्याने 2-5 सेमी पाणी साचलेले ठेवा',
    'advisor.tip.wheatSow': 'उत्तम उत्पादनासाठी हंगामाच्या पहिल्या आठवड्याआधी पेरणी करा',
    'advisor.tip.monsoonDrainage': 'मुसळधार पावसापूर्वी शेतातील पाणी वाहून जाण्याचे मार्ग मोकळे ठेवा',
    'advisor.tip.fillForm': 'सानुकूल सल्ल्यासाठी पीक, मातीचा प्रकार, पाण्याची उपलब्धता आणि हंगाम भरा.',

    'advisor.tag.higherYield': 'अधिक उत्पादन',
    'advisor.tag.saveWater': 'पाणी वाचवा',
    'advisor.tag.restoreSoil': 'माती सुधारणा',
    // ================= HOME EXTRA =================

'home.smartBadge': 'स्मार्ट आणि शाश्वत शेती',
'home.heroHeading1': 'ज्ञान वाढवा.',
'home.heroHeading2': 'शेती अधिक चांगली करा.',
'home.heroDescription':
  'GreenGrow हे एक शिक्षण व्यासपीठ आहे जे शेतकरी आणि कृषी शिकणाऱ्यांना शाश्वत शेती पद्धती जाणून घेण्यास, ज्ञानाची चाचणी घेण्यास आणि वैयक्तिक मार्गदर्शन मिळविण्यास मदत करते.',
'home.startLearning': 'शिकण्यास सुरुवात करा →',
'home.exploreServices': 'सेवा पहा',

'home.learningFeatures': 'शिकण्याची वैशिष्ट्ये',
'home.smartAdvisor': 'स्मार्ट सल्लागार',
'home.learningFocused': 'शिकण्यावर केंद्रित',
'home.learn': 'शिका',
'home.ai': 'एआय',
'home.achieve': 'यश',

'home.aboutLabel': 'GreenGrow बद्दल',
'home.aboutTitle': 'कृषी शिक्षण सोपे बनवणे',
'home.aboutDescription':
  'GreenGrow शैक्षणिक सामग्री, क्विझ, प्रगतीचा मागोवा, समुदाय संवाद आणि एआय सल्लागार एका सोप्या व्यासपीठात एकत्र आणते.',

'home.sustainable': 'शाश्वत',
'home.sustainableDesc':
  'पर्यावरणपूरक शेती पद्धती जाणून घ्या.',

'home.educational': 'शैक्षणिक',
'home.educationalDesc':
  'संरचित विषय, धडे आणि क्विझद्वारे शिका.',

'home.intelligent': 'बुद्धिमान',
'home.intelligentDesc':
  'एआय सल्लागाराद्वारे वैयक्तिक मदत मिळवा.',

'home.servicesLabel': 'आमच्या सेवा',
'home.servicesTitle': 'शिकण्यासाठी आवश्यक सर्व काही',
'home.servicesDescription':
  'कृषी शिक्षण अधिक मनोरंजक आणि व्यावहारिक बनवण्यासाठी तयार केलेली साधने पहा.',

'home.ctaTitle': 'तुमचे ज्ञान वाढवण्यासाठी तयार आहात?',
'home.ctaDescription':
  'GreenGrow मध्ये सामील व्हा आणि आजपासून शाश्वत शेती शिकण्यास सुरुवात करा.',
'home.createAccount': 'मोफत खाते तयार करा →',

'home.contactLabel': 'संपर्क',
'home.contactTitle': 'काही प्रश्न आहेत?',
'home.contactDescription':
  'आम्हाला तुमच्याशी संवाद साधायला आवडेल. GreenGrow टीमशी संपर्क साधा.',
'home.support': 'GreenGrow सहाय्य',
'home.footerDescription': 'शाश्वत शेतीसाठी स्मार्ट शिक्षण.',
'home.footerRights': 'सर्व हक्क राखीव.',


// ================= NAVBAR =================

'nav.about': 'आमच्याबद्दल',
'nav.services': 'सेवा',
'nav.contact': 'संपर्क',
'nav.getStarted': 'सुरुवात करा',
'nav.openMenu': 'मेनू उघडा',
'nav.closeMenu': 'मेनू बंद करा',


// ================= LOGIN EXTRA =================

'login.title': 'पुन्हा स्वागत आहे',
'login.description': 'तुमचा GreenGrow प्रवास सुरू ठेवण्यासाठी लॉगिन करा.',
'login.emailLabel': 'ईमेल',
'login.passwordLabel': 'पासवर्ड',
'login.emailPlaceholderFull': 'तुमचा ईमेल टाका',
'login.passwordPlaceholderFull': 'तुमचा पासवर्ड टाका',
'login.loading': 'लॉगिन होत आहे...',
'login.google': 'Google सह सुरू ठेवा',
'login.or': 'किंवा',
'login.createAccount': 'खाते तयार करा',


// ================= SIGNUP EXTRA =================

'signup.title': 'तुमचे खाते तयार करा',
'signup.description': 'तुमचा शाश्वत शेती शिक्षणाचा प्रवास सुरू करा.',
'signup.nameLabel': 'पूर्ण नाव',
'signup.emailLabel': 'ईमेल',
'signup.passwordLabel': 'पासवर्ड',
'signup.confirmPasswordLabel': 'पासवर्डची पुष्टी करा',
'signup.namePlaceholderFull': 'तुमचे नाव टाका',
'signup.emailPlaceholderFull': 'तुमचा ईमेल टाका',
'signup.passwordPlaceholderFull': 'पासवर्ड तयार करा',
'signup.confirmPasswordPlaceholderFull': 'तुमचा पासवर्ड पुन्हा टाका',
'signup.loading': 'खाते तयार होत आहे...',
'signup.google': 'Google सह सुरू ठेवा',
'signup.or': 'किंवा',


// ================= ERRORS =================

'errors.passwordMismatch': 'पासवर्ड जुळत नाहीत.',
'errors.agreeRequired': 'कृपया नियम आणि अटी मान्य करा.',
'errors.userDisabled': 'हे खाते बंद करण्यात आले आहे.',
'errors.googleCancelled': 'Google साइन-इन रद्द करण्यात आले.',
'errors.googlePopupBlocked':
  'Google साइन-इन पॉपअप ब्लॉक करण्यात आले आहे. कृपया पॉपअपला परवानगी द्या आणि पुन्हा प्रयत्न करा.',
'errors.differentCredential':
  'या ईमेलसह दुसऱ्या साइन-इन पद्धतीने खाते आधीपासून अस्तित्वात आहे.',
'errors.tooManyRequests':
  'खूप प्रयत्न झाले. कृपया नंतर पुन्हा प्रयत्न करा.',
  'home.trackProgressTitle': 'प्रगतीचा मागोवा घ्या',
'home.trackProgressDesc':
  'तुमचा शिकण्याचा प्रवास, पूर्ण केलेले धडे, क्विझ आणि उपलब्धींचा मागोवा घ्या.',
  },
}
