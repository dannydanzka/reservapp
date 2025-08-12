export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  language: 'en' | 'es';
  fontScale: 'small' | 'medium' | 'large' | 'extraLarge';
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  dateOfBirth?: string;
}

export interface UpdateUserData {
  name?: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  language?: 'en' | 'es';
  fontScale?: 'small' | 'medium' | 'large' | 'extraLarge';
  notificationsEnabled?: boolean;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
}
