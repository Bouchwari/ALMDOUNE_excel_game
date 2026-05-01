import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AVATARS } from '../../shared/constants/gamification';
import { spacing, radius } from '../theme/spacing';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';

interface Props {
  selected: string;
  onSelect: (avatar: string) => void;
}

export function AvatarPicker({ selected, onSelect }: Props) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {AVATARS.map((avatar) => (
          <TouchableOpacity
            key={avatar}
            style={[styles.item, selected === avatar && styles.selected]}
            onPress={() => onSelect(avatar)}
            activeOpacity={0.7}
          >
            <Text style={styles.emoji}>{avatar}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { maxHeight: 200 },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.sm,
  },
  item: {
    width: 56, height: 56, borderRadius: radius.md,
    backgroundColor: c.background, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: c.transparent,
  },
  selected: { borderColor: c.accent, backgroundColor: c.splashBg },
  emoji: { fontSize: 28 },
});
