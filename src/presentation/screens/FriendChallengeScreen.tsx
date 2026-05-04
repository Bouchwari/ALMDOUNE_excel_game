import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { spacing, radius, shadow } from '../theme/spacing';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { useLanguage } from '../../shared/context/LanguageContext';

interface Props {
  onCreate: () => void;
  onScan: () => void;
  onBack: () => void;
}

export function FriendChallengeScreen({ onCreate, onScan, onBack }: Props) {
  const { colors } = useTheme();
  const { S } = useLanguage();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const steps = [S.friendStep1, S.friendStep2, S.friendStep3, S.friendStep4];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{S.friendChallengeTitle}</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>🤝</Text>
          <Text style={styles.heroTitle}>{S.friendChallengeTitle}</Text>
        </View>

        <View style={styles.guideCard}>
          <Text style={styles.guideTitle}>{S.friendHowTitle}</Text>
          {steps.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>{S.classChallengeOrDivider}</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.createBtn} onPress={onCreate} activeOpacity={0.85}>
          <Text style={styles.createBtnIcon}>🎯</Text>
          <View style={styles.btnInfo}>
            <Text style={styles.createBtnTitle}>{S.friendCreate}</Text>
            <Text style={styles.createBtnSub}>{S.friendCreateSub}</Text>
          </View>
          <Text style={styles.chevron}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.scanBtn} onPress={onScan} activeOpacity={0.85}>
          <Text style={styles.createBtnIcon}>📷</Text>
          <View style={styles.btnInfo}>
            <Text style={styles.scanBtnTitle}>{S.friendScan}</Text>
            <Text style={styles.scanBtnSub}>{S.friendScanSub}</Text>
          </View>
          <Text style={[styles.chevron, { color: colors.accent }]}>→</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: spacing.lg, paddingTop: spacing.xl,
    backgroundColor: c.surface, borderBottomWidth: 1, borderBottomColor: c.border,
  },
  backBtn: { width: 40, padding: spacing.xs },
  backText: { fontSize: 22, color: c.primary },
  headerTitle: { fontSize: 17, fontWeight: '700', color: c.textPrimary },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 60 },
  heroSection: { alignItems: 'center', paddingVertical: spacing.xl, gap: spacing.sm },
  heroEmoji: { fontSize: 64 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: c.textPrimary, textAlign: 'center' },
  guideCard: {
    backgroundColor: c.surface, borderRadius: radius.xl, padding: spacing.lg,
    gap: spacing.md, ...shadow.card,
  },
  guideTitle: { fontSize: 15, fontWeight: '700', color: c.textPrimary, marginBottom: spacing.xs },
  stepRow: {
    backgroundColor: c.background, borderRadius: radius.md,
    padding: spacing.md, borderLeftWidth: 3, borderLeftColor: c.primary,
  },
  stepText: { fontSize: 14, color: c.textPrimary, lineHeight: 20 },
  dividerRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
  },
  divider: { flex: 1, height: 1, backgroundColor: c.border },
  dividerText: { fontSize: 12, color: c.textMuted, fontWeight: '600' },
  createBtn: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: c.primary, borderRadius: radius.xl,
    padding: spacing.lg, ...shadow.elevated,
  },
  scanBtn: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: c.surface, borderRadius: radius.xl,
    padding: spacing.lg, ...shadow.card,
    borderWidth: 2, borderColor: c.accent,
  },
  createBtnIcon: { fontSize: 32 },
  btnInfo: { flex: 1, gap: 2 },
  createBtnTitle: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
  createBtnSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  scanBtnTitle: { fontSize: 16, fontWeight: '800', color: c.textPrimary },
  scanBtnSub: { fontSize: 12, color: c.textSecondary },
  chevron: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
});
