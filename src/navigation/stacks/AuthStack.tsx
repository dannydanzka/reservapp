import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AuthStackParamList } from '@navigation/types';
import ForgotPasswordScreen from '@mod-auth/presentation/components/ForgotPasswordScreen/ForgotPasswordScreen';
import LoginScreen from '@mod-auth/presentation/components/login/Login.screen';
import RegisterScreen from '@mod-auth/presentation/components/register/Register.screen';
import WelcomeScreen from '@mod-auth/presentation/components/welcome/Welcome.screen';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        cardStyle: { backgroundColor: 'white' },
        headerShown: false,
      }}
    >
      <Stack.Screen component={WelcomeScreen} name='Welcome' />
      <Stack.Screen component={LoginScreen} name='Login' />
      <Stack.Screen component={RegisterScreen} name='Register' />
      <Stack.Screen component={ForgotPasswordScreen} name='ForgotPassword' />
    </Stack.Navigator>
  );
};

export default AuthStack;
