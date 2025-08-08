import { useCallback } from 'react';

import { useAppDispatch } from '../store/store';
import { addNotification, removeNotification, clearNotifications } from '../store/slices/uiSlice';

export const useNotifications = () => {
  const dispatch = useAppDispatch();

  const showSuccess = useCallback((title: string, message: string, duration?: number) => {
    dispatch(addNotification({
      type: 'success',
      title,
      message,
      duration,
    }));
  }, [dispatch]);

  const showError = useCallback((title: string, message: string, duration?: number) => {
    dispatch(addNotification({
      type: 'error',
      title,
      message,
      duration,
    }));
  }, [dispatch]);

  const showWarning = useCallback((title: string, message: string, duration?: number) => {
    dispatch(addNotification({
      type: 'warning',
      title,
      message,
      duration,
    }));
  }, [dispatch]);

  const showInfo = useCallback((title: string, message: string, duration?: number) => {
    dispatch(addNotification({
      type: 'info',
      title,
      message,
      duration,
    }));
  }, [dispatch]);

  const hideNotification = useCallback((id: string) => {
    dispatch(removeNotification(id));
  }, [dispatch]);

  const clearAll = useCallback(() => {
    dispatch(clearNotifications());
  }, [dispatch]);

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideNotification,
    clearAll,
  };
};