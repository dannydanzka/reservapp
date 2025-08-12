import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  ActivityIndicator,
  Animated,
  NativeSyntheticEvent,
  Platform,
  TextInput,
  TextInputFocusEventData,
} from 'react-native';
import { AlertCircle, Search, X } from 'lucide-react-native';

import { theme } from '@styles/theme';

import { AutoCompleteFieldProps, AutoCompleteSuggestion } from './AutoCompleteField.interface';

import * as S from './AutoCompleteField.styled';

// Helper functions for styling
const getLabelTopPosition = (size?: 'small' | 'medium' | 'large') => {
  if (size === 'large') return 20;
  if (size === 'small') return 16;
  return 18;
};

const getLabelFontSize = (size?: 'small' | 'medium' | 'large') => {
  if (size === 'large') return 18;
  if (size === 'small') return 14;
  return 16;
};

const getLabelColor = (error?: string, isFocused?: boolean) => {
  if (error) return theme.colors.error[500];
  if (isFocused) return theme.colors.primary[500];
  return theme.colors.text.tertiary;
};

const AutoCompleteField: React.FC<AutoCompleteFieldProps> = ({
  accessibilityLabel = '',
  closeOnSelect = true,
  debounceMs = 300,
  error = '',
  label = '',
  loading = false,
  maxSuggestions = 5,
  minLength = 1,
  onBlur = () => {},
  onFocus = () => {},
  onSearch = () => {},
  onSelect = () => {},
  placeholder = '',
  renderSuggestion = null,
  required = false,
  showClearButton = true,
  showDropdownOnFocus = false,
  size = 'medium',
  suggestions = [],
  supportingText = '',
  testID = '',
  value = '',
  variant = 'default',
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [searchQuery, setSearchQuery] = useState('');

  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;
  const inputRef = useRef<TextInput>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Sync input value with prop
  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  // Animate label
  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      duration: 200,
      toValue: isFocused || inputValue.length > 0 ? 1 : 0,
      useNativeDriver: false,
    }).start();
  }, [isFocused, inputValue, animatedIsFocused]);

  // Debounced search
  const debouncedSearch = useCallback(
    (query: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        if (query.length >= minLength) {
          onSearch?.(query);
        }
      }, debounceMs);
    },
    [onSearch, debounceMs, minLength]
  );

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);

    if (showDropdownOnFocus || inputValue.length >= minLength) {
      setShowSuggestions(true);
    }

    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);

    // Delay hiding suggestions to allow selection
    const delay = Platform.OS === 'android' ? 200 : 150;
    setTimeout(() => {
      setShowSuggestions(false);
    }, delay);

    onBlur?.(e);
  };

  const handleTextChange = (text: string) => {
    setInputValue(text);
    setSearchQuery(text);

    if (text.length >= minLength) {
      setShowSuggestions(true);
      debouncedSearch(text);
    } else {
      setShowSuggestions(false);
    }

    // Keep focus when suggestions appear
    if (text.length > 0) {
      inputRef.current?.focus();
    }
  };

  const handleSuggestionSelect = (suggestion: AutoCompleteSuggestion) => {
    setInputValue(suggestion.text);
    setSearchQuery(suggestion.text);

    if (closeOnSelect) {
      setShowSuggestions(false);
      setIsFocused(false);
      inputRef.current?.blur();
    }

    onSelect?.(suggestion);
  };

  const handleClear = () => {
    setInputValue('');
    setSearchQuery('');
    setShowSuggestions(false);
    onSelect?.('');
    inputRef.current?.focus();
  };

  const _handleStringSelect = (_text: string) => {
    setInputValue(_text);
    setSearchQuery(_text);

    if (closeOnSelect) {
      setShowSuggestions(false);
      setIsFocused(false);
      inputRef.current?.blur();
    }

    onSelect?.(_text);
  };

  // Animated styles
  const labelStyle = {
    color: getlabelcolor(error, isFocused),
    fontSize: animatedisfocused.interpolate({
      inputRange: [0, 1],
      outputRange: [getlabelfontsize(size), 12],
    }),
    top: animatedisfocused.interpolate({
      inputRange: [0, 1],
      outputRange: [getlabeltopposition(size), -10],
    }),
  };

  const renderDefaultSuggestion = (suggestion: AutoCompleteSuggestion, index: number) => (
    <S.SuggestionItem
      key={suggestion.id || index}
      testID={`suggestion-${index}`}
      onPress={() => handleSuggestionSelect(suggestion)}
    >
      {suggestion.icon && <S.SuggestionIcon>{suggestion.icon}</S.SuggestionIcon>}

      <S.SuggestionContent>
        <S.SuggestionText>{suggestion.text}</S.SuggestionText>
        {suggestion.subtitle && <S.SuggestionSubtitle>{suggestion.subtitle}</S.SuggestionSubtitle>}
      </S.SuggestionContent>
    </S.SuggestionItem>
  );

  const displayedSuggestions = suggestions.slice(0, maxSuggestions);
  const shouldShowSuggestions = showSuggestions && (displayedSuggestions.length > 0 || loading);

  return (
    <S.Container testID={testID}>
      <S.InputWrapper hasError={Boolean(error)} isFocused={isFocused} size={size} variant={variant}>
        <S.AnimatedLabel hasError={Boolean(error)} size={size} style={labelStyle}>
          {label}
          {required && ' *'}
        </S.AnimatedLabel>

        <S.StyledTextInput
          {...textInputProps}
          accessibilityLabel={accessibilityLabel || label}
          placeholder={isFocused || inputValue.length > 0 ? placeholder : ''}
          placeholderTextColor={theme.colors.text.placeholder}
          ref={inputRef}
          size={size}
          value={inputValue}
          onBlur={handleBlur}
          onChangeText={handleTextChange}
          onFocus={handleFocus}
        />

        {showClearButton && inputValue && !loading && (
          <S.ClearButton testID='clear-button' onPress={handleClear}>
            <X color={theme.colors.text.tertiary} size={16} />
          </S.ClearButton>
        )}

        {loading && (
          <S.LoadingContainer>
            <ActivityIndicator color={theme.colors.primary[500]} size='small' />
          </S.LoadingContainer>
        )}
      </S.InputWrapper>

      {error && (
        <S.ErrorText>
          <AlertCircle color={theme.colors.error[500]} size={16} />
          <S.ErrorTextContent>{error}</S.ErrorTextContent>
        </S.ErrorText>
      )}

      {!error && supportingText && <S.SupportingText>{supportingText}</S.SupportingText>}

      {shouldShowSuggestions && (
        <S.SuggestionsContainer>
          <S.SuggestionsScrollView>
            {loading && displayedSuggestions.length === 0 && (
              <S.EmptyState>
                <ActivityIndicator color={theme.colors.primary[500]} size='small' />
                <S.EmptyStateText style={{ marginTop: theme.spacing.sm }}>
                  Buscando...
                </S.EmptyStateText>
              </S.EmptyState>
            )}

            {!loading && displayedSuggestions.length === 0 && searchQuery.length >= minLength && (
              <S.EmptyState>
                <Search color={theme.colors.text.placeholder} size={24} />
                <S.EmptyStateText style={{ marginTop: theme.spacing.sm }}>
                  No se encontraron resultados
                </S.EmptyStateText>
              </S.EmptyState>
            )}

            {displayedSuggestions.map((suggestion, index) => {
              if (renderSuggestion) {
                return renderSuggestion(suggestion, index);
              }
              return renderDefaultSuggestion(suggestion, index);
            })}
          </S.SuggestionsScrollView>
        </S.SuggestionsContainer>
      )}
    </S.Container>
  );
};

export default AutoCompleteField;
