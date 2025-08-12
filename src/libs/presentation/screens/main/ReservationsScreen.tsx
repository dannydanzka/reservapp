import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@presentation/styles/theme';

const ReservationsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Reservas</Text>
      <Text style={styles.subtitle}>Consulta y gestiona tus reservas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.gray[25],
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    color: theme.colors.gray[500],
    fontSize: 16,
  },
  title: {
    color: theme.colors.primary[600],
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ReservationsScreen;
