import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity,
} from 'react-native';
import { LeaderboardEntry } from '../../application/progress/GetLeaderboardUseCase';
import { spacing, radius, shadow } from '../theme/spacing';
import { useLanguage } from '../../shared/context/LanguageContext';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';

interface Props {
  entries: LeaderboardEntry[];
  currentStudentId: string;
  onRefresh: () => Promise<void>;
}

const PODIUM_MEDALS = ['🥇', '🥈', '🥉'];
const PODIUM_COLORS = [
  { bg: '#FFF9C4', border: '#F9A825' }, // gold
  { bg: '#F5F5F5', border: '#9E9E9E' }, // silver
  { bg: '#FBE9E7', border: '#FF7043' }, // bronze
];
// Visual order: 2nd (left), 1st (center), 3rd (right)
const PODIUM_ORDER = [1, 0, 2];
// marginTop offsets: 2nd is lower, 1st is highest, 3rd is lowest
const PODIUM_OFFSET = [20, 0, 36];

export function LeaderboardScreen({ entries, currentStudentId, onRefresh }: Props) {
  const { S } = useLanguage();
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  const ListHeader = (
    <View>
      <Text style={styles.title}>{S.leaderboardTitle}</Text>

      {entries.length === 0 && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyEmoji}>🏆</Text>
          <Text style={styles.emptyText}>{S.leaderboardEmpty}</Text>
        </View>
      )}

      {entries.length === 1 && (
        <View style={styles.onlyOneBox}>
          <Text style={styles.onlyOneEmoji}>👥</Text>
          <Text style={styles.onlyOneText}>{S.leaderboardOnlyOne}</Text>
        </View>
      )}

      {top3.length > 0 && (
        <View style={styles.podiumRow}>
          {PODIUM_ORDER.map(rankIdx => {
            const entry = top3[rankIdx];
            if (!entry) return <View key={rankIdx} style={styles.podiumPlaceholder} />;
            const isCurrent = entry.studentId === currentStudentId;
            const col = PODIUM_COLORS[rankIdx];
            return (
              <View
                key={entry.studentId}
                style={[
                  styles.podiumCard,
                  { backgroundColor: col.bg, borderColor: col.border, marginTop: PODIUM_OFFSET[rankIdx] },
                  isCurrent && styles.podiumCardCurrent,
                ]}
              >
                <Text style={styles.podiumMedal}>{PODIUM_MEDALS[rankIdx]}</Text>
                <Text style={styles.podiumAvatar}>{entry.avatar}</Text>
                <Text style={styles.podiumName} numberOfLines={1}>{entry.name}</Text>
                <Text style={styles.podiumXP}>{entry.xp} XP</Text>
                {isCurrent && <Text style={styles.youTag}>{S.leaderboardYouHere}</Text>}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={rest}
      keyExtractor={item => item.studentId}
      ListHeaderComponent={ListHeader}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
      renderItem={({ item, index }) => {
        const isCurrent = item.studentId === currentStudentId;
        return (
          <View style={[styles.row, isCurrent && styles.rowCurrent]}>
            <Text style={styles.rankNum}>#{item.rank}</Text>
            <Text style={styles.rowAvatar}>{item.avatar}</Text>
            <View style={styles.rowInfo}>
              <Text style={styles.rowName} numberOfLines={1}>
                {item.name}
                {isCurrent ? <Text style={styles.youTagInline}>  {S.leaderboardYouHere}</Text> : null}
              </Text>
              <Text style={styles.rowLevel}>{item.levelBadge} {item.levelName}</Text>
            </View>
            <View style={styles.rowXP}>
              <Text style={styles.rowXPNum}>{item.xp}</Text>
              <Text style={styles.rowXPLabel}>XP</Text>
            </View>
          </View>
        );
      }}
    />
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  content: { padding: spacing.lg, paddingTop: spacing.xl, paddingBottom: 100, gap: spacing.md },
  title: { fontSize: 26, fontWeight: '800', color: c.textPrimary, marginBottom: spacing.lg },

  emptyBox: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing.xxl },
  emptyEmoji: { fontSize: 64 },
  emptyText: { fontSize: 16, color: c.textSecondary, textAlign: 'center' },

  onlyOneBox: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: c.primarySoft, borderRadius: radius.lg,
    padding: spacing.lg, marginBottom: spacing.md,
  },
  onlyOneEmoji: { fontSize: 28 },
  onlyOneText: { flex: 1, fontSize: 14, color: c.primary, fontWeight: '600', lineHeight: 20 },

  podiumRow: {
    flexDirection: 'row', alignItems: 'flex-end',
    gap: spacing.sm, marginBottom: spacing.lg,
  },
  podiumPlaceholder: { flex: 1 },
  podiumCard: {
    flex: 1, borderRadius: radius.lg, borderWidth: 2,
    padding: spacing.md, alignItems: 'center', gap: spacing.xs, ...shadow.card,
  },
  podiumCardCurrent: { borderWidth: 3, borderColor: c.accent },
  podiumMedal: { fontSize: 24 },
  podiumAvatar: { fontSize: 30 },
  podiumName: { fontSize: 12, fontWeight: '700', color: c.textPrimary, textAlign: 'center' },
  podiumXP: { fontSize: 13, fontWeight: '800', color: c.accentGold },
  youTag: { fontSize: 10, color: c.accent, fontWeight: '700' },

  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface,
    borderRadius: radius.md, padding: spacing.md, gap: spacing.md, ...shadow.card,
  },
  rowCurrent: { borderWidth: 2, borderColor: c.accent, backgroundColor: c.accent + '0D' },
  rankNum: { fontSize: 15, width: 32, textAlign: 'center', fontWeight: '700', color: c.textMuted },
  rowAvatar: { fontSize: 26 },
  rowInfo: { flex: 1, gap: 2 },
  rowName: { fontSize: 15, fontWeight: '700', color: c.textPrimary },
  rowLevel: { fontSize: 12, color: c.textSecondary },
  youTagInline: { fontSize: 11, color: c.accent, fontWeight: '700' },
  rowXP: { alignItems: 'flex-end' },
  rowXPNum: { fontSize: 17, fontWeight: '800', color: c.primary },
  rowXPLabel: { fontSize: 10, color: c.textMuted },
});
