import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { spacing, radius, shadow } from '../theme/spacing';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { useLanguage } from '../../shared/context/LanguageContext';
import { QRPayload, encodeChallenge } from '../../domain/multiplayer/FriendChallenge';
import { calculateStars } from '../../shared/utils/starCalculator';

interface Props {
  payload: QRPayload;
  onDone: () => void;
}

export function FriendChallengeQRScreen({ payload, onDone }: Props) {
  const { colors } = useTheme();
  const { S } = useLanguage();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const qrValue = encodeChallenge(payload);
  const stars = calculateStars(payload.s);
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{S.friendShowQR}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.scoreCard}>
          <Text style={styles.avatar}>{payload.a}</Text>
          <Text style={styles.playerName}>{payload.p}</Text>
          <View style={styles.scoreRow}>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreNum}>{payload.s}%</Text>
              <Text style={styles.scoreLabel}>Score</Text>
            </View>
            <View style={styles.scoreDivider} />
            <View style={styles.scoreItem}>
              <Text style={styles.starsRow}>{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</Text>
              <Text style={styles.scoreLabel}>Étoiles</Text>
            </View>
            <View style={styles.scoreDivider} />
            <View style={styles.scoreItem}>
              <Text style={styles.scoreNum}>⏱ {formatTime(payload.ti)}</Text>
              <Text style={styles.scoreLabel}>Temps</Text>
            </View>
          </View>
        </View>

        <View style={styles.qrWrapper}>
          <View style={styles.qrCard}>
            <QRCode
              value={qrValue}
              size={220}
              color="#000000"
              backgroundColor="#FFFFFF"
            />
          </View>
          <Text style={styles.qrInstruction}>{S.friendQRInstruction}</Text>
        </View>

        <View style={styles.arrowHint}>
          <Text style={styles.arrowHintText}>{S.friendArrowHint}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.doneBtn} onPress={onDone} activeOpacity={0.85}>
          <Text style={styles.doneBtnText}>{S.friendDone}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  header: {
    padding: spacing.lg, paddingTop: spacing.xl,
    backgroundColor: c.primary, alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 20 },
  scoreCard: {
    backgroundColor: c.surface, borderRadius: radius.xl, padding: spacing.lg,
    alignItems: 'center', gap: spacing.md, ...shadow.card,
  },
  avatar: { fontSize: 52 },
  playerName: { fontSize: 20, fontWeight: '700', color: c.textPrimary },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, width: '100%', justifyContent: 'center' },
  scoreItem: { alignItems: 'center', gap: spacing.xs, flex: 1 },
  scoreNum: { fontSize: 18, fontWeight: '800', color: c.primary },
  starsRow: { fontSize: 16 },
  scoreLabel: { fontSize: 11, color: c.textMuted, fontWeight: '600' },
  scoreDivider: { width: 1, height: 36, backgroundColor: c.border },
  qrWrapper: { alignItems: 'center', gap: spacing.md },
  qrCard: {
    backgroundColor: '#FFFFFF', borderRadius: radius.xl, padding: spacing.lg,
    ...shadow.elevated,
  },
  qrInstruction: { fontSize: 14, color: c.textSecondary, textAlign: 'center', fontWeight: '600' },
  arrowHint: {
    backgroundColor: c.primarySoft, borderRadius: radius.md,
    padding: spacing.md, alignItems: 'center',
  },
  arrowHintText: { fontSize: 14, color: c.primary, fontWeight: '700' },
  footer: {
    padding: spacing.lg, backgroundColor: c.surface,
    borderTopWidth: 1, borderTopColor: c.border,
  },
  doneBtn: {
    backgroundColor: c.primary, borderRadius: radius.pill,
    padding: spacing.lg, alignItems: 'center',
  },
  doneBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
