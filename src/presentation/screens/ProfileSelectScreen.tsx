import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { Student } from '../../domain/student/Student';
import { spacing, radius, shadow } from '../theme/spacing';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { useLanguage } from '../../shared/context/LanguageContext';

interface Props {
  students: Student[];
  onSelect: (studentId: string) => void;
  onCreateNew: () => void;
  onDelete: (studentId: string) => void;
}

export function ProfileSelectScreen({ students, onSelect, onCreateNew, onDelete }: Props) {
  const { colors } = useTheme();
  const { S } = useLanguage();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const [deleting, setDeleting] = useState<string | null>(null);

  const confirmDelete = (student: Student) => {
    Alert.alert(
      S.profileDeleteTitle,
      `${S.profileDeleteMsg.replace('؟', '')} "${student.name}"؟`,
      [
        { text: S.profileDeleteNo, style: 'cancel' },
        {
          text: S.profileDeleteYes,
          style: 'destructive',
          onPress: () => onDelete(student.id),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{S.profileWhoTitle}</Text>
      <Text style={styles.subtitle}>{S.profileChooseLabel}</Text>

      {students.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>👤</Text>
          <Text style={styles.emptyText}>ما كاين حتى بروفايل — دير واحد جديد!</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {students.map(student => (
          <TouchableOpacity
            key={student.id}
            style={styles.card}
            onPress={() => onSelect(student.id)}
            onLongPress={() => confirmDelete(student)}
            activeOpacity={0.75}
          >
            <Text style={styles.avatar}>{student.avatar}</Text>
            <Text style={styles.name} numberOfLines={1}>{student.name}</Text>
            <Text style={styles.hint}>{S.profileHoldHint}</Text>
          </TouchableOpacity>
        ))}

        {students.length < 10 && (
          <TouchableOpacity style={[styles.card, styles.newCard]} onPress={onCreateNew} activeOpacity={0.75}>
            <Text style={styles.plusIcon}>＋</Text>
            <Text style={styles.newText}>{S.profileNewBtn}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.schoolName}>الثانوية الإعدادية ألمدون</Text>
        <Text style={styles.schoolFr}>Lycée Collégial Almdoun</Text>
      </View>
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.splashBg, padding: spacing.xl },
  emptyState: { alignItems: 'center', paddingVertical: spacing.xxl, gap: spacing.md },
  emptyEmoji: { fontSize: 56 },
  emptyText: { fontSize: 15, color: c.textSecondary, textAlign: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: c.textPrimary, marginTop: spacing.xxxl },
  subtitle: { fontSize: 15, color: c.textSecondary, marginBottom: spacing.xl },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, paddingBottom: spacing.xl },
  card: {
    width: '45%', backgroundColor: c.surface, borderRadius: radius.lg,
    padding: spacing.lg, alignItems: 'center', gap: spacing.xs, ...shadow.card,
  },
  avatar: { fontSize: 44 },
  name: { fontSize: 15, fontWeight: '700', color: c.textPrimary, textAlign: 'center' },
  hint: { fontSize: 10, color: c.textMuted },
  newCard: {
    borderStyle: 'dashed', borderWidth: 2, borderColor: c.accent, backgroundColor: c.splashBg,
  },
  plusIcon: { fontSize: 36, color: c.accent },
  newText: { fontSize: 13, fontWeight: '600', color: c.accent },
  footer: { alignItems: 'center', paddingVertical: spacing.lg, gap: spacing.xs },
  schoolName: { fontSize: 13, color: c.textSecondary, fontWeight: '600' },
  schoolFr: { fontSize: 11, color: c.accent },
});
