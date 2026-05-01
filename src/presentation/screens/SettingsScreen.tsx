import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch,
} from 'react-native';
import { AppSettings } from '../../domain/progress/ProgressRepository';
import { spacing, radius, shadow } from '../theme/spacing';
import { useLanguage } from '../../shared/context/LanguageContext';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { StudentGender } from '../../domain/student/Student';

interface Props {
  settings: AppSettings;
  onSettingChange: (key: keyof AppSettings, value: boolean | string) => void;
  onSwitchProfile: () => void;
  studentName: string;
  onGenderChange?: (g: StudentGender) => void;
}

export function SettingsScreen({ settings, onSettingChange, onSwitchProfile, studentName, onGenderChange }: Props) {
  const { S, gender, setGender } = useLanguage();
  const { colors, isDark, toggleTheme } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const handleGenderToggle = (g: StudentGender) => {
    setGender(g);
    onGenderChange?.(g);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>{S.settingsTitle}</Text>

      {/* Profile */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{S.settingsProfileSection}</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{S.settingsProfileLabel}</Text>
            <Text style={styles.rowValue}>{studentName}</Text>
          </View>
          <TouchableOpacity style={styles.btn} onPress={onSwitchProfile} activeOpacity={0.8}>
            <Text style={styles.btnText}>{S.settingsSwitchProfile}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Gender */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{S.settingsGenderSection}</Text>
        <View style={[styles.card, styles.genderRow]}>
          <TouchableOpacity
            style={[styles.genderBtn, gender === 'male' && styles.genderBtnActive]}
            onPress={() => handleGenderToggle('male')}
            activeOpacity={0.8}
          >
            <Text style={styles.genderEmoji}>👦</Text>
            <Text style={[styles.genderLabel, gender === 'male' && styles.genderLabelActive]}>{S.settingsMale}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderBtn, gender === 'female' && styles.genderBtnActiveFemale]}
            onPress={() => handleGenderToggle('female')}
            activeOpacity={0.8}
          >
            <Text style={styles.genderEmoji}>👧</Text>
            <Text style={[styles.genderLabel, gender === 'female' && styles.genderLabelActiveFemale]}>{S.settingsFemale}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Audio & Haptics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{S.settingsSoundSection}</Text>
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>{S.settingsSoundLabel}</Text>
            <Switch
              value={settings.soundEnabled}
              onValueChange={v => onSettingChange('soundEnabled', v)}
              trackColor={{ true: colors.primary, false: colors.border }}
              thumbColor={colors.white}
            />
          </View>
          <View style={[styles.switchRow, styles.borderTop]}>
            <Text style={styles.switchLabel}>{S.settingsVibration}</Text>
            <Switch
              value={settings.hapticsEnabled}
              onValueChange={v => onSettingChange('hapticsEnabled', v)}
              trackColor={{ true: colors.primary, false: colors.border }}
              thumbColor={colors.white}
            />
          </View>
          <View style={[styles.switchRow, styles.borderTop]}>
            <Text style={styles.switchLabel}>🔔 Notifications</Text>
            <Switch
              value={settings.notificationsEnabled}
              onValueChange={v => onSettingChange('notificationsEnabled', v)}
              trackColor={{ true: colors.primary, false: colors.border }}
              thumbColor={colors.white}
            />
          </View>
          <View style={[styles.switchRow, styles.borderTop]}>
            <Text style={styles.switchLabel}>{S.darkMode}</Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ true: colors.primary, false: colors.border }}
              thumbColor={colors.white}
            />
          </View>
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{S.settingsAboutSection}</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Version</Text>
            <Text style={styles.rowValue}>1.1.0</Text>
          </View>
          <View style={[styles.row, styles.borderTop]}>
            <Text style={styles.rowLabel}>{S.settingsSchool}</Text>
            <Text style={styles.rowValue}>Almdoun</Text>
          </View>
          <View style={[styles.row, styles.borderTop]}>
            <Text style={styles.rowLabel}>{S.settingsSubject}</Text>
            <Text style={styles.rowValue}>Informatique – Excel</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerAr}>الثانوية الإعدادية ألمدون</Text>
        <Text style={styles.footerFr}>Lycée Collégial Almdoun</Text>
      </View>
    </ScrollView>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  content: { padding: spacing.lg, paddingTop: spacing.xl, paddingBottom: 100, gap: spacing.xl },
  title: { fontSize: 26, fontWeight: '800', color: c.textPrimary },
  section: { gap: spacing.sm },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: c.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  card: { backgroundColor: c.surface, borderRadius: radius.lg, overflow: 'hidden', ...shadow.card },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md },
  rowLabel: { fontSize: 15, color: c.textPrimary },
  rowValue: { fontSize: 14, color: c.textSecondary, fontWeight: '600' },
  btn: {
    margin: spacing.md,
    marginTop: 0,
    backgroundColor: c.primarySoft,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  btnText: { color: c.primary, fontWeight: '700', fontSize: 14 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md },
  switchLabel: { fontSize: 15, color: c.textPrimary },
  borderTop: { borderTopWidth: 1, borderTopColor: c.border },
  genderRow: { flexDirection: 'row', gap: spacing.sm },
  genderBtn: {
    flex: 1, alignItems: 'center', padding: spacing.md, gap: spacing.xs,
    borderRadius: radius.md, borderWidth: 2, borderColor: c.border,
  },
  genderBtnActive: { borderColor: c.primary, backgroundColor: c.primary + '12' },
  genderBtnActiveFemale: { borderColor: c.accent, backgroundColor: c.accent + '12' },
  genderEmoji: { fontSize: 28 },
  genderLabel: { fontSize: 13, fontWeight: '700', color: c.textSecondary },
  genderLabelActive: { color: c.primary },
  genderLabelActiveFemale: { color: c.accent },
  footer: { alignItems: 'center', gap: spacing.xs, paddingTop: spacing.lg },
  footerAr: { fontSize: 13, color: c.textSecondary, fontWeight: '600' },
  footerFr: { fontSize: 12, color: c.accent },
});
