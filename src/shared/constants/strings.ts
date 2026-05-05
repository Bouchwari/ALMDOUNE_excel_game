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
}

const DARIJA_AR: AppStrings = {
  langName: 'دارجة (عربية)',
  isRTL: true,
  tabHome: 'ديالي',
  tabModules: 'الدروس',
  tabLeaderboard: 'الترتيب',
  tabBadges: 'الشارات',
  tabSimulator: 'جرب Excel',
  langSelectTitle: 'اختار اللغة ديالك',
  langSelectSub: 'Choose your language',
  onboard1Title: 'مرحبا بيك ف Almdoun Learning! 🎉',
  onboard1Desc: 'تعلم Excel بطريقة مغربية! كل درس = XP + شارة جديدة.',
  onboard2Title: 'تعلم Excel باللعب! 🎮',
  onboard2Desc: 'دروس، تمارين، ألعاب وشارات – كلشي مع بعض!',
  onboard3Title: 'سيفت سميتك وبدا! 🚀',
  onboard3Desc: 'كتب سميتك واختار تصويرك – وبدا لأفانتور!',
  nameLabel: 'سميتك:',
  namePlaceholder: 'مثلا: يوسف، فاطمة...',
  avatarLabel: 'نتا ولا نتي، اختار تصويرك:',
  startBtn: 'يالله نبداو! 🚀',
  nextBtn: 'الجاي ▶',
  loading: 'تحمل شوية...',
  greeting: 'مرحبا! 👋',
  gamesTitle: '🎮 العاب وتحديات',
  dailyChallengeTitle: 'تحدي ديال ليوم 🔥',
  dailyChallengeDesc: 'حل 5 سؤالات وكسب XP!',
  quickQuizTitle: 'كويز ديال دابا ⚡',
  quickQuizDesc: 'سؤالات جداد كل مرة',
  myModules: 'الدروس 📚',
  checkBtn: 'شاكيلاو الجواب',
  nextQ: 'سؤال جديد →',
  finishBtn: '🏁 شوف النتيجة!',
  correct: 'ممتاز! 🎯',
  wrong: 'لا عليش، الغلط كيعلم 😅',
  showHint: '💡 عطيني تلميح',
  hintLabel: '💡 تلميح:',
  trueBtn: 'صح ✓',
  falseBtn: 'غلط ✗',
  correctAnswer: 'الجواب الصحيح:',
  reorderLabel: 'رتب الأجزاء باش تبيّن الفورميلا:',
  fillBlankPlaceholder: 'كتب جوابك...',
  correctOrderLabel: 'الترتيب الصحيح:',
  result3: 'ممتاز! 3 نجوم – نتا/نتي الأحسن! ⭐⭐⭐',
  result2: 'مزيان! 2 نجوم – عاود باش تربح الثالثة 🪴⭐⭐',
  result1: 'ابتداء مزيان! عاود باش تربح نجوم أكثر 💪⭐',
  result0: 'لا عليش – عاود الدرس مرة خرى، غادي تتحسن! 🪴',
  xpEarned: 'ربحتي XP:',
  nextLesson: 'الدرس الجاي ▶',
  retryBtn: 'عاود جرب',
  backHome: 'ارجع للديار',
  simulatorTitle: 'جرب Excel',
  simulatorHint: 'تاپ على الخلية، كتب قيمة أو فورميلا (تبدا ب =)',
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
  hintCost: '(-10 نقطة)',
  noHints: 'ما بقاوش تلاميح!',
  challengeDone: 'كملتي اليوم ✅',
  challengeNextIn: 'جديد غدا 🌙',
  tabGames: 'العاب وتعلم',
  gameCellNavName: 'Cell Navigator',
  gameCellNavDesc: 'لقا الخلية ف جدول Excel!',
  gameFormulaName: 'Formula Fixer',
  gameFormulaDesc: 'صلح الفورميلات ديال Excel!',
  gameSpeedQuizName: 'Speed Quiz',
  gameSpeedQuizDesc: 'جاوب سريع وكسب XP!',
  gamePlayBtn: 'يالله العب! 🎮',
  gameRound: 'الدورة',
  gameScore: 'النتيجة',
  gameOver: '🏁 انتهت اللعبة!',
  gameTapCell: 'تاپ على الخلية:',
  gameTimeLeft: 'الوقت بقى:',
  gameStreakLabel: 'متواصل 🔥',
  gameXpBonus: 'XP إضافية!',
  gameNext: 'الجاي →',
  gameCellNameQuestion: 'شنو اسم هاد الخلية؟ 🟩',
  gameFixFormula: '🔧 صلح هاد الفورميلا:',
  friendArrowHint: '⬇ وري هاد QR لصاحبك ⬇',
  continueLabel: 'كمل من وين وقفتي',
  modulesSubtitle: 'بدا من الأول أو كمل من وين وقفتي!',
  miniGamesTitle: '🎮 العاب تمزانت',
  diffEasy: 'سهلة 🟢',
  diffMedium: 'متوسطة 🟡',
  diffHard: 'صعيبة 🔴',
  gameTipTitle: '💡 كيفاش تكسب XP أكثر؟',
  gameTipText: '← جاوب سريع = bonus XP\n← Streak كبر = multiplier أكبر\n← كل تحدي = XP جديدة!',
  settingsTitle: 'الإعدادات',
  settingsProfileSection: 'البروفايل',
  settingsProfileLabel: 'المستخدم',
  settingsSwitchProfile: 'بدل البروفايل',
  settingsGenderSection: 'الجنس',
  settingsMale: 'راجل 🧑',
  settingsFemale: 'بنت 👧',
  settingsSoundSection: 'الصوت والاهتزاز',
  settingsSoundLabel: '🔊 الصوت',
  settingsVibration: '📳 الاهتزاز',
  settingsAboutSection: 'عن Almdoun Learning',
  settingsSchool: 'المدرسة',
  settingsSubject: 'المادة',
  moduleDone: '✅ مكمّل',
  lessonConceptLabel: 'المفهوم',
  lessonStepsLabel: 'الخطوات:',
  lessonFormulaLabel: '📐 الفورميلا:',
  lessonExampleLabel: '📌 مثال:',
  lessonShortcutsLabel: '⌨️ اختصارات:',
  lessonTipLabel: '💡 نصيحة:',
  lessonMiniGame: '🎮 لعبة صغيرة!',
  leaderboardTitle: 'الترتيب 🏆',
  leaderboardEmpty: 'كلف أصحابك يحملوا التطبيق باش تشوف الترتيب! 🏆',
  leaderboardBotLabel: '🤖 ديمو',
  leaderboardOnlyOne: 'دير أصحابك يدخلوا ل-app باش تشوف الترتيب! 🏆',
  leaderboardYouHere: 'نتا/نتي هنا 👈',
  darkMode: '🌙 وضع مظلم',
  searchModules: '🔍 قلب على درس...',
  shareProgress: '📤 شارك',
  streakCalendar: '🔥 أيام اللعب',
  classChallengeTitle: '👨‍🏫 تحدي الفصل',
  classChallengeSubtitle: 'اختار الصعوبة وعدد الأسئلة',
  classChallengeQRInstruction: 'كل طالب يسكان هاد QR باش يلعب',
  classChallengePlaySelf: '▶ العب بنفسك',
  classChallengeResultTitle: 'نتيجتك 🎯',
  classChallengeShareHint: 'وري هاد QR للفصل',
  classChallengeDone: '✓ ارجع',
  friendChallengeTitle: '🤝 تحدي مع صاحبك',
  friendCreate: '🎯 اصنع تحدي',
  friendCreateSub: 'العب وارسل QR لصاحبك',
  friendScan: '📷 سكان التحدي',
  friendScanSub: 'سكان QR ديال صاحبك والعب',
  friendHowTitle: 'كيفاش كيخدم؟',
  friendStep1: '① العب السؤالات – كسب سكورك',
  friendStep2: '② وري QR code لصاحبك',
  friendStep3: '③ صاحبك يسكان ويلعب نفس السؤالات',
  friendStep4: '④ قارن السكورات – الغالب كيكسب XP زيادة! 🏆',
  friendShowQR: 'وري هاد QR لصاحبك',
  friendQRInstruction: 'صاحبك يسكان هاد الكود باش يلعب',
  friendDone: '✓ ارجع للديار',
  friendScanTitle: '📷 سكان تحدي ديال صاحبك',
  friendScanInstruction: 'وجّه الكاميرا على QR ديال صاحبك',
  friendScanError: 'QR code ماشي مزيان. عاود جرّب.',
  friendPermissionTitle: 'خاصنا الكاميرا',
  friendPermissionBtn: 'سمح للكاميرا',
  friendResultTitle: 'النتيجة 🏆',
  friendWinner: '🥇 غلب!',
  friendDraw: '🤝 مشاو مع بعضهم!',
  friendYou: 'نتا/نتي',
  friendFriend: 'صاحبك',
  friendPlayAgain: '🔄 العب مع صاحبك',
  profileDeleteTitle: 'مسح البروفايل؟',
  profileDeleteMsg: 'واش بغيتي تمسح هاد البروفايل؟ هاد الشي ما كيرجعش!',
  profileDeleteNo: 'لا، خليه',
  profileDeleteYes: 'آه، امسح',
  profileWhoTitle: 'شكون نتا؟ 👤',
  profileChooseLabel: 'اختار بروفايلك:',
  profileHoldHint: 'زيد ضغط باش تمسح',
  profileNewBtn: 'بروفايل جديد',
  classChallengeCountSuffix: 'سؤالات',
  classChallengeOrDivider: 'أو',
  locked: 'مسدود 🔒',
  back: '← ارجع',
  englishNote: '',
  level: 'المستوى',
  streak: 'يوم متواصل',
};

export const LANGUAGE_STRINGS: Record<AppLanguage, AppStrings> = {
  'darija-ar': DARIJA_AR,
  // TODO (Google Play expansion): Add 'fr': FRENCH, 'en': ENGLISH here
};
