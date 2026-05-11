import { useCallback, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

// ─── WAV generator ────────────────────────────────────────────────────────────
// Builds a mono 16-bit PCM WAV from an array of {freq, ms} notes and returns
// a data URI that expo-av can load directly on Android 8+ / iOS.

function makeWAV(notes: { freq: number; ms: number }[], vol = 0.5): string {
  const sr = 22050;
  const totalSamples = notes.reduce((s, n) => s + Math.floor(sr * n.ms / 1000), 0);
  const dataLen = totalSamples * 2;
  const buf = new ArrayBuffer(44 + dataLen);
  const dv = new DataView(buf);

  const ws = (o: number, s: string) => {
    for (let i = 0; i < s.length; i++) dv.setUint8(o + i, s.charCodeAt(i));
  };

  // RIFF / WAVE / fmt / data headers
  ws(0, 'RIFF'); dv.setUint32(4, 36 + dataLen, true);
  ws(8, 'WAVE'); ws(12, 'fmt ');
  dv.setUint32(16, 16, true);
  dv.setUint16(20, 1, true);   // PCM
  dv.setUint16(22, 1, true);   // mono
  dv.setUint32(24, sr, true);
  dv.setUint32(28, sr * 2, true);
  dv.setUint16(32, 2, true);
  dv.setUint16(34, 16, true);
  ws(36, 'data'); dv.setUint32(40, dataLen, true);

  // PCM samples with linear fade-in / fade-out per note
  let off = 44;
  for (const { freq, ms } of notes) {
    const n = Math.floor(sr * ms / 1000);
    const fade = Math.min(80, Math.floor(n * 0.15));
    for (let i = 0; i < n; i++) {
      const env = i < fade ? i / fade : i > n - fade ? (n - i) / fade : 1;
      const sample = Math.round(
        Math.sin((2 * Math.PI * freq * i) / sr) * vol * env * 32767,
      );
      dv.setInt16(off, sample, true);
      off += 2;
    }
  }

  // ArrayBuffer → base64 (safe loop, no spread stack overflow)
  const raw = new Uint8Array(buf);
  let b64str = '';
  for (let i = 0; i < raw.length; i++) b64str += String.fromCharCode(raw[i]);
  return 'data:audio/wav;base64,' + btoa(b64str);
}

// ─── Sound definitions (generated lazily on first use) ───────────────────────
let _uris: Record<string, string> | null = null;

function getSoundUris() {
  if (!_uris) {
    _uris = {
      click:   makeWAV([{ freq: 800, ms: 70 }], 0.25),
      correct: makeWAV([{ freq: 880, ms: 110 }, { freq: 1108, ms: 140 }], 0.4),
      wrong:   makeWAV([{ freq: 280, ms: 230 }], 0.35),
      levelUp: makeWAV([
        { freq: 523, ms: 110 },
        { freq: 659, ms: 110 },
        { freq: 784, ms: 110 },
        { freq: 1047, ms: 270 },
      ], 0.45),
    };
  }
  return _uris;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSound(soundEnabled: boolean, hapticsEnabled: boolean) {
  const soundRefs = useRef<Record<string, Audio.Sound | null>>({
    click: null, correct: null, wrong: null, levelUp: null,
  });

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        const uris = getSoundUris();
        for (const [key, uri] of Object.entries(uris)) {
          const { sound } = await Audio.Sound.createAsync({ uri });
          if (active) {
            soundRefs.current[key] = sound;
          } else {
            sound.unloadAsync();
          }
        }
      } catch {
        // Sound loading is best-effort; haptics still work
      }
    };

    load();

    return () => {
      active = false;
      Object.values(soundRefs.current).forEach(s => s?.unloadAsync());
    };
  }, []);

  const playSound = useCallback(async (key: string) => {
    if (!soundEnabled) return;
    try {
      const sound = soundRefs.current[key];
      if (!sound) return;
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } catch {
      // Best-effort
    }
  }, [soundEnabled]);

  const haptic = useCallback(async (type: 'light' | 'success' | 'error' | 'heavy') => {
    if (!hapticsEnabled) return;
    try {
      switch (type) {
        case 'light':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); break;
        case 'success':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); break;
        case 'error':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); break;
        case 'heavy':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); break;
      }
    } catch {
      // Haptics unavailable on some devices
    }
  }, [hapticsEnabled]);

  const playClick = useCallback(async () => {
    await Promise.all([haptic('light'), playSound('click')]);
  }, [haptic, playSound]);

  const playCorrect = useCallback(async () => {
    await Promise.all([haptic('success'), playSound('correct')]);
  }, [haptic, playSound]);

  const playWrong = useCallback(async () => {
    await Promise.all([haptic('error'), playSound('wrong')]);
  }, [haptic, playSound]);

  const playLevelUp = useCallback(async () => {
    haptic('success');
    setTimeout(() => haptic('heavy'), 150);
    setTimeout(() => haptic('success'), 300);
    await playSound('levelUp');
  }, [haptic, playSound]);

  return { playClick, playCorrect, playWrong, playLevelUp };
}
