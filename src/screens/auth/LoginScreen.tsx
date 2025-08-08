import React, { useState } from 'react';
import {
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { Smartphone, Eye, EyeOff } from 'lucide-react-native';

import { theme } from '../../libs/ui/theme/theme';
import { useAppDispatch } from '../../store/store';
import { setUser, setLoading } from '../../store/slices/authSlice';
import { NavigationProps, AuthStackParamList } from '../../navigation/types';
import authService from '../../libs/services/auth/authService';
import { useI18n } from '../../hooks/useI18n';
import ScreenLayout from '../../components/Layout/ScreenLayout';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';

type LoginScreenProps = NavigationProps<AuthStackParamList>;

// Credenciales demo (replicando del web)
const DEMO_CREDENTIALS = [
  { email: 'admin@reservapp.com', password: 'password123', role: 'Administrador' },
  { email: 'manager@reservapp.com', password: 'password123', role: 'Manager' },
  { email: 'employee@reservapp.com', password: 'password123', role: 'Empleado' },
  { email: 'user@reservapp.com', password: 'password123', role: 'Usuario' },
];

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useI18n();

  const handleLogin = async () => {
    setError('');
    
    if (!email || !password) {
      setError(t('auth.emailRequired') + ' y ' + t('auth.passwordRequired'));
      return;
    }

    if (!email.includes('@')) {
      setError(t('auth.emailInvalid'));
      return;
    }

    if (password.length < 6) {
      setError(t('auth.passwordMinLength'));
      return;
    }

    setIsLoading(true);
    
    try {
      // Intentar login real con API
      const session = await authService.login({ email, password });
      
      // Actualizar store
      dispatch(setUser(session.user));
      
      // Navegación se maneja automáticamente por RootNavigator
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error del servidor. Intenta más tarde';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <ScreenLayout
      keyboardAvoiding={true}
      scrollable={true}
      safeArea={true}
      safeAreaEdges={['top', 'bottom']}
      statusBarStyle="dark-content"
      backgroundColor="transparent"
    >
      <GradientBackground
        colors={[theme.colors.primary[50], theme.colors.secondary[100]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Container>
        {/* Logo y título */}
        <LogoContainer>
          <LogoText>ReservApp</LogoText>
          <SubtitleText>{t('auth.welcome')}</SubtitleText>
        </LogoContainer>

        {/* Tarjeta de login */}
        <LoginCard>
          <BusinessLabel>
            <Smartphone size={16} color={theme.colors.primary[600]} />
            <BusinessLabelText>Portal Exclusivo para Negocios</BusinessLabelText>
          </BusinessLabel>

          <FormContainer>
            <Input
              label={t('auth.email')}
              value={email}
              onChangeText={setEmail}
              placeholder="tu@negocio.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
              error={error && error.includes('correo') ? error : undefined}
              required
            />

            <Input
              label={t('auth.password')}
              value={password}
              onChangeText={setPassword}
              placeholder={t('auth.password')}
              secureTextEntry={true}
              showPasswordToggle={true}
              editable={!isLoading}
              error={error && !error.includes('correo') ? error : undefined}
              required
            />

            <Button
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              fullWidth={true}
              variant="primary"
              size="lg"
            >
              {t('auth.login')}
            </Button>
          </FormContainer>

          {/* Credenciales demo */}
          <DemoSection>
            <DemoTitle>Credenciales de Prueba</DemoTitle>
            {DEMO_CREDENTIALS.map((cred, index) => (
              <DemoCredential key={index}>
                <DemoInfo>
                  <DemoRole>{cred.role}</DemoRole>
                  <DemoEmail>{cred.email}</DemoEmail>
                </DemoInfo>
                <DemoButton onPress={() => handleDemoLogin(cred.email, cred.password)}>
                  <DemoButtonText>Usar</DemoButtonText>
                </DemoButton>
              </DemoCredential>
            ))}
          </DemoSection>

          {/* Información adicional */}
          <InfoSection>
            <InfoText>
              ¿Eres usuario final? Descarga nuestra app móvil desde las tiendas de aplicaciones.
            </InfoText>
          </InfoSection>

          {/* Enlace para volver */}
          <BackLink onPress={() => navigation.navigate('Welcome')}>
            <BackLinkText>← Volver al Inicio</BackLinkText>
          </BackLink>
        </LoginCard>
      </Container>
    </ScreenLayout>
  );
};

// Styled Components
const GradientBackground = styled(LinearGradient).attrs({
  // Styled component attrs to properly handle styled-components with Expo LinearGradient
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.lg}px;
  min-height: 100%;
`;

const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing.xl}px;
`;

const LogoText = styled.Text`
  font-size: ${theme.typography.fontSize.display}px;
  font-weight: bold;
  color: ${theme.colors.primary[600]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  margin-bottom: ${theme.spacing.xs}px;
`;

const SubtitleText = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  color: ${theme.colors.gray[700]};
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

const LoginCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl}px;
  padding: ${theme.spacing.xl}px;
  width: 100%;
  max-width: 400px;
  ${theme.shadows.lg}
`;

const BusinessLabel = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primary[50]};
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  margin-bottom: ${theme.spacing.lg}px;
`;

const BusinessLabelText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 500;
  color: ${theme.colors.primary[600]};
  margin-left: ${theme.spacing.xs}px;
  font-family: ${theme.typography.fontFamily.primary.medium};
`;

const FormContainer = styled.View`
  gap: ${theme.spacing.md}px;
`;

const FormGroup = styled.View`
  gap: ${theme.spacing.sm}px;
`;

const Label = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 500;
  color: ${theme.colors.gray[700]};
  font-family: ${theme.typography.fontFamily.primary.medium};
`;

const StyledInput = styled.TextInput`
  padding: ${theme.spacing.md}px ${theme.spacing.md}px;
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md}px;
  font-size: ${theme.typography.fontSize.md}px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

const PasswordContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${theme.colors.white};
`;

const PasswordInput = styled.TextInput`
  flex: 1;
  padding: ${theme.spacing.md}px ${theme.spacing.md}px;
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

const PasswordToggle = styled.TouchableOpacity`
  padding: ${theme.spacing.md}px;
`;

const ErrorMessage = styled.Text`
  color: ${theme.colors.error[600]};
  font-size: ${theme.typography.fontSize.sm}px;
  text-align: center;
  padding: ${theme.spacing.sm}px;
  background-color: ${theme.colors.error[50]};
  border: 1px solid ${theme.colors.error[200]};
  border-radius: ${theme.borderRadius.md}px;
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

const SubmitButton = styled.TouchableOpacity<{ disabled: boolean }>`
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  background-color: ${({ disabled }) => 
    disabled ? theme.colors.gray[400] : theme.colors.primary[600]};
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
  justify-content: center;
  margin-top: ${theme.spacing.sm}px;
`;

const ButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.sm}px;
`;

const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 500;
  font-family: ${theme.typography.fontFamily.primary.medium};
`;

const DemoSection = styled.View`
  margin-top: ${theme.spacing.xl}px;
  padding-top: ${theme.spacing.lg}px;
  border-top-width: 1px;
  border-top-color: ${theme.colors.gray[200]};
`;

const DemoTitle = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 600;
  color: ${theme.colors.gray[700]};
  margin-bottom: ${theme.spacing.md}px;
  text-align: center;
  font-family: ${theme.typography.fontFamily.primary.bold};
`;

const DemoCredential = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.sm}px;
  background-color: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.md}px;
  margin-bottom: ${theme.spacing.sm}px;
`;

const DemoInfo = styled.View`
  flex: 1;
`;

const DemoRole = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 500;
  color: ${theme.colors.gray[700]};
  font-family: ${theme.typography.fontFamily.primary.medium};
`;

const DemoEmail = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.gray[500]};
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

const DemoButton = styled.TouchableOpacity`
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  background-color: ${theme.colors.primary[600]};
  border-radius: ${theme.borderRadius.sm}px;
`;

const DemoButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: 500;
  font-family: ${theme.typography.fontFamily.primary.medium};
`;

const InfoSection = styled.View`
  margin-top: ${theme.spacing.lg}px;
  padding: ${theme.spacing.md}px;
  background-color: ${theme.colors.info[50]};
  border-radius: ${theme.borderRadius.md}px;
  border: 1px solid ${theme.colors.info[200]};
`;

const InfoText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.info[700]};
  text-align: center;
  line-height: 20px;
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

const BackLink = styled.TouchableOpacity`
  align-items: center;
  margin-top: ${theme.spacing.lg}px;
`;

const BackLinkText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.primary[600]};
  font-family: ${theme.typography.fontFamily.primary.medium};
`;

export default LoginScreen;