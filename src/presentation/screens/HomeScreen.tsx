import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated, Share } from 'react-native';
import { Student } from '../../domain/student/Student';
import { StudentProgress } from '../../domain/student/StudentProgress';
import { ModuleWithProgress } from '../../application/curriculum/GetModulesUseCase';
import { spacing, radius, shadow } from '../theme/spacing';
import { XPBar } from '../components/XPBar';
import { StreakCalendar } from '../components/StreakCalendar';
import { ModuleCard } from '../components/ModuleCard';
import { SkeletonModuleCard } from '../components/SkeletonCard';
import { LEVELS, BADGES } from '../../shared/constants/gamification';
import { useLanguage } from '../../shared/context/LanguageContext';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';

interface Props {
  student: Student;
  progress: StudentProgress | null;
  modules: ModuleWithProgress[];
  onModulePress: (moduleId: string) => void;
  onProfilePress: () => void;
  onDailyChallenge: () => void;
  onQuickQuiz: () => void;
  onFriendChallenge: () => void;
  recentBadge?: string | null;
  isChallengeAvailable: boolean;
}

function QuickActionBtn({ icon, label, color, onPress, disabled = false, accessibilityLabel }: {
  icon: string; label: string; color: string; onPress: () => void; disabled?: boolean; accessibilityLabel?: string;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  return (
    <Animated.View style={{ transform: [{ scale }], flex: 1, opacity: disabled ? 0.55 : 1 }}>
      <TouchableOpacity
        style={[staticStyles.quickBtn, { backgroundColor: color + '18', borderColor: color + '40' }]}
        onPress={onPress}
        onPressIn={() => !disabled && Animated.spring(scale, { toValue: 0.94, useNativeDriver: true, speed: 40, bounciness: 0 }).start()}
        onPressOut={() => !disabled && Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 5 }).start()}
        activeOpacity={disabled ? 1 : 0.8}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        <Text style={staticStyles.quickBtnIcon}>{icon}</Text>
        <Text style={[staticStyles.quickBtnLabel, { color }]}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const staticStyles = StyleSheet.create({
  quickBtn: {
    borderRadius: radius.lg, borderWidth: 1.5,
    padding: spacing.md, alignItems: 'center', gap: spacing.xs,
  },
  quickBtnIcon: { fontSize: 28 },
  quickBtnLabel: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
});

export function HomeScreen({
  student, progress, modules, onModulePress, onProfilePress,
  onDailyChallenge, onQuickQuiz, onFriendChallenge, recentBadge, isChallengeAvailable,
}: Props) {
  const { S } = useLanguage();
  const { colors } = useTheme();
  const sc = React.useMemo(() => makeStyles(colors), [colors]);

  const xp = progress?.xp ?? 0;
  const level = progress?.level ?? 1;
  const levelInfo = LEVELS.find(l => l.level === level) ?? LEVELS[0];

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const completedLessons = modules.reduce((s, m) =>
    s + (m.progressPercent > 0 ? Math.round((m.progressPercent / 100) * m.lessons.length) : 0), 0
  );

  const continueModule = modules.find(m => m.isUnlocked && m.progressPercent > 0 && m.progressPercent < 100);

  const handleShare = useCallback(async () => {
    const levelName = S.isRTL ? levelInfo.nameAr : levelInfo.name;
    const streakLine = student.streakDays > 0 ? `🔥 ${student.streakDays} ${S.streak}\n` : '';
    const message = [
      `🎓 ${student.name} – ExcelStar`,
      `${levelInfo.badge} ${levelName}  |  ${xp} XP`,
      `📚 ${completedLessons}/${totalLessons} leçons`,
      `🏆 ${progress?.badges.length ?? 0} badges`,
      streakLine,
      `━━━━━━━━━━━━`,
      `📊 Excel • الثانوية الإعدادية ألمدون`,
    ].filter(Boolean).join('\n');
    try { await Share.share({ message }); } catch (_) {}
  }, [student, progress, xp, completedLessons, totalLessons, levelInfo, S]);

  const renderModule = useCallback(({ item }: { item: ModuleWithProgress }) => (
    <ModuleCard module={item} onPress={() => onModulePress(item.id)} />
  ), [onModulePress]);

  const ListHeader = (
    <View>
      <View style={sc.header}>
        <View>
          <Text style={sc.greeting}>{S.greeting}</Text>
          <Text style={sc.appName}>ExcelStar ⭐</Text>
        </View>
        <TouchableOpacity
          style={sc.avatarBtn}
          onPress={onProfilePress}
          activeOpacity={0.8}
          accessibilityLabel={`${student.name} – Profile`}
          accessibilityRole="button"
        >
          <Text style={sc.avatarEmoji}>{student.avatar}</Text>
        </TouchableOpacity>
      </View>

      <View style={sc.profileCard}>
        <View style={sc.profileTop}>
          <Text style={sc.profileAvatar}>{student.avatar}</Text>
          <View style={sc.profileInfo}>
            <Text style={sc.profileName}>{student.name}</Text>
            <View style={sc.levelRow}>
              <Text style={sc.levelBadge}>{levelInfo.badge}</Text>
              <Text style={[sc.levelName, { color: levelInfo.color }]}>
                {S.isRTL ? levelInfo.nameAr : levelInfo.name}
              </Text>
            </View>
          </View>
          {student.streakDays > 0 && (
            <View style={sc.streakBadge}>
              <Text style={sc.streakEmoji}>🔥</Text>
              <Text style={sc.streakNum}>{student.streakDays}</Text>
              <Text style={sc.streakLabel}>{S.streak}</Text>
            </View>
          )}
        </View>
        <XPBar xp={xp} />
        <StreakCalendar activeDates={student.activeDates} />
        <TouchableOpacity style={sc.shareBtn} onPress={handleShare} activeOpacity={0.8}>
          <Text style={sc.shareBtnText}>{S.shareProgress}</Text>
        </TouchableOpacity>
      </View>

      {recentBadge != null && (() => {
        const badgeInfo = BADGES.find(b => b.id === recentBadge);
        return (
          <View style={sc.badgeBanner}>
            <Text style={sc.bannerEmoji}>{badgeInfo?.icon ?? '🏆'}</Text>
            <Text style={sc.bannerText}>
              {badgeInfo ? `${badgeInfo.name}! ${badgeInfo.desc}` : 'Badge jdid!'}
            </Text>
          </View>
        );
      })()}

      {continueModule != null && (
        <TouchableOpacity
          style={sc.continueCard}
          onPress={() => onModulePress(continueModule.id)}
          activeOpacity={0.85}
          accessibilityLabel={`${S.continueLabel} ${continueModule.titleFr} – ${Math.round(continueModule.progressPercent)}%`}
          accessibilityRole="button"
        >
          <View style={sc.continuePulse}>
            <Text style={sc.continueIcon}>▶</Text>
          </View>
          <View style={sc.continueInfo}>
            <Text style={sc.continueLabel}>{S.continueLabel}</Text>
            <Text style={sc.continueName} numberOfLines={1}>{continueModule.titleFr}</Text>
            <View style={sc.continueProgress}>
              <View style={[sc.continueBar, { width: `${continueModule.progressPercent}%` }]} />
            </View>
          </View>
          <Text style={sc.continuePct}>{Math.round(continueModule.progressPercent)}%</Text>
        </TouchableOpacity>
      )}

      <View style={sc.statsRow}>
        <View style={sc.statCard}>
          <Text style={sc.statNum}>{xp}</Text>
          <Text style={sc.statLabel}>XP</Text>
        </View>
        <View style={sc.statCard}>
          <Text style={sc.statNum}>{completedLessons}/{totalLessons}</Text>
          <Text style={sc.statLabel}>{S.tabModules}</Text>
        </View>
        <View style={sc.statCard}>
          <Text style={sc.statNum}>{progress?.badges.length ?? 0}</Text>
          <Text style={sc.statLabel}>{S.tabBadges}</Text>
        </View>
        <View style={sc.statCard}>
          <Text style={sc.statNum}>{level}</Text>
          <Text style={sc.statLabel}>{levelInfo.badge}</Text>
        </View>
      </View>

      <Text style={sc.sectionTitle}>{S.gamesTitle}</Text>
      <View style={sc.quickRow}>
        <QuickActionBtn
          icon={isChallengeAvailable ? '🔥' : '✅'}
          label={isChallengeAvailable ? S.dailyChallengeTitle : S.challengeDone}
          color={isChallengeAvailable ? colors.primary : colors.textMuted}
          onPress={isChallengeAvailable ? onDailyChallenge : () => {}}
          disabled={!isChallengeAvailable}
        />
        <QuickActionBtn icon="⚡" label={S.quickQuizTitle} color={colors.accentGold} onPress={onQuickQuiz} />
        <QuickActionBtn icon="🤝" label={S.friendChallengeTitle} color={colors.accent} onPress={onFriendChallenge} />
      </View>

      <Text style={[sc.sectionTitle, { marginTop: spacing.sm }]}>{S.myModules}</Text>
    </View>
  );

  const ListEmpty = (
    <View style={sc.skeletons}>
      <SkeletonModuleCard />
      <SkeletonModuleCard />
      <SkeletonModuleCard />
    </View>
  );

  const ListFooter = (
    <View style={sc.footer}>
      <Text style={sc.footerText}>الثانوية الإعدادية ألمدون</Text>
      <Text style={sc.footerSub}>Lycée Collégial Almdoun</Text>
    </View>
  );

  return (
    <FlatList
      style={sc.container}
      data={modules}
      renderItem={renderModule}
      keyExtractor={item => item.id}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={ListEmpty}
      ListFooterComponent={ListFooter}
      contentContainerStyle={sc.content}
      showsVerticalScrollIndicator={false}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={7}
      removeClippedSubviews
    />
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  content: { padding: spacing.lg, paddingBottom: 80 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.lg, paddingTop: spacing.lg,
  },
  greeting: { fontSize: 13, color: c.textSecondary },
  appName: { fontSize: 26, fontWeight: '800', color: c.primary },
  avatarBtn: {
    width: 46, height: 46, borderRadius: 23, backgroundColor: c.surface,
    alignItems: 'center', justifyContent: 'center', ...shadow.card,
  },
  avatarEmoji: { fontSize: 26 },
  profileCard: {
    backgroundColor: c.surface, borderRadius: radius.xl, padding: spacing.lg,
    gap: spacing.md, marginBottom: spacing.lg, ...shadow.card,
  },
  profileTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  profileAvatar: { fontSize: 44 },
  profileInfo: { flex: 1, gap: spacing.xs },
  profileName: { fontSize: 20, fontWeight: '700', color: c.textPrimary },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  levelBadge: { fontSize: 18 },
  levelName: { fontSize: 13, fontWeight: '600' },
  streakBadge: {
    alignItems: 'center', backgroundColor: '#FFF3E0',
    borderRadius: radius.md, padding: spacing.sm, minWidth: 52,
  },
  streakEmoji: { fontSize: 18 },
  streakNum: { fontSize: 16, fontWeight: '800', color: '#E65100' },
  streakLabel: { fontSize: 10, color: '#BF360C', fontWeight: '600' },
  badgeBanner: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF9C4',
    borderRadius: radius.md, padding: spacing.md, gap: spacing.sm,
    marginBottom: spacing.lg, borderLeftWidth: 4, borderLeftColor: c.accentGold,
  },
  bannerEmoji: { fontSize: 24 },
  bannerText: { fontSize: 14, fontWeight: '600', color: '#795548', flex: 1 },
  continueCard: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: c.primary, borderRadius: radius.xl,
    padding: spacing.md, marginBottom: spacing.lg, ...shadow.elevated,
  },
  continuePulse: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  continueIcon: { fontSize: 18, color: '#FFFFFF' },
  continueInfo: { flex: 1, gap: spacing.xs },
  continueLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: '600', textTransform: 'uppercase' },
  continueName: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  continueProgress: { height: 4, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2, overflow: 'hidden' },
  continueBar: { height: 4, backgroundColor: '#FFFFFF', borderRadius: 2 },
  continuePct: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  statsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
  statCard: {
    flex: 1, backgroundColor: c.surface, borderRadius: radius.md,
    padding: spacing.sm, alignItems: 'center', ...shadow.card,
  },
  statNum: { fontSize: 14, fontWeight: '800', color: c.primary, textAlign: 'center' },
  statLabel: { fontSize: 10, color: c.textMuted, textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: c.textPrimary, marginBottom: spacing.md },
  shareBtn: {
    alignSelf: 'flex-end', backgroundColor: c.primarySoft,
    borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
  },
  shareBtnText: { fontSize: 12, color: c.primary, fontWeight: '700' },
  quickRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
  skeletons: { gap: spacing.md },
  footer: { alignItems: 'center', paddingTop: spacing.xl, gap: spacing.xs },
  footerText: { fontSize: 12, color: c.textSecondary },
  footerSub: { fontSize: 11, color: c.accent },
});
