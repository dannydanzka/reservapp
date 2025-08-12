import React from 'react';

// Validation Rule Types
export type ValidationRule =
  | { type: 'required'; message?: string }
  | { type: 'email'; message?: string }
  | { type: 'minLength'; value: number; message?: string }
  | { type: 'maxLength'; value: number; message?: string }
  | { type: 'pattern'; value: RegExp; message?: string }
  | {
      type: 'custom';
      validate: (value: any) => boolean | string;
      message?: string;
    }
  | { type: 'number'; message?: string }
  | { type: 'phone'; message?: string }
  | { type: 'url'; message?: string }
  | { type: 'date'; message?: string }
  | { type: 'matches'; field: string; message?: string };

export interface FieldConfig {
  name: string;
  label?: string;
  rules?: ValidationRule[];
  dependencies?: string[]; // Fields that affect this field's validation
}

export interface ValidationError {
  field: string;
  message: string;
  type: string;
}

export interface FormState<T = Record<string, any>> {
  values: T;
  errors: ValidationError[];
  touched: Set<string>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
}

export interface UseFormValidationProps<T = Record<string, any>> {
  initialValues?: T;
  fields: FieldConfig[];
  onSubmit?: (values: T) => Promise<void> | void;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface UseFormValidationReturn<T = Record<string, any>> {
  formState: FormState<T>;
  setValue: (field: string, value: any) => void;
  setError: (field: string, message: string) => void;
  clearError: (field: string) => void;
  clearAllErrors: () => void;
  validateField: (field: string) => boolean;
  validateForm: () => boolean;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
  markFieldAsTouched: (field: string) => void;
  getFieldError: (field: string) => string | undefined;
  hasFieldError: (field: string) => boolean;
  isFieldTouched: (field: string) => boolean;
}

// Form component interfaces
export interface FormFieldProps {
  name: string;
  label?: string;
  error?: string;
  touched?: boolean;
  children: React.ReactNode;
}

export interface FormProps {
  children: React.ReactNode;
  onSubmit?: () => void;
  style?: any;
}
