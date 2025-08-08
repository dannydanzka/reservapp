import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import styled from 'styled-components/native';

import { theme } from '../theme/theme';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
  backgroundColor?: string;
  titleColor?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  rightComponent,
  onBackPress,
  backgroundColor = theme.colors.white,
  titleColor = theme.colors.gray[900],
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Container $backgroundColor={backgroundColor}>
      <LeftSection>
        {showBackButton && (
          <BackButton onPress={handleBackPress}>
            <ArrowLeft size={24} color={titleColor} />
          </BackButton>
        )}
      </LeftSection>

      <CenterSection>
        {title && <Title $color={titleColor}>{title}</Title>}
      </CenterSection>

      <RightSection>{rightComponent}</RightSection>
    </Container>
  );
};

const Container = styled.View<{ $backgroundColor: string }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 ${theme.spacing.md}px;
  background-color: ${(props) => props.$backgroundColor};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.gray[200]};
`;

const LeftSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

const CenterSection = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;

const RightSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

const BackButton = styled(TouchableOpacity)`
  padding: ${theme.spacing.xs}px;
  margin-left: -${theme.spacing.xs}px;
`;

const Title = styled.Text<{ $color: string }>`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${(props) => props.$color};
  text-align: center;
`;

export { Header };