import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import { theme } from '@styles/theme';

export const GradientBackground = styled(LinearGradient)`
  inset: 0;
  position: absolute;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const ContentContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: ${theme.spacing.xl}px;
`;

export const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing.xxxl}px;
`;

export const LogoText = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  font-size: ${theme.typography.fontSize.display}px;
  font-weight: bold;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const TaglineText = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.md}px;
  opacity: 0.9;
  text-align: center;
`;

export const ButtonContainer = styled.View`
  max-width: 300px;
  width: 100%;
`;

export const FooterContainer = styled.View`
  align-items: center;
  padding: ${theme.spacing.xl}px;
`;

export const FooterText = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
`;

export const RecoverText = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-weight: 600;
  text-decoration-line: underline;
`;
