import React, { useRef, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { ModuleWithProgress } from '../../application/curriculum/GetModulesUseCase';
import { spacing, radius, shadow } from '../theme/spacing';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { StarRating } from './StarRating';
import { ProgressRing } from './ProgressRing';

interface Props {
  module: ModuleWithProgress;
  onPress: () => void;
}

function ModuleCardBase({ module, onPress }: Props) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const { isUnlocked, progressPercent, starsEarned, totalStars, titleFr, titleDarija, descriptionDarija, icon, color } = module;
  const scale = useRef(new Animated.Value(1)).current;
  const mountAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(mountAnim, { toValue: 1, duration: 350, useNativeDriver: true }).start();
  }, []);

  const handlePressIn = useCallback(() => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  }, [scale]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 4 }).start();
  }, [scale]);

  return (
    <Animated.View style={[{
      transform: [{ scale }, { translateY: mountAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
    }, !isUnlocked && styles.locked]}>
      <TouchableOpacity
        style={styles.card}
        onPress={isUnlocked ? onPress : undefined}
        onPressIn={isUnlocked ? handlePressIn : undefined}
        onPressOut={isUnlocked ? handlePressOut : undefined}
        activeOpacity={1}
      >
        <View style={[styles.colorBar, { backgroundColor: color }]} />
        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={styles.icon}>{icon}</Text>
            <View style={styles.titleBlock}>
              <Text style={styles.titleFr}>{titleFr}</Text>
              <Text style={styles.titleDarija}>{titleDarija}</Text>
            </View>
            <ProgressRing progress={progressPercent / 100} size={44} color={color} />
          </View>
          <Text style={styles.desc} numberOfLines={2}>{descriptionDarija}</Text>
          <View style={styles.bottomRow}>
            <StarRating stars={starsEarned} total={totalStars} size={14} />
            <Text style={styles.starsText}>{starsEarned}/{totalStars} ⭐</Text>
            {!isUnlocked && <Text style={styles.lockBadge}>🔒 Msdoud</Text>}
            {isUnlocked && progressPercent === 100 && <Text style={styles.doneBadge}>✅ Mkemmel</Text>}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export const ModuleCard = React.memo(ModuleCardBase);

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  card: {
    flexDirection: 'row', backgroundColor: c.surface,
    borderRadius: radius.lg, overflow: 'hidden', marginBottom: spacing.md, ...shadow.card,
  },
  locked: { opacity: 0.6 },
  colorBar: { width: 6 },
  content: { flex: 1, padding: spacing.md, gap: spacing.xs },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  icon: { fontSize: 28 },
  titleBlock: { flex: 1 },
  titleFr: { fontSize: 15, fontWeight: '700', color: c.textPrimary },
  titleDarija: { fontSize: 12, color: c.textSecondary, fontStyle: 'italic' },
  desc: { fontSize: 12, color: c.textMuted, lineHeight: 18 },
  bottomRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap' },
  starsText: { fontSize: 12, color: c.accentGold, fontWeight: '600' },
  lockBadge: { fontSize: 11, color: c.textMuted, marginLeft: 'auto' },
  doneBadge: { fontSize: 11, color: c.success, marginLeft: 'auto' },
});
