import { StudentRepository } from '../../domain/student/StudentRepository';
import { LEVELS } from '../../shared/constants/gamification';

export interface LeaderboardEntry {
  studentId: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  levelName: string;
  levelBadge: string;
  rank: number;
}

export class GetLeaderboardUseCase {
  constructor(private studentRepo: StudentRepository) {}

  async execute(): Promise<LeaderboardEntry[]> {
    const students = await this.studentRepo.getAll();
    const entries: LeaderboardEntry[] = [];

    for (const student of students) {
      const progress = await this.studentRepo.getProgress(student.id);
      const xp = progress?.xp ?? 0;
      const level = progress?.level ?? 1;
      const levelInfo = LEVELS.find(l => l.level === level) ?? LEVELS[0];

      entries.push({
        studentId: student.id,
        name: student.name,
        avatar: student.avatar,
        xp,
        level,
        levelName: levelInfo.name,
        levelBadge: levelInfo.badge,
        rank: 0,
      });
    }

    entries.sort((a, b) => b.xp - a.xp);
    entries.forEach((e, i) => (e.rank = i + 1));

    return entries;
  }
}
