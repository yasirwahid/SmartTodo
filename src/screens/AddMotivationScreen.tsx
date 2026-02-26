import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from '../components';
import { useAuth } from '../context/AuthContext';
import { addUserMotivation } from '../utils/storage';
import { colors, spacing } from '../theme';

export const AddMotivationScreen: React.FC = () => {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError('Please enter your motivation');
      return;
    }
    if (!user) return;

    setError(null);
    setLoading(true);
    setSuccess(false);

    try {
      await addUserMotivation(trimmed, user.email);
      setText('');
      setSuccess(true);
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Add Your Motivation</Text>
          <Text style={styles.subtitle}>
            Write something that inspires you today. It will appear on your Home screen.
          </Text>

          <Input
            label="Your motivation"
            placeholder="e.g. I will finish my project today"
            value={text}
            onChangeText={(v) => {
              setText(v);
              setError(null);
            }}
            error={error || undefined}
            multiline
            numberOfLines={4}
            style={styles.input}
          />

          {success ? (
            <Text style={styles.successText}>✓ Added! Check your Home screen.</Text>
          ) : null}

          <Button
            title="Add Motivation"
            onPress={handleSubmit}
            loading={loading}
            style={styles.button}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  input: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: spacing.md,
  },
  successText: {
    fontSize: 14,
    color: colors.success,
    marginBottom: spacing.sm,
  },
});
