import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from 'src/config/url.config';

const api = axios.create({ baseURL: baseUrl });

const authInterceptor = (config: AxiosRequestConfig) => {
  const token = JSON.parse(localStorage.getItem('token') || '{}')?.state?.accessToken;
  const lang = JSON.parse(localStorage.getItem('lang') || '{}')?.state?.lang;
  if (token) {
    config.headers = {
      ...config.headers,
      authorization: `Bearer ${token}`,
      lang: lang ? `${lang}`.toLowerCase() : 'uz',
    };
  }
  return config;
};

api.interceptors.request.use(authInterceptor as any);

export { api };
