import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getStoredUser,
  setStoredUser,
  clearStoredUser,
  findUserByEmail,
  saveUserToRegistry,
  isEmailRegistered,
  StoredUser,
} from '../utils/storage';

interface AuthContextType {
  user: StoredUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadStoredUser = useCallback(async () => {
    try {
      const storedUser = await getStoredUser();
      setUser(storedUser);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStoredUser();
  }, [loadStoredUser]);

  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      try {
        const foundUser = await findUserByEmail(email, password);
        if (foundUser) {
          await setStoredUser(foundUser);
          setUser(foundUser);
          return { success: true };
        }
        return { success: false, error: 'Invalid email or password' };
      } catch {
        return { success: false, error: 'Something went wrong. Please try again.' };
      }
    },
    []
  );

  const signUp = useCallback(
    async (
      name: string,
      email: string,
      password: string
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        const exists = await isEmailRegistered(email);
        if (exists) {
          return { success: false, error: 'An account with this email already exists' };
        }
        const newUser: StoredUser = { name: name.trim(), email: email.trim().toLowerCase(), password };
        await saveUserToRegistry(newUser);
        await setStoredUser(newUser);
        setUser(newUser);
        return { success: true };
      } catch {
        return { success: false, error: 'Something went wrong. Please try again.' };
      }
    },
    []
  );

  const logout = useCallback(async () => {
    await clearStoredUser();
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signUp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
