import { AppConfig } from './types';

const developmentConfig: AppConfig = {
  DEBUG: true,
  ENVIRONMENT: 'development',
  API_TIMEOUT: 15000,
  AUTH_API: {
    URL: 'http://localhost:3001/api/auth',
    ENDPOINTS: {
      LOGIN: '/login',
      REGISTER: '/register',
      LOGOUT: '/logout',
      FORGOT_PASSWORD: '/forgot-password',
      VERIFY_TOKEN: '/verify-token',
      REFRESH_TOKEN: '/refresh-token',
      GET_PROFILE: '/profile',
      UPDATE_PROFILE: '/profile/update',
    },
  },
  BOOKING_API: {
    URL: 'http://localhost:3001/api/booking',
    ENDPOINTS: {
      GET_SERVICES: '/services',
      GET_SERVICE_DETAILS: '/services/{id}',
      CREATE_BOOKING: '/bookings',
      GET_BOOKINGS: '/bookings',
      GET_BOOKING_DETAILS: '/bookings/{id}',
      CANCEL_BOOKING: '/bookings/{id}/cancel',
      GET_AVAILABILITY: '/availability',
    },
  },
  VENUE_API: {
    URL: 'http://localhost:3001/api/venue',
    ENDPOINTS: {
      GET_VENUES: '/venues',
      GET_VENUE_DETAILS: '/venues/{id}',
      GET_VENUES_BY_CATEGORY: '/venues/category/{category}',
      SEARCH_VENUES: '/venues/search',
    },
  },
  PAYMENT_API: {
    URL: 'http://localhost:3001/api/payment',
    ENDPOINTS: {
      PROCESS_PAYMENT: '/process',
      GET_PAYMENT_METHODS: '/methods',
      GET_PAYMENT_HISTORY: '/history',
    },
  },
};

export default developmentConfig;