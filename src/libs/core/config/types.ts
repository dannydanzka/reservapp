export interface AuthApiConfig {
  URL: string;
  ENDPOINTS: {
    LOGIN: string;
    REGISTER: string;
    LOGOUT: string;
    FORGOT_PASSWORD: string;
    VERIFY_TOKEN: string;
    REFRESH_TOKEN: string;
    GET_PROFILE: string;
    UPDATE_PROFILE: string;
  };
}

export interface BookingApiConfig {
  URL: string;
  ENDPOINTS: {
    GET_SERVICES: string;
    GET_SERVICE_DETAILS: string;
    CREATE_BOOKING: string;
    GET_BOOKINGS: string;
    GET_BOOKING_DETAILS: string;
    CANCEL_BOOKING: string;
    GET_AVAILABILITY: string;
  };
}

export interface VenueApiConfig {
  URL: string;
  ENDPOINTS: {
    GET_VENUES: string;
    GET_VENUE_DETAILS: string;
    GET_VENUES_BY_CATEGORY: string;
    SEARCH_VENUES: string;
  };
}

export interface PaymentApiConfig {
  URL: string;
  ENDPOINTS: {
    PROCESS_PAYMENT: string;
    GET_PAYMENT_METHODS: string;
    GET_PAYMENT_HISTORY: string;
  };
}

export interface AppConfig {
  DEBUG: boolean;
  ENVIRONMENT: string;
  API_TIMEOUT: number;
  AUTH_API: AuthApiConfig;
  BOOKING_API: BookingApiConfig;
  VENUE_API: VenueApiConfig;
  PAYMENT_API: PaymentApiConfig;
}