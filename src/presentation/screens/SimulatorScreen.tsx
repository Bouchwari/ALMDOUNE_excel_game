import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions,
} from 'react-native';
import { spacing, radius } from '../theme/spacing';
import { useLanguage } from '../../shared/context/LanguageContext';
import { useTheme } from '../../shared/context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ROWS = 20;
const COLS = 8;
const COL_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const { width: SCREEN_W } = Dimensions.get('window');
const CELL_W = Math.max(72, (SCREEN_W - 40) / 6);
const CELL_H = 36;
const ROW_HEADER_W = 32;

type Grid = string[][];

function createEmptyGrid(): Grid {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(''));
}

function parseRange(range: string, grid: Grid): number[] {
  // Handles A1:A5 or A1,B2,C3
  const nums: number[] = [];
  const rangeMatch = range.match(/^([A-H])(\d+):([A-H])(\d+)$/i);
  if (rangeMatch) {
    const c1 = rangeMatch[1].toUpperCase().charCodeAt(0) - 65;
    const r1 = parseInt(rangeMatch[2]) - 1;
    const c2 = rangeMatch[3].toUpperCase().charCodeAt(0) - 65;
    const r2 = parseInt(rangeMatch[4]) - 1;
    for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) {
      for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) {
        const v = parseFloat(grid[r]?.[c] ?? '');
        if (!isNaN(v)) nums.push(v);
      }
    }
    return nums;
  }
  // Comma-separated
  return range.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
}

function substituteCellRefs(expr: string, grid: Grid): string {
  return expr.replace(/([A-H])(\d+)/gi, (_, col, row) => {
    const c = col.toUpperCase().charCodeAt(0) - 65;
    const r = parseInt(row) - 1;
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return '0';
    const val = grid[r]?.[c] ?? '';
    return val === '' ? '0' : isNaN(Number(val)) ? `"${val}"` : val;
  });
}

