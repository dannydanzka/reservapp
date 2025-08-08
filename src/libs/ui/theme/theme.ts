export const theme = {
  colors: {
    primary: {
      50: '#eef2ff',   // Muy claro
      100: '#e0e7ff',  // Claro
      200: '#c7d2fe',  
      300: '#a5b4fc',  
      400: '#818cf8',  
      500: '#4F46E5',  // Color principal de marca
      600: '#4338ca',  
      700: '#3730a3',  
      800: '#312e81',  
      900: '#1e1b4b',  // Muy oscuro
    },
    secondary: {
      50: '#fff7ed',   // Muy claro
      100: '#ffedd5',  // Claro  
      200: '#fed7aa',  
      300: '#fdba74',  
      400: '#fb923c',  
      500: '#FF8A00',  // Color secundario principal
      600: '#ea580c',  
      700: '#c2410c',  
      800: '#9a3412',  
      900: '#7c2d12',  // Muy oscuro
    },
    gray: {
      50: '#f9fafb',   // Placeholder/iconos secundarios
      100: '#f3f4f6',  
      200: '#E5E7EB',  
      300: '#d1d5db',  // Bordes de tarjetas e inputs
      400: '#9CA3AF',  
      500: '#6B7280',  // Subtítulos
      600: '#4b5563',  
      700: '#374151',  
      800: '#1F2937',  // Labels (Fecha, Hora, Habitación)
      900: '#111827',  // Títulos principales
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
  },
  borderRadius: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    xxl: 16,
    full: 9999,
  },
  typography: {
    fontFamily: {
      primary: {
        light: 'Lato-Light',
        regular: 'Lato-Regular',
        italic: 'Lato-Italic',
        medium: 'Lato-Medium',
        bold: 'Lato-Bold',
      },
      secondary: {
        regular: 'Montserrat-Regular',
        medium: 'Montserrat-Medium', 
        bold: 'Montserrat-Bold',
      },
      // Legacy properties for backward compatibility
      regular: 'Lato-Regular',
      medium: 'Lato-Medium',
      semibold: 'Lato-Medium',
      bold: 'Lato-Bold',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 30,
      display: 36,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
  },
};

export type Theme = typeof theme;