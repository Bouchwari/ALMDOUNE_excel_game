import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, Animated, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Exercise } from '../../domain/curriculum/Exercise';
import { spacing, radius } from '../theme/spacing';
import { ExcelGrid } from '../components/ExcelGrid';
import { useLanguage } from '../../shared/context/LanguageContext';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';

interface Props {
  exercises: Exercise[];
  lessonTitle: string;
  onComplete: (score: number) => void;
  onBack: () => void;
}

type AnswerState = 'idle' | 'correct' | 'wrong';

export function ExerciseScreen({ exercises, lessonTitle, onComplete, onBack }: Props) {
  const { S } = useLanguage();
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [fillText, setFillText] = useState('');
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [dragOrder, setDragOrder] = useState<number[]>([]);
  const [hintVisible, setHintVisible] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [streak, setStreak] = useState(0);

  const flashAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const feedbackScale = useRef(new Animated.Value(0.8)).current;

  const exercise = exercises[idx];
  const isLast = idx === exercises.length - 1;

  const animateSlideIn = useCallback(() => {
    slideAnim.setValue(30);
    Animated.spring(slideAnim, {
      toValue: 0, useNativeDriver: true, tension: 120, friction: 8,
    }).start();
  }, [slideAnim]);

  useEffect(() => {
    setAnswerState('idle');
    setSelectedOption(null);
    setFillText('');
    setSelectedCell(null);
    setHintVisible(false);
    setDragOrder(exercise.parts ? exercise.parts.map((_, i) => i) : []);
    animateSlideIn();
  }, [idx]);

  const showHint = () => { setHintVisible(true); setHintsUsed(h => h + 1); };

  const flashGreen = () => {
    Animated.sequence([
      Animated.timing(flashAnim, { toValue: 0.5, duration: 80, useNativeDriver: true }),
      Animated.timing(flashAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();
  };

  const shakeRed = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 12, duration: 45, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -12, duration: 45, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 45, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 45, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 45, useNativeDriver: true }),
    ]).start();
  };

  const animateFeedback = () => {
    feedbackScale.setValue(0.7);
    Animated.spring(feedbackScale, {
      toValue: 1, useNativeDriver: true, tension: 200, friction: 7,
    }).start();
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (answerState !== 'idle') return;
    animateFeedback();
    if (isCorrect) {
      setAnswerState('correct');
      setCorrect(c => c + 1);
      setStreak(s => s + 1);
      flashGreen();
    } else {
      setAnswerState('wrong');
      setStreak(0);
      shakeRed();
    }
  };

  const handleNext = () => {
    if (isLast) {
      const rawScore = Math.round((correct / exercises.length) * 100);
      const penalty = hintsUsed * 5;
      onComplete(Math.max(0, rawScore - penalty));
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

  const checkExcelGrid = (row: number, col: number) => {
    if (answerState !== 'idle') return;
    setSelectedCell({ row, col });
    handleAnswer(row === exercise.correctCell?.row && col === exercise.correctCell?.col);
  };

  const checkDragDrop = () => {
    if (!exercise.correctOrder) return;
    handleAnswer(dragOrder.every((v, i) => v === exercise.correctOrder![i]));
  };

  const moveDragItem = (from: number, to: number) => {
    if (answerState !== 'idle') return;
    const newOrder = [...dragOrder];
    const item = newOrder.splice(from, 1)[0];
    newOrder.splice(to, 0, item);
    setDragOrder(newOrder);
  };

  const progressPct = (idx / exercises.length) * 100;

  const feedbackBgColor = answerState === 'correct' ? colors.success + '22' : colors.error + '22';
  const feedbackBorderColor = answerState === 'correct' ? colors.success : colors.error;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
    <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>{lessonTitle}</Text>
          <Text style={styles.headerSub}>{S.level} {idx + 1} / {exercises.length}</Text>
        </View>
        <View style={styles.chips}>
          <View style={styles.scoreChip}>
            <Text style={styles.scoreText}>✓ {correct}</Text>
          </View>
          {streak >= 2 && (
            <View style={styles.streakChip}>
              <Text style={styles.streakText}>🔥 {streak}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {answerState !== 'idle' && (
          <Animated.View style={[
            styles.feedbackBanner,
            { backgroundColor: feedbackBgColor, borderColor: feedbackBorderColor, transform: [{ scale: feedbackScale }] },
          ]}>
            <Text style={[styles.feedbackText, { color: feedbackBorderColor }]}>
              {answerState === 'correct' ? S.correct : S.wrong}
            </Text>
            {answerState === 'wrong' && (exercise.type === 'fill_blank' || exercise.type === 'drag_drop') && (
              <Text style={[styles.correctAnswerHint, { color: feedbackBorderColor }]}>
                {S.correctAnswer}{' '}
                {exercise.type === 'fill_blank'
                  ? exercise.correctAnswer
                  : exercise.correctOrder!.map(i => exercise.parts![i]).join(' → ')}
              </Text>
            )}
            {answerState === 'wrong' && exercise.type === 'multiple_choice' && exercise.correctIndex !== undefined && exercise.options && (
              <Text style={[styles.correctAnswerHint, { color: feedbackBorderColor }]}>
                {S.correctAnswer} {exercise.options[exercise.correctIndex]}
              </Text>
            )}
            {answerState === 'wrong' && exercise.type === 'true_false' && exercise.correctIndex !== undefined && (
              <Text style={[styles.correctAnswerHint, { color: feedbackBorderColor }]}>
                {S.correctAnswer} {exercise.correctIndex === 0 ? S.trueBtn : S.falseBtn}
              </Text>
            )}
            {exercise.explanation && (
              <Text style={[styles.explanationText, { color: feedbackBorderColor }]}>
                💡 {exercise.explanation}
              </Text>
            )}
          </Animated.View>
        )}

        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{exercise.question}</Text>
            {exercise.hint && answerState === 'idle' && !hintVisible && (
              <TouchableOpacity style={styles.hintBtn} onPress={showHint} activeOpacity={0.7}>
                <Text style={styles.hintBtnText}>{S.showHint}</Text>
              </TouchableOpacity>
            )}
            {hintVisible && exercise.hint && (
              <View style={styles.hintBox}>
                <Text style={styles.hintText}>{S.hintLabel} {exercise.hint}</Text>
              </View>
            )}
          </View>
        </Animated.View>

        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          {exercise.type === 'multiple_choice' && exercise.options && (
            <View style={styles.optionsGrid}>
              {exercise.options.map((opt, i) => {
                const isCorrectOpt = i === exercise.correctIndex;
                const isSelectedWrong = i === selectedOption && answerState === 'wrong';
                const revealed = answerState !== 'idle';

                let optStyle: object = styles.optionBtn;
                let textStyle: object = styles.optionText;
                let letterStyle: object = styles.optionLetter;

                if (revealed && isCorrectOpt) {
                  optStyle = { ...styles.optionBtn, backgroundColor: colors.success, borderColor: colors.success };
                  textStyle = { ...styles.optionText, color: '#FFFFFF' };
                  letterStyle = { ...styles.optionLetter, backgroundColor: 'rgba(255,255,255,0.3)', color: '#FFFFFF' };
                } else if (revealed && isSelectedWrong) {
                  optStyle = { ...styles.optionBtn, backgroundColor: colors.error, borderColor: colors.error };
                  textStyle = { ...styles.optionText, color: '#FFFFFF' };
                  letterStyle = { ...styles.optionLetter, backgroundColor: 'rgba(255,255,255,0.3)', color: '#FFFFFF' };
                } else if (!revealed && i === selectedOption) {
                  optStyle = { ...styles.optionBtn, borderColor: colors.primary, borderWidth: 2 };
                }
                return (
                  <TouchableOpacity
                    key={i} style={optStyle}
                    onPress={() => checkMultipleChoice(i)}
                    activeOpacity={0.75} disabled={answerState !== 'idle'}
                  >
                    <Text style={letterStyle}>{String.fromCharCode(65 + i)}</Text>
                    <Text style={textStyle}>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {exercise.type === 'true_false' && (
            <View style={styles.tfRow}>
              {[{ label: S.trueBtn, idx: 0 }, { label: S.falseBtn, idx: 1 }].map(btn => {
                const isCorrectBtn = btn.idx === exercise.correctIndex;
                const isSelectedWrong = btn.idx === selectedOption && answerState === 'wrong';
                const revealed = answerState !== 'idle';
                let btnBg = colors.surface;
                let btnBorder = colors.border;
                let txtColor = colors.textPrimary;
                if (revealed && isCorrectBtn) { btnBg = colors.success; btnBorder = colors.success; txtColor = '#FFFFFF'; }
                else if (revealed && isSelectedWrong) { btnBg = colors.error; btnBorder = colors.error; txtColor = '#FFFFFF'; }
                return (
                  <TouchableOpacity
                    key={btn.idx}
                    style={[styles.tfBtn, { backgroundColor: btnBg, borderColor: btnBorder }]}
                    onPress={() => { setSelectedOption(btn.idx); handleAnswer(btn.idx === exercise.correctIndex); }}
                    disabled={answerState !== 'idle'} activeOpacity={0.75}
                  >
                    <Text style={[styles.tfText, { color: txtColor }]}>{btn.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {exercise.type === 'fill_blank' && (
            <View style={styles.fillContainer}>
              <TextInput
                style={[
                  styles.fillInput,
                  answerState === 'correct' && { borderColor: colors.success, backgroundColor: colors.success + '15' },
                  answerState === 'wrong' && { borderColor: colors.error, backgroundColor: colors.error + '15' },
                ]}
                placeholder={exercise.placeholder ?? S.fillBlankPlaceholder}
                placeholderTextColor={colors.textMuted}
                value={fillText} onChangeText={setFillText}
                editable={answerState === 'idle'} autoCapitalize="characters" autoCorrect={false}
              />
              {answerState === 'idle' && (
                <TouchableOpacity style={styles.checkBtn} onPress={checkFillBlank} activeOpacity={0.8}>
                  <Text style={styles.checkBtnText}>{S.checkBtn}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {exercise.type === 'excel_grid' && exercise.gridData && (
            <View style={styles.gridContainer}>
              {exercise.gridInstruction && <Text style={styles.gridInstruction}>{exercise.gridInstruction}</Text>}
              <ExcelGrid
                data={exercise.gridData} onCellPress={checkExcelGrid}
                selectedCell={selectedCell} correctCell={exercise.correctCell} showResult={answerState !== 'idle'}
              />
            </View>
          )}

          {exercise.type === 'drag_drop' && exercise.parts && (
            <View style={styles.dragContainer}>
              <Text style={styles.dragLabel}>{S.reorderLabel}</Text>
              <View style={styles.dragParts}>
                {dragOrder.map((partIdx, pos) => (
                  <View key={pos} style={styles.dragSlot}>
                    <View style={[
                      styles.dragPart,
                      answerState === 'correct' && exercise.correctOrder?.[pos] === partIdx && { backgroundColor: colors.success + '30', borderColor: colors.success },
                      answerState === 'wrong' && exercise.correctOrder?.[pos] !== partIdx && { backgroundColor: colors.error + '30', borderColor: colors.error },
                    ]}>
                      <Text style={styles.dragText}>{exercise.parts![partIdx]}</Text>
                    </View>
                    {answerState === 'idle' && (
                      <View style={styles.dragArrows}>
                        {pos > 0 && (
                          <TouchableOpacity onPress={() => moveDragItem(pos, pos - 1)} style={styles.arrowBtn}>
                            <Text style={styles.arrowText}>←</Text>
                          </TouchableOpacity>
                        )}
                        {pos < dragOrder.length - 1 && (
                          <TouchableOpacity onPress={() => moveDragItem(pos, pos + 1)} style={styles.arrowBtn}>
                            <Text style={styles.arrowText}>→</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                ))}
              </View>
              <View style={[styles.dragResult, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.dragResultText, { color: colors.accent }]}>
                  {dragOrder.map(i => exercise.parts![i]).join(' ')}
                </Text>
              </View>
              {answerState === 'idle' && (
                <TouchableOpacity style={styles.checkBtn} onPress={checkDragDrop} activeOpacity={0.8}>
                  <Text style={styles.checkBtnText}>{S.checkBtn}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {answerState !== 'idle' && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.8}>
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
    backgroundColor: c.surface, borderBottomWidth: 1, borderBottomColor: c.border, gap: spacing.sm,
  },
  backBtn: { padding: spacing.xs },
  backText: { fontSize: 22, color: c.primary },
  headerCenter: { flex: 1 },
  headerTitle: { fontSize: 15, fontWeight: '700', color: c.textPrimary },
  headerSub: { fontSize: 12, color: c.textSecondary },
  chips: { flexDirection: 'row', gap: spacing.xs, alignItems: 'center' },
  scoreChip: { backgroundColor: c.success, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  scoreText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  streakChip: { backgroundColor: '#FF6D00', borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  streakText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  progressTrack: { height: 4, backgroundColor: c.border },
  progressFill: { height: '100%', backgroundColor: c.primary },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 120 },
  feedbackBanner: {
    borderRadius: radius.md, padding: spacing.md, gap: spacing.xs,
    borderWidth: 1.5, alignItems: 'center',
  },
  feedbackText: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  correctAnswerHint: { fontSize: 13, textAlign: 'center', marginTop: 2 },
  explanationText: { fontSize: 13, textAlign: 'center', marginTop: 6, fontStyle: 'italic', opacity: 0.9 },
  questionCard: {
    backgroundColor: c.surface, borderRadius: radius.lg, padding: spacing.lg,
    gap: spacing.sm, borderLeftWidth: 4, borderLeftColor: c.accent,
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
  optionLetter: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: c.background,
    textAlign: 'center', lineHeight: 28, fontWeight: '700', fontSize: 13, color: c.primary,
  },
  optionText: { flex: 1, fontSize: 15, color: c.textPrimary },
  tfRow: { flexDirection: 'row', gap: spacing.md },
  tfBtn: {
    flex: 1, borderRadius: radius.md,
    padding: spacing.xl, alignItems: 'center', borderWidth: 1,
  },
  tfText: { fontSize: 17, fontWeight: '700' },
  fillContainer: { gap: spacing.md },
  fillInput: {
    backgroundColor: c.surface, borderRadius: radius.md, padding: spacing.md,
    fontSize: 16, color: c.textPrimary, borderWidth: 2, borderColor: c.border, fontFamily: 'monospace',
  },
  checkBtn: { backgroundColor: c.primary, borderRadius: radius.pill, padding: spacing.md, alignItems: 'center' },
  checkBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  gridContainer: { gap: spacing.md },
  gridInstruction: { fontSize: 15, fontWeight: '600', color: c.textPrimary },
  dragContainer: { gap: spacing.md },
  dragLabel: { fontSize: 14, color: c.textSecondary, fontWeight: '600' },
  dragParts: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  dragSlot: { alignItems: 'center', gap: spacing.xs },
  dragPart: {
    backgroundColor: c.surface, borderRadius: radius.sm,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderWidth: 1, borderColor: c.border,
  },
  dragText: { fontSize: 14, color: c.textPrimary, fontFamily: 'monospace', fontWeight: '600' },
  dragArrows: { flexDirection: 'row', gap: 4 },
  arrowBtn: { backgroundColor: c.primary, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  arrowText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  dragResult: {
    borderRadius: radius.md, padding: spacing.md,
    borderWidth: 1, alignItems: 'center',
  },
  dragResultText: { fontSize: 16, fontFamily: 'monospace', fontWeight: '600', textAlign: 'center' },
  footer: { padding: spacing.lg, backgroundColor: c.surface, borderTopWidth: 1, borderTopColor: c.border },
  nextBtn: { backgroundColor: c.accent, borderRadius: radius.pill, padding: spacing.lg, alignItems: 'center' },
  nextText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
