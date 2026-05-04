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
}

const DARIJA_AR: GenderedStrings = {
  result3: {
    male:   'مزيان بزاف! نتا ستار! ⭐⭐⭐',
    female: 'مزيانة بزاف! نتي ستار! ⭐⭐⭐',
  },
  result2: {
    male:   'مزيان! زيد على هاكا! ⭐⭐',
    female: 'مزيانة! زيدي على هاكا! ⭐⭐',
  },
  result1: {
    male:   'ما عليش، زيد حاول! 💪⭐',
    female: 'ما عليش، زيدي حاولي! 💪⭐',
  },
  result0: {
    male:   'ما عليش، عاود حاول! 😊',
    female: 'ما عليش، عاودي حاولي! 😊',
  },
  welcomeBack: {
    male:   'مرحبا بيك! 👋',
    female: 'مرحبا بيكي! 👋',
  },
  wellDone: {
    male:   'برافو عليك! 🎉',
    female: 'برافو عليكي! 🎉',
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
