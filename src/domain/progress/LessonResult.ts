export interface LessonResult {
  lessonId: string;
  moduleId: string;
  studentId: string;
  score: number;      // 0-100
  stars: number;      // 0-3
  xpEarned: number;
  completedAt: string;
  attempts: number;
}
