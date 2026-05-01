export type AppLanguage = 'darija-ar' | 'darija-lat' | 'fr' | 'en';

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

  // Games hub
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

  // Home screen
  continueLabel: string;

  // Modules screen
  modulesSubtitle: string;

  // Games screen
  miniGamesTitle: string;
  diffEasy: string;
  diffMedium: string;
  diffHard: string;
  gameTipTitle: string;
  gameTipText: string;

  // Settings screen
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

  // Leaderboard
  leaderboardTitle: string;
  leaderboardEmpty: string;
  leaderboardBotLabel: string;

  // Theme
  darkMode: string;

  // Search
  searchModules: string;

  // Share
  shareProgress: string;

  // Streak Calendar
  streakCalendar: string;

  // Friend Challenge (multiplayer)
  friendChallengeTitle: string;
  friendCreate: string;
  friendScan: string;
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

const DARIJA_LAT: AppStrings = {
  langName: 'Darija (Latin)',
  isRTL: false,
  tabHome: 'Dyali',
  tabModules: 'Drous',
  tabLeaderboard: 'Meydane',
  tabBadges: 'Badges',
  tabSimulator: 'Simulator',
  langSelectTitle: 'Khtar Lgha dyalek',
  langSelectSub: 'Choose your language',
  onboard1Title: 'Merhba bik f ExcelStar! 🎉',
  onboard1Desc: 'App dial t3allom Excel b t3ab w l3ab! Koll dars = XP + badge jdid.',
  onboard2Title: 'T3llem Excel b l3ab! 🎮',
  onboard2Desc: 'Drous, exercises, mini-games w badges – kollchi m3a ba3d!',
  onboard3Title: 'Sifet smittek w bda! 🚀',
  onboard3Desc: 'Kteb smittek w khtar avatar dyalek – w bda l-aventure!',
  nameLabel: 'Smittek:',
  namePlaceholder: 'Kteb smittek...',
  avatarLabel: 'Khtar avatar dyalek:',
  startBtn: 'Bda daba! 🚀',
  nextBtn: 'Jji →',
  loading: 'Mashi...',
  greeting: 'Merhba! 👋',
  gamesTitle: '🎮 Jeux & Défis',
  dailyChallengeTitle: 'Defi dyal lyoum 🔥',
  dailyChallengeDesc: 'Sol 5 so2alat w kaseb XP!',
  quickQuizTitle: 'Quiz dyal daba ⚡',
  quickQuizDesc: 'So2alat jdad koll marra',
  myModules: 'Drous dyalek 📚',
  checkBtn: 'Shuf Jawab →',
  nextQ: 'So2al jdid →',
  finishBtn: '🏁 Chuf Natija!',
  correct: 'Sah! 🎉',
  wrong: 'Ghalt! Ma3lich 😊',
  showHint: '💡 Hint',
  hintLabel: '💡 Hint:',
  trueBtn: 'Sh7i7 ✓',
  falseBtn: 'Ghalt ✗',
  correctAnswer: 'Jawab sh7i7:',
  reorderLabel: 'Ratteb l-parts:',
  result3: 'Mzyan bzaf! 3ndek najma ⭐⭐⭐',
  result2: 'Mzyan! Zid 3la haka! ⭐⭐',
  result1: 'Ma3lich, 7awel merra okhra! 💪⭐',
  result0: 'Ma3lich, 3awed 7awel! 😊',
  xpEarned: 'XP ksbiti:',
  nextLesson: 'Dars jdid →',
  retryBtn: '3awed',
  backHome: 'L-Bit',
  simulatorTitle: 'Excel Simulator 🖥️',
  simulatorHint: 'Tap f cellule, kteb valeur aw formule (bda b =)',
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
  challengeTitle: 'Défi dyal lyoum',
  dailyChallenge: 'Défi',
  hintCost: '(-10 pts)',
  noHints: 'Ma bqa hints!',
  challengeDone: 'Enditi lyoum ✅',
  challengeNextIn: 'Jdid gheda 🌙',
  tabGames: 'L3ab 🎮',
  gameCellNavName: 'Cell Navigator',
  gameCellNavDesc: 'Lqa la cellule f table Excel!',
  gameFormulaName: 'Formula Fixer',
  gameFormulaDesc: 'Sali7 formules dial Excel!',
  gameSpeedQuizName: 'Speed Quiz',
  gameSpeedQuizDesc: 'Jawab sari3 w kseb XP!',
  gamePlayBtn: 'Bda L3ab! 🚀',
  gameRound: 'Round',
  gameScore: 'Score',
  gameOver: '🏁 Game Over!',
  gameTapCell: 'Tap 3la la cellule:',
  gameTimeLeft: 'wa9t bqa:',
  gameStreakLabel: 'Streak 🔥',
  gameXpBonus: 'XP bonus!',
  gameNext: 'Jji →',
  continueLabel: 'Kmel min wqefti →',
  modulesSubtitle: 'Bda men l-awwal aw kmel wijn wqefti!',
  miniGamesTitle: '🎮 Mini Jeux',
  diffEasy: 'Debutant',
  diffMedium: 'Moyen',
  diffHard: 'Rapide',
  gameTipTitle: '💡 Kifach tkseb XP aktar?',
  gameTipText: '→ Jawab sari3 = bonus XP\n→ Streak zid = multiplier akbar\n→ Koll challenge = XP jdida!',
  settingsTitle: 'L-Settings ⚙️',
  settingsProfileSection: 'Profil',
  settingsProfileLabel: 'Profil d3if',
  settingsSwitchProfile: 'Bdel Profil',
  settingsGenderSection: 'Jins / Genre',
  settingsMale: 'Weld',
  settingsFemale: 'Bent',
  settingsSoundSection: 'Son w Vibration',
  settingsSoundLabel: '🔊 Son',
  settingsVibration: '📳 Vibration',
  settingsAboutSection: '3la ExcelStar',
  settingsSchool: 'Madrasa',
  settingsSubject: 'Matière',
  leaderboardTitle: 'L-Meydane 🏆',
  leaderboardEmpty: 'Mazal ma kayen 7add. Bda t3alm!',
  leaderboardBotLabel: '🤖 Demo',
  darkMode: '🌙 Dark Mode',
  searchModules: '🔍 Qlab 3la dars...',
  shareProgress: '📤 Share',
  streakCalendar: '🔥 Ayam dyal l3b',
  friendChallengeTitle: '🤝 Defi m3a Sa7bek',
  friendCreate: '🎯 Dar Defi',
  friendScan: '📷 Scanner Defi',
  friendHowTitle: 'Kifach kaykheddem?',
  friendStep1: '① L3ab so2alat – kaseb score dyalek',
  friendStep2: '② Wri QR code l sa7bek',
  friendStep3: '③ Sa7bek i-scann w il3ab nafs so2alat',
  friendStep4: '④ Qaren scores – l-ghlab kaseb XP ziyada! 🏆',
  friendShowQR: 'Wri had QR l sa7bek',
  friendQRInstruction: 'Sa7bek i-scann had code bash il3ab',
  friendDone: '✓ Rje3 l-Dar',
  friendScanTitle: '📷 Scanner Defi dyal Sa7bek',
  friendScanInstruction: 'Wihi caméra 3la QR dyal sa7bek',
  friendScanError: 'QR code machi mzyan. 3awed jarreb.',
  friendPermissionTitle: 'Khassna Camera',
  friendPermissionBtn: 'Sam7 l Camera',
  friendResultTitle: 'Natija 🏆',
  friendWinner: '🥇 Ghlab!',
  friendDraw: '🤝 Mshiw m3a ba3d!',
  friendYou: 'Nta',
  friendFriend: 'Sa7bek',
  friendPlayAgain: '🔄 L3ab m3a Sa7bek',
  locked: 'Msdoud 🔒',
  back: '← Rje3',
  englishNote: '',
  level: 'Level',
  streak: 'Yam',
};

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
  leaderboardTitle: 'الميدان 🏆',
  leaderboardEmpty: 'مازال ما كاين حد. بدا تعلم!',
  leaderboardBotLabel: '🤖 ديمو',
  darkMode: '🌙 وضع مظلم',
  searchModules: '🔍 ابحث عن درس...',
  shareProgress: '📤 شارك',
  streakCalendar: '🔥 أيام اللعب',
  friendChallengeTitle: '🤝 تحدي مع صاحبك',
  friendCreate: '🎯 اصنع تحدي',
  friendScan: '📷 سكان التحدي',
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

