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

  // Profile select
  profileDeleteTitle: string;
  profileDeleteMsg: string;
  profileDeleteNo: string;
  profileDeleteYes: string;
  profileWhoTitle: string;
  profileChooseLabel: string;
  profileHoldHint: string;
  profileNewBtn: string;

  // Class challenge
  classChallengeCountSuffix: string;
  classChallengeOrDivider: string;

  // General
  locked: string;
  back: string;
  englishNote: string;
  level: string;
  streak: string;

  // Game feedback (inline → strings)
  gameTimeoutMsg: string;
  gameCellTimeoutMsg: string;
  gameCellCorrectMsg: string;
  gameCellWrongMsg: string;
  friendXpEarnedSuffix: string;
}

const DARIJA_AR: AppStrings = {
  langName: 'الدارجة المغربية',
  isRTL: true,
  tabHome: 'الرئيسية',
  tabModules: 'الدروس',
  tabLeaderboard: 'الترتيب',
  tabBadges: 'الشارات',
  tabSimulator: 'جرب الإكسيل',
  langSelectTitle: 'ختار اللغة ديالك',
  langSelectSub: 'ختار اللغة اللي بغيتي تقرا بيها',
  onboard1Title: 'مرحبا بيك فـ Almdoun Learning! 🎉',
  onboard1Desc: 'تعلم الإكسيل بالطريقة المغربية! كل درس = XP + شارة جديدة.',
  onboard2Title: 'تعلم الإكسيل باللعب! 🎮',
  onboard2Desc: 'دروس، تمارين، ألعاب وشارات – كلشي مجموع هنا!',
  onboard3Title: 'دخل سميتك وبدا! 🚀',
  onboard3Desc: 'كتب سميتك، ختار تصويرتك، وبدا المغامرة!',
  nameLabel: 'سميتك:',
  namePlaceholder: 'مثلا: يوسف، فاطمة...',
  avatarLabel: 'ختار التصويرة ديالك:',
  startBtn: 'يالله نبداو! 🚀',
  nextBtn: 'كمل ▶',
  loading: 'تسنى شوية...',
  greeting: 'مرحبا! 👋',
  gamesTitle: '🎮 ألعاب وتحديات',
  dailyChallengeTitle: 'تحدي اليوم 🔥',
  dailyChallengeDesc: 'جاوب على 5 دالأسئلة وربح XP!',
  quickQuizTitle: 'كويز بالزربة ⚡',
  quickQuizDesc: 'أسئلة جديدة كل مرة',
  myModules: 'الدروس 📚',
  checkBtn: 'تأكد من الجواب',
  nextQ: 'السؤال الجاي →',
  finishBtn: '🏁 شوف النتيجة!',
  correct: 'عندك الصح! 🎯',
  wrong: 'ماشي مشكل، من الغلط كنتعلمو 😅',
  showHint: '💡 عاوني شوية',
  hintLabel: '💡 مساعدة:',
  trueBtn: 'صحيح ✓',
  falseBtn: 'غلط ✗',
  correctAnswer: 'الجواب الصحيح:',
  reorderLabel: 'رتب هاد الأجزاء باش تصاوب الفورميلا:',
  fillBlankPlaceholder: 'كتب جوابك...',
  correctOrderLabel: 'الترتيب الصحيح:',
  result3: 'ناضي! 3 نجوم — داكشي هو هادا! ⭐⭐⭐',
  result2: 'مزيان! 2 نجوم — عاود باش تجيب الثالثة ⭐⭐',
  result1: 'بداية مزيانة! عاود جرب باش تجيب كثر ⭐',
  result0: 'ماشي مشكل — عاود الدرس وغادي تجيب كثر 💪',
  xpEarned: 'ربحتي XP:',
  nextLesson: 'الدرس الجاي ▶',
  retryBtn: 'عاود من الأول',
  backHome: 'رجع للرئيسية',
  simulatorTitle: 'جرب الإكسيل',
  simulatorHint: 'ورك على الخلية، وكتب شي قيمة ولا فورميلا (كتبدا بـ =)',
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
  challengeTitle: 'التحدي ديال اليوم',
  dailyChallenge: 'تحدي',
  hintCost: '(-10 نقاط)',
  noHints: 'صافي، تسالاو المساعدات!',
  challengeDone: 'سليتي التحدي ديال اليوم ✅',
  challengeNextIn: 'تحدي جديد غدا 🌙',
  tabGames: 'ألعاب وتعلم',
  gameCellNavName: 'Cell Navigator',
  gameCellNavDesc: 'قلب على الخلية فجدول الإكسيل!',
  gameFormulaName: 'Formula Fixer',
  gameFormulaDesc: 'قاد الفورميلات ديال الإكسيل!',
  gameSpeedQuizName: 'Speed Quiz',
  gameSpeedQuizDesc: 'جاوب بالزربة وربح XP!',
  gamePlayBtn: 'يالله نلعبو! 🎮',
  gameRound: 'الجولة',
  gameScore: 'النتيجة',
  gameOver: '🏁 تسالات اللعبة!',
  gameTapCell: 'ورك على الخلية:',
  gameTimeLeft: 'الوقت اللي بقا:',
  gameStreakLabel: 'متابعين 🔥',
  gameXpBonus: 'XP زايدة!',
  gameNext: 'اللي موراه →',
  gameCellNameQuestion: 'شنو سميت هاد الخلية؟ 🟩',
  gameFixFormula: '🔧 قاد هاد الفورميلا:',
  friendArrowHint: '⬇ وري هاد الكود QR لصاحبك ⬇',
  continueLabel: 'كمل منين حبستي',
  modulesSubtitle: 'بدا من الأول ولا كمل من البلاصة فاش وقفتي!',
  miniGamesTitle: '🎮 ألعاب خفيفة',
  diffEasy: 'ساهلة 🟢',
  diffMedium: 'متوسطة 🟡',
  diffHard: 'صعيبة 🔴',
  gameTipTitle: '💡 كيفاش تربح XP كثر؟',
  gameTipText: '← جاوب بالزربة = XP زايدة\n← جاوبتي متابع = نقاط كثر\n← كل تحدي فيه XP جديدة!',
  settingsTitle: 'الإعدادات',
  settingsProfileSection: 'البروفايل',
  settingsProfileLabel: 'الحساب',
  settingsSwitchProfile: 'بدل البروفايل',
  settingsGenderSection: 'الجنس',
  settingsMale: 'ولد 🧑',
  settingsFemale: 'بنت 👧',
  settingsSoundSection: 'الصوت والفيبرور',
  settingsSoundLabel: '🔊 الصوت',
  settingsVibration: '📳 الفيبرور',
  settingsAboutSection: 'على Almdoun Learning',
  settingsSchool: 'المدرسة',
  settingsSubject: 'المادة',
  moduleDone: '✅ ساليتيه',
  lessonConceptLabel: 'المفهوم',
  lessonStepsLabel: 'الخطوات:',
  lessonFormulaLabel: '📐 الفورميلا:',
  lessonExampleLabel: '📌 مثال:',
  lessonShortcutsLabel: '⌨️ اختصارات (Shortcuts):',
  lessonTipLabel: '💡 نصيحة:',
  lessonMiniGame: '🎮 لعبة خفيفة!',
  leaderboardTitle: 'الترتيب 🏆',
  leaderboardEmpty: 'قول لصحابك يتيليشارجيو التطبيق باش يبان الترتيب! 🏆',
  leaderboardBotLabel: '🤖 ديمو',
  leaderboardOnlyOne: 'عيط لصحابك يدخلو للتطبيق باش يبان الترتيب! 🏆',
  leaderboardYouHere: 'نتا هنا 👈',
  darkMode: '🌙 الوضع الليلي',
  searchModules: '🔍 قلب على درس...',
  shareProgress: '📤 شارك',
  streakCalendar: '🔥 أيام اللعب',
  classChallengeTitle: '👨‍🏫 تحدي القسم',
  classChallengeSubtitle: 'ختار الصعوبة وشحال من سؤال',
  classChallengeQRInstruction: 'كل تلميذ يسكاني هاد الكود QR باش يلعب',
  classChallengePlaySelf: '▶ العب بوحدك',
  classChallengeResultTitle: 'النتيجة ديالك 🎯',
  classChallengeShareHint: 'وري هاد الكود QR للقسم',
  classChallengeDone: '✓ رجع',
  friendChallengeTitle: '🤝 تحدي مع صاحبك',
  friendCreate: '🎯 صاوب تحدي',
  friendCreateSub: 'العب وسيفط الكود QR لصاحبك',
  friendScan: '📷 سكاني التحدي',
  friendScanSub: 'سكاني الكود QR ديال صاحبك والعب',
  friendHowTitle: 'كيفاش كيخدم؟',
  friendStep1: '① جاوب على الأسئلة وجمع أكبر عدد دالنقاط 🎯',
  friendStep2: '② وري الكود QR ديالك لصاحبك',
  friendStep3: '③ صاحبك غادي يسكاني ويلعب نفس الأسئلة',
  friendStep4: '④ اللي جاب كثر – هو اللي غادي يربح XP زايدة! 🏆',
  friendShowQR: 'وري هاد الكود QR لصاحبك',
  friendQRInstruction: 'صاحبك خاصو يسكاني هاد الكود باش يلعب',
  friendDone: '✓ رجع للرئيسية',
  friendScanTitle: '📷 سكاني التحدي ديال صاحبك',
  friendScanInstruction: 'وجه الكاميرا للكود QR ديال صاحبك',
  friendScanError: 'الكود QR ماشي هو هادا. عاود جرب.',
  friendPermissionTitle: 'خاصنا الكاميرا',
  friendPermissionBtn: 'عطي الصلاحية للكاميرا',
  friendResultTitle: 'النتيجة 🏆',
  friendWinner: '🥇 رابح!',
  friendDraw: '🤝 تعادل!',
  friendYou: 'النتيجة ديالك',
  friendFriend: 'صاحبك',
  friendPlayAgain: '🔄 عاود العب مع صاحبك',
  profileDeleteTitle: 'مسح البروفايل؟',
  profileDeleteMsg: 'واش متأكد بغيتي تمسح هاد البروفايل؟ هادشي مايمكنش ترجع فيه!',
  profileDeleteNo: 'لا، خليه',
  profileDeleteYes: 'آه، مسحو',
  profileWhoTitle: 'شكون نتا؟ 👤',
  profileChooseLabel: 'ختار البروفايل ديالك:',
  profileHoldHint: 'ورك مطول باش تمسح',
  profileNewBtn: 'بروفايل جديد',
  classChallengeCountSuffix: 'أسئلة',
  classChallengeOrDivider: 'ولا',
  locked: 'مسدود 🔒',
  back: '← رجع',
  englishNote: 'الإكسيل كيبقى بنفس السميات ديال الفورميلات',
  level: 'المستوى',
  streak: 'أيام المتابعة',
  gameTimeoutMsg: '⏰ سالا الوقت! الجواب الصحيح:',
  gameCellTimeoutMsg: '⏰ سالا الوقت! الجواب:',
  gameCellCorrectMsg: '✅ صح!',
  gameCellWrongMsg: '❌ غلط! الجواب الصحيح:',
  friendXpEarnedSuffix: 'كسبتي! ⭐',
};

export const LANGUAGE_STRINGS: Record<AppLanguage, AppStrings> = {
  'darija-ar': DARIJA_AR,
  // TODO (Google Play expansion): Add 'fr': FRENCH, 'en': ENGLISH here
};
