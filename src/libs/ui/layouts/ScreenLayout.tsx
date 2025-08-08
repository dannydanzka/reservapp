import React from 'react';
import { StatusBar, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
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
  children,
  backgroundColor = theme.colors.white,
  statusBarStyle = 'dark-content',
  scrollable = false,
  keyboardAvoiding = true,
  edges = ['top', 'bottom'],
  padding = true,
}) => {
  const content = (
    <Container $backgroundColor={backgroundColor} $padding={padding}>
      {children}
    </Container>
  );

  const scrollableContent = scrollable ? (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {content}
    </ScrollView>
  ) : (
    content
  );

  const keyboardAvoidingContent = keyboardAvoiding ? (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {scrollableContent}
    </KeyboardAvoidingView>
  ) : (
    scrollableContent
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }} edges={edges}>
      <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
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