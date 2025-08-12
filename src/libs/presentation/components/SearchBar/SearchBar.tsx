import React, { useEffect, useRef, useState } from 'react';

import {
  ActivityIndicator,
  Keyboard,
  TextInput as RNTextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { Clock, Filter, Mic, Search, TrendingUp, X } from 'lucide-react-native';

import { theme } from '@styles/theme';

import { SearchBarProps, SearchSuggestion } from './SearchBar.interface';

import * as S from './SearchBar.styled';

const SearchBar: React.FC<SearchBarProps> = ({
  autoFocus = false,
  clearIcon = null,
  containerStyle = {},
  disabled = false,
  filterCount = 0,
  filterIcon = null,
  hasActiveFilters = false,
  inputStyle = {},
  isLoading = false,
  maxRecentSearches = 3,
  maxSuggestions = 5,
  onBlur = () => {},
  onChangeText = () => {},
  onClear = () => {},
  onFilterPress = () => {},
  onFocus = () => {},
  onRecentSearchPress = () => {},
  onSearch = () => {},
  onSuggestionPress = () => {},
  onVoicePress = () => {},
  placeholder = 'Buscar servicios, lugares...',
  recentSearches = [],
  searchIcon = null,
  showClearButton = true,
  showFilterButton = false,
  showRecentSearches = false,
  showSuggestions = false,
  showVoiceButton = false,
  size = 'medium',
  suggestions = [],
  value = '',
  variant = 'default',
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<RNTextInput>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleFocus = () => {
    setIsFocused(true);
    setShowDropdown(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Delay hiding dropdown to allow suggestion taps
    setTimeout(() => setShowDropdown(false), 150);
    onBlur?.();
  };

  const handleChangeText = (text: string) => {
    onChangeText?.(text);

    if (text.trim() === '') {
      setShowDropdown(showRecentSearches && recentSearches.length > 0);
    } else {
      setShowDropdown(showSuggestions && suggestions.length > 0);
    }
  };

  const handleClear = () => {
    onChangeText?.('');
    onClear?.();
    setShowDropdown(showRecentSearches && recentSearches.length > 0);
    inputRef.current?.focus();
  };

  const handleSearch = () => {
    if (value.trim()) {
      onSearch?.(value.trim());
      setShowDropdown(false);
      Keyboard.dismiss();
    }
  };

  const handleSuggestionPress = (suggestion: SearchSuggestion) => {
    onChangeText?.(suggestion.text);
    onSuggestionPress?.(suggestion);
    setShowDropdown(false);
    Keyboard.dismiss();
  };

  const handleRecentSearchPress = (searchText: string) => {
    onChangeText?.(searchText);
    onRecentSearchPress?.(searchText);
    setShowDropdown(false);
    Keyboard.dismiss();
  };

  const handleFilterPress = () => {
    onFilterPress?.();
    Keyboard.dismiss();
  };

  const renderSearchIcon = () => {
    if (searchIcon) {
      return <S.SearchIconContainer size={size}>{searchIcon}</S.SearchIconContainer>;
    }

    return (
      <S.SearchIconContainer size={size}>
        <Search
          color={theme.colors.gray[400]}
          size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
        />
      </S.SearchIconContainer>
    );
  };

  const renderActions = () => {
    const actions = [];

    if (isLoading) {
      actions.push(
        <S.LoadingContainer key='loading'>
          <ActivityIndicator color={theme.colors.primary[500]} size='small' />
        </S.LoadingContainer>
      );
    }

    if (showClearButton && value && !isLoading) {
      actions.push(
        <S.ClearButton key='clear' size={size} onPress={handleClear}>
          {clearIcon || <X color={theme.colors.gray[400]} size={16} />}
        </S.ClearButton>
      );
    }

    if (showVoiceButton) {
      actions.push(
        <S.VoiceButton key='voice' size={size} onPress={onVoicePress}>
          <Mic
            color={theme.colors.secondary[600]}
            size={size === 'small' ? 14 : size === 'large' ? 18 : 16}
          />
        </S.VoiceButton>
      );
    }

    return actions.length > 0 ? <S.ActionsContainer>{actions}</S.ActionsContainer> : null;
  };

  const renderFilterButton = () => {
    if (!showFilterButton) return null;

    return (
      <S.FilterButton hasActiveFilters={hasActiveFilters} size={size} onPress={handleFilterPress}>
        {filterIcon || (
          <Filter
            color={hasActiveFilters ? theme.colors.white : theme.colors.gray[600]}
            size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
          />
        )}

        {filterCount && filterCount > 0 && (
          <S.FilterCount>
            <S.FilterCountText>{filterCount > 99 ? '99+' : filterCount}</S.FilterCountText>
          </S.FilterCount>
        )}
      </S.FilterButton>
    );
  };

  const renderSuggestionIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'recent':
        return <Clock color={theme.colors.gray[400]} size={16} />;
      case 'popular':
        return <TrendingUp color={theme.colors.warning[500]} size={16} />;
      default:
        return <Search color={theme.colors.gray[400]} size={16} />;
    }
  };

  const renderSuggestions = () => {
    if (!showDropdown) return null;

    const hasContent =
      (suggestions.length > 0 && showSuggestions) ||
      (recentSearches.length > 0 && showRecentSearches && !value.trim());

    if (!hasContent) return null;

    return (
      <S.SuggestionsContainer>
        <S.SuggestionsList>
          {/* Recent Searches (shown when input is empty) */}
          {showRecentSearches && !value.trim() && recentSearches.length > 0 && (
            <S.RecentSearchesContainer>
              <S.RecentSearchesTitle>Búsquedas recientes</S.RecentSearchesTitle>
              {recentSearches.slice(0, maxRecentSearches).map((search, index) => (
                <S.RecentSearchItem key={index} onPress={() => handleRecentSearchPress(search)}>
                  <Clock color={theme.colors.gray[400]} size={16} />
                  <S.RecentSearchText>{search}</S.RecentSearchText>
                </S.RecentSearchItem>
              ))}
            </S.RecentSearchesContainer>
          )}

          {/* Suggestions (shown when typing) */}
          {showSuggestions &&
            value.trim() &&
            suggestions.length > 0 &&
            suggestions.slice(0, maxSuggestions).map((suggestion, index) => (
              <S.SuggestionItem
                key={suggestion.id || index}
                onPress={() => handleSuggestionPress(suggestion)}
              >
                <S.SuggestionIcon>
                  {suggestion.icon || renderSuggestionIcon(suggestion.type)}
                </S.SuggestionIcon>

                <S.SuggestionContent>
                  <S.SuggestionText>{suggestion.text}</S.SuggestionText>
                  {suggestion.category && (
                    <S.SuggestionCategory>
                      en
                      {suggestion.category}
                    </S.SuggestionCategory>
                  )}
                </S.SuggestionContent>

                {suggestion.type && (
                  <S.SuggestionBadge type={suggestion.type}>
                    <S.SuggestionBadgeText type={suggestion.type}>
                      {suggestion.type === 'popular'
                        ? 'Popular'
                        : suggestion.type === 'recent'
                        ? 'Reciente'
                        : 'Sugerencia'}
                    </S.SuggestionBadgeText>
                  </S.SuggestionBadge>
                )}
              </S.SuggestionItem>
            ))}
        </S.SuggestionsList>
      </S.SuggestionsContainer>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
      <S.SearchContainer disabled={disabled} size={size} style={containerStyle} variant={variant}>
        <S.InputContainer
          hasFilter={showFilterButton}
          isFocused={isFocused}
          size={size}
          variant={variant}
        >
          {renderSearchIcon()}

          <S.TextInput
            editable={!disabled}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.gray[400]}
            ref={inputRef}
            returnKeyType='search'
            size={size}
            style={inputStyle}
            value={value}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onSubmitEditing={handleSearch}
            {...textInputProps}
          />

          {renderActions()}
        </S.InputContainer>

        {renderFilterButton()}
        {renderSuggestions()}
      </S.SearchContainer>
    </TouchableWithoutFeedback>
  );
};

export default SearchBar;
