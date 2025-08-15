import React, { useEffect, useState } from 'react';

import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  CheckCircle,
  CreditCard,
  DollarSign,
  Plus,
} from 'lucide-react-native';

import { useAppDispatch, useAppSelector } from '../../../../../libs/infrastructure/store/hooks';

import {
  AddPaymentButton,
  AddPaymentText,
  BalanceAmount,
  BalanceCard,
  BalanceLabel,
  Container,
  Header,
  PaymentMethodCard,
  PaymentMethodExpiry,
  PaymentMethodInfo,
  PaymentMethodNumber,
  Section,
  SectionTitle,
  Title,
  TransactionAmount,
  TransactionDate,
  TransactionIcon,
  TransactionInfo,
  TransactionItem,
  TransactionTitle,
} from './WalletScreen.styled';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  lastFour: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

interface Transaction {
  id: string;
  type: 'payment' | 'refund' | 'deposit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export const WalletScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      expiryMonth: 12,
      expiryYear: 2025,
      id: '1',
      isDefault: true,
      lastFour: '4532',
      type: 'visa',
    },
    {
      expiryMonth: 8,
      expiryYear: 2024,
      id: '2',
      isDefault: false,
      lastFour: '8901',
      type: 'mastercard',
    },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      amount: -250.0,
      date: '2024-01-15',
      description: 'Reserva - Hotel Boutique Salazar',
      id: '1',
      status: 'completed',
      type: 'payment',
    },
    {
      amount: 125.0,
      date: '2024-01-10',
      description: 'Reembolso - Cancelación Spa',
      id: '2',
      status: 'completed',
      type: 'refund',
    },
    {
      amount: -180.0,
      date: '2024-01-08',
      description: 'Reserva - Restaurante La Cocina',
      id: '3',
      status: 'completed',
      type: 'payment',
    },
  ]);

  const [balance] = useState(850.5);

  const handleAddPaymentMethod = () => {
    Alert.alert('Agregar Método de Pago', 'Esta funcionalidad estará disponible próximamente.', [
      { style: 'default', text: 'Entendido' },
    ]);
  };

  const handleRemovePaymentMethod = (id: string) => {
    Alert.alert(
      'Eliminar Método de Pago',
      '¿Estás seguro de que deseas eliminar este método de pago?',
      [
        { style: 'cancel', text: 'Cancelar' },
        {
          onPress: () => {
            setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
          },
          style: 'destructive',
          text: 'Eliminar',
        },
      ]
    );
  };

  const getCardIcon = (type: string) => {
    return <CreditCard color='#6B7280' size={20} />;
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <ArrowUpRight color='#EF4444' size={20} />;
      case 'refund':
        return <ArrowDownLeft color='#10B981' size={20} />;
      case 'deposit':
        return <DollarSign color='#3B82F6' size={20} />;
      default:
        return <DollarSign color='#6B7280' size={20} />;
    }
  };

  const formatAmount = (amount: number) => {
    const sign = amount < 0 ? '-' : '+';
    return `${sign}$${Math.abs(amount).toFixed(2)}`;
  };

  const getAmountColor = (amount: number) => {
    return amount < 0 ? '#EF4444' : '#10B981';
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <Title>Mi Wallet</Title>
        </Header>

        {/* Balance Card */}
        <BalanceCard>
          <BalanceLabel>Saldo Disponible</BalanceLabel>
          <BalanceAmount>${balance.toFixed(2)}</BalanceAmount>
        </BalanceCard>

        {/* Payment Methods Section */}
        <Section>
          <SectionTitle>Métodos de Pago</SectionTitle>

          {paymentMethods.map((method) => (
            <PaymentMethodCard key={method.id}>
              <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row' }}>
                {getCardIcon(method.type)}
                <PaymentMethodInfo>
                  <PaymentMethodNumber>•••• •••• •••• {method.lastFour}</PaymentMethodNumber>
                  <PaymentMethodExpiry>
                    Expira {method.expiryMonth.toString().padStart(2, '0')}/
                    {method.expiryYear.toString().slice(2)}
                  </PaymentMethodExpiry>
                </PaymentMethodInfo>
              </View>
              {method.isDefault && (
                <View
                  style={{
                    backgroundColor: '#10B981',
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>Principal</Text>
                </View>
              )}
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => handleRemovePaymentMethod(method.id)}
              >
                <Text style={{ color: '#EF4444', fontSize: 12 }}>Eliminar</Text>
              </TouchableOpacity>
            </PaymentMethodCard>
          ))}

          <AddPaymentButton onPress={handleAddPaymentMethod}>
            <Plus color='#6B46C1' size={20} />
            <AddPaymentText>Agregar Método de Pago</AddPaymentText>
          </AddPaymentButton>
        </Section>

        {/* Transactions Section */}
        <Section>
          <SectionTitle>Historial de Transacciones</SectionTitle>

          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id}>
              <TransactionIcon>{getTransactionIcon(transaction.type)}</TransactionIcon>
              <TransactionInfo>
                <TransactionTitle>{transaction.description}</TransactionTitle>
                <TransactionDate>
                  <Calendar color='#9CA3AF' size={12} />
                  <Text style={{ color: '#9CA3AF', fontSize: 12, marginLeft: 4 }}>
                    {new Date(transaction.date).toLocaleDateString('es-ES')}
                  </Text>
                </TransactionDate>
              </TransactionInfo>
              <View style={{ alignItems: 'flex-end' }}>
                <TransactionAmount color={getAmountColor(transaction.amount)}>
                  {formatAmount(transaction.amount)}
                </TransactionAmount>
                {transaction.status === 'completed' && (
                  <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 2 }}>
                    <CheckCircle color='#10B981' size={12} />
                    <Text style={{ color: '#10B981', fontSize: 10, marginLeft: 2 }}>
                      Completado
                    </Text>
                  </View>
                )}
              </View>
            </TransactionItem>
          ))}
        </Section>
      </ScrollView>
    </Container>
  );
};
