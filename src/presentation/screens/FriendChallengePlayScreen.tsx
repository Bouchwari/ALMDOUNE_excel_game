import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform,
  ScrollView, Animated,
} from 'react-native';
import { Exercise } from '../../domain/curriculum/Exercise';
import { spacing, radius } from '../theme/spacing';
import { useLanguage } from '../../shared/context/LanguageContext';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';

interface Props {
  exercises: Exercise[];
  role: 'host' | 'guest';
  hostName?: string;
  onComplete: (score: number, timeSeconds: number) => void;
  onBack: () => void;
}

type AnswerState = 'idle' | 'correct' | 'wrong';

export function FriendChallengePlayScreen({ exercises, role, hostName, onComplete, onBack }: Props) {
  const { S } = useLanguage();
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [fillText, setFillText] = useState('');
  const [hintVisible, setHintVisible] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const startTime = useRef(Date.now());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completedRef = useRef(false);
  const flashAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime.current) / 1000));
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    setAnswerState('idle');
    setSelectedOption(null);
    setFillText('');
    setHintVisible(false);
  }, [idx]);

  const exercise = exercises[idx];
  const isLast = idx === exercises.length - 1;

  if (!exercise) return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  const progressPct = (idx / exercises.length) * 100;

  const flashGreen = () => {
    Animated.sequence([
      Animated.timing(flashAnim, { toValue: 0.4, duration: 100, useNativeDriver: true }),
      Animated.timing(flashAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const shakeRed = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (answerState !== 'idle') return;
    if (isCorrect) { setAnswerState('correct'); setCorrect(c => c + 1); flashGreen(); }
    else { setAnswerState('wrong'); shakeRed(); }
  };

  const handleNext = () => {
    if (isLast) {
      if (completedRef.current) return;
      completedRef.current = true;
      if (timerRef.current) clearInterval(timerRef.current);
      const finalCorrect = correct + (answerState === 'correct' ? 1 : 0);
      onComplete(Math.round((finalCorrect / exercises.length) * 100), elapsed);
    } else {
      setIdx(i => i + 1);
    }
  };

  const checkMultipleChoice = (optionIdx: number) => {
    if (answerState !== 'idle') return;
    setSelectedOption(optionIdx);
    handleAnswer(optionIdx === exercise.correctIndex);
  };

  const checkFillBlank = () => {
    const clean = fillText.trim().toUpperCase().replace(/\s/g, '');
    const expected = (exercise.correctAnswer ?? '').toUpperCase().replace(/\s/g, '');
    handleAnswer(clean === expected);
  };

  const accentColor = role === 'host' ? colors.primary : colors.accent;
  const roleLabel = role === 'host' ? '🎯 Host' : `📷 vs ${hostName ?? 'Host'}`;

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
    <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}>
      <View style={[styles.header, { borderBottomColor: accentColor }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.roleLabel}>{roleLabel}</Text>
          <Text style={styles.headerSub}>{S.level} {idx + 1} / {exercises.length}</Text>
        </View>
        <View style={styles.timerChip}>
          <Text style={styles.timerText}>⏱ {formatTime(elapsed)}</Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPct}%`, backgroundColor: accentColor }]} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {answerState !== 'idle' && (
          <Animated.View style={[
            styles.feedbackBanner,
            answerState === 'correct' ? styles.feedbackCorrect : styles.feedbackWrong,
            { opacity: flashAnim },
          ]}>
            <Text style={styles.feedbackText}>
              {answerState === 'correct' ? S.correct : S.wrong}
            </Text>
            {answerState === 'wrong' && exercise.type === 'fill_blank' && (
              <Text style={styles.correctAnswerHint}>{S.correctAnswer} {exercise.correctAnswer}</Text>
            )}
          </Animated.View>
        )}

        <View style={[styles.questionCard, { borderLeftColor: accentColor }]}>
          <Text style={styles.questionText}>{exercise.question}</Text>
          {exercise.hint && answerState === 'idle' && !hintVisible && (
            <TouchableOpacity style={styles.hintBtn} onPress={() => setHintVisible(true)} activeOpacity={0.7}>
              <Text style={styles.hintBtnText}>{S.showHint}</Text>
            </TouchableOpacity>
          )}
          {hintVisible && exercise.hint && (
            <View style={styles.hintBox}>
              <Text style={styles.hintText}>{S.hintLabel} {exercise.hint}</Text>
            </View>
          )}
        </View>

        {exercise.type === 'multiple_choice' && exercise.options && (
          <View style={styles.optionsGrid}>
            {exercise.options.map((opt, i) => {
              let optStyle: object = styles.optionBtn;
              let textStyle: object = styles.optionText;
              if (answerState !== 'idle') {
                if (i === exercise.correctIndex) {
                  optStyle = { ...styles.optionBtn, ...styles.optionCorrect };
                  textStyle = { ...styles.optionText, color: colors.white };
                } else if (i === selectedOption && answerState === 'wrong') {
                  optStyle = { ...styles.optionBtn, ...styles.optionWrong };
                  textStyle = { ...styles.optionText, color: colors.white };
                }
              } else if (i === selectedOption) {
                optStyle = { ...styles.optionBtn, borderColor: accentColor, borderWidth: 2 };
              }
              return (
                <TouchableOpacity
                  key={i} style={optStyle}
                  onPress={() => checkMultipleChoice(i)}
                  activeOpacity={0.75} disabled={answerState !== 'idle'}
                >
                  <Text style={styles.optionLetter}>{String.fromCharCode(65 + i)}</Text>
                  <Text style={textStyle}>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {exercise.type === 'true_false' && (
          <View style={styles.tfRow}>
            {[{ label: S.trueBtn, idx: 0 }, { label: S.falseBtn, idx: 1 }].map(btn => {
              const isCorrect = btn.idx === exercise.correctIndex;
              return (
                <TouchableOpacity
                  key={btn.idx} style={[
                    styles.tfBtn,
                    answerState !== 'idle' && isCorrect && styles.optionCorrect,
                    answerState !== 'idle' && btn.idx === selectedOption && answerState === 'wrong' && styles.optionWrong,
                  ]}
                  onPress={() => { setSelectedOption(btn.idx); handleAnswer(btn.idx === exercise.correctIndex); }}
                  disabled={answerState !== 'idle'} activeOpacity={0.75}
                >
                  <Text style={styles.tfText}>{btn.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {exercise.type === 'fill_blank' && (
          <View style={styles.fillContainer}>
            <TextInput
              style={[styles.fillInput, answerState === 'correct' && styles.fillCorrect, answerState === 'wrong' && styles.fillWrong]}
              placeholder={exercise.placeholder ?? S.fillBlankPlaceholder}
              placeholderTextColor={colors.textMuted}
              value={fillText} onChangeText={setFillText}
              editable={answerState === 'idle'} autoCapitalize="characters" autoCorrect={false}
            />
            {answerState === 'idle' && (
              <TouchableOpacity style={[styles.checkBtn, { backgroundColor: accentColor }]} onPress={checkFillBlank} activeOpacity={0.8}>
                <Text style={styles.checkBtnText}>{S.checkBtn}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {answerState !== 'idle' && (
        <View style={styles.footer}>
          <TouchableOpacity style={[styles.nextBtn, { backgroundColor: accentColor }]} onPress={handleNext} activeOpacity={0.8}>
            <Text style={styles.nextText}>{isLast ? S.finishBtn : S.nextQ}</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  header: {
    flexDirection: 'row', alignItems: 'center', padding: spacing.lg, paddingTop: spacing.xl,
    backgroundColor: c.surface, borderBottomWidth: 3, gap: spacing.sm,
  },
  backBtn: { padding: spacing.xs },
  backText: { fontSize: 22, color: c.primary },
  headerCenter: { flex: 1 },
  roleLabel: { fontSize: 14, fontWeight: '700', color: c.textPrimary },
  headerSub: { fontSize: 12, color: c.textSecondary },
  timerChip: {
    backgroundColor: c.background, borderRadius: radius.pill,
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
    borderWidth: 1, borderColor: c.border,
  },
  timerText: { color: c.textPrimary, fontWeight: '700', fontSize: 13 },
  progressTrack: { height: 4, backgroundColor: c.border },
  progressFill: { height: '100%' },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 120 },
  feedbackBanner: { borderRadius: radius.md, padding: spacing.md, gap: spacing.xs },
  feedbackCorrect: { backgroundColor: '#C8E6C9' },
  feedbackWrong: { backgroundColor: '#FFCDD2' },
  feedbackText: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  correctAnswerHint: { fontSize: 13, color: c.textSecondary, textAlign: 'center' },
  questionCard: {
    backgroundColor: c.surface, borderRadius: radius.lg, padding: spacing.lg,
    gap: spacing.sm, borderLeftWidth: 4,
  },
  questionText: { fontSize: 17, fontWeight: '600', color: c.textPrimary, lineHeight: 26 },
  hintBtn: {
    alignSelf: 'flex-start', backgroundColor: '#FFF9C4', borderRadius: radius.sm,
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderWidth: 1, borderColor: '#F9A825',
  },
  hintBtnText: { fontSize: 13, fontWeight: '600', color: '#F57F17' },
  hintBox: { backgroundColor: '#FFF9C4', borderRadius: radius.sm, padding: spacing.sm, borderLeftWidth: 3, borderLeftColor: '#F9A825' },
  hintText: { fontSize: 13, color: '#795548', lineHeight: 18 },
  optionsGrid: { gap: spacing.sm },
  optionBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface,
    borderRadius: radius.md, padding: spacing.md, gap: spacing.md, borderWidth: 1, borderColor: c.border,
  },
  optionCorrect: { backgroundColor: c.success, borderColor: c.success },
  optionWrong: { backgroundColor: c.error, borderColor: c.error },
  optionLetter: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: c.background,
    textAlign: 'center', lineHeight: 28, fontWeight: '700', fontSize: 13, color: c.primary,
  },
  optionText: { flex: 1, fontSize: 15, color: c.textPrimary },
  tfRow: { flexDirection: 'row', gap: spacing.md },
  tfBtn: {
    flex: 1, backgroundColor: c.surface, borderRadius: radius.md,
    padding: spacing.xl, alignItems: 'center', borderWidth: 1, borderColor: c.border,
  },
  tfText: { fontSize: 17, fontWeight: '700', color: c.textPrimary },
  fillContainer: { gap: spacing.md },
  fillInput: {
    backgroundColor: c.surface, borderRadius: radius.md, padding: spacing.md,
    fontSize: 16, color: c.textPrimary, borderWidth: 2, borderColor: c.border, fontFamily: 'monospace',
  },
  fillCorrect: { borderColor: c.success, backgroundColor: '#C8E6C9' },
  fillWrong: { borderColor: c.error, backgroundColor: '#FFCDD2' },
  checkBtn: { borderRadius: radius.pill, padding: spacing.md, alignItems: 'center' },
  checkBtnText: { color: c.white, fontWeight: '700', fontSize: 15 },
  footer: { padding: spacing.lg, backgroundColor: c.surface, borderTopWidth: 1, borderTopColor: c.border },
  nextBtn: { borderRadius: radius.pill, padding: spacing.lg, alignItems: 'center' },
  nextText: { color: c.white, fontSize: 16, fontWeight: '700' },
});
