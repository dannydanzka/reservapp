import React, { useState } from 'react';

import { Alert } from 'react-native';
import { Smartphone } from 'lucide-react-native';

import {
  ButtonLoadingState,
  ErrorType,
  Form,
  FormErrorSummary,
  FormSection,
  handleError,
  useFormValidation,
  useNotifications,
  ValidatedInput,
} from '@components';
import { setUser } from '@store/slices/authSlice';
import { theme } from '@presentation/styles/theme';
import { useAppDispatch } from '@store/store';
import { useI18n } from '@hooks/useI18n';
import authService from '@libs/services/auth/authService';
import Button from '@components/Form/Button';
import Input from '@components/Form/Input';
import ScreenLayout from '@components/Layout/ScreenLayout';

import { DemoCredential, LoginScreenProps } from './Login.screen.interface';

import * as S from './Login.screen.styled';

// Credenciales demo (replicando del web)
const DEMO_CREDENTIALS: DemoCredential[] = [
  {
    email: 'admin@reservapp.com',
    password: 'password123',
    role: 'Administrador',
  },
  { email: 'manager@reservapp.com', password: 'password123', role: 'Manager' },
  {
    email: 'employee@reservapp.com',
    password: 'password123',
    role: 'Empleado',
  },
  { email: 'user@reservapp.com', password: 'password123', role: 'Usuario' },
];

interface LoginFormData {
  email: string;
  password: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { t } = useI18n();
  const { showError, showSuccess } = useNotifications();

  // Form validation setup
  const formValidation = useFormValidation<LoginFormData>({
    fields: [
      {
        label: t('auth.email'),
        name: 'email',
        rules: [
          { message: t('auth.emailRequired'), type: 'required' },
          { message: t('auth.emailInvalid'), type: 'email' },
        ],
      },
      {
        label: t('auth.password'),
        name: 'password',
        rules: [
          { message: t('auth.passwordRequired'), type: 'required' },
          { message: t('auth.passwordMinLength'), type: 'minLength', value: 6 },
        ],
      },
    ],
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleLoginSubmit,
    validateOnBlur: true,
    validateOnChange: true,
  });

  const { formState, getFieldError, handleSubmit, hasFieldError, isFieldTouched, setValue } =
    formValidation;

  async function handleLoginSubmit(values: LoginFormData) {
    try {
      // Intentar login real con API
      const session = await authService.login(values);

      // Mostrar notificación de éxito
      showSuccess(t('auth.loginSuccess'), 'Bienvenido');

      // Actualizar store
      dispatch(setUser(session.user));

      // Navegación se maneja automáticamente por RootNavigator
    } catch (err) {
      // Usar el sistema de manejo de errores
      handleError(err, {
        customMessage: err instanceof Error ? err.message : 'Error del servidor. Intenta más tarde',
        showAlert: false,
        showToast: false,
      });

      showError(
        err instanceof Error ? err.message : 'Error del servidor. Intenta más tarde',
        'Error de Autenticación'
      );
    }
  }

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setValue('email', demoEmail);
    setValue('password', demoPassword);
  };

  return (
    <ScreenLayout
      backgroundColor='transparent'
      keyboardAvoiding
      safeArea
      safeAreaEdges={['top', 'bottom']}
      scrollable
      statusBarStyle='dark-content'
    >
      <S.GradientBackground
        colors={[theme.colors.primary[50], theme.colors.secondary[50], theme.colors.primary[100]]}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
      />
      <S.Container>
        {/* Logo y título */}
        <S.LogoContainer>
          <S.LogoText>ReservApp</S.LogoText>
          <S.SubtitleText>{t('auth.welcome')}</S.SubtitleText>
        </S.LogoContainer>

        {/* Tarjeta de login */}
        <S.LoginCard>
          <S.BusinessLabel>
            <Smartphone color={theme.colors.primary[600]} size={16} />
            <S.BusinessLabelText>Portal Exclusivo para Negocios</S.BusinessLabelText>
          </S.BusinessLabel>

          <Form onSubmit={handleSubmit}>
            <S.FormContainer>
              {/* Error Summary */}
              <FormErrorSummary errors={formState.errors} />

              <FormSection>
                <ValidatedInput
                  autoCapitalize='none'
                  autoComplete='email'
                  autoCorrect={false}
                  error={getFieldError('email')}
                  keyboardType='email-address'
                  label={t('auth.email')}
                  name='email'
                  placeholder='tu@negocio.com'
                  required
                  touched={isFieldTouched('email')}
                  value={formState.values.email}
                  onBlur={() => formValidation.markFieldAsTouched('email')}
                  onChangeText={(text) => setValue('email', text)}
                />

                <ValidatedInput
                  autoComplete='password'
                  error={getFieldError('password')}
                  label={t('auth.password')}
                  name='password'
                  placeholder={t('auth.password')}
                  required
                  secureTextEntry
                  touched={isFieldTouched('password')}
                  value={formState.values.password}
                  onBlur={() => formValidation.markFieldAsTouched('password')}
                  onChangeText={(text) => setValue('password', text)}
                />

                <Button
                  disabled={!formState.isValid || formState.isSubmitting}
                  fullWidth
                  size='lg'
                  variant='primary'
                  onPress={handleSubmit}
                >
                  <ButtonLoadingState loading={formState.isSubmitting}>
                    {t('auth.login')}
                  </ButtonLoadingState>
                </Button>
              </FormSection>
            </S.FormContainer>
          </Form>

          {/* Credenciales demo */}
          <S.DemoSection>
            <S.DemoTitle>Credenciales de Prueba</S.DemoTitle>
            {DEMO_CREDENTIALS.map((cred, index) => (
              <S.DemoCredential key={index}>
                <S.DemoInfo>
                  <S.DemoRole>{cred.role}</S.DemoRole>
                  <S.DemoEmail>{cred.email}</S.DemoEmail>
                </S.DemoInfo>
                <S.DemoButton onPress={() => handleDemoLogin(cred.email, cred.password)}>
                  <S.DemoButtonText>Usar</S.DemoButtonText>
                </S.DemoButton>
              </S.DemoCredential>
            ))}
          </S.DemoSection>

          {/* Información adicional */}
          <S.InfoSection>
            <S.InfoText>
              ¿Eres usuario final? Descarga nuestra app móvil desde las tiendas de aplicaciones.
            </S.InfoText>
          </S.InfoSection>

          {/* Enlace para volver */}
          <S.BackLink onPress={() => navigation.navigate('Welcome')}>
            <S.BackLinkText>← Volver al Inicio</S.BackLinkText>
          </S.BackLink>
        </S.LoginCard>
      </S.Container>
    </ScreenLayout>
  );
};

export default LoginScreen;
