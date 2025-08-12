import React from 'react';

import { ChevronRight } from 'lucide-react-native';
import styled from 'styled-components/native';

import { theme } from '@styles/theme';

interface OptionCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  value?: string;
  onPress?: () => void;
  showChevron?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'filled';
}

const Container = styled.TouchableOpacity<{
  variant?: 'default' | 'filled';
  disabled?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px;
  background-color: ${({ variant }) =>
    variant === 'filled' ? theme.colors.surface.secondary : theme.colors.surface.primary};
  border-radius: ${theme.borderRadius.lg}px;
  margin-bottom: ${theme.spacing.md}px;
  ${({ variant }) => variant === 'default' && theme.shadows.sm}
  ${({ variant }) =>
    variant === 'filled' && `border-width: 1px; border-color: ${theme.colors.border.light};`}

  ${({ disabled }) => disabled && 'opacity: 0.5;'}
`;

const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${theme.colors.primary[100]};
  justify-content: center;
  align-items: center;
  margin-right: ${theme.spacing.md}px;
`;

const Content = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.primary.bold};
  margin-bottom: ${theme.spacing.xs}px;
`;

const Subtitle = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.tertiary};
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

const Value = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  font-family: ${theme.typography.fontFamily.primary.medium};
`;

const OptionCard: React.FC<OptionCardProps> = ({
  disabled = false,
  icon = null,
  onPress = () => {},
  showChevron = true,
  subtitle = '',
  title = '',
  value = '',
  variant = 'default',
}) => {
  return (
    <Container disabled={disabled} variant={variant} onPress={disabled ? undefined : onPress}>
      {icon && (
        <IconContainer>
          {React.cloneElement(icon as React.ReactElement, {
            color: theme.colors.primary[600],
            size: 20,
          })}
        </IconContainer>
      )}

      <Content>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {value && <Value>{value}</Value>}
      </Content>

      {showChevron && <ChevronRight color={theme.colors.text.tertiary} size={20} />}
    </Container>
  );
};

export default OptionCard;
