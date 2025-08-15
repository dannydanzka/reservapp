export const API_CONFIG = {
  // URLs de desarrollo y producción - ReservApp Web API Real
  BASE_URL: 'https://reservapp-web.vercel.app/api',
  // Headers por defecto
  HEADERS: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },

  // Configuración de reintentos
  RETRY: {
    ATTEMPTS: 3,
    DELAY: 1000, // 1 segundo
  },

  // URL de producción real
  TIMEOUT: 30000,

  // 30 segundos
  VERSION: 'v1',
};

export const API_ENDPOINTS = {
  // Authentication endpoints - ReservApp Web API
  AUTH: {
    CHANGE_PASSWORD: '/auth/change-password',
    DASHBOARD: '/mobile/user/dashboard',
    FORGOT_PASSWORD: '/auth/forgot-password',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    REGISTER: '/auth/register',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Notifications system - Real API endpoints
  NOTIFICATIONS: {
    DETAILS: (id: string) => `/notifications/${id}`,
    LIST: '/notifications',
    MARK_ALL_READ: '/notifications/mark-all-read',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    UNREAD_COUNT: '/notifications/unread-count',
  },

  // Payments & billing - Stripe integration endpoints
  PAYMENTS: {
    CONFIRM_PAYMENT: '/payments/confirm',
    CREATE_INTENT: '/payments/intents',
    HISTORY: '/payments/history',
    PAYMENT_METHODS: '/payments/methods',
    REFUNDS: '/payments/refunds',
    SUBSCRIPTIONS: '/payments/subscriptions',
    WEBHOOKS: '/payments/webhooks/stripe',
  },

  // Public API (no authentication required)
  PUBLIC: {
    SERVICES: '/public/services',
  },

  // Reservations management - Real API endpoints
  RESERVATIONS: {
    CANCEL: (id: string) => `/reservations/${id}/cancel`,
    CHECKIN: (id: string) => `/reservations/${id}/checkin`,
    CHECKOUT: (id: string) => `/reservations/${id}/checkout`,
    CREATE: '/reservations',
    DELETE: (id: string) => `/reservations/${id}`,
    DETAILS: (id: string) => `/reservations/${id}`,
    LIST: '/reservations',
    UPDATE: (id: string) => `/reservations/${id}`,
  },

  // Services catalog - Real API endpoints
  SERVICES: {
    AVAILABLE: '/services/available',
    CREATE: '/services',
    DELETE: (id: string) => `/services/${id}`,
    DETAILS: (id: string) => `/services/${id}`,
    LIST: '/services',
    UPDATE: (id: string) => `/services/${id}`,
  },

  // User settings - Real API endpoints
  SETTINGS: {
    NOTIFICATIONS: '/settings/notifications',
    PROFILE: '/settings/profile',
  },

  // Users management - Real API endpoints
  USERS: {
    CREATE: '/users',
    DELETE: (id: string) => `/users/${id}`,
    DETAILS: (id: string) => `/users/${id}`,
    LIST: '/users',
    SUBSCRIPTION_STATUS: '/users/subscription-status',
    UPDATE: (id: string) => `/users/${id}`,
    UPGRADE: '/users/upgrade',
  },

  // Venues management - Real API endpoints
  VENUES: {
    ADD_FAVORITE: '/venues/favorites',
    CREATE: '/venues',
    DELETE: (id: string) => `/venues/${id}`,
    DETAILS: (id: string) => `/venues/${id}`,
    FAVORITES: '/venues/favorites',
    IS_FAVORITE: (id: string) => `/venues/${id}/favorite`,
    LIST: '/venues',
    NEARBY: '/venues/nearby',
    POPULAR: '/venues/popular',
    REMOVE_FAVORITE: (id: string) => `/venues/favorites/${id}`,
    REVIEWS: (id: string) => `/venues/${id}/reviews`,
    REVIEWS_SUMMARY: (id: string) => `/venues/${id}/reviews/summary`,
    STATS: '/venues/stats',
    UPDATE: (id: string) => `/venues/${id}`,
  },
};
