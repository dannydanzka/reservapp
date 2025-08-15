import React, { useState } from 'react';

import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react-native';

import { loginUser } from '../../../../../libs/infrastructure/state/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../../../../libs/infrastructure/store/hooks';

import {
  AppLogo,
  Container,
  DemoCredentials,
  DemoItem,
  DemoLabel,
  DemoTitle,
  DemoValue,
  ErrorText,
  FormSection,
  InputContainer,
  InputIcon,
  InputWrapper,
  LoginButton,
  LoginButtonText,
  LogoContainer,
  LogoSection,
  PasswordToggle,
  ScrollContainer,
  StyledInput,
  TaglineText,
} from './LoginScreen.styled';

export const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      await dispatch(loginUser({ email: email.trim(), password })).unwrap();
    } catch (err) {
      Alert.alert('Error de autenticación', err as string);
    }
  };

  const fillDemoCredentials = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollContainer
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <LogoSection>
            <LogoContainer>
              <AppLogo source={require('../../../../../libs/shared/assets/app-icon.png')} />
              <TaglineText>Tu plataforma de reservas</TaglineText>
            </LogoContainer>
          </LogoSection>

          {/* Form Section */}
          <FormSection>
            <InputContainer>
              <InputWrapper>
                <InputIcon>
                  <Mail color='#8b5cf6' size={20} />
                </InputIcon>
                <StyledInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='email-address'
                  placeholder='Correo electrónico'
                  placeholderTextColor='#9ca3af'
                  value={email}
                  onChangeText={setEmail}
                />
              </InputWrapper>

              <InputWrapper>
                <InputIcon>
                  <Lock color='#8b5cf6' size={20} />
                </InputIcon>
                <StyledInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  placeholder='Contraseña'
                  placeholderTextColor='#9ca3af'
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <PasswordToggle onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff color='#8b5cf6' size={20} />
                  ) : (
                    <Eye color='#8b5cf6' size={20} />
                  )}
                </PasswordToggle>
              </InputWrapper>

              {error && <ErrorText>{error}</ErrorText>}

              <LoginButton disabled={isLoading} onPress={handleLogin}>
                <LoginButtonText>
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </LoginButtonText>
              </LoginButton>
            </InputContainer>

            {/* Demo Credentials */}
            <DemoCredentials>
              <DemoTitle>Cuentas Demo Disponibles</DemoTitle>
              <DemoItem onPress={() => fillDemoCredentials('juan.perez@gmail.com', 'password123')}>
                <DemoLabel>🧑‍💼 Cliente Final</DemoLabel>
                <DemoValue>juan.perez@gmail.com</DemoValue>
              </DemoItem>
            </DemoCredentials>
          </FormSection>
        </ScrollContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};
