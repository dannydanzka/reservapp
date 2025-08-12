module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
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
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
