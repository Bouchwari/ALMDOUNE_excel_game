export interface QRPayload {
  v: 1;
  q: string[];   // pool question IDs
  p: string;     // host player name
  a: string;     // host avatar
  s: number;     // host score (0–100)
  st: number;    // host stars (0–3)
  ti: number;    // host time in seconds
}

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

export function decodeChallenge(raw: string): QRPayload | null {
  try {
    const p = JSON.parse(raw) as QRPayload;
    if (p.v !== 1 || !Array.isArray(p.q) || p.q.length === 0) return null;
    return p;
  } catch {
    return null;
  }
}
