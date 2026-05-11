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
      question: 'شنو كيتسمى ملف Excel كامل؟',
      options: ['ورقة', 'مصنف', 'خلية', 'الشريط'],
      correctIndex: 1,
      hint: 'فكر فدفتر كامل فيه أوراق بزاف.',
    },
  },
  {
    difficulty: 1, lang: 'any',
    exercise: {
      id: 'chal-2', type: 'true_false',
      question: 'الخلية A1 كاينة فـ أول صف وأول عمود.',
      correctIndex: 0,
      hint: 'A = أول عمود، 1 = أول صف.',
    },
  },
  {
    difficulty: 1, lang: 'any',
    exercise: {
      id: 'chal-3', type: 'multiple_choice',
      question: 'فين كاين الشريط ديال الأدوات فـ Excel؟',
      options: ['فـ التحت', 'فـ اليسار', 'فـ الفوق', 'فـ الوسط'],
      correctIndex: 2,
      hint: 'شوف فوق الجدول، فين كاينين أزرار الخدمة.',
    },
  },
  {
    difficulty: 1, lang: 'any',
    exercise: {
      id: 'chal-4', type: 'multiple_choice',
      question: 'شنو اسم الخلية فـ عمود B وصف 3؟',
      options: ['A3', 'B3', 'C3', 'B2'],
      correctIndex: 1,
      hint: 'عمود B + صف 3 = B3',
    },
  },
  {
    difficulty: 1, lang: 'any',
    exercise: {
      id: 'chal-5', type: 'true_false',
      question: 'فـ Excel، كل خلية عندها اسم خاص بيها.',
      correctIndex: 0,
      hint: 'الاسم = حرف العمود + رقم الصف.',
    },
  },
  // ── Difficulty 1 – Formulas basic ──
  {
    difficulty: 1, lang: 'any',
    exercise: {
      id: 'chal-6', type: 'multiple_choice',
      question: 'كيفاش كتبدا فورميلا فـ Excel؟',
      options: ['بـ حرف A', 'بـ علامة #', 'بـ علامة =', 'بـ علامة +'],
      correctIndex: 2,
      hint: 'كل فورميل كتبدا بعلامة =.',
    },
  },
  {
    difficulty: 1, lang: 'any',
    exercise: {
      id: 'chal-7', type: 'fill_blank',
      question: 'فورميلا باش تجمع A1 وB1 فـ Excel: =___+B1',
      correctAnswer: 'A1',
      placeholder: 'كتب...',
      hint: 'اسم الخلية الأولى: حرف A + رقم 1.',
    },
  },
  // ── Difficulty 2 – Functions ──
  {
    difficulty: 2, lang: 'any',
    exercise: {
      id: 'chal-8', type: 'multiple_choice',
      question: 'عندك درجات يوسف: 14، 12، 16، 10. أشنو كتدير SOMME؟',
      options: ['كتحسب المتوسط', 'كتجمع الأرقام', 'كتعطي الأكبر', 'كتعد الخلايا'],
      correctIndex: 1,
      hint: 'SOMME كتجمع الأرقام اللي عطيتها ليها.',
    },
  },
  {
    difficulty: 2, lang: 'any',
    exercise: {
      id: 'chal-9', type: 'fill_blank',
      question: 'فورميلا باش تجمع من A1 حتى A5:\n=___(A1:A5)',
      correctAnswer: 'SOMME',
      placeholder: 'كتب اسم الفورميل...',
      hint: 'الفورميل ديال الجمع كتبدأ بـ SOM...',
    },
  },
  {
    difficulty: 2, lang: 'any',
    exercise: {
      id: 'chal-10', type: 'multiple_choice',
      question: 'فاطمة جابت 10، 20، 30 فثلاث فروض. MOYENNE كتعطي شحال؟',
      options: ['60', '20', '30', '15'],
      correctIndex: 1,
      hint: '(10+20+30) ÷ 3 = 60 ÷ 3 = 20',
    },
  },
  {
    difficulty: 2, lang: 'any',
    exercise: {
      id: 'chal-11', type: 'true_false',
      question: 'أمين عندو النقط: 5، 12، 3، 8. MAX كتعطي 12.',
      correctIndex: 0,
      hint: 'MAX كتعطي أكبر رقم فـ القائمة.',
    },
  },
  {
    difficulty: 2, lang: 'any',
    exercise: {
      id: 'chal-12', type: 'multiple_choice',
      question: 'عندك نقط عمر فـ A1 حتى A3. واش تقدر تجمعها بـ SOMME؟',
      options: ['=MOYENNE(A1:A3)', '=SOMME(A1:A3)', '=MAX(A1:A3)', '=MIN(A1:A3)'],
      correctIndex: 1,
      hint: 'SOMME كتجمع مجموعة خلايا مرة وحدة.',
    },
  },
  {
    difficulty: 2, lang: 'any',
    exercise: {
      id: 'chal-13', type: 'multiple_choice',
      question: 'أشنو كتدير SI فـ Excel؟',
      options: ['كتحسب المتوسط', 'كتتحقق من شرط: صح أو غلط', 'كتجمع الأرقام', 'كتعطي الأصغر'],
      correctIndex: 1,
      hint: 'SI = شرط – إيلا X → عطي Y، وإلا → Z.',
    },
  },
  // ── Difficulty 3 – Advanced ──
  {
    difficulty: 3, lang: 'any',
    exercise: {
      id: 'chal-14', type: 'fill_blank',
      question: 'فورميلا باش تحسب المتوسط من A1 حتى A10:\n=___(A1:A10)',
      correctAnswer: 'MOYENNE',
      placeholder: 'كتب اسم الفورميل...',
      hint: 'MOYENNE (ولا AVERAGE فـ الإنجليزية)',
    },
  },
  {
    difficulty: 3, lang: 'any',
    exercise: {
      id: 'chal-15', type: 'multiple_choice',
      question: '=SI(A1>10,"Reçu","Échoué") — إيلا نقطة خديجة فـ A1 هي 15، أشنو كتعطي الفورميلا؟',
      options: ['Échoué', 'Reçu', '15', '#ERREUR!'],
      correctIndex: 1,
      hint: '15 > 10 = صح، إذن Excel كيعطي الاختيار الأول.',
    },
  },
  {
    difficulty: 3, lang: 'any',
    exercise: {
      id: 'chal-16', type: 'multiple_choice',
      question: '=SI(B1<10,"Échoué","Reçu") — إيلا نقطة زينب فـ B1 هي 8، أشنو كتعطي؟',
      options: ['Reçu', 'Échoué', '8', '#DIV/0!'],
      correctIndex: 1,
      hint: '8 < 10 = صح، إذن كيعطي الاختيار الأول.',
    },
  },
  {
    difficulty: 3, lang: 'any',
    exercise: {
      id: 'chal-17', type: 'true_false',
      question: 'إلياس حط 3 نقط فـ A1 حتى A3. واش =SOMME(A1:A3) و=A1+A2+A3 كيعطيو نفس النتيجة؟',
      correctIndex: 0,
      hint: 'الاثنين كيجمعوا A1، A2، A3 – نفس النتيجة.',
    },
  },
  {
    difficulty: 3, lang: 'any',
    exercise: {
      id: 'chal-18', type: 'multiple_choice',
      question: 'أشنو كتدير NB فـ Excel؟',
      options: ['كتجمع الأرقام', 'كتعد الخلايا اللي فيها أرقام', 'كتعطي الأكبر', 'كتحسب المتوسط'],
      correctIndex: 1,
      hint: 'NB كتعد غير الخلايا اللي فيها أرقام.',
    },
  },
  {
    difficulty: 3, lang: 'any',
    exercise: {
      id: 'chal-19', type: 'fill_blank',
      question: 'باش تشوف أكبر رقم من A1 حتى A5:\n=___(A1:A5)',
      correctAnswer: 'MAX',
      placeholder: 'اسم الفورميل...',
      hint: 'MAX = maximum – أكبر رقم.',
    },
  },
  {
    difficulty: 3, lang: 'any',
    exercise: {
      id: 'chal-20', type: 'multiple_choice',
      question: 'فـ Excel، واش النتيجة كتتحسب بوحدها منين تبدل رقم فخلية؟',
      options: ['لا، خاصك تحسب بنفسك', 'آه، بالفورميلات', 'غير بالكود', 'غير إلا عاودتي فتحتي الملف'],
      correctIndex: 1,
      hint: 'الفورميل كتعاود تحسب منين تبدل الأرقام اللي داخلة فيها.',
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
 * Uses the device's local تاريخ so the reset happens at midnight.
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
