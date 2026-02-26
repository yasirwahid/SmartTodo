import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { spacing, useThemeColors } from '../theme';

interface SearchBarProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, ...rest }) => {
  const colors = useThemeColors();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={20} color={colors.textSecondary} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search checklists"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
        {...rest}
      />
    </View>
  );
};

const getStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 999,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      marginBottom: spacing.md,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    icon: {
      marginRight: spacing.sm,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
  });

