module.exports = {
  // iOS App Store Configuration
  ios: {
    bundleId: 'com.utj.reservapp',
    displayName: 'ReservApp',
    version: '1.0.0',
    buildNumber: '1',
    
    // App Store Connect
    teamId: 'YOUR_TEAM_ID',
    appleId: 'YOUR_APPLE_ID',
    
    // Signing
    codeSigningIdentity: 'iPhone Distribution',
    provisioningProfileSpecifier: 'ReservApp Distribution',
    
    // Capabilities
    capabilities: {
      pushNotifications: true,
      backgroundModes: ['fetch', 'remote-notification'],
      associatedDomains: ['applinks:reservapp-web.vercel.app'],
    },
    
    // Build Settings
    buildSettings: {
      ENABLE_BITCODE: true,
      STRIP_SWIFT_SYMBOLS: true,
      DEPLOYMENT_TARGET: '13.0',
    },
    
    // App Store Metadata
    metadata: {
      category: 'LIFESTYLE',
      contentRating: '4+',
      keywords: ['reservations', 'reservation', 'restaurant', 'hotel', 'events'],
      subtitle: 'Your Reservation Assistant',
      description: 'Book restaurants, hotels, and events with ease',
    },
  },
  
  // Google Play Store Configuration
  android: {
    packageName: 'com.utj.reservapp',
    versionName: '1.0.0',
    versionCode: 1,
    
    // Signing
    signingConfigs: {
      release: {
        storeFile: 'android/app/release.keystore',
        keyAlias: 'reservapp-key-alias',
        storePassword: process.env.ANDROID_STORE_PASSWORD,
        keyPassword: process.env.ANDROID_KEY_PASSWORD,
      },
    },
    
    // Build Types
    buildTypes: {
      release: {
        minifyEnabled: true,
        proguardFiles: ['proguard-android-optimize.txt', 'proguard-rules.pro'],
        signingConfig: 'signingConfigs.release',
      },
    },
    
    // SDK Versions
    compileSdkVersion: 34,
    targetSdkVersion: 34,
    minSdkVersion: 21,
    
    // Permissions
    permissions: [
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
      'android.permission.VIBRATE',
      'android.permission.RECEIVE_BOOT_COMPLETED',
      'android.permission.WAKE_LOCK',
    ],
    
    // Play Store Metadata
    metadata: {
      category: 'LIFESTYLE',
      contentRating: 'Everyone',
      tags: ['reservations', 'reservation', 'restaurant', 'hotel', 'events'],
      shortDescription: 'Your Reservation Assistant',
      fullDescription: 'Book restaurants, hotels, and events with ease using ReservApp',
    },
  },
};
