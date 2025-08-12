import { useCallback, useState } from 'react';

import {
  FieldConfig,
  FormState,
  UseFormValidationProps,
  UseFormValidationReturn,
  ValidationError,
  ValidationRule,
} from './FormValidation.interface';

// Default validation messages
const DEFAULT_MESSAGES = {
  date: 'Ingresa una fecha válida',
  email: 'Ingresa un email válido',
  matches: (field: string) => `Debe coincidir con ${field}`,
  maxLength: (max: number) => `Máximo ${max} caracteres`,
  minLength: (min: number) => `Mínimo ${min} caracteres`,
  number: 'Debe ser un número válido',
  pattern: 'Formato inválido',
  phone: 'Ingresa un teléfono válido',
  required: 'Este campo es obligatorio',
  url: 'Ingresa una URL válida',
};

// Validation patterns
const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  url: /^https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)?$/,
};

// Validation functions
const validateRule = (
  value: any,
  rule: ValidationRule,
  allValues: Record<string, any>
): string | null => {
  switch (rule.type) {
    case 'required':
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return rule.message || DEFAULT_MESSAGES.required;
      }
      break;

    case 'email':
      if (value && !PATTERNS.email.test(value)) {
        return rule.message || DEFAULT_MESSAGES.email;
      }
      break;

    case 'minLength':
      if (value && value.length < rule.value) {
        return rule.message || DEFAULT_MESSAGES.minLength(rule.value);
      }
      break;

    case 'maxLength':
      if (value && value.length > rule.value) {
        return rule.message || DEFAULT_MESSAGES.maxLength(rule.value);
      }
      break;

    case 'pattern':
      if (value && !rule.value.test(value)) {
        return rule.message || DEFAULT_MESSAGES.pattern;
      }
      break;

    case 'number':
      if (value && isNaN(Number(value))) {
        return rule.message || DEFAULT_MESSAGES.number;
      }
      break;

    case 'phone':
      if (value && !PATTERNS.phone.test(value.replace(/\s/g, ''))) {
        return rule.message || DEFAULT_MESSAGES.phone;
      }
      break;

    case 'url':
      if (value && !PATTERNS.url.test(value)) {
        return rule.message || DEFAULT_MESSAGES.url;
      }
      break;

    case 'date':
      if (value && isNaN(Date.parse(value))) {
        return rule.message || DEFAULT_MESSAGES.date;
      }
      break;

    case 'matches':
      if (value && value !== allValues[rule.field]) {
        return rule.message || DEFAULT_MESSAGES.matches(rule.field);
      }
      break;

    case 'custom':
      const result = rule.validate(value);
      if (typeof result === 'string') {
        return result;
      }
      if (!result) {
        return rule.message || 'Valor inválido';
      }
      break;
  }

  return null;
};

