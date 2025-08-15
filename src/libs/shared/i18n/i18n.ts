import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import esTranslations from './locales/es.json';

const resources = {
  es: {
    translation: esTranslations,
  },
};

i18n.use(initReactI18next).init({
  debug: __DEV__,

  // Default namespace
  defaultNS: 'translation',

  // Default and fallback language both Spanish
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false, // React already escapes by default
  },

  // Key separator
  keySeparator: '.',

  lng: 'es',

  // Load options - only Spanish
  load: 'languageOnly',

  missingKeyHandler: (lng, ns, key) => {
    if (__DEV__) {
      console.warn(`Missing translation key: ${key} for language: ${lng}`);
    }
  },

  ns: ['translation'],

  nsSeparator: ':',

  // Plurals
  pluralSeparator: '_',

  // React i18next special options
  react: {
    // Important for React Native
    bindI18n: 'languageChanged loaded',
    bindI18nStore: 'added removed',
    useSuspense: false,
  },

  resources,

  // Missing key handling
  saveMissing: __DEV__,
});

export default i18n;
