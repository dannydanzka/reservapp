import React, { useEffect, useRef } from 'react';

import {
  ActivityIndicator,
  Animated,
  BackHandler,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Check, X } from 'lucide-react-native';

import { theme } from '@styles/theme';

import { BottomSheetProps } from './BottomSheet.interface';

import * as S from './BottomSheet.styled';

const BottomSheet: React.FC<BottomSheetProps> = ({
  animationType: _animationType = 'slide',
  children,
  closeOnOverlay = true,
  filterOptions = [],
  height = '50%',
  isLoading = false,
  multiSelect = true,
  onClose = () => {},
  onFilterChange = () => {},
  primaryAction = null,
  secondaryAction = null,
  showCloseButton = true,
  subtitle = '',
  title = '',
  useCheckboxes = false,
  visible = false,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        duration: 250,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  useEffect(() => {
    const handleBackPress = () => {
      if (visible) {
        onClose();
        return true;
      }
      return false;
    };

    if (visible) {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    }

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [visible, onClose]);

  const handleOverlayPress = () => {
    if (closeOnOverlay && !isLoading) {
      onClose();
    }
  };

  const handleFilterOptionPress = (optionId: string, currentChecked: boolean) => {
    if (!onFilterChange) return;

    if (useCheckboxes) {
      // Checkbox behavior - can check/uncheck freely
      onFilterChange(optionId, !currentChecked);
    } else if (!multiSelect) {
      // Single selection - only allow selection, not deselection
      if (!currentChecked) {
        onFilterChange(optionId, true);
      }
    } else {
      // Multi-selection radio (acts like checkboxes)
      onFilterChange(optionId, !currentChecked);
    }
  };

  const containerTransform = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  const overlayOpacity = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const renderFilterOptions = () => {
    if (!filterOptions.length) return null;

    return filterOptions.map((option) => (
      <S.FilterOptionContainer
        disabled={isLoading}
        key={option.id}
        onPress={() => handleFilterOptionPress(option.id, option.checked)}
      >
        {useCheckboxes ? (
          <S.FilterCheckbox checked={option.checked}>
            {option.checked && <Check color={theme.colors.white} size={14} />}
          </S.FilterCheckbox>
        ) : (
          <S.FilterRadioButton checked={option.checked}>
            <S.FilterRadioDot checked={option.checked} />
          </S.FilterRadioButton>
        )}
        <S.FilterLabel>{option.label}</S.FilterLabel>
        {option.value !== undefined && <S.FilterCount>{option.value}</S.FilterCount>}
      </S.FilterOptionContainer>
    ));
  };

  const renderActions = () => {
    if (!primaryAction && !secondaryAction) return null;

    return (
      <S.ActionsContainer>
        {secondaryAction && (
          <S.ActionButton
            disabled={secondaryAction.disabled || isLoading}
            flex={!primaryAction}
            variant={secondaryAction.variant || 'secondary'}
            onPress={secondaryAction.onPress}
          >
            <S.ActionButtonText
              disabled={secondaryAction.disabled || isLoading}
              variant={secondaryAction.variant || 'secondary'}
            >
              {secondaryAction.text}
            </S.ActionButtonText>
          </S.ActionButton>
        )}

        {primaryAction && (
          <S.ActionButton
            disabled={primaryAction.disabled || isLoading}
            flex
            variant={primaryAction.variant || 'primary'}
            onPress={isLoading ? () => {} : primaryAction.onPress}
          >
            {isLoading ? (
              <ActivityIndicator
                color={
                  primaryAction.variant === 'outline'
                    ? theme.colors.primary[500]
                    : theme.colors.white
                }
                size='small'
              />
            ) : (
              <S.ActionButtonText
                disabled={primaryAction.disabled}
                variant={primaryAction.variant || 'primary'}
              >
                {primaryAction.text}
              </S.ActionButtonText>
            )}
          </S.ActionButton>
        )}
      </S.ActionsContainer>
    );
  };

  const renderContent = () => {
    if (isLoading && !children && !filterOptions.length) {
      return (
        <S.LoadingContainer>
          <ActivityIndicator color={theme.colors.primary[500]} size='large' />
        </S.LoadingContainer>
      );
    }

    if (!children && !filterOptions.length) {
      return (
        <S.EmptyState>
          <S.EmptyStateTitle>Sin opciones disponibles</S.EmptyStateTitle>
          <S.EmptyStateText>No hay opciones para mostrar en este momento.</S.EmptyStateText>
        </S.EmptyState>
      );
    }

    return (
      <S.ScrollContent>
        {renderFilterOptions()}
        {children}
      </S.ScrollContent>
    );
  };

  return (
    <Modal
      animationType='none'
      statusBarTranslucent
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <S.AnimatedOverlay style={{ opacity: overlayOpacity }}>
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <S.Overlay>
            <TouchableWithoutFeedback>
              <S.Container
                height={height}
                style={{
                  transform: [{ translateY: containerTransform }],
                }}
              >
                <S.Handle />

                <S.Header>
                  <S.HeaderContent>
                    <S.HeaderText>
                      <S.Title>{title}</S.Title>
                      {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
                    </S.HeaderText>
                    {showCloseButton && (
                      <S.CloseButton disabled={isLoading} onPress={onClose}>
                        <X color={theme.colors.gray[600]} size={16} />
                      </S.CloseButton>
                    )}
                  </S.HeaderContent>
                </S.Header>

                <S.Content>{renderContent()}</S.Content>

                {renderActions()}
              </S.Container>
            </TouchableWithoutFeedback>
          </S.Overlay>
        </TouchableWithoutFeedback>
      </S.AnimatedOverlay>
    </Modal>
  );
};

export default BottomSheet;
