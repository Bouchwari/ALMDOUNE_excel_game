import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { spacing, radius } from '../theme/spacing';
import { ConfettiAnimation } from '../components/ConfettiAnimation';
import { useLanguage } from '../../shared/context/LanguageContext';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { pickGendered } from '../../shared/constants/genderedStrings';
import { BADGES } from '../../shared/constants/gamification';

interface Props {
  score: number;
  stars: number;
  xpEarned: number;
  newBadges: string[];
  leveledUp: boolean;
  newLevel: number;
  onNext: () => void;
  onRetry: () => void;
}

export function ResultScreen({ score, stars, xpEarned, newBadges, leveledUp, newLevel, onNext, onRetry }: Props) {
  const { G, gender } = useLanguage();
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const starAnims = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];
  const xpAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  const showConfetti = stars >= 2;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(contentAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.stagger(200, starAnims.slice(0, stars).map(anim =>
        Animated.spring(anim, { toValue: 1, useNativeDriver: true, tension: 80, friction: 5 }),
      )),
      Animated.timing(xpAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const resultPair = stars === 3 ? G.result3 : stars === 2 ? G.result2 : stars === 1 ? G.result1 : G.result0;
  const message = pickGendered(resultPair, gender);
  const scoreColor = stars >= 2 ? colors.success : stars === 1 ? colors.warning : colors.error;

  return (
    <View style={styles.container}>
      <ConfettiAnimation active={showConfetti} />

      <Animated.View style={[styles.content, { opacity: contentAnim }]}>
        <View style={[styles.scoreCircle, { borderColor: scoreColor }]}>
          <Text style={[styles.scoreNum, { color: scoreColor }]}>{score}%</Text>
          <Text style={styles.scoreLabel}>Score</Text>
        </View>

        <View style={styles.starsRow}>
          {[0, 1, 2].map(i => (
            <Animated.Text
              key={i}
              style={[
                styles.star,
                {
                  transform: [{ scale: starAnims[i].interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) }],
                  opacity: i < stars ? starAnims[i] : new Animated.Value(0.25),
                },
              ]}
            >⭐</Animated.Text>
          ))}
        </View>

        <Text style={styles.message}>{message}</Text>

        <Animated.View style={[styles.xpBadge, { opacity: xpAnim }]}>
          <Text style={styles.xpText}>+{xpEarned} XP 🌟</Text>
        </Animated.View>

        {leveledUp && (
          <View style={styles.levelUpBanner}>
            <Text style={styles.levelUpText}>🎊 Level Up! Level {newLevel} 🎊</Text>
          </View>
        )}

        {newBadges.length > 0 && (
          <View style={styles.badgesBanner}>
            <Text style={styles.badgesTitle}>Badge jdid! 🏆</Text>
            <Text style={styles.badgesList}>
              {newBadges.map(id => {
                const b = BADGES.find(x => x.id === id);
                return b ? `${b.icon} ${b.name}` : id;
              }).join('  •  ')}
            </Text>
          </View>
        )}

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.retryBtn} onPress={onRetry} activeOpacity={0.8}>
            <Text style={styles.retryText}>↺ 3awed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextBtn} onPress={onNext} activeOpacity={0.8}>
            <Text style={styles.nextText}>Dars jdid ▶</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Text style={styles.footer}>الثانوية الإعدادية ألمدون</Text>
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: {
    flex: 1, backgroundColor: c.splashBg, alignItems: 'center',
    justifyContent: 'center', padding: spacing.xl,
  },
  content: { width: '100%', alignItems: 'center', gap: spacing.lg },
  scoreCircle: {
    width: 130, height: 130, borderRadius: 65, borderWidth: 6,
    backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center', gap: spacing.xs,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12, elevation: 6,
  },
  scoreNum: { fontSize: 36, fontWeight: '800' },
  scoreLabel: { fontSize: 12, color: c.textMuted },
  starsRow: { flexDirection: 'row', gap: spacing.md },
  star: { fontSize: 44 },
  message: { fontSize: 20, fontWeight: '700', color: c.textPrimary, textAlign: 'center' },
  xpBadge: {
    backgroundColor: '#FFF9C4', borderRadius: radius.pill,
    paddingHorizontal: spacing.xl, paddingVertical: spacing.md,
    borderWidth: 2, borderColor: c.accentGold,
  },
  xpText: { fontSize: 22, fontWeight: '800', color: '#F57F17' },
  levelUpBanner: { backgroundColor: c.primary, borderRadius: radius.lg, padding: spacing.md, width: '100%' },
  levelUpText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800', textAlign: 'center' },
  badgesBanner: {
    backgroundColor: '#FFF3E0', borderRadius: radius.lg, padding: spacing.md,
    width: '100%', alignItems: 'center', gap: spacing.xs, borderWidth: 2, borderColor: c.accentGold,
  },
  badgesTitle: { fontSize: 16, fontWeight: '700', color: '#795548' },
  badgesList: { fontSize: 14, color: '#5D4037', textAlign: 'center' },
  buttons: { flexDirection: 'row', gap: spacing.md, width: '100%' },
  retryBtn: {
    flex: 1, backgroundColor: c.surface, borderRadius: radius.pill,
    padding: spacing.lg, alignItems: 'center', borderWidth: 2, borderColor: c.border,
  },
  retryText: { fontSize: 15, fontWeight: '700', color: c.textSecondary },
  nextBtn: { flex: 2, backgroundColor: c.accent, borderRadius: radius.pill, padding: spacing.lg, alignItems: 'center' },
  nextText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  footer: { position: 'absolute', bottom: 24, fontSize: 12, color: c.textMuted },
});
