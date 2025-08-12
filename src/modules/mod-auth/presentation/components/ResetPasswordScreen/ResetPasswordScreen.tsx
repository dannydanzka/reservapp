import React, { useState } from 'react';

import { Alert } from 'react-native';
import { CheckCircle, Eye, EyeOff, Key } from 'lucide-react-native';
import styled from 'styled-components/native';

import {
  Form,
  FormErrorSummary,
  FormSection,
  LoadingState,
  useFormValidation,
  useNotifications,
  ValidatedInput,
} from '@components';
import { theme } from '@styles/theme';
import { useI18n } from '@hooks/useI18n';
import authService from '@libs/services/auth/authService';
import Button from '@components/Form/Button';
import ScreenLayout from '@components/Layout/ScreenLayout';

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordScreenProps {
  navigation: any;
  route: {
    params: {
      token: string;
    };
  };
}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ navigation, route }) => {
  const { token } = route.params;
  const { t } = useI18n();
  const { showError, showSuccess } = useNotifications();
  const [passwordReset, setPasswordReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form validation setup
  const formValidation = useFormValidation<ResetPasswordFormData>({
    fields: [
      {
        label: 'Nueva Contraseña',
        name: 'newPassword',
        rules: [
          { message: 'Nueva contraseña es requerida', type: 'required' },
          { message: 'Mínimo 6 caracteres', type: 'minLength', value: 6 },
        ],
      },
      {
        dependencies: ['newPassword'],
        label: 'Confirmar Contraseña',
        name: 'confirmPassword',
        rules: [
          {
            message: 'Confirmación de contraseña es requerida',
            type: 'required',
          },
          {
            field: 'newPassword',
            message: 'Las contraseñas no coinciden',
            type: 'matches',
          },
        ],
      },
    ],
    initialValues: {
      confirmPassword: '',
      newPassword: '',
    },
    onSubmit: handleSubmit,
    validateOnBlur: true,
    validateOnChange: true,
  });

  const { formState, getFieldError, handleSubmit, hasFieldError, isFieldTouched, setValue } =
    formValidation;

  async function handleSubmit(values: ResetPasswordFormData) {
    try {
      await authService.resetPassword(token, values.newPassword);

      setPasswordReset(true);
      showSuccess('Tu contraseña ha sido restablecida exitosamente', 'Contraseña Actualizada');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error al restablecer contraseña';
      showError(errorMessage, 'Error');
    }
  }

  if (passwordReset) {
    return (
      <ScreenLayout
        backgroundColor='transparent'
        keyboardAvoiding
        safeArea
        safeAreaEdges={['top', 'bottom']}
        scrollable
        statusBarStyle='dark-content'
      >
        <GradientBackground
          colors={[theme.colors.primary[50], theme.colors.secondary[50], theme.colors.primary[100]]}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
        />
        <Container>
          <SuccessCard>
            <SuccessIcon>
              <CheckCircle color={theme.colors.success[500]} size={64} />
            </SuccessIcon>

            <SuccessTitle>¡Contraseña Restablecida!</SuccessTitle>
            <SuccessMessage>
              Tu contraseña ha sido cambiada exitosamente. Ahora puedes iniciar sesión con tu nueva
              contraseña.
            </SuccessMessage>

            <SuccessActions>
              <Button
                fullWidth
                size='lg'
                variant='primary'
                onPress={() => navigation.navigate('Login')}
              >
                Iniciar Sesión
              </Button>
            </SuccessActions>
          </SuccessCard>
        </Container>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout
      backgroundColor='transparent'
      keyboardAvoiding
      safeArea
      safeAreaEdges={['top', 'bottom']}
      scrollable
      statusBarStyle='dark-content'
    >
      <GradientBackground
        colors={[theme.colors.primary[50], theme.colors.secondary[50], theme.colors.primary[100]]}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
      />
      <Container>
        {/* Header */}
        <HeaderContent>
          <HeaderTitle>Nueva Contraseña</HeaderTitle>
          <HeaderSubtitle>Crea una nueva contraseña segura</HeaderSubtitle>
        </HeaderContent>

        {/* Form Card */}
        <FormCard>
          <Form onSubmit={handleSubmit}>
            <FormSection>
              {/* Icon */}
              <IconContainer>
                <Key color={theme.colors.primary[500]} size={48} />
              </IconContainer>

              {/* Form */}
              <FormContainer>
                <FormErrorSummary errors={formState.errors} />

                <PasswordFieldContainer>
                  <ValidatedInput
                    autoComplete='new-password'
                    error={getFieldError('newPassword')}
                    label='Nueva Contraseña'
                    name='newPassword'
                    placeholder='Mínimo 6 caracteres'
                    required
                    secureTextEntry={!showPassword}
                    touched={isFieldTouched('newPassword')}
                    value={formState.values.newPassword}
                    onBlur={() => formValidation.markFieldAsTouched('newPassword')}
                    onChangeText={(text) => setValue('newPassword', text)}
                  />
                  <PasswordToggle onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff color={theme.colors.gray[500]} size={20} />
                    ) : (
                      <Eye color={theme.colors.gray[500]} size={20} />
                    )}
                  </PasswordToggle>
                </PasswordFieldContainer>

                <PasswordFieldContainer>
                  <ValidatedInput
                    autoComplete='new-password'
                    error={getFieldError('confirmPassword')}
                    label='Confirmar Nueva Contraseña'
                    name='confirmPassword'
                    placeholder='Repite la contraseña'
                    required
                    secureTextEntry={!showConfirmPassword}
                    touched={isFieldTouched('confirmPassword')}
                    value={formState.values.confirmPassword}
                    onBlur={() => formValidation.markFieldAsTouched('confirmPassword')}
                    onChangeText={(text) => setValue('confirmPassword', text)}
                  />
                  <PasswordToggle onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? (
                      <EyeOff color={theme.colors.gray[500]} size={20} />
                    ) : (
                      <Eye color={theme.colors.gray[500]} size={20} />
                    )}
                  </PasswordToggle>
                </PasswordFieldContainer>

                <Button
                  disabled={!formState.isValid || formState.isSubmitting}
                  fullWidth
                  loading={formState.isSubmitting}
                  size='lg'
                  variant='primary'
                  onPress={handleSubmit}
                >
                  Restablecer Contraseña
                </Button>
              </FormContainer>

              {/* Security Info */}
              <InfoSection>
                <InfoTitle>Consejos de Seguridad:</InfoTitle>
                <InfoList>
                  <InfoItem>• Usa al menos 6 caracteres</InfoItem>
                  <InfoItem>• Combina letras, números y símbolos</InfoItem>
                  <InfoItem>• Evita información personal</InfoItem>
                </InfoList>
              </InfoSection>
            </FormSection>
          </Form>
        </FormCard>
      </Container>
    </ScreenLayout>
  );
};

// Styled Components
const Container = styled.View`
  flex: 1;
  padding: ${theme.spacing.lg}px;
  justify-content: center;
`;

const GradientBackground = styled.LinearGradient`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const HeaderContent = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing.xl}px;
`;

const HeaderTitle = styled.Text`
  font-size: ${theme.typography.fontSize.xxl}px;
  font-weight: bold;
  color: ${theme.colors.primary[700]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  margin-bottom: ${theme.spacing.xs}px;
  text-align: center;
`;

const HeaderSubtitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.primary[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  text-align: center;
`;

const FormCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl}px;
  padding: ${theme.spacing.xl}px;
  ${theme.shadows.lg}
`;

const IconContainer = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing.xl}px;
`;

const FormContainer = styled.View`
  gap: ${theme.spacing.lg}px;
`;

const PasswordFieldContainer = styled.View`
  position: relative;
`;

const PasswordToggle = styled.TouchableOpacity`
  position: absolute;
  right: ${theme.spacing.md}px;
  top: 38px;
  padding: ${theme.spacing.sm}px;
`;

const InfoSection = styled.View`
  margin-top: ${theme.spacing.xl}px;
  padding-top: ${theme.spacing.lg}px;
  border-top-width: 1px;
  border-top-color: ${theme.colors.border.light};
`;

const InfoTitle = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.primary.bold};
  margin-bottom: ${theme.spacing.sm}px;
`;

const InfoList = styled.View`
  gap: ${theme.spacing.xs}px;
`;

const InfoItem = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

// Success Screen Components
const SuccessCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl}px;
  padding: ${theme.spacing.xl}px;
  ${theme.shadows.lg}
  align-items: center;
`;

const SuccessIcon = styled.View`
  margin-bottom: ${theme.spacing.lg}px;
`;

const SuccessTitle = styled.Text`
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: bold;
  color: ${theme.colors.success[700]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  margin-bottom: ${theme.spacing.md}px;
  text-align: center;
`;

const SuccessMessage = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  font-family: ${theme.typography.fontFamily.primary.regular};
  text-align: center;
  line-height: 22px;
  margin-bottom: ${theme.spacing.xl}px;
`;

const SuccessActions = styled.View`
  width: 100%;
`;

export default ResetPasswordScreen;
