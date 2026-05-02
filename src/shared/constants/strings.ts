export type AppLanguage = 'darija-ar' | 'fr' | 'en';

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
  gameCellNameQuestion: string;
  gameFixFormula: string;
  friendArrowHint: string;

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

  // Module / Lesson labels
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

  // Theme
  darkMode: string;

  // Search
  searchModules: string;

  // Share
  shareProgress: string;

  // Streak Calendar
  streakCalendar: string;

  // Class Challenge (group)
  classChallengeTitle: string;
  classChallengeSubtitle: string;
  classChallengeQRInstruction: string;
  classChallengePlaySelf: string;
  classChallengeResultTitle: string;
  classChallengeShareHint: string;
  classChallengeDone: string;

  // Friend Challenge (multiplayer)
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
  fillBlankPlaceholder: 'Écrivez votre réponse...',
  correctOrderLabel: 'Ordre correct:',
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
  gameCellNameQuestion: 'Comment s\'appelle cette cellule? 🟩',
  gameFixFormula: '🔧 Corrige cette formule:',
  friendArrowHint: '⬇ Montre ce QR à ton ami ⬇',
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
  moduleDone: '✅ Terminé',
  lessonConceptLabel: 'Concept',
  lessonStepsLabel: 'Étapes:',
  lessonFormulaLabel: '📐 Formule:',
  lessonExampleLabel: '📌 Exemple:',
  lessonShortcutsLabel: '⌨️ Raccourcis clavier:',
  lessonTipLabel: '💡 Astuce:',
  lessonMiniGame: '🎮 Mini-Jeu!',
  leaderboardTitle: 'Classement 🏆',
  leaderboardEmpty: 'Pas encore de joueurs. Commencez à apprendre!',
  leaderboardBotLabel: '🤖 Demo',
  leaderboardOnlyOne: 'Invite tes amis à installer l\'app pour voir le classement! 🏆',
  leaderboardYouHere: '← toi ici',
  darkMode: '🌙 Mode sombre',
  searchModules: '🔍 Rechercher un cours...',
  shareProgress: '📤 Partager',
  streakCalendar: '🔥 Jours actifs',
  classChallengeTitle: '👨‍🏫 Défi de Classe',
  classChallengeSubtitle: 'Choisissez la difficulté et le nombre de questions',
  classChallengeQRInstruction: 'Chaque élève scanne ce QR pour jouer',
  classChallengePlaySelf: '▶ Jouer soi-même',
  classChallengeResultTitle: 'Ton résultat 🎯',
  classChallengeShareHint: 'Montre ce QR à la classe',
  classChallengeDone: '✓ Retour',
  friendChallengeTitle: '🤝 Défi Ami',
  friendCreate: '🎯 Créer un Défi',
  friendCreateSub: 'Joue et envoie le QR à ton ami',
  friendScan: '📷 Scanner un Défi',
  friendScanSub: 'Scanne le QR de ton ami et joue',
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
  fillBlankPlaceholder: 'Type your answer...',
  correctOrderLabel: 'Correct order:',
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
  gameCellNameQuestion: 'What is this cell called? 🟩',
  gameFixFormula: '🔧 Fix this formula:',
  friendArrowHint: '⬇ Show this QR to your friend ⬇',
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
  moduleDone: '✅ Done',
  lessonConceptLabel: 'Concept',
  lessonStepsLabel: 'Steps:',
  lessonFormulaLabel: '📐 Formula:',
  lessonExampleLabel: '📌 Example:',
  lessonShortcutsLabel: '⌨️ Keyboard shortcuts:',
  lessonTipLabel: '💡 Tip:',
  lessonMiniGame: '🎮 Mini-Game!',
  leaderboardTitle: 'Leaderboard 🏆',
  leaderboardEmpty: 'No players yet. Start learning!',
  leaderboardBotLabel: '🤖 Demo',
  leaderboardOnlyOne: 'Ask friends to install the app to see the ranking! 🏆',
  leaderboardYouHere: '← you',
  darkMode: '🌙 Dark Mode',
  searchModules: '🔍 Search for a module...',
  shareProgress: '📤 Share',
  streakCalendar: '🔥 Active Days',
  classChallengeTitle: '👨‍🏫 Class Challenge',
  classChallengeSubtitle: 'Choose difficulty and number of questions',
  classChallengeQRInstruction: 'Each student scans this QR to play',
  classChallengePlaySelf: '▶ Play yourself',
  classChallengeResultTitle: 'Your result 🎯',
  classChallengeShareHint: 'Show this QR to the class',
  classChallengeDone: '✓ Done',
  friendChallengeTitle: '🤝 Friend Challenge',
  friendCreate: '🎯 Create Challenge',
  friendCreateSub: 'Play and send the QR to your friend',
  friendScan: '📷 Scan Challenge',
  friendScanSub: 'Scan your friend\'s QR and play',
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
  'darija-ar': DARIJA_AR,
  'fr': FRENCH,
  'en': ENGLISH,
};

export const LANGUAGE_OPTIONS: { id: AppLanguage; name: string; flag: string; sub: string }[] = [
  { id: 'darija-ar', name: 'دارجة', flag: '🇲🇦', sub: 'بالحروف العربية' },
  { id: 'fr', name: 'Français', flag: '🇫🇷', sub: 'En français' },
  { id: 'en', name: 'English', flag: '🇬🇧', sub: 'In English (SUM, IF...)' },
];
