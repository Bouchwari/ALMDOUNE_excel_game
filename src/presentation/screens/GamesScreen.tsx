import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { spacing, radius, shadow } from '../theme/spacing';
import { useLanguage } from '../../shared/context/LanguageContext';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StudentProgress } from '../../domain/student/StudentProgress';

interface GameCard {
  key: 'cell' | 'formula' | 'speed';
  icon: string;
  xp: number;
}

const GAME_CARD_DEFS: GameCard[] = [
  { key: 'cell',    icon: '🎯', xp: 80  },
  { key: 'formula', icon: '🔧', xp: 100 },
  { key: 'speed',   icon: '⚡', xp: 120 },
];

interface Props {
  progress: StudentProgress | null;
  onPlayGame: (game: 'cell' | 'formula' | 'speed') => void;
  onDailyChallenge: () => void;
  onQuickQuiz: () => void;
  onClassChallenge: () => void;
  isChallengeAvailable: boolean;
}

export function GamesScreen({ progress, onPlayGame, onDailyChallenge, onQuickQuiz, onClassChallenge, isChallengeAvailable }: Props) {
  const { S } = useLanguage();
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const gameColors: Record<GameCard['key'], string> = {
    cell:    colors.accentBlue,
    formula: colors.primary,
    speed:   colors.accent,
  };
  const gameNames: Record<GameCard['key'], string> = {
    cell:    S.gameCellNavName,
    formula: S.gameFormulaName,
    speed:   S.gameSpeedQuizName,
  };
  const gameDescs: Record<GameCard['key'], string> = {
    cell:    S.gameCellNavDesc,
    formula: S.gameFormulaDesc,
    speed:   S.gameSpeedQuizDesc,
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{S.tabGames}</Text>
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>⭐ {progress?.xp ?? 0} XP</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <TouchableOpacity style={styles.classCard} onPress={onClassChallenge} activeOpacity={0.85}>
          <View style={styles.classCardLeft}>
            <Text style={styles.classIcon}>👨‍🏫</Text>
            <View style={styles.classInfo}>
              <Text style={styles.classTitle}>{S.classChallengeTitle}</Text>
              <Text style={styles.classDesc}>{S.classChallengeSubtitle}</Text>
            </View>
          </View>
          <View style={styles.classArrow}>
            <Text style={styles.classArrowText}>▶</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>🔥 {S.dailyChallengeTitle}</Text>
        <View style={styles.quickRow}>
          <TouchableOpacity
            style={[
              styles.quickCard,
              { backgroundColor: isChallengeAvailable ? '#E8F8F0' : colors.surface },
              !isChallengeAvailable && styles.quickCardLocked,
            ]}
            onPress={isChallengeAvailable ? onDailyChallenge : undefined}
            activeOpacity={isChallengeAvailable ? 0.8 : 1}
          >
            <Text style={styles.quickIcon}>{isChallengeAvailable ? '🔥' : '✅'}</Text>
            <Text style={[styles.quickName, !isChallengeAvailable && styles.lockedText]}>
              {S.dailyChallengeTitle}
            </Text>
            <Text style={[styles.quickDesc, !isChallengeAvailable && styles.lockedText]}>
              {isChallengeAvailable ? S.dailyChallengeDesc : S.challengeDone}
            </Text>
            {isChallengeAvailable ? (
              <View style={styles.xpPill}>
                <Text style={styles.xpPillText}>+50 XP</Text>
              </View>
            ) : (
              <Text style={styles.nextInText}>{S.challengeNextIn}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickCard, { backgroundColor: '#FFF8E1' }]} onPress={onQuickQuiz} activeOpacity={0.8}>
            <Text style={styles.quickIcon}>⚡</Text>
            <Text style={styles.quickName}>{S.quickQuizTitle}</Text>
            <Text style={styles.quickDesc}>{S.quickQuizDesc}</Text>
            <View style={[styles.xpPill, { backgroundColor: colors.accentGold }]}>
              <Text style={styles.xpPillText}>+30 XP</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>{S.miniGamesTitle}</Text>
        {GAME_CARD_DEFS.map(card => {
          const color = gameColors[card.key];
          return (
            <TouchableOpacity
              key={card.key}
              style={styles.gameCard}
              onPress={() => onPlayGame(card.key)}
              activeOpacity={0.85}
            >
              <View style={[styles.colorBar, { backgroundColor: color }]} />
              <View style={styles.gameIconBox}>
                <Text style={styles.gameIcon}>{card.icon}</Text>
              </View>
              <View style={styles.gameInfo}>
                <Text style={styles.gameName}>{gameNames[card.key]}</Text>
                <Text style={styles.gameDesc}>{gameDescs[card.key]}</Text>
                <View style={styles.gameMeta}>
                  <View style={[styles.diffBadge, { backgroundColor: color + '20' }]}>
                    <Text style={[styles.diffText, { color }]}>
                      {card.key === 'cell' ? `⭐ ${S.diffEasy}` : card.key === 'formula' ? `⭐⭐ ${S.diffMedium}` : `⭐⭐⭐ ${S.diffHard}`}
                    </Text>
                  </View>
                  <Text style={styles.xpReward}>+{card.xp} XP</Text>
                </View>
              </View>
              <View style={[styles.playBtn, { backgroundColor: color }]}>
                <Text style={styles.playBtnText}>▶</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>{S.gameTipTitle}</Text>
          <Text style={styles.tipText}>{S.gameTipText}</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  header: {
    backgroundColor: c.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl + spacing.lg,
    paddingBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: c.textPrimary },
  xpBadge: {
    backgroundColor: c.primarySoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  xpText: { color: c.primary, fontWeight: '700', fontSize: 14 },
  scroll: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.huge },
  classCard: {
    backgroundColor: '#E8F5E9', borderRadius: radius.lg,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: spacing.lg, borderLeftWidth: 5, borderLeftColor: '#43A047', ...shadow.card,
  },
  classCardLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 },
  classIcon: { fontSize: 36 },
  classInfo: { flex: 1, gap: 2 },
  classTitle: { fontSize: 16, fontWeight: '800', color: '#2E7D32' },
  classDesc: { fontSize: 12, color: '#388E3C', lineHeight: 18 },
  classArrow: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: '#43A047', alignItems: 'center', justifyContent: 'center',
  },
  classArrowText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  sectionLabel: {
    fontSize: 13, fontWeight: '700', color: c.textMuted,
    textTransform: 'uppercase', letterSpacing: 0.8, marginTop: spacing.sm,
  },
  quickRow: { flexDirection: 'row', gap: spacing.sm },
  quickCard: { flex: 1, borderRadius: radius.lg, padding: spacing.md, gap: spacing.xs, ...shadow.card },
  quickIcon: { fontSize: 28 },
  quickName: { fontSize: 13, fontWeight: '700', color: c.textPrimary },
  quickDesc: { fontSize: 11, color: c.textSecondary, lineHeight: 16 },
  xpPill: {
    alignSelf: 'flex-start', backgroundColor: c.primary,
    borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: 2, marginTop: spacing.xs,
  },
  xpPillText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  quickCardLocked: { opacity: 0.7, borderWidth: 1, borderColor: c.border },
  lockedText: { color: c.textMuted },
  nextInText: { fontSize: 11, color: c.textMuted, fontWeight: '600', marginTop: spacing.xs },
  gameCard: {
    backgroundColor: c.surface, borderRadius: radius.lg,
    flexDirection: 'row', alignItems: 'center', overflow: 'hidden', ...shadow.card,
  },
  colorBar: { width: 5, alignSelf: 'stretch' },
  gameIconBox: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center' },
  gameIcon: { fontSize: 28 },
  gameInfo: { flex: 1, padding: spacing.md, gap: spacing.xs },
  gameName: { fontSize: 16, fontWeight: '700', color: c.textPrimary },
  gameDesc: { fontSize: 12, color: c.textSecondary },
  gameMeta: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: 2 },
  diffBadge: { borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  diffText: { fontSize: 10, fontWeight: '700' },
  xpReward: { fontSize: 12, fontWeight: '700', color: c.accentGold },
  playBtn: { width: 48, height: 48, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center', margin: spacing.md },
  playBtnText: { color: '#FFFFFF', fontSize: 18 },
  tipBox: {
    backgroundColor: '#FFFDE7', borderRadius: radius.md, padding: spacing.md,
    borderLeftWidth: 4, borderLeftColor: c.accentGold, gap: spacing.xs, marginTop: spacing.sm,
  },
  tipTitle: { fontSize: 13, fontWeight: '700', color: '#795548' },
  tipText: { fontSize: 13, color: '#5D4037', lineHeight: 22 },
});
