// Environment-based configuration
export const API_CONFIG = {
  BASE_URL: 'https://reservapp-web.vercel.app/api',
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  TIMEOUT: 30000,
} as const;

// Headers
export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
} as const;

// API Endpoints organized by service - CONSOLIDATED VERSION
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    CHANGE_PASSWORD: '/auth/change-password',
    DASHBOARD: '/mobile/user/dashboard',
    FORGOT_PASSWORD: '/auth/forgot-password',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Email services
  EMAILS: {
    CHECKIN_REMINDER: '/emails/checkin-reminder',
    PAYMENT_CONFIRMATION: '/emails/payment-confirmation',
    RESERVATION_CANCELLATION: '/emails/reservation-cancellation',
    RESERVATION_CONFIRMATION: '/emails/reservation-confirmation',
    SEND: '/emails/send',
  },

  // Health check
  HEALTH: '/health',

  // Notifications system
  NOTIFICATIONS: {
    DETAILS: (id: string) => `/notifications/${id}`,
    LIST: '/notifications',
    MARK_ALL_READ: '/notifications/mark-all-read',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    SETTINGS: '/notifications/settings',
    UNREAD_COUNT: '/notifications/unread-count',
  },

  // Payments
  PAYMENTS: {
    CONFIRM: '/payments/confirm',
    CONFIRM_PAYMENT: '/payments/confirm',
    CREATE_INTENT: '/payments/create-intent',
    CUSTOMERS: '/payments/customers',
    CUSTOMER_DETAILS: (id: string) => `/payments/customers/${id}`,
    DETAILS: (id: string) => `/payments/${id}`,
    HISTORY: '/payments/history',
    INTENT: '/payments/intent',
    LIST: '/payments',
    METHODS: '/payments/methods',
    PAYMENT_METHODS: '/payments/methods',
    RECEIPT: (id: string) => `/payments/${id}/receipt`,
    REFUND: '/payments/refund',
    REFUND_PAYMENT: (id: string) => `/payments/${id}/refund`,
    STATS: '/payments/stats',
    SUBSCRIPTION: '/payments/subscription',
    SUBSCRIPTIONS: '/payments/subscriptions',
    WEBHOOK: '/payments/webhook',
  },

  // Public API (no authentication required)
  PUBLIC: {
    SERVICES: '/public/services',
    VENUES: '/public/venues',
  },

  // Reservations management
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

  // Reviews & ratings
  REVIEWS: {
    CREATE: '/reviews',
    DELETE: (id: string) => `/reviews/${id}`,
    DETAILS: (id: string) => `/reviews/${id}`,
    LIST: '/reviews',
    UPDATE: (id: string) => `/reviews/${id}`,
  },

  // Services catalog
  SERVICES: {
    AVAILABLE: '/services/available',
    BY_CATEGORY: '/services/by-category',
    BY_VENUE: '/services/by-venue',
    CREATE: '/services',
    DELETE: (id: string) => `/services/${id}`,
    DETAILS: (id: string) => `/services/${id}`,
    LIST: '/services',
    REVIEWS: (id: string) => `/services/${id}/reviews`,
    REVIEWS_SUMMARY: (id: string) => `/services/${id}/reviews/summary`,
    UPDATE: (id: string) => `/services/${id}`,
  },

  // User settings
  SETTINGS: {
    NOTIFICATIONS: '/settings/notifications',
    PROFILE: '/settings/profile',
  },

  // File upload
  UPLOAD: {
    IMAGE: '/upload/image',
    IMAGES: '/upload/images',
  },

  // User management
  USERS: {
    CREATE: '/users',
    DELETE: (id: string) => `/users/${id}`,
    DETAILS: (id: string) => `/users/${id}`,
    LIST: '/users',
    PROFILE: '/users/profile',
    SETTINGS: '/users/settings',
    SUBSCRIPTION_STATUS: '/users/subscription-status',
    UPDATE: (id: string) => `/users/${id}`,
    UPDATE_PROFILE: '/users/profile',
    UPGRADE: '/users/upgrade',
  },

  // Venues management
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
    REMOVE_FAVORITE: (id: string) => `/venues/${id}/favorite`,
    REVIEWS: (id: string) => `/venues/${id}/reviews`,
    REVIEWS_SUMMARY: (id: string) => `/venues/${id}/reviews/summary`,
    SEARCH: '/venues/search',
    STATS: '/venues/stats',
    UPDATE: (id: string) => `/venues/${id}`,
    VENUE_STATS: (id: string) => `/venues/${id}/stats`,
  },
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  CONFLICT: 409,
  CREATED: 201,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
  NO_CONTENT: 204,
  OK: 200,
  SERVICE_UNAVAILABLE: 503,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
} as const;

// Error codes from backend
export const API_ERROR_CODES = {
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
} as const;

// Request headers
export const HEADERS = {
  AUTHORIZATION: 'Authorization',
  BEARER: 'Bearer',
  CONTENT_TYPE_JSON: 'application/json',
} as const;

// Common query parameters
export const QUERY_PARAMS = {
  CATEGORY: 'category',
  CITY: 'city',
  DATE_FROM: 'dateFrom',
  DATE_TO: 'dateTo',
  INCLUDE_DETAILS: 'includeDetails',
  IS_ACTIVE: 'isActive',
  LIMIT: 'limit',
  MAX_PRICE: 'maxPrice',
  MIN_PRICE: 'minPrice',
  PAGE: 'page',
  RATING: 'rating',
  SEARCH: 'search',
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  DEFAULT_PAGE: 1,
  MAX_LIMIT: 100,
} as const;

// Cache configuration
export const CACHE_CONFIG = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
  LONG_TTL: 60 * 60 * 1000, // 1 hour
  SHORT_TTL: 1 * 60 * 1000, // 1 minute
} as const;
