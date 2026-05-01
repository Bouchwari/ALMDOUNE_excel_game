import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, Animated,
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

  const flashAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const exercise = exercises[idx];
  const isLast = idx === exercises.length - 1;

  useEffect(() => {
    setAnswerState('idle');
    setSelectedOption(null);
    setFillText('');
    setSelectedCell(null);
    setHintVisible(false);
    setDragOrder(exercise.parts ? exercise.parts.map((_, i) => i) : []);
  }, [idx]);

  const showHint = () => { setHintVisible(true); setHintsUsed(h => h + 1); };

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
    if (isLast) onComplete(Math.round((correct / exercises.length) * 100));
    else setIdx(i => i + 1);
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

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>{lessonTitle}</Text>
          <Text style={styles.headerSub}>{S.level} {idx + 1} / {exercises.length}</Text>
        </View>
        <View style={styles.scoreChip}>
          <Text style={styles.scoreText}>✓ {correct}</Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {answerState !== 'idle' && (
          <Animated.View style={[
            styles.feedbackBanner,
            answerState === 'correct' ? styles.feedbackCorrect : styles.feedbackWrong,
            { opacity: flashAnim },
          ]}>
            <Text style={styles.feedbackText}>{answerState === 'correct' ? S.correct : S.wrong}</Text>
            {answerState === 'wrong' && exercise.type === 'fill_blank' && (
              <Text style={styles.correctAnswerHint}>{S.correctAnswer} {exercise.correctAnswer}</Text>
            )}
          </Animated.View>
        )}

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

        {exercise.type === 'multiple_choice' && exercise.options && (
          <View style={styles.optionsGrid}>
            {exercise.options.map((opt, i) => {
              let optStyle: object = styles.optionBtn;
              let textStyle: object = styles.optionText;
              if (answerState !== 'idle') {
                if (i === exercise.correctIndex) {
                  optStyle = { ...styles.optionBtn, ...styles.optionCorrect };
                  textStyle = { ...styles.optionText, color: '#FFFFFF' };
                } else if (i === selectedOption && answerState === 'wrong') {
                  optStyle = { ...styles.optionBtn, ...styles.optionWrong };
                  textStyle = { ...styles.optionText, color: '#FFFFFF' };
                }
              } else if (i === selectedOption) {
                optStyle = { ...styles.optionBtn, borderColor: colors.primary, borderWidth: 2 };
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
              let btnStyle = [styles.tfBtn];
              if (answerState !== 'idle') {
                if (isCorrect) btnStyle = [...btnStyle, styles.optionCorrect as any];
                else if (btn.idx === selectedOption && answerState === 'wrong') btnStyle = [...btnStyle, styles.optionWrong as any];
              }
              return (
                <TouchableOpacity
                  key={btn.idx} style={btnStyle}
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
              placeholder={exercise.placeholder ?? 'Kteb jawabek...'}
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
                    answerState === 'correct' && exercise.correctOrder?.[pos] === partIdx && styles.dragCorrect,
                    answerState === 'wrong' && exercise.correctOrder?.[pos] !== partIdx && styles.dragWrong,
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
            <Text style={styles.dragResult}>{dragOrder.map(i => exercise.parts![i]).join(' ')}</Text>
            {answerState === 'idle' && (
              <TouchableOpacity style={styles.checkBtn} onPress={checkDragDrop} activeOpacity={0.8}>
                <Text style={styles.checkBtnText}>{S.checkBtn}</Text>
              </TouchableOpacity>
            )}
            {answerState !== 'idle' && (
              <Text style={styles.correctAnswerHint}>
                Tartib sh7i7: {exercise.correctOrder!.map(i => exercise.parts![i]).join(' ')}
              </Text>
            )}
          </View>
        )}
      </ScrollView>

      {answerState !== 'idle' && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.8}>
            <Text style={styles.nextText}>{isLast ? S.finishBtn : S.nextQ}</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
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
  scoreChip: { backgroundColor: c.success, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  scoreText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  progressTrack: { height: 4, backgroundColor: c.border },
  progressFill: { height: '100%', backgroundColor: c.primary },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 120 },
  feedbackBanner: { borderRadius: radius.md, padding: spacing.md, gap: spacing.xs },
  feedbackCorrect: { backgroundColor: '#C8E6C9' },
  feedbackWrong: { backgroundColor: '#FFCDD2' },
  feedbackText: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  correctAnswerHint: { fontSize: 13, color: c.textSecondary, textAlign: 'center' },
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
  dragCorrect: { backgroundColor: '#C8E6C9', borderColor: c.success },
  dragWrong: { backgroundColor: '#FFCDD2', borderColor: c.error },
  dragText: { fontSize: 14, color: c.textPrimary, fontFamily: 'monospace', fontWeight: '600' },
  dragArrows: { flexDirection: 'row', gap: 4 },
  arrowBtn: { backgroundColor: c.primary, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  arrowText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  dragResult: {
    backgroundColor: '#1A1A2E', borderRadius: radius.md, padding: spacing.md,
    color: '#A5D6A7', fontSize: 16, fontFamily: 'monospace', fontWeight: '600', textAlign: 'center',
  },
  footer: { padding: spacing.lg, backgroundColor: c.surface, borderTopWidth: 1, borderTopColor: c.border },
  nextBtn: { backgroundColor: c.accent, borderRadius: radius.pill, padding: spacing.lg, alignItems: 'center' },
  nextText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
