import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { Lesson, LessonSlide } from '../../domain/curriculum/Lesson';
import { spacing, radius } from '../theme/spacing';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { useLanguage } from '../../shared/context/LanguageContext';
import { FormulaBox } from '../components/visuals/FormulaBox';
import { FormulaDisplay } from '../components/visuals/FormulaDisplay';
import { ExcelMockup } from '../components/visuals/ExcelMockup';
import { StepByStep } from '../components/visuals/StepByStep';
import { KeyboardShortcut } from '../components/visuals/KeyboardShortcut';

interface Props {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
}

type Styles = ReturnType<typeof makeStyles>;

function isFormula(s: string): boolean { return s.trim().startsWith('='); }
function isGridLike(s: string): boolean { return s.includes('|') || (s.includes('\n') && !s.trim().startsWith('=')); }

function extractSteps(explanation: string): string[] | null {
  const lines = explanation.split('\n').map(l => l.trim()).filter(Boolean);
  const numbered = lines.filter(l => /^\d+[.)]\s/.test(l));
  if (numbered.length >= 2) return numbered.map(l => l.replace(/^\d+[.)]\s*/, ''));
  return null;
}

function extractShortcuts(text: string): string[] {
  const matches = text.match(/\b(Ctrl|Alt|Shift|Win|Cmd)(\+[\w]+)+/gi);
  return matches ?? [];
}

function SlideContent({ slide, styles }: { slide: LessonSlide; styles: Styles }) {
  const { S } = useLanguage();
  const steps = extractSteps(slide.explanation);
  const shortcuts = extractShortcuts(slide.tip ?? '');
  const hasFormula = slide.excelExample != null && isFormula(slide.excelExample);
  const hasGrid = slide.excelExample != null && !hasFormula && isGridLike(slide.excelExample);
  const hasPlainExample = slide.excelExample != null && !hasFormula && !hasGrid;

  return (
    <>
      <View style={styles.conceptBadge}>
        <Text style={styles.conceptLabel}>{S.lessonConceptLabel}</Text>
        <Text style={styles.conceptFr}>{slide.conceptFr}</Text>
      </View>

      {steps != null ? (
        <View style={styles.card}>
          <StepByStep steps={steps} title={S.lessonStepsLabel} />
        </View>
      ) : (
        <View style={styles.explanationCard}>
          <Text style={styles.explanationText}>{slide.explanation}</Text>
        </View>
      )}

      {hasFormula && (
        <View style={styles.visualBlock}>
          <Text style={styles.visualLabel}>{S.lessonFormulaLabel}</Text>
          <FormulaBox formula={slide.excelExample!} />
          <ExcelMockup
            formulaBar={slide.excelExample}
            rows={[
              [{ value: 'A', isHeader: true }, { value: 'B', isHeader: true }, { value: 'Résultat', isHeader: true }],
              [{ value: '10' }, { value: '20' }, { value: slide.excelExample!, isFormula: true, isHighlighted: true }],
            ]}
            title="Aperçu"
          />
        </View>
      )}

      {hasGrid && (
        <View style={styles.visualBlock}>
          <Text style={styles.visualLabel}>🖥️ Interface Excel:</Text>
          <ExcelMockup raw={slide.excelExample!} title={slide.conceptFr} />
        </View>
      )}

      {hasPlainExample && (
        <View style={styles.visualBlock}>
          <Text style={styles.visualLabel}>{S.lessonExampleLabel}</Text>
          <FormulaDisplay formula={slide.excelExample!} showToggle />
        </View>
      )}

      {shortcuts.length > 0 && (
        <View style={styles.shortcutBlock}>
          <Text style={styles.visualLabel}>{S.lessonShortcutsLabel}</Text>
          <View style={styles.shortcutRow}>
            {shortcuts.map((sc, i) => (
              <KeyboardShortcut key={i} shortcut={sc} />
            ))}
          </View>
        </View>
      )}

      {slide.tip != null && (
        <View style={styles.tipBox}>
          <Text style={styles.tipLabel}>{S.lessonTipLabel}</Text>
          <Text style={styles.tipText}>{slide.tip}</Text>
        </View>
      )}
    </>
  );
}

