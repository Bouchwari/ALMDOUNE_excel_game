// v:1 — 1v1 friend challenge (host result encoded in QR)
export interface QRPayload {
  v: 1;
  q: string[];   // pool question IDs
  p: string;     // host player name
  a: string;     // host avatar
  s: number;     // host score (0–100)
  st: number;    // host stars (0–3)
  ti: number;    // host time in seconds
}

// v:2 — class/group challenge (only questions in QR, no host result)
export interface ClassChallengePayload {
  v: 2;
  q: string[];    // pool question IDs
  title: string;  // e.g. "Niveau 3 – 10 questions"
  diff: number;   // 1=easy 2=medium 3=hard
  createdAt: number;
}

export type AnyQRPayload = QRPayload | ClassChallengePayload;

export interface PlayerResult {
  name: string;
  avatar: string;
  score: number;
  stars: number;
  timeSeconds: number;
}

export function encodeChallenge(payload: QRPayload): string {
  return JSON.stringify(payload);
}

export function encodeClassChallenge(payload: ClassChallengePayload): string {
  return JSON.stringify(payload);
}

export function decodeAnyChallenge(raw: string): AnyQRPayload | null {
  try {
    if (raw.length > 8000) return null;
    const p = JSON.parse(raw);
    if (!Array.isArray(p.q) || p.q.length === 0 || p.q.length > 50) return null;
    if (!p.q.every((id: unknown) => typeof id === 'string' && id.length < 100)) return null;
    if (p.v === 1) {
      if (typeof p.s !== 'number' || p.s < 0 || p.s > 100) return null;
      if (typeof p.st !== 'number' || p.st < 0 || p.st > 3) return null;
      if (typeof p.p !== 'string' || p.p.length > 100) return null;
      if (typeof p.a !== 'string' || p.a.length > 50) return null;
      if (typeof p.ti !== 'number' || p.ti < 0 || p.ti > 7200) return null;
      return p as QRPayload;
    }
    if (p.v === 2) {
      if (typeof p.title !== 'string' || p.title.length > 200) return null;
      if (typeof p.diff !== 'number' || ![1, 2, 3].includes(p.diff)) return null;
      return p as ClassChallengePayload;
    }
    return null;
  } catch {
    return null;
  }
}
