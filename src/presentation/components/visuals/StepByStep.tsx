import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, radius } from '../../theme/spacing';
import { useTheme, type ColorPalette } from '../../../shared/context/ThemeContext';

interface Props {
  steps: string[];
  title?: string;
}

const BADGE_SIZE = 28;

export function StepByStep({ steps, title }: Props) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      {title != null && <Text style={styles.title}>{title}</Text>}
      {steps.map((step, i) => (
        <View key={i} style={styles.row}>
          <View style={[styles.badge, i === steps.length - 1 && styles.badgeLast]}>
            <Text style={styles.badgeText}>{i + 1}</Text>
          </View>
          {i < steps.length - 1 && <View style={styles.connector} />}
          <View style={styles.content}>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { gap: 0 },
  title: {
    fontSize: 13, fontWeight: '700', color: c.textMuted,
    textTransform: 'uppercase', marginBottom: spacing.sm,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, marginBottom: spacing.sm },
  badge: {
    width: BADGE_SIZE, height: BADGE_SIZE, borderRadius: BADGE_SIZE / 2,
    backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  badgeLast: { backgroundColor: c.accentGold },
  badgeText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  connector: {
    position: 'absolute', left: BADGE_SIZE / 2 - 1, top: BADGE_SIZE,
    width: 2, height: spacing.sm + 4, backgroundColor: c.border,
  },
  content: { flex: 1, paddingTop: 4, paddingBottom: spacing.xs },
  stepText: { fontSize: 14, color: c.textPrimary, lineHeight: 22 },
});
