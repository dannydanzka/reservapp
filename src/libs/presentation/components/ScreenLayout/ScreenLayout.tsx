import React from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { theme } from '@styles/theme';

import { useKeyboard } from '../../hooks/useKeyboard';

export interface ScreenLayoutProps {
  children: React.ReactNode;

  // SafeArea configuration
  safeArea?: boolean;
  safeAreaEdges?: ('top' | 'bottom' | 'left' | 'right')[];
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
  statusBarBackground?: string;

  // Keyboard configuration
  keyboardAvoiding?: boolean;
  keyboardBehavior?: 'padding' | 'height' | 'position';
  keyboardVerticalOffset?: number;

  // Scroll configuration
  scrollable?: boolean;
  refreshable?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
  showsVerticalScrollIndicator?: boolean;
  contentContainerStyle?: any;

  // Layout configuration
  backgroundColor?: string;
  padding?: number | string;
  paddingHorizontal?: number | string;
  paddingVertical?: number | string;
  flex?: number;

  // Loading and error states
  loading?: boolean;
  error?: string | null;

  // Custom styles
  style?: any;
  containerStyle?: any;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  backgroundColor = theme.colors.gray[50],
  children,
  containerStyle = {},
  contentContainerStyle = {},
  error = null,
  flex = 1,
  keyboardAvoiding = true,
  keyboardBehavior = Platform.OS === 'ios' ? 'padding' : 'height',
  keyboardVerticalOffset = 0,
  loading = false,
  onRefresh = () => {},
  padding = 0,
  paddingHorizontal = theme.spacing.md,
  paddingVertical = 0,
  refreshable = false,
  refreshing = false,
  safeArea = true,
  safeAreaEdges = ['top', 'bottom', 'left', 'right'],
  scrollable = false,
  showsVerticalScrollIndicator = false,
  statusBarBackground = 'transparent',
  statusBarStyle = 'dark-content',
  style = {},
}) => {
  const insets = useSafeAreaInsets();
  const _keyboard = useKeyboard();

  // Calculate safe area padding based on edges
  const getSafeAreaStyle = () => {
    if (!safeArea) return {};

    const style: any = {};
    safeAreaEdges.forEach((edge) => {
      switch (edge) {
        case 'top':
          style.paddingTop = insets.top;
          break;
        case 'bottom':
          style.paddingBottom = insets.bottom;
          break;
        case 'left':
          style.paddingLeft = insets.left;
          break;
        case 'right':
          style.paddingRight = insets.right;
          break;
      }
    });

    return style;
  };

  // Calculate keyboard offset
  const getKeyboardOffset = () => {
    if (!keyboardAvoiding) return keyboardVerticalOffset;

    // On iOS, we might need additional offset for the tab bar or navigation
    if (Platform.OS === 'ios') {
      return keyboardVerticalOffset;
    }

    // On Android, usually no additional offset needed
    return keyboardVerticalOffset;
  };

  const containerStyleCombined = [
    styles.container,
    {
      backgroundColor,
      flex,
      padding,
      paddingHorizontal,
      paddingVertical,
    },
    getSafeAreaStyle(),
    containerStyle,
  ];

  const contentStyle = [scrollable && styles.scrollContent, contentContainerStyle];

  const renderContent = () => {
    if (loading) {
      return (
        <LoadingContainer>
          <LoadingText>Cargando...</LoadingText>
        </LoadingContainer>
      );
    }

    if (error) {
      return (
        <ErrorContainer>
          <ErrorText>{error}</ErrorText>
        </ErrorContainer>
      );
    }

    if (scrollable) {
      return (
        <ScrollView
          contentContainerStyle={contentStyle}
          keyboardShouldPersistTaps='handled'
          refreshControl={
            refreshable && onRefresh ? (
              <RefreshControl
                colors={[theme.colors.primary[500]]}
                refreshing={refreshing}
                tintColor={theme.colors.primary[500]}
                onRefresh={onRefresh}
              />
            ) : undefined
          }
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          style={[styles.scrollView, style]}
        >
          {children}
        </ScrollView>
      );
    }

    return <ContentContainer style={style}>{children}</ContentContainer>;
  };

  const LayoutComponent = safeArea ? SafeAreaView : Container;

  return (
    <>
      <StatusBar
        backgroundColor={statusBarBackground}
        barStyle={statusBarStyle}
        translucent={Platform.OS === 'android'}
      />

      <LayoutComponent style={containerStyleCombined}>
        {keyboardAvoiding ? (
          <KeyboardAvoidingView
            behavior={keyboardBehavior}
            keyboardVerticalOffset={getKeyboardOffset()}
            style={styles.keyboardAvoidingView}
          >
            {renderContent()}
          </KeyboardAvoidingView>
        ) : (
          renderContent()
        )}
      </LayoutComponent>
    </>
  );
};

// Styled Components
const Container = styled.View`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.Text`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.typography.fontSize.md}px;
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl}px;
`;

const ErrorText = styled.Text`
  color: ${theme.colors.error[600]};
  font-size: ${theme.typography.fontSize.md}px;
  font-family: ${theme.typography.fontFamily.primary.regular};
  text-align: center;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  scrollView: {
    flex: 1,
  },
});

export default ScreenLayout;
