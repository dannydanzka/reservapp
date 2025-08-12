import React from 'react';

import { KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { theme } from '../theme/theme';

interface ScreenLayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
  padding?: boolean;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  backgroundColor = theme.colors.white,
  children,
  edges = ['top', 'bottom'],
  keyboardAvoiding = true,
  padding = true,
  scrollable = false,
  statusBarStyle = 'dark-content',
}) => {
  const content = (
    <Container $backgroundColor={backgroundColor} $padding={padding}>
      {children}
    </Container>
  );

  const scrollableContent = scrollable ? (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      {content}
    </ScrollView>
  ) : (
    content
  );

  const keyboardAvoidingContent = keyboardAvoiding ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      {scrollableContent}
    </KeyboardAvoidingView>
  ) : (
    scrollableContent
  );

  return (
    <SafeAreaView edges={edges} style={{ backgroundColor, flex: 1 }}>
      <StatusBar backgroundColor={backgroundColor} barStyle={statusBarStyle} />
      {keyboardAvoidingContent}
    </SafeAreaView>
  );
};

const Container = styled.View<{ $backgroundColor: string; $padding: boolean }>`
  flex: 1;
  background-color: ${(props) => props.$backgroundColor};
  ${(props) => props.$padding && `padding: ${theme.spacing.md}px;`}
`;

export { ScreenLayout };
