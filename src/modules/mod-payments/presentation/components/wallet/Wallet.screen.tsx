import React, { useEffect, useState } from 'react';

import { ActivityIndicator, Alert, RefreshControl } from 'react-native';
import {
  Calendar,
  CreditCard,
  Download,
  Eye,
  Plus,
  Receipt,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react-native';

import { theme } from '@styles/theme';

import {
  PaymentMethod,
  Transaction,
  WalletBalance,
  WalletScreenProps,
  WalletScreenState,
} from './Wallet.screen.interface';

import * as S from './Wallet.screen.styled';

// Mock data
const MOCK_BALANCE: WalletBalance = {
  available: 2450.0,
  currency: 'MXN',
  lastUpdated: new Date().toISOString(),
  pending: 150.0,
};

const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    brand: 'visa',
    expiryMonth: 12,
    expiryYear: 2026,
    icon: 'credit-card',
    id: '1',
    isDefault: true,
    isExpired: false,
    last4: '4242',
    name: 'Visa Principal',
    type: 'credit_card',
  },
  {
    icon: 'paypal',
    id: '2',
    isDefault: false,
    isExpired: false,
    name: 'PayPal',
    type: 'paypal',
  },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    amount: -850,
    currency: 'MXN',
    canDownloadInvoice: true,
    date: '2025-08-10T14:30:00Z',
    description: 'Masaje Relajante',
    id: '1',
    paymentMethod: {
      brand: 'visa',
      last4: '4242',
      type: 'credit_card',
    },
    refundable: true,
    service: {
      id: 'service1',
      name: 'Masaje Relajante de Cuerpo Completo',
      venue: 'Spa Serenity',
    },
    status: 'completed',
    type: 'payment',
  },
  {
    amount: 450,
    canDownloadInvoice: true,
    currency: 'MXN',
    date: '2025-08-08T10:15:00Z',
    description: 'Reembolso - Corte de Cabello',
    id: '2',
    paymentMethod: {
      brand: 'visa',
      last4: '4242',
      type: 'credit_card',
    },
    refundable: false,
    status: 'completed',
    type: 'refund',
  },
  {
    amount: -1200,
    currency: 'MXN',
    canDownloadInvoice: false,
    date: '2025-08-09T19:00:00Z',
    description: 'Cena Romántica para Dos',
    id: '3',
    paymentMethod: {
      type: 'paypal',
    },
    refundable: true,
    service: {
      id: 'service2',
      name: 'Cena Romántica para Dos',
      venue: 'La Terraza Gourmet',
    },
    status: 'pending',
    type: 'payment',
  },
];

