import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components';
import { useAuth } from '../context/AuthContext';
import { colors, spacing } from '../theme';

const AVATAR_URL = 'https://ui-avatars.com/api/?name=User&size=120&background=6366F1&color=fff';

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.content}>
        <Image
          source={{ uri: user ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=120&background=6366F1&color=fff` : AVATAR_URL }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>
        <Button
          title="Logout"
          onPress={logout}
          variant="danger"
          style={styles.logoutButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.lg,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: spacing.lg,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  logoutButton: {
    marginTop: spacing.lg,
    minWidth: 200,
  },
});
