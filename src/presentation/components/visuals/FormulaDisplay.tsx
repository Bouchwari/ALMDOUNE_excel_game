import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { spacing, radius } from '../../theme/spacing';
import { useTheme, type ColorPalette } from '../../../shared/context/ThemeContext';

const FR_TO_EN: Record<string, string> = {
  SOMME: 'SUM', MOYENNE: 'AVERAGE', SI: 'IF', NB: 'COUNT', 'NB.SI': 'COUNTIF',
  MAX: 'MAX', MIN: 'MIN', GAUCHE: 'LEFT', DROITE: 'RIGHT',
  MAJUSCULE: 'UPPER', MINUSCULE: 'LOWER', ARRONDI: 'ROUND', CONCATENER: 'CONCAT',
};

function translateFormula(formula: string, toEnglish: boolean): string {
  if (!toEnglish) return formula;
  return formula.replace(/[A-ZÀÂÉÈÊËÎÏÔÙÛÜ][A-ZÀÂÉÈÊËÎÏÔÙÛÜ0-9._]*/g, (match) => FR_TO_EN[match] ?? match);
}

interface Props {
  formula: string;
  label?: string;
  showToggle?: boolean;
}

// TODO (Google Play expansion): Restore language toggle when adding 'en' support
export function FormulaDisplay({ formula, label, showToggle = false }: Props) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const [overrideEn, setOverrideEn] = React.useState(false);

  const displayed = translateFormula(formula, overrideEn);
  const langTag = overrideEn ? 'EN' : 'FR';
  const langColor = overrideEn ? colors.accentBlue : colors.primary;

  return (
    <View style={styles.wrapper}>
      {label != null && <Text style={styles.label}>{label}</Text>}
      <View style={styles.box}>
        <Text style={styles.fx}>fx</Text>
        <View style={styles.divider} />
        <Text style={styles.formula} selectable>{displayed}</Text>
        {showToggle && (
          <TouchableOpacity
            style={[styles.toggleBtn, { backgroundColor: langColor }]}
            onPress={() => setOverrideEn(e => !e)}
          >
            <Text style={styles.toggleText}>{langTag}</Text>
          </TouchableOpacity>
        )}
      </View>
      {showToggle && (
        <Text style={styles.hint}>
          {overrideEn ? 'English formula mode' : 'Tap FR/EN to toggle formula language →'}
        </Text>
      )}
    </View>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  wrapper: { gap: spacing.xs },
  label: {
    fontSize: 11, fontWeight: '700', color: c.textMuted,
    textTransform: 'uppercase', letterSpacing: 0.5,
  },
  box: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A2E',
    borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.sm,
  },
  fx: { color: '#64B5F6', fontSize: 13, fontWeight: '700', fontFamily: 'monospace' },
  divider: { width: 1, height: 16, backgroundColor: '#37474F' },
  formula: { flex: 1, fontSize: 15, color: '#A5D6A7', fontFamily: 'monospace', letterSpacing: 0.5 },
  toggleBtn: { borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 3 },
  toggleText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
  hint: { fontSize: 11, color: c.textMuted, fontStyle: 'italic' },
});
