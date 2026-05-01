import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { spacing } from '../theme/spacing';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';

interface Props {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: Props) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, useNativeDriver: true, tension: 80, friction: 6 }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      Animated.timing(textOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => onFinishRef.current(), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>📊</Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
        <Text style={styles.appName}>ExcelStar</Text>
        <Text style={styles.schoolAr}>الثانوية الإعدادية ألمدون</Text>
        <Text style={styles.schoolFr}>Lycée Collégial Almdoun</Text>
      </Animated.View>

      <View style={styles.dots}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: c.splashBg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxl,
  },
  logoContainer: { alignItems: 'center' },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: c.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: c.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  logoEmoji: { fontSize: 64 },
  textContainer: { alignItems: 'center', gap: spacing.sm },
  appName: { fontSize: 42, fontWeight: '800', color: c.primary, letterSpacing: 1 },
  schoolAr: { fontSize: 16, fontWeight: '600', color: c.textPrimary, textAlign: 'center' },
  schoolFr: { fontSize: 14, color: c.accent, fontWeight: '600' },
  dots: { flexDirection: 'row', gap: spacing.sm, position: 'absolute', bottom: 60 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: c.border },
  dotActive: { backgroundColor: c.accent, width: 24 },
});
