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

const DARIJA_LAT: GenderedStrings = {
  result3: {
    male:   'Mzyan bzaf! Nta star! ⭐⭐⭐',
    female: 'Mzyana bzaf! Nti star! ⭐⭐⭐',
  },
  result2: {
    male:   'Mzyan! Zid 3la haka! ⭐⭐',
    female: 'Mzyana! Zidi 3la haka! ⭐⭐',
  },
  result1: {
    male:   'Ma3lich, zid 7awel! 💪⭐',
    female: 'Ma3lich, zidi 7awli! 💪⭐',
  },
  result0: {
    male:   'Ma3lich, 3awed 7awel! 😊',
    female: 'Ma3lich, 3awdi 7awli! 😊',
  },
  welcomeBack: {
    male:   'Merhba bik! 👋',
    female: 'Merhba bik! 👋',
  },
  wellDone: {
    male:   'Bravo! 🎉',
    female: 'Bravo! 🎉',
  },
};

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
    female: 'مرحبا بيك! 👋',
  },
  wellDone: {
    male:   'برافو! 🎉',
    female: 'برافو! 🎉',
  },
};

const FRENCH: GenderedStrings = {
  result3: {
    male:   'Excellent! Tu es une star! ⭐⭐⭐',
    female: 'Excellente! Tu es une star! ⭐⭐⭐',
  },
  result2: {
    male:   'Bien! Continue! ⭐⭐',
    female: 'Bien! Continue! ⭐⭐',
  },
  result1: {
    male:   'Pas mal, réessaie! 💪⭐',
    female: 'Pas mal, réessaie! 💪⭐',
  },
  result0: {
    male:   'Réessaie! Courage! 😊',
    female: 'Réessaie! Courage! 😊',
  },
  welcomeBack: {
    male:   'Bonjour! 👋',
    female: 'Bonjour! 👋',
  },
  wellDone: {
    male:   'Bravo! 🎉',
    female: 'Bravo! 🎉',
  },
};

const ENGLISH: GenderedStrings = {
  result3: {
    male:   'Excellent! You are a star! ⭐⭐⭐',
    female: 'Excellent! You are a star! ⭐⭐⭐',
  },
  result2: {
    male:   'Good job! Keep going! ⭐⭐',
    female: 'Good job! Keep going! ⭐⭐',
  },
  result1: {
    male:   'Almost there, try again! 💪⭐',
    female: 'Almost there, try again! 💪⭐',
  },
  result0: {
    male:   'Try again! You can do it! 😊',
    female: 'Try again! You can do it! 😊',
  },
  welcomeBack: {
    male:   'Hello! 👋',
    female: 'Hello! 👋',
  },
  wellDone: {
    male:   'Well done! 🎉',
    female: 'Well done! 🎉',
  },
};

export const GENDERED_STRINGS: Record<AppLanguage, GenderedStrings> = {
  'darija-lat': DARIJA_LAT,
  'darija-ar':  DARIJA_AR,
  'fr':         FRENCH,
  'en':         ENGLISH,
};

export function pickGendered(pair: GenderedPair, gender: StudentGender): string {
  return gender === 'female' ? pair.female : pair.male;
}
