import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export const useI18n = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = useCallback(async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }, [i18n]);

  const getCurrentLanguage = useCallback(() => {
    return i18n.language;
  }, [i18n]);

  const isRTL = useCallback(() => {
    // Add RTL languages here if needed
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    return rtlLanguages.includes(i18n.language);
  }, [i18n]);

  const formatCurrency = useCallback((amount: number, currency = 'MXN') => {
    const locale = i18n.language === 'es' ? 'es-MX' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  }, [i18n]);

  const formatDate = useCallback((date: Date | string, options?: Intl.DateTimeFormatOptions) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const locale = i18n.language === 'es' ? 'es-MX' : 'en-US';
    
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Intl.DateTimeFormat(locale, options || defaultOptions).format(dateObj);
  }, [i18n]);

  const formatTime = useCallback((date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const locale = i18n.language === 'es' ? 'es-MX' : 'en-US';
    
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: i18n.language === 'en',
    }).format(dateObj);
  }, [i18n]);

  const formatRelativeTime = useCallback((date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - dateObj.getTime()) / 60000);
    
    const locale = i18n.language === 'es' ? 'es-MX' : 'en-US';
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    if (diffInMinutes < 1) return t('dates.now') || 'now';
    if (diffInMinutes < 60) return rtf.format(-diffInMinutes, 'minute');
    if (diffInMinutes < 1440) return rtf.format(-Math.floor(diffInMinutes / 60), 'hour');
    return rtf.format(-Math.floor(diffInMinutes / 1440), 'day');
  }, [i18n, t]);

  const formatNumber = useCallback((number: number, options?: Intl.NumberFormatOptions) => {
    const locale = i18n.language === 'es' ? 'es-MX' : 'en-US';
    return new Intl.NumberFormat(locale, options).format(number);
  }, [i18n]);

  const pluralize = useCallback((key: string, count: number, options?: any) => {
    return t(key, { count, ...options });
  }, [t]);

  return {
    t,
    i18n,
    changeLanguage,
    getCurrentLanguage,
    isRTL,
    formatCurrency,
    formatDate,
    formatTime,
    formatRelativeTime,
    formatNumber,
    pluralize,
    currentLanguage: i18n.language,
    availableLanguages: ['es', 'en'],
    isLoading: i18n.isInitialized === false,
  };
};