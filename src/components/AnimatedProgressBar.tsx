import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { spacing, useThemeColors } from '../theme';

interface AnimatedProgressBarProps {
  progress: number; // 0 - 1
  style?: ViewStyle;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({ progress, style }) => {
  const colors = useThemeColors();
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const clamped = Math.min(1, Math.max(0, progress));
    Animated.timing(animatedProgress, {
      toValue: clamped,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [progress, animatedProgress]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceElevated,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.bar,
          {
            backgroundColor: colors.primary,
          },
          {
            transform: [{ scaleX: animatedProgress || 0.01 }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
  },
  bar: {
    flex: 1,
    borderRadius: 999,
  },
});

