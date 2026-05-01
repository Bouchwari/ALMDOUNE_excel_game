import { useState, useEffect, useCallback } from 'react';
import { Student, StudentGender } from '../../domain/student/Student';
import { StudentProgress } from '../../domain/student/StudentProgress';
import { AsyncStorageStudentRepo } from '../../infrastructure/storage/AsyncStorageStudentRepo';
import { AsyncStorageProgressRepo } from '../../infrastructure/storage/AsyncStorageProgressRepo';
import { CreateStudentUseCase } from '../../application/student/CreateStudentUseCase';
import { AppSettings } from '../../domain/progress/ProgressRepository';

const studentRepo = new AsyncStorageStudentRepo();
const progressRepo = new AsyncStorageProgressRepo();
const createStudentUC = new CreateStudentUseCase(studentRepo);

export function useStudent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [currentProgress, setCurrentProgress] = useState<StudentProgress | null>(null);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [all, cfg] = await Promise.all([
      studentRepo.getAll(),
      progressRepo.getSettings(),
    ]);
    setStudents(all);
    setSettings(cfg);

    if (cfg.currentStudentId) {
      const student = all.find(s => s.id === cfg.currentStudentId) ?? null;
      setCurrentStudent(student);
      if (student) {
        const progress = await studentRepo.getProgress(student.id);
        setCurrentProgress(progress);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const selectStudent = useCallback(async (studentId: string) => {
    const cfg = await progressRepo.getSettings();
    await progressRepo.saveSettings({ ...cfg, currentStudentId: studentId });
    await studentRepo.updateLastOpened(studentId);
    const student = await studentRepo.getById(studentId);
    setCurrentStudent(student);
    if (student) {
      const progress = await studentRepo.getProgress(student.id);
      setCurrentProgress(progress);
    }
    setSettings({ ...cfg, currentStudentId: studentId });
  }, []);

  const updateGender = useCallback(async (gender: StudentGender) => {
    if (!currentStudent) return;
    const updated: Student = { ...currentStudent, gender };
    await studentRepo.save(updated);
    setCurrentStudent(updated);
    setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
  }, [currentStudent]);

  const createStudent = useCallback(async (name: string, avatar: string, gender: StudentGender = 'male') => {
    const student = await createStudentUC.execute(name, avatar, gender);
    await load();
    return student;
  }, [load]);

  const deleteStudent = useCallback(async (studentId: string) => {
    await studentRepo.delete(studentId);
    const cfg = await progressRepo.getSettings();
    if (cfg.currentStudentId === studentId) {
      await progressRepo.saveSettings({ ...cfg, currentStudentId: null });
    }
    await load();
  }, [load]);

  const refreshProgress = useCallback(async () => {
    if (!currentStudent) return;
    const progress = await studentRepo.getProgress(currentStudent.id);
    setCurrentProgress(progress);
  }, [currentStudent]);

  const markFirstLaunchDone = useCallback(async () => {
    const cfg = await progressRepo.getSettings();
    await progressRepo.saveSettings({ ...cfg, isFirstLaunch: false });
    setSettings(prev => prev ? { ...prev, isFirstLaunch: false } : prev);
  }, []);

  const saveSettings = useCallback(async (newSettings: Partial<AppSettings>) => {
    const cfg = await progressRepo.getSettings();
    const merged = { ...cfg, ...newSettings };
    await progressRepo.saveSettings(merged);
    setSettings(merged);
  }, []);

  return {
    students,
    currentStudent,
    currentProgress,
    settings,
    loading,
    selectStudent,
    createStudent,
    deleteStudent,
    refreshProgress,
    markFirstLaunchDone,
    saveSettings,
    updateGender,
    reload: load,
  };
}
