import { AppLanguage } from './strings';
import { StudentGender } from '../../domain/student/Student';

export interface GenderedPair {
  male: string;
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
    male:   'ممتاز! كملتي الدرس ب 3 نجوم – نتا وجه حلوين! ⭐⭐⭐',
    female: 'ممتازة! كملتي الدرس ب 3 نجوم – نتي وجهة حلوينة! ⭐⭐⭐',
  },
  result2: {
    male:   'مزيان! كملتي ب 2 نجوم – عاود باش تربح الثالثة 🪴⭐⭐',
    female: 'مزيانة! كملتي ب 2 نجوم – عاودي باش تربحي الثالثة 🪴⭐⭐',
  },
  result1: {
    male:   'ابتداء مزيان! راه كامل تقدم – زيد كمل 💪⭐',
    female: 'ابتداء مزيان! راهي كاملة تقدم – زيدي كملي 💪⭐',
  },
  result0: {
    male:   'لا عليش – عاود الدرس مرة خرى، نتا قادر! 🪴',
    female: 'لا عليش – عاودي الدرس مرة خرى، نتي قادرة! 🪴',
  },
  welcomeBack: {
    male:   'مرحبا بيك! واش مستعد تتعلم؟ 👋',
    female: 'مرحبا بيكي! واش مستعدة تتعلمي؟ 👋',
  },
  wellDone: {
    male:   'برافو عليك! نتا كاين! 🎉',
    female: 'برافو عليكي! نتي كاينة! 🎉',
  },
  correct: {
    male:   'صحيح! برافو عليك 👏',
    female: 'صحيحة! برافو عليكي 👏',
  },
  wrong: {
    male:   'غلطتي – لا عليش، الغلط كيعلم 😊',
    female: 'غلطتي – لا عليش، الغلط كيعلم 😊',
  },
  levelUp: {
    male:   'وصلتي لمستوى جديد! دابا نتا {level}! 🎉🏆',
    female: 'وصلتي لمستوى جديد! دابا نتي {level}! 🎉🏆',
  },
  badgeEarned: {
    male:   'مبروك! ربحتي شارة "{badge}" – نتا تستاهلها! 🏅',
    female: 'مبروك! ربحتي شارة "{badge}" – نتي تستاهليها! 🏅',
  },
  encourageMid: {
    male:   'زيد! نتا قريب من نهاية الدرس 🪴',
    female: 'زيدي! نتي قريبة من نهاية الدرس 🪴',
  },
  encourageAfterWrong: {
    male:   'الغلط كيعلم – عاود بثقة 💪',
    female: 'الغلط كيعلم – عاودي بثقة 💪',
  },
  gameWin: {
    male:   'ربحتي اللعبة! نتا بطل! 🏆',
    female: 'ربحتي اللعبة! نتي بطلة! 🏆',
  },
  gameLose: {
    male:   'لا عليش – عاود جرب، نتا قادر تربح! 🪴',
    female: 'لا عليش – عاودي جربي، نتي قادرة تربحي! 🪴',
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
