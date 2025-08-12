import React from 'react';

import { X } from 'lucide-react-native';

import { theme } from '@styles/theme';

import { BadgeProps, ChipProps } from './Badge.interface';

import * as S from './Badge.styled';

// Badge Component
// Helper functions for icon sizes and colors
const getIconSize = (size: string) => {
  if (size === 'small') return 12;
  if (size === 'large') return 16;
  return 14;
};

const getIconColor = (outlined: boolean, color?: string) => {
  return outlined ? color || theme.colors.gray[600] : color || theme.colors.white;
};

const getChipIconSize = (size: string) => {
  if (size === 'small') return 14;
  if (size === 'large') return 20;
  return 16;
};

const getChipIconColor = (selected: boolean, outlined: boolean, color?: string) => {
  return selected && !outlined ? theme.colors.white : color || theme.colors.gray[600];
};

const Badge: React.FC<BadgeProps> = ({
  accessibilityLabel = '',
  backgroundColor = theme.colors.primary[500],
  borderColor = theme.colors.transparent,
  children,
  closable = false,
  color = theme.colors.white,
  disabled = false,
  dot = false,
  icon = null,
  iconPosition = 'left',
  number = 0,
  offset: _offset = { x: 0, y: 0 },
  onClose = () => {},
  onPress = () => {},
  outlined = false,
  position: _position = 'top-right',
  size = 'medium',
  testID = '',
  text = '',
  variant = 'default',
}) => {
  // Determine content to display
  const getDisplayContent = () => {
    if (number !== undefined) {
      return number > 99 ? '99+' : number.toString();
    }
    if (text) return text;
    return children;
  };

  const displayContent = getDisplayContent();
  const showContent = !dot && (displayContent || displayContent === 0);

  const badgeElement = (
    <S.BadgeContainer
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      color={color}
      disabled={disabled}
      dot={dot}
      outlined={outlined}
      size={size}
      testID={testID}
      variant={variant}
      onPress={onPress}
    >
      {showContent && (
        <>
          {icon && iconPosition === 'left' && (
            <S.BadgeIcon iconPosition='left' size={size}>
              {icon}
            </S.BadgeIcon>
          )}

          <S.BadgeText color={color} outlined={outlined} size={size} variant={variant}>
            {displayContent}
          </S.BadgeText>

          {icon && iconPosition === 'right' && (
            <S.BadgeIcon iconPosition='right' size={size}>
              {icon}
            </S.BadgeIcon>
          )}

          {closable && onClose && (
            <S.CloseButton size={size} onPress={onClose}>
              <X color={theme.colors.gray[600]} size={14} />
            </S.CloseButton>
          )}
        </>
      )}
    </S.BadgeContainer>
  );

  // If it's a pressable badge, wrap in button
  if (onPress) {
    return (
      <S.BadgeButton
        accessibilityLabel={accessibilityLabel || displayContent?.toString()}
        accessibilityRole='button'
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        color={color}
        disabled={disabled}
        outlined={outlined}
        size={size}
        testID={testID}
        variant={variant}
        onPress={onPress}
      >
        {showContent && (
          <>
            {icon && iconPosition === 'left' && (
              <S.BadgeIcon iconPosition='left' size={size}>
                {React.cloneElement(icon as React.ReactElement, {
                  color: getIconColor(outlined, color),
                  size: getIconSize(size),
                })}
              </S.BadgeIcon>
            )}

            <S.BadgeText color={color} outlined={outlined} size={size} variant={variant}>
              {displayContent}
            </S.BadgeText>

            {icon && iconPosition === 'right' && (
              <S.BadgeIcon iconPosition='right' size={size}>
                {React.cloneElement(icon as React.ReactElement, {
                  color: getIconColor(outlined, color),
                  size: getIconSize(size),
                })}
              </S.BadgeIcon>
            )}

            {closable && onClose && (
              <S.CloseButton size={size} onPress={onClose}>
                <X color={getIconColor(outlined, color)} size={getIconSize(size)} />
              </S.CloseButton>
            )}
          </>
        )}
      </S.BadgeButton>
    );
  }

  return badgeElement;
};

// Chip Component
const Chip: React.FC<ChipProps> = ({
  accessibilityLabel = '',
  avatar = null,
  backgroundColor = theme.colors.gray[100],
  borderColor = theme.colors.gray[200],
  children,
  closable = false,
  color = theme.colors.gray[700],
  disabled = false,
  elevated = false,
  icon = null,
  iconPosition = 'left',
  image = null,
  onClose = () => {},
  onPress = () => {},
  outlined = false,
  selectable = false,
  selected = false,
  size = 'medium',
  testID = '',
  text = '',
  variant = 'default',
}) => {
  const displayContent = text || children;

  return (
    <S.ChipContainer
      accessibilityLabel={accessibilityLabel || displayContent?.toString()}
      accessibilityRole={selectable ? 'checkbox' : 'button'}
      accessibilityState={{ disabled, selected }}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      color={color}
      disabled={disabled}
      elevated={elevated}
      outlined={outlined}
      selected={selected}
      size={size}
      testID={testID}
      variant={variant}
      onPress={onPress}
    >
      {avatar && <S.ChipAvatar size={size}>{avatar}</S.ChipAvatar>}

      {image && (
        <S.ChipAvatar size={size}>
          <S.ChipAvatarImage source={{ uri: image }} />
        </S.ChipAvatar>
      )}

      {icon && iconPosition === 'left' && (
        <S.BadgeIcon iconPosition='left' size={size}>
          {React.cloneElement(icon as React.ReactElement, {
            color: getChipIconColor(selected, outlined, color),
            size: getChipIconSize(size),
          })}
        </S.BadgeIcon>
      )}

      <S.ChipText
        color={color}
        outlined={outlined}
        selected={selected}
        size={size}
        variant={variant}
      >
        {displayContent}
      </S.ChipText>

      {icon && iconPosition === 'right' && (
        <S.BadgeIcon iconPosition='right' size={size}>
          {React.cloneElement(icon as React.ReactElement, {
            color: getChipIconColor(selected, outlined, color),
            size: getChipIconSize(size),
          })}
        </S.BadgeIcon>
      )}

      {closable && onClose && (
        <S.CloseButton size={size} onPress={onClose}>
          <X color={getChipIconColor(selected, outlined, color)} size={getChipIconSize(size)} />
        </S.CloseButton>
      )}
    </S.ChipContainer>
  );
};

// Positioned Badge Wrapper (for notification badges)
export const PositionedBadge: React.FC<{
  children: React.ReactNode;
  badge: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  offset?: { x?: number; y?: number };
}> = ({ badge = null, children, offset = { x: 0, y: 0 }, position = 'top-right' }) => {
  return (
    <S.PositionedContainer>
      {children}
      <S.PositionedBadgeWrapper offset={offset} position={position}>
        {badge}
      </S.PositionedBadgeWrapper>
    </S.PositionedContainer>
  );
};

export default Badge;
export { Chip };
