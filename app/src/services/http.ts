import axios from 'axios';

const BASE_URL = (process.env.EXPO_PUBLIC_API_URL || 'https://gym.switchdreams.com.br/api').trim();

const DEFAULT_TIMEOUT = Number(process.env.EXPO_PUBLIC_API_TIMEOUT_MS || 5000);

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'content-type': 'application/json' },
  timeout: DEFAULT_TIMEOUT,
});

// Optional: basic logging to help diagnose slow requests in dev
api.interceptors.request.use((config) => {
  // @ts-ignore
  config.metadata = { start: Date.now() };
  return config;
});

api.interceptors.response.use(
  (response) => {
    const start = (response.config as any)?.metadata?.start as number | undefined;
    if (start && __DEV__) {
      const dur = Date.now() - start;
      // eslint-disable-next-line no-console
      console.log(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} -> ${response.status} in ${dur}ms`);
    }
    return response;
  },
  (error) => {
    const cfg = error.config || {};
    const start = (cfg as any)?.metadata?.start as number | undefined;
    if (start && __DEV__) {
      const dur = Date.now() - start;
      // eslint-disable-next-line no-console
      console.warn(`[API] ${cfg.method?.toUpperCase?.()} ${cfg.url} failed in ${dur}ms:`, error.message);
    }
    return Promise.reject(error);
  }
);

export function setToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['authorization'];
  }
}
