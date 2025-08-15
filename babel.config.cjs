module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@modules': './src/modules',
          '@libs': './src/libs',
          '@api': './src/api',
          '@navigation': './src/navigation',
          '@assets': './src/libs/shared/assets',
          '@core': './src/libs/core',
          '@shared': './src/libs/shared',
          '@infrastructure': './src/libs/infrastructure',
          '@presentation': './src/libs/presentation',

          // Presentation layer
          '@components': './src/libs/presentation/components',
          '@screens': './src/libs/presentation/screens',
          '@hooks': './src/libs/presentation/hooks',
          '@providers': './src/libs/presentation/providers',
          '@layouts': './src/libs/presentation/layouts',
          '@styles': './src/libs/presentation/styles',

          // Infrastructure layer
          '@services': './src/libs/infrastructure/services',
          '@state': './src/libs/infrastructure/state',
          '@repositories': './src/libs/infrastructure/repositories',
          '@store': './src/libs/infrastructure/state',
          '@slices': './src/libs/infrastructure/state/slices',

          // Shared resources
          '@config': './src/libs/shared/config',
          '@types': './src/libs/shared/types',
          '@constants': './src/libs/shared/constants',
          '@utils': './src/libs/shared/utils',
          '@i18n': './src/libs/shared/i18n',

          // Core utils mapping
          '@core/utils': './src/libs/shared/utils',
          '@core/utils/classes': './src/libs/shared/utils/classes',

          // Core services
          '@auth': './src/libs/infrastructure/services/core/auth',
          '@http': './src/libs/infrastructure/services/core/http',

          // Modules
          '@mod-auth': './src/modules/mod-auth',
          '@mod-reservation': './src/modules/mod-reservation',
          '@mod-notification': './src/modules/mod-notification',
          '@mod-payments': './src/modules/mod-payments',
          '@mod-profile': './src/modules/mod-profile',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
