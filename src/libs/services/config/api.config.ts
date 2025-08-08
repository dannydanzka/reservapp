export const API_CONFIG = {
  // URLs de desarrollo y producción
  BASE_URL: __DEV__ 
    ? 'http://localhost:3000/api'  // URL de desarrollo (ReservApp Web)
    : 'https://api.reservapp.com/api', // URL de producción
  TIMEOUT: 30000, // 30 segundos
  VERSION: 'v1',
  
  // Headers por defecto
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    REFRESH: '/auth/refresh',
    VERIFY_TOKEN: '/auth/verify-token',
  },
  BOOKINGS: {
    GET_BOOKINGS: '/bookings',
    CREATE_BOOKING: '/bookings',
    GET_BOOKING: '/bookings/{id}',
    UPDATE_BOOKING: '/bookings/{id}',
    DELETE_BOOKING: '/bookings/{id}',
    CANCEL_BOOKING: '/bookings/{id}/cancel',
  },
  SERVICES: {
    GET_SERVICES: '/services',
    GET_SERVICE: '/services/{id}',
    CREATE_SERVICE: '/services',
    UPDATE_SERVICE: '/services/{id}',
    DELETE_SERVICE: '/services/{id}',
  },
  VENUES: {
    GET_VENUES: '/venues',
    GET_VENUE: '/venues/{id}',
    GET_VENUES_BY_CATEGORY: '/venues/category/{category}',
    SEARCH_VENUES: '/venues/search',
  },
  USERS: {
    GET_USERS: '/users',
    GET_USER: '/users/{id}',
    UPDATE_USER: '/users/{id}',
    DELETE_USER: '/users/{id}',
  },
  DASHBOARD: {
    GET_STATS: '/dashboard/stats',
    GET_RECENT_BOOKINGS: '/dashboard/recent-bookings',
    GET_REVENUE: '/dashboard/revenue',
  }
};