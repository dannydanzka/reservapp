// API Configuration
export const API_BASE_URL = 'https://reservapp-web.vercel.app/api';

// App Configuration
export const APP_CONFIG = {
  description: 'Tu plataforma de reservas en Guadalajara',
  name: 'ReservApp',
  supportEmail: 'soporte@reservapp.com',
  version: '1.0.0',
} as const;

// Colors (matching web version)
export const COLORS = {
  background: '#ffffff',
  backgroundSecondary: '#f9fafb',

  error: '#ef4444',

  primary: '#4F46E5',

  // Main brand purple from ReservApp Web
  secondary: '#FF8A00',
  // Main brand orange from ReservApp Web
  success: '#22c55e',
  text: '#111827',
  textSecondary: '#6b7280',
  warning: '#f59e0b',
} as const;

// Business Configuration
export const BUSINESS_CATEGORIES = {
  ACCOMMODATION: 'Alojamiento',
  ENTERTAINMENT: 'Entretenimiento',
  EVENT_CENTER: 'Centro de Eventos',
  RESTAURANT: 'Restaurante',
  SPA: 'Spa y Bienestar',
  TOUR_OPERATOR: 'Tours y Experiencias',
} as const;

export const SERVICE_CATEGORIES = {
  ACCOMMODATION: 'Alojamiento',
  DINING: 'Gastronomía',
  ENTERTAINMENT: 'Entretenimiento',
  EVENT_MEETING: 'Eventos',
  SPA_WELLNESS: 'Spa y Bienestar',
  TOUR_EXPERIENCE: 'Tours y Experiencias',
  TRANSPORTATION: 'Transporte',
} as const;

export const RESERVATION_STATUS = {
  CANCELLED: 'Cancelada',
  CHECKED_IN: 'Check-in Realizado',
  CHECKED_OUT: 'Check-out Realizado',
  CONFIRMED: 'Confirmada',
  NO_SHOW: 'No se Presentó',
  PENDING: 'Pendiente',
} as const;

export const PAYMENT_STATUS = {
  CANCELLED: 'Cancelado',
  COMPLETED: 'Completado',
  FAILED: 'Falló',
  PENDING: 'Pendiente',
  PROCESSING: 'Procesando',
  REFUNDED: 'Reembolsado',
} as const;

// Guadalajara specific
export const GUADALAJARA_CONFIG = {
  coordinates: {
    latitude: 20.6597,
    longitude: -103.3496,
  },
  currency: 'MXN',
  locale: 'es-MX',
  timezone: 'America/Mexico_City',
} as const;
