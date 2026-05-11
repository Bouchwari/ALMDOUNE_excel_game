import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../../shared/context/ThemeContext';

interface Props {
  progress: number; // 0-1
  size?: number;
  color?: string;
  showLabel?: boolean;
}

export function ProgressRing({ progress, size = 48, color, showLabel = true }: Props) {
  const { colors } = useTheme();
  const ringColor = color ?? colors.primary;
  const stroke = 4;
  const r = (size - stroke * 2) / 2;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * Math.max(0, Math.min(1, progress));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={colors.border} strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2} cy={size / 2} r={r} stroke={ringColor} strokeWidth={stroke} fill="none"
          strokeDasharray={`${dash} ${circumference}`} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {showLabel && (
        <Text style={{ fontSize: size * 0.22, fontWeight: '700', color: ringColor }}>
          {Math.round(progress * 100)}%
        </Text>
      )}
    </View>
  );
}
