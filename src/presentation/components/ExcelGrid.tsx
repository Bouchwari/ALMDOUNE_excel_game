import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';

interface Props {
  data: string[][];
  onCellPress?: (row: number, col: number) => void;
  selectedCell?: { row: number; col: number } | null;
  correctCell?: { row: number; col: number } | null;
  showResult?: boolean;
}

export function ExcelGrid({ data, onCellPress, selectedCell, correctCell, showResult }: Props) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View>
        {data.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.row}>
            {row.map((cell, colIdx) => {
              const isHeader = rowIdx === 0 || colIdx === 0;
              const isSelected = selectedCell?.row === rowIdx && selectedCell?.col === colIdx;
              const isCorrect = showResult && correctCell?.row === rowIdx && correctCell?.col === colIdx;
              const isWrong = showResult && isSelected && !isCorrect;

              return (
                <TouchableOpacity
                  key={colIdx}
                  style={[
                    styles.cell,
                    isHeader && styles.headerCell,
                    isSelected && styles.selectedCell,
                    isCorrect && styles.correctCell,
                    isWrong && styles.wrongCell,
                  ]}
                  onPress={() => !isHeader && onCellPress?.(rowIdx, colIdx)}
                  activeOpacity={isHeader ? 1 : 0.7}
                  disabled={isHeader}
                >
                  <Text style={[
                    styles.cellText,
                    isHeader && styles.headerText,
                    isSelected && !isHeader && styles.selectedText,
                  ]}>
                    {cell}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const CELL_W = 72;
const CELL_H = 32;

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  row: { flexDirection: 'row' },
  cell: {
    width: CELL_W, height: CELL_H, borderWidth: 0.5, borderColor: '#B0BEC5',
    backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4,
  },
  headerCell: { backgroundColor: '#E3F2FD', borderColor: '#90CAF9' },
  selectedCell: { backgroundColor: '#E3F2FD', borderColor: c.primary, borderWidth: 2 },
  correctCell: { backgroundColor: '#C8E6C9', borderColor: c.success, borderWidth: 2 },
  wrongCell: { backgroundColor: '#FFCDD2', borderColor: c.error, borderWidth: 2 },
  cellText: { fontSize: 12, color: c.textPrimary },
  headerText: { fontWeight: '700', color: '#1565C0', fontSize: 12 },
  selectedText: { color: c.primary, fontWeight: '600' },
});
