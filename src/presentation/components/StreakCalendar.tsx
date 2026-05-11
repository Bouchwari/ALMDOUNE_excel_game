import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, radius } from '../theme/spacing';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { useLanguage } from '../../shared/context/LanguageContext';

interface Props {
  activeDates: string[];
}

const DAY_COUNT = 28;

function toISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function StreakCalendar({ activeDates }: Props) {
  const { colors } = useTheme();
  const { S } = useLanguage();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const activeSet = React.useMemo(() => new Set(activeDates), [activeDates]);

  const days = React.useMemo(() => {
    const result: { iso: string; isToday: boolean; active: boolean }[] = [];
    const todayISO = toISO(new Date());
    for (let i = DAY_COUNT - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const iso = toISO(d);
      result.push({ iso, isToday: iso === todayISO, active: activeSet.has(iso) });
    }
    return result;
  }, [activeSet]);

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{S.streakCalendar}</Text>
      </View>
      <View style={styles.grid}>
        {days.map(({ iso, isToday, active }) => (
          <View
            key={iso}
            style={[
              styles.dot,
              active && styles.dotActive,
              isToday && styles.dotToday,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: c.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: c.border,
  },
  dotActive: {
    backgroundColor: '#FF6F00',
    opacity: 0.85,
  },
  dotToday: {
    borderWidth: 2,
    borderColor: c.primary,
  },
});
