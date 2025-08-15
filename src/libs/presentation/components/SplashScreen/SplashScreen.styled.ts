import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #6b46c1;
  flex: 1;
`;

export const LogoContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding-horizontal: 40px;
`;

export const AppName = styled.Text`
  color: #fff;
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 2px;
  text-align: center;
  text-shadow: 0 2px 8px rgb(0 0 0 / 0.3);
`;

export const Tagline = styled.Text`
  color: rgb(255 255 255 / 0.9);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-top: 8px;
  text-align: center;
`;

export const LoadingContainer = styled(Animated.View)`
  align-items: center;
  bottom: 80px;
  left: 0;
  position: absolute;
  right: 0;
`;

export const LoadingText = styled.Text`
  color: rgb(255 255 255 / 0.8);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.3px;
  margin-bottom: 20px;
`;

export const DotsContainer = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 8px;
`;

export const Dot = styled(Animated.View)`
  background-color: rgb(255 255 255 / 0.7);
  border-radius: 4px;
  height: 8px;
  width: 8px;
`;

export const AnimatedIcon = styled(Animated.View)`
  align-items: center;
  backdrop-filter: blur(10px);
  background-color: rgb(255 255 255 / 0.1);
  border-radius: 25px;
  height: 50px;
  justify-content: center;
  width: 50px;
`;
