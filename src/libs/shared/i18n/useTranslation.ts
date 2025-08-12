import { useMemo } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import enTranslations from './locales/en-enhanced.json';
import esTranslations from './locales/es-enhanced.json';

export type Language = 'es' | 'en';

interface TranslationParams {
  [key: string]: string | number;
}

interface UseTranslationOptions {
  returnObjects?: boolean;
}

// Cache para el idioma actual
let currentLanguage: Language = 'es';

// Función para cambiar idioma
export const changeLanguage = async (lang: Language) => {
  currentLanguage = lang;
  await AsyncStorage.setItem('selectedLanguage', lang);
};

// Función para obtener idioma guardado
export const getCurrentLanguage = async (): Promise<Language> => {
  try {
    const savedLang = (await AsyncStorage.getItem('selectedLanguage')) as Language;
    if (savedLang) {
      currentLanguage = savedLang;
      return savedLang;
    }
  } catch (error) {
    console.error('Error getting language:', error);
  }
  return 'es'; // Default
};

// Función para obtener valor anidado del objeto de traducciones
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
};

// Función para reemplazar parámetros en strings
const replaceParams = (str: string, params: TranslationParams): string => {
  let result = str;

  Object.entries(params).forEach(([key, value]) => {
    const regex = new RegExp(`{${key}}`, 'g');
    result = result.replace(regex, String(value));
  });

  return result;
};

// Hook principal de traducción
export const useTranslation = () => {
  const translations = useMemo(() => {
    return currentLanguage === 'es' ? esTranslations : enTranslations;
  }, [currentLanguage]);

  const t = useMemo(() => {
    return (
      key: string,
      params?: TranslationParams | UseTranslationOptions,
      options?: UseTranslationOptions
    ): any => {
      // Detectar si el segundo parámetro son opciones
      let actualParams: TranslationParams = {};
      let actualOptions: UseTranslationOptions = {};

      if (params && 'returnObjects' in params) {
        actualOptions = params as UseTranslationOptions;
      } else {
        actualParams = (params as TranslationParams) || {};
        actualOptions = options || {};
      }

      // Obtener el valor de la traducción
      const value = getNestedValue(translations, key);

      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key; // Retornar la clave si no se encuentra la traducción
      }

      // Si se solicita retornar objetos/arrays, hacerlo directamente
      if (actualOptions.returnObjects) {
        return value;
      }

      // Si es string, reemplazar parámetros si existen
      if (typeof value === 'string' && Object.keys(actualParams).length > 0) {
        return replaceParams(value, actualParams);
      }

      return value;
    };
  }, [translations]);

  // Función para obtener idioma actual
  const language = useMemo(() => currentLanguage, [currentLanguage]);

  // Función para cambiar idioma con re-render
  const changeLanguageWithUpdate = useMemo(() => {
    return async (lang: Language) => {
      await changeLanguage(lang);
      // Forzar re-render
      // En React Native, esto se manejará a través del estado global
    };
  }, []);

  return {
    changeLanguage: changeLanguageWithUpdate,
    language,
    t,
  };
};

// Función standalone para usar fuera de componentes
export const translate = (key: string, params?: TranslationParams): string => {
  const translations = currentLanguage === 'es' ? esTranslations : enTranslations;
  const value = getNestedValue(translations, key);

  if (value === undefined) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }

  if (typeof value === 'string' && params && Object.keys(params).length > 0) {
    return replaceParams(value, params);
  }

  return typeof value === 'string' ? value : String(value);
};

// Utilidades adicionales
export const formatCurrency = (amount: number, currency = 'MXN'): string => {
  const locale = currentLanguage === 'es' ? 'es-MX' : 'en-US';
  return new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  const locale = currentLanguage === 'es' ? 'es-MX' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const formatTime = (date: Date): string => {
  const locale = currentLanguage === 'es' ? 'es-MX' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const formatDateTime = (date: Date): string => {
  const locale = currentLanguage === 'es' ? 'es-MX' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return translate('dates.today');
  }
  if (diffDays === 1) {
    return translate('dates.yesterday');
  }
  if (diffDays < 7) {
    return translate('dates.daysAgo', { count: diffDays });
  }
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return translate('dates.weeksAgo', { count: weeks });
  }
  return formatDate(date);
};

export default useTranslation;
