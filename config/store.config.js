// Store configuration for App Store and Google Play Store
export default {
  appStore: {
    // App Information
    name: 'ReservApp',
    subtitle: 'Reserva fácilmente en restaurantes, spas y más',
    description: `ReservApp es tu compañero perfecto para descubrir y reservar en los mejores venues de tu ciudad.

🏨 DESCUBRE VENUES
• Explora restaurantes, spas, hoteles y espacios para eventos
• Filtra por categoría, ubicación y precio
• Ve fotos, reseñas y detalles completos
• Guarda tus favoritos para acceso rápido

📅 RESERVA FÁCILMENTE  
• Sistema de reservas paso a paso
• Selecciona fecha, hora y número de personas
• Agrega notas especiales y preferencias
• Confirmación instantánea

💳 PAGOS SEGUROS
• Gestión segura de métodos de pago
• Integración con Stripe para máxima seguridad
• Historial completo de transacciones
• Soporte para múltiples tarjetas

🔔 MANTENTE INFORMADO
• Notificaciones de confirmaciones y recordatorios
• Actualizaciones sobre tus reservas
• Promociones especiales de venues
• Historial completo de notificaciones

👤 PERFIL PERSONALIZADO
• Gestiona tu información personal
• Configura preferencias de idioma
• Ajusta el tamaño de fuente para mejor accesibilidad
• Control total de notificaciones

ReservApp hace que reservar sea simple, rápido y confiable. ¡Descarga ahora y comienza a disfrutar de increíbles experiencias!`,

    // Keywords
    keywords: [
      'reservas',
      'restaurantes',
      'spa',
      'hoteles',
      'eventos',
      'reservaciones',
      'reservation',
      'venues',
      'comida',
      'entretenimiento',
    ],

    // Categories
    primaryCategory: 'LIFESTYLE',
    secondaryCategory: 'FOOD_AND_DRINK',

    // Age Rating
    contentRating: '4+',

    // Screenshots (you'll need to provide these)
    screenshots: {
      iPhone: [
        // 6.7" iPhone (iPhone 14 Pro Max, 13 Pro Max, 12 Pro Max)
        './assets/screenshots/iphone-6.7/1-home.png',
        './assets/screenshots/iphone-6.7/2-discover.png',
        './assets/screenshots/iphone-6.7/3-venue-details.png',
        './assets/screenshots/iphone-6.7/4-reservation-flow.png',
        './assets/screenshots/iphone-6.7/5-profile.png',
      ],
      iPad: [
        // 12.9" iPad Pro
        './assets/screenshots/ipad-12.9/1-home.png',
        './assets/screenshots/ipad-12.9/2-discover.png',
        './assets/screenshots/ipad-12.9/3-venue-details.png',
      ],
    },

    // App Preview Videos (optional)
    appPreview: {
      iPhone: './assets/preview/iphone-preview.mov',
      iPad: './assets/preview/ipad-preview.mov',
    },
  },

  googlePlay: {
    // App Information
    title: 'ReservApp - Reservas Fáciles',
    shortDescription:
      'Descubre y reserva en restaurantes, spas, hoteles y más. ¡Reserva fácil y seguro!',
    fullDescription: `🌟 RESERVAPP - TU COMPAÑERO PARA RESERVAS PERFECTAS

ReservApp es la aplicación definitiva para descubrir y reservar en los mejores venues de tu ciudad. Desde restaurantes exclusivos hasta spas relajantes, encuentra y reserva experiencias increíbles en segundos.

🔍 DESCUBRE LUGARES INCREÍBLES
• Explora miles de restaurantes, spas, hoteles y espacios para eventos
• Filtra por categoría, ubicación, precio y disponibilidad
• Ve fotos de alta calidad, reseñas reales y información detallada
• Sistema de favoritos para guardar tus lugares preferidos

⚡ RESERVA EN SEGUNDOS
• Proceso de reserva intuitivo y rápido
• Selecciona fecha, hora y número de personas fácilmente
• Agrega solicitudes especiales y preferencias dietéticas
• Confirmación instantánea con detalles completos

🔒 PAGOS 100% SEGUROS
• Integración con Stripe para máxima seguridad
• Gestiona múltiples métodos de pago
• Historial completo de todas tus transacciones
• Encriptación de nivel bancario para tus datos

📱 EXPERIENCIA MÓVIL PERFECTA
• Interfaz moderna y fácil de usar
• Soporte para modo claro y oscuro
• Accesibilidad completa con ajuste de fuentes
• Disponible en español e inglés

🔔 MANTENTE AL DÍA
• Notificaciones de confirmación y recordatorios
• Alertas sobre cambios en tus reservas
• Promociones exclusivas de venues partner
• Control total sobre qué notificaciones recibir

👤 PERFIL PERSONALIZADO
• Gestiona tu información personal de forma segura
• Configuración de idioma y preferencias
• Historial completo de todas tus reservas
• Soporte al cliente integrado

¿Por qué elegir ReservApp?
✅ Interface intuitiva y moderna
✅ Seguridad de clase mundial
✅ Soporte al cliente 24/7
✅ Integración con los mejores venues
✅ Sin cargos ocultos
✅ Actualizaciones constantes

¡Únete a miles de usuarios que ya disfrutan de la forma más fácil de reservar! Descarga ReservApp ahora y comienza a crear momentos inolvidables.

---
Síguenos en redes sociales para ofertas exclusivas y nuevos venues:
• Instagram: @reservapp
• Twitter: @reservapp
• Facebook: ReservApp Official

¿Necesitas ayuda? Contáctanos en soporte@reservapp.com`,

    // Graphics
    screenshots: [
      // Phone screenshots (minimum 2, maximum 8)
      './assets/screenshots/android/phone/1-home.png',
      './assets/screenshots/android/phone/2-discover.png',
      './assets/screenshots/android/phone/3-venue-details.png',
      './assets/screenshots/android/phone/4-reservation.png',
      './assets/screenshots/android/phone/5-profile.png',
      './assets/screenshots/android/phone/6-notifications.png',
    ],

    tabletScreenshots: [
      // Tablet screenshots (optional)
      './assets/screenshots/android/tablet/1-home.png',
      './assets/screenshots/android/tablet/2-discover.png',
      './assets/screenshots/android/tablet/3-venue-details.png',
    ],

    // Feature Graphic (1024 x 500)
    featureGraphic: './assets/graphics/feature-graphic.png',

    // High-res icon (512 x 512)
    hiResIcon: './assets/graphics/hi-res-icon.png',

    // Promo video (optional)
    promoVideo: 'https://youtube.com/watch?v=your-promo-video',

    // Categories
    category: 'LIFESTYLE',

    // Content Rating
    contentRating: 'Everyone',

    // Pricing
    pricing: 'Free',

    // Distribution
    countries: ['MX', 'US', 'ES', 'AR', 'CO', 'PE', 'CL'],

    // Contact Information
    website: 'https://reservapp-web.vercel.app',
    email: 'soporte@reservapp.com',
    phone: '+52 55 1234 5678',
    privacyPolicy: 'https://reservapp-web.vercel.app/privacy',
  },
};
