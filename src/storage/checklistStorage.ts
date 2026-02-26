import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checklist } from '../types/checklist';

const STORAGE_KEY = '@smarttodo_checklists_v1';

export const loadChecklists = async (): Promise<Checklist[]> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: Checklist[] = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const persistChecklists = async (checklists: Checklist[]): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(checklists));
};

