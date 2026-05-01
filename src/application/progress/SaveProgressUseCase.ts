import { ProgressRepository } from '../../domain/progress/ProgressRepository';
import { LessonResult } from '../../domain/progress/LessonResult';
import { StudentRepository } from '../../domain/student/StudentRepository';
import { STAR_THRESHOLDS, XP_REWARDS, LEVELS } from '../../shared/constants/gamification';

export interface SaveProgressResult {
  xpEarned: number;
  newBadges: string[];
  leveledUp: boolean;
  newLevel: number;
}

export class SaveProgressUseCase {
  constructor(
    private progressRepo: ProgressRepository,
    private studentRepo: StudentRepository,
  ) {}

  async execute(
    studentId: string,
    moduleId: string,
    lessonId: string,
    score: number,
  ): Promise<SaveProgressResult> {
    const stars = this.calculateStars(score);
    const xpEarned = this.calculateXP(score, stars);

    const result: LessonResult = {
      lessonId,
      moduleId,
      studentId,
      score,
      stars,
      xpEarned,
      completedAt: new Date().toISOString(),
      attempts: 1,
    };

    await this.progressRepo.saveResult(result);

    const progress = await this.studentRepo.getProgress(studentId);
    if (!progress) return { xpEarned, newBadges: [], leveledUp: false, newLevel: 1 };

    const oldLevel = progress.level;
    const newXP = progress.xp + xpEarned;
    const newLevel = this.calculateLevel(newXP);
    const newBadges: string[] = [];

    await this.studentRepo.saveProgress({
      ...progress,
      xp: newXP,
      level: newLevel,
      badges: [...new Set([...progress.badges, ...newBadges])],
      totalExercisesCompleted: progress.totalExercisesCompleted + 1,
    });

    return {
      xpEarned,
      newBadges,
      leveledUp: newLevel > oldLevel,
      newLevel,
    };
  }

  private calculateStars(score: number): number {
    if (score >= STAR_THRESHOLDS.three) return 3;
    if (score >= STAR_THRESHOLDS.two) return 2;
    if (score >= STAR_THRESHOLDS.one) return 1;
    return 0;
  }

  private calculateXP(score: number, stars: number): number {
    if (stars === 3) return XP_REWARDS.exercisePerfect + XP_REWARDS.lessonCompleted;
    if (stars === 2) return XP_REWARDS.exerciseGood + XP_REWARDS.lessonCompleted;
    if (stars === 1) return XP_REWARDS.exercisePass + XP_REWARDS.lessonCompleted;
    return 0;
  }

  private calculateLevel(xp: number): number {
    let level = 1;
    for (const lvl of LEVELS) {
      if (xp >= lvl.xpRequired) level = lvl.level;
    }
    return level;
  }
}
