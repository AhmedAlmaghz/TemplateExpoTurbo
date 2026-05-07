import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const memoryStore = new Map<string, string>();

export const SafeStorage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return memoryStore.get(key) || null;
      }
    }

    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.warn(`AsyncStorage native module null or failed for key ${key}. Falling back to memory.`, error);
      return memoryStore.get(key) || null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        localStorage.setItem(key, value);
        return;
      } catch (e) {
        memoryStore.set(key, value);
        return;
      }
    }

    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.warn(`AsyncStorage native module null or failed for key ${key}. Falling back to memory.`, error);
      memoryStore.set(key, value);
    }
  },

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        localStorage.removeItem(key);
        return;
      } catch (e) {
        memoryStore.delete(key);
        return;
      }
    }

    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.warn(`AsyncStorage native module null or failed for key ${key}. Falling back to memory.`, error);
      memoryStore.delete(key);
    }
  }
};
