const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    alias: {
      // Capas principales de Clean Architecture
      '@libs': path.resolve(__dirname, './src/libs'),
      '@shared': path.resolve(__dirname, './src/libs/shared'),
      '@presentation': path.resolve(__dirname, './src/libs/presentation'),
      '@infrastructure': path.resolve(__dirname, './src/libs/infrastructure'),
      
      // Subcapas específicas
      '@components': path.resolve(__dirname, './src/libs/presentation/components'),
      '@screens': path.resolve(__dirname, './src/libs/presentation/screens'),
      '@hooks': path.resolve(__dirname, './src/libs/presentation/hooks'),
      '@providers': path.resolve(__dirname, './src/libs/presentation/providers'),
      '@layouts': path.resolve(__dirname, './src/libs/presentation/layouts'),
      '@styles': path.resolve(__dirname, './src/libs/presentation/styles'),
      
      // Infrastructure
      '@services': path.resolve(__dirname, './src/libs/infrastructure/services'),
      '@libs/services': path.resolve(__dirname, './src/libs/infrastructure/services'),
      '@state': path.resolve(__dirname, './src/libs/infrastructure/state'),
      '@repositories': path.resolve(__dirname, './src/libs/infrastructure/repositories'),
      '@store': path.resolve(__dirname, './src/libs/infrastructure/state'),
      '@slices': path.resolve(__dirname, './src/libs/infrastructure/state/slices'),
      
      // Shared Resources
      '@config': path.resolve(__dirname, './src/libs/shared/config'),
      '@types': path.resolve(__dirname, './src/libs/shared/types'),
      '@constants': path.resolve(__dirname, './src/libs/shared/constants'),
      '@utils': path.resolve(__dirname, './src/libs/shared/utils'),
      '@i18n': path.resolve(__dirname, './src/libs/shared/i18n'),
      '@assets': path.resolve(__dirname, './src/libs/shared/assets'),
      
      // Core Services
      '@core': path.resolve(__dirname, './src/libs/infrastructure/services/core'),
      '@auth': path.resolve(__dirname, './src/libs/infrastructure/services/core/auth'),
      '@http': path.resolve(__dirname, './src/libs/infrastructure/services/core/http'),
      
      // Modular Architecture
      '@modules': path.resolve(__dirname, './src/modules'),
      '@mod-auth': path.resolve(__dirname, './src/modules/mod-auth'),
      '@mod-booking': path.resolve(__dirname, './src/modules/mod-booking'),
      '@mod-notification': path.resolve(__dirname, './src/modules/mod-notification'),
      '@mod-payments': path.resolve(__dirname, './src/modules/mod-payments'),
      '@mod-profile': path.resolve(__dirname, './src/modules/mod-profile'),
      
      // Navigation & API
      '@navigation': path.resolve(__dirname, './src/navigation'),
      '@api': path.resolve(__dirname, './src/api'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