function evaluateFormula(formula: string, grid: Grid, lang: string): string {
  if (!formula.startsWith('=')) return formula;
  const raw = formula.slice(1).trim();
  const upper = raw.toUpperCase();

  // SOMME / SUM
  const sumRe = /^(?:SOMME|SUM)\((.+)\)$/i;
  const sumM = upper.match(sumRe);
  if (sumM) {
    const nums = parseRange(substituteCellRefs(sumM[1], grid), grid);
    // Re-parse after substitution
    const subst = substituteCellRefs(sumM[1], grid);
    const vals = parseRange(subst, grid);
    if (vals.length) return String(vals.reduce((a, b) => a + b, 0));
    const nums2 = parseRange(sumM[1], grid);
    return String(nums2.reduce((a, b) => a + b, 0));
  }

  // MOYENNE / AVERAGE
  const avgRe = /^(?:MOYENNE|AVERAGE)\((.+)\)$/i;
  const avgM = upper.match(avgRe);
  if (avgM) {
    const subst = substituteCellRefs(avgM[1], grid);
    const vals = parseRange(subst, grid);
    if (!vals.length) return '#DIV/0!';
    return String((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2));
  }

  // MAX
  const maxM = upper.match(/^MAX\((.+)\)$/i);
  if (maxM) {
    const vals = parseRange(substituteCellRefs(maxM[1], grid), grid);
    return vals.length ? String(Math.max(...vals)) : '#VIDE!';
  }

  // MIN
  const minM = upper.match(/^MIN\((.+)\)$/i);
  if (minM) {
    const vals = parseRange(substituteCellRefs(minM[1], grid), grid);
    return vals.length ? String(Math.min(...vals)) : '#VIDE!';
  }

  // NB / COUNT
  const nbM = upper.match(/^(?:NB|COUNT)\((.+)\)$/i);
  if (nbM) {
    const subst = substituteCellRefs(nbM[1], grid);
    const vals = parseRange(subst, grid);
    return String(vals.length);
  }

  // NB.SI / COUNTIF – NB.SI(range,"criteria")
  const nbsiM = raw.match(/^(?:NB\.SI|COUNTIF)\(([^,]+),(.+)\)$/i);
  if (nbsiM) {
    const subst = substituteCellRefs(nbsiM[1].trim(), grid);
    const vals = parseRange(subst, grid);
    const criteria = nbsiM[2].trim().replace(/"/g, '');
    const numCriteria = parseFloat(criteria);
    if (!isNaN(numCriteria)) return String(vals.filter(v => v === numCriteria).length);
    return String(vals.length); // simplified
  }

  // GAUCHE / LEFT
  const leftM = raw.match(/^(?:GAUCHE|LEFT)\(([^,]+),?(\d*)\)$/i);
  if (leftM) {
    const cellVal = substituteCellRefs(leftM[1].trim(), grid).replace(/"/g, '');
    const n = leftM[2] ? parseInt(leftM[2]) : 1;
    return cellVal.slice(0, n);
  }

  // DROITE / RIGHT
  const rightM = raw.match(/^(?:DROITE|RIGHT)\(([^,]+),?(\d*)\)$/i);
  if (rightM) {
    const cellVal = substituteCellRefs(rightM[1].trim(), grid).replace(/"/g, '');
    const n = rightM[2] ? parseInt(rightM[2]) : 1;
    return cellVal.slice(-n);
  }

  // MAJUSCULE / UPPER
  const upperM = raw.match(/^(?:MAJUSCULE|UPPER)\((.+)\)$/i);
  if (upperM) {
    const cellVal = substituteCellRefs(upperM[1].trim(), grid).replace(/"/g, '');
    return cellVal.toUpperCase();
  }

  // MINUSCULE / LOWER
  const lowerM = raw.match(/^(?:MINUSCULE|LOWER)\((.+)\)$/i);
  if (lowerM) {
    const cellVal = substituteCellRefs(lowerM[1].trim(), grid).replace(/"/g, '');
    return cellVal.toLowerCase();
  }

  // CONCATENER / CONCAT / &
  const concatM = raw.match(/^(?:CONCATENER|CONCAT|CONCATENATE)\((.+)\)$/i);
  if (concatM) {
    const parts = concatM[1].split(',').map(p => {
      const s = substituteCellRefs(p.trim(), grid).replace(/"/g, '');
      return s;
    });
    return parts.join('');
  }

  // ARRONDI / ROUND
  const roundM = raw.match(/^(?:ARRONDI|ROUND)\(([^,]+),(\d+)\)$/i);
  if (roundM) {
    const val = parseFloat(substituteCellRefs(roundM[1].trim(), grid));
    const dec = parseInt(roundM[2]);
    return isNaN(val) ? '#ERREUR!' : String(Number(val.toFixed(dec)));
  }

  // SI / IF
  const siM = raw.match(/^(?:SI|IF)\((.+?),(.+?),(.+?)\)$/i);
  if (siM) {
    try {
      const cond = substituteCellRefs(siM[1].trim(), grid);
      const trueVal = siM[2].trim().replace(/"/g, '');
      const falseVal = siM[3].trim().replace(/"/g, '');
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${cond});`)();
      return result ? trueVal : falseVal;
    } catch {
      return '#ERREUR!';
    }
  }

  // Basic arithmetic after cell substitution
  try {
    const expr = substituteCellRefs(raw, grid);
    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${expr});`)();
    if (typeof result === 'number') return String(Number(result.toFixed(6)).toString());
    return String(result);
  } catch {
    return '#ERREUR!';
  }
}

export function SimulatorScreen() {
  const { S } = useLanguage();
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();
  const [grid, setGrid] = useState<Grid>(createEmptyGrid());
  const [displayGrid, setDisplayGrid] = useState<Grid>(createEmptyGrid());
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null);
  const [formulaBar, setFormulaBar] = useState('');
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null);

  const selectCell = (r: number, c: number) => {
    setSelected({ r, c });
    setFormulaBar(grid[r][c]);
    setFeedback(null);
  };

  const applyFormula = () => {
    if (!selected) return;
    const { r, c } = selected;
    const newGrid = grid.map(row => [...row]);
    newGrid[r][c] = formulaBar;

    const newDisplay = newGrid.map((row, ri) =>
      row.map((cell, ci) => {
        if (cell.startsWith('=')) return evaluateFormula(cell, newGrid, 'fr');
        return cell;
      }),
    );

    setGrid(newGrid);
    setDisplayGrid(newDisplay);

    if (formulaBar.startsWith('=')) {
      const result = evaluateFormula(formulaBar, newGrid, 'fr');
      setFeedback(
        result.startsWith('#')
          ? { msg: `${S.simulatorHint} – ${result}`, ok: false }
          : { msg: `✅ = ${result}`, ok: true },
      );
    } else {
      setFeedback(null);
    }
  };

  const clearAll = () => {
    setGrid(createEmptyGrid());
    setDisplayGrid(createEmptyGrid());
    setSelected(null);
    setFormulaBar('');
    setFeedback(null);
  };

  const cellName = selected ? `${COL_LETTERS[selected.c]}${selected.r + 1}` : '';

  const QUICK_FORMULAS = [
    `=${S.fnSum}(A1:A5)`,
    `=${S.fnAvg}(A1:A5)`,
    `=${S.fnMax}(A1:A5)`,
    `=${S.fnMin}(A1:A5)`,
    `=${S.fnIf}(A1>10,"Reçu","Échoué")`,
    `=${S.fnCount}(A1:A10)`,
    `=${S.fnLeft}(A1,3)`,
    `=${S.fnUpper}(A1)`,
  ];

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      {/* Title bar */}
      <View style={styles.titleBar}>
        <Text style={styles.titleText}>{S.simulatorTitle}</Text>
        <TouchableOpacity onPress={clearAll} style={styles.clearBtn}>
          <Text style={styles.clearText}>🗑️ Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Formula bar */}
      <View style={styles.fxBar}>
        <View style={styles.fxLeft}>
          <Text style={styles.cellRef}>{cellName || '—'}</Text>
        </View>
        <Text style={styles.fxIcon}>fx</Text>
        <TextInput
          style={styles.fxInput}
          value={formulaBar}
          onChangeText={setFormulaBar}
          placeholder={selected ? `=${S.fnSum}(A1:A5)` : S.simulatorHint}
          placeholderTextColor={colors.textMuted}
          editable={!!selected}
          autoCapitalize="characters"
          autoCorrect={false}
          onSubmitEditing={applyFormula}
        />
        <TouchableOpacity
          style={[styles.fxApply, !selected && styles.fxApplyOff]}
          onPress={applyFormula}
          disabled={!selected}
        >
          <Text style={styles.fxApplyText}>✓</Text>
        </TouchableOpacity>
      </View>

      {/* Feedback */}
      {feedback && (
        <View style={[styles.feedbackBar, feedback.ok ? styles.fbOk : styles.fbErr]}>
          <Text style={styles.fbText}>{feedback.msg}</Text>
        </View>
      )}

      {/* Grid */}
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <ScrollView showsVerticalScrollIndicator={true} style={styles.gridScroll}>
          <View>
            {/* Column header row */}
            <View style={styles.row}>
              <View style={[styles.cell, styles.corner]} />
              {COL_LETTERS.map(h => (
                <View key={h} style={[styles.cell, styles.colHeader]}>
                  <Text style={styles.headerTxt}>{h}</Text>
                </View>
              ))}
            </View>
            {/* Data rows */}
            {Array.from({ length: ROWS }, (_, r) => (
              <View key={r} style={styles.row}>
                <View style={[styles.cell, styles.rowHeader]}>
                  <Text style={styles.headerTxt}>{r + 1}</Text>
                </View>
                {Array.from({ length: COLS }, (_, c) => {
                  const isSel = selected?.r === r && selected?.c === c;
                  return (
                    <TouchableOpacity
                      key={c}
                      style={[styles.cell, isSel && styles.selCell]}
                      onPress={() => selectCell(r, c)}
                      activeOpacity={0.6}
                    >
                      <Text style={[styles.cellTxt, isSel && styles.selTxt]} numberOfLines={1}>
                        {displayGrid[r]?.[c] ?? ''}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>

      {/* Quick formula chips */}
      <View style={styles.quickBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickRow}>
          {QUICK_FORMULAS.map(f => (
            <TouchableOpacity key={f} style={styles.chip} onPress={() => setFormulaBar(f)}>
              <Text style={styles.chipTxt}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  titleBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#217346', padding: spacing.md, paddingTop: spacing.xl,
  },
  titleText: { fontSize: 17, fontWeight: '800', color: '#fff' },
  clearBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: radius.sm,
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
  },
  clearText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  fxBar: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#BDBDBD',
    paddingHorizontal: spacing.xs,
  },
  fxLeft: {
    width: 44, alignItems: 'center', justifyContent: 'center',
    borderRightWidth: 1, borderRightColor: '#BDBDBD', height: 36,
  },
  cellRef: { fontSize: 11, fontWeight: '700', color: '#1565C0' },
  fxIcon: {
    fontSize: 13, fontWeight: '700', color: '#1565C0',
    paddingHorizontal: spacing.sm,
  },
  fxInput: {
    flex: 1, height: 36, fontSize: 13, color: '#212121',
    fontFamily: 'monospace',
  },
  fxApply: {
    width: 32, height: 32, backgroundColor: '#217346',
    borderRadius: 4, alignItems: 'center', justifyContent: 'center', margin: 2,
  },
  fxApplyOff: { backgroundColor: '#BDBDBD' },
  fxApplyText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  feedbackBar: { padding: spacing.xs, paddingHorizontal: spacing.md },
  fbOk: { backgroundColor: '#C8E6C9' },
  fbErr: { backgroundColor: '#FFCDD2' },
  fbText: { fontSize: 12, fontWeight: '600', color: '#212121' },
  gridScroll: { maxHeight: '100%' },
  row: { flexDirection: 'row' },
  cell: {
    width: CELL_W, height: CELL_H,
    borderWidth: 0.5, borderColor: '#BDBDBD',
    backgroundColor: '#fff', justifyContent: 'center', paddingHorizontal: 3,
  },
  corner: { width: ROW_HEADER_W, backgroundColor: '#E3F2FD' },
  colHeader: { width: CELL_W, backgroundColor: '#E3F2FD', alignItems: 'center' },
  rowHeader: { width: ROW_HEADER_W, backgroundColor: '#E3F2FD', alignItems: 'center' },
  headerTxt: { fontSize: 11, fontWeight: '700', color: '#1565C0' },
  selCell: { backgroundColor: '#E8F5E9', borderColor: '#217346', borderWidth: 2 },
  cellTxt: { fontSize: 12, color: '#212121' },
  selTxt: { color: '#217346', fontWeight: '600' },
  quickBar: {
    backgroundColor: '#1A1A2E',
    borderTopWidth: 1, borderTopColor: '#333',
    padding: spacing.xs,
  },
  quickRow: { gap: spacing.sm, paddingHorizontal: spacing.xs },
  chip: {
    backgroundColor: '#2D2D44', borderRadius: radius.sm,
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
    borderWidth: 1, borderColor: '#3D3D5C',
  },
  chipTxt: { color: '#A5D6A7', fontFamily: 'monospace', fontSize: 11 },
});
