import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing } from '../theme/spacing';

interface Props {
  stars: number;
  total?: number;
  size?: number;
}

export function StarRating({ stars, total = 3, size = 24 }: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <Text key={i} style={{ fontSize: size, opacity: i < stars ? 1 : 0.25 }}>⭐</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
});
