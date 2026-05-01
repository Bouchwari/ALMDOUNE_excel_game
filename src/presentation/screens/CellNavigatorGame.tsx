import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
} from 'react-native';
import { spacing, radius } from '../theme/spacing';
import { useLanguage } from '../../shared/context/LanguageContext';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';

interface Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const COLS = ['A', 'B', 'C', 'D', 'E'];
const ROWS = [1, 2, 3, 4, 5];
const TOTAL_ROUNDS = 8;
const TIME_PER_ROUND = 15;
const CELL_SIZE = 48;

function randomCell(): { col: string; row: number } {
  return { col: COLS[Math.floor(Math.random() * COLS.length)], row: ROWS[Math.floor(Math.random() * ROWS.length)] };
}

function generateOptions(correct: { col: string; row: number }): string[] {
  const correctStr = `${correct.col}${correct.row}`;
  const set = new Set<string>([correctStr]);
  while (set.size < 4) { const c = randomCell(); set.add(`${c.col}${c.row}`); }
  const arr = Array.from(set);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

type RoundMode = 'name-it' | 'find-it';

export function CellNavigatorGame({ onComplete, onBack }: Props) {
  const { S } = useLanguage();
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_ROUND);
  const [target, setTarget] = useState(() => randomCell());
  const [options, setOptions] = useState<string[]>([]);
  const [mode, setMode] = useState<RoundMode>('name-it');
  const [answered, setAnswered] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const nextRound = useCallback(() => {
    if (round + 1 >= TOTAL_ROUNDS) {
      onComplete(Math.min(100, Math.round((score / (TOTAL_ROUNDS * 100)) * 100)));
      return;
    }
    const newTarget = randomCell();
    const newMode: RoundMode = Math.random() > 0.5 ? 'name-it' : 'find-it';
    setRound(r => r + 1);
    setTarget(newTarget);
    setOptions(generateOptions(newTarget));
    setMode(newMode);
    setAnswered(null);
    setTimeLeft(TIME_PER_ROUND);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  }, [round, score, onComplete, fadeAnim]);

  useEffect(() => { setOptions(generateOptions(target)); }, []);

  useEffect(() => {
    if (answered !== null) return;
    if (timeLeft <= 0) { setAnswered('__timeout__'); setStreak(0); setTimeout(nextRound, 1200); return; }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, answered, nextRound]);

  const handleAnswer = (chosen: string) => {
    if (answered !== null) return;
    const correctStr = `${target.col}${target.row}`;
    const isCorrect = chosen === correctStr;
    setAnswered(chosen);
    if (isCorrect) {
      const timeBonus = Math.round((timeLeft / TIME_PER_ROUND) * 50);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore(s => s + 50 + timeBonus + (newStreak >= 3 ? 20 : 0));
    } else {
      setStreak(0);
    }
    setTimeout(nextRound, 900);
  };

  const correctStr = `${target.col}${target.row}`;
  const progress = (round / TOTAL_ROUNDS) * 100;
  const timerColor = timeLeft <= 5 ? colors.error : timeLeft <= 8 ? colors.warning : colors.primary;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🎯 Cell Navigator</Text>
        <Text style={styles.roundText}>{round + 1}/{TOTAL_ROUNDS}</Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{score}</Text>
          <Text style={styles.statLabel}>{S.gameScore}</Text>
        </View>
        <View style={[styles.statBox, styles.timerBox, { borderColor: timerColor }]}>
          <Text style={[styles.statValue, { color: timerColor }]}>{timeLeft}s</Text>
          <Text style={styles.statLabel}>{S.gameTimeLeft}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{streak} 🔥</Text>
          <Text style={styles.statLabel}>{S.gameStreakLabel}</Text>
        </View>
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.instructionBox}>
          {mode === 'name-it' ? (
            <>
              <Text style={styles.instrText}>Chno smiytha had la cellule? 🟩</Text>
              <Text style={styles.instrSub}>(What is this cell called?)</Text>
            </>
          ) : (
            <>
              <Text style={styles.instrText}>{S.gameTapCell}</Text>
              <Text style={styles.targetLabel}>{correctStr}</Text>
            </>
          )}
        </View>

        <View style={styles.gridWrapper}>
          <View style={styles.gridRow}>
            <View style={styles.cornerCell} />
            {COLS.map(col => (
              <View key={col} style={styles.colHeader}>
                <Text style={styles.colHeaderText}>{col}</Text>
              </View>
            ))}
          </View>
          {ROWS.map(row => (
            <View key={row} style={styles.gridRow}>
              <View style={styles.rowHeader}>
                <Text style={styles.rowHeaderText}>{row}</Text>
              </View>
              {COLS.map(col => {
                const cellName = `${col}${row}`;
                const isTarget = col === target.col && row === target.row;
                const isAnsweredCorrect = answered === cellName && cellName === correctStr;
                const isAnsweredWrong = answered === cellName && cellName !== correctStr;
                const showHighlight = mode === 'name-it' && isTarget;
                const showMissed = answered !== null && isTarget && answered !== correctStr;
                return (
                  <TouchableOpacity
                    key={cellName}
                    style={[
                      styles.cell,
                      showHighlight && styles.cellHighlight,
                      isAnsweredCorrect && styles.cellCorrect,
                      isAnsweredWrong && styles.cellWrong,
                      showMissed && styles.cellMissed,
                    ]}
                    onPress={() => mode === 'find-it' && handleAnswer(cellName)}
                    activeOpacity={mode === 'find-it' ? 0.6 : 1}
                  >
                    <Text style={[(showHighlight || isAnsweredCorrect || showMissed) && styles.cellTextBold]}>
                      {showHighlight ? '🟩' : ''}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {mode === 'name-it' && (
          <View style={styles.optionsGrid}>
            {options.map(opt => {
              const isCorrect = opt === correctStr;
              const isChosen = answered === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.option,
                    isChosen && isCorrect && styles.optionCorrect,
                    isChosen && !isCorrect && styles.optionWrong,
                    answered !== null && isCorrect && styles.optionCorrect,
                  ]}
                  onPress={() => handleAnswer(opt)} disabled={answered !== null}
                >
                  <Text style={[
                    styles.optionText,
                    (isChosen || (answered !== null && isCorrect)) && styles.optionTextSelected,
                  ]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {answered !== null && (
          <View style={[styles.feedbackBox, answered === correctStr ? styles.feedbackCorrect : styles.feedbackWrong]}>
            <Text style={styles.feedbackText}>
              {answered === '__timeout__'
                ? `⏰ Wa9t sali! Jawab: ${correctStr}`
                : answered === correctStr
                  ? `✅ Sah! ${correctStr} ${streak >= 3 ? '🔥 Streak!' : ''}`
                  : `❌ Ghalt! Jawab sh7i7: ${correctStr}`}
            </Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  header: {
    backgroundColor: c.accentBlue, flexDirection: 'row', alignItems: 'center',
    paddingTop: spacing.xl + spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: spacing.md, gap: spacing.sm,
  },
  backBtn: { padding: spacing.xs },
  backText: { fontSize: 18, color: '#FFFFFF', fontWeight: '700' },
  title: { flex: 1, fontSize: 18, fontWeight: '800', color: '#FFFFFF', textAlign: 'center' },
  roundText: { fontSize: 14, color: '#FFFFFF', fontWeight: '600', opacity: 0.9 },
  progressTrack: { height: 4, backgroundColor: c.border },
  progressFill: { height: 4, backgroundColor: c.accentBlue },
  statsRow: {
    flexDirection: 'row', padding: spacing.md, gap: spacing.sm,
    backgroundColor: c.surface, borderBottomWidth: 1, borderBottomColor: c.border,
  },
  statBox: { flex: 1, alignItems: 'center', gap: 2 },
  timerBox: { borderWidth: 2, borderRadius: radius.md, paddingVertical: spacing.xs },
  statValue: { fontSize: 18, fontWeight: '800', color: c.textPrimary },
  statLabel: { fontSize: 10, color: c.textMuted, fontWeight: '600', textTransform: 'uppercase' },
  content: { flex: 1, padding: spacing.lg, gap: spacing.lg, alignItems: 'center' },
  instructionBox: { alignItems: 'center', gap: spacing.xs },
  instrText: { fontSize: 16, fontWeight: '700', color: c.textPrimary, textAlign: 'center' },
  instrSub: { fontSize: 13, color: c.textSecondary },
  targetLabel: { fontSize: 36, fontWeight: '900', color: c.accentBlue, fontFamily: 'monospace' },
  gridWrapper: { borderWidth: 1, borderColor: '#C0C0C0', borderRadius: radius.sm, overflow: 'hidden', backgroundColor: c.surface },
  gridRow: { flexDirection: 'row' },
  cornerCell: { width: 28, height: CELL_SIZE, backgroundColor: '#DEDEDE', borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#C0C0C0' },
  colHeader: { width: CELL_SIZE, height: 24, backgroundColor: '#DEDEDE', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#C0C0C0' },
  colHeaderText: { fontSize: 12, fontWeight: '700', color: '#444' },
  rowHeader: { width: 28, height: CELL_SIZE, backgroundColor: '#DEDEDE', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#C0C0C0' },
  rowHeaderText: { fontSize: 11, fontWeight: '700', color: '#444' },
  cell: { width: CELL_SIZE, height: CELL_SIZE, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#D0D0D0', alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface },
  cellHighlight: { backgroundColor: '#C6EFCE' },
  cellCorrect: { backgroundColor: '#C6EFCE' },
  cellWrong: { backgroundColor: '#FFCCCC' },
  cellMissed: { backgroundColor: '#C6EFCE' },
  cellTextBold: { fontWeight: '700' },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'center', width: '100%' },
  option: { width: '45%', backgroundColor: c.surface, borderRadius: radius.md, borderWidth: 2, borderColor: c.border, paddingVertical: spacing.md, alignItems: 'center' },
  optionCorrect: { backgroundColor: '#C6EFCE', borderColor: c.success },
  optionWrong: { backgroundColor: '#FFCCCC', borderColor: c.error },
  optionText: { fontSize: 20, fontWeight: '700', color: c.textPrimary, fontFamily: 'monospace' },
  optionTextSelected: { color: c.textPrimary },
  feedbackBox: { width: '100%', borderRadius: radius.md, padding: spacing.md, alignItems: 'center' },
  feedbackCorrect: { backgroundColor: '#C6EFCE' },
  feedbackWrong: { backgroundColor: '#FFCCCC' },
  feedbackText: { fontSize: 15, fontWeight: '700', color: c.textPrimary, textAlign: 'center' },
});
