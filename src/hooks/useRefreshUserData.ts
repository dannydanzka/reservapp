import { fetchDashboard } from '../libs/infrastructure/state/slices/dashboardSlice';
import { fetchMyReservations } from '../libs/infrastructure/state/slices/reservationsSlice';
import { fetchNotifications } from '../libs/infrastructure/state/slices/notificationsSlice';
import {
  fetchPayments,
  fetchReceipts,
} from '../modules/mod-payments/infrastructure/state/paymentsSlice';
import { useAppDispatch } from '../libs/infrastructure/store/hooks';

/**
 * Hook personalizado para actualizar todos los datos del usuario
 * Útil después de crear/modificar/cancelar reservas
 */
export const useRefreshUserData = () => {
  const dispatch = useAppDispatch();

  const refreshUserData = async (options?: {
    includeReservations?: boolean;
    includeNotifications?: boolean;
    includeDashboard?: boolean;
    includePayments?: boolean;
    includeReceipts?: boolean;
    silent?: boolean; // Si es true, no loguea errores
  }) => {
    const {
      includeDashboard = true,
      includeNotifications = true,
      includePayments = true,
      includeReceipts = true,
      includeReservations = true,
      silent = false,
    } = options || {};

    const updatePromises = [];
    const areas = [];

    if (includeReservations) {
      updatePromises.push(dispatch(fetchMyReservations({})));
      areas.push('reservas');
    }

    if (includeNotifications) {
      updatePromises.push(dispatch(fetchNotifications({ pagination: { limit: 20, page: 1 } })));
      areas.push('notificaciones');
    }

    if (includeDashboard) {
      updatePromises.push(dispatch(fetchDashboard()));
      areas.push('dashboard');
    }

    if (includePayments) {
      updatePromises.push(dispatch(fetchPayments({ pagination: { limit: 20, page: 1 } })));
      areas.push('pagos');
    }

    if (includeReceipts) {
      updatePromises.push(dispatch(fetchReceipts({ pagination: { limit: 20, page: 1 } })));
      areas.push('facturas');
    }

    if (updatePromises.length === 0) return;

    try {
      // Usar Promise.allSettled para que un error no bloquee las demás actualizaciones
      const results = await Promise.allSettled(updatePromises);

      if (!silent) {
        // Log errores pero no interrumpir el flujo
        results.forEach((result, index) => {
          if (result.status === 'rejected') {
            console.warn(`Error actualizando ${areas[index]}:`, result.reason);
          }
        });
      }

      return results;
    } catch (error) {
      if (!silent) {
        console.error('Error general actualizando datos del usuario:', error);
      }
      throw error;
    }
  };

  return { refreshUserData };
};
