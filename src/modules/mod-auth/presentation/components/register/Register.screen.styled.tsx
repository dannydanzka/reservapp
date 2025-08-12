import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import { theme } from '@styles/theme';

export const GradientBackground = styled(LinearGradient)`
  inset: 0;
  position: absolute;
`;

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: ${theme.spacing.lg}px;
`;

export const RegisterCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl}px;
  padding: ${theme.spacing.xl}px;
  width: 100%;
  max-width: 400px;
  ${theme.shadows.lg}
`;

export const HeaderSection = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing.xl}px;
`;

export const Title = styled.Text`
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  font-size: ${theme.typography.fontSize.xxl}px;
  font-weight: bold;
  margin-bottom: ${theme.spacing.xs}px;
`;

export const Subtitle = styled.Text`
  color: ${theme.colors.gray[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.md}px;
  text-align: center;
`;

export const FormContainer = styled.View`
  gap: ${theme.spacing.md}px;
`;

export const CheckboxContainer = styled.View`
  align-items: flex-start;
  flex-direction: row;
  margin-top: ${theme.spacing.sm}px;
`;

export const Checkbox = styled.TouchableOpacity<{ checked?: boolean }>`
  flex-shrink: 0;
  height: 20px;
  margin-top: 2px;
  width: 20px;
`;

export const CheckboxIcon = styled.View<{ checked?: boolean }>`
  align-items: center;
  background-color: ${({ checked }) => (checked ? theme.colors.primary[600] : 'transparent')};
  border-color: ${({ checked }) => (checked ? theme.colors.primary[600] : theme.colors.gray[300])};
  border-radius: 4px;
  border-width: 2px;
  color: ${theme.colors.white};
  font-size: 12px;
  font-weight: bold;
  height: 20px;
  justify-content: center;
  width: 20px;
`;

export const CheckboxText = styled.Text`
  color: ${theme.colors.gray[700]};
  flex: 1;
  font-family: ${theme.typography.fontFamily.primary.regular};
  font-size: ${theme.typography.fontSize.sm}px;
  line-height: 20px;
  margin-left: ${theme.spacing.sm}px;
`;

export const TermsLink = styled.Text`
  color: ${theme.colors.primary[600]};
  font-family: ${theme.typography.fontFamily.primary.medium};
  text-decoration-line: underline;
`;

export const BackLink = styled.TouchableOpacity`
  align-items: center;
  margin-top: ${theme.spacing.lg}px;
`;

export const BackLinkText = styled.Text`
  color: ${theme.colors.primary[600]};
  font-family: ${theme.typography.fontFamily.primary.medium};
  font-size: ${theme.typography.fontSize.sm}px;
`;
