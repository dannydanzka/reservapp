import React, { useState, useRef } from 'react';
import { ScrollView, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { ChevronDown, Check } from 'lucide-react-native';

import { theme } from '../../libs/ui/theme/theme';
import { useModal } from '../Modal/ModalProvider';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  description?: string;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  options: SelectOption[];
  onSelect?: (option: SelectOption) => void;
  error?: string;
  success?: string;
  helperText?: string;
  disabled?: boolean;
  loading?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  required?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
}

const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Seleccionar...',
  value,
  options = [],
  onSelect,
  error,
  success,
  helperText,
  disabled = false,
  loading = false,
  searchable = false,
  multiple = false,
  required = false,
  variant = 'outlined',
  size = 'md',
}) => {
  const { show, hide } = useModal();
  const [searchText, setSearchText] = useState('');
  
  const selectedOption = options.find(opt => opt.value === value);
  
  const filteredOptions = searchable && searchText
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchText.toLowerCase())
      )
    : options;

  const getSelectState = () => {
    if (error) return 'error';
    if (success) return 'success';
    return 'default';
  };

  const handlePress = () => {
    if (disabled || loading) return;

    const modalId = show(
      <SelectModal
        options={filteredOptions}
        selectedValue={value}
        onSelect={(option) => {
          if (onSelect) {
            onSelect(option);
          }
          hide(modalId);
        }}
        searchable={searchable}
        searchText={searchText}
        onSearchChange={setSearchText}
        multiple={multiple}
      />,
      {
        title: label || 'Seleccionar opción',
        size: 'medium',
        position: 'bottom',
        closable: true,
      }
    );
  };

  return (
    <SelectContainer>
      {label && (
        <LabelContainer>
          <Label $required={required} $state={getSelectState()}>
            {label}
            {required && <RequiredIndicator> *</RequiredIndicator>}
          </Label>
        </LabelContainer>
      )}
      
      <SelectWrapper 
        $variant={variant} 
        $size={size} 
        $state={getSelectState()}
        $disabled={disabled}
        onPress={handlePress}
        disabled={disabled || loading}
      >
        <SelectContent>
          <SelectText 
            $hasValue={!!selectedOption}
            $size={size}
          >
            {selectedOption?.label || placeholder}
          </SelectText>
          
          <ChevronContainer $disabled={disabled || loading}>
            <ChevronDown 
              size={20} 
              color={disabled ? theme.colors.gray[400] : theme.colors.gray[500]} 
            />
          </ChevronContainer>
        </SelectContent>
      </SelectWrapper>
      
      {(error || success || helperText) && (
        <HelperTextContainer>
          {error && (
            <HelperText $type="error">
              {error}
            </HelperText>
          )}
          {!error && success && (
            <HelperText $type="success">
              {success}
            </HelperText>
          )}
          {!error && !success && helperText && (
            <HelperText $type="helper">
              {helperText}
            </HelperText>
          )}
        </HelperTextContainer>
      )}
    </SelectContainer>
  );
};

// Modal content component
interface SelectModalProps {
  options: SelectOption[];
  selectedValue?: string | number;
  onSelect: (option: SelectOption) => void;
  searchable: boolean;
  searchText: string;
  onSearchChange: (text: string) => void;
  multiple: boolean;
}

const SelectModal: React.FC<SelectModalProps> = ({
  options,
  selectedValue,
  onSelect,
  searchable,
  searchText,
  onSearchChange,
  multiple,
}) => {
  return (
    <ModalContent>
      {searchable && (
        <SearchContainer>
          <SearchInput
            placeholder="Buscar..."
            value={searchText}
            onChangeText={onSearchChange}
            autoFocus
          />
        </SearchContainer>
      )}
      
      <OptionsContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          {options.length === 0 ? (
            <EmptyContainer>
              <EmptyText>No hay opciones disponibles</EmptyText>
            </EmptyContainer>
          ) : (
            options.map((option) => (
              <OptionItem
                key={option.value}
                $selected={option.value === selectedValue}
                $disabled={option.disabled || false}
                onPress={() => !option.disabled && onSelect(option)}
              >
                <OptionContent>
                  <OptionTextContainer>
                    <OptionText $disabled={option.disabled || false}>
                      {option.label}
                    </OptionText>
                    {option.description && (
                      <OptionDescription>
                        {option.description}
                      </OptionDescription>
                    )}
                  </OptionTextContainer>
                  
                  {option.value === selectedValue && (
                    <CheckContainer>
                      <Check size={20} color={theme.colors.primary[500]} />
                    </CheckContainer>
                  )}
                </OptionContent>
              </OptionItem>
            ))
          )}
        </ScrollView>
      </OptionsContainer>
    </ModalContent>
  );
};

