import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { radius, spacing } from '../theme/spacing';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';

function SkeletonBlock({ width, height, style }: { width: number | string; height: number; style?: object }) {
  const { colors } = useTheme();
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[{ width, height, backgroundColor: colors.border, borderRadius: radius.sm, opacity }, style]}
    />
  );
}

export function SkeletonModuleCard() {
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.card}>
      <View style={styles.colorBar} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <SkeletonBlock width={36} height={36} style={{ borderRadius: 18 }} />
          <View style={styles.titleBlock}>
            <SkeletonBlock width="70%" height={14} />
            <SkeletonBlock width="40%" height={11} style={{ marginTop: 6 }} />
          </View>
          <SkeletonBlock width={44} height={44} style={{ borderRadius: 22 }} />
        </View>
        <SkeletonBlock width="90%" height={11} style={{ marginTop: spacing.xs }} />
        <SkeletonBlock width="60%" height={11} style={{ marginTop: 4 }} />
        <View style={styles.bottomRow}>
          <SkeletonBlock width={80} height={14} />
          <SkeletonBlock width={50} height={14} />
        </View>
      </View>
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  card: {
    flexDirection: 'row', backgroundColor: c.surface,
    borderRadius: radius.lg, overflow: 'hidden', marginBottom: spacing.md, elevation: 2,
  },
  colorBar: { width: 6, backgroundColor: c.border },
  content: { flex: 1, padding: spacing.md, gap: spacing.xs },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  titleBlock: { flex: 1, gap: 6 },
  bottomRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs },
});
