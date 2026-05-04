import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
} from 'react-native';
import { spacing, radius } from '../theme/spacing';
import { useLanguage } from '../../shared/context/LanguageContext';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { generateQuickQuiz } from '../../shared/utils/challengeEngine';
import { Exercise } from '../../domain/curriculum/Exercise';

interface Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const TOTAL_QUESTIONS = 6;
const TIME_PER_QUESTION = 20;

function getOptions(ex: Exercise): string[] {
  if (ex.type === 'multiple_choice' && ex.options) return ex.options;
  if (ex.type === 'true_false') return ['Sh7i7 / True ✓', 'Ghalt / False ✗'];
  return [];
}

function getCorrectIndex(ex: Exercise): number { return ex.correctIndex ?? 0; }

export function SpeedQuizGame({ onComplete, onBack }: Props) {
  const { S } = useLanguage();
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const [questions] = useState<Exercise[]>(() => {
    const pool = generateQuickQuiz(TOTAL_QUESTIONS * 3);
    return pool.filter(q => q.type === 'multiple_choice' || q.type === 'true_false').slice(0, TOTAL_QUESTIONS);
  });
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [chosen, setChosen] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [questionResults, setQuestionResults] = useState<boolean[]>([]);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const timerAnim = useRef(new Animated.Value(1)).current;

  const current = questions[qIdx];
  const options = current ? getOptions(current) : [];
  const correctIdx = current ? getCorrectIndex(current) : 0;

  const advanceQuestion = useCallback(() => {
    if (qIdx + 1 >= TOTAL_QUESTIONS) {
      onComplete(Math.round((score / (TOTAL_QUESTIONS * 150)) * 100));
      return;
    }
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    setQIdx(q => q + 1);
    setChosen(null);
    setTimeLeft(TIME_PER_QUESTION);
    timerAnim.setValue(1);
  }, [qIdx, score, onComplete, fadeAnim, timerAnim]);

  useEffect(() => {
    if (chosen !== null) return;
    if (timeLeft <= 0) {
      setChosen(-1); setStreak(0); setQuestionResults(prev => [...prev, false]);
      setTimeout(advanceQuestion, 1000);
      return;
    }
    const t = setTimeout(() => setTimeLeft(tt => tt - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, chosen, advanceQuestion]);

  useEffect(() => { timerAnim.setValue(timeLeft / TIME_PER_QUESTION); }, [timeLeft, timerAnim]);

  const handleAnswer = (idx: number) => {
    if (chosen !== null) return;
    const isCorrect = idx === correctIdx;
    setChosen(idx);
    if (isCorrect) {
      const timeBonus = Math.round((timeLeft / TIME_PER_QUESTION) * 50);
      const newStreak = streak + 1;
      const streakBonus = newStreak >= 3 ? 30 : newStreak >= 2 ? 15 : 0;
      setStreak(newStreak);
      setTotalCorrect(c => c + 1);
      setScore(s => s + 100 + timeBonus + streakBonus);
    } else {
      setStreak(0);
    }
    setQuestionResults(prev => [...prev, isCorrect]);
    setTimeout(advanceQuestion, 800);
  };

  if (!current) return null;

  const timerColor = timeLeft <= 5 ? colors.error : timeLeft <= 10 ? colors.warning : colors.primary;
  const timerWidth = `${(timeLeft / TIME_PER_QUESTION) * 100}%` as `${number}%`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>⚡ Speed Quiz</Text>
        <Text style={styles.roundText}>{qIdx + 1}/{TOTAL_QUESTIONS}</Text>
      </View>

      <View style={styles.timerTrack}>
        <View style={[styles.timerFill, { width: timerWidth, backgroundColor: timerColor }]} />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{score}</Text>
          <Text style={styles.statLabel}>{S.gameScore}</Text>
        </View>
        <View style={[styles.statBox, styles.timerBox, { borderColor: timerColor }]}>
          <Text style={[styles.timerNumber, { color: timerColor }]}>{timeLeft}</Text>
          <Text style={styles.statLabel}>sec</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{streak >= 3 ? `${streak} 🔥` : streak}</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{current.question}</Text>
          {streak >= 3 && (
            <View style={styles.streakBanner}>
              <Text style={styles.streakText}>🔥 x{streak} Streak! +30 XP bonus</Text>
            </View>
          )}
        </View>

        <View style={styles.optionsList}>
          {options.map((opt, idx) => {
            const isChosen = chosen === idx;
            const isCorrect = idx === correctIdx;
            const showCorrect = chosen !== null && isCorrect;
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.option,
                  isChosen && isCorrect && styles.optionCorrect,
                  isChosen && !isCorrect && styles.optionWrong,
                  !isChosen && showCorrect && styles.optionCorrect,
                ]}
                onPress={() => handleAnswer(idx)} disabled={chosen !== null} activeOpacity={0.75}
              >
                <View style={[
                  styles.optionBubble,
                  isChosen && isCorrect && styles.bubbleCorrect,
                  isChosen && !isCorrect && styles.bubbleWrong,
                  !isChosen && showCorrect && styles.bubbleCorrect,
                ]}>
                  <Text style={styles.optionLetter}>{['A', 'B', 'C', 'D'][idx]}</Text>
                </View>
                <Text style={[styles.optionText, (isChosen || showCorrect) && styles.optionTextBold]}>{opt}</Text>
                {isChosen && <Text style={styles.feedIcon}>{isCorrect ? '✅' : '❌'}</Text>}
                {!isChosen && showCorrect && <Text style={styles.feedIcon}>✅</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {chosen === -1 && (
          <View style={styles.timeoutBox}>
            <Text style={styles.timeoutText}>⏰ Wa9t sali! Jawab sh7i7: {options[correctIdx]}</Text>
          </View>
        )}
      </Animated.View>

      <View style={styles.dots}>
        {questions.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i < questionResults.length && (questionResults[i] ? styles.dotDone : styles.dotDoneWrong),
              i === qIdx && styles.dotCurrent,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  header: {
    backgroundColor: c.accent, flexDirection: 'row', alignItems: 'center',
    paddingTop: spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.md, gap: spacing.sm,
  },
  backBtn: { padding: spacing.xs },
  backText: { fontSize: 18, color: c.white, fontWeight: '700' },
  title: { flex: 1, fontSize: 18, fontWeight: '800', color: c.white, textAlign: 'center' },
  roundText: { fontSize: 14, color: c.white, fontWeight: '600', opacity: 0.9 },
  timerTrack: { height: 6, backgroundColor: c.border },
  timerFill: { height: 6 },
  statsRow: {
    flexDirection: 'row', padding: spacing.md,
    backgroundColor: c.surface, borderBottomWidth: 1, borderBottomColor: c.border, gap: spacing.sm,
  },
  statBox: { flex: 1, alignItems: 'center', gap: 2 },
  timerBox: { borderWidth: 2, borderRadius: radius.md, paddingVertical: spacing.xs },
  statValue: { fontSize: 20, fontWeight: '800', color: c.textPrimary },
  timerNumber: { fontSize: 22, fontWeight: '900' },
  statLabel: { fontSize: 10, color: c.textMuted, fontWeight: '600', textTransform: 'uppercase' },
  content: { flex: 1, padding: spacing.lg, gap: spacing.lg },
  questionCard: {
    backgroundColor: c.surface, borderRadius: radius.lg, padding: spacing.lg,
    borderLeftWidth: 4, borderLeftColor: c.accent, gap: spacing.sm,
  },
  questionText: { fontSize: 16, fontWeight: '700', color: c.textPrimary, lineHeight: 24 },
  streakBanner: { backgroundColor: '#FFF3E0', borderRadius: radius.sm, padding: spacing.sm },
  streakText: { color: '#E65100', fontWeight: '700', fontSize: 12 },
  optionsList: { gap: spacing.sm },
  option: {
    backgroundColor: c.surface, borderRadius: radius.md, borderWidth: 2, borderColor: c.border,
    flexDirection: 'row', alignItems: 'center', padding: spacing.md, gap: spacing.sm,
  },
  optionCorrect: { backgroundColor: '#C6EFCE', borderColor: c.success },
  optionWrong: { backgroundColor: '#FFCCCC', borderColor: c.error },
  optionBubble: { width: 30, height: 30, borderRadius: 15, backgroundColor: c.background, alignItems: 'center', justifyContent: 'center' },
  bubbleCorrect: { backgroundColor: c.success },
  bubbleWrong: { backgroundColor: c.error },
  optionLetter: { fontSize: 13, fontWeight: '700', color: c.textMuted },
  optionText: { flex: 1, fontSize: 14, color: c.textPrimary, lineHeight: 20 },
  optionTextBold: { fontWeight: '700' },
  feedIcon: { fontSize: 18 },
  timeoutBox: { backgroundColor: '#FFF3E0', borderRadius: radius.md, padding: spacing.md, borderLeftWidth: 4, borderLeftColor: c.warning },
  timeoutText: { fontSize: 14, color: '#E65100', fontWeight: '700' },
  dots: {
    flexDirection: 'row', gap: spacing.xs, justifyContent: 'center', padding: spacing.md,
    backgroundColor: c.surface, borderTopWidth: 1, borderTopColor: c.border,
  },
  dot: { width: 24, height: 6, borderRadius: 3, backgroundColor: c.border },
  dotCurrent: { backgroundColor: c.accent },
  dotDone: { backgroundColor: c.success },
  dotDoneWrong: { backgroundColor: c.border },
});
