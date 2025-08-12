export const FONT_SCALES = {
  extraLarge: 1.3,
  large: 1.15,
  medium: 1.0,
  small: 0.85,
} as const;

export const LANGUAGES = {
  EN: 'en',
  ES: 'es',
} as const;

export const TOAST_TYPES = {
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@ReservApp:authToken',
  FONT_SCALE: '@ReservApp:fontScale',
  LANGUAGE: '@ReservApp:language',
  ONBOARDING_COMPLETED: '@ReservApp:onboardingCompleted',
  THEME: '@ReservApp:theme',
  USER_DATA: '@ReservApp:userData',
} as const;

export const BOOKING_STATUSES = {
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  CONFIRMED: 'confirmed',
  NO_SHOW: 'no-show',
  PENDING: 'pending',
} as const;

export const NOTIFICATION_TYPES = {
  PAYMENT: 'payment',
  PROMOTION: 'promotion',
  RESERVATION: 'reservation',
  SYSTEM: 'system',
} as const;
