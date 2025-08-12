import { AuthStackParamList, NavigationProps } from '@navigation/types';

export interface WelcomeScreenProps extends NavigationProps<AuthStackParamList> {}

export interface WelcomeScreenState {
  isReady: boolean;
}
