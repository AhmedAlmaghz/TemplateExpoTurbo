import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: UserProfile) => Promise<void>;
  logout: () => Promise<void>;
  loadSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: async (token, user) => {
    await SecureStore.setItemAsync('auth-token', token);
    await SecureStore.setItemAsync('auth-user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true, isLoading: false });
  },
  logout: async () => {
    await SecureStore.deleteItemAsync('auth-token');
    await SecureStore.deleteItemAsync('auth-user');
    set({ token: null, user: null, isAuthenticated: false, isLoading: false });
  },
  loadSession: async () => {
    try {
      const token = await SecureStore.getItemAsync('auth-token');
      const userStr = await SecureStore.getItemAsync('auth-user');
      if (token && userStr) {
        set({ token, user: JSON.parse(userStr), isAuthenticated: true });
      }
    } catch (e) {
      console.error("Failed to load auth session", e);
    } finally {
      set({ isLoading: false });
    }
  }
}));
