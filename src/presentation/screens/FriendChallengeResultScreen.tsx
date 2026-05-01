import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { spacing, radius, shadow } from '../theme/spacing';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { useLanguage } from '../../shared/context/LanguageContext';
import { PlayerResult } from '../../domain/multiplayer/FriendChallenge';
import { calculateStars } from '../../shared/utils/starCalculator';

interface Props {
  host: PlayerResult;
  guest: PlayerResult;
  xpEarned: number;
  onPlayAgain: () => void;
  onHome: () => void;
}

export function FriendChallengeResultScreen({ host, guest, xpEarned, onPlayAgain, onHome }: Props) {
  const { colors } = useTheme();
  const { S } = useLanguage();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const hostStars = calculateStars(host.score);
  const guestStars = calculateStars(guest.score);

  const hostWins = host.score > guest.score || (host.score === guest.score && host.timeSeconds < guest.timeSeconds);
  const guestWins = guest.score > host.score || (guest.score === host.score && guest.timeSeconds < host.timeSeconds);
  const isDraw = !hostWins && !guestWins;

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{S.friendResultTitle}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.bannerRow}>
          {isDraw ? (
            <View style={[styles.banner, styles.bannerDraw]}>
              <Text style={styles.bannerText}>{S.friendDraw}</Text>
            </View>
          ) : (
            <View style={[styles.banner, styles.bannerWin]}>
              <Text style={styles.bannerText}>
                {hostWins ? host.name : guest.name} — {S.friendWinner}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.vsRow}>
          <PlayerCard
            result={host}
            label={S.friendYou}
            isWinner={hostWins}
            stars={hostStars}
            formatTime={formatTime}
            styles={styles}
          />
          <Text style={styles.vsText}>VS</Text>
          <PlayerCard
            result={guest}
            label={S.friendFriend}
            isWinner={guestWins}
            stars={guestStars}
            formatTime={formatTime}
            styles={styles}
          />
        </View>

        {xpEarned > 0 && (
          <View style={styles.xpBanner}>
            <Text style={styles.xpText}>+{xpEarned} XP kasebti! ⭐</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.playAgainBtn} onPress={onPlayAgain} activeOpacity={0.85}>
          <Text style={styles.playAgainText}>{S.friendPlayAgain}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeBtn} onPress={onHome} activeOpacity={0.85}>
          <Text style={styles.homeBtnText}>{S.backHome}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function PlayerCard({
  result, label, isWinner, stars, formatTime, styles,
}: {
  result: PlayerResult;
  label: string;
  isWinner: boolean;
  stars: number;
  formatTime: (s: number) => string;
  styles: ReturnType<typeof makeStyles>;
}) {
  return (
    <View style={[styles.playerCard, isWinner && styles.playerCardWinner]}>
      {isWinner && <Text style={styles.crownEmoji}>👑</Text>}
      <Text style={styles.playerAvatar}>{result.avatar}</Text>
      <Text style={styles.playerName} numberOfLines={1}>{result.name}</Text>
      <Text style={styles.playerLabel}>{label}</Text>
      <View style={styles.playerDivider} />
      <Text style={styles.playerScore}>{result.score}%</Text>
      <Text style={styles.playerStars}>{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</Text>
      <Text style={styles.playerTime}>⏱ {formatTime(result.timeSeconds)}</Text>
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  header: {
    padding: spacing.lg, paddingTop: spacing.xl,
    backgroundColor: c.primary, alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 20 },
  bannerRow: { alignItems: 'center' },
  banner: { borderRadius: radius.pill, paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  bannerWin: { backgroundColor: c.accentGold },
  bannerDraw: { backgroundColor: c.accentBlue },
  bannerText: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', textAlign: 'center' },
  vsRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  vsText: { fontSize: 22, fontWeight: '900', color: c.textMuted },
  playerCard: {
    flex: 1, backgroundColor: c.surface, borderRadius: radius.xl,
    padding: spacing.lg, alignItems: 'center', gap: spacing.xs,
    ...shadow.card, borderWidth: 2, borderColor: c.border,
  },
  playerCardWinner: {
    borderColor: c.accentGold,
    ...shadow.elevated,
  },
  crownEmoji: { fontSize: 24, position: 'absolute', top: -12 },
  playerAvatar: { fontSize: 44, marginTop: spacing.sm },
  playerName: { fontSize: 15, fontWeight: '700', color: c.textPrimary, textAlign: 'center' },
  playerLabel: { fontSize: 11, color: c.textMuted, fontWeight: '600', textTransform: 'uppercase' },
  playerDivider: { width: '80%', height: 1, backgroundColor: c.border, marginVertical: spacing.xs },
  playerScore: { fontSize: 28, fontWeight: '900', color: c.primary },
  playerStars: { fontSize: 16 },
  playerTime: { fontSize: 12, color: c.textSecondary, fontWeight: '600' },
  xpBanner: {
    backgroundColor: c.accentGold, borderRadius: radius.xl,
    padding: spacing.lg, alignItems: 'center',
  },
  xpText: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  footer: { padding: spacing.lg, gap: spacing.sm, backgroundColor: c.surface, borderTopWidth: 1, borderTopColor: c.border },
  playAgainBtn: {
    backgroundColor: c.primary, borderRadius: radius.pill,
    padding: spacing.lg, alignItems: 'center',
  },
  playAgainText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  homeBtn: {
    backgroundColor: c.background, borderRadius: radius.pill,
    padding: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: c.border,
  },
  homeBtnText: { color: c.textSecondary, fontSize: 14, fontWeight: '600' },
});
