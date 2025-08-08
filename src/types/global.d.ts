declare module '@react-native/new-app-screen' {
  import { ComponentType } from 'react';
  
  interface NewAppScreenProps {
    templateFileName?: string;
  }
  
  export const NewAppScreen: ComponentType<NewAppScreenProps>;
}