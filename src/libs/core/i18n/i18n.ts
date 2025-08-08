import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-resources-to-backend';

import esTranslations from './locales/es.json';
import enTranslations from './locales/en.json';

const resources = {
  es: {
    translation: esTranslations,
  },
  en: {
    translation: enTranslations,
  },
};

i18n
  .use(Backend((language: string, namespace: string) => {
    // Dynamic import for better performance
    if (language === 'es') return Promise.resolve(esTranslations);
    if (language === 'en') return Promise.resolve(enTranslations);
    return Promise.resolve({});
  }))
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // Default language
    fallbackLng: 'en',
    debug: __DEV__,

    interpolation: {
      escapeValue: false, // React already escapes by default
    },

    // React i18next special options
    react: {
      useSuspense: false, // Important for React Native
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
    },

    // Default namespace
    defaultNS: 'translation',
    ns: ['translation'],

    // Key separator
    keySeparator: '.',
    nsSeparator: ':',

    // Plurals
    pluralSeparator: '_',

    // Missing key handling
    saveMissing: __DEV__,
    missingKeyHandler: (lng, ns, key) => {
      if (__DEV__) {
        console.warn(`Missing translation key: ${key} for language: ${lng}`);
      }
    },

    // Load options
    load: 'languageOnly', // Only load 'es' not 'es-MX'
  });

export default i18n;