import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { ChecklistTask } from '../types/checklist';
import { spacing, useThemeColors } from '../theme';

interface TaskItemProps {
  task: ChecklistTask;
  onToggle: () => void;
  onDelete: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const colors = useThemeColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ checked: task.completed }}
      >
        <MaterialIcons
          name={task.completed ? 'check-circle' : 'radio-button-unchecked'}
          size={22}
          color={task.completed ? colors.success : colors.textSecondary}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.textContainer} onPress={onToggle} activeOpacity={0.8}>
        <Text
          style={[
            styles.title,
            task.completed && styles.titleCompleted,
          ]}
        >
          {task.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <MaterialIcons name="delete-outline" size={22} color={colors.error} />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.sm,
    },
    checkbox: {
      paddingRight: spacing.md,
      paddingVertical: spacing.xs,
    },
    textContainer: {
      flex: 1,
      paddingVertical: spacing.xs,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 16,
      color: colors.text,
    },
    titleCompleted: {
      textDecorationLine: 'line-through',
      color: colors.textSecondary,
    },
    deleteButton: {
      paddingLeft: spacing.md,
      paddingVertical: spacing.xs,
    },
  });


