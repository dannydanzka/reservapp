import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { AuthStack } from './stacks/AuthStack';
import { getProfile, verifyToken } from '../../infrastructure/state/slices/authSlice';
import { MainStack } from './stacks/MainStack';
import { RootStackParamList } from './types';
import { SplashScreen } from '../components/SplashScreen';
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/hooks';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, token } = useAppSelector((state) => state.auth);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      // Mostrar splash por al menos 2 segundos
      const splashTimeout = setTimeout(() => {
        setIsInitializing(false);
      }, 2000);

      // Verificar token si existe
      if (token && !isAuthenticated) {
        dispatch(verifyToken());
      } else if (isAuthenticated && token) {
        // Si ya está autenticado, cargar el profile del usuario
        dispatch(getProfile());
      } else {
        // Si no hay token, terminar el splash después del timeout
        setTimeout(() => {
          clearTimeout(splashTimeout);
          setIsInitializing(false);
        }, 2000);
      }

      return () => clearTimeout(splashTimeout);
    };

    initializeApp();
  }, [dispatch, token, isAuthenticated]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isInitializing || isLoading ? (
          <Stack.Screen component={SplashScreen} name='Splash' />
        ) : isAuthenticated ? (
          <Stack.Screen component={MainStack} name='Main' />
        ) : (
          <Stack.Screen component={AuthStack} name='Auth' />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