const FRENCH: AppStrings = {
  langName: 'Français',
  isRTL: false,
  tabHome: 'Accueil',
  tabModules: 'Cours',
  tabLeaderboard: 'Classement',
  tabBadges: 'Badges',
  tabSimulator: 'Simulateur',
  langSelectTitle: 'Choisissez votre langue',
  langSelectSub: 'Choose your language',
  onboard1Title: 'Bienvenue sur ExcelStar! 🎉',
  onboard1Desc: 'Apprenez Excel en jouant! Chaque leçon = XP + badge!',
  onboard2Title: 'Apprenez Excel en jouant! 🎮',
  onboard2Desc: 'Leçons, exercices, mini-jeux et badges – tout ensemble!',
  onboard3Title: 'Entrez votre nom et commencez! 🚀',
  onboard3Desc: 'Entrez votre nom et choisissez votre avatar.',
  nameLabel: 'Votre prénom:',
  namePlaceholder: 'Entrez votre prénom...',
  avatarLabel: 'Choisissez votre avatar:',
  startBtn: 'Commencer! 🚀',
  nextBtn: 'Suivant →',
  loading: 'Chargement...',
  greeting: 'Bonjour! 👋',
  gamesTitle: '🎮 Jeux & Défis',
  dailyChallengeTitle: 'Défi du jour 🔥',
  dailyChallengeDesc: 'Résolvez 5 questions et gagnez des XP!',
  quickQuizTitle: 'Quiz rapide ⚡',
  quickQuizDesc: 'Questions différentes à chaque fois',
  myModules: 'Mes cours 📚',
  checkBtn: 'Vérifier →',
  nextQ: 'Question suivante →',
  finishBtn: '🏁 Voir le résultat!',
  correct: 'Correct! 🎉',
  wrong: 'Incorrect! Courage 😊',
  showHint: '💡 Indice',
  hintLabel: '💡 Indice:',
  trueBtn: 'Vrai ✓',
  falseBtn: 'Faux ✗',
  correctAnswer: 'Bonne réponse:',
  reorderLabel: 'Réorganisez les parties:',
  result3: 'Excellent! Vous êtes une star! ⭐⭐⭐',
  result2: 'Bien! Continuez! ⭐⭐',
  result1: 'Pas mal, réessayez! 💪⭐',
  result0: 'Réessayez! Courage! 😊',
  xpEarned: 'XP gagnés:',
  nextLesson: 'Leçon suivante →',
  retryBtn: 'Réessayer',
  backHome: 'Accueil',
  simulatorTitle: 'Simulateur Excel 🖥️',
  simulatorHint: 'Touchez une cellule, entrez une valeur ou formule (commence par =)',
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
  challengeTitle: 'Défi du jour',
  dailyChallenge: 'Défi',
  hintCost: '(-10 pts)',
  noHints: 'Plus d\'indices!',
  challengeDone: 'Défi terminé aujourd\'hui ✅',
  challengeNextIn: 'Nouveau demain 🌙',
  tabGames: 'Jeux 🎮',
  gameCellNavName: 'Cell Navigator',
  gameCellNavDesc: 'Trouvez la cellule dans le tableau Excel!',
  gameFormulaName: 'Formula Fixer',
  gameFormulaDesc: 'Corrigez les formules Excel!',
  gameSpeedQuizName: 'Speed Quiz',
  gameSpeedQuizDesc: 'Répondez vite et gagnez des XP!',
  gamePlayBtn: 'Jouer! 🚀',
  gameRound: 'Round',
  gameScore: 'Score',
  gameOver: '🏁 Fin!',
  gameTapCell: 'Tapez la cellule:',
  gameTimeLeft: 'Temps restant:',
  gameStreakLabel: 'Série 🔥',
  gameXpBonus: 'XP bonus!',
  gameNext: 'Suivant →',
  continueLabel: 'Continuer →',
  modulesSubtitle: 'Recommence ou continue là où tu t\'es arrêté!',
  miniGamesTitle: '🎮 Mini Jeux',
  diffEasy: 'Débutant',
  diffMedium: 'Moyen',
  diffHard: 'Rapide',
  gameTipTitle: '💡 Comment gagner plus de XP?',
  gameTipText: '→ Répondre vite = bonus XP\n→ Série plus longue = multiplicateur plus grand\n→ Chaque défi = nouveau XP!',
  settingsTitle: 'Paramètres ⚙️',
  settingsProfileSection: 'Profil',
  settingsProfileLabel: 'Profil actif',
  settingsSwitchProfile: 'Changer de profil',
  settingsGenderSection: 'Genre',
  settingsMale: 'Garçon',
  settingsFemale: 'Fille',
  settingsSoundSection: 'Son & Vibration',
  settingsSoundLabel: '🔊 Son',
  settingsVibration: '📳 Vibration',
  settingsAboutSection: 'À propos',
  settingsSchool: 'École',
  settingsSubject: 'Matière',
  leaderboardTitle: 'Classement 🏆',
  leaderboardEmpty: 'Pas encore de joueurs. Commencez à apprendre!',
  leaderboardBotLabel: '🤖 Demo',
  darkMode: '🌙 Mode sombre',
  searchModules: '🔍 Rechercher un cours...',
  shareProgress: '📤 Partager',
  streakCalendar: '🔥 Jours actifs',
  friendChallengeTitle: '🤝 Défi Ami',
  friendCreate: '🎯 Créer un Défi',
  friendScan: '📷 Scanner un Défi',
  friendHowTitle: 'Comment ça marche?',
  friendStep1: '① Joue les questions – obtiens ton score',
  friendStep2: '② Montre le QR à ton ami',
  friendStep3: '③ Ton ami scanne et joue les mêmes questions',
  friendStep4: '④ Comparez les scores – le gagnant obtient + XP! 🏆',
  friendShowQR: 'Montre ce QR à ton ami',
  friendQRInstruction: 'Ton ami doit scanner ce code pour jouer',
  friendDone: '✓ Retour',
  friendScanTitle: '📷 Scanner le Défi',
  friendScanInstruction: "Pointe la caméra sur le QR de ton ami",
  friendScanError: 'QR invalide. Réessaie.',
  friendPermissionTitle: 'Accès Caméra requis',
  friendPermissionBtn: 'Autoriser la Caméra',
  friendResultTitle: 'Résultats 🏆',
  friendWinner: '🥇 Gagnant!',
  friendDraw: '🤝 Égalité!',
  friendYou: 'Toi',
  friendFriend: 'Ami',
  friendPlayAgain: '🔄 Rejouer',
  locked: 'Verrouillé 🔒',
  back: '← Retour',
  englishNote: '',
  level: 'Niveau',
  streak: 'Jours',
};

