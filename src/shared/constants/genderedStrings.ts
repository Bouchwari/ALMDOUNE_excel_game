import { AppLanguage } from './strings';
import { StudentGender } from '../../domain/student/Student';

export interface GenderedPair {
  male : string;
  female: string;
}

export interface GenderedStrings {
  result3: GenderedPair;
  result2: GenderedPair;
  result1: GenderedPair;
  result0: GenderedPair;
  welcomeBack: GenderedPair;
  wellDone: GenderedPair;
  correct: GenderedPair;
  wrong: GenderedPair;
  levelUp: GenderedPair;
  badgeEarned: GenderedPair;
  encourageMid: GenderedPair;
  encourageAfterWrong: GenderedPair;
  gameWin: GenderedPair;
  gameLose: GenderedPair;
}

const DARIJA_AR: GenderedStrings = {
  result3: {
    male :  'مزيان بزاف عليك! كملتي الدرس ب 3 نجوم 🌟',
    female: 'مزيانة بزاف عليك! كملتي الدرس ب 3 نجوم 🌟',
  },
  result2: {
    male :  'مزيان! بقا غير شوية على النجمة الثالثة ⭐⭐',
    female: 'مزيانة! بقا غير شوية على النجمة الثالثة ⭐⭐',
  },
  result1: {
    male :  'بداية مزيانة! زيد كمل، راه الطريق باينة 💪⭐',
    female: 'بداية مزيانة! زيدي كملي، راه الطريق باينة 💪⭐',
  },
  result0: {
    male :  'ما عليش — عاود الدرس مرة خرى، نتا قادر! 💪',
    female: 'ما عليش — عاودي الدرس مرة خرى، نتي قادرة! 💪',
  },
  welcomeBack: {
    male :  'مرحبا بيك! واجد نبداو؟ 👋',
    female: 'مرحبا بيك! واجدة نبداو؟ 👋',
  },
  wellDone: {
    male :  'برافو عليك! خدمتيها مزيان 🎉',
    female: 'برافو عليك! خدمتيها مزيان 🎉',
  },
  correct: {
    male :  'صح! برافو عليك 👏',
    female: 'صح! برافو عليك 👏',
  },
  wrong: {
    male :  'غلطيتي — ما عليش، الغلط كيعلم 😊',
    female: 'غلطيتي — ما عليش، الغلط كيعلم 😊',
  },
  levelUp: {
    male :  'وصلتي لمستوى جديد! دابا نتا {level}! 🎉🏆',
    female: 'وصلتي لمستوى جديد! دابا نتي {level}! 🎉🏆',
  },
  badgeEarned: {
    male :  'مبروك! ربحتي شارة "{badge}" — تستاهلها 🏅',
    female: 'مبروك! ربحتي شارة "{badge}" — تستاهليها 🏅',
  },
  encourageMid: {
    male :  'يالله، كمل — قريب من النهاية!',
    female: 'يالله، كاملي — قريبة من النهاية!',
  },
  encourageAfterWrong: {
    male :  'الغلط كيعلم – عاود بثقة 💪',
    female: 'الغلط كيعلم – عاودي بثقة 💪',
  },
  gameWin: {
    male :  'ربحتي اللعبة! نتا بطل! 🏆',
    female: 'ربحتي اللعبة! نتي بطلة! 🏆',
  },
  gameLose: {
    male :  'ما عليش — عاود جرب، نتا قادر تربح! 💪',
    female: 'ما عليش — عاودي جربي، نتي قادرة تربحي! 💪',
  },
};

// TODO (Google Play expansion): Add 'fr': FRENCH_GENDERED, 'en': ENGLISH_GENDERED here
// and import from ./_future_langs/fr_gendered.ts and ./_future_langs/en_gendered.ts
export const GENDERED_STRINGS: Record<AppLanguage, GenderedStrings> = {
  'darija-ar': DARIJA_AR,
};

export function pickGendered(pair: GenderedPair, gender: StudentGender): string {
  return gender === 'female' ? pair.female : pair.male;
}
