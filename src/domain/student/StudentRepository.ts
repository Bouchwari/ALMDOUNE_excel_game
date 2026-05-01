import { Student } from './Student';
import { StudentProgress } from './StudentProgress';

export interface StudentRepository {
  getAll(): Promise<Student[]>;
  getById(id: string): Promise<Student | null>;
  save(student: Student): Promise<void>;
  delete(id: string): Promise<void>;
  getProgress(studentId: string): Promise<StudentProgress | null>;
  saveProgress(progress: StudentProgress): Promise<void>;
  updateLastOpened(studentId: string): Promise<void>;
}
