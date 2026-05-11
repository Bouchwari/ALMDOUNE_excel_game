import { Lesson } from './Lesson';

export type ModuleLevel = 'beginner' | 'basic' | 'intermediate' | 'intermediate+' | 'advanced' | 'expert' | 'bonus';

export interface Module {
  id: string;
  order: number;
  titleFr: string;
  titleDarija: string;
  descriptionDarija: string;
  level: ModuleLevel;
  icon: string;
  color: string;
  lessons: Lesson[];
  unlockRequirement: number; // % of previous module required to unlock
}
