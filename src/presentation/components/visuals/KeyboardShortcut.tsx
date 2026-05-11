import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, radius } from '../../theme/spacing';
import { useTheme, type ColorPalette } from '../../../shared/context/ThemeContext';

interface Props {
  shortcut: string;
  description?: string;
}

function parseKeys(shortcut: string): string[] {
  return shortcut.split('+').map(k => k.trim()).filter(Boolean);
}

export function KeyboardShortcut({ shortcut, description }: Props) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const keys = parseKeys(shortcut);

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {keys.map((key, i) => (
          <React.Fragment key={i}>
            <View style={styles.key}>
              <View style={styles.keyInner}>
                <Text style={styles.keyText}>{key}</Text>
              </View>
            </View>
            {i < keys.length - 1 && <Text style={styles.plus}>+</Text>}
          </React.Fragment>
        ))}
      </View>
      {description != null && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  wrapper: { alignItems: 'center', gap: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  key: {
    backgroundColor: '#455A64', borderRadius: radius.sm,
    borderBottomWidth: 3, borderBottomColor: '#263238',
    borderRightWidth: 2, borderRightColor: '#263238', overflow: 'hidden',
  },
  keyInner: {
    backgroundColor: '#607D8B', paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs, minWidth: 36, alignItems: 'center',
  },
  keyText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', fontFamily: 'monospace' },
  plus: { color: c.textMuted, fontSize: 16, fontWeight: '700' },
  description: { fontSize: 13, color: c.textSecondary, textAlign: 'center' },
});
