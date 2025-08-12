module.exports = {
  // API Configuration
  API_BASE_URL: 'https://reservapp-web.vercel.app/api',
  API_TIMEOUT: 15000,
  
  // Environment
  NODE_ENV: 'production',
  DEBUG: false,
  
  // Logging
  LOG_LEVEL: 'error',
  ENABLE_FLIPPER: false,
  ENABLE_CONSOLE_LOGS: false,
  
  // Features
  ENABLE_DEV_MENU: false,
  ENABLE_FAST_REFRESH: false,
  ENABLE_HOT_RELOAD: false,
  
  // Redux
  REDUX_LOGGER: false,
  REDUX_DEVTOOLS: false,
  
  // Networking
  NETWORK_TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  
  // Storage
  ASYNC_STORAGE_PREFIX: 'reservapp_',
  CLEAR_STORAGE_ON_STARTUP: false,
  
  // Push Notifications (Production)
  PUSH_NOTIFICATIONS_ENABLED: true,
  FCM_SENDER_ID: 'production-sender-id',
  
  // Analytics
  ANALYTICS_ENABLED: true,
  CRASHLYTICS_ENABLED: true,
  
  // Security
  CERTIFICATE_PINNING: true,
  BIOMETRIC_AUTH_ENABLED: true,
  
  // Performance
  PERFORMANCE_MONITORING: true,
  BUNDLE_ANALYZER: false,
  
  // App Store Configuration
  CODE_PUSH_ENABLED: true,
  OVER_THE_AIR_UPDATES: true,
};
