import { LEVELS } from '../constants/gamification';

export function getLevelInfo(xp: number) {
  let current = LEVELS[0];
  let next = LEVELS[1];

  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].xpRequired) {
      current = LEVELS[i];
      next = LEVELS[i + 1] ?? LEVELS[LEVELS.length - 1];
    }
  }

  const xpInLevel = xp - current.xpRequired;
  const xpNeeded = next.xpRequired - current.xpRequired;
  const progress = current === next ? 1 : Math.min(xpInLevel / xpNeeded, 1);

  return { current, next, xpInLevel, xpNeeded, progress };
}

export function getXPToNextLevel(xp: number): number {
  const { next, xpInLevel, xpNeeded } = getLevelInfo(xp);
  return Math.max(0, xpNeeded - xpInLevel);
}
