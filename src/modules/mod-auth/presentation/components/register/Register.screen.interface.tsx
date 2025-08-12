import { AuthStackParamList, NavigationProps } from '@navigation/types';

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  acceptTerms: boolean;
}

export interface RegisterScreenState extends RegisterFormData {
  isLoading: boolean;
  errors: Partial<RegisterFormData>;
}

export interface RegisterScreenProps extends NavigationProps<AuthStackParamList> {}
