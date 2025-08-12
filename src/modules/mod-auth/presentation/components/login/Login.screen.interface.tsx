import { AuthStackParamList, NavigationProps } from '@navigation/types';

export interface DemoCredential {
  email: string;
  password: string;
  role: string;
}

export interface LoginScreenState {
  email: string;
  password: string;
  error: string;
  isLoading: boolean;
}

export interface LoginScreenProps extends NavigationProps<AuthStackParamList> {}
