import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #6b46c1;
`;

export const LogoContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 40px;
`;

export const AppName = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  letter-spacing: 2px;
  text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
`;

export const Tagline = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-top: 8px;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

export const LoadingContainer = styled(Animated.View)`
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
  align-items: center;
`;

export const LoadingText = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
  letter-spacing: 0.3px;
`;

export const DotsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const Dot = styled(Animated.View)`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.7);
`;

export const AnimatedIcon = styled(Animated.View)`
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;
