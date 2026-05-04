import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated,
} from 'react-native';
import { spacing, radius } from '../theme/spacing';
import { useLanguage } from '../../shared/context/LanguageContext';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { FormulaBox } from '../components/visuals/FormulaBox';

interface Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface Question {
  broken: string;
  hint: string;
  options: string[];
  correctIndex: number;
  full: string;
  explanation: string;
}

const QUESTIONS: Question[] = [
  { broken: '=___(A1:A10)', full: '=SOMME(A1:A10)', hint: 'fonction باش تجمع كل أرقام ف range.', options: ['SOMME', 'MOYENNE', 'MAX', 'NB'], correctIndex: 0, explanation: 'SOMME كتجمع كل أرقام من A1 حتى A10.' },
  { broken: '=SOMME(___:B5)', full: '=SOMME(B1:B5)', hint: 'range كيبدا من أول cellule ف عمود B.', options: ['B1', 'A1', 'B0', 'C1'], correctIndex: 0, explanation: 'range ديال SOMME: من B1 حتى B5.' },
  { broken: '=___(A1:A10)', full: '=MOYENNE(A1:A10)', hint: 'fonction باش تحسب متوسط (average).', options: ['MOYENNE', 'SOMME', 'MIN', 'MAX'], correctIndex: 0, explanation: 'MOYENNE = مجموع ÷ عدد – average ديال range.' },
  { broken: '=SI(A1>10,___, "Non")', full: '=SI(A1>10,"Oui","Non")', hint: 'إيلا condition صحيحة، عطي valeur الأولى.', options: ['"Oui"', '"Non"', '10', 'A1'], correctIndex: 0, explanation: 'SI(condition, valeur_si_vrai, valeur_si_faux)' },
  { broken: '=MAX(___)', full: '=MAX(A1:A5)', hint: 'range ديال كل valeurs ف عمود A من صف 1 حتى 5.', options: ['A1:A5', 'A:A', 'A1+A5', '1:5'], correctIndex: 0, explanation: 'MAX(A1:A5) كتعطي أكبر رقم من A1 حتى A5.' },
  { broken: '=NB(___)', full: '=NB(A1:A20)', hint: 'NB (COUNT) كتعد cellules اللي فيها أرقام ف range.', options: ['A1:A20', 'A1,A20', '"A1:A20"', 'A1-A20'], correctIndex: 0, explanation: 'NB(A1:A20) كتعد عدد cellules رقمية.' },
  { broken: '=SI(B1<___, "Échoué", "Reçu")', full: '=SI(B1<10,"Échoué","Reçu")', hint: 'note ضعيفة = أقل من 10 – هدا هو الشرط.', options: ['10', '0', '20', '100'], correctIndex: 0, explanation: 'إيلا note < 10 → "Échoué"، وإلا → "Reçu".' },
  { broken: '=SOMME(A1:A5)+___', full: '=SOMME(A1:A5)+SOMME(B1:B5)', hint: 'fonction اللي كتجمع كل أرقام ف عمود B.', options: ['SOMME(B1:B5)', 'B1:B5', 'MOYENNE(B1:B5)', 'MAX(B1:B5)'], correctIndex: 0, explanation: 'جمع SOMME A و SOMME B باش تجيب total.' },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FormulaFixerGame({ onComplete, onBack }: Props) {
  const { S } = useLanguage();
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const [questions] = useState(() => shuffle(QUESTIONS).slice(0, 6));
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [hintVisible, setHintVisible] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const current = questions[qIdx];
  const isLast = qIdx === questions.length - 1;

  const handleAnswer = (idx: number) => {
    if (chosen !== null) return;
    const isCorrect = idx === current.correctIndex;
    setChosen(idx);
    setShowExplanation(true);
    if (isCorrect) setScore(s => s + 100 + (hintVisible ? 0 : 20));
  };

  const handleNext = useCallback(() => {
    if (isLast) { onComplete(Math.round((score / (questions.length * 120)) * 100)); return; }
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
    setQIdx(i => i + 1);
    setChosen(null);
    setShowExplanation(false);
    setHintVisible(false);
  }, [isLast, score, questions.length, onComplete, fadeAnim]);

  const handleHint = () => {
    if (hintsLeft <= 0 || hintVisible) return;
    setHintsLeft(h => h - 1);
    setHintVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🔧 Formula Fixer</Text>
        <Text style={styles.roundText}>{qIdx + 1}/{questions.length}</Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${((qIdx + 1) / questions.length) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, gap: spacing.lg }}>
          <View style={styles.topRow}>
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreText}>⭐ {score}</Text>
            </View>
            <TouchableOpacity
              style={[styles.hintBtn, (hintsLeft <= 0 || hintVisible) && styles.hintBtnDisabled]}
              onPress={handleHint} disabled={hintsLeft <= 0 || hintVisible}
            >
              <Text style={styles.hintBtnText}>💡 Hint ({hintsLeft})</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.questionCard}>
            <Text style={styles.questionLabel}>{S.gameFixFormula}</Text>
            <View style={styles.brokenFormula}>
              <Text style={styles.brokenText}>{current.broken}</Text>
            </View>
          </View>

          {hintVisible && (
            <View style={styles.hintBox}>
              <Text style={styles.hintText}>💡 {current.hint}</Text>
            </View>
          )}

          <View style={styles.optionsList}>
            {current.options.map((opt, idx) => {
              const isChosen = chosen === idx;
              const isCorrect = idx === current.correctIndex;
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
                  <Text style={styles.optionLetter}>{['A', 'B', 'C', 'D'][idx]}</Text>
                  <Text style={[styles.optionText, (isChosen || showCorrect) && styles.optionTextSelected]}>
                    {opt}
                  </Text>
                  {isChosen && <Text style={styles.optionIcon}>{isCorrect ? '✅' : '❌'}</Text>}
                  {!isChosen && showCorrect && <Text style={styles.optionIcon}>✅</Text>}
                </TouchableOpacity>
              );
            })}
          </View>

          {showExplanation && (
            <View style={styles.explanationBlock}>
              <Text style={styles.explanationTitle}>
                {chosen === current.correctIndex ? '✅ Mzyan!' : '❌ Ghalt!'}
              </Text>
              <Text style={styles.explanationLabel}>La formule sha7i7a:</Text>
              <FormulaBox formula={current.full} />
              <View style={styles.explCard}>
                <Text style={styles.explText}>{current.explanation}</Text>
              </View>
            </View>
          )}

          {chosen !== null && (
            <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.8}>
              <Text style={styles.nextBtnText}>{isLast ? `🏁 ${S.gameOver}` : S.gameNext}</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  header: {
    backgroundColor: c.primary, flexDirection: 'row', alignItems: 'center',
    paddingTop: spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.md, gap: spacing.sm,
  },
  backBtn: { padding: spacing.xs },
  backText: { fontSize: 18, color: c.white, fontWeight: '700' },
  title: { flex: 1, fontSize: 18, fontWeight: '800', color: c.white, textAlign: 'center' },
  roundText: { fontSize: 14, color: c.white, fontWeight: '600', opacity: 0.9 },
  progressTrack: { height: 4, backgroundColor: c.border },
  progressFill: { height: 4, backgroundColor: c.primaryLight },
  scroll: { padding: spacing.lg, paddingBottom: spacing.huge, gap: spacing.lg },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  scoreBadge: { backgroundColor: c.primarySoft, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  scoreText: { color: c.primary, fontWeight: '700', fontSize: 15 },
  hintBtn: {
    backgroundColor: '#FFFDE7', borderRadius: radius.pill,
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderWidth: 1, borderColor: c.accentGold,
  },
  hintBtnDisabled: { opacity: 0.4 },
  hintBtnText: { color: '#795548', fontWeight: '700', fontSize: 13 },
  questionCard: {
    backgroundColor: c.surface, borderRadius: radius.lg, padding: spacing.lg,
    borderLeftWidth: 4, borderLeftColor: c.primary, gap: spacing.sm,
  },
  questionLabel: { fontSize: 16, fontWeight: '700', color: c.textPrimary },
  questionLabel2: { fontSize: 12, color: c.textSecondary },
  brokenFormula: { backgroundColor: '#1A1A2E', borderRadius: radius.md, padding: spacing.md, marginTop: spacing.sm },
  brokenText: { fontSize: 18, fontFamily: 'monospace', color: '#FFD54F', letterSpacing: 1 },
  hintBox: {
    backgroundColor: '#FFFDE7', borderRadius: radius.md, padding: spacing.md,
    borderLeftWidth: 4, borderLeftColor: c.accentGold,
  },
  hintText: { fontSize: 14, color: '#795548', lineHeight: 22 },
  optionsList: { gap: spacing.sm },
  option: {
    backgroundColor: c.surface, borderRadius: radius.md, borderWidth: 2, borderColor: c.border,
    flexDirection: 'row', alignItems: 'center', padding: spacing.md, gap: spacing.sm,
  },
  optionCorrect: { backgroundColor: '#C6EFCE', borderColor: c.success },
  optionWrong: { backgroundColor: '#FFCCCC', borderColor: c.error },
  optionLetter: {
    width: 28, height: 28, backgroundColor: c.background, borderRadius: 14,
    textAlign: 'center', lineHeight: 28, fontSize: 13, fontWeight: '700', color: c.textMuted,
  },
  optionText: { flex: 1, fontSize: 15, color: c.textPrimary, fontFamily: 'monospace', fontWeight: '600' },
  optionTextSelected: { color: c.textPrimary, fontWeight: '700' },
  optionIcon: { fontSize: 18 },
  explanationBlock: { gap: spacing.sm },
  explanationTitle: { fontSize: 18, fontWeight: '800', color: c.textPrimary, textAlign: 'center' },
  explanationLabel: { fontSize: 13, color: c.textMuted, fontWeight: '600', textTransform: 'uppercase' },
  explCard: {
    backgroundColor: c.surface, borderRadius: radius.md, padding: spacing.md,
    borderLeftWidth: 4, borderLeftColor: c.accentBlue,
  },
  explText: { fontSize: 14, color: c.textPrimary, lineHeight: 22 },
  nextBtn: { backgroundColor: c.primary, borderRadius: radius.pill, padding: spacing.lg, alignItems: 'center' },
  nextBtnText: { color: c.white, fontSize: 16, fontWeight: '700' },
});
