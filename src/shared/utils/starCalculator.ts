import { STAR_THRESHOLDS } from '../constants/gamification';

export function calculateStars(score: number): number {
  if (score >= STAR_THRESHOLDS.three) return 3;
  if (score >= STAR_THRESHOLDS.two) return 2;
  if (score >= STAR_THRESHOLDS.one) return 1;
  return 0;
}
