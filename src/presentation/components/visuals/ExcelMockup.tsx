import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { spacing, radius } from '../../theme/spacing';
import { useTheme, type ColorPalette } from '../../../shared/context/ThemeContext';

interface CellData {
  value: string;
  isHeader?: boolean;
  isHighlighted?: boolean;
  isFormula?: boolean;
}

interface Props {
  raw?: string;
  rows?: CellData[][];
  formulaBar?: string;
  title?: string;
}

function parseRaw(raw: string): CellData[][] {
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
  return lines.map((line, rowIdx) =>
    line.split('|').map((cell, colIdx) => ({
      value: cell.trim(),
      isHeader: rowIdx === 0 || colIdx === 0,
      isFormula: cell.trim().startsWith('='),
    }))
  );
}

const COL_LETTERS = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export function ExcelMockup({ raw, rows: rowsProp, formulaBar, title }: Props) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const dataRows: CellData[][] = rowsProp ?? (raw ? parseRaw(raw) : []);
  const maxCols = Math.max(...dataRows.map(r => r.length), 0);
  const colCount = Math.min(maxCols, 8);

  const headerRow: CellData[] = [
    { value: '', isHeader: true },
    ...COL_LETTERS.slice(1, colCount + 1).map(l => ({ value: l, isHeader: true })),
  ];

  const displayRows: CellData[][] = [
    headerRow,
    ...dataRows.slice(0, 8).map((row, ri) => [
      { value: String(ri + 1), isHeader: true },
      ...row.slice(0, colCount),
    ]),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <View style={styles.titleDots}>
          <View style={[styles.dot, { backgroundColor: '#FF5F56' }]} />
          <View style={[styles.dot, { backgroundColor: '#FFBD2E' }]} />
          <View style={[styles.dot, { backgroundColor: '#27C93F' }]} />
        </View>
        <Text style={styles.titleText}>{title ?? 'Excel Mockup'}</Text>
      </View>

      {formulaBar != null && (
        <View style={styles.formulaBar}>
          <Text style={styles.fxLabel}>fx</Text>
          <View style={styles.formulaBarDivider} />
          <Text style={styles.formulaBarText} numberOfLines={1}>{formulaBar}</Text>
        </View>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {displayRows.map((row, ri) => (
            <View key={ri} style={styles.row}>
              {row.map((cell, ci) => (
                <View
                  key={ci}
                  style={[
                    styles.cell,
                    cell.isHeader && styles.cellHeader,
                    cell.isHighlighted && styles.cellHighlighted,
                    cell.isFormula && styles.cellFormula,
                    ri === 0 && styles.cellColumnHeader,
                    ci === 0 && styles.cellRowNum,
                  ]}
                >
                  <Text
                    style={[
                      styles.cellText,
                      cell.isHeader && styles.cellTextHeader,
                      cell.isFormula && styles.cellTextFormula,
                      cell.isHighlighted && styles.cellTextHighlighted,
                    ]}
                    numberOfLines={1}
                  >
                    {cell.value}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const CELL_W = 72;
const CELL_H = 26;
const ROW_NUM_W = 32;

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { borderRadius: radius.md, overflow: 'hidden', borderWidth: 1, borderColor: '#C0C0C0', backgroundColor: c.surface },
  titleBar: {
    backgroundColor: '#217346', flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.sm, paddingVertical: 6, gap: spacing.sm,
  },
  titleDots: { flexDirection: 'row', gap: 4 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  titleText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600', flex: 1, textAlign: 'center', marginRight: 24 },
  formulaBar: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0',
    borderBottomWidth: 1, borderBottomColor: '#C0C0C0', paddingHorizontal: spacing.sm, height: 28, gap: spacing.sm,
  },
  fxLabel: { fontSize: 13, color: '#666', fontStyle: 'italic', width: 18, textAlign: 'center' },
  formulaBarDivider: { width: 1, height: 16, backgroundColor: '#C0C0C0' },
  formulaBarText: { fontSize: 12, color: '#1A1A2E', fontFamily: 'monospace', flex: 1 },
  row: { flexDirection: 'row' },
  cell: {
    width: CELL_W, height: CELL_H, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#D0D0D0',
    justifyContent: 'center', paddingHorizontal: 4, backgroundColor: c.surface,
  },
  cellHeader: { backgroundColor: '#F2F2F2' },
  cellColumnHeader: { backgroundColor: '#DEDEDE' },
  cellRowNum: { width: ROW_NUM_W, backgroundColor: '#DEDEDE' },
  cellHighlighted: { backgroundColor: '#C6EFCE' },
  cellFormula: { backgroundColor: '#EBF3FF' },
  cellText: { fontSize: 11, color: '#1A1A2E' },
  cellTextHeader: { fontWeight: '700', color: '#444', textAlign: 'center' },
  cellTextFormula: { color: '#217346', fontFamily: 'monospace' },
  cellTextHighlighted: { color: '#375623', fontWeight: '600' },
});
