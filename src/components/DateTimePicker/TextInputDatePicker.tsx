import React, { useRef, useState } from 'react';

import { Alert, TextInput, View } from 'react-native';
import { Calendar, Clock } from 'lucide-react-native';

import { PickerButton, PickerContainer, PickerIcon, PickerText } from './DateTimePicker.styled';

interface TextInputDatePickerProps {
  mode: 'date' | 'time';
  value: Date | null;
  onDateChange: (date: Date) => void;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

export const TextInputDatePicker: React.FC<TextInputDatePickerProps> = ({
  minimumDate,
  mode,
  onDateChange,
  placeholder,
  value,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  const formatValue = () => {
    if (!value) return placeholder || 'Seleccionar';

    if (mode === 'date') {
      return value.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } else {
      return value.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        hour12: false,
        minute: '2-digit',
      });
    }
  };

  const showInputPrompt = () => {
    const currentValue = value
      ? mode === 'date'
        ? value.toISOString().split('T')[0]
        : value.toTimeString().split(' ')[0].substring(0, 5)
      : '';

    Alert.prompt(
      mode === 'date' ? 'Seleccionar Fecha' : 'Seleccionar Hora',
      mode === 'date' ? 'Ingresa la fecha (YYYY-MM-DD):' : 'Ingresa la hora (HH:MM):',
      [
        {
          style: 'cancel',
          text: 'Cancelar',
        },
        {
          onPress: (text) => handleInputSubmit(text || ''),
          text: 'Confirmar',
        },
      ],
      'plain-text',
      currentValue
    );
  };

  const handleInputSubmit = (text: string) => {
    console.log('TextInputDatePicker input:', text);

    if (mode === 'date') {
      // Validar formato YYYY-MM-DD
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(text)) {
        Alert.alert('Error', 'Formato incorrecto. Use YYYY-MM-DD (ejemplo: 2024-12-25)');
        return;
      }

      const date = new Date(text + 'T12:00:00');
      if (isNaN(date.getTime())) {
        Alert.alert('Error', 'Fecha inválida');
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (date < today) {
        Alert.alert('Error', 'La fecha debe ser hoy o en el futuro');
        return;
      }

      console.log('Setting date:', date);
      onDateChange(date);
    } else {
      // Validar formato HH:MM
      const timeRegex = /^\d{2}:\d{2}$/;
      if (!timeRegex.test(text)) {
        Alert.alert('Error', 'Formato incorrecto. Use HH:MM (ejemplo: 14:30)');
        return;
      }

      const [hours, minutes] = text.split(':').map(Number);
      if (hours >= 24 || minutes >= 60) {
        Alert.alert('Error', 'Hora inválida');
        return;
      }

      const time = new Date();
      time.setHours(hours, minutes, 0, 0);

      console.log('Setting time:', time);
      onDateChange(time);
    }
  };

  return (
    <PickerContainer>
      <PickerButton activeOpacity={0.7} onPress={showInputPrompt}>
        <PickerIcon>
          {mode === 'date' ? <Calendar color='#666' size={20} /> : <Clock color='#666' size={20} />}
        </PickerIcon>
        <PickerText hasValue={!!value}>{formatValue()}</PickerText>
      </PickerButton>
    </PickerContainer>
  );
};
