import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from 'src/config/url.config';

const api = axios.create({ baseURL: baseUrl });

// Функция для безопасного получения токена
const getAccessToken = (): string | null => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const parsedToken = JSON.parse(token);
    return parsedToken?.state?.accessToken || null;
  } catch (error) {
    console.error('Error parsing token from localStorage:', error);
    return null;
  }
};

// Интерсептор для добавления токена
const authInterceptor = (config: AxiosRequestConfig) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Подключение интерсептора
api.interceptors.request.use(authInterceptor as any, (error) => Promise.reject(error));

export { api };
