import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LeaderboardEntry } from '../../application/progress/GetLeaderboardUseCase';
import { spacing, radius, shadow } from '../theme/spacing';
import { useLanguage } from '../../shared/context/LanguageContext';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';

interface Props {
  entries: LeaderboardEntry[];
  currentStudentId: string;
}

const RANK_STYLES: Record<number, { bg: string; border: string; crown: string }> = {
  1: { bg: '#FFF9C4', border: '#F9A825', crown: '👑' },
  2: { bg: '#F5F5F5', border: '#9E9E9E', crown: '🥈' },
  3: { bg: '#FBE9E7', border: '#FF7043', crown: '🥉' },
};

export function LeaderboardScreen({ entries, currentStudentId }: Props) {
  const { S } = useLanguage();
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  if (entries.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🏆</Text>
        <Text style={styles.emptyText}>{S.leaderboardEmpty}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>{S.leaderboardTitle}</Text>

      {entries.slice(0, 3).length > 0 && (
        <View style={styles.podium}>
          {entries.slice(0, 3).map(entry => {
            const rs = RANK_STYLES[entry.rank];
            return (
              <View key={entry.studentId} style={[styles.podiumCard, { backgroundColor: rs.bg, borderColor: rs.border }]}>
                <Text style={styles.crown}>{rs.crown}</Text>
                <Text style={styles.podiumAvatar}>{entry.avatar}</Text>
                <Text style={styles.podiumName} numberOfLines={1}>{entry.name}</Text>
                {entry.isSimulated && <Text style={styles.botLabel}>{S.leaderboardBotLabel}</Text>}
                <Text style={styles.podiumXP}>{entry.xp} XP</Text>
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.list}>
        {entries.map(entry => {
          const isCurrent = entry.studentId === currentStudentId;
          const rs = RANK_STYLES[entry.rank];
          return (
            <View key={entry.studentId} style={[styles.row, isCurrent && styles.rowCurrent]}>
              <Text style={styles.rankNum}>{rs ? rs.crown : `#${entry.rank}`}</Text>
              <Text style={styles.rowAvatar}>{entry.avatar}</Text>
              <View style={styles.rowInfo}>
                <Text style={styles.rowName} numberOfLines={1}>{entry.name}</Text>
                <Text style={styles.rowLevel}>
                  {entry.levelBadge} {entry.levelName}
                  {entry.isSimulated ? <Text style={styles.botInline}>  {S.leaderboardBotLabel}</Text> : null}
                </Text>
              </View>
              <View style={styles.rowXP}>
                <Text style={styles.rowXPNum}>{entry.xp}</Text>
                <Text style={styles.rowXPLabel}>XP</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  content: { padding: spacing.lg, paddingTop: spacing.xl, paddingBottom: 100, gap: spacing.lg },
  title: { fontSize: 26, fontWeight: '800', color: c.textPrimary },
  podium: { flexDirection: 'row', gap: spacing.sm },
  podiumCard: {
    flex: 1, borderRadius: radius.lg, borderWidth: 2,
    padding: spacing.md, alignItems: 'center', gap: spacing.xs,
  },
  crown: { fontSize: 22 },
  podiumAvatar: { fontSize: 32 },
  podiumName: { fontSize: 12, fontWeight: '700', color: c.textPrimary, textAlign: 'center' },
  podiumXP: { fontSize: 13, fontWeight: '800', color: c.accentGold },
  list: { gap: spacing.sm },
  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface,
    borderRadius: radius.md, padding: spacing.md, gap: spacing.md, ...shadow.card,
  },
  rowCurrent: { borderWidth: 2, borderColor: c.accent },
  rankNum: { fontSize: 16, width: 30, textAlign: 'center', fontWeight: '700', color: c.textSecondary },
  rowAvatar: { fontSize: 28 },
  rowInfo: { flex: 1, gap: 2 },
  rowName: { fontSize: 15, fontWeight: '700', color: c.textPrimary },
  rowLevel: { fontSize: 12, color: c.textSecondary },
  rowXP: { alignItems: 'flex-end' },
  rowXPNum: { fontSize: 17, fontWeight: '800', color: c.primary },
  rowXPLabel: { fontSize: 10, color: c.textMuted },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg },
  emptyEmoji: { fontSize: 64 },
  emptyText: { fontSize: 16, color: c.textSecondary, textAlign: 'center' },
  botLabel: { fontSize: 9, color: c.textMuted, fontWeight: '600', letterSpacing: 0.4 },
  botInline: { fontSize: 9, color: c.textMuted, fontWeight: '600' },
});
