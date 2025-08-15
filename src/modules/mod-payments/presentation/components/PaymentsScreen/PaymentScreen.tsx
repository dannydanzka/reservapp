import React, { useCallback, useEffect, useState } from 'react';

import { ActivityIndicator, RefreshControl } from 'react-native';
import { CreditCard } from 'lucide-react-native';

import { fetchPayments } from '../../../infrastructure/state/paymentsSlice';
import { Payment, paymentsService } from '../../../infrastructure/services/paymentsService';
import { useAppDispatch, useAppSelector } from '../../../../../libs/infrastructure/store/hooks';

import {
  Container,
  EmptyContainer,
  EmptyIcon,
  EmptyText,
  EmptyTitle,
  ErrorContainer,
  ErrorText,
  ItemAmount,
  ItemContainer,
  ItemDate,
  ItemFooter,
  ItemHeader,
  ItemSubtitle,
  ItemTitle,
  List,
  ListContainer,
  LoadingContainer,
  LoadingText,
  RetryButton,
  RetryButtonText,
  StatusBadge,
  StatusText,
  SummaryContainer,
  SummaryLabel,
  SummaryRow,
  SummaryTitle,
  SummaryValue,
} from './PaymentsScreen.styled';

export const PaymentScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { payments, paymentsError, paymentsLoading, paymentsSummary } = useAppSelector(
    (state) => state.payments
  );

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      await dispatch(
        fetchPayments({
          pagination: { limit: 20, page: 1 },
        })
      ).unwrap();
    } catch (error) {
      console.error('Error loading payments:', error);
    }
  }, [dispatch, isAuthenticated]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPayments();
    setRefreshing(false);
  }, [loadPayments]);

  const handleRetry = useCallback(() => {
    loadPayments();
  }, [loadPayments]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }, []);

  const renderPaymentItem = useCallback(
    ({ item }: { item: Payment }) => (
      <ItemContainer>
        <ItemHeader>
          <ItemTitle numberOfLines={2}>
            {item.reservation.service.name} - {item.reservation.venue.name}
          </ItemTitle>
          <ItemAmount>{paymentsService.formatPrice(item.amount, item.currency)}</ItemAmount>
        </ItemHeader>

        <ItemSubtitle numberOfLines={1}>{item.description}</ItemSubtitle>

        <ItemFooter>
          <ItemDate>
            {item.transactionDate ? formatDate(item.transactionDate) : formatDate(item.createdAt)}
          </ItemDate>
          <StatusBadge color={paymentsService.getPaymentStatusColor(item.status)}>
            <StatusText>{paymentsService.getPaymentStatusLabel(item.status)}</StatusText>
          </StatusBadge>
        </ItemFooter>
      </ItemContainer>
    ),
    [formatDate]
  );

  const renderEmptyState = () => (
    <EmptyContainer>
      <EmptyIcon>
        <CreditCard color='#ccc' size={48} />
      </EmptyIcon>
      <EmptyTitle>No tienes pagos</EmptyTitle>
      <EmptyText>
        Cuando realices pagos por tus reservaciones, aparecerán aquí para que puedas revisarlos.
      </EmptyText>
    </EmptyContainer>
  );

  const renderSummary = () => {
    if (!paymentsSummary) return null;

    return (
      <SummaryContainer>
        <SummaryTitle>Resumen de Pagos</SummaryTitle>
        <SummaryRow>
          <SummaryLabel>Total de pagos:</SummaryLabel>
          <SummaryValue>{paymentsSummary.totalPayments}</SummaryValue>
        </SummaryRow>
        <SummaryRow>
          <SummaryLabel>Monto total:</SummaryLabel>
          <SummaryValue highlight>
            {paymentsService.formatPrice(paymentsSummary.totalAmount)}
          </SummaryValue>
        </SummaryRow>
        <SummaryRow>
          <SummaryLabel>Completados:</SummaryLabel>
          <SummaryValue highlight>
            {paymentsService.formatPrice(paymentsSummary.completedAmount)}
          </SummaryValue>
        </SummaryRow>
        <SummaryRow>
          <SummaryLabel>Pendientes:</SummaryLabel>
          <SummaryValue>{paymentsSummary.pendingCount}</SummaryValue>
        </SummaryRow>
      </SummaryContainer>
    );
  };

  if (!isAuthenticated) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorText>Inicia sesión para ver tus pagos</ErrorText>
        </ErrorContainer>
      </Container>
    );
  }

  if (paymentsLoading && !refreshing && payments.length === 0) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator color='#FF8A00' size='large' />
          <LoadingText>Cargando pagos...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  if (paymentsError && payments.length === 0) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorText>{paymentsError}</ErrorText>
          <RetryButton onPress={handleRetry}>
            <RetryButtonText>Reintentar</RetryButtonText>
          </RetryButton>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      {renderSummary()}
      <ListContainer>
        <List
          contentContainerStyle={payments.length === 0 ? { flex: 1 } : { paddingVertical: 8 }}
          data={payments}
          keyExtractor={(item: Payment) => item.id}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              colors={['#FF8A00']}
              refreshing={refreshing}
              tintColor='#FF8A00'
              onRefresh={handleRefresh}
            />
          }
          renderItem={renderPaymentItem}
          showsVerticalScrollIndicator={false}
        />
      </ListContainer>
    </Container>
  );
};
