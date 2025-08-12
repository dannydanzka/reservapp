/**
 * API Constants and Configuration for ReservApp Mobile
 * Connects to ReservApp-Web backend API
 */

// Environment-based configuration
export const API_CONFIG = {
  // Current base URL (will switch based on __DEV__ or env)
  get BASE_URL() {
    if (__DEV__) {
      // During development, try localhost first, fallback to production
      return this.DEVELOPMENT_URL;
    }
    return this.PRODUCTION_URL;
  },

  DEVELOPMENT_URL: 'http://localhost:3000/api',

  // Base URLs for different environments
  PRODUCTION_URL: 'https://reservapp-web.vercel.app/api',

  // 30 seconds
  RETRY_ATTEMPTS: 3,

  RETRY_DELAY: 1000,
  // Request configuration
  TIMEOUT: 30000, // 1 second
} as const;

// API Endpoints organized by service
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    CHANGE_PASSWORD: '/auth/change-password',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    REGISTER: '/auth/register',
  },

  // Notifications system
  NOTIFICATIONS: {
    DETAILS: (id: string) => `/notifications/${id}`,
    LIST: '/notifications',
    MARK_ALL_READ: '/notifications/mark-all-read',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    UNREAD_COUNT: '/notifications/unread-count',
  },

  // Payments
  PAYMENTS: {
    CREATE_INTENT: '/payments/create-intent',
    DETAILS: (id: string) => `/payments/${id}`,
    CONFIRM: '/payments/confirm',
    LIST: '/payments',
    CUSTOMERS: '/payments/customers',
    RECEIPT: (id: string) => `/payments/${id}/receipt`,
    CUSTOMER_DETAILS: (id: string) => `/payments/customers/${id}`,
    REFUND_PAYMENT: (id: string) => `/payments/${id}/refund`,
    REFUND: '/payments/refund',
    STATS: '/payments/stats',
    SUBSCRIPTION: '/payments/subscription',
    WEBHOOK: '/payments/webhook',
  },

  // Reservations management
  RESERVATIONS: {
    CREATE: '/reservations',
    CANCEL: (id: string) => `/reservations/${id}/cancel`,
    DELETE: (id: string) => `/reservations/${id}`,
    CHECKIN: (id: string) => `/reservations/${id}/checkin`,
    DETAILS: (id: string) => `/reservations/${id}`,
    CHECKOUT: (id: string) => `/reservations/${id}/checkout`,
    LIST: '/reservations',
    UPDATE: (id: string) => `/reservations/${id}`,
  },

  // Public API (no authentication required)
  PUBLIC: {
    SERVICES: '/public/services',
    VENUES: '/public/venues',
  },

  // Reviews & ratings
  REVIEWS: {
    CREATE: '/reviews',
    DELETE: (id: string) => `/reviews/${id}`,
    DETAILS: (id: string) => `/reviews/${id}`,
    LIST: '/reviews',
    UPDATE: (id: string) => `/reviews/${id}`,
  },

  // Email services
  EMAILS: {
    CHECKIN_REMINDER: '/emails/checkin-reminder',
    PAYMENT_CONFIRMATION: '/emails/payment-confirmation',
    RESERVATION_CANCELLATION: '/emails/reservation-cancellation',
    RESERVATION_CONFIRMATION: '/emails/reservation-confirmation',
    SEND: '/emails/send',
  },
  // Services catalog
  SERVICES: {
    CREATE: '/services',
    DETAILS: (id: string) => `/services/${id}`,
    DELETE: (id: string) => `/services/${id}`,
    LIST: '/services',
    AVAILABLE: '/services/available',
    REVIEWS: (id: string) => `/services/${id}/reviews`,
    UPDATE: (id: string) => `/services/${id}`,
    REVIEWS_SUMMARY: (id: string) => `/services/${id}/reviews/summary`,
  },

  // Health check
  HEALTH: '/health',

  // User settings
  SETTINGS: {
    NOTIFICATIONS: '/settings/notifications',
    PROFILE: '/settings/profile',
  },

  // Venues management
  VENUES: {
    CREATE: '/venues',
    LIST: '/venues',
    DETAILS: (id: string) => `/venues/${id}`,
    DELETE: (id: string) => `/venues/${id}`,
    UPDATE: (id: string) => `/venues/${id}`,
    NEARBY: '/venues/nearby',
    POPULAR: '/venues/popular',
    REVIEWS: (id: string) => `/venues/${id}/reviews`,
    STATS: '/venues/stats',
    REVIEWS_SUMMARY: (id: string) => `/venues/${id}/reviews/summary`,
    VENUE_STATS: (id: string) => `/venues/${id}/stats`,
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
    SUBSCRIPTION_STATUS: '/users/subscription-status',
    UPDATE: (id: string) => `/users/${id}`,
    UPGRADE: '/users/upgrade',
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

export default {
  API_CONFIG,
  API_ENDPOINTS,
  API_ERROR_CODES,
  CACHE_CONFIG,
  HEADERS,
  HTTP_STATUS,
  PAGINATION,
  QUERY_PARAMS,
};
