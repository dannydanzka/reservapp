const packageJson = require('./package.json');

export default {
  expo: {
    name: 'ReservApp',
    slug: 'reservapp-mobile',
    version: packageJson.version,
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.reservapp.mobile',
      buildNumber: '1',
      infoPlist: {
        NSCameraUsageDescription:
          'Esta aplicación necesita acceso a la cámara para tomar fotos de perfil.',
        NSPhotoLibraryUsageDescription:
          'Esta aplicación necesita acceso a la galería para seleccionar fotos de perfil.',
        NSLocationWhenInUseUsageDescription:
          'Esta aplicación necesita acceso a tu ubicación para encontrar venues cercanos.',
        CFBundleDisplayName: 'ReservApp',
        CFBundleName: 'ReservApp',
      },
      associatedDomains: ['applinks:reservapp-web.vercel.app'],
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.reservapp.mobile',
      versionCode: 1,
      permissions: [
        'CAMERA',
        'READ_EXTERNAL_STORAGE',
        'WRITE_EXTERNAL_STORAGE',
        'ACCESS_FINE_LOCATION',
        'ACCESS_COARSE_LOCATION',
        'VIBRATE',
        'INTERNET',
      ],
      intentFilters: [
        {
          action: 'VIEW',
          autoVerify: true,
          data: [
            {
              scheme: 'https',
              host: 'reservapp-web.vercel.app',
            },
          ],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    plugins: [
      [
        'expo-font',
        {
          fonts: ['./assets/fonts/Inter.ttf'],
        },
      ],
      'expo-localization',
      [
        'expo-build-properties',
        {
          ios: {
            newArchEnabled: false,
          },
          android: {
            newArchEnabled: false,
          },
        },
      ],
    ],
    extra: {
      eas: {
        projectId: 'your-project-id-here',
      },
    },
    scheme: 'reservapp',
  },
};
