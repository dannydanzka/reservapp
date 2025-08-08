import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { ScreenLayout } from '../../../libs/ui/layouts';
import { Button } from '../../components';
import { theme } from '../../../libs/ui/theme/theme';
import { NavigationProps, AuthStackParamList } from '../../navigation/types';

type WelcomeScreenProps = NavigationProps<AuthStackParamList>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <ScreenLayout backgroundColor={theme.colors.primary[500]} statusBarStyle="light-content">
      <Container>
        <ContentContainer>
          <LogoContainer>
            <LogoText>ReservApp</LogoText>
            <TaglineText>Tu plataforma de reservas en Guadalajara</TaglineText>
          </LogoContainer>

          <ButtonContainer>
            <Button
              title="Iniciar Sesión"
              onPress={() => navigation.navigate('Login')}
              style={{ marginBottom: theme.spacing.md }}
            />
            
            <Button
              title="Registrarse"
              variant="outline"
              onPress={() => navigation.navigate('Register')}
              style={{ 
                marginBottom: theme.spacing.lg,
                borderColor: theme.colors.white,
              }}
            />
          </ButtonContainer>
        </ContentContainer>

        <FooterContainer>
          <FooterText>
            ¿Olvidaste tu contraseña?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <RecoverText>Recuperar</RecoverText>
            </TouchableOpacity>
          </FooterText>
        </FooterContainer>
      </Container>
    </ScreenLayout>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl}px;
`;

const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing.xxxl}px;
`;

const LogoText = styled.Text`
  font-size: ${theme.typography.fontSize.display}px;
  font-weight: bold;
  color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.sm}px;
`;

const TaglineText = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.white};
  text-align: center;
  opacity: 0.9;
`;

const ButtonContainer = styled.View`
  width: 100%;
  max-width: 300px;
`;

const FooterContainer = styled.View`
  align-items: center;
  padding: ${theme.spacing.xl}px;
`;

const FooterText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.sm}px;
`;

const RecoverText = styled.Text`
  color: ${theme.colors.white};
  font-weight: 600;
  text-decoration-line: underline;
`;

export default WelcomeScreen;