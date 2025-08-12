import React, { useState } from 'react';

import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@store/store';
import { registerUser, selectAuthError, selectIsLoading } from '@store/slices/authSlice';
import { theme } from '@presentation/styles/theme';
import Button from '@components/Form/Button';
import Input from '@components/Form/Input';
import ScreenLayout from '@components/Layout/ScreenLayout';

import { RegisterFormData, RegisterScreenProps } from './Register.screen.interface';

import * as S from './Register.screen.styled';

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);

  const [formData, setFormData] = useState<RegisterFormData>({
    acceptTerms: false,
    confirmPassword: '',
    email: '',
    name: '',
    password: '',
    phone: '',
  });

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return 'El nombre es requerido';
    if (!formData.email.trim()) return 'El email es requerido';
    if (!formData.password) return 'La contraseña es requerida';
    if (formData.password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (formData.password !== formData.confirmPassword) return 'Las contraseñas no coinciden';
    if (!formData.acceptTerms) return 'Debes aceptar los términos y condiciones';

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'El email no tiene un formato válido';

    return null;
  };

  const handleRegister = async () => {
    const validationError = validateForm();
    if (validationError) {
      Alert.alert('Error de validación', validationError);
      return;
    }

    try {
      await dispatch(
        registerUser({
          email: formData.email.trim().toLowerCase(),
          name: formData.name.trim(),
          password: formData.password,
          phone: formData.phone.trim() || undefined,
        })
      ).unwrap();

      // Success - user will be redirected by navigation logic
      Alert.alert('¡Bienvenido!', 'Tu cuenta ha sido creada exitosamente');
    } catch (error) {
      // Error handling is done by Redux, but we show user-friendly message
      const errorMessage = typeof error === 'string' ? error : 'Error al crear la cuenta';
      Alert.alert('Error', errorMessage);
    }
  };

  const updateField = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ScreenLayout
      backgroundColor='transparent'
      keyboardAvoiding
      safeArea
      scrollable
      statusBarStyle='dark-content'
    >
      <S.GradientBackground
        colors={[theme.colors.primary[50], theme.colors.secondary[50]]}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
      />
      <S.Container>
        <S.RegisterCard>
          <S.HeaderSection>
            <S.Title>Crear Cuenta</S.Title>
            <S.Subtitle>Únete a ReservApp y descubre experiencias únicas</S.Subtitle>
          </S.HeaderSection>

          <S.FormContainer>
            <Input
              autoCapitalize='words'
              label='Nombre completo'
              placeholder='Tu nombre completo'
              required
              value={formData.name}
              onChangeText={(value) => updateField('name', value)}
            />

            <Input
              autoCapitalize='none'
              keyboardType='email-address'
              label='Email'
              placeholder='tu@email.com'
              required
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
            />

            <Input
              keyboardType='phone-pad'
              label='Teléfono'
              placeholder='+52 33 1234 5678'
              value={formData.phone}
              onChangeText={(value) => updateField('phone', value)}
            />

            <Input
              label='Contraseña'
              placeholder='Mínimo 8 caracteres'
              required
              secureTextEntry
              showPasswordToggle
              value={formData.password}
              onChangeText={(value) => updateField('password', value)}
            />

            <Input
              label='Confirmar contraseña'
              placeholder='Repite tu contraseña'
              required
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={(value) => updateField('confirmPassword', value)}
            />

            <S.CheckboxContainer>
              <S.Checkbox
                checked={formData.acceptTerms}
                onPress={() => updateField('acceptTerms', !formData.acceptTerms)}
              >
                <S.CheckboxIcon checked={formData.acceptTerms}>
                  {formData.acceptTerms && '✓'}
                </S.CheckboxIcon>
              </S.Checkbox>
              <S.CheckboxText>
                Acepto los <S.TermsLink>términos y condiciones</S.TermsLink> y la{' '}
                <S.TermsLink>política de privacidad</S.TermsLink>
              </S.CheckboxText>
            </S.CheckboxContainer>

            <Button
              disabled={isLoading || !formData.acceptTerms}
              fullWidth
              loading={isLoading}
              size='lg'
              variant='primary'
              onPress={handleRegister}
            >
              Crear Cuenta
            </Button>
          </S.FormContainer>

          <S.BackLink onPress={() => navigation.goBack()}>
            <S.BackLinkText>← Ya tengo una cuenta</S.BackLinkText>
          </S.BackLink>
        </S.RegisterCard>
      </S.Container>
    </ScreenLayout>
  );
};

export default RegisterScreen;
