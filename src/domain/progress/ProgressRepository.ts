import { LessonResult } from './LessonResult';

export interface ProgressRepository {
  getLessonResult(studentId: string, lessonId: string): Promise<LessonResult | null>;
  getAllResults(studentId: string): Promise<LessonResult[]>;
  saveResult(result: LessonResult): Promise<void>;
  getModuleProgress(studentId: string, moduleId: string): Promise<number>;
  getSettings(): Promise<AppSettings>;
  saveSettings(settings: AppSettings): Promise<void>;
}

export interface AppSettings {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  notificationsEnabled: boolean;
  currentStudentId: string | null;
  isFirstLaunch: boolean;
  language: 'darija-ar' | 'fr' | 'en';
}

export const defaultSettings: AppSettings = {
  soundEnabled: true,
  hapticsEnabled: true,
  notificationsEnabled: true,
  currentStudentId: null,
  isFirstLaunch: true,
  language: 'darija-ar',
};
