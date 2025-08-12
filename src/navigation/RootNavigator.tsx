import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamList } from '@navigation/types';
import { useAppSelector } from '@store/store';
import { useSessionRestore } from '@hooks/useSessionRestore';
import SplashScreen from '@presentation/screens/SplashScreen';

import AuthStack from './AuthStack';
import BookingFlow from './stacks/BookingFlow';
import MainDrawer from './drawers/MainDrawer';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isReady, isRestoring } = useSessionRestore();
  const [showSplash, setShowSplash] = useState(true);

  // Mostrar splash mientras se restaura la sesión o mientras no esté listo
  if (isRestoring || !isReady || showSplash) {
    return (
      <SplashScreen
        onFinish={() => {
          if (isReady) {
            setShowSplash(false);
          }
        }}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen component={MainDrawer} name='MainDrawer' />
            <Stack.Screen
              component={BookingFlow}
              name='BookingFlow'
              options={{ presentation: 'modal' }}
            />
          </>
        ) : (
          <Stack.Screen component={AuthStack} name='AuthStack' />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
