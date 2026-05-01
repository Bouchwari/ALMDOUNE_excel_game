import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const PIECES = ['🎊', '⭐', '🎉', '✨', '🏆', '💫', '🌟', '🎯'];

interface Piece {
  emoji: string;
  x: Animated.Value;
  y: Animated.Value;
  rotate: Animated.Value;
  opacity: Animated.Value;
}

interface Props {
  active: boolean;
}

export function ConfettiAnimation({ active }: Props) {
  const pieces = useRef<Piece[]>(
    Array.from({ length: 16 }, (_, i) => ({
      emoji: PIECES[i % PIECES.length],
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(-50),
      rotate: new Animated.Value(0),
      opacity: new Animated.Value(1),
    })),
  ).current;

  useEffect(() => {
    if (!active) return;

    pieces.forEach((piece, i) => {
      piece.x.setValue(Math.random() * width);
      piece.y.setValue(-50);
      piece.opacity.setValue(1);
      piece.rotate.setValue(0);

      Animated.parallel([
        Animated.timing(piece.y, {
          toValue: height + 100,
          duration: 1500 + Math.random() * 1000,
          delay: i * 80,
          useNativeDriver: true,
        }),
        Animated.timing(piece.rotate, {
          toValue: 4,
          duration: 1500,
          delay: i * 80,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(800 + i * 40),
          Animated.timing(piece.opacity, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]),
      ]).start();
    });
  }, [active]);

  if (!active) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {pieces.map((piece, i) => (
        <Animated.Text
          key={i}
          style={{
            position: 'absolute',
            fontSize: 24,
            transform: [
              { translateX: piece.x },
              { translateY: piece.y },
              { rotate: piece.rotate.interpolate({ inputRange: [0, 4], outputRange: ['0deg', '720deg'] }) },
            ],
            opacity: piece.opacity,
          }}
        >
          {piece.emoji}
        </Animated.Text>
      ))}
    </View>
  );
}
