import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoginSession, User } from '@shared/types';

// Keys para el almacenamiento
const STORAGE_KEYS = {
  AUTH_TOKEN: '@reservapp/auth_token',
  SESSION_DATA: '@reservapp/session_data',
  USER_SESSION: '@reservapp/user_session',
} as const;

/**
 * Guardar token de autenticación
 */
export const saveAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  } catch (error) {
    console.error('Error saving auth token:', error);
    throw error;
  }
};

/**
 * Obtener token de autenticación
 */
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Guardar sesión de usuario
 */
export const saveSession = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user session:', error);
    throw error;
  }
};

/**
 * Obtener sesión de usuario guardada
 */
export const getStoredSession = async (): Promise<LoginSession | null> => {
  try {
    const sessionData = await AsyncStorage.getItem(STORAGE_KEYS.SESSION_DATA);
    const token = await getAuthToken();
    const userSession = await AsyncStorage.getItem(STORAGE_KEYS.USER_SESSION);

    if (!token || !userSession) {
      return null;
    }

    const user = JSON.parse(userSession);
    const session = sessionData ? JSON.parse(sessionData) : null;

    return {
      expiresAt: session?.expiresAt || null,
      token,
      user,
    };
  } catch (error) {
    console.error('Error getting stored session:', error);
    return null;
  }
};

/**
 * Guardar datos de sesión completos
 */
export const saveSessionData = async (session: LoginSession): Promise<void> => {
  try {
    await Promise.all([
      saveAuthToken(session.token),
      saveSession(session.user),
      AsyncStorage.setItem(
        STORAGE_KEYS.SESSION_DATA,
        JSON.stringify({
          expiresAt: session.expiresAt,
        })
      ),
    ]);
  } catch (error) {
    console.error('Error saving session data:', error);
    throw error;
  }
};

/**
 * Limpiar toda la sesión
 */
export const clearSession = async (): Promise<void> => {
  try {
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN),
      AsyncStorage.removeItem(STORAGE_KEYS.USER_SESSION),
      AsyncStorage.removeItem(STORAGE_KEYS.SESSION_DATA),
    ]);
  } catch (error) {
    console.error('Error clearing session:', error);
    throw error;
  }
};

/**
 * Verificar si existe una sesión guardada
 */
export const hasStoredSession = async (): Promise<boolean> => {
  try {
    const token = await getAuthToken();
    const userSession = await AsyncStorage.getItem(STORAGE_KEYS.USER_SESSION);
    return Boolean(token && userSession);
  } catch (error) {
    console.error('Error checking stored session:', error);
    return false;
  }
};
