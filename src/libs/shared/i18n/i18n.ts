import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-resources-to-backend';
import i18n from 'i18next';

import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  es: {
    translation: esTranslations,
  },
};

i18n
  .use(
    Backend((language: string, namespace: string) => {
      // Dynamic import for better performance
      if (language === 'es') return Promise.resolve(esTranslations);
      if (language === 'en') return Promise.resolve(enTranslations);
      return Promise.resolve({});
    })
  )
  .use(initReactI18next)
  .init({
    debug: __DEV__,

    // Default namespace
    defaultNS: 'translation',

    // Default language
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // React already escapes by default
    },

    // Key separator
    keySeparator: '.',

    lng: 'es',

    // Load options
    load: 'languageOnly',

    missingKeyHandler: (lng, ns, key) => {
      if (__DEV__) {
        console.warn(`Missing translation key: ${key} for language: ${lng}`);
      }
    },

    ns: ['translation'],

    resources,

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

    // Missing key handling
    saveMissing: __DEV__, // Only load 'es' not 'es-MX'
  });

export default i18n;
