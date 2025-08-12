import { useCallback } from 'react';

import {
  addNotification,
  clearNotifications,
  removeNotification,
} from '@infrastructure/state/slices/uiSlice';
import { useAppDispatch } from '@infrastructure/state/store';

export const useNotifications = () => {
  const dispatch = useAppDispatch();

  const showSuccess = useCallback(
    (title: string, message: string, duration?: number) => {
      dispatch(
        addNotification({
          duration,
          message,
          title,
          type: 'success',
        })
      );
    },
    [dispatch]
  );

  const showError = useCallback(
    (title: string, message: string, duration?: number) => {
      dispatch(
        addNotification({
          duration,
          message,
          title,
          type: 'error',
        })
      );
    },
    [dispatch]
  );

  const showWarning = useCallback(
    (title: string, message: string, duration?: number) => {
      dispatch(
        addNotification({
          duration,
          message,
          title,
          type: 'warning',
        })
      );
    },
    [dispatch]
  );

  const showInfo = useCallback(
    (title: string, message: string, duration?: number) => {
      dispatch(
        addNotification({
          duration,
          message,
          title,
          type: 'info',
        })
      );
    },
    [dispatch]
  );

  const hideNotification = useCallback(
    (id: string) => {
      dispatch(removeNotification(id));
    },
    [dispatch]
  );

  const clearAll = useCallback(() => {
    dispatch(clearNotifications());
  }, [dispatch]);

  return {
    clearAll,
    hideNotification,
    showError,
    showInfo,
    showSuccess,
    showWarning,
  };
};
