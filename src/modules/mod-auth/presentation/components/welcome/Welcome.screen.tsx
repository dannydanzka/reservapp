import React from 'react';

import { TouchableOpacity } from 'react-native';

import { Button } from '@components';
import { ScreenLayout } from '@layouts';
import { theme } from '@presentation/styles/theme';

import { WelcomeScreenProps } from './Welcome.screen.interface';

import * as S from './Welcome.screen.styled';

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <ScreenLayout backgroundColor='transparent' statusBarStyle='light-content'>
      <S.GradientBackground
        colors={[theme.colors.primary[600], theme.colors.primary[500], theme.colors.secondary[500]]}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
      />
      <S.Container>
        <S.ContentContainer>
          <S.LogoContainer>
            <S.LogoText>ReservApp</S.LogoText>
            <S.TaglineText>Tu plataforma de reservas en Guadalajara</S.TaglineText>
          </S.LogoContainer>

          <S.ButtonContainer>
            <Button
              style={{ marginBottom: theme.spacing.md }}
              title='Iniciar Sesión'
              onPress={() => navigation.navigate('Login')}
            />

            <Button
              style={{
                borderColor: theme.colors.white,
                marginBottom: theme.spacing.lg,
              }}
              title='Registrarse'
              variant='outline'
              onPress={() => navigation.navigate('Register')}
            />
          </S.ButtonContainer>
        </S.ContentContainer>

        <S.FooterContainer>
          <S.FooterText>
            ¿Olvidaste tu contraseña?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <S.RecoverText>Recuperar</S.RecoverText>
            </TouchableOpacity>
          </S.FooterText>
        </S.FooterContainer>
      </S.Container>
    </ScreenLayout>
  );
};

export default WelcomeScreen;
