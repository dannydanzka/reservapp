import React, { useEffect, useState } from 'react';

import { ActivityIndicator, LayoutAnimation, Platform, UIManager } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

import { theme } from '@styles/theme';

import { CollapsibleCardProps } from './CollapsibleCard.interface';

import * as S from './CollapsibleCard.styled';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Helper function for icon size
const getIconSize = (size?: 'small' | 'medium' | 'large') => {
  if (size === 'small') return 20;
  if (size === 'large') return 28;
  return 24;
};

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  animationDuration = 300,
  badge = null,
  badgeColor = theme.colors.primary[500],
  children,
  counter = 0,
  defaultExpanded = false,
  description = '',
  disabled = false,
  expandedContent = null,
  icon = null,
  iconBackgroundColor = theme.colors.primary[100],
  iconColor = theme.colors.primary[600],
  isExpanded: controlledExpanded = false,
  isLoading = false,
  items = [],
  leftBorderColor = theme.colors.primary[500],
  linkText = '',
  onLinkPress = () => {},
  onLongPress = () => {},
  onPress = () => {},
  onToggle = () => {},
  size = 'medium',
  subtitle = '',
  title = '',
  variant = 'default',
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  // Use controlled state if provided, otherwise use internal state
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const hasExpandableContent = items.length > 0 || children || expandedContent || linkText;

  useEffect(() => {
    if (controlledExpanded === undefined) {
      // Only update internal state if not controlled
      setInternalExpanded(defaultExpanded);
    }
  }, [defaultExpanded, controlledExpanded]);

  const handleToggle = () => {
    if (disabled || !hasExpandableContent) return;

    // Configure animation
    LayoutAnimation.configureNext({
      create: {
        property: LayoutAnimation.Properties.opacity,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
      duration: animationDuration,
      update: {
        property: LayoutAnimation.Properties.scaleY,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });

    const newExpanded = !isExpanded;

    // Update state
    if (controlledExpanded === undefined) {
      setInternalExpanded(newExpanded);
    }

    // Call callback
    onToggle?.(newExpanded);
  };

  const handleHeaderPress = () => {
    if (onPress) {
      onPress();
    } else if (hasExpandableContent) {
      handleToggle();
    }
  };

  const renderIcon = () => {
    if (!icon) return null;

    return (
      <S.IconContainer backgroundColor={iconBackgroundColor} size={size}>
        {React.cloneElement(icon as React.ReactElement, {
          color: iconColor,
          size: getIconSize(size),
        })}
      </S.IconContainer>
    );
  };

  const renderBadge = () => {
    if (counter !== undefined) {
      return (
        <S.CounterBadge>
          <S.CounterText>{counter > 99 ? '99+' : counter}</S.CounterText>
        </S.CounterBadge>
      );
    }

    if (badge !== undefined) {
      return (
        <S.Badge color={badgeColor}>
          <S.BadgeText>{badge}</S.BadgeText>
        </S.Badge>
      );
    }

    return null;
  };

  const renderExpandButton = () => {
    if (!hasExpandableContent) return null;

    const IconComponent = isExpanded ? ChevronUp : ChevronDown;

    return (
      <S.ExpandButton disabled={disabled} onPress={handleToggle}>
        <IconComponent color={theme.colors.gray[600]} size={20} />
      </S.ExpandButton>
    );
  };

  const renderItems = () => {
    if (items.length === 0) return null;

    return (
      <S.ItemsContainer>
        {items.map((item, index) => (
          <S.ItemContainer
            activeOpacity={item.onPress ? 0.6 : 1}
            disabled={item.disabled}
            key={item.id || index}
            onPress={item.disabled ? undefined : item.onPress}
          >
            {item.icon ? <S.ItemIcon>{item.icon}</S.ItemIcon> : <S.ItemBullet>•</S.ItemBullet>}

            <S.ItemContent>
              <S.ItemText disabled={item.disabled}>{item.text}</S.ItemText>
            </S.ItemContent>

            {item.badge && (
              <S.ItemRightContent>
                <S.Badge>
                  <S.BadgeText>{item.badge}</S.BadgeText>
                </S.Badge>
              </S.ItemRightContent>
            )}

            {item.rightContent && <S.ItemRightContent>{item.rightContent}</S.ItemRightContent>}
          </S.ItemContainer>
        ))}
      </S.ItemsContainer>
    );
  };

  const renderLink = () => {
    if (!linkText || !onLinkPress) return null;

    return (
      <S.LinkContainer onPress={onLinkPress}>
        <S.LinkText>{linkText}</S.LinkText>
      </S.LinkContainer>
    );
  };

  const renderExpandedContent = () => {
    if (!isExpanded) return null;

    if (isLoading) {
      return (
        <S.ExpandedContainer>
          <S.LoadingContainer>
            <ActivityIndicator color={theme.colors.primary[500]} size='small' />
          </S.LoadingContainer>
        </S.ExpandedContainer>
      );
    }

    return (
      <S.ExpandedContainer>
        {expandedContent && <S.CustomContentContainer>{expandedContent}</S.CustomContentContainer>}

        {children && <S.CustomContentContainer>{children}</S.CustomContentContainer>}

        {renderItems()}
        {renderLink()}
      </S.ExpandedContainer>
    );
  };

  return (
    <S.CardContainer disabled={disabled} size={size} variant={variant}>
      {leftBorderColor && <S.LeftBorder color={leftBorderColor} />}

      <S.HeaderContainer
        activeOpacity={onPress || hasExpandableContent ? 0.6 : 1}
        disabled={disabled}
        onLongPress={onLongPress}
        onPress={handleHeaderPress}
      >
        {renderIcon()}

        <S.ContentContainer>
          <S.Title size={size}>{title}</S.Title>

          {subtitle && <S.Subtitle numberOfLines={2}>{subtitle}</S.Subtitle>}

          {description && <S.Description numberOfLines={3}>{description}</S.Description>}
        </S.ContentContainer>

        <S.ActionsContainer>
          {renderBadge()}
          {renderExpandButton()}
        </S.ActionsContainer>
      </S.HeaderContainer>

      {renderExpandedContent()}
    </S.CardContainer>
  );
};

export default CollapsibleCard;
