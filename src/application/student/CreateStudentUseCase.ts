import { Student, StudentGender, createStudent } from '../../domain/student/Student';
import { StudentRepository } from '../../domain/student/StudentRepository';
import { createStudentProgress } from '../../domain/student/StudentProgress';

export class CreateStudentUseCase {
  constructor(private repo: StudentRepository) {}

  async execute(name: string, avatar: string, gender: StudentGender = 'male'): Promise<Student> {
    const all = await this.repo.getAll();
    if (all.length >= 10) throw new Error('MAX_PROFILES');
    const student = createStudent(name.trim(), avatar, gender);
    await this.repo.save(student);
    const progress = createStudentProgress(student.id);
    await this.repo.saveProgress(progress);
    return student;
  }
}
