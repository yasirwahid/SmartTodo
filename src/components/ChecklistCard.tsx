import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { Checklist } from '../types/checklist';
import { Card } from './Card';
import { AnimatedProgressBar } from './AnimatedProgressBar';
import { spacing, useThemeColors } from '../theme';

interface ChecklistCardProps {
  checklist: Checklist;
  onPress: () => void;
}

export const ChecklistCard: React.FC<ChecklistCardProps> = ({ checklist, onPress }) => {
  const colors = useThemeColors();
  const styles = getStyles(colors);

  const { completedCount, progress, total } = useMemo(() => {
    const totalTasks = checklist.tasks.length;
    const completed = checklist.tasks.filter(t => t.completed).length;
    const value = totalTasks === 0 ? 0 : completed / totalTasks;
    return { completedCount: completed, progress: value, total: totalTasks };
  }, [checklist.tasks]);

  const percentageLabel = `${Math.round(progress * 100)}%`;

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <Card style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.titleRow}>
            <MaterialIcons
              name={completedCount === total && total > 0 ? 'check-circle' : 'check-circle-outline'}
              size={22}
              color={completedCount === total && total > 0 ? colors.success : colors.primary}
              style={styles.leadingIcon}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={1}>
                {checklist.title}
              </Text>
              <Text style={styles.subtitle}>
                {total === 0 ? 'No tasks yet' : `${completedCount} of ${total} tasks`}
              </Text>
            </View>
          </View>
          <Text style={styles.percentage}>{percentageLabel}</Text>
        </View>
        <View style={styles.progressContainer}>
          <AnimatedProgressBar progress={progress} />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    card: {
      marginBottom: spacing.md,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      paddingRight: spacing.md,
    },
    leadingIcon: {
      marginRight: spacing.sm,
    },
    title: {
      fontSize: 17,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 2,
    },
    subtitle: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    percentage: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary,
    },
    progressContainer: {
      marginTop: spacing.md,
    },
  });

