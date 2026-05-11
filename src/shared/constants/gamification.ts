export const LEVELS = [
  { level: 1, name: 'مبتدئ',       nameAr: 'مبتدئ',        xpRequired: 0,    badge: '🌱', color: '#2ECC71' },
  { level: 2, name: 'تلميذ',       nameAr: 'تلميذ',        xpRequired: 100,  badge: '📚', color: '#F39C12' },
  { level: 3, name: 'متوسط',       nameAr: 'متوسط',        xpRequired: 300,  badge: '⭐', color: '#E67E22' },
  { level: 4, name: 'متقن',        nameAr: 'متقن',         xpRequired: 600,  badge: '🔥', color: '#3498DB' },
  { level: 5, name: 'Expert',      nameAr: 'خبير',         xpRequired: 1000, badge: '💎', color: '#9B59B6' },
  { level: 6, name: 'نجم ألمدون',  nameAr: 'نجم ألمدون',   xpRequired: 1500, badge: '🏆', color: '#E74C3C' },
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
  { id: 'first_lesson',   name: 'أول خطوة',      icon: '🎯', desc: 'كملتي أول درس!' },
  { id: 'module1_done',   name: 'Navigator',     icon: '🗺️', desc: 'عرفتي وجه Excel مزيان!' },
  { id: 'module2_done',   name: 'Designer',      icon: '🎨', desc: 'نسّقتي Excel بزاف!' },
  { id: 'module3_done',   name: 'Formula Pro',   icon: '🧮', desc: 'الفورميلات ولات عندك واضحة!' },
  { id: 'module4_done',   name: 'Data Master',   icon: '📊', desc: 'رتبتي المعطيات مزيان!' },
  { id: 'module5_done',   name: 'رسام',          icon: '📈', desc: 'دريتي رسم بياني زوين!' },
  { id: 'module6_done',   name: 'Formule Star',  icon: '🌟', desc: 'الفورميلات المتقدمة خدمتيها!' },
  { id: 'module7_done',   name: 'طابع',          icon: '🖨️', desc: 'عرفتي تطبعي مزيان!' },
  { id: 'perfect_score',  name: '100%',          icon: '💯', desc: 'جاوبتي صح بزاف!' },
  { id: 'streak_3',       name: 'مستمر',         icon: '🔥', desc: '3 دروس فـ نفس اليوم!' },
  { id: 'streak_7',       name: 'Champion 7',    icon: '⚡', desc: '7 أيام متواصلة!' },
  { id: 'all_modules',    name: 'نجم ألمدون ⭐',  icon: '🏆', desc: 'كملتي كل الدروس!' },
  { id: 'leaderboard_1',  name: 'الأول',         icon: '👑', desc: 'راك الأول فـ الترتيب!' },
  { id: 'exercises_50',   name: 'نشيط',          icon: '💪', desc: 'كملتي 50 تمرين!' },
];

export const AVATARS = ['🧑‍🎓', '👩‍🎓', '🧑‍💻', '👩‍💻', '🦁', '🐯', '🦊', '🐸', '🚀', '⭐', '🎯', '🏆'];
