import React, { useRef, useState } from 'react';

import { Calendar, Clock } from 'lucide-react-native';
import { Dimensions, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { PickerButton, PickerContainer, PickerIcon, PickerText } from './DateTimePicker.styled';

interface CustomWheelPickerProps {
  mode: 'date' | 'time';
  value: Date | null;
  onDateChange: (date: Date) => void;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

const { height: screenHeight } = Dimensions.get('window');

export const CustomWheelPicker: React.FC<CustomWheelPickerProps> = ({
  minimumDate = new Date(),
  mode,
  onDateChange,
  placeholder,
  value,
}) => {
  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value || new Date());

  // Generar arrays para los pickers
  const generateDays = () => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 60; i++) {
      // 60 días hacia adelante
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        label:
          i === 0
            ? 'Hoy'
            : i === 1
            ? 'Mañana'
            : date.toLocaleDateString('es-MX', {
                day: 'numeric',
                month: 'short',
                weekday: 'short',
              }),
        value: date,
      });
    }
    return days;
  };

  const generateHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push({
        label: i.toString().padStart(2, '0'),
        value: i,
      });
    }
    return hours;
  };

  const generateMinutes = () => {
    const minutes = [];
    for (let i = 0; i < 60; i += 15) {
      // Intervalos de 15 minutos
      minutes.push({
        label: i.toString().padStart(2, '0'),
        value: i,
      });
    }
    return minutes;
  };

  const formatValue = () => {
    if (!value) return placeholder || 'Seleccionar';

    if (mode === 'date') {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      if (value.toDateString() === today.toDateString()) {
        return 'Hoy';
      } else if (value.toDateString() === tomorrow.toDateString()) {
        return 'Mañana';
      } else {
        return value.toLocaleDateString('es-MX', {
          day: 'numeric',
          month: 'short',
          weekday: 'short',
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

  const showPicker = () => {
    setTempDate(value || new Date());
    setShow(true);
  };

  const handleConfirm = () => {
    onDateChange(tempDate);
    setShow(false);
  };

  const handleCancel = () => {
    setShow(false);
  };

  const renderDatePicker = () => {
    const days = generateDays();
    const selectedDay = days.findIndex(
      (day) => day.value.toDateString() === tempDate.toDateString()
    );

    return (
      <View style={{ height: 200, justifyContent: 'center' }}>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 80 }}
          decelerationRate='fast'
          showsVerticalScrollIndicator={false}
          snapToInterval={40}
        >
          {days.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={{
                alignItems: 'center',
                backgroundColor: selectedDay === index ? '#e3f2fd' : 'transparent',
                borderRadius: selectedDay === index ? 8 : 0,
                height: 40,
                justifyContent: 'center',
                marginHorizontal: 20,
              }}
              onPress={() => {
                setTempDate(day.value);
              }}
            >
              <Text
                style={{
                  color: selectedDay === index ? '#1976d2' : '#333',
                  fontSize: 16,
                  fontWeight: selectedDay === index ? '600' : 'normal',
                }}
              >
                {day.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderTimePicker = () => {
    const hours = generateHours();
    const minutes = generateMinutes();

    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          height: 200,
          justifyContent: 'center',
        }}
      >
        {/* Horas */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10, textAlign: 'center' }}>
            Hora
          </Text>
          <ScrollView
            contentContainerStyle={{ paddingVertical: 60 }}
            decelerationRate='fast'
            showsVerticalScrollIndicator={false}
            snapToInterval={40}
          >
            {hours.map((hour, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  alignItems: 'center',
                  backgroundColor: tempDate.getHours() === hour.value ? '#e3f2fd' : 'transparent',
                  borderRadius: 8,
                  height: 40,
                  justifyContent: 'center',
                  marginHorizontal: 10,
                }}
                onPress={() => {
                  const newDate = new Date(tempDate);
                  newDate.setHours(hour.value);
                  setTempDate(newDate);
                }}
              >
                <Text
                  style={{
                    color: tempDate.getHours() === hour.value ? '#1976d2' : '#333',
                    fontSize: 16,
                    fontWeight: tempDate.getHours() === hour.value ? '600' : 'normal',
                  }}
                >
                  {hour.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Separador */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 10 }}>:</Text>

        {/* Minutos */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10, textAlign: 'center' }}>
            Minutos
          </Text>
          <ScrollView
            contentContainerStyle={{ paddingVertical: 60 }}
            decelerationRate='fast'
            showsVerticalScrollIndicator={false}
            snapToInterval={40}
          >
            {minutes.map((minute, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  alignItems: 'center',
                  backgroundColor:
                    Math.floor(tempDate.getMinutes() / 15) * 15 === minute.value
                      ? '#e3f2fd'
                      : 'transparent',
                  borderRadius: 8,
                  height: 40,
                  justifyContent: 'center',
                  marginHorizontal: 10,
                }}
                onPress={() => {
                  const newDate = new Date(tempDate);
                  newDate.setMinutes(minute.value);
                  setTempDate(newDate);
                }}
              >
                <Text
                  style={{
                    color:
                      Math.floor(tempDate.getMinutes() / 15) * 15 === minute.value
                        ? '#1976d2'
                        : '#333',
                    fontSize: 16,
                    fontWeight:
                      Math.floor(tempDate.getMinutes() / 15) * 15 === minute.value
                        ? '600'
                        : 'normal',
                  }}
                >
                  {minute.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <PickerContainer>
      <PickerButton activeOpacity={0.7} onPress={showPicker}>
        <PickerIcon>
          {mode === 'date' ? <Calendar color='#666' size={20} /> : <Clock color='#666' size={20} />}
        </PickerIcon>
        <PickerText hasValue={!!value}>{formatValue()}</PickerText>
      </PickerButton>

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
              maxHeight: screenHeight * 0.6,
              paddingBottom: 40,
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

            {mode === 'date' ? renderDatePicker() : renderTimePicker()}
          </View>
        </View>
      </Modal>
    </PickerContainer>
  );
};
