export const API_CONFIG = {
  BASE_URL: 'https://reservapp-web.vercel.app/api',

  // Headers
  DEFAULT_HEADERS: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },

  // Endpoints
  ENDPOINTS: {
    // Auth
    AUTH: {
      CHANGE_PASSWORD: '/auth/change-password',
      FORGOT_PASSWORD: '/auth/forgot-password',
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      REGISTER: '/auth/register',
      RESET_PASSWORD: '/auth/reset-password',
    },

    // Notifications
    NOTIFICATIONS: {
      LIST: '/notifications',
      MARK_ALL_READ: '/notifications/mark-all-read',
      MARK_READ: '/notifications/mark-read',
      SETTINGS: '/notifications/settings',
      UNREAD_COUNT: '/notifications/unread-count',
    },

    // Payments
    PAYMENTS: {
      CONFIRM: '/payments/confirm',
      HISTORY: '/payments/history',
      INTENT: '/payments/intent',
      METHODS: '/payments/methods',
    },

    // Reservations
    RESERVATIONS: {
      CANCEL: '/reservations',
      CREATE: '/reservations',
      DETAILS: '/reservations',
      LIST: '/reservations',
      UPDATE: '/reservations',
    },

    // Services
    SERVICES: {
      BY_CATEGORY: '/services/by-category',
      BY_VENUE: '/services/by-venue',
      LIST: '/services',
    },

    // User
    USER: {
      PROFILE: '/users/profile',
      SETTINGS: '/users/settings',
      UPDATE_PROFILE: '/users/profile',
    },

    // Venues
    VENUES: {
      DETAILS: '/venues',
      FAVORITES: '/venues/favorites',
      LIST: '/venues',
      SEARCH: '/venues/search',
    },
  },

  TIMEOUT: 10000,
} as const;
