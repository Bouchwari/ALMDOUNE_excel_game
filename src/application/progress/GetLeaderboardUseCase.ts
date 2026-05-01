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
  isSimulated?: boolean;
}

function computeLevel(xp: number) {
  return LEVELS.reduce((lvl, l) => (xp >= l.xpRequired ? l.level : lvl), 1);
}

function makeNPC(id: string, name: string, avatar: string, xp: number): LeaderboardEntry {
  const level = computeLevel(xp);
  const info = LEVELS.find(l => l.level === level) ?? LEVELS[0];
  return { studentId: id, name, avatar, xp, level, levelName: info.name, levelBadge: info.badge, rank: 0, isSimulated: true };
}

const SIMULATED_ENTRIES: LeaderboardEntry[] = [
  makeNPC('npc_1', 'Fatima',  '👩‍🎓', 45),
  makeNPC('npc_2', 'Amine',   '🧑‍💻', 80),
  makeNPC('npc_3', 'Youssef', '🦁',  145),
  makeNPC('npc_4', 'Nadia',   '⭐',  220),
  makeNPC('npc_5', 'Karim',   '🚀',  380),
  makeNPC('npc_6', 'Sara',    '👩‍💻', 460),
  makeNPC('npc_7', 'Omar',    '🎯',  720),
  makeNPC('npc_8', 'Hiba',    '🏆',  950),
  makeNPC('npc_9', 'Khalid',  '💎', 1150),
];

export class GetLeaderboardUseCase {
  constructor(private studentRepo: StudentRepository) {}

  async execute(): Promise<LeaderboardEntry[]> {
    const students = await this.studentRepo.getAll();
    const entries: LeaderboardEntry[] = [...SIMULATED_ENTRIES.map(e => ({ ...e }))];

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
