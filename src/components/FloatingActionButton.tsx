import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { spacing, useThemeColors } from '../theme';

interface FloatingActionButtonProps {
  onPress: () => void;
  iconName?: string;
  style?: ViewStyle;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  iconName = 'add',
  style,
}) => {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.base,
        {
          backgroundColor: colors.fabBackground,
        },
        style,
      ]}
    >
      <MaterialIcons name={iconName} color="#FFFFFF" size={28} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});

