export const APP_CONFIG = {
  // UI Configuration
  ANIMATION_DURATION: 300,

  APP_NAME: 'ReservApp Mobile',

  // 24 hours
  AUTO_LOGOUT_WARNING: 5 * 60 * 1000,
  DEFAULT_FONT_SCALE: 'medium' as const,
  // Default user preferences
  DEFAULT_LANGUAGE: 'en' as const,

  // Pagination
  DEFAULT_PAGE_SIZE: 20,

  MAX_FILE_SIZE: 5 * 1024 * 1024,
  // 5MB
  // Reservation
  MAX_GUESTS: 20,

  MAX_PAGE_SIZE: 50,
  MAX_RESERVATION_ADVANCE_DAYS: 90,

  // 5 minutes before logout
  // Validation
  MIN_PASSWORD_LENGTH: 8,

  MIN_RESERVATION_ADVANCE_HOURS: 2,

  // Session
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000,

  TOAST_DURATION: 3000,

  VERSION: '1.0.0',
} as const;
