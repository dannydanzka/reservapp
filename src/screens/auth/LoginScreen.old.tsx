import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';

import { Button } from '../../components';
import { COLORS } from '../../utils/constants';
import { useAppDispatch } from '../../store/store';
import { setUser, setLoading } from '../../store/slices/authSlice';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    dispatch(setLoading(true));
    
    // Simular login
    setTimeout(() => {
      dispatch(setUser({
        id: '1',
        name: 'Usuario Demo',
        email: email,
      }));
    }, 1000);
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Container>
          <Title>Bienvenido a ReservApp</Title>
          <Subtitle>Inicia sesión para continuar</Subtitle>
          
          <FormContainer>
            <InputLabel>Email</InputLabel>
            <StyledInput
              value={email}
              onChangeText={setEmail}
              placeholder="tu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <InputLabel>Contraseña</InputLabel>
            <StyledInput
              value={password}
              onChangeText={setPassword}
              placeholder="********"
              secureTextEntry
            />
            
            <Button
              title="Iniciar Sesión"
              onPress={handleLogin}
              style={{ marginTop: 20 }}
            />
            
            <Button
              title="¿No tienes cuenta? Regístrate"
              variant="outline"
              onPress={() => Alert.alert('Info', 'Función de registro próximamente')}
              style={{ marginTop: 10 }}
            />
          </FormContainer>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${COLORS.background};
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${COLORS.text};
  margin-bottom: 8px;
  text-align: center;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: ${COLORS.textSecondary};
  margin-bottom: 40px;
  text-align: center;
`;

const FormContainer = styled.View`
  width: 100%;
  max-width: 320px;
`;

const InputLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${COLORS.text};
  margin-bottom: 8px;
  margin-top: 16px;
`;

const StyledInput = styled.TextInput`
  border-width: 1px;
  border-color: ${COLORS.backgroundSecondary};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  background-color: ${COLORS.background};
`;

export default LoginScreen;