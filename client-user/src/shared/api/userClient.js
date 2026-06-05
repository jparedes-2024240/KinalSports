// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\shared\api\userClient.js
import axios from 'axios';
import { ENDPOINTS } from '../constants/endpoints.js';
import { useAuthStore } from '../store/authStore.js';

let refreshPromise = null;

const userClient = axios.create({
  baseURL: ENDPOINTS.USER,
  headers: {
    'Content-Type': 'application/json'
  }
});

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

const logout = async () => {
  await useAuthStore.getState().logout();
};

userClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

userClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return userClient(originalRequest);
      } catch (refreshError) {
        await logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { userClient };
