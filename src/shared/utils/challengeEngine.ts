import { Exercise } from '../../domain/curriculum/Exercise';
import { AppLanguage } from '../constants/strings';

// Pool of challenge questions organized by difficulty (1=easy, 2=medium, 3=hard)
const QUESTION_POOL: {
  difficulty: 1 | 2 | 3;
  lang: 'any' | AppLanguage;
  exercise: Exercise;
}[] = [
  // ── Difficulty 1 – Basic interface ──
  {
    difficulty: 1, lang: 'any',
    exercise: {
      id: 'chal-1', type: 'multiple_choice',
      question: 'Chno kaytsmma fichier Excel kollu? / What is a complete Excel file called?',
      options: ['Feuille / Sheet', 'Classeur / Workbook', 'Cellule / Cell', 'Ruban / Ribbon'],
      correctIndex: 1,
      hint: 'Bhal daftar kamel – like a complete notebook.',
    },
  },
  {
    difficulty: 1, lang: 'any',
    exercise: {
      id: 'chal-2', type: 'true_false',
      question: 'Cellule A1 hiya f awwel saff w awwel 3amud. / Cell A1 is in the first row and first column.',
      correctIndex: 0,
      hint: 'A = 3amud awwal, 1 = saff awwal.',
    },
  },
  {
    difficulty: 1, lang: 'any',
    exercise: {
      id: 'chal-3', type: 'multiple_choice',
      question: 'Fin kayen l-Ruban f Excel? / Where is the Ribbon in Excel?',
      options: ['F l-bas / Bottom', 'F l-yasar / Left', 'F l-fwq / Top', 'F l-wsat / Center'],
      correctIndex: 2,
      hint: 'L-Ruban kayen fo9 dima.',
    },
  },
  {
    difficulty: 1, lang: 'any',
    exercise: {
      id: 'chal-4', type: 'multiple_choice',
      question: 'Chno hiya smiya d cellule f 3amud B, saff 3? / What is the name of the cell in column B, row 3?',
      options: ['A3', 'B3', 'C3', 'B2'],
      correctIndex: 1,
      hint: '3amud B + saff 3 = B3',
    },
  },
  {
    difficulty: 1, lang: 'any',
    exercise: {
      id: 'chal-5', type: 'true_false',
      question: 'F Excel, koll cellule 3endha smiya wahdha fakat. / In Excel, each cell has a unique name.',
      correctIndex: 0,
      hint: 'Smiya = 7arf l-3amud + raqm saff.',
    },
  },
  // ── Difficulty 1 – Formulas basic ──
  {
    difficulty: 1, lang: 'any',
    exercise: {
      id: 'chal-6', type: 'multiple_choice',
      question: 'Kifach tbda formule f Excel? / How do you start a formula in Excel?',
      options: ['b 7arf A', 'b # sign', 'b = sign', 'b + sign'],
      correctIndex: 2,
      hint: 'Koll formule kaybda b signe = (égal).',
    },
  },
  {
    difficulty: 1, lang: 'any',
    exercise: {
      id: 'chal-7', type: 'fill_blank',
      question: 'Formule bach tjm3 A1 w B1 f Excel: =___+B1',
      correctAnswer: 'A1',
      placeholder: 'Kteb...',
      hint: 'Smiya d cellule l-wla: 7arf A + raqm 1.',
    },
  },
  // ── Difficulty 2 – Functions ──
  {
    difficulty: 2, lang: 'any',
    exercise: {
      id: 'chal-8', type: 'multiple_choice',
      question: 'Ash kat3ml fonction SOMME / SUM?',
      options: ['Kat7seb moyenne', 'Katjm3 arqam', 'Kat3t max', 'Kat3dd cellulat'],
      correctIndex: 1,
      hint: 'SOMME = tjm3 koll arqam f l-range.',
    },
  },
  {
    difficulty: 2, lang: 'any',
    exercise: {
      id: 'chal-9', type: 'fill_blank',
      question: 'Formule bach tjm3 mn A1 l A5:\n=___(A1:A5)',
      correctAnswer: 'SOMME',
      placeholder: 'Kteb isem l-fonction...',
      hint: 'Fonction li katjm3 = SOMME (aw SUM f English)',
    },
  },
  {
    difficulty: 2, lang: 'any',
    exercise: {
      id: 'chal-10', type: 'multiple_choice',
      question: 'MOYENNE(10,20,30) = ?',
      options: ['60', '20', '30', '15'],
      correctIndex: 1,
      hint: '(10+20+30) ÷ 3 = 60 ÷ 3 = 20',
    },
  },
  {
    difficulty: 2, lang: 'any',
    exercise: {
      id: 'chal-11', type: 'true_false',
      question: 'MAX(5, 12, 3, 8) = 12',
      correctIndex: 0,
      hint: 'MAX katred 3t9al raqm f l-liste.',
    },
  },
  {
    difficulty: 2, lang: 'any',
    exercise: {
      id: 'chal-12', type: 'multiple_choice',
      question: 'Formule =A1+A2+A3 – wash mmkn nktbha b fonction?',
      options: ['=MOYENNE(A1:A3)', '=SOMME(A1:A3)', '=MAX(A1:A3)', '=MIN(A1:A3)'],
      correctIndex: 1,
      hint: 'SOMME katjm3 range d cellulat.',
    },
  },
  {
    difficulty: 2, lang: 'any',
    exercise: {
      id: 'chal-13', type: 'multiple_choice',
      question: 'Ash kat3ml fonction SI / IF?',
      options: ['Kat7seb moyenne', 'Kat3t condition: wash sh7i7 aw ghalt', 'Katjm3 arqam', 'Kat3t min'],
      correctIndex: 1,
      hint: 'SI = condition – ida X → 3t Y, mala 3t Z.',
    },
  },
  // ── Difficulty 3 – Advanced ──
  {
    difficulty: 3, lang: 'any',
    exercise: {
      id: 'chal-14', type: 'fill_blank',
      question: 'Formule li kat7seb moyenne d A1 l A10:\n=___(A1:A10)',
      correctAnswer: 'MOYENNE',
      placeholder: 'Kteb isem l-fonction...',
      hint: 'MOYENNE (aw AVERAGE f English)',
    },
  },
  {
    difficulty: 3, lang: 'any',
    exercise: {
      id: 'chal-15', type: 'multiple_choice',
      question: '=SI(A1>10,"Reçu","Échoué") – ida A1=15, ash katred l-formule?',
      options: ['Échoué', 'Reçu', '15', '#ERREUR!'],
      correctIndex: 1,
      hint: '15 > 10 = sh7i7 → 3t valeur première: "Reçu"',
    },
  },
  {
    difficulty: 3, lang: 'any',
    exercise: {
      id: 'chal-16', type: 'multiple_choice',
      question: '=SI(B1<10,"Échoué","Reçu") – ida B1=8, ash katred?',
      options: ['Reçu', 'Échoué', '8', '#DIV/0!'],
      correctIndex: 1,
      hint: '8 < 10 = sh7i7 → "Échoué"',
    },
  },
  {
    difficulty: 3, lang: 'any',
    exercise: {
      id: 'chal-17', type: 'true_false',
      question: '=SOMME(A1:A3) w =A1+A2+A3 katreddo nafs l-natija.',
      correctIndex: 0,
      hint: 'Nimayn katjm3o A1, A2, A3 – nafs l-natija.',
    },
  },
  {
    difficulty: 3, lang: 'any',
    exercise: {
      id: 'chal-18', type: 'multiple_choice',
      question: 'Ash ma3na NB (COUNT) f Excel?',
      options: ['Katjm3 arqam', 'Kat3dd cellulat li fiha arqam', 'Katred max', 'Kat7seb moyenne'],
      correctIndex: 1,
      hint: 'NB = Nombre – kat3dd 3dad cellulat numeriques.',
    },
  },
  {
    difficulty: 3, lang: 'any',
    exercise: {
      id: 'chal-19', type: 'fill_blank',
      question: 'Bash tshuf raqm l-kbar f A1 l A5:\n=___(A1:A5)',
      correctAnswer: 'MAX',
      placeholder: 'Fonction...',
      hint: 'MAX = maximum – 3t9al raqm.',
    },
  },
  {
    difficulty: 3, lang: 'any',
    exercise: {
      id: 'chal-20', type: 'multiple_choice',
      question: 'F Excel, wash mmkn tja3l 7sab automatic mnin tbddel valeur f cellule?',
      options: ['La, lazem t7seb b rassek', 'Iyeh, b formules', 'Ghir b macro', 'Ghir b VBA'],
      correctIndex: 1,
      hint: 'Formules katbdel automatic mnin tbddel input.',
    },
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function generateChallenge(playerLevel: number, count = 5): Exercise[] {
  // Pick difficulty based on player level
  const maxDiff: 1 | 2 | 3 = playerLevel <= 2 ? 1 : playerLevel <= 4 ? 2 : 3;

  const pool = QUESTION_POOL.filter(q => q.difficulty <= maxDiff);
  const shuffled = shuffleArray(pool);

  // Mix difficulties: mostly at max, some lower
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  // Re-assign IDs to avoid duplicates
  return selected.map((q, i) => ({ ...q.exercise, id: `challenge-${Date.now()}-${i}` }));
}

export function generateQuickQuiz(count = 5): Exercise[] {
  const shuffled = shuffleArray(QUESTION_POOL);
  return shuffled.slice(0, count).map((q, i) => ({ ...q.exercise, id: `quiz-${Date.now()}-${i}` }));
}

/**
 * Returns true if the daily challenge has not been completed today.
 * Uses the device's local date so the reset happens at midnight.
 */
export function isChallengeAvailableToday(lastChallengeDate: string | null): boolean {
  if (!lastChallengeDate) return true;
  return lastChallengeDate !== new Date().toDateString();
}

export function generateFriendChallenge(
  level: number,
  count = 5,
): { exercises: Exercise[]; poolIds: string[] } {
  const maxDiff: 1 | 2 | 3 = level <= 2 ? 1 : level <= 4 ? 2 : 3;
  const pool = QUESTION_POOL.filter(q => q.difficulty <= maxDiff);
  const shuffled = shuffleArray(pool);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));
  const poolIds = selected.map(q => q.exercise.id);
  const exercises = selected.map((q, i) => ({ ...q.exercise, id: `friend-${Date.now()}-${i}` }));
  return { exercises, poolIds };
}

export function generateClassChallenge(
  difficulty: 1 | 2 | 3,
  count: number,
): { exercises: Exercise[]; poolIds: string[] } {
  const pool = QUESTION_POOL.filter(q => q.difficulty <= difficulty);
  const shuffled = shuffleArray(pool);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));
  const poolIds = selected.map(q => q.exercise.id);
  const exercises = selected.map((q, i) => ({ ...q.exercise, id: `class-${Date.now()}-${i}` }));
  return { exercises, poolIds };
}

export function getExercisesByPoolIds(ids: string[]): Exercise[] {
  return ids
    .map(id => QUESTION_POOL.find(q => q.exercise.id === id)?.exercise)
    .filter((e): e is Exercise => e !== undefined)
    .map((e, i) => ({ ...e, id: `friend-guest-${i}` }));
}
