/**
 * AsyncStorage utilities for auth simulation
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './constants';

export interface StoredUser {
  email: string;
  name: string;
  password: string;
}

export const getStoredUser = async (): Promise<StoredUser | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const setStoredUser = async (user: StoredUser): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const clearStoredUser = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEYS.USER);
};

export const getAllUsers = async (): Promise<StoredUser[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveUserToRegistry = async (user: StoredUser): Promise<void> => {
  const users = await getAllUsers();
  const existing = users.find((u) => u.email.toLowerCase() === user.email.toLowerCase());
  if (!existing) {
    users.push(user);
    await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
};

export const isEmailRegistered = async (email: string): Promise<boolean> => {
  const users = await getAllUsers();
  return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
};

export const findUserByEmail = async (
  email: string,
  password: string
): Promise<StoredUser | null> => {
  const users = await getAllUsers();
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  return user || null;
};

export interface UserMotivation {
  id: string;
  text: string;
  createdAt: number;
  userEmail: string;
}

export const getUserMotivations = async (userEmail: string): Promise<UserMotivation[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_MOTIVATIONS);
    const all: UserMotivation[] = data ? JSON.parse(data) : [];
    return all.filter((m) => m.userEmail.toLowerCase() === userEmail.toLowerCase());
  } catch {
    return [];
  }
};

export const addUserMotivation = async (
  text: string,
  userEmail: string
): Promise<UserMotivation> => {
  const motivations = await getUserMotivations(userEmail);
  const allRaw = await AsyncStorage.getItem(STORAGE_KEYS.USER_MOTIVATIONS);
  const all: UserMotivation[] = allRaw ? JSON.parse(allRaw) : [];

  const newItem: UserMotivation = {
    id: `user-${Date.now()}`,
    text: text.trim(),
    createdAt: Date.now(),
    userEmail: userEmail.toLowerCase(),
  };

  all.push(newItem);
  await AsyncStorage.setItem(STORAGE_KEYS.USER_MOTIVATIONS, JSON.stringify(all));
  return newItem;
};
