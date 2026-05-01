import { Lesson } from '../../domain/curriculum/Lesson';
import { CURRICULUM } from '../../infrastructure/data/curriculumData';

export class GetLessonUseCase {
  execute(moduleId: string, lessonId: string): Lesson | null {
    const module = CURRICULUM.find(m => m.id === moduleId);
    if (!module) return null;
    return module.lessons.find(l => l.id === lessonId) ?? null;
  }

  getLessonsForModule(moduleId: string): Lesson[] {
    const module = CURRICULUM.find(m => m.id === moduleId);
    return module?.lessons ?? [];
  }
}
