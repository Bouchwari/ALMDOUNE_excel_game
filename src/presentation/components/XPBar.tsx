import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { spacing, radius } from '../theme/spacing';
import { getLevelInfo } from '../../shared/utils/xpCalculator';
import { LEVELS } from '../../shared/constants/gamification';
import { useLanguage } from '../../shared/context/LanguageContext';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';

interface Props {
  xp: number;
  compact?: boolean;
}

export function XPBar({ xp, compact = false }: Props) {
  const { S } = useLanguage();
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const { current, next, progress, xpInLevel, xpNeeded } = getLevelInfo(xp);
  const animWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animWidth, { toValue: progress, duration: 800, useNativeDriver: false }).start();
  }, [progress]);

  const levelColor = LEVELS.find(l => l.level === current.level)?.color ?? colors.primary;

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <Text style={styles.compactBadge}>{current.badge}</Text>
        <View style={styles.compactBarWrap}>
          <View style={styles.compactBar}>
            <Animated.View style={[styles.fill, { width: animWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }), backgroundColor: levelColor }]} />
          </View>
          <Text style={styles.xpText}>{xp} XP</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.levelBadge}>
          <Text style={styles.badgeEmoji}>{current.badge}</Text>
          <Text style={[styles.levelName, { color: levelColor }]}>{S.isRTL ? current.nameAr : current.name}</Text>
        </View>
        <Text style={styles.xpFull}>{xp} XP</Text>
      </View>

      <View style={styles.barTrack}>
        <Animated.View
          style={[styles.fill, { width: animWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }), backgroundColor: levelColor }]}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.progressText}>{xpInLevel} / {xpNeeded} XP</Text>
        <Text style={styles.nextLevel}>{S.isRTL ? '←' : '→'} {S.isRTL ? next.nameAr : next.name} {next.badge}</Text>
      </View>
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { gap: spacing.xs },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  levelBadge: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  badgeEmoji: { fontSize: 20 },
  levelName: { fontSize: 15, fontWeight: '700' },
  xpFull: { fontSize: 14, fontWeight: '700', color: c.accentGold },
  barTrack: { height: 12, backgroundColor: c.border, borderRadius: radius.pill, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: radius.pill },
  progressText: { fontSize: 11, color: c.textMuted },
  nextLevel: { fontSize: 11, color: c.textSecondary },
  compactContainer: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  compactBadge: { fontSize: 18 },
  compactBarWrap: { flex: 1, gap: 2 },
  compactBar: { height: 6, backgroundColor: c.border, borderRadius: radius.pill, overflow: 'hidden' },
  xpText: { fontSize: 10, color: c.textMuted },
});
