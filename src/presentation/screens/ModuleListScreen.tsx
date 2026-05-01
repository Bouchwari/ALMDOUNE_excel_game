import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { spacing, radius, shadow } from '../theme/spacing';
import { ModuleCard } from '../components/ModuleCard';
import { SkeletonModuleCard } from '../components/SkeletonCard';
import { ModuleWithProgress } from '../../application/curriculum/GetModulesUseCase';
import { Lesson } from '../../domain/curriculum/Lesson';
import { LessonResult } from '../../domain/progress/LessonResult';
import { useLanguage } from '../../shared/context/LanguageContext';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';

interface Props {
  modules: ModuleWithProgress[];
  onModulePress: (moduleId: string) => void;
  selectedModuleId?: string | null;
  lessons?: Lesson[];
  lessonResults?: LessonResult[];
  onLessonPress?: (moduleId: string, lessonId: string) => void;
  onBack?: () => void;
}

interface LessonRowProps {
  lesson: Lesson;
  index: number;
  moduleId: string;
  result?: LessonResult;
  onPress: (moduleId: string, lessonId: string) => void;
  styles: ReturnType<typeof makeStyles>;
}

const LessonRow = React.memo(function LessonRow({ lesson, index, moduleId, result, onPress, styles }: LessonRowProps) {
  const stars = result?.stars ?? 0;
  const done = (result?.score ?? 0) >= 50;

  return (
    <TouchableOpacity
      style={[styles.lessonCard, done && styles.lessonDone]}
      onPress={() => onPress(moduleId, lesson.id)}
      activeOpacity={0.75}
    >
      <View style={[styles.lessonNum, done && styles.lessonNumDone]}>
        <Text style={styles.lessonNumText}>{done ? '✓' : index + 1}</Text>
      </View>
      <View style={styles.lessonInfo}>
        <Text style={styles.lessonTitle}>{lesson.titleFr}</Text>
        <Text style={styles.lessonDarija}>{lesson.titleDarija}</Text>
        {lesson.isMiniGame && <Text style={styles.miniTag}>🎮 Mini-Jeu</Text>}
      </View>
      <View style={styles.lessonStars}>
        {[1, 2, 3].map(s => (
          <Text key={s} style={{ fontSize: 14, opacity: s <= stars ? 1 : 0.2 }}>⭐</Text>
        ))}
      </View>
    </TouchableOpacity>
  );
});

const ModuleItem = React.memo(function ModuleItem({ item, onPress }: { item: ModuleWithProgress; onPress: (id: string) => void }) {
  return <ModuleCard module={item} onPress={() => onPress(item.id)} />;
});

export function ModuleListScreen({
  modules, onModulePress, selectedModuleId, lessons, lessonResults, onLessonPress, onBack,
}: Props) {
  const { S } = useLanguage();
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const [query, setQuery] = useState('');

  const renderModule = useCallback(({ item }: { item: ModuleWithProgress }) => (
    <ModuleItem item={item} onPress={onModulePress} />
  ), [onModulePress]);

  const keyExtractor = useCallback((item: { id: string }) => item.id, []);

  if (selectedModuleId && lessons) {
    const mod = modules.find(m => m.id === selectedModuleId);

    const renderLesson = ({ item, index }: { item: Lesson; index: number }) => {
      const result = lessonResults?.find(r => r.lessonId === item.id);
      return (
        <LessonRow
          lesson={item} index={index} moduleId={selectedModuleId}
          result={result} onPress={onLessonPress ?? (() => {})} styles={styles}
        />
      );
    };

    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backText}>{S.back}</Text>
          </TouchableOpacity>
          <View style={styles.subHeaderCenter}>
            <Text style={styles.modTitle} numberOfLines={1}>{mod?.titleFr}</Text>
            <Text style={styles.modSub}>{mod?.titleDarija}</Text>
          </View>
          <View style={[styles.modBadge, { backgroundColor: mod?.color + '22' }]}>
            <Text style={styles.modBadgeText}>{mod?.icon}</Text>
          </View>
        </View>

        <FlatList
          data={lessons}
          renderItem={renderLesson}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.lessonList}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
        />
      </View>
    );
  }

  const q = query.trim().toLowerCase();
  const filtered = q
    ? modules.filter(m =>
        m.titleFr.toLowerCase().includes(q) ||
        m.titleDarija.toLowerCase().includes(q) ||
        (m.descriptionDarija ?? '').toLowerCase().includes(q)
      )
    : modules;

  const ListHeader = (
    <View style={styles.listHeader}>
      <Text style={styles.title}>{S.tabModules} 📚</Text>
      <Text style={styles.subtitle}>{S.modulesSubtitle}</Text>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder={S.searchModules}
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const ListEmpty = q ? (
    <View style={styles.noResults}>
      <Text style={styles.noResultsEmoji}>🔍</Text>
      <Text style={styles.noResultsText}>Ma lqina walu l "{query}"</Text>
    </View>
  ) : (
    <View style={styles.emptyList}>
      {[1, 2, 3].map(i => <SkeletonModuleCard key={i} />)}
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={filtered}
      renderItem={renderModule}
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={ListEmpty}
      contentContainerStyle={styles.content}
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
  content: { padding: spacing.lg, paddingBottom: 100 },
  listHeader: { paddingTop: spacing.xl, marginBottom: spacing.lg, gap: spacing.sm },
  title: { fontSize: 24, fontWeight: '800', color: c.textPrimary, marginBottom: spacing.xs },
  subtitle: { fontSize: 13, color: c.textSecondary },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  searchInput: {
    flex: 1, backgroundColor: c.surface, borderRadius: radius.pill,
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    fontSize: 14, color: c.textPrimary, borderWidth: 1.5, borderColor: c.border,
    ...shadow.card,
  },
  clearBtn: { padding: spacing.xs },
  clearBtnText: { fontSize: 14, color: c.textMuted, fontWeight: '700' },
  emptyList: { gap: spacing.md },
  noResults: { alignItems: 'center', gap: spacing.md, paddingTop: spacing.xl },
  noResultsEmoji: { fontSize: 48 },
  noResultsText: { fontSize: 15, color: c.textSecondary, textAlign: 'center' },
  subHeader: {
    flexDirection: 'row', alignItems: 'center', padding: spacing.lg, paddingTop: spacing.xl,
    gap: spacing.md, backgroundColor: c.surface, borderBottomWidth: 1, borderBottomColor: c.border,
  },
  backBtn: { padding: spacing.xs },
  backText: { fontSize: 15, color: c.primary, fontWeight: '600' },
  subHeaderCenter: { flex: 1 },
  modTitle: { fontSize: 17, fontWeight: '700', color: c.textPrimary },
  modSub: { fontSize: 12, color: c.textSecondary },
  modBadge: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  modBadgeText: { fontSize: 18 },
  lessonList: { padding: spacing.lg, gap: spacing.md, paddingBottom: 100 },
  lessonCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface,
    borderRadius: radius.lg, padding: spacing.md, gap: spacing.md, ...shadow.card,
  },
  lessonDone: { borderLeftWidth: 4, borderLeftColor: c.success },
  lessonNum: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: c.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  lessonNumDone: { backgroundColor: c.success },
  lessonNumText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  lessonInfo: { flex: 1, gap: 2 },
  lessonTitle: { fontSize: 14, fontWeight: '600', color: c.textPrimary },
  lessonDarija: { fontSize: 12, color: c.textSecondary },
  miniTag: { fontSize: 11, color: c.accent, fontWeight: '600' },
  lessonStars: { flexDirection: 'row', gap: 2 },
});
