import { StudentRepository } from '../../domain/student/StudentRepository';
import { ProgressRepository } from '../../domain/progress/ProgressRepository';
import { BADGES, LEVELS, XP_REWARDS } from '../../shared/constants/gamification';
import { CURRICULUM } from '../../infrastructure/data/curriculumData';

export class AwardBadgeUseCase {
  constructor(
    private studentRepo: StudentRepository,
    private progressRepo: ProgressRepository,
  ) {}

  async execute(studentId: string): Promise<string[]> {
    const progress = await this.studentRepo.getProgress(studentId);
    if (!progress) return [];

    const allResults = await this.progressRepo.getAllResults(studentId);
    const student = await this.studentRepo.getById(studentId);
    if (!student) return [];

    const newBadges: string[] = [];

    const check = (id: string, condition: boolean) => {
      if (condition && !progress.badges.includes(id)) newBadges.push(id);
    };

    check('first_lesson', allResults.length >= 1);

    for (const mod of CURRICULUM) {
      const modResults = allResults.filter(r => r.moduleId === mod.id);
      const allLessonsCompleted = mod.lessons.every(l =>
        modResults.some(r => r.lessonId === l.id && r.score >= 50),
      );
      // Badge IDs use "module1_done" format to match BADGES array definitions
      const modNum = mod.id.replace('mod', '');
      check(`module${modNum}_done`, allLessonsCompleted);
    }

    check('perfect_score', allResults.some(r => r.score === 100));
    check('streak_3', student.streakDays >= 3);
    check('streak_7', student.streakDays >= 7);
    check('exercises_50', progress.totalExercisesCompleted >= 50);

    const allModulesDone = CURRICULUM.every(mod => {
      const modResults = allResults.filter(r => r.moduleId === mod.id);
      return mod.lessons.every(l => modResults.some(r => r.lessonId === l.id && r.score >= 50));
    });
    check('all_modules', allModulesDone);

    if (newBadges.length > 0) {
      const xpBonus = newBadges.length * XP_REWARDS.badgeEarned;
      const newXP = progress.xp + xpBonus;
      const newLevel = LEVELS.reduce((lvl, l) => newXP >= l.xpRequired ? l.level : lvl, 1);
      await this.studentRepo.saveProgress({
        ...progress,
        badges: [...progress.badges, ...newBadges],
        xp: newXP,
        level: newLevel,
      });
    }

    return newBadges;
  }
}
