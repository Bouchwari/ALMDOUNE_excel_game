import { useState, useCallback, useEffect } from 'react';
import { AsyncStorageStudentRepo } from '../../infrastructure/storage/AsyncStorageStudentRepo';
import { AsyncStorageProgressRepo } from '../../infrastructure/storage/AsyncStorageProgressRepo';
import { SaveProgressUseCase } from '../../application/progress/SaveProgressUseCase';
import { AwardBadgeUseCase } from '../../application/progress/AwardBadgeUseCase';
import { GetLeaderboardUseCase, LeaderboardEntry } from '../../application/progress/GetLeaderboardUseCase';
import { GetModulesUseCase, ModuleWithProgress } from '../../application/curriculum/GetModulesUseCase';
import { LessonResult } from '../../domain/progress/LessonResult';
import { LEVELS } from '../constants/gamification';

const studentRepo = new AsyncStorageStudentRepo();
const progressRepo = new AsyncStorageProgressRepo();
const saveProgressUC = new SaveProgressUseCase(progressRepo, studentRepo);
const awardBadgeUC = new AwardBadgeUseCase(studentRepo, progressRepo);
const leaderboardUC = new GetLeaderboardUseCase(studentRepo);
const getModulesUC = new GetModulesUseCase(progressRepo);

export function useProgress(studentId: string | null) {
  const [modules, setModules] = useState<ModuleWithProgress[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [lessonResults, setLessonResults] = useState<LessonResult[]>([]);
  const [loading, setLoading] = useState(false);

  const loadModules = useCallback(async () => {
    if (!studentId) return;
    setLoading(true);
    const mods = await getModulesUC.execute(studentId);
    setModules(mods);
    setLoading(false);
  }, [studentId]);

  // Auto-load modules whenever the logged-in student changes
  useEffect(() => {
    if (studentId) loadModules();
    else setModules([]);
  }, [studentId]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadLeaderboard = useCallback(async () => {
    setLoading(true);
    const lb = await leaderboardUC.execute();
    setLeaderboard(lb);
    setLoading(false);
  }, []);

  const loadLessonResults = useCallback(async () => {
    if (!studentId) return;
    const results = await progressRepo.getAllResults(studentId);
    setLessonResults(results);
  }, [studentId]);

  const saveProgress = useCallback(async (
    moduleId: string,
    lessonId: string,
    score: number,
  ) => {
    if (!studentId) return null;
    const result = await saveProgressUC.execute(studentId, moduleId, lessonId, score);
    const newBadges = await awardBadgeUC.execute(studentId);
    return { ...result, newBadges: [...result.newBadges, ...newBadges] };
  }, [studentId]);

  const getLessonResult = useCallback(async (lessonId: string): Promise<LessonResult | null> => {
    if (!studentId) return null;
    return progressRepo.getLessonResult(studentId, lessonId);
  }, [studentId]);

  const awardGameXP = useCallback(async (xp: number) => {
    if (!studentId || xp <= 0) return;
    const progress = await studentRepo.getProgress(studentId);
    if (!progress) return;
    const newXP = progress.xp + xp;
    const newLevel = LEVELS.reduce((lvl, l) => (newXP >= l.xpRequired ? l.level : lvl), 1);
    await studentRepo.saveProgress({ ...progress, xp: newXP, level: newLevel });
  }, [studentId]);

  const markChallengeCompleted = useCallback(async () => {
    if (!studentId) return;
    const progress = await studentRepo.getProgress(studentId);
    if (!progress) return;
    await studentRepo.saveProgress({
      ...progress,
      lastChallengeDate: new Date().toDateString(),
    });
  }, [studentId]);

  return {
    modules,
    leaderboard,
    lessonResults,
    loading,
    loadModules,
    loadLeaderboard,
    loadLessonResults,
    saveProgress,
    getLessonResult,
    awardGameXP,
    markChallengeCompleted,
  };
}
