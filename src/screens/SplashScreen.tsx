import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'expo-linear-gradient';

import { theme } from '../libs/ui/theme/theme';

interface SplashScreenProps {
  onFinish?: () => void;
}

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Secuencia de animaciones
    Animated.sequence([
      // Fade in del logo
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Pequeña pausa
      Animated.delay(300),
      // Fade in del texto
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Pausa antes de terminar
      Animated.delay(1000),
    ]).start(() => {
      // Terminar splash después de las animaciones
      if (onFinish) {
        onFinish();
      }
    });
  }, [fadeAnim, scaleAnim, textOpacity, onFinish]);

  return (
    <Container>
      <GradientBackground
        colors={[theme.colors.primary[600], theme.colors.primary[400], theme.colors.secondary[400]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <ContentContainer>
        {/* Logo animado */}
        <LogoContainer
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <LogoCircle>
            <LogoText>R</LogoText>
          </LogoCircle>
        </LogoContainer>

        {/* Texto de marca */}
        <BrandContainer
          style={{
            opacity: textOpacity,
          }}
        >
          <AppTitle>ReservApp</AppTitle>
          <AppSubtitle>Tu espacio, tu momento</AppSubtitle>
        </BrandContainer>
      </ContentContainer>

      {/* Loading indicator */}
      <LoadingContainer>
        <ActivityIndicator 
          size="small" 
          color={theme.colors.white} 
        />
        <LoadingText>Cargando...</LoadingText>
      </LoadingContainer>

      {/* Version info */}
      <VersionContainer>
        <VersionText>v1.0.0</VersionText>
      </VersionContainer>
    </Container>
  );
};

// Styled Components
const Container = styled.View`
  flex: 1;
  position: relative;
`;

const GradientBackground = styled(LinearGradient).attrs({
  // Styled component attrs to properly handle styled-components with Expo LinearGradient
})`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl}px;
`;

const LogoContainer = styled(Animated.View)`
  margin-bottom: ${theme.spacing.xl}px;
`;

const LogoCircle = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${theme.colors.white};
  justify-content: center;
  align-items: center;
  ${theme.shadows.lg}
`;

const LogoText = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: ${theme.colors.primary[600]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
`;

const BrandContainer = styled(Animated.View)`
  align-items: center;
`;

const AppTitle = styled.Text`
  font-size: ${theme.typography.fontSize.xxxl}px;
  font-weight: bold;
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  margin-bottom: ${theme.spacing.sm}px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`;

const AppSubtitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary.regular};
  opacity: 0.9;
  text-align: center;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
`;

const LoadingContainer = styled.View`
  position: absolute;
  bottom: 120px;
  left: 0;
  right: 0;
  align-items: center;
`;

const LoadingText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.sm}px;
  font-family: ${theme.typography.fontFamily.primary.regular};
  margin-top: ${theme.spacing.md}px;
  opacity: 0.8;
`;

const VersionContainer = styled.View`
  position: absolute;
  bottom: ${theme.spacing.xl}px;
  left: 0;
  right: 0;
  align-items: center;
`;

const VersionText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.xs}px;
  font-family: ${theme.typography.fontFamily.primary.regular};
  opacity: 0.6;
`;

export default SplashScreen;