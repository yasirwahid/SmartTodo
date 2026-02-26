import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useChecklists } from '../context/ChecklistContext';
import { Button } from '../components';
import { spacing, useThemeColors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ChecklistDetail'>;

export const ChecklistDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { checklistId } = route.params;
  const { checklists, updateChecklistTitle, deleteChecklist, addTask, toggleTask, deleteTask } =
    useChecklists();
  const colors = useThemeColors();
  const styles = getStyles(colors);

  const checklist = checklists.find(c => c.id === checklistId);

  const [titleDraft, setTitleDraft] = useState(checklist?.title ?? '');
  const [newTask, setNewTask] = useState('');

  if (!checklist) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerRow}>
          <Button title="Back" onPress={() => navigation.goBack()} variant="outline" />
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Checklist not found</Text>
          <Text style={styles.emptySubtitle}>
            It may have been removed from your device.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSaveTitle = () => {
    const trimmed = titleDraft.trim();
    if (!trimmed || trimmed === checklist.title) {
      setTitleDraft(checklist.title);
      return;
    }
    updateChecklistTitle(checklist.id, trimmed);
  };

  const handleAddTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) {
      return;
    }
    addTask(checklist.id, trimmed);
    setNewTask('');
  };

  const handleDeleteChecklist = () => {
    deleteChecklist(checklist.id);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.headerRow}>
        <Button
          title="Back"
          onPress={() => navigation.goBack()}
          variant="outline"
          style={styles.backButton}
        />
        <Button
          title="Delete"
          onPress={handleDeleteChecklist}
          variant="danger"
          style={styles.deleteButton}
        />
      </View>

      <View style={styles.titleRow}>
        <TextInput
          value={titleDraft}
          onChangeText={setTitleDraft}
          onBlur={handleSaveTitle}
          placeholder="Checklist title"
          placeholderTextColor={colors.textSecondary}
          style={styles.titleInput}
        />
      </View>

      <View style={styles.metaRow}>
        <MaterialIcons name="assignment-turned-in" size={18} color={colors.primary} />
        <Text style={styles.metaText}>
          {checklist.tasks.filter(t => t.completed).length} of {checklist.tasks.length} tasks
        </Text>
      </View>

      <View style={styles.listWrapper}>
        <FlatList
          data={checklist.tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskRow}>
              <Text style={[styles.taskTitle, item.completed && styles.taskTitleCompleted]}>
                {item.title}
              </Text>
              <View style={styles.taskActions}>
                <Button
                  title={item.completed ? 'Undo' : 'Done'}
                  onPress={() => toggleTask(checklist.id, item.id)}
                  variant="outline"
                />
                <Button
                  title="Delete"
                  onPress={() => deleteTask(checklist.id, item.id)}
                  variant="danger"
                />
              </View>
            </View>
          )}
          contentContainerStyle={[
            styles.listContent,
            checklist.tasks.length === 0 && styles.listEmptyContent,
          ]}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MaterialIcons name="playlist-add" size={32} color={colors.textSecondary} />
              <Text style={styles.emptyTitle}>No tasks yet</Text>
              <Text style={styles.emptySubtitle}>
                Add tasks below to start tracking this checklist.
              </Text>
            </View>
          }
        />
      </View>

      <View style={styles.inputRow}>
        <View style={styles.taskInputContainer}>
          <TextInput
            value={newTask}
            onChangeText={setNewTask}
            placeholder="Add a task"
            placeholderTextColor={colors.textSecondary}
            style={styles.taskInput}
            returnKeyType="done"
            onSubmitEditing={handleAddTask}
          />
        </View>
        <Button
          title="Add"
          onPress={handleAddTask}
          disabled={!newTask.trim()}
          style={styles.addButton}
        />
      </View>
    </SafeAreaView>
  );
};

const getStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    backButton: {
      flex: 0,
    },
    deleteButton: {
      flex: 0,
    },
    titleRow: {
      marginBottom: spacing.md,
    },
    titleInput: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      paddingHorizontal: 0,
      paddingVertical: spacing.xs,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    metaText: {
      marginLeft: spacing.xs,
      fontSize: 13,
      color: colors.textSecondary,
    },
    listWrapper: {
      flex: 1,
      borderRadius: 16,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: colors.surface,
      marginBottom: spacing.md,
    },
    listContent: {
      paddingBottom: spacing.md,
    },
    listEmptyContent: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    taskRow: {
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    taskTitle: {
      fontSize: 16,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    taskTitleCompleted: {
      textDecorationLine: 'line-through',
      color: colors.textSecondary,
    },
    taskActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: spacing.sm,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: spacing.md,
    },
    taskInputContainer: {
      flex: 1,
      marginRight: spacing.sm,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceElevated,
      paddingHorizontal: spacing.md,
    },
    taskInput: {
      fontSize: 16,
      color: colors.text,
      paddingVertical: spacing.sm,
    },
    addButton: {
      flex: 0,
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg,
    },
    emptyTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginTop: spacing.sm,
      marginBottom: spacing.xs,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });
