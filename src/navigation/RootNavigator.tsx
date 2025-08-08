import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAppSelector } from '../store/store';
import { useSessionRestore } from '../hooks/useSessionRestore';
import { RootStackParamList } from './types';
import AuthStack from './stacks/AuthStack';
import MainDrawer from './drawers/MainDrawer';
import BookingFlow from './stacks/BookingFlow';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isRestoring, isReady } = useSessionRestore();
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="MainDrawer" component={MainDrawer} />
            <Stack.Screen 
              name="BookingFlow" 
              component={BookingFlow}
              options={{ presentation: 'modal' }}
            />
          </>
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;