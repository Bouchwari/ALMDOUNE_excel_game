import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { spacing, radius } from '../../theme/spacing';

interface Props {
  formula: string;
}

interface Token {
  text: string;
  type: 'equals' | 'fnName' | 'cellRef' | 'number' | 'string' | 'operator' | 'separator' | 'paren' | 'plain';
}

const CELL_REF = /^[A-Z]{1,2}\d+(:[A-Z]{1,2}\d+)?/;
const FN_NAME = /^[A-ZÀÂÉÈÊËÎÏÔÙÛÜ][A-ZÀÂÉÈÊËÎÏÔÙÛÜ0-9._]+(?=\()/i;
const NUMBER_RE = /^\d+(\.\d+)?(%)?/;
const STRING_RE = /^"[^"]*"/;
const OPERATOR_RE = /^[+\-*/^&<>=!]+/;
const SEPARATOR_RE = /^[;,]/;
const PAREN_RE = /^[()]/;

function tokenize(formula: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const src = formula;

  if (src[0] === '=') {
    tokens.push({ text: '=', type: 'equals' });
    i = 1;
  }

  while (i < src.length) {
    const rest = src.slice(i);

    let m: RegExpMatchArray | null;
    if ((m = rest.match(FN_NAME))) {
      tokens.push({ text: m[0], type: 'fnName' });
    } else if ((m = rest.match(CELL_REF))) {
      tokens.push({ text: m[0], type: 'cellRef' });
    } else if ((m = rest.match(NUMBER_RE))) {
      tokens.push({ text: m[0], type: 'number' });
    } else if ((m = rest.match(STRING_RE))) {
      tokens.push({ text: m[0], type: 'string' });
    } else if ((m = rest.match(SEPARATOR_RE))) {
      tokens.push({ text: m[0], type: 'separator' });
    } else if ((m = rest.match(OPERATOR_RE))) {
      tokens.push({ text: m[0], type: 'operator' });
    } else if ((m = rest.match(PAREN_RE))) {
      tokens.push({ text: m[0], type: 'paren' });
    } else {
      tokens.push({ text: rest[0], type: 'plain' });
      m = [rest[0]];
    }
    i += m[0].length;
  }
  return tokens;
}

const TOKEN_COLORS: Record<Token['type'], string> = {
  equals:    '#90A4AE',
  fnName:    '#64B5F6',
  cellRef:   '#FFB74D',
  number:    '#CE93D8',
  string:    '#A5D6A7',
  operator:  '#EF9A9A',
  separator: '#90A4AE',
  paren:     '#E0E0E0',
  plain:     '#CFD8DC',
};

export function FormulaBox({ formula }: Props) {
  const tokens = tokenize(formula);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.fx}>fx</Text>
        <View style={styles.divider} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
          <Text style={styles.formulaText}>
            {tokens.map((t, i) => (
              <Text key={i} style={{ color: TOKEN_COLORS[t.type], fontWeight: t.type === 'fnName' ? '700' : '400' }}>
                {t.text}
              </Text>
            ))}
          </Text>
        </ScrollView>
      </View>
      <View style={styles.legend}>
        {[
          { label: 'Fonction', color: TOKEN_COLORS.fnName },
          { label: 'Cellule', color: TOKEN_COLORS.cellRef },
          { label: 'Nombre', color: TOKEN_COLORS.number },
          { label: 'Texte', color: TOKEN_COLORS.string },
        ].map(({ label, color }) => (
          <View key={label} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: color }]} />
            <Text style={styles.legendLabel}>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A2E',
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  fx: {
    color: '#64B5F6',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  divider: {
    width: 1,
    height: 18,
    backgroundColor: '#37474F',
  },
  scrollRow: {
    flex: 1,
  },
  formulaText: {
    fontSize: 16,
    fontFamily: 'monospace',
    lineHeight: 24,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#263238',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    fontSize: 10,
    color: '#78909C',
  },
});