// Styled Components
const SelectContainer = styled.View`
  margin-bottom: ${theme.spacing.md}px;
`;

const LabelContainer = styled.View`
  margin-bottom: ${theme.spacing.sm}px;
`;

const Label = styled.Text<{ $required: boolean; $state: string }>`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: 500;
  font-family: ${theme.typography.fontFamily.primary.medium};
  color: ${({ $state }) => {
    switch ($state) {
      case 'error': return theme.colors.error[600];
      case 'success': return theme.colors.success[600];
      default: return theme.colors.gray[700];
    }
  }};
`;

const RequiredIndicator = styled.Text`
  color: ${theme.colors.error[500]};
`;

const SelectWrapper = styled(Pressable)<{
  $variant: string;
  $size: string;
  $state: string;
  $disabled: boolean;
}>`
  border-radius: ${theme.borderRadius.md}px;
  
  ${({ $variant, $state, $disabled }) => {
    let borderColor = theme.colors.gray[300];
    let backgroundColor = $disabled ? theme.colors.gray[100] : theme.colors.white;
    
    switch ($state) {
      case 'error':
        borderColor = theme.colors.error[500];
        break;
      case 'success':
        borderColor = theme.colors.success[500];
        break;
    }
    
    if ($variant === 'filled') {
      backgroundColor = $disabled ? theme.colors.gray[200] : theme.colors.gray[50];
      borderColor = 'transparent';
    }
    
    return `
      border-width: 1px;
      border-color: ${borderColor};
      background-color: ${backgroundColor};
    `;
  }}
  
  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return `padding: ${theme.spacing.sm}px;`;
      case 'lg':
        return `padding: ${theme.spacing.lg}px;`;
      default:
        return `padding: ${theme.spacing.md}px;`;
    }
  }}
`;

const SelectContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SelectText = styled.Text<{ $hasValue: boolean; $size: string }>`
  flex: 1;
  font-size: ${({ $size }) => {
    switch ($size) {
      case 'sm': return theme.typography.fontSize.sm;
      case 'lg': return theme.typography.fontSize.lg;
      default: return theme.typography.fontSize.md;
    }
  }}px;
  font-family: ${theme.typography.fontFamily.primary.regular};
  color: ${({ $hasValue }) => 
    $hasValue ? theme.colors.gray[900] : theme.colors.gray[400]
  };
`;

const ChevronContainer = styled.View<{ $disabled: boolean }>`
  margin-left: ${theme.spacing.sm}px;
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
`;

const HelperTextContainer = styled.View`
  margin-top: ${theme.spacing.xs}px;
`;

const HelperText = styled.Text<{ $type: 'error' | 'success' | 'helper' }>`
  font-size: ${theme.typography.fontSize.xs}px;
  font-family: ${theme.typography.fontFamily.primary.regular};
  color: ${({ $type }) => {
    switch ($type) {
      case 'error': return theme.colors.error[600];
      case 'success': return theme.colors.success[600];
      default: return theme.colors.gray[500];
    }
  }};
`;

// Modal Styled Components
const ModalContent = styled.View`
  max-height: 400px;
`;

const SearchContainer = styled.View`
  padding: ${theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.gray[200]};
`;

const SearchInput = styled.TextInput`
  padding: ${theme.spacing.md}px;
  border-width: 1px;
  border-color: ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md}px;
  font-size: ${theme.typography.fontSize.md}px;
  font-family: ${theme.typography.fontFamily.primary.regular};
  background-color: ${theme.colors.white};
`;

const OptionsContainer = styled.View`
  flex: 1;
`;

const EmptyContainer = styled.View`
  padding: ${theme.spacing.xl}px;
  align-items: center;
`;

const EmptyText = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.gray[500]};
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

const OptionItem = styled(Pressable)<{ $selected: boolean; $disabled: boolean }>`
  padding: ${theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.gray[100]};
  background-color: ${({ $selected }) => 
    $selected ? theme.colors.primary[50] : 'transparent'
  };
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
`;

const OptionContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const OptionTextContainer = styled.View`
  flex: 1;
`;

const OptionText = styled.Text<{ $disabled: boolean }>`
  font-size: ${theme.typography.fontSize.md}px;
  font-family: ${theme.typography.fontFamily.primary.regular};
  color: ${({ $disabled }) => 
    $disabled ? theme.colors.gray[400] : theme.colors.gray[900]
  };
  margin-bottom: ${theme.spacing.xs}px;
`;

const OptionDescription = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  font-family: ${theme.typography.fontFamily.primary.regular};
  color: ${theme.colors.gray[500]};
`;

const CheckContainer = styled.View`
  margin-left: ${theme.spacing.md}px;
`;

export default Select;