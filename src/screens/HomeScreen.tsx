import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useChecklists } from '../context/ChecklistContext';
import { Checklist } from '../types/checklist';
import {
  // ChecklistCard,
  // FloatingActionButton,
  // SearchBar,
  Button,
} from '../components';
import { spacing, useThemeColors } from '../theme';
import { ChecklistCard } from '../components/ChecklistCard';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { SearchBar } from '../components/SearchBar';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { checklists, addChecklist } = useChecklists();
  const colors = useThemeColors();
  const styles = getStyles(colors);

  const [search, setSearch] = useState('');
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const filtered = useMemo(
    () =>
      checklists.filter((list: Checklist) =>
        list.title.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [checklists, search],
  );

  const handleCreateChecklist = useCallback(() => {
    const trimmed = newTitle.trim();
    if (!trimmed) {
      return;
    }
    addChecklist(trimmed);
    setNewTitle('');
    setIsAddVisible(false);
  }, [addChecklist, newTitle]);

  const renderItem = useCallback(
    ({ item }: { item: Checklist }) => (
      <ChecklistCard
        checklist={item}
        onPress={() =>
          navigation.navigate('ChecklistDetail', {
            checklistId: item.id,
          })
        }
      />
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Smart Checklist</Text>
          <Text style={styles.subtitle}>Organize your day with focused lists</Text>
        </View>
        <View style={styles.avatar}>
          <MaterialIcons name="checklist" size={22} color={colors.primary} />
        </View>
      </View>

      <SearchBar value={search} onChangeText={setSearch} />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          filtered.length === 0 && styles.listEmptyContent,
        ]}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons
              name="check-circle-outline"
              size={42}
              color={colors.textSecondary}
            />
            <Text style={styles.emptyTitle}>No checklists yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the plus button to start your first checklist.
            </Text>
          </View>
        }
      />

      <FloatingActionButton onPress={() => setIsAddVisible(true)} />

      <Modal
        visible={isAddVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsAddVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>New checklist</Text>
            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Checklist title"
              placeholderTextColor={colors.textSecondary}
              style={styles.modalInput}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleCreateChecklist}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalSecondary}
                onPress={() => {
                  setNewTitle('');
                  setIsAddVisible(false);
                }}
              >
                <Text style={styles.modalSecondaryText}>Cancel</Text>
              </TouchableOpacity>
              <Button
                title="Create"
                onPress={handleCreateChecklist}
                disabled={!newTitle.trim()}
                style={styles.modalPrimary}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const getStyles = (colors: ReturnType<typeof useThemeColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      backgroundColor: colors.background,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: 26,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surfaceElevated,
    },
    listContent: {
      paddingBottom: spacing.xxl,
    },
    listEmptyContent: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    emptyState: {
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginTop: spacing.md,
      marginBottom: spacing.xs,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
    },
    modalCard: {
      borderRadius: 20,
      padding: spacing.lg,
      backgroundColor: colors.surface,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.md,
    },
    modalInput: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.surfaceElevated,
      marginBottom: spacing.lg,
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    modalSecondary: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      marginRight: spacing.sm,
    },
    modalSecondaryText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    modalPrimary: {
      minWidth: 96,
    },
  });
