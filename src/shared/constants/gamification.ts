export const LEVELS = [
  { level: 1, name: 'Mbtadi',     nameAr: 'مبتدئ',        xpRequired: 0,    badge: '🌱', color: '#2ECC71' },
  { level: 2, name: 'Talmid',     nameAr: 'تلميذ',        xpRequired: 100,  badge: '📚', color: '#F39C12' },
  { level: 3, name: 'Motawasset', nameAr: 'متوسط',        xpRequired: 300,  badge: '⭐', color: '#E67E22' },
  { level: 4, name: 'Mtaqqan',    nameAr: 'متقن',         xpRequired: 600,  badge: '🔥', color: '#3498DB' },
  { level: 5, name: 'Expert',     nameAr: 'خبير',         xpRequired: 1000, badge: '💎', color: '#9B59B6' },
  { level: 6, name: 'Excel Star', nameAr: 'نجم إكسيل',   xpRequired: 1500, badge: '🏆', color: '#E74C3C' },
];

export const XP_REWARDS = {
  lessonCompleted: 20,
  exercisePerfect: 30,
  exerciseGood: 20,
  exercisePass: 10,
  badgeEarned: 50,
  streakBonus: 15,
};

export const STAR_THRESHOLDS = {
  three: 90,
  two: 70,
  one: 50,
};

export const BADGES = [
  { id: 'first_lesson',   name: 'Awwel Khotwa', icon: '🎯', desc: 'Kmelti awwel dars!' },
  { id: 'module1_done',   name: 'Navigator',    icon: '🗺️', desc: '3refti interface d Excel!' },
  { id: 'module2_done',   name: 'Designer',     icon: '🎨', desc: 'Zweyenti Excel!' },
  { id: 'module3_done',   name: 'Formula Pro',  icon: '🧮', desc: '3endek formules dial Excel!' },
  { id: 'module4_done',   name: 'Data Master',  icon: '📊', desc: 'Rattebti data mzyan!' },
  { id: 'module5_done',   name: 'Rassam',       icon: '📈', desc: 'Darty graphique zwine!' },
  { id: 'module6_done',   name: 'Formule Star', icon: '🌟', desc: 'Formules avancées – khdert!' },
  { id: 'module7_done',   name: 'Printeur',     icon: '🖨️', desc: '3refti print mzyan!' },
  { id: 'perfect_score',  name: '100%',         icon: '💯', desc: 'Jaweb sahi bzzaf!' },
  { id: 'streak_3',       name: 'Moustamirr',   icon: '🔥', desc: '3 drous f ness wahda!' },
  { id: 'streak_7',       name: 'Champion 7',   icon: '⚡', desc: '7 yam f ness!' },
  { id: 'all_modules',    name: 'Excel Star ⭐', icon: '🏆', desc: 'Kmelti koll modules!' },
  { id: 'leaderboard_1',  name: 'L-Awwal',      icon: '👑', desc: 'Nta/Nti l-awwal f classeur!' },
  { id: 'exercises_50',   name: 'Nshit',        icon: '💪', desc: '50 exercise kmelti!' },
];

export const AVATARS = ['🧑‍🎓', '👩‍🎓', '🧑‍💻', '👩‍💻', '🦁', '🐯', '🦊', '🐸', '🚀', '⭐', '🎯', '🏆'];
