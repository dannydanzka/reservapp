module.exports = {
  // API Configuration
  API_BASE_URL: 'https://reservapp-web.vercel.app/api',
  API_TIMEOUT: 10000,
  
  // Environment
  NODE_ENV: 'development',
  DEBUG: true,
  
  // Logging
  LOG_LEVEL: 'debug',
  ENABLE_FLIPPER: true,
  ENABLE_CONSOLE_LOGS: true,
  
  // Features
  ENABLE_DEV_MENU: true,
  ENABLE_FAST_REFRESH: true,
  ENABLE_HOT_RELOAD: true,
  
  // Redux
  REDUX_LOGGER: true,
  REDUX_DEVTOOLS: true,
  
  // Networking
  NETWORK_TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  
  // Storage
  ASYNC_STORAGE_PREFIX: 'reservapp_dev_',
  CLEAR_STORAGE_ON_STARTUP: false,
  
  // Push Notifications (Development)
  PUSH_NOTIFICATIONS_ENABLED: true,
  FCM_SENDER_ID: 'development-sender-id',
  
  // Analytics
  ANALYTICS_ENABLED: false,
  CRASHLYTICS_ENABLED: false,
  
  // Security
  CERTIFICATE_PINNING: false,
  BIOMETRIC_AUTH_ENABLED: false,
  
  // Performance
  PERFORMANCE_MONITORING: true,
  BUNDLE_ANALYZER: false,
};
