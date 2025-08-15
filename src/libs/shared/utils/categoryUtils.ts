/**
 * Utilidades para manejar categorías de servicios
 * Colores y etiquetas consistentes en toda la aplicación
 */

export const getCategoryLabel = (category: string): string => {
  const categories: Record<string, string> = {
    ACCOMMODATION: 'Alojamiento',
    DINING: 'Gastronomía',
    ENTERTAINMENT: 'Entretenimiento',
    EVENT_MEETING: 'Eventos',
    SPA_WELLNESS: 'Spa y Bienestar',
    TOUR_EXPERIENCE: 'Tours y Experiencias',
    TRANSPORTATION: 'Transporte',
  };
  return categories[category] || category;
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    ACCOMMODATION: '#3B82F6', // Azul - para alojamiento
    DINING: '#F59E0B', // Naranja - para gastronomía
    ENTERTAINMENT: '#EF4444', // Rojo - para entretenimiento
    EVENT_MEETING: '#8B5CF6', // Púrpura - para eventos
    SPA_WELLNESS: '#10B981', // Verde - para spa y bienestar
    TOUR_EXPERIENCE: '#F97316', // Naranja oscuro - para tours
    TRANSPORTATION: '#6B7280', // Gris - para transporte
  };
  return colors[category] || '#6B7280'; // Gris por defecto
};

/**
 * Obtener un color más claro para fondos (versión con opacity)
 */
export const getCategoryColorLight = (category: string): string => {
  const lightColors: Record<string, string> = {
    ACCOMMODATION: '#3B82F620', // Azul claro
    DINING: '#F59E0B20', // Naranja claro
    ENTERTAINMENT: '#EF444420', // Rojo claro
    EVENT_MEETING: '#8B5CF620', // Púrpura claro
    SPA_WELLNESS: '#10B98120', // Verde claro
    TOUR_EXPERIENCE: '#F9731620', // Naranja oscuro claro
    TRANSPORTATION: '#6B728020', // Gris claro
  };
  return lightColors[category] || '#6B728020';
};

/**
 * Obtener icono representativo para cada categoría (para futuro uso)
 */
export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    ACCOMMODATION: 'bed',
    DINING: 'utensils',
    ENTERTAINMENT: 'music',
    EVENT_MEETING: 'calendar',
    SPA_WELLNESS: 'heart',
    TOUR_EXPERIENCE: 'map',
    TRANSPORTATION: 'car',
  };
  return icons[category] || 'tag';
};
