// TODO (Google Play expansion): Add 'fr' | 'en' back to AppLanguage, restore LANGUAGE_OPTIONS,
// and import FRENCH/ENGLISH from ./_future_langs/fr_strings.ts and ./_future_langs/en_strings.ts
export type AppLanguage = 'darija-ar';

export interface AppStrings {
  langName: string;
  isRTL: boolean;

  // Tabs
  tabHome: string;
  tabModules: string;
  tabLeaderboard: string;
  tabBadges: string;
  tabSimulator: string;

  // Language selector
  langSelectTitle: string;
  langSelectSub: string;

  // Onboarding
  onboard1Title: string;
  onboard1Desc: string;
  onboard2Title: string;
  onboard2Desc: string;
  onboard3Title: string;
  onboard3Desc: string;
  nameLabel: string;
  namePlaceholder: string;
  avatarLabel: string;
  startBtn: string;
  nextBtn: string;
  loading: string;

  // Home
  greeting: string;
  gamesTitle: string;
  dailyChallengeTitle: string;
  dailyChallengeDesc: string;
  quickQuizTitle: string;
  quickQuizDesc: string;
  myModules: string;

  // Exercise
  checkBtn: string;
  nextQ: string;
  finishBtn: string;
  correct: string;
  wrong: string;
  showHint: string;
  hintLabel: string;
  trueBtn: string;
  falseBtn: string;
  correctAnswer: string;
  reorderLabel: string;
  fillBlankPlaceholder: string;
  correctOrderLabel: string;

  // Result
  result3: string;
  result2: string;
  result1: string;
  result0: string;
  xpEarned: string;
  nextLesson: string;
  retryBtn: string;
  backHome: string;

  // Simulator
  simulatorTitle: string;
  simulatorHint: string;
  fnSum: string;
  fnAvg: string;
  fnIf: string;
  fnCount: string;
  fnCountIf: string;
  fnMax: string;
  fnMin: string;
  fnLeft: string;
  fnRight: string;
  fnUpper: string;

  // Challenge
  challengeTitle: string;
  dailyChallenge: string;
  hintCost: string;
  noHints: string;
  challengeDone: string;
  challengeNextIn: string;

  // Games screen
  tabGames: string;
  gameCellNavName: string;
  gameCellNavDesc: string;
  gameFormulaName: string;
  gameFormulaDesc: string;
  gameSpeedQuizName: string;
  gameSpeedQuizDesc: string;
  gamePlayBtn: string;
  gameRound: string;
  gameScore: string;
  gameOver: string;
  gameTapCell: string;
  gameTimeLeft: string;
  gameStreakLabel: string;
  gameXpBonus: string;
  gameNext: string;
  gameCellNameQuestion: string;
  gameFixFormula: string;
  friendArrowHint: string;

  // Home screen
  continueLabel: string;
  modulesSubtitle: string;
  miniGamesTitle: string;
  diffEasy: string;
  diffMedium: string;
  diffHard: string;
  gameTipTitle: string;
  gameTipText: string;

  // Settings
  settingsTitle: string;
  settingsProfileSection: string;
  settingsProfileLabel: string;
  settingsSwitchProfile: string;
  settingsGenderSection: string;
  settingsMale: string;
  settingsFemale: string;
  settingsSoundSection: string;
  settingsSoundLabel: string;
  settingsVibration: string;
  settingsAboutSection: string;
  settingsSchool: string;
  settingsSubject: string;

  // Lesson
  moduleDone: string;
  lessonConceptLabel: string;
  lessonStepsLabel: string;
  lessonFormulaLabel: string;
  lessonExampleLabel: string;
  lessonShortcutsLabel: string;
  lessonTipLabel: string;
  lessonMiniGame: string;

  // Leaderboard
  leaderboardTitle: string;
  leaderboardEmpty: string;
  leaderboardBotLabel: string;
  leaderboardOnlyOne: string;
  leaderboardYouHere: string;

  // Misc
  darkMode: string;
  searchModules: string;
  shareProgress: string;
  streakCalendar: string;

  // Class challenge
  classChallengeTitle: string;
  classChallengeSubtitle: string;
  classChallengeQRInstruction: string;
  classChallengePlaySelf: string;
  classChallengeResultTitle: string;
  classChallengeShareHint: string;
  classChallengeDone: string;

  // Friend challenge
  friendChallengeTitle: string;
  friendCreate: string;
  friendCreateSub: string;
  friendScan: string;
  friendScanSub: string;
  friendHowTitle: string;
  friendStep1: string;
  friendStep2: string;
  friendStep3: string;
  friendStep4: string;
  friendShowQR: string;
  friendQRInstruction: string;
  friendDone: string;
  friendScanTitle: string;
  friendScanInstruction: string;
  friendScanError: string;
  friendPermissionTitle: string;
  friendPermissionBtn: string;
  friendResultTitle: string;
  friendWinner: string;
  friendDraw: string;
  friendYou: string;
  friendFriend: string;
  friendPlayAgain: string;

  // General
  locked: string;
  back: string;
  englishNote: string;
  level: string;
  streak: string;
}

const DARIJA_AR: AppStrings = {
  langName: 'دارجة (عربية)',
  isRTL: true,
  tabHome: 'ديالي',
  tabModules: 'دروس',
  tabLeaderboard: 'الميدان',
  tabBadges: 'بادجات',
  tabSimulator: 'محاكي',
  langSelectTitle: 'اختار اللغة ديالك',
  langSelectSub: 'Choose your language',
  onboard1Title: 'مرحبا بيك ف ExcelStar! 🎉',
  onboard1Desc: 'تطبيق ديال تعلم Excel بالتعب واللعب! كل درس = XP + بادج جديد.',
  onboard2Title: 'تعلم Excel باللعب! 🎮',
  onboard2Desc: 'دروس، تمارين، ألعاب صغيرة وبادجات – كلشي مع بعض!',
  onboard3Title: 'سيفت سميتك وبدا! 🚀',
  onboard3Desc: 'كتب سميتك واختار أفاتار ديالك – وبدا لأفانتور!',
  nameLabel: 'سميتك:',
  namePlaceholder: 'كتب سميتك...',
  avatarLabel: 'اختار أفاتار ديالك:',
  startBtn: 'بدا دابا! 🚀',
  nextBtn: 'زيد عرقن  →',
  loading: 'ماشي...',
  greeting: 'مرحبا! 👋',
  gamesTitle: '🎮 ألعاب وتحديات',
  dailyChallengeTitle: 'تحدي ديال ليوم 🔥',
  dailyChallengeDesc: 'حل 5 سؤالات وكسب XP!',
  quickQuizTitle: 'كويز ديال دابا ⚡',
  quickQuizDesc: 'سؤالات جداد كل مرة',
  myModules: 'دروس ديالك 📚',
  checkBtn: 'شوف الجواب →',
  nextQ: 'سؤال جديد →',
  finishBtn: '🏁 شوف النتيجة!',
  correct: 'صح! 🎉',
  wrong: 'غلط! نزغ تيلخت أو رتسنت إوالو  معليش عود 😊',
  showHint: '💡 مساعدة',
  hintLabel: '💡 مساعدة:',
  trueBtn: 'صحيح ✓',
  falseBtn: 'غلط ✗',
  correctAnswer: 'الجواب الصحيح:',
  reorderLabel: 'رتب الأجزاء:',
  fillBlankPlaceholder: 'كتب جوابك...',
  correctOrderLabel: 'الترتيب الصحيح:',
  result3: 'مزيان بزاف! عندك النجمة ⭐⭐⭐',
  result2: 'مزيان! زيد على هاكا! ⭐⭐',
  result1: 'سير عرقن حتى لمن بعد ما عليش، حاول مرة أخرى! 💪⭐',
  result0: 'ما  بان ليا غير كتقدر 😊 ما عليش، عاود حاول!',
  xpEarned: 'XP كسبيتي:',
  nextLesson: 'درس جديد →',
  retryBtn: 'عاود',
  backHome: 'أغول س تدارت ',
  simulatorTitle: 'محاكي Excel 🖥️',
  simulatorHint: 'تاپ ف سيل، كتب قيمة أو فورميل (بدا ب =)',
  fnSum: 'SOMME',
  fnAvg: 'MOYENNE',
  fnIf: 'SI',
  fnCount: 'NB',
  fnCountIf: 'NB.SI',
  fnMax: 'MAX',
  fnMin: 'MIN',
  fnLeft: 'GAUCHE',
  fnRight: 'DROITE',
  fnUpper: 'MAJUSCULE',
  challengeTitle: 'تحدي ديال ليوم',
  dailyChallenge: 'تحدي',
  hintCost: '(-10 نقط)',
  noHints: 'ما بقاوش إشارة!',
  challengeDone: 'انتهيتي اليوم ✅',
  challengeNextIn: 'جديد غدا 🌙',
  tabGames: 'العاب 🎮',
  gameCellNavName: 'Cell Navigator',
  gameCellNavDesc: 'لقا الخلية ف جدول Excel!',
  gameFormulaName: 'Formula Fixer',
  gameFormulaDesc: 'صلح الفورميلات ديال Excel!',
  gameSpeedQuizName: 'Speed Quiz',
  gameSpeedQuizDesc: 'جاوب سريع وكسب XP!',
  gamePlayBtn: 'بدا اللعب! 🚀',
  gameRound: 'جولة',
  gameScore: 'نقاط',
  gameOver: '🏁 انتهت!',
  gameTapCell: 'تاپ على الخلية:',
  gameTimeLeft: 'وقت بقى:',
  gameStreakLabel: 'Streak 🔥',
  gameXpBonus: 'XP بونوس!',
  gameNext: 'جي →',
  gameCellNameQuestion: 'شنو اسم هاد الخلية؟ 🟩',
  gameFixFormula: '🔧 صلح هاد الـ formule:',
  friendArrowHint: '⬇ ورّي هاد QR لصاحبك ⬇',
  continueLabel: 'كمل من وين وقفتي →',
  modulesSubtitle: 'ابدا من الأول أو كمل من وين وقفتي!',
  miniGamesTitle: '🎮 ألعاب تمزانت',
  diffEasy: 'مبتدئ',
  diffMedium: 'متوسط',
  diffHard: 'سريع',
  gameTipTitle: '💡 كيفاش تكسب XP أكثر؟',
  gameTipText: '← جاوب سريع = bonus XP\n← Streak كبر = multiplier أكبر\n← كل تحدي = XP جديدة!',
  settingsTitle: 'الإعدادات ⚙️',
  settingsProfileSection: 'الملف الشخصي',
  settingsProfileLabel: 'المستخدم',
  settingsSwitchProfile: 'بدل الملف',
  settingsGenderSection: 'الجنس',
  settingsMale: 'ولد',
  settingsFemale: 'بنت',
  settingsSoundSection: 'الصوت والاهتزاز',
  settingsSoundLabel: '🔊 الصوت',
  settingsVibration: '📳 الاهتزاز',
  settingsAboutSection: 'عن ExcelStar',
  settingsSchool: 'المدرسة',
  settingsSubject: 'المادة',
  moduleDone: '✅ مكمّل',
  lessonConceptLabel: 'المفهوم',
  lessonStepsLabel: 'الخطوات:',
  lessonFormulaLabel: '📐 الصيغة:',
  lessonExampleLabel: '📌 مثال:',
  lessonShortcutsLabel: '⌨️ اختصارات:',
  lessonTipLabel: '💡 نصيحة:',
  lessonMiniGame: '🎮 لعبة صغيرة!',
  leaderboardTitle: 'الميدان 🏆',
  leaderboardEmpty: 'مازال ما كاين حد. بدا تعلم!',
  leaderboardBotLabel: '🤖 ديمو',
  leaderboardOnlyOne: 'دير أصحابك يدخلو ل-app باش تشوف الترتيب! 🏆',
  leaderboardYouHere: '← نتا هنا',
  darkMode: '🌙 وضع مظلم',
  searchModules: '🔍 ابحث عن درس...',
  shareProgress: '📤 شارك',
  streakCalendar: '🔥 أيام اللعب',
  classChallengeTitle: '👨‍🏫 تحدي الفصل',
  classChallengeSubtitle: 'اختار الصعوبة وعدد الأسئلة',
  classChallengeQRInstruction: 'كل طالب يسكان هاد QR باش يلعب',
  classChallengePlaySelf: '▶ العب بنفسك',
  classChallengeResultTitle: 'نتيجتك 🎯',
  classChallengeShareHint: 'ورّي هاد QR للفصل',
  classChallengeDone: '✓ ارجع',
  friendChallengeTitle: '🤝 تحدي مع صاحبك',
  friendCreate: '🎯 اصنع تحدي',
  friendCreateSub: 'العب وارسل QR لصاحبك',
  friendScan: '📷 سكان التحدي',
  friendScanSub: 'سكان QR ديال صاحبك والعب',
  friendHowTitle: 'كيفاش كيخدم؟',
  friendStep1: '① لعب السؤالات – كسب سكورك',
  friendStep2: '② ورّي QR code لصاحبك',
  friendStep3: '③ صاحبك يسكان و يلعب نفس السؤالات',
  friendStep4: '④ قارن السكورات – الغالب كيكسب XP زيادة! 🏆',
  friendShowQR: 'ورّي هاد QR لصاحبك',
  friendQRInstruction: 'صاحبك يسكان هاد الكود باش يلعب',
  friendDone: '✓ ارجع للدار',
  friendScanTitle: '📷 سكان تحدي ديال صاحبك',
  friendScanInstruction: 'وجّه الكاميرا على QR ديال صاحبك',
  friendScanError: 'QR code ماشي مزيان. عاود جرّب.',
  friendPermissionTitle: 'خاصنا الكاميرا',
  friendPermissionBtn: 'سمح للكاميرا',
  friendResultTitle: 'النتيجة 🏆',
  friendWinner: '🥇 غلب!',
  friendDraw: '🤝 مشاو مع بعضهم!',
  friendYou: 'نتا',
  friendFriend: 'صاحبك',
  friendPlayAgain: '🔄 لعب مع صاحبك',
  locked: 'مسدود 🔒',
  back: '→ رجع',
  englishNote: '',
  level: 'مستوى',
  streak: 'يوم',
};

export const LANGUAGE_STRINGS: Record<AppLanguage, AppStrings> = {
  'darija-ar': DARIJA_AR,
  // TODO (Google Play expansion): Add 'fr': FRENCH, 'en': ENGLISH here
};
