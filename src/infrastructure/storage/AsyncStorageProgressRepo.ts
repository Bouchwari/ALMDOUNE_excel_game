import AsyncStorage from '@react-native-async-storage/async-storage';
import { LessonResult } from '../../domain/progress/LessonResult';
import { ProgressRepository, AppSettings, defaultSettings } from '../../domain/progress/ProgressRepository';

const KEYS = {
  results: (studentId: string) => `excelstar:results:${studentId}`,
  settings: 'excelstar:settings',
};

export class AsyncStorageProgressRepo implements ProgressRepository {
  async getLessonResult(studentId: string, lessonId: string): Promise<LessonResult | null> {
    try {
      const all = await this.getAllResults(studentId);
      return all.find(r => r.lessonId === lessonId) ?? null;
    } catch {
      return null;
    }
  }

  async getAllResults(studentId: string): Promise<LessonResult[]> {
    try {
      const raw = await AsyncStorage.getItem(KEYS.results(studentId));
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  async saveResult(result: LessonResult): Promise<void> {
    try {
      const all = await this.getAllResults(result.studentId);
      const idx = all.findIndex(r => r.lessonId === result.lessonId);
      if (idx >= 0) {
        if (result.score >= all[idx].score) {
          all[idx] = { ...result, attempts: (all[idx].attempts ?? 1) + 1 };
        } else {
          all[idx].attempts = (all[idx].attempts ?? 1) + 1;
        }
      } else {
        all.push({ ...result, attempts: 1 });
      }
      await AsyncStorage.setItem(KEYS.results(result.studentId), JSON.stringify(all));
    } catch {
      // best-effort: silently ignore write failures
    }
  }

  async getModuleProgress(studentId: string, moduleId: string): Promise<number> {
    try {
      const all = await this.getAllResults(studentId);
      const moduleResults = all.filter(r => r.moduleId === moduleId);
      if (moduleResults.length === 0) return 0;
      const avgScore = moduleResults.reduce((sum, r) => sum + r.score, 0) / moduleResults.length;
      return Math.round(avgScore);
    } catch {
      return 0;
    }
  }

  async getSettings(): Promise<AppSettings> {
    try {
      const raw = await AsyncStorage.getItem(KEYS.settings);
      if (!raw) return { ...defaultSettings };
      return { ...defaultSettings, ...JSON.parse(raw) };
    } catch {
      return { ...defaultSettings };
    }
  }

  async saveSettings(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.settings, JSON.stringify(settings));
    } catch {
      // best-effort
    }
  }
}