const ENGLISH: AppStrings = {
  langName: 'English',
  isRTL: false,
  tabHome: 'Home',
  tabModules: 'Courses',
  tabLeaderboard: 'Leaderboard',
  tabBadges: 'Badges',
  tabSimulator: 'Simulator',
  langSelectTitle: 'Choose your language',
  langSelectSub: 'Choose your language',
  onboard1Title: 'Welcome to ExcelStar! 🎉',
  onboard1Desc: 'Learn Excel by playing! Every lesson = XP + new badge!',
  onboard2Title: 'Learn Excel by playing! 🎮',
  onboard2Desc: 'Lessons, exercises, mini-games and badges – all together!',
  onboard3Title: 'Enter your name and start! 🚀',
  onboard3Desc: 'Enter your name and choose your avatar.',
  nameLabel: 'Your name:',
  namePlaceholder: 'Enter your name...',
  avatarLabel: 'Choose your avatar:',
  startBtn: 'Start now! 🚀',
  nextBtn: 'Next →',
  loading: 'Loading...',
  greeting: 'Hello! 👋',
  gamesTitle: '🎮 Games & Challenges',
  dailyChallengeTitle: 'Daily Challenge 🔥',
  dailyChallengeDesc: 'Solve 5 questions and earn XP!',
  quickQuizTitle: 'Quick Quiz ⚡',
  quickQuizDesc: 'Different questions every time',
  myModules: 'My courses 📚',
  checkBtn: 'Check Answer →',
  nextQ: 'Next Question →',
  finishBtn: '🏁 See Results!',
  correct: 'Correct! 🎉',
  wrong: 'Wrong! Try again 😊',
  showHint: '💡 Hint',
  hintLabel: '💡 Hint:',
  trueBtn: 'True ✓',
  falseBtn: 'False ✗',
  correctAnswer: 'Correct answer:',
  reorderLabel: 'Reorder the parts:',
  result3: 'Excellent! You are a star! ⭐⭐⭐',
  result2: 'Good job! Keep going! ⭐⭐',
  result1: 'Almost there, try again! 💪⭐',
  result0: 'Try again! You can do it! 😊',
  xpEarned: 'XP earned:',
  nextLesson: 'Next lesson →',
  retryBtn: 'Retry',
  backHome: 'Home',
  simulatorTitle: 'Excel Simulator 🖥️',
  simulatorHint: 'Tap a cell, enter a value or formula (start with =)',
  fnSum: 'SUM',
  fnAvg: 'AVERAGE',
  fnIf: 'IF',
  fnCount: 'COUNT',
  fnCountIf: 'COUNTIF',
  fnMax: 'MAX',
  fnMin: 'MIN',
  fnLeft: 'LEFT',
  fnRight: 'RIGHT',
  fnUpper: 'UPPER',
  challengeTitle: 'Daily Challenge',
  dailyChallenge: 'Challenge',
  hintCost: '(-10 pts)',
  noHints: 'No hints left!',
  challengeDone: 'Done for today ✅',
  challengeNextIn: 'New one tomorrow 🌙',
  tabGames: 'Games 🎮',
  gameCellNavName: 'Cell Navigator',
  gameCellNavDesc: 'Find the cell in the Excel grid!',
  gameFormulaName: 'Formula Fixer',
  gameFormulaDesc: 'Fix the broken Excel formulas!',
  gameSpeedQuizName: 'Speed Quiz',
  gameSpeedQuizDesc: 'Answer fast and earn XP!',
  gamePlayBtn: 'Play Now! 🚀',
  gameRound: 'Round',
  gameScore: 'Score',
  gameOver: '🏁 Game Over!',
  gameTapCell: 'Tap the cell:',
  gameTimeLeft: 'Time left:',
  gameStreakLabel: 'Streak 🔥',
  gameXpBonus: 'XP bonus!',
  gameNext: 'Next →',
  continueLabel: 'Continue →',
  modulesSubtitle: 'Start from the beginning or continue where you left off!',
  miniGamesTitle: '🎮 Mini Games',
  diffEasy: 'Beginner',
  diffMedium: 'Medium',
  diffHard: 'Fast',
  gameTipTitle: '💡 How to earn more XP?',
  gameTipText: '→ Answer fast = XP bonus\n→ Longer streak = bigger multiplier\n→ Every challenge = new XP!',
  settingsTitle: 'Settings ⚙️',
  settingsProfileSection: 'Profile',
  settingsProfileLabel: 'Active profile',
  settingsSwitchProfile: 'Switch profile',
  settingsGenderSection: 'Gender',
  settingsMale: 'Boy',
  settingsFemale: 'Girl',
  settingsSoundSection: 'Sound & Vibration',
  settingsSoundLabel: '🔊 Sound',
  settingsVibration: '📳 Vibration',
  settingsAboutSection: 'About ExcelStar',
  settingsSchool: 'School',
  settingsSubject: 'Subject',
  leaderboardTitle: 'Leaderboard 🏆',
  leaderboardEmpty: 'No players yet. Start learning!',
  leaderboardBotLabel: '🤖 Demo',
  darkMode: '🌙 Dark Mode',
  searchModules: '🔍 Search for a module...',
  shareProgress: '📤 Share',
  streakCalendar: '🔥 Active Days',
  friendChallengeTitle: '🤝 Friend Challenge',
  friendCreate: '🎯 Create Challenge',
  friendScan: '📷 Scan Challenge',
  friendHowTitle: 'How it works?',
  friendStep1: '① Play questions – get your score',
  friendStep2: '② Show the QR code to your friend',
  friendStep3: '③ Friend scans and plays the same questions',
  friendStep4: '④ Compare scores – winner gets bonus XP! 🏆',
  friendShowQR: 'Show this QR to your friend',
  friendQRInstruction: 'Your friend must scan this code to play',
  friendDone: '✓ Done',
  friendScanTitle: '📷 Scan Friend\'s Challenge',
  friendScanInstruction: "Point the camera at your friend's QR",
  friendScanError: 'Invalid QR code. Try again.',
  friendPermissionTitle: 'Camera Access Required',
  friendPermissionBtn: 'Allow Camera',
  friendResultTitle: 'Results 🏆',
  friendWinner: '🥇 Winner!',
  friendDraw: '🤝 It\'s a draw!',
  friendYou: 'You',
  friendFriend: 'Friend',
  friendPlayAgain: '🔄 Play Again',
  locked: 'Locked 🔒',
  back: '← Back',
  englishNote: 'In English mode, Excel functions use English names: SUM, AVERAGE, IF, COUNT...',
  level: 'Level',
  streak: 'Days',
};

export const LANGUAGE_STRINGS: Record<AppLanguage, AppStrings> = {
  'darija-lat': DARIJA_LAT,
  'darija-ar': DARIJA_AR,
  'fr': FRENCH,
  'en': ENGLISH,
};

export const LANGUAGE_OPTIONS: { id: AppLanguage; name: string; flag: string; sub: string }[] = [
  { id: 'darija-ar', name: 'دارجة', flag: '🇲🇦', sub: 'بالحروف العربية' },
  { id: 'darija-lat', name: 'Darija', flag: '🇲🇦', sub: 'b 7rof Latin' },
  { id: 'fr', name: 'Français', flag: '🇫🇷', sub: 'En français' },
  { id: 'en', name: 'English', flag: '🇬🇧', sub: 'In English (SUM, IF...)' },
];