export const useFormValidation = <T extends Record<string, any> = Record<string, any>>({
  fields,
  initialValues = {} as T,
  onSubmit,
  validateOnBlur = true,
  validateOnChange = true,
}: UseFormValidationProps<T>): UseFormValidationReturn<T> => {
  const [formState, setFormState] = useState<FormState<T>>(() => ({
    errors: [],
    isDirty: false,
    isSubmitting: false,
    isValid: true,
    touched: new Set<string>(),
    values: initialValues,
  }));

  // Create field lookup map for faster access
  const fieldMap = useState(() => {
    const map = new Map<string, FieldConfig>();
    fields.forEach((field) => map.set(field.name, field));
    return map;
  })[0];

  // Validate a single field
  const validateField = useCallback(
    (fieldName: string): boolean => {
      const field = fieldMap.get(fieldName);
      if (!field?.rules) return true;

      const value = formState.values[fieldName as keyof T];
      const errors: ValidationError[] = [];

      for (const rule of field.rules) {
        const error = validateRule(value, rule, formState.values);
        if (error) {
          errors.push({
            field: fieldName,
            message: error,
            type: rule.type,
          });
          break; // Stop at first error
        }
      }

      // Update form state with new errors
      setFormState((prev) => {
        const newErrors = prev.errors.filter((e) => e.field !== fieldName);
        if (errors.length > 0) {
          newErrors.push(...errors);
        }

        return {
          ...prev,
          errors: newErrors,
          isValid: newErrors.length === 0,
        };
      });

      return errors.length === 0;
    },
    [fieldMap, formState.values]
  );

  // Validate entire form
  const validateForm = useCallback((): boolean => {
    const allErrors: ValidationError[] = [];

    fields.forEach((field) => {
      if (!field.rules) return;

      const value = formState.values[field.name as keyof T];

      for (const rule of field.rules) {
        const error = validateRule(value, rule, formState.values);
        if (error) {
          allErrors.push({
            field: field.name,
            message: error,
            type: rule.type,
          });
          break; // Stop at first error for this field
        }
      }
    });

    setFormState((prev) => ({
      ...prev,
      errors: allErrors,
      isValid: allErrors.length === 0,
    }));

    return allErrors.length === 0;
  }, [fields, formState.values]);

  // Set field value
  const setValue = useCallback(
    (fieldName: string, value: any) => {
      setFormState((prev) => {
        const newValues = { ...prev.values, [fieldName]: value };
        return {
          ...prev,
          isDirty: true,
          values: newValues,
        };
      });

      // Validate dependent fields
      const field = fieldMap.get(fieldName);
      if (field?.dependencies) {
        field.dependencies.forEach((depField) => {
          setTimeout(() => validateField(depField), 0);
        });
      }

      // Validate current field if enabled
      if (validateOnChange) {
        setTimeout(() => validateField(fieldName), 0);
      }
    },
    [fieldMap, validateOnChange, validateField]
  );

  // Set field error
  const setError = useCallback((fieldName: string, message: string) => {
    setFormState((prev) => {
      const newErrors = prev.errors.filter((e) => e.field !== fieldName);
      newErrors.push({
        field: fieldName,
        message,
        type: 'custom',
      });

      return {
        ...prev,
        errors: newErrors,
        isValid: false,
      };
    });
  }, []);

  // Clear field error
  const clearError = useCallback((fieldName: string) => {
    setFormState((prev) => {
      const newErrors = prev.errors.filter((e) => e.field !== fieldName);
      return {
        ...prev,
        errors: newErrors,
        isValid: newErrors.length === 0,
      };
    });
  }, []);

  // Clear all errors
  const clearAllErrors = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      errors: [],
      isValid: true,
    }));
  }, []);

  // Mark field as touched
  const markFieldAsTouched = useCallback(
    (fieldName: string) => {
      setFormState((prev) => ({
        ...prev,
        touched: new Set([...prev.touched, fieldName]),
      }));

      if (validateOnBlur) {
        setTimeout(() => validateField(fieldName), 0);
      }
    },
    [validateOnBlur, validateField]
  );

  // Get field error
  const getFieldError = useCallback(
    (fieldName: string): string | undefined => {
      const error = formState.errors.find((e) => e.field === fieldName);
      return error?.message;
    },
    [formState.errors]
  );

  // Check if field has error
  const hasFieldError = useCallback(
    (fieldName: string): boolean => {
      return formState.errors.some((e) => e.field === fieldName);
    },
    [formState.errors]
  );

  // Check if field is touched
  const isFieldTouched = useCallback(
    (fieldName: string): boolean => {
      return formState.touched.has(fieldName);
    },
    [formState.touched]
  );

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (formState.isSubmitting) return;

    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      // Mark all fields as touched
      const allFieldNames = fields.map((f) => f.name);
      setFormState((prev) => ({
        ...prev,
        touched: new Set(allFieldNames),
      }));

      // Validate entire form
      const isValid = validateForm();

      if (isValid && onSubmit) {
        await onSubmit(formState.values);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  }, [formState.isSubmitting, formState.values, fields, validateForm, onSubmit]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormState({
      errors: [],
      isDirty: false,
      isSubmitting: false,
      isValid: true,
      touched: new Set<string>(),
      values: initialValues,
    });
  }, [initialValues]);

  return {
    clearAllErrors,
    clearError,
    formState,
    getFieldError,
    handleSubmit,
    hasFieldError,
    isFieldTouched,
    markFieldAsTouched,
    resetForm,
    setError,
    setValue,
    validateField,
    validateForm,
  };
};
