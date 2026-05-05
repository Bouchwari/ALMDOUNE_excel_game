import AsyncStorage from '@react-native-async-storage/async-storage';
import { Student } from '../../domain/student/Student';
import { StudentProgress, createStudentProgress } from '../../domain/student/StudentProgress';
import { StudentRepository } from '../../domain/student/StudentRepository';

const KEYS = {
  students: 'almdoun:students',
  progress: (id: string) => `almdoun:progress:${id}`,
};

export class AsyncStorageStudentRepo implements StudentRepository {
  async getAll(): Promise<Student[]> {
    try {
      const raw = await AsyncStorage.getItem(KEYS.students);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  async getById(id: string): Promise<Student | null> {
    try {
      const all = await this.getAll();
      return all.find(s => s.id === id) ?? null;
    } catch {
      return null;
    }
  }

  async save(student: Student): Promise<void> {
    try {
      const all = await this.getAll();
      const idx = all.findIndex(s => s.id === student.id);
      if (idx >= 0) {
        all[idx] = student;
      } else {
        all.push(student);
      }
      await AsyncStorage.setItem(KEYS.students, JSON.stringify(all));
    } catch {
      // best-effort
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const all = await this.getAll();
      const filtered = all.filter(s => s.id !== id);
      await AsyncStorage.setItem(KEYS.students, JSON.stringify(filtered));
      await AsyncStorage.removeItem(KEYS.progress(id));
    } catch {
      // best-effort
    }
  }

  async getProgress(studentId: string): Promise<StudentProgress | null> {
    try {
      const raw = await AsyncStorage.getItem(KEYS.progress(studentId));
      if (raw) return JSON.parse(raw);
      return createStudentProgress(studentId);
    } catch {
      return createStudentProgress(studentId);
    }
  }

  async saveProgress(progress: StudentProgress): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.progress(progress.studentId), JSON.stringify(progress));
    } catch {
      // best-effort
    }
  }

  async updateLastOpened(studentId: string): Promise<void> {
    try {
      const student = await this.getById(studentId);
      if (!student) return;

      const now = new Date();
      const todayISO = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const today = now.toDateString();
      const lastDate = student.lastStreakDate;
      const yesterday = new Date(now.getTime() - 86400000).toDateString();

      let streakDays = student.streakDays;
      if (lastDate === today) {
        // already updated today
      } else if (lastDate === yesterday) {
        streakDays += 1;
      } else {
        streakDays = 1;
      }

      const activeDates = student.activeDates ?? [];
      const updatedDates = activeDates.includes(todayISO)
        ? activeDates
        : [...activeDates, todayISO].slice(-90);

      await this.save({
        ...student,
        lastOpenedAt: new Date().toISOString(),
        streakDays,
        lastStreakDate: today,
        activeDates: updatedDates,
      });
    } catch {
      // best-effort
    }
  }
}
