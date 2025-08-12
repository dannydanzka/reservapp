import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import { theme } from '@styles/theme';

// Background and Container
export const GradientBackground = styled(LinearGradient)`
  inset: 0;
  position: absolute;
`;

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  min-height: 100%;
  padding: ${theme.spacing.lg}px;
`;

// Logo Section
export const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing.xl}px;
`;

export const LogoText = styled.Text`
  color: ${theme.colors.primary[600]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  font-size: ${theme.typography.fontSize.display}px;
  font-weight: bold;
  margin-bottom: ${theme.spacing.xs}px;
`;

export const SubtitleText = styled.Text`
  color: ${theme.colors.gray[700]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.lg}px;
`;

// Login Card
export const LoginCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl}px;
  padding: ${theme.spacing.xl}px;
  width: 100%;
  max-width: 400px;
  ${theme.shadows.lg}
`;

export const BusinessLabel = styled.View`
  align-items: center;
  background-color: ${theme.colors.primary[50]};
  border-radius: ${theme.borderRadius.md}px;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${theme.spacing.lg}px;
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
`;

export const BusinessLabelText = styled.Text`
  color: ${theme.colors.primary[600]};
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 500;
  margin-left: ${theme.spacing.xs}px;
`;

// Form
export const FormContainer = styled.View`
  gap: ${theme.spacing.md}px;
`;

// Demo Section
export const DemoSection = styled.View`
  border-top-color: ${theme.colors.gray[200]};
  border-top-width: 1px;
  margin-top: ${theme.spacing.xl}px;
  padding-top: ${theme.spacing.lg}px;
`;

export const DemoTitle = styled.Text`
  color: ${theme.colors.gray[700]};
  font-family: ${theme.typography.fontFamily.primary.bold};
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 600;
  margin-bottom: ${theme.spacing.md}px;
  text-align: center;
`;

export const DemoCredential = styled.View`
  align-items: center;
  background-color: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.md}px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm}px;
  padding: ${theme.spacing.sm}px;
`;

export const DemoInfo = styled.View`
  flex: 1;
`;

export const DemoRole = styled.Text`
  color: ${theme.colors.gray[700]};
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 500;
`;

export const DemoEmail = styled.Text`
  color: ${theme.colors.gray[500]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.xs}px;
`;

export const DemoButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary[600]};
  border-radius: ${theme.borderRadius.sm}px;
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
`;

export const DemoButtonText = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: 500;
`;

// Info Section
export const InfoSection = styled.View`
  background-color: ${theme.colors.info[50]};
  border: 1px solid ${theme.colors.info[200]};
  border-radius: ${theme.borderRadius.md}px;
  margin-top: ${theme.spacing.lg}px;
  padding: ${theme.spacing.md}px;
`;

export const InfoText = styled.Text`
  color: ${theme.colors.info[700]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
  line-height: 20px;
  text-align: center;
`;

// Back Link
export const BackLink = styled.TouchableOpacity`
  align-items: center;
  margin-top: ${theme.spacing.lg}px;
`;

export const BackLinkText = styled.Text`
  color: ${theme.colors.primary[600]};
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-size: ${theme.typography.fontSize.sm}px;
`;
