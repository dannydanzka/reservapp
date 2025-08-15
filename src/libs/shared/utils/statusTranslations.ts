/**
 * Traducciones de estados de reservaciones
 */

export const reservationStatusTranslations: Record<string, string> = {
  CANCELLED: 'Cancelada',
  COMPLETED: 'Completada',
  CONFIRMED: 'Confirmada',
  EXPIRED: 'Expirada',
  IN_PROGRESS: 'En Progreso',
  NO_SHOW: 'No Asistió',
  PENDING: 'Pendiente',
  REFUNDED: 'Reembolsada',
};

export const getReservationStatusInSpanish = (status: string): string => {
  return reservationStatusTranslations[status.toUpperCase()] || status;
};

export const reservationStatusColors: Record<string, string> = {
  CANCELLED: '#F44336',
  COMPLETED: '#8BC34A',
  CONFIRMED: '#4CAF50',
  EXPIRED: '#607D8B',
  IN_PROGRESS: '#2196F3',
  NO_SHOW: '#795548',
  PENDING: '#FFA500',
  REFUNDED: '#9C27B0',
};

export const getReservationStatusColor = (status: string): string => {
  return reservationStatusColors[status.toUpperCase()] || '#666666';
};
