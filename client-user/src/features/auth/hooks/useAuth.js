// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\features\auth\hooks\useAuth.js
import { useState } from 'react';
import { Alert } from 'react-native';
import { authClient } from '../../../shared/api/authClient.js';
import { useAuthStore } from '../../../shared/store/authStore.js';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login, logout } = useAuthStore((state) => ({ login: state.login, logout: state.logout }));

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authClient.post('/login', credentials);
      const data = response.data || {};
      const accessToken = data.accessToken || data.token || null;
      const refreshToken = data.refreshToken || data.refresh_token || null;
      const user = data.userDetails || data.user || null;

      if (!accessToken || !refreshToken) {
        throw new Error('No se pudo completar el inicio de sesión.');
      }

      login(accessToken, user, refreshToken);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Error al iniciar sesión.';
      setError(message);
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values) => {
    setLoading(true);
    setError(null);

    try {
      await authClient.post('/register', values);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Error al registrarse.';
      setError(message);
      Alert.alert('Error', message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    handleRegister,
    loading,
    error,
    logout
  };
}
