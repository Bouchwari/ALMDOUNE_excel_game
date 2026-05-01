import { Module } from '../../domain/curriculum/Module';
import { CURRICULUM } from '../../infrastructure/data/curriculumData';
import { ProgressRepository } from '../../domain/progress/ProgressRepository';

export interface ModuleWithProgress extends Module {
  progressPercent: number;
  isUnlocked: boolean;
  starsEarned: number;
  totalStars: number;
}

export class GetModulesUseCase {
  constructor(private progressRepo: ProgressRepository) {}

  async execute(studentId: string): Promise<ModuleWithProgress[]> {
    const result: ModuleWithProgress[] = [];

    for (let i = 0; i < CURRICULUM.length; i++) {
      const module = CURRICULUM[i];
      const progress = await this.progressRepo.getModuleProgress(studentId, module.id);
      const allResults = await this.progressRepo.getAllResults(studentId);
      const moduleResults = allResults.filter(r => r.moduleId === module.id);

      const starsEarned = moduleResults.reduce((sum, r) => sum + r.stars, 0);
      const totalStars = module.lessons.reduce((sum, l) => sum + 3, 0);

      let isUnlocked = i === 0;
      if (i > 0) {
        const prevProgress = await this.progressRepo.getModuleProgress(studentId, CURRICULUM[i - 1].id);
        isUnlocked = prevProgress >= CURRICULUM[i].unlockRequirement;
      }

      result.push({ ...module, progressPercent: progress, isUnlocked, starsEarned, totalStars });
    }

    return result;
  }
}