const WalletScreen: React.FC<WalletScreenProps> = () => {
  const [state, setState] = useState<WalletScreenState>({
    balance: MOCK_BALANCE,
    invoices: [],
    isLoading: true,
    paymentMethods: [],
    refreshing: false,
    selectedTab: 'overview',
    showAddPaymentMethod: false,
    transactions: [],
  });

  const loadWalletData = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setState((prev) => ({
        ...prev,
        balance: MOCK_BALANCE,
        isLoading: false,
        paymentMethods: MOCK_PAYMENT_METHODS,
        transactions: MOCK_TRANSACTIONS,
      }));
    } catch (error) {
      console.error('Error loading wallet data:', error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const onRefresh = async () => {
    setState((prev) => ({ ...prev, refreshing: true }));
    await loadWalletData();
    setState((prev) => ({ ...prev, refreshing: false }));
  };

  const formatCurrency = (amount: number, currency: string = 'MXN') => {
    const formatter = new Intl.NumberFormat('es-MX', {
      currency,
      style: 'currency',
    });

    return formatter.format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'pending':
        return 'Pendiente';
      case 'failed':
        return 'Fallido';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getTransactionPrefix = (type: string) => {
    switch (type) {
      case 'payment':
        return '-';
      case 'refund':
      case 'credit':
        return '+';
      default:
        return '';
    }
  };

  const handleTabChange = (tab: 'overview' | 'transactions' | 'methods' | 'invoices') => {
    setState((prev) => ({ ...prev, selectedTab: tab }));
  };

  const handleAddPaymentMethod = () => {
    Alert.alert('Agregar Método de Pago', 'Esta función estará disponible próximamente', [
      { text: 'OK' },
    ]);
  };

  const handleDownloadInvoice = (transactionId: string) => {
    Alert.alert('Descargar Recibo', 'El recibo se descargará automáticamente', [{ text: 'OK' }]);
  };

  const handleRequestRefund = (transactionId: string) => {
    Alert.alert(
      'Solicitar Reembolso',
      '¿Estás seguro de que quieres solicitar un reembolso para esta transacción?',
      [
        { style: 'cancel', text: 'Cancelar' },
        {
          onPress: () => {
            /* TODO: Implement refund request */
          },
          text: 'Solicitar',
        },
      ]
    );
  };

  useEffect(() => {
    loadWalletData();
  }, []);

  if (state.isLoading && state.transactions.length === 0) {
    return (
      <S.LoadingContainer>
        <ActivityIndicator color={theme.colors.primary[500]} size='large' />
      </S.LoadingContainer>
    );
  }

  const renderOverview = () => (
    <S.ScrollContainer
      refreshControl={<RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />}
    >
      {/* Quick Actions */}
      <S.QuickActionsContainer>
        <S.QuickActionsList>
          <S.QuickActionCard onPress={handleAddPaymentMethod}>
            <S.QuickActionIcon $color={theme.colors.primary[500]}>
              <Plus color={theme.colors.primary[500]} size={24} />
            </S.QuickActionIcon>
            <S.QuickActionTitle>
              Agregar
              {'\n'}
              Método
            </S.QuickActionTitle>
          </S.QuickActionCard>

          <S.QuickActionCard onPress={() => handleTabChange('transactions')}>
            <S.QuickActionIcon $color={theme.colors.success[500]}>
              <TrendingUp color={theme.colors.success[500]} size={24} />
            </S.QuickActionIcon>
            <S.QuickActionTitle>
              Ver
              {'\n'}
              Historial
            </S.QuickActionTitle>
          </S.QuickActionCard>

          <S.QuickActionCard>
            <S.QuickActionIcon $color={theme.colors.secondary[500]}>
              <Download color={theme.colors.secondary[500]} size={24} />
            </S.QuickActionIcon>
            <S.QuickActionTitle>
              Descargar
              {'\n'}
              Reportes
            </S.QuickActionTitle>
          </S.QuickActionCard>
        </S.QuickActionsList>
      </S.QuickActionsContainer>

      {/* Recent Transactions */}
      <S.ContentContainer>
        {state.transactions.slice(0, 5).map((transaction) => (
          <S.TransactionCard
            key={transaction.id}
            onPress={() => {
              /* TODO: Show transaction details */
            }}
          >
            <S.TransactionHeader>
              <S.TransactionInfo>
                <S.TransactionTitle>{transaction.description}</S.TransactionTitle>
                {transaction.service && (
                  <S.TransactionDescription>{transaction.service.venue}</S.TransactionDescription>
                )}
              </S.TransactionInfo>
              <S.TransactionAmount $type={transaction.type}>
                {getTransactionPrefix(transaction.type)}
                {formatCurrency(transaction.amount)}
              </S.TransactionAmount>
            </S.TransactionHeader>

            <S.TransactionFooter>
              <S.TransactionDate>{formatDate(transaction.date)}</S.TransactionDate>
              <S.TransactionStatus $status={transaction.status}>
                <S.TransactionStatusText $status={transaction.status}>
                  {getStatusLabel(transaction.status)}
                </S.TransactionStatusText>
              </S.TransactionStatus>
            </S.TransactionFooter>
          </S.TransactionCard>
        ))}
      </S.ContentContainer>
    </S.ScrollContainer>
  );

  const renderTransactions = () => (
    <S.ScrollContainer
      refreshControl={<RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />}
    >
      <S.ContentContainer>
        {state.transactions.map((transaction) => (
          <S.TransactionCard
            key={transaction.id}
            onPress={() => {
              /* TODO: Show transaction details */
            }}
          >
            <S.TransactionHeader>
              <S.TransactionInfo>
                <S.TransactionTitle>{transaction.description}</S.TransactionTitle>
                {transaction.service && (
                  <S.TransactionDescription>{transaction.service.venue}</S.TransactionDescription>
                )}
              </S.TransactionInfo>
              <S.TransactionAmount $type={transaction.type}>
                {getTransactionPrefix(transaction.type)}
                {formatCurrency(transaction.amount)}
              </S.TransactionAmount>
            </S.TransactionHeader>

            <S.TransactionFooter>
              <S.TransactionDate>{formatDate(transaction.date)}</S.TransactionDate>
              <S.TransactionStatus $status={transaction.status}>
                <S.TransactionStatusText $status={transaction.status}>
                  {getStatusLabel(transaction.status)}
                </S.TransactionStatusText>
              </S.TransactionStatus>
            </S.TransactionFooter>
          </S.TransactionCard>
        ))}
      </S.ContentContainer>
    </S.ScrollContainer>
  );

  const renderPaymentMethods = () => (
    <S.ScrollContainer>
      <S.ContentContainer>
        <S.AddPaymentButton onPress={handleAddPaymentMethod}>
          <Plus color={theme.colors.white} size={20} />
          <S.AddPaymentButtonText>Agregar Método de Pago</S.AddPaymentButtonText>
        </S.AddPaymentButton>

        {state.paymentMethods.map((method) => (
          <S.PaymentMethodCard key={method.id}>
            <S.PaymentMethodIcon $color={theme.colors.primary[500]}>
              <CreditCard color={theme.colors.primary[500]} size={24} />
            </S.PaymentMethodIcon>
            <S.PaymentMethodInfo>
              <S.PaymentMethodName>{method.name}</S.PaymentMethodName>
              <S.PaymentMethodDetails>
                {method.last4 ? `•••• ${method.last4}` : 'Cuenta vinculada'}
                {method.expiryMonth &&
                  method.expiryYear &&
                  ` • ${method.expiryMonth}/${method.expiryYear}`}
              </S.PaymentMethodDetails>
            </S.PaymentMethodInfo>
            {method.isDefault && (
              <S.PaymentMethodBadge>
                <S.PaymentMethodBadgeText>Principal</S.PaymentMethodBadgeText>
              </S.PaymentMethodBadge>
            )}
          </S.PaymentMethodCard>
        ))}
      </S.ContentContainer>
    </S.ScrollContainer>
  );

  const renderInvoices = () => (
    <S.EmptyState>
      <Receipt color={theme.colors.gray[300]} size={48} />
      <S.EmptyStateTitle>Sin Facturas</S.EmptyStateTitle>
      <S.EmptyStateText>
        Las facturas de tus compras aparecerán aquí cuando estén disponibles
      </S.EmptyStateText>
    </S.EmptyState>
  );

  const renderContent = () => {
    switch (state.selectedTab) {
      case 'transactions':
        return renderTransactions();
      case 'methods':
        return renderPaymentMethods();
      case 'invoices':
        return renderInvoices();
      default:
        return renderOverview();
    }
  };

  return (
    <S.Container>
      {/* Header */}
      <S.Header>
        <S.HeaderTitle>Mi Billetera</S.HeaderTitle>
        <S.HeaderSubtitle>Gestiona tus pagos y transacciones</S.HeaderSubtitle>
      </S.Header>

      {/* Balance Card */}
      <S.BalanceCard>
        <S.BalanceHeader>
          <S.BalanceLabel>Balance Disponible</S.BalanceLabel>
          <S.BalanceIcon>
            <Eye color={theme.colors.white} size={20} />
          </S.BalanceIcon>
        </S.BalanceHeader>

        <S.BalanceAmount>
          {formatCurrency(state.balance.available, state.balance.currency)}
        </S.BalanceAmount>

        <S.BalanceDetails>
          <S.BalanceDetail>
            <S.BalanceDetailLabel>Pendiente</S.BalanceDetailLabel>
            <S.BalanceDetailAmount>
              {formatCurrency(state.balance.pending, state.balance.currency)}
            </S.BalanceDetailAmount>
          </S.BalanceDetail>
          <S.BalanceDetail>
            <S.BalanceDetailLabel>Este Mes</S.BalanceDetailLabel>
            <S.BalanceDetailAmount>
              {formatCurrency(2850, state.balance.currency)}
            </S.BalanceDetailAmount>
          </S.BalanceDetail>
        </S.BalanceDetails>
      </S.BalanceCard>

      {/* Tabs */}
      <S.TabsContainer>
        <S.TabButton
          $isActive={state.selectedTab === 'overview'}
          onPress={() => handleTabChange('overview')}
        >
          <S.TabButtonText $isActive={state.selectedTab === 'overview'}>Resumen</S.TabButtonText>
        </S.TabButton>
        <S.TabButton
          $isActive={state.selectedTab === 'transactions'}
          onPress={() => handleTabChange('transactions')}
        >
          <S.TabButtonText $isActive={state.selectedTab === 'transactions'}>
            Transacciones
          </S.TabButtonText>
        </S.TabButton>
        <S.TabButton
          $isActive={state.selectedTab === 'methods'}
          onPress={() => handleTabChange('methods')}
        >
          <S.TabButtonText $isActive={state.selectedTab === 'methods'}>Métodos</S.TabButtonText>
        </S.TabButton>
        <S.TabButton
          $isActive={state.selectedTab === 'invoices'}
          onPress={() => handleTabChange('invoices')}
        >
          <S.TabButtonText $isActive={state.selectedTab === 'invoices'}>Facturas</S.TabButtonText>
        </S.TabButton>
      </S.TabsContainer>

      {/* Content */}
      {renderContent()}
    </S.Container>
  );
};

export default WalletScreen;
