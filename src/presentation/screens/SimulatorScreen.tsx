import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TextInput, Pressable, ScrollView, Dimensions,
  KeyboardAvoidingView, Platform, LayoutChangeEvent,
} from 'react-native';
import { spacing, radius } from '../theme/spacing';
import { useLanguage } from '../../shared/context/LanguageContext';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ROWS = 20;
const COLS = 8;
const COL_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const { width: SCREEN_W } = Dimensions.get('window');
const ROW_HEADER_W = 32;
// Show 5 columns comfortably; remaining scroll horizontally
const CELL_W = Math.floor((SCREEN_W - ROW_HEADER_W) / 5);
const CELL_H = 34;

type Grid = string[][];

function createEmptyGrid(): Grid {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(''));
}

function parseRange(range: string, grid: Grid): number[] {
  const rangeMatch = range.trim().match(/^([A-H])(\d+):([A-H])(\d+)$/i);
  if (rangeMatch) {
    const c1 = rangeMatch[1].toUpperCase().charCodeAt(0) - 65;
    const r1 = parseInt(rangeMatch[2]) - 1;
    const c2 = rangeMatch[3].toUpperCase().charCodeAt(0) - 65;
    const r2 = parseInt(rangeMatch[4]) - 1;
    const nums: number[] = [];
    for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) {
      for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) {
        const v = parseFloat(grid[r]?.[c] ?? '');
        if (!isNaN(v)) nums.push(v);
      }
    }
    return nums;
  }
  // Comma-separated literals or already-substituted values
  return range.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
}

// Returns raw string values for every cell in a range (used by NBVAL, NB.SI, SOMME.SI)
function getCellsRaw(rangeStr: string, grid: Grid): string[] {
  const rangeMatch = rangeStr.trim().match(/^([A-H])(\d+):([A-H])(\d+)$/i);
  if (rangeMatch) {
    const c1 = rangeMatch[1].toUpperCase().charCodeAt(0) - 65;
    const r1 = parseInt(rangeMatch[2]) - 1;
    const c2 = rangeMatch[3].toUpperCase().charCodeAt(0) - 65;
    const r2 = parseInt(rangeMatch[4]) - 1;
    const cells: string[] = [];
    for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) {
      for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) {
        cells.push(grid[r]?.[c] ?? '');
      }
    }
    return cells;
  }
  return rangeStr.split(',').map(ref => {
    const m = ref.trim().match(/^([A-H])(\d+)$/i);
    if (m) {
      const c = m[1].toUpperCase().charCodeAt(0) - 65;
      const r = parseInt(m[2]) - 1;
      return grid[r]?.[c] ?? '';
    }
    return ref.trim().replace(/"/g, '');
  });
}

// Try direct range lookup first; fall back to substituted literals
function getRangeValues(arg: string, grid: Grid): number[] {
  const direct = parseRange(arg, grid);
  if (direct.length > 0) return direct;
  return parseRange(substituteCellRefs(arg, grid), grid);
}

function matchCriteria(val: string, criteria: string): boolean {
  const c = criteria.trim().replace(/^"(.*)"$/, '$1');
  const opM = c.match(/^(>=|<=|<>|>|<|=)(.+)$/);
  if (opM) {
    const [, op, rhs] = opM;
    const numVal = parseFloat(val);
    const numRhs = parseFloat(rhs);
    if (!isNaN(numVal) && !isNaN(numRhs)) {
      if (op === '>') return numVal > numRhs;
      if (op === '<') return numVal < numRhs;
      if (op === '>=') return numVal >= numRhs;
      if (op === '<=') return numVal <= numRhs;
      if (op === '<>') return numVal !== numRhs;
      if (op === '=') return numVal === numRhs;
    }
    if (op === '<>') return val !== rhs;
    if (op === '=') return val === rhs;
  }
  const numC = parseFloat(c);
  return !isNaN(numC) ? parseFloat(val) === numC : val === c;
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

function tokenize(expr: string): string[] {
  const toks: string[] = [];
  let i = 0;
  while (i < expr.length) {
    if (expr[i] === ' ') { i++; continue; }
    if (expr[i] === '"') {
      let j = i + 1;
      while (j < expr.length && expr[j] !== '"') j++;
      toks.push(expr.slice(i, j + 1));
      i = j + 1;
      continue;
    }
    const two = expr.slice(i, i + 2);
    if (two === '>=' || two === '<=' || two === '<>') { toks.push(two); i += 2; continue; }
    if ('+-*/()><=%'.includes(expr[i])) { toks.push(expr[i]); i++; continue; }
    let j = i;
    while (j < expr.length && !' +-*/()><=%"'.includes(expr[j])) j++;
    if (j > i) toks.push(expr.slice(i, j));
    i = Math.max(i + 1, j);
  }
  return toks;
}

function safeEval(expr: string): number | string | boolean {
  const toks = tokenize(expr.trim());
  let pos = 0;
  const peek = () => toks[pos];
  const consume = () => toks[pos++];

  function parsePrimary(): number | string {
    const tok = peek();
    if (tok === '(') { consume(); const v = parseAddSub(); consume(); return v; }
    if (!tok) return 0;
    consume();
    if (tok.startsWith('"')) return tok.slice(1, -1);
    const n = parseFloat(tok);
    return isNaN(n) ? 0 : n;
  }

  function parseUnary(): number | string {
    if (peek() === '-') { consume(); return -(parsePrimary() as number); }
    if (peek() === '+') { consume(); return parsePrimary() as number; }
    return parsePrimary();
  }

  function parseMulDiv(): number | string {
    let left = parseUnary();
    while (peek() === '*' || peek() === '/') {
      const op = consume();
      const right = parseUnary() as number;
      left = op === '*' ? (left as number) * right : (right === 0 ? 0 : (left as number) / right);
    }
    return left;
  }

  function parseAddSub(): number | string {
    let left = parseMulDiv();
    while (peek() === '+' || peek() === '-') {
      const op = consume();
      const right = parseMulDiv();
      if (op === '+') {
        left = (typeof left === 'string' || typeof right === 'string')
          ? String(left) + String(right)
          : (left as number) + (right as number);
      } else {
        left = (left as number) - (right as number);
      }
    }
    return left;
  }

  const left = parseAddSub();
  const op = peek();
  if (!op) return left;
  consume();
  const right = parseAddSub();
  if (op === '>') return (left as number) > (right as number);
  if (op === '<') return (left as number) < (right as number);
  if (op === '>=') return (left as number) >= (right as number);
  if (op === '<=') return (left as number) <= (right as number);
  if (op === '<>') return left !== right;
  if (op === '=') return left === right;
  return left;
}

function evaluateFormula(formula: string, grid: Grid): string {
  if (!formula.startsWith('=')) return formula;
  const raw = formula.slice(1).trim();
  const upper = raw.toUpperCase();

  // SOMME / SUM
  const sumM = upper.match(/^(?:SOMME|SUM)\((.+)\)$/i);
  if (sumM) {
    const vals = getRangeValues(sumM[1], grid);
    return String(vals.reduce((a, b) => a + b, 0));
  }

  // MOYENNE / AVERAGE
  const avgM = upper.match(/^(?:MOYENNE|AVERAGE)\((.+)\)$/i);
  if (avgM) {
    const vals = getRangeValues(avgM[1], grid);
    if (!vals.length) return '#DIV/0!';
    return String(Number((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2)));
  }

  // MAX
  const maxM = upper.match(/^MAX\((.+)\)$/i);
  if (maxM) {
    const vals = getRangeValues(maxM[1], grid);
    return vals.length ? String(Math.max(...vals)) : '#VIDE!';
  }

  // MIN
  const minM = upper.match(/^MIN\((.+)\)$/i);
  if (minM) {
    const vals = getRangeValues(minM[1], grid);
    return vals.length ? String(Math.min(...vals)) : '#VIDE!';
  }

  // NB / COUNT — counts numeric cells
  const nbM = upper.match(/^(?:NB|COUNT)\((.+)\)$/i);
  if (nbM) {
    return String(getRangeValues(nbM[1], grid).length);
  }

  // NBVAL / COUNTA — counts non-empty cells (strings + numbers)
  const nbvalM = upper.match(/^(?:NBVAL|COUNTA)\((.+)\)$/i);
  if (nbvalM) {
    const cells = getCellsRaw(nbvalM[1], grid);
    return String(cells.filter(v => v !== '').length);
  }

  // NB.SI / COUNTIF — NB.SI(range, criteria)
  const nbsiM = raw.match(/^(?:NB\.SI|COUNTIF)\(([^,]+),(.+)\)$/i);
  if (nbsiM) {
    const cells = getCellsRaw(nbsiM[1].trim(), grid);
    const criteria = nbsiM[2].trim();
    return String(cells.filter(v => matchCriteria(v, criteria)).length);
  }

  // SOMME.SI / SUMIF — SOMME.SI(range, criteria, sum_range)
  const somsiM = raw.match(/^(?:SOMME\.SI|SUMIF)\(([^,]+),([^,]+),([^)]+)\)$/i);
  if (somsiM) {
    const condCells = getCellsRaw(somsiM[1].trim(), grid);
    const criteria = somsiM[2].trim();
    const sumCells = getCellsRaw(somsiM[3].trim(), grid);
    let sum = 0;
    condCells.forEach((val, i) => {
      if (matchCriteria(val, criteria)) {
        const n = parseFloat(sumCells[i] ?? '');
        if (!isNaN(n)) sum += n;
      }
    });
    return String(sum);
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

  // STXT / MID
  const midM = raw.match(/^(?:STXT|MID)\(([^,]+),([^,]+),([^)]+)\)$/i);
  if (midM) {
    const cellVal = substituteCellRefs(midM[1].trim(), grid).replace(/"/g, '');
    const start = parseInt(substituteCellRefs(midM[2].trim(), grid)) - 1;
    const len = parseInt(substituteCellRefs(midM[3].trim(), grid));
    return cellVal.slice(start, start + len);
  }

  // MAJUSCULE / UPPER
  const upperM = raw.match(/^(?:MAJUSCULE|UPPER)\((.+)\)$/i);
  if (upperM) {
    return substituteCellRefs(upperM[1].trim(), grid).replace(/"/g, '').toUpperCase();
  }

  // MINUSCULE / LOWER
  const lowerM = raw.match(/^(?:MINUSCULE|LOWER)\((.+)\)$/i);
  if (lowerM) {
    return substituteCellRefs(lowerM[1].trim(), grid).replace(/"/g, '').toLowerCase();
  }

  // SUPPRESPACE / TRIM
  const trimM = raw.match(/^(?:SUPPRESPACE|TRIM)\((.+)\)$/i);
  if (trimM) {
    return substituteCellRefs(trimM[1].trim(), grid).replace(/"/g, '').trim();
  }

  // CONCATENER / CONCAT / CONCATENATE
  const concatM = raw.match(/^(?:CONCATENER|CONCAT|CONCATENATE)\((.+)\)$/i);
  if (concatM) {
    return concatM[1].split(',')
      .map(p => substituteCellRefs(p.trim(), grid).replace(/"/g, ''))
      .join('');
  }

  // ARRONDI / ROUND
  const roundM = raw.match(/^(?:ARRONDI|ROUND)\(([^,]+),(\d+)\)$/i);
  if (roundM) {
    const val = parseFloat(substituteCellRefs(roundM[1].trim(), grid));
    const dec = parseInt(roundM[2]);
    return isNaN(val) ? '#ERREUR!' : String(Number(val.toFixed(dec)));
  }

  // SI / IF
  const siM = raw.match(/^(?:SI|IF)\((.+),(.+),(.+)\)$/i);
  if (siM) {
    try {
      const cond = substituteCellRefs(siM[1].trim(), grid);
      const trueVal = siM[2].trim().replace(/"/g, '');
      const falseVal = siM[3].trim().replace(/"/g, '');
      const result = safeEval(cond);
      return result ? trueVal : falseVal;
    } catch {
      return '#ERREUR!';
    }
  }

  // Basic arithmetic after cell substitution
  try {
    const expr = substituteCellRefs(raw, grid);
    const result = safeEval(expr);
    if (typeof result === 'number') {
      const rounded = Number(result.toFixed(10));
      return String(rounded % 1 === 0 ? rounded : Number(result.toFixed(6)));
    }
    return String(result);
  } catch {
    return '#ERREUR!';
  }
}

export function SimulatorScreen() {
  const { S } = useLanguage();
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const { top } = useSafeAreaInsets();
  const [grid, setGrid] = useState<Grid>(createEmptyGrid());
  const [displayGrid, setDisplayGrid] = useState<Grid>(createEmptyGrid());
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null);
  const [formulaBar, setFormulaBar] = useState('');
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null);
  const [gridH, setGridH] = useState(300);
  const onGridLayout = useCallback((e: LayoutChangeEvent) => {
    setGridH(e.nativeEvent.layout.height);
  }, []);

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

    // Build display grid top-to-bottom so formula cells referencing
    // cells above them get evaluated values, not raw formula strings.
    const newDisplay = newGrid.map(row => [...row]);
    for (let ri = 0; ri < ROWS; ri++) {
      for (let ci = 0; ci < COLS; ci++) {
        if (newGrid[ri][ci].startsWith('=')) {
          newDisplay[ri][ci] = evaluateFormula(newGrid[ri][ci], newDisplay);
        }
      }
    }

    setGrid(newGrid);
    setDisplayGrid(newDisplay);

    if (formulaBar.startsWith('=')) {
      const result = newDisplay[r][c];
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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
    <View style={[styles.container, { paddingTop: top }]}>
      {/* Title bar */}
      <View style={styles.titleBar}>
        <Text style={styles.titleText}>{S.simulatorTitle}</Text>
        <Pressable android_ripple={{ color: 'rgba(0,0,0,0.1)' }} onPress={clearAll} style={styles.clearBtn}>
          <Text style={styles.clearText}>🗑️ مسح</Text>
        </Pressable>
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
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={applyFormula}
        />
        <Pressable android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
          style={[styles.fxApply, !selected && styles.fxApplyOff]}
          onPress={applyFormula}
          disabled={!selected}
        >
          <Text style={styles.fxApplyText}>✓</Text>
        </Pressable>
      </View>

      {/* Feedback */}
      {feedback && (
        <View style={[styles.feedbackBar, feedback.ok ? styles.fbOk : styles.fbErr]}>
          <Text style={styles.fbText}>{feedback.msg}</Text>
        </View>
      )}

      {/* Grid — flex:1 captures remaining vertical space via onLayout */}
      <View style={styles.gridWrapper} onLayout={onGridLayout}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ScrollView
            style={{ height: gridH }}
            showsVerticalScrollIndicator
            nestedScrollEnabled
          >
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
                    <Pressable android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
                      key={c}
                      style={[styles.cell, isSel && styles.selCell]}
                      onPress={() => selectCell(r, c)}
                    >
                      <Text style={[styles.cellTxt, isSel && styles.selTxt]} numberOfLines={1}>
                        {displayGrid[r]?.[c] ?? ''}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </View>

      {/* Quick formula chips */}
      <View style={styles.quickBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickRow}>
          {QUICK_FORMULAS.map(f => (
            <Pressable android_ripple={{ color: 'rgba(0,0,0,0.1)' }} key={f} style={styles.chip} onPress={() => setFormulaBar(f)}>
              <Text style={styles.chipTxt}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  titleBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#217346', paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
  },
  titleText: { fontSize: 17, fontWeight: '800', color: c.white },
  clearBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: radius.sm,
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
  },
  clearText: { color: c.white, fontWeight: '700', fontSize: 12 },
  fxBar: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: c.surface,
    borderBottomWidth: 1, borderBottomColor: c.border,
    paddingHorizontal: spacing.xs,
  },
  fxLeft: {
    width: 44, alignItems: 'center', justifyContent: 'center',
    borderRightWidth: 1, borderRightColor: c.border, height: 36,
  },
  cellRef: { fontSize: 11, fontWeight: '700', color: c.accentBlue },
  fxIcon: {
    fontSize: 13, fontWeight: '700', color: c.accentBlue,
    paddingHorizontal: spacing.sm,
  },
  fxInput: {
    flex: 1, height: 36, fontSize: 13, color: c.textPrimary,
    fontFamily: 'monospace',
  },
  fxApply: {
    width: 32, height: 32, backgroundColor: '#217346',
    borderRadius: 4, alignItems: 'center', justifyContent: 'center', margin: 2,
  },
  fxApplyOff: { backgroundColor: c.border },
  fxApplyText: { color: c.white, fontWeight: '800', fontSize: 16 },
  feedbackBar: { padding: spacing.xs, paddingHorizontal: spacing.md },
  fbOk: { backgroundColor: '#C8E6C9' },
  fbErr: { backgroundColor: '#FFCDD2' },
  fbText: { fontSize: 12, fontWeight: '600', color: c.textPrimary },
  gridWrapper: { flex: 1 },
  row: { flexDirection: 'row' },
  cell: {
    width: CELL_W, height: CELL_H,
    borderWidth: 0.5, borderColor: c.border,
    backgroundColor: c.surface, justifyContent: 'center', paddingHorizontal: 3,
  },
  corner: { width: ROW_HEADER_W, backgroundColor: '#E3F2FD' },
  colHeader: { width: CELL_W, backgroundColor: '#E3F2FD', alignItems: 'center' },
  rowHeader: { width: ROW_HEADER_W, backgroundColor: '#E3F2FD', alignItems: 'center' },
  headerTxt: { fontSize: 11, fontWeight: '700', color: c.accentBlue },
  selCell: { backgroundColor: '#E8F5E9', borderColor: '#217346', borderWidth: 2 },
  cellTxt: { fontSize: 12, color: c.textPrimary },
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
