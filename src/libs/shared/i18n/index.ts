// Re-export all i18n functionality
export { useTranslation, translate, changeLanguage, getCurrentLanguage } from './useTranslation';
export {
  formatCurrency,
  formatDate,
  formatTime,
  formatDateTime,
  formatRelativeTime,
} from './useTranslation';

export type { Language } from './useTranslation';

// Migration helper to maintain compatibility with existing react-i18next usage
export const useI18n = () => {
  const { changeLanguage: changeLang, language, t } = useTranslation();

  return {
    i18n: {
      changeLanguage: changeLang,
      language,
    },
    t,
  };
};
