import AsyncStorage from '@react-native-async-storage/async-storage';

// ReservApp user interface
interface User {
  id: string | number;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  [key: string]: unknown;
}

const SESSION_KEY = 'user_session';
const AUTH_TOKEN_KEY = 'auth_token';

interface UserSession {
  id: string | number;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  [key: string]: unknown;
}

const userToSession = (user: User): UserSession => {
  const { id, email, name, firstName, lastName, phone, ...rest } = user;
  return {
    id,
    email,
    name,
    firstName,
    lastName,
    phone,
    ...rest,
  };
};

export const saveSession = async (user: User) => {
  try {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(userToSession(user)));
  } catch (error) {
    console.error('Error saving session:', error);
  }
};

export const getSession = async (): Promise<UserSession | null> => {
  try {
    const data = await AsyncStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

export const clearSession = async () => {
  try {
    await AsyncStorage.removeItem(SESSION_KEY);
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error clearing session:', error);
  }
};

export const saveAuthToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const getUserData = async (): Promise<User | null> => {
  return await getSession();
};

export const isUserLoggedIn = async (): Promise<boolean> => {
  try {
    const session = await getSession();
    const token = await getAuthToken();
    return !!(session && token);
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

export const getStoredSession = async (): Promise<{
  user: User | null;
  token: string | null;
  expiresAt?: string;
} | null> => {
  try {
    const user = await getSession();
    const token = await getAuthToken();
    
    if (!user || !token) {
      return null;
    }
    
    // For now, we'll assume token expires in 24 hours from now
    // In a real app, you'd store the actual expiration date
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    
    return {
      user,
      token,
      expiresAt,
    };
  } catch (error) {
    console.error('Error getting stored session:', error);
    return null;
  }
};