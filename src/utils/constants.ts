// API Configuration
export const API_BASE_URL = 'https://reservapp-web.vercel.app/api';

// App Configuration
export const APP_CONFIG = {
  name: 'ReservApp',
  version: '1.0.0',
  description: 'Tu plataforma de reservas en Guadalajara',
  supportEmail: 'soporte@reservapp.com',
} as const;

// Colors (matching web version)
export const COLORS = {
  primary: '#4F46E5', // Main brand purple from ReservApp Web
  secondary: '#FF8A00', // Main brand orange from ReservApp Web
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  text: '#111827',
  textSecondary: '#6b7280',
  background: '#ffffff',
  backgroundSecondary: '#f9fafb',
} as const;

// Business Configuration
export const BUSINESS_CATEGORIES = {
  ACCOMMODATION: 'Alojamiento',
  RESTAURANT: 'Restaurante',
  SPA: 'Spa y Bienestar',
  TOUR_OPERATOR: 'Tours y Experiencias',
  EVENT_CENTER: 'Centro de Eventos',
  ENTERTAINMENT: 'Entretenimiento',
} as const;

export const SERVICE_CATEGORIES = {
  ACCOMMODATION: 'Alojamiento',
  DINING: 'Gastronomía',
  SPA_WELLNESS: 'Spa y Bienestar',
  TOUR_EXPERIENCE: 'Tours y Experiencias',
  EVENT_MEETING: 'Eventos',
  TRANSPORTATION: 'Transporte',
  ENTERTAINMENT: 'Entretenimiento',
} as const;

export const RESERVATION_STATUS = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmada',
  CHECKED_IN: 'Check-in Realizado',
  CHECKED_OUT: 'Check-out Realizado',
  CANCELLED: 'Cancelada',
  NO_SHOW: 'No se Presentó',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'Pendiente',
  PROCESSING: 'Procesando',
  COMPLETED: 'Completado',
  FAILED: 'Falló',
  CANCELLED: 'Cancelado',
  REFUNDED: 'Reembolsado',
} as const;

// Guadalajara specific
export const GUADALAJARA_CONFIG = {
  coordinates: {
    latitude: 20.6597,
    longitude: -103.3496,
  },
  timezone: 'America/Mexico_City',
  currency: 'MXN',
  locale: 'es-MX',
} as const;