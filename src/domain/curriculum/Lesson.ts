import { Exercise } from './Exercise';

export interface LessonSlide {
  conceptFr: string;
  explanation: string;
  tip?: string;
  excelExample?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  order: number;
  titleFr: string;
  titleDarija: string;
  slides: LessonSlide[];
  exercises: Exercise[];
  isMiniGame: boolean;
}
