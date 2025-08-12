// HTTP Client Configuration
export const API_BASE_URL = 'https://reservapp-web.vercel.app/api';

export const HTTP_CONFIG = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
};