export function LessonScreen({ lesson, onComplete, onBack }: Props) {
  const { colors } = useTheme();
  const { S, language } = useLanguage();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const [slideIdx, setSlideIdx] = useState(0);
  const primaryTitle = language === 'darija-ar' ? lesson.titleDarija : lesson.titleFr;
  const secondaryTitle = language === 'darija-ar' ? lesson.titleFr : lesson.titleDarija;
  const slides = lesson.slides;
  const current = slides[slideIdx];
  const isLast = slideIdx === slides.length - 1;

  const handleNext = () => { if (isLast) onComplete(); else setSlideIdx(i => i + 1); };
  const handlePrev = () => { if (slideIdx > 0) setSlideIdx(i => i - 1); };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.lessonTitle} numberOfLines={1}>{primaryTitle}</Text>
          <Text style={styles.lessonDarija}>{secondaryTitle}</Text>
        </View>
        <Text style={styles.slideCount}>{slideIdx + 1}/{slides.length}</Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${((slideIdx + 1) / slides.length) * 100}%` }]} />
      </View>

      <View style={styles.progressDots}>
        {slides.map((_, i) => (
          <TouchableOpacity key={i} onPress={() => setSlideIdx(i)}>
            <View style={[styles.dot, i <= slideIdx && styles.dotActive, i === slideIdx && styles.dotCurrent]} />
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {lesson.isMiniGame && (
          <View style={styles.miniGameBanner}>
            <Text style={styles.miniGameText}>{S.lessonMiniGame}</Text>
          </View>
        )}
        <SlideContent slide={current} styles={styles} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.prevBtn, slideIdx === 0 && styles.btnDisabled]}
          onPress={handlePrev}
          disabled={slideIdx === 0}
          activeOpacity={0.7}
        >
          <Text style={[styles.prevText, slideIdx === 0 && styles.btnTextDisabled]}>← Raje3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.8}>
          <Text style={styles.nextText}>{isLast ? '📝 Bda Exercises!' : 'Fhemt! →'}</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  lessonTitle: { fontSize: 16, fontWeight: '700', color: c.textPrimary },
  lessonDarija: { fontSize: 12, color: c.textSecondary },
  slideCount: { fontSize: 13, color: c.textMuted, fontWeight: '600' },
  progressTrack: { height: 3, backgroundColor: c.border },
  progressFill: { height: 3, backgroundColor: c.primary },
  progressDots: {
    flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm, backgroundColor: c.surface,
  },
  dot: { width: 20, height: 4, borderRadius: 2, backgroundColor: c.border },
  dotActive: { backgroundColor: c.primaryLight },
  dotCurrent: { backgroundColor: c.primary },
  scroll: { flex: 1 },
  scrollContent: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.huge },
  miniGameBanner: { backgroundColor: c.accent, borderRadius: radius.md, padding: spacing.md, alignItems: 'center' },
  miniGameText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  conceptBadge: { gap: 2 },
  conceptLabel: { fontSize: 11, color: c.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  conceptFr: { fontSize: 22, fontWeight: '800', color: c.primary },
  card: { backgroundColor: c.surface, borderRadius: radius.lg, padding: spacing.lg },
  explanationCard: {
    backgroundColor: c.surface, borderRadius: radius.lg, padding: spacing.lg,
    borderLeftWidth: 4, borderLeftColor: c.primary,
  },
  explanationText: { fontSize: 16, color: c.textPrimary, lineHeight: 26 },
  visualBlock: { gap: spacing.sm },
  visualLabel: { fontSize: 12, fontWeight: '700', color: c.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  shortcutBlock: { gap: spacing.sm },
  shortcutRow: {
    flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, alignItems: 'center',
    backgroundColor: c.surface, borderRadius: radius.md, padding: spacing.md,
  },
  tipBox: {
    backgroundColor: '#FFFDE7', borderRadius: radius.md, padding: spacing.md,
    gap: spacing.xs, borderLeftWidth: 4, borderLeftColor: c.accentGold,
  },
  tipLabel: { fontSize: 13, fontWeight: '700', color: '#795548' },
  tipText: { fontSize: 14, color: '#5D4037', lineHeight: 22 },
  footer: {
    flexDirection: 'row', padding: spacing.lg, gap: spacing.sm,
    backgroundColor: c.surface, borderTopWidth: 1, borderTopColor: c.border,
  },
  prevBtn: { flex: 1, borderRadius: radius.pill, padding: spacing.lg, alignItems: 'center', borderWidth: 2, borderColor: c.primary },
  prevText: { color: c.primary, fontSize: 15, fontWeight: '700' },
  btnDisabled: { borderColor: c.border },
  btnTextDisabled: { color: c.textMuted },
  nextBtn: { flex: 2, backgroundColor: c.primary, borderRadius: radius.pill, padding: spacing.lg, alignItems: 'center' },
  nextText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
