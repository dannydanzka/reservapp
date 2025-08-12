import { AppConfig } from '@shared/types';

const developmentConfig: AppConfig = {
  API_TIMEOUT: 15000,
  AUTH_API: {
    ENDPOINTS: {
      FORGOT_PASSWORD: '/forgot-password',
      GET_PROFILE: '/profile',
      LOGIN: '/login',
      LOGOUT: '/logout',
      REFRESH_TOKEN: '/refresh-token',
      REGISTER: '/register',
      UPDATE_PROFILE: '/profile/update',
      VERIFY_TOKEN: '/verify-token',
    },
    URL: 'http://localhost:3001/api/auth',
  },
  BOOKING_API: {
    ENDPOINTS: {
      CANCEL_BOOKING: '/bookings/{id}/cancel',
      CREATE_BOOKING: '/bookings',
      GET_AVAILABILITY: '/availability',
      GET_BOOKINGS: '/bookings',
      GET_BOOKING_DETAILS: '/bookings/{id}',
      GET_SERVICES: '/services',
      GET_SERVICE_DETAILS: '/services/{id}',
    },
    URL: 'http://localhost:3001/api/booking',
  },
  DEBUG: true,
  ENVIRONMENT: 'development',
  PAYMENT_API: {
    ENDPOINTS: {
      GET_PAYMENT_HISTORY: '/history',
      GET_PAYMENT_METHODS: '/methods',
      PROCESS_PAYMENT: '/process',
    },
    URL: 'http://localhost:3001/api/payment',
  },
  VENUE_API: {
    ENDPOINTS: {
      GET_VENUES: '/venues',
      GET_VENUES_BY_CATEGORY: '/venues/category/{category}',
      GET_VENUE_DETAILS: '/venues/{id}',
      SEARCH_VENUES: '/venues/search',
    },
    URL: 'http://localhost:3001/api/venue',
  },
};

export default developmentConfig;
