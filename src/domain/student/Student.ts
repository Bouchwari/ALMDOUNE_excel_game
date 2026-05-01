export type StudentGender = 'male' | 'female';

export interface Student {
  id: string;
  name: string;
  avatar: string;
  gender: StudentGender;
  createdAt: string;
  lastOpenedAt: string;
  streakDays: number;
  lastStreakDate: string | null;
  activeDates: string[];
}

export function createStudent(name: string, avatar: string, gender: StudentGender = 'male'): Student {
  return {
    id: Date.now().toString(),
    name,
    avatar,
    gender,
    createdAt: new Date().toISOString(),
    lastOpenedAt: new Date().toISOString(),
    streakDays: 0,
    lastStreakDate: null,
    activeDates: [],
  };
}
