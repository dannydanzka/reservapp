import React, { useState } from 'react';

import { Alert, Platform, Text, TouchableOpacity } from 'react-native';
import { Calendar, Clock } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { PickerButton, PickerContainer, PickerIcon, PickerText } from './DateTimePicker.styled';

interface DateTimePickerComponentProps {
  mode: 'date' | 'time';
  value: Date | null;
  onDateChange: (date: Date) => void;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

export const DateTimePickerComponent: React.FC<DateTimePickerComponentProps> = ({
  maximumDate,
  minimumDate,
  mode,
  onDateChange,
  placeholder,
  value,
}) => {
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    console.log('DateTimePicker onChange:', {
      eventType: event?.type,
      platform: Platform.OS,
      selectedDate: selectedDate?.toISOString(),
    });

    // En Android, siempre cerramos el picker después de seleccionar o cancelar
    if (Platform.OS === 'android') {
      setShow(false);
    }

    // Solo actualizamos el valor si realmente se seleccionó una fecha
    if (selectedDate && event?.type !== 'dismissed') {
      console.log('Updating date value:', selectedDate);
      onDateChange(selectedDate);
    }

    // En iOS, cerramos el picker si se cancela
    if (Platform.OS === 'ios' && event?.type === 'dismissed') {
      setShow(false);
    }
  };

  const showPicker = () => {
    console.log(`Showing ${mode} picker...`);
    setShow(true);
  };

  const formatValue = () => {
    if (!value) return placeholder || 'Seleccionar';

    if (mode === 'date') {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      if (value.toDateString() === today.toDateString()) {
        return (
          'Hoy, ' +
          value.toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'long',
          })
        );
      } else if (value.toDateString() === tomorrow.toDateString()) {
        return (
          'Mañana, ' +
          value.toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'long',
          })
        );
      } else {
        return value.toLocaleDateString('es-MX', {
          day: 'numeric',
          month: 'long',
          weekday: 'long',
          year: 'numeric',
        });
      }
    } else {
      return value.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        hour12: false,
        minute: '2-digit',
      });
    }
  };

  console.log('DateTimePicker render:', { hasValue: !!value, mode, show });

  return (
    <PickerContainer>
      <PickerButton activeOpacity={0.7} onPress={showPicker}>
        <PickerIcon>
          {mode === 'date' ? <Calendar color='#666' size={20} /> : <Clock color='#666' size={20} />}
        </PickerIcon>
        <PickerText hasValue={!!value}>{formatValue()}</PickerText>
      </PickerButton>

      {show && (
        <DateTimePicker
          display={Platform.OS === 'ios' ? 'compact' : 'default'}
          is24Hour
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          mode={mode}
          testID='dateTimePicker'
          value={value || new Date()}
          onChange={onChange}
        />
      )}
    </PickerContainer>
  );
};
