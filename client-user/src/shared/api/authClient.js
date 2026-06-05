// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\shared\api\authClient.js
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ENDPOINTS } from '../constants/endpoints.js';
import { useAuthStore } from '../store/authStore.js';

const excludedPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/resend-verification'
];

let refreshPromise = null;

const authClient = axios.create({
  baseURL: ENDPOINTS.AUTH,
  headers: {
    'Content-Type': 'application/json'
  }
});

const logout = async () => {
  await useAuthStore.getState().logout();
};

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = await useAuthStore.getState().getRefreshToken();
      if (!refreshToken) {
        throw new Error('No se encontró refresh token');
      }
      const response = await axios.post(`${ENDPOINTS.AUTH}/refresh`, { refreshToken });
      const accessToken = response.data?.accessToken;
      if (!accessToken) {
        throw new Error('No se recibió access token');
      }
      useAuthStore.getState().setAccessToken(accessToken);
      return accessToken;
    })();
  }

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
};

authClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const requestUrl = originalRequest?.url || '';

    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !excludedPaths.some((path) => requestUrl.includes(path))
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return authClient(originalRequest);
      } catch (refreshError) {
        await logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { authClient };
