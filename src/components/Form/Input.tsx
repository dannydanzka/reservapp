import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { TextInput, TextInputProps, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react-native';

import { theme } from '../../libs/ui/theme/theme';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  showPasswordToggle?: boolean;
  loading?: boolean;
}

export interface InputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
}

const Input = forwardRef<InputRef, InputProps>(({
  label,
  error,
  success,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'outlined',
  size = 'md',
  required = false,
  showPasswordToggle = false,
  loading = false,
  secureTextEntry = false,
  editable = true,
  value,
  onChangeText,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(value || '');
  const inputRef = React.useRef<TextInput>(null);

  // Expose methods through ref
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => {
      setInternalValue('');
      if (onChangeText) onChangeText('');
    },
    getValue: () => value !== undefined ? value : internalValue,
    setValue: (newValue: string) => {
      setInternalValue(newValue);
      if (onChangeText) onChangeText(newValue);
    },
  }));

  const handleChangeText = (text: string) => {
    setInternalValue(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputState = () => {
    if (error) return 'error';
    if (success) return 'success';
    if (isFocused) return 'focused';
    return 'default';
  };

  const actualSecureTextEntry = secureTextEntry && showPasswordToggle ? !showPassword : secureTextEntry;
  const currentValue = value !== undefined ? value : internalValue;

  return (
    <InputContainer>
      {label && (
        <LabelContainer>
          <Label $required={required} $state={getInputState()}>
            {label}
            {required && <RequiredIndicator> *</RequiredIndicator>}
          </Label>
        </LabelContainer>
      )}
      
      <InputWrapper 
        $variant={variant} 
        $size={size} 
        $state={getInputState()}
        $disabled={!editable}
      >
        {leftIcon && (
          <IconContainer position="left">
            {leftIcon}
          </IconContainer>
        )}
        
        <StyledTextInput
          ref={inputRef}
          value={currentValue}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={actualSecureTextEntry}
          editable={editable && !loading}
          placeholderTextColor={theme.colors.gray[400]}
          selectionColor={theme.colors.primary[500]}
          $hasLeftIcon={!!leftIcon}
          $hasRightIcon={!!rightIcon || showPasswordToggle || !!error || !!success}
          $size={size}
          {...props}
        />
        
        {(rightIcon || showPasswordToggle || error || success || loading) && (
          <IconContainer position="right">
            {loading && <LoadingIndicator />}
            {!loading && error && <AlertCircle size={20} color={theme.colors.error[500]} />}
            {!loading && success && <Check size={20} color={theme.colors.success[500]} />}
            {!loading && showPasswordToggle && (
              <Pressable onPress={togglePasswordVisibility}>
                {showPassword ? (
                  <EyeOff size={20} color={theme.colors.gray[400]} />
                ) : (
                  <Eye size={20} color={theme.colors.gray[400]} />
                )}
              </Pressable>
            )}
            {!loading && !error && !success && !showPasswordToggle && rightIcon}
          </IconContainer>
        )}
      </InputWrapper>
      
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
    </InputContainer>
  );
});

Input.displayName = 'Input';

// Helper component for loading indicator
const LoadingIndicator = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${theme.colors.gray[300]};
  border-top-color: ${theme.colors.primary[500]};
  /* Animation would need to be implemented with Animated API in React Native */
`;

// Styled Components
const InputContainer = styled.View`
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
      case 'focused': return theme.colors.primary[600];
      default: return theme.colors.gray[700];
    }
  }};
`;

const RequiredIndicator = styled.Text`
  color: ${theme.colors.error[500]};
`;

const InputWrapper = styled.View<{
  $variant: string;
  $size: string;
  $state: string;
  $disabled: boolean;
}>`
  flex-direction: row;
  align-items: center;
  border-radius: ${theme.borderRadius.md}px;
  
  ${({ $variant, $state, $disabled }) => {
    const baseStyle = `
      border-width: 1px;
      background-color: ${$disabled ? theme.colors.gray[100] : theme.colors.white};
    `;
    
    let borderColor = theme.colors.gray[300];
    let backgroundColor = $disabled ? theme.colors.gray[100] : theme.colors.white;
    
    switch ($state) {
      case 'error':
        borderColor = theme.colors.error[500];
        break;
      case 'success':
        borderColor = theme.colors.success[500];
        break;
      case 'focused':
        borderColor = theme.colors.primary[500];
        break;
    }
    
    if ($variant === 'filled') {
      backgroundColor = $disabled ? theme.colors.gray[200] : theme.colors.gray[50];
      borderColor = 'transparent';
    }
    
    return `
      ${baseStyle}
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

const StyledTextInput = styled(TextInput)<{
  $hasLeftIcon: boolean;
  $hasRightIcon: boolean;
  $size: string;
}>`
  flex: 1;
  font-size: ${({ $size }) => {
    switch ($size) {
      case 'sm': return theme.typography.fontSize.sm;
      case 'lg': return theme.typography.fontSize.lg;
      default: return theme.typography.fontSize.md;
    }
  }}px;
  font-family: ${theme.typography.fontFamily.primary.regular};
  color: ${theme.colors.gray[900]};
  padding: 0;
  margin-left: ${({ $hasLeftIcon }) => $hasLeftIcon ? theme.spacing.sm : 0}px;
  margin-right: ${({ $hasRightIcon }) => $hasRightIcon ? theme.spacing.sm : 0}px;
`;

const IconContainer = styled.View<{ position: 'left' | 'right' }>`
  justify-content: center;
  align-items: center;
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

export default Input;