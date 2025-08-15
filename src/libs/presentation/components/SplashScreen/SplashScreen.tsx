import React, { useEffect, useRef } from 'react';

import { Animated, Dimensions, StatusBar } from 'react-native';
import { Calendar, CheckCircle, MapPin, Sparkles } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  AnimatedIcon,
  AppName,
  Container,
  Dot,
  DotsContainer,
  LoadingContainer,
  LoadingText,
  LogoContainer,
  Tagline,
} from './SplashScreen.styled';

const { height, width } = Dimensions.get('window');

export const SplashScreen: React.FC = () => {
  // Animaciones
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const iconsOpacity = useRef(new Animated.Value(0)).current;
  const loadingOpacity = useRef(new Animated.Value(0)).current;

  // Animaciones de los iconos flotantes
  const mapPinRotation = useRef(new Animated.Value(0)).current;
  const calendarScale = useRef(new Animated.Value(1)).current;
  const checkScale = useRef(new Animated.Value(1)).current;
  const sparklesRotation = useRef(new Animated.Value(0)).current;

  // Animación de los dots de loading
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Secuencia principal de animaciones
    const mainSequence = Animated.sequence([
      // 1. Logo aparece con escala y fade
      Animated.parallel([
        Animated.timing(logoScale, {
          duration: 800,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          duration: 800,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),

      // 2. Tagline aparece
      Animated.timing(taglineOpacity, {
        duration: 600,
        toValue: 1,
        useNativeDriver: true,
      }),

      // 3. Iconos aparecen
      Animated.timing(iconsOpacity, {
        duration: 500,
        toValue: 1,
        useNativeDriver: true,
      }),

      // 4. Loading aparece
      Animated.timing(loadingOpacity, {
        duration: 400,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]);

    // Animaciones continuas de los iconos
    const mapPinAnimation = Animated.loop(
      Animated.timing(mapPinRotation, {
        duration: 3000,
        toValue: 1,
        useNativeDriver: true,
      })
    );

    const calendarAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(calendarScale, {
          duration: 1000,
          toValue: 1.1,
          useNativeDriver: true,
        }),
        Animated.timing(calendarScale, {
          duration: 1000,
          toValue: 1,
          useNativeDriver: true,
        }),
      ])
    );

    const checkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(checkScale, {
          duration: 800,
          toValue: 1.2,
          useNativeDriver: true,
        }),
        Animated.timing(checkScale, {
          duration: 800,
          toValue: 1,
          useNativeDriver: true,
        }),
      ])
    );

    const sparklesAnimation = Animated.loop(
      Animated.timing(sparklesRotation, {
        duration: 4000,
        toValue: 1,
        useNativeDriver: true,
      })
    );

    // Animación de dots de loading
    const dotAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(dot1, {
          duration: 400,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(dot2, {
          duration: 400,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(dot3, {
          duration: 400,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(dot1, {
            duration: 400,
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            duration: 400,
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.timing(dot3, {
            duration: 400,
            toValue: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Iniciar animaciones
    mainSequence.start();

    // Delay para animaciones continuas
    setTimeout(() => {
      mapPinAnimation.start();
      calendarAnimation.start();
      checkAnimation.start();
      sparklesAnimation.start();
      dotAnimation.start();
    }, 2000);

    return () => {
      mapPinAnimation.stop();
      calendarAnimation.stop();
      checkAnimation.stop();
      sparklesAnimation.stop();
      dotAnimation.stop();
    };
  }, []);

  // Interpolaciones para rotaciones
  const mapPinRotate = mapPinRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const sparklesRotate = sparklesRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Interpolaciones para dots
  const dotScale1 = dot1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.3],
  });

  const dotScale2 = dot2.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.3],
  });

  const dotScale3 = dot3.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.3],
  });

  return (
    <>
      <StatusBar backgroundColor='#6B46C1' barStyle='light-content' />
      <Container>
        <LinearGradient
          colors={['#6B46C1', '#8B5CF6', '#A855F7']}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={{ flex: 1, height, width }}
        >
          {/* Iconos flotantes animados */}
          <AnimatedIcon
            style={{
              left: width * 0.15,
              opacity: iconsOpacity,
              position: 'absolute',
              top: height * 0.15,
              transform: [{ rotate: mapPinRotate }],
            }}
          >
            <MapPin color='rgba(255,255,255,0.3)' size={24} />
          </AnimatedIcon>

          <AnimatedIcon
            style={{
              opacity: iconsOpacity,
              position: 'absolute',
              right: width * 0.15,
              top: height * 0.2,
              transform: [{ scale: calendarScale }],
            }}
          >
            <Calendar color='rgba(255,255,255,0.4)' size={28} />
          </AnimatedIcon>

          <AnimatedIcon
            style={{
              bottom: height * 0.25,
              left: width * 0.1,
              opacity: iconsOpacity,
              position: 'absolute',
              transform: [{ scale: checkScale }],
            }}
          >
            <CheckCircle color='rgba(255,255,255,0.3)' size={26} />
          </AnimatedIcon>

          <AnimatedIcon
            style={{
              bottom: height * 0.2,
              opacity: iconsOpacity,
              position: 'absolute',
              right: width * 0.2,
              transform: [{ rotate: sparklesRotate }],
            }}
          >
            <Sparkles color='rgba(255,255,255,0.4)' size={22} />
          </AnimatedIcon>

          {/* Logo Principal */}
          <LogoContainer>
            <Animated.View
              style={{
                alignItems: 'center',
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              }}
            >
              <AppName>ReservApp</AppName>
              <Animated.View style={{ opacity: taglineOpacity }}>
                <Tagline>Tu plataforma de reservas</Tagline>
              </Animated.View>
            </Animated.View>
          </LogoContainer>

          {/* Loading Section */}
          <LoadingContainer style={{ opacity: loadingOpacity }}>
            <LoadingText>Verificando sesión</LoadingText>
            <DotsContainer>
              <Dot style={{ transform: [{ scale: dotScale1 }] }} />
              <Dot style={{ transform: [{ scale: dotScale2 }] }} />
              <Dot style={{ transform: [{ scale: dotScale3 }] }} />
            </DotsContainer>
          </LoadingContainer>
        </LinearGradient>
      </Container>
    </>
  );
};
