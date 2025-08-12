import { useEffect, useState } from 'react';

import { getStoredSession } from '@core/utils/sessionStorage';
import { setError, setUser } from '@slices/authSlice';
import { useAppDispatch, useAppSelector } from '@store/store';

interface SessionRestoreState {
  isRestoring: boolean;
  isReady: boolean;
}

export const useSessionRestore = (): SessionRestoreState => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isRestoring, setIsRestoring] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        setIsRestoring(true);

        // Intentar recuperar sesión almacenada
        const storedSession = await getStoredSession();

        if (storedSession?.user && storedSession?.token) {
          // Validar si el token sigue siendo válido
          // En un escenario real, aquí harías una llamada al servidor para validar
          const tokenExpiry = storedSession.expiresAt ? new Date(storedSession.expiresAt) : null;
          const now = new Date();

          if (tokenExpiry && tokenExpiry > now) {
            // Token válido, restaurar sesión
            dispatch(setUser(storedSession.user));
          } else {
            // Token expirado, limpiar storage
            // Token expired, clearing session
            // TODO: Implementar clearSession aquí si es necesario
          }
        }
      } catch (error) {
        console.error('Error restoring session:', error);
        dispatch(setError('Error al restaurar la sesión'));
      } finally {
        setIsRestoring(false);
        // Dar un pequeño delay para mostrar el splash
        setTimeout(() => {
          setIsReady(true);
        }, 1500); // Mínimo 1.5 segundos de splash
      }
    };

    restoreSession();
  }, [dispatch]);

  return {
    isReady,
    isRestoring,
  };
};
