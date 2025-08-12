import React from 'react';

import { ActivityIndicator } from 'react-native';

import { theme } from '@styles/theme';

import { TabsProps } from './Tabs.interface';

import * as S from './Tabs.styled';

const Tabs: React.FC<TabsProps> = ({
  accessibilityLabel = '',
  activeColor = theme.colors.primary[500],
  activeTab = '',
  backgroundColor = theme.colors.surface.primary,
  centered = false,
  fullWidth = false,
  iconPosition = 'left',
  inactiveColor = theme.colors.gray[500],
  loading = false,
  onTabChange = () => {},
  scrollable = false,
  showBadges = true,
  showIcons = true,
  size = 'medium',
  tabs = [],
  testID = '',
  variant = 'default',
}) => {
  if (loading) {
    return (
      <S.LoadingContainer>
        <ActivityIndicator color={theme.colors.primary[500]} size='small' />
      </S.LoadingContainer>
    );
  }

  const renderTabContent = (tab: (typeof tabs)[0], index: number, isLast: boolean) => {
    const isActive = activeTab === tab.id;

    return (
      <S.TabButton
        accessibilityLabel={tab.label}
        accessibilityRole='tab'
        accessibilityState={{ disabled: tab.disabled, selected: isActive }}
        active={isActive}
        activeColor={activeColor}
        disabled={tab.disabled}
        fullWidth={!scrollable && fullWidth}
        inactiveColor={inactiveColor}
        isLast={isLast}
        key={tab.id}
        size={size}
        testID={tab.testID || `tab-${tab.id}`}
        variant={variant}
        onPress={() => !tab.disabled && onTabChange(tab.id)}
      >
        <S.TabContent iconPosition={showIcons && tab.icon ? iconPosition : undefined}>
          {showIcons && tab.icon && (
            <S.TabIcon iconPosition={iconPosition}>
              {React.cloneElement(tab.icon as React.ReactElement, {
                color: isActive
                  ? activeColor ||
                    (variant === 'pills' || variant === 'segmented'
                      ? theme.colors.white
                      : theme.colors.primary[600])
                  : inactiveColor || theme.colors.text.tertiary,
                size: size === 'small' ? 16 : size === 'large' ? 24 : 20,
              })}
            </S.TabIcon>
          )}

          <S.TabText
            active={isActive}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            size={size}
            variant={variant}
          >
            {tab.label}
          </S.TabText>
        </S.TabContent>

        {showBadges && tab.badge && (
          <S.TabBadge>
            <S.TabBadgeText>
              {typeof tab.badge === 'number' && tab.badge > 99 ? '99+' : tab.badge}
            </S.TabBadgeText>
          </S.TabBadge>
        )}

        {variant === 'underlined' && <S.TabIndicator active={isActive} activeColor={activeColor} />}
      </S.TabButton>
    );
  };

  const tabElements = tabs.map((tab, index) =>
    renderTabContent(tab, index, index === tabs.length - 1)
  );

  if (scrollable) {
    return (
      <S.TabsContainer
        accessibilityLabel={accessibilityLabel}
        accessibilityRole='tablist'
        backgroundColor={backgroundColor}
        centered={centered}
        scrollable={scrollable}
        testID={testID}
        variant={variant}
      >
        <S.ScrollableContainer>{tabElements}</S.ScrollableContainer>
      </S.TabsContainer>
    );
  }

  return (
    <S.TabsContainer
      accessibilityLabel={accessibilityLabel}
      accessibilityRole='tablist'
      backgroundColor={backgroundColor}
      centered={centered}
      scrollable={scrollable}
      testID={testID}
      variant={variant}
    >
      {tabElements}
    </S.TabsContainer>
  );
};

export default Tabs;
