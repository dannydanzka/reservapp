#!/usr/bin/env node

/**
 * Script para generar iconos de la app para iOS y Android
 *
 * Uso:
 * 1. Coloca tu icono base (1024x1024 PNG) en ./assets/app-icon.png
 * 2. Ejecuta: node scripts/generate-icons.js
 *
 * Requiere: sharp (npm install sharp)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuración de tamaños de iconos
const iconSizes = {
  android: [
    // mipmap-mdpi
    { density: 'mdpi', filename: 'ic_launcher.png', size: 48 },
    { density: 'mdpi', filename: 'ic_launcher_round.png', round: true, size: 48 },
    { density: 'mdpi', filename: 'ic_launcher_foreground.png', size: 48 },

    // mipmap-hdpi
    { density: 'hdpi', filename: 'ic_launcher.png', size: 72 },
    { density: 'hdpi', filename: 'ic_launcher_round.png', round: true, size: 72 },
    { density: 'hdpi', filename: 'ic_launcher_foreground.png', size: 72 },

    // mipmap-xhdpi
    { density: 'xhdpi', filename: 'ic_launcher.png', size: 96 },
    { density: 'xhdpi', filename: 'ic_launcher_round.png', round: true, size: 96 },
    { density: 'xhdpi', filename: 'ic_launcher_foreground.png', size: 96 },

    // mipmap-xxhdpi
    { density: 'xxhdpi', filename: 'ic_launcher.png', size: 144 },
    { density: 'xxhdpi', filename: 'ic_launcher_round.png', round: true, size: 144 },
    { density: 'xxhdpi', filename: 'ic_launcher_foreground.png', size: 144 },

    // mipmap-xxxhdpi
    { density: 'xxxhdpi', filename: 'ic_launcher.png', size: 192 },
    { density: 'xxxhdpi', filename: 'ic_launcher_round.png', round: true, size: 192 },
    { density: 'xxxhdpi', filename: 'ic_launcher_foreground.png', size: 192 },
  ],
  ios: [
    // App Icon
    { filename: 'AppIcon-20x20@1x.png', scale: 1, size: 20 },
    { filename: 'AppIcon-20x20@2x.png', scale: 2, size: 20 },
    { filename: 'AppIcon-20x20@3x.png', scale: 3, size: 20 },
    { filename: 'AppIcon-29x29@1x.png', scale: 1, size: 29 },
    { filename: 'AppIcon-29x29@2x.png', scale: 2, size: 29 },
    { filename: 'AppIcon-29x29@3x.png', scale: 3, size: 29 },
    { filename: 'AppIcon-40x40@1x.png', scale: 1, size: 40 },
    { filename: 'AppIcon-40x40@2x.png', scale: 2, size: 40 },
    { filename: 'AppIcon-40x40@3x.png', scale: 3, size: 40 },
    { filename: 'AppIcon-60x60@2x.png', scale: 2, size: 60 },
    { filename: 'AppIcon-60x60@3x.png', scale: 3, size: 60 },
    { filename: 'AppIcon-76x76@1x.png', scale: 1, size: 76 },
    { filename: 'AppIcon-76x76@2x.png', scale: 2, size: 76 },
    { filename: 'AppIcon-83.5x83.5@2x.png', scale: 2, size: 83.5 },
    { filename: 'AppIcon-1024x1024@1x.png', scale: 1, size: 1024 },
  ],
};

const sourceIcon = './assets/app-icon.png';
const iosOutputDir = './ios/ReservApp/Images.xcassets/AppIcon.appiconset';
const androidOutputDir = './android/app/src/main/res';

async function generateIcons() {
  // Verificar que existe el icono fuente
  if (!fs.existsSync(sourceIcon)) {
    console.error('❌ No se encontró el icono fuente en ./assets/app-icon.png');
    console.log('📝 Por favor, coloca tu icono de 1024x1024 PNG en esa ubicación');
    return;
  }

  console.log('🚀 Generando iconos de la aplicación...');

  // Generar iconos para iOS
  console.log('📱 Generando iconos para iOS...');
  if (!fs.existsSync(iosOutputDir)) {
    fs.mkdirSync(iosOutputDir, { recursive: true });
  }

  for (const icon of iconSizes.ios) {
    const size = Math.round(icon.size * icon.scale);
    const outputPath = path.join(iosOutputDir, icon.filename);

    await sharp(sourceIcon)
      .resize(size, size, { background: { alpha: 0, b: 255, g: 255, r: 255 }, fit: 'contain' })
      .png()
      .toFile(outputPath);

    console.log(`✅ ${icon.filename} (${size}x${size})`);
  }

  // Generar Contents.json para iOS
  const contentsJson = {
    images: iconSizes.ios.map((icon) => ({
      filename: icon.filename,
      idiom: icon.size >= 76 ? 'ipad' : 'iphone',
      scale: `${icon.scale}x`,
      size: `${icon.size}x${icon.size}`,
    })),
    info: {
      author: 'react-native-cli',
      version: 1,
    },
  };

  fs.writeFileSync(path.join(iosOutputDir, 'Contents.json'), JSON.stringify(contentsJson, null, 2));

  // Generar iconos para Android
  console.log('🤖 Generando iconos para Android...');

  for (const icon of iconSizes.android) {
    const densityDir = path.join(androidOutputDir, `mipmap-${icon.density}`);
    if (!fs.existsSync(densityDir)) {
      fs.mkdirSync(densityDir, { recursive: true });
    }

    const outputPath = path.join(densityDir, icon.filename);
    let sharpInstance = sharp(sourceIcon).resize(icon.size, icon.size);

    // Para iconos redondos
    if (icon.round) {
      const roundMask = Buffer.from(
        `<svg><defs><clipPath id="clip"><circle cx="${icon.size / 2}" cy="${icon.size / 2}" r="${
          icon.size / 2
        }"/></clipPath></defs><rect x="0" y="0" width="${icon.size}" height="${
          icon.size
        }" clip-path="url(#clip)" fill="white"/></svg>`
      );
      sharpInstance = sharpInstance.composite([{ blend: 'dest-in', input: roundMask }]);
    }

    await sharpInstance.png().toFile(outputPath);
    console.log(`✅ ${icon.density}/${icon.filename} (${icon.size}x${icon.size})`);
  }

  // Generar fondo adaptable para Android (ic_launcher_background.xml)
  const adaptiveBackground = `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
  <path android:fillColor="#FFFFFF"
        android:pathData="M0,0h108v108h-108z"/>
  <path android:fillColor="#E1F5FE"
        android:pathData="M9,0h90a9,9 0,0 1,9 9v90a9,9 0,0 1,-9 9H9a9,9 0,0 1,-9 -9V9A9,9 0,0 1,9 0z"/>
</vector>`;

  const drawableDir = path.join(androidOutputDir, 'drawable');
  if (!fs.existsSync(drawableDir)) {
    fs.mkdirSync(drawableDir, { recursive: true });
  }

  fs.writeFileSync(path.join(drawableDir, 'ic_launcher_background.xml'), adaptiveBackground);

  console.log('✅ ic_launcher_background.xml');

  console.log('\n🎉 ¡Iconos generados exitosamente!');
  console.log('\n📋 Próximos pasos:');
  console.log('1. Para iOS: Los iconos se han agregado automáticamente');
  console.log('2. Para Android: Los iconos se han agregado a las carpetas mipmap');
  console.log('3. Reconstruye tu app: npx react-native run-ios / npx react-native run-android');
  console.log(
    '\n💡 Tip: Asegúrate de que tu icono original tenga fondo transparente para mejores resultados'
  );
}

// Verificar si Sharp está instalado
try {
  require('sharp');
  generateIcons().catch(console.error);
} catch (error) {
  console.error('❌ Sharp no está instalado. Instálalo con: npm install sharp --save-dev');
  console.log('📦 También puedes usar yarn: yarn add --dev sharp');
}
