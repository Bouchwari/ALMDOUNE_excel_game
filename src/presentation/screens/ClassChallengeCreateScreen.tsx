import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { spacing, radius, shadow } from '../theme/spacing';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { useLanguage } from '../../shared/context/LanguageContext';
import { Exercise } from '../../domain/curriculum/Exercise';
import { ClassChallengePayload, encodeClassChallenge } from '../../domain/multiplayer/FriendChallenge';
import { generateClassChallenge } from '../../shared/utils/challengeEngine';

interface Props {
  onPlaySelf: (exercises: Exercise[], title: string) => void;
  onBack: () => void;
}

const DIFFICULTIES = [1, 2, 3] as const;
const COUNTS = [5, 10, 15] as const;

export function ClassChallengeCreateScreen({ onPlaySelf, onBack }: Props) {
  const { colors } = useTheme();
  const { S } = useLanguage();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(1);
  const [count, setCount] = useState<5 | 10 | 15>(5);
  const [qrValue, setQrValue] = useState<string | null>(null);
  const [pendingExercises, setPendingExercises] = useState<Exercise[]>([]);
  const [pendingTitle, setPendingTitle] = useState('');

  const diffLabels = useMemo<Record<1 | 2 | 3, string>>(() => ({
    1: S.diffEasy,
    2: S.diffMedium,
    3: S.diffHard,
  }), [S.diffEasy, S.diffMedium, S.diffHard]);

  const diffColors: Record<1 | 2 | 3, string> = {
    1: colors.accentBlue,
    2: colors.primary,
    3: colors.accent,
  };

  const handleGenerate = useCallback(() => {
    const { exercises, poolIds } = generateClassChallenge(difficulty, count);
    const title = `${diffLabels[difficulty]} – ${count} ${count === 5 ? 'so2alat' : 'questions'}`;
    const payload: ClassChallengePayload = {
      v: 2,
      q: poolIds,
      title,
      diff: difficulty,
      createdAt: Date.now(),
    };
    setQrValue(encodeClassChallenge(payload));
    setPendingExercises(exercises);
    setPendingTitle(title);
  }, [difficulty, count, diffLabels]);

  const handlePlaySelf = useCallback(() => {
    if (pendingExercises.length > 0) {
      onPlaySelf(pendingExercises, pendingTitle);
    }
  }, [pendingExercises, pendingTitle, onPlaySelf]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{S.classChallengeTitle}</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {!qrValue ? (
          <>
            <Text style={styles.subtitle}>{S.classChallengeSubtitle}</Text>

            <Text style={styles.sectionLabel}>📊 {S.diffEasy} / {S.diffMedium} / {S.diffHard}</Text>
            <View style={styles.optionRow}>
              {DIFFICULTIES.map(d => (
                <TouchableOpacity
                  key={d}
                  style={[
                    styles.optionBtn,
                    { borderColor: diffColors[d] },
                    difficulty === d && { backgroundColor: diffColors[d] },
                  ]}
                  onPress={() => setDifficulty(d)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.optionText, difficulty === d && styles.optionTextSelected]}>
                    {'⭐'.repeat(d)} {diffLabels[d]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionLabel}>🔢 {count} questions</Text>
            <View style={styles.optionRow}>
              {COUNTS.map(c => (
                <TouchableOpacity
                  key={c}
                  style={[
                    styles.optionBtn,
                    { borderColor: colors.primary },
                    count === c && { backgroundColor: colors.primary },
                  ]}
                  onPress={() => setCount(c)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.optionText, count === c && styles.optionTextSelected]}>
                    {c}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate} activeOpacity={0.85}>
              <Text style={styles.generateBtnText}>📲 Generate QR</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.shareHint}>{S.classChallengeShareHint}</Text>

            <View style={styles.qrWrapper}>
              <View style={styles.qrCard}>
                <QRCode value={qrValue} size={240} color="#000000" backgroundColor="#FFFFFF" />
              </View>
            </View>

            <Text style={styles.qrInstruction}>{S.classChallengeQRInstruction}</Text>

            <View style={styles.actionRow}>
              <TouchableOpacity style={[styles.actionBtn, styles.playSelfBtn]} onPress={handlePlaySelf} activeOpacity={0.85}>
                <Text style={styles.playSelfText}>{S.classChallengePlaySelf}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.doneBtn]} onPress={onBack} activeOpacity={0.85}>
                <Text style={styles.doneBtnText}>{S.classChallengeDone}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.regenerateLink} onPress={() => setQrValue(null)} activeOpacity={0.7}>
              <Text style={styles.regenerateLinkText}>↺ New challenge</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: spacing.lg, paddingTop: spacing.xl,
    backgroundColor: c.surface, borderBottomWidth: 1, borderBottomColor: c.border,
  },
  backBtn: { width: 40, padding: spacing.xs },
  backText: { fontSize: 22, color: c.textPrimary },
  headerTitle: { fontSize: 18, fontWeight: '800', color: c.textPrimary },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 60 },
  subtitle: { fontSize: 15, color: c.textSecondary, textAlign: 'center', lineHeight: 22 },
  sectionLabel: { fontSize: 13, fontWeight: '700', color: c.textMuted, textTransform: 'uppercase', letterSpacing: 0.8 },
  optionRow: { flexDirection: 'row', gap: spacing.sm },
  optionBtn: {
    flex: 1, borderRadius: radius.md, borderWidth: 2,
    padding: spacing.md, alignItems: 'center', ...shadow.card,
    backgroundColor: c.surface,
  },
  optionText: { fontSize: 13, fontWeight: '700', color: c.textPrimary, textAlign: 'center' },
  optionTextSelected: { color: '#FFFFFF' },
  generateBtn: {
    backgroundColor: c.primary, borderRadius: radius.pill,
    padding: spacing.lg, alignItems: 'center', marginTop: spacing.md, ...shadow.elevated,
  },
  generateBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  shareHint: {
    fontSize: 16, fontWeight: '700', color: c.primary,
    textAlign: 'center', paddingVertical: spacing.sm,
  },
  qrWrapper: { alignItems: 'center' },
  qrCard: {
    backgroundColor: '#FFFFFF', borderRadius: radius.xl,
    padding: spacing.lg, ...shadow.elevated,
  },
  qrInstruction: {
    fontSize: 14, color: c.textSecondary, textAlign: 'center',
    fontWeight: '600', lineHeight: 20,
  },
  actionRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm },
  actionBtn: { flex: 1, borderRadius: radius.pill, padding: spacing.lg, alignItems: 'center' },
  playSelfBtn: { backgroundColor: c.accent },
  playSelfText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  doneBtn: { backgroundColor: c.surface, borderWidth: 2, borderColor: c.border },
  doneBtnText: { color: c.textPrimary, fontWeight: '700', fontSize: 15 },
  regenerateLink: { alignItems: 'center', paddingVertical: spacing.sm },
  regenerateLinkText: { fontSize: 14, color: c.textMuted, fontWeight: '600' },
});
