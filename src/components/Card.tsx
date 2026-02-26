import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { spacing, useThemeColors } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  const colors = useThemeColors();

  return <View style={[styles(colors).card, style]}>{children}</View>;
};

const styles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: spacing.md,
      marginBottom: spacing.md,
      ...Platform.select({
        ios: {
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 12,
        },
        android: {
          elevation: 4,
        },
      }),
    },
  });
