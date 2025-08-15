import React, { useState } from 'react';

import { Alert, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, Clock } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { PickerButton, PickerContainer, PickerIcon, PickerText } from './DateTimePicker.styled';

interface SimpleDateTimePickerProps {
  mode: 'date' | 'time';
  value: Date | null;
  onDateChange: (date: Date) => void;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

export const SimpleDateTimePicker: React.FC<SimpleDateTimePickerProps> = ({
  maximumDate,
  minimumDate,
  mode,
  onDateChange,
  placeholder,
  value,
}) => {
  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value || new Date());

  const onChange = (event: any, selectedDate?: Date) => {
    console.log('SimpleDateTimePicker onChange:', {
      eventType: event?.type,
      selectedDate: selectedDate?.toISOString(),
    });

    if (selectedDate) {
      setTempDate(selectedDate);

      if (Platform.OS === 'android') {
        setShow(false);
        onDateChange(selectedDate);
      }
    }

    if (Platform.OS === 'android' || event?.type === 'dismissed') {
      setShow(false);
    }
  };

  const handleConfirm = () => {
    onDateChange(tempDate);
    setShow(false);
  };

  const handleCancel = () => {
    setTempDate(value || new Date());
    setShow(false);
  };

  const showPicker = () => {
    console.log(`Showing ${mode} picker...`);
    setShow(true);
  };

  const formatValue = () => {
    if (!value) return placeholder || 'Seleccionar';

    if (mode === 'date') {
      return value.toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
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

  return (
    <PickerContainer>
      <PickerButton activeOpacity={0.7} onPress={showPicker}>
        <PickerIcon>
          {mode === 'date' ? <Calendar color='#666' size={20} /> : <Clock color='#666' size={20} />}
        </PickerIcon>
        <PickerText hasValue={!!value}>{formatValue()}</PickerText>
      </PickerButton>

      {show && (
        <Modal animationType='slide' transparent visible={show}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                minHeight: Platform.OS === 'ios' ? 300 : 'auto',
                paddingBottom: Platform.OS === 'ios' ? 40 : 20,
                paddingHorizontal: 20,
                paddingTop: 20,
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity onPress={handleCancel}>
                  <Text style={{ color: '#007AFF', fontSize: 16 }}>Cancelar</Text>
                </TouchableOpacity>

                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                >
                  {mode === 'date' ? 'Seleccionar Fecha' : 'Seleccionar Hora'}
                </Text>

                <TouchableOpacity onPress={handleConfirm}>
                  <Text style={{ color: '#007AFF', fontSize: 16, fontWeight: 'bold' }}>
                    Confirmar
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  height: Platform.OS === 'ios' ? 200 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <DateTimePicker
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  locale='es-MX'
                  maximumDate={maximumDate}
                  minimumDate={minimumDate}
                  mode={mode}
                  style={{
                    height: Platform.OS === 'ios' ? 200 : undefined,
                    width: '100%',
                  }}
                  value={tempDate}
                  onChange={onChange}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </PickerContainer>
  );
};
