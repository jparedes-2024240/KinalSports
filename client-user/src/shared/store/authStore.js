// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\shared\store\authStore.js
import create from 'zustand';
import { persist } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REFRESH_TOKEN_KEY = 'refreshToken';

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,
      login: async (accessToken, user, refreshToken) => {
        set({ token: accessToken, user, isAuthenticated: true });
        try {
          await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
        } catch {
          // no bloqueamos la sesión por fallo de almacenamiento seguro
        }
      },
      logout: async () => {
        set({ token: null, user: null, isAuthenticated: false });
        try {
          await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
        } catch {
          // ignorar errores de borrado
        }
      },
      setAccessToken: (token) => set({ token }),
      updateUser: (user) => set({ user }),
      getRefreshToken: async () => {
        try {
          return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
        } catch {
          return null;
        }
      }
    }),
    {
      name: 'auth-storage',
      getStorage: () => AsyncStorage,
      onRehydrateStorage: () => () => {
        set({ _hasHydrated: true });
      }
    }
  )
);
