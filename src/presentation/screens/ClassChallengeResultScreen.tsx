import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { spacing, radius, shadow } from '../theme/spacing';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { useLanguage } from '../../shared/context/LanguageContext';

interface Props {
  score: number;
  stars: number;
  title: string;
  onDone: () => void;
}

const RESULT_EMOJIS = ['😔', '💪', '⭐', '🏆'];

export function ClassChallengeResultScreen({ score, stars, title, onDone }: Props) {
  const { colors } = useTheme();
  const { S } = useLanguage();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const emoji = RESULT_EMOJIS[Math.min(stars, 3)];
  const starStr = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.title}>{S.classChallengeResultTitle}</Text>
        <Text style={styles.subtitle}>{title}</Text>
        <Text style={styles.scoreNum}>{score}%</Text>
        <Text style={styles.stars}>{starStr}</Text>
      </View>

      <TouchableOpacity style={styles.doneBtn} onPress={onDone} activeOpacity={0.85}>
        <Text style={styles.doneBtnText}>{S.classChallengeDone}</Text>
      </TouchableOpacity>
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: {
    flex: 1, backgroundColor: c.splashBg ?? c.background,
    alignItems: 'center', justifyContent: 'center', padding: spacing.xl,
    gap: spacing.xl,
  },
  card: {
    backgroundColor: c.surface, borderRadius: radius.xl,
    padding: spacing.xxxl, alignItems: 'center', gap: spacing.md,
    width: '100%', ...shadow.elevated,
  },
  emoji: { fontSize: 72 },
  title: { fontSize: 22, fontWeight: '800', color: c.textPrimary, textAlign: 'center' },
  subtitle: { fontSize: 14, color: c.textSecondary, textAlign: 'center' },
  scoreNum: { fontSize: 56, fontWeight: '900', color: c.primary },
  stars: { fontSize: 32, letterSpacing: 4 },
  doneBtn: {
    backgroundColor: c.primary, borderRadius: radius.pill,
    paddingHorizontal: spacing.xxxl, paddingVertical: spacing.lg,
    ...shadow.card, width: '100%', alignItems: 'center',
  },
  doneBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
