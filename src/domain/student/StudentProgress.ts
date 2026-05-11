export interface StudentProgress {
  studentId: string;
  xp: number;
  level: number;
  badges: string[];
  totalExercisesCompleted: number;
  lastChallengeDate: string | null;
}

export function createStudentProgress(studentId: string): StudentProgress {
  return {
    studentId,
    xp: 0,
    level: 1,
    badges: [],
    totalExercisesCompleted: 0,
    lastChallengeDate: null,
  };
}
