export const theme = {
  borderRadius: {
    full: 9999,
    lg: 8,
    md: 6,
    none: 0,
    sm: 4,
    xl: 12,
    xs: 2,
    xxl: 16,
  },
  colors: {
    black: '#000000',

    border: {
      // Bordes muy sutiles
      default: '#e5e7eb',
      // Bordes fuertes
      focus: '#3b82f6',

      light: '#f3f4f6',

      // Bordes normales
      medium: '#d1d5db',
      // Bordes medios
      strong: '#9ca3af', // Bordes enfocados
    },

    // Service Categories (para ReservApp)
    categories: {
      // Verde para spas
      beauty: '#ec4899',

      // Púrpura para tours
      events: '#f59e0b',

      // Rosa para belleza
      hotel: '#3b82f6',

      restaurant: '#f97316',

      // Naranja para restaurantes
      spa: '#22c55e',
      // Azul para hoteles
      tours: '#8b5cf6', // Amarillo para eventos
    },

    error: {
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },

    // Feedback Colors (extended)
    feedback: {
      errorDark: '#dc2626',
      errorLight: '#fee2e2',
      infoDark: '#2563eb',
      infoLight: '#dbeafe',
      successDark: '#15803d',
      successLight: '#dcfce7',
      warningDark: '#d97706',
      warningLight: '#fef3c7',
    },

    gray: {
      // Placeholder/iconos secundarios
      100: '#f3f4f6',

      200: '#E5E7EB',

      25: '#fefefe',

      300: '#d1d5db',

      // Bordes de tarjetas e inputs
      400: '#9CA3AF',
      // Ultra claro para backgrounds sutiles
      50: '#f9fafb',
      500: '#6B7280', // Subtítulos
      600: '#4b5563',
      700: '#374151',
      800: '#1F2937', // Labels (Fecha, Hora, Habitación)
      900: '#111827', // Títulos principales
    },

    info: {
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      50: '#eff6ff',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },

    primary: {
      // Muy claro
      100: '#e0e7ff',

      // Claro
      200: '#c7d2fe',

      25: '#eef2ff',

      300: '#a5b4fc',

      400: '#818cf8',
      // Ultra claro para backgrounds sutiles
      50: '#eef2ff',
      500: '#4F46E5', // Color principal de marca (matching web)
      600: '#4338ca',
      700: '#3730a3',
      800: '#312e81',
      900: '#1e1b4b', // Muy oscuro
    },

    secondary: {
      // Muy claro
      100: '#ffedd5',

      // Claro
      200: '#fed7aa',

      25: '#fff7ed',

      300: '#fdba74',

      400: '#fb923c',
      // Ultra claro para backgrounds sutiles
      50: '#fff7ed',
      500: '#FF8A00', // Color secundario principal (orange matching web)
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12', // Muy oscuro
    },

    // Status Colors
    status: {
      // Amarillo para pendiente
      cancelled: '#ef4444',

      // Rojo para cancelado
      completed: '#6b7280',

      confirmed: '#22c55e',
      // Verde para confirmado
      pending: '#f59e0b', // Gris para completado
    },

    success: {
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      50: '#f0fdf4',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },

    // Semantic Colors (inspired by Jafra)
    surface: {
      // Fondo elevado (modals, dropdowns)
      disabled: '#f3f4f6',

      // Fondo terciario
      elevated: '#ffffff',

      primary: '#ffffff',

      // Fondo principal de cards
      secondary: '#f9fafb',
      // Fondo secundario
      tertiary: '#f3f4f6', // Fondo deshabilitado
    },

    text: {
      // Placeholders
      disabled: '#d1d5db',

      // Texto deshabilitado
      inverse: '#ffffff',

      // Texto sobre fondos oscuros
      link: '#3b82f6',

      // Links
      linkHover: '#2563eb',

      // Texto terciario
      placeholder: '#9ca3af',
      primary: '#111827',

      // Texto principal
      secondary: '#374151',
      // Texto secundario
      tertiary: '#6b7280', // Links hover
    },

    transparent: 'transparent',
    warning: {
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      50: '#fffbeb',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    white: '#ffffff',
  },
  shadows: {
    lg: {
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: {
        height: 4,
        width: 0,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
    },
    md: {
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        height: 2,
        width: 0,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
    },
    sm: {
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: {
        height: 1,
        width: 0,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    },
    xl: {
      elevation: 12,
      shadowColor: '#000',
      shadowOffset: {
        height: 6,
        width: 0,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
    },
  },
  spacing: {
    lg: 24,
    md: 16,
    sm: 8,
    xl: 32,
    xs: 4,
    xxl: 40,
    xxxl: 48,
  },
  typography: {
    fontFamily: {
      bold: 'Lato-Bold',

      medium: 'Lato-Medium',

      primary: {
        bold: 'Lato-Bold',
        italic: 'Lato-Italic',
        light: 'Lato-Light',
        medium: 'Lato-Medium',
        regular: 'Lato-Regular',
      },
      // Legacy properties for backward compatibility
      regular: 'Lato-Regular',
      secondary: {
        bold: 'Montserrat-Bold',
        medium: 'Montserrat-Medium',
        regular: 'Montserrat-Regular',
      },
      semibold: 'Lato-Medium',
    },
    fontSize: {
      display: 36,
      lg: 18,
      md: 16,
      sm: 14,
      xl: 20,
      xs: 12,
      xxl: 24,
      xxxl: 30,
    },
    lineHeight: {
      normal: 1.5,
      relaxed: 1.75,
      tight: 1.25,
    },
  },
};

export type Theme = typeof theme;
