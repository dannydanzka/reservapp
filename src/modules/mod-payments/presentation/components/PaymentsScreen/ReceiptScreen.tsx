import React, { useCallback, useEffect, useState } from 'react';

import { ActivityIndicator, RefreshControl } from 'react-native';
import { Receipt } from 'lucide-react-native';

import { fetchReceipts } from '../../../infrastructure/state/paymentsSlice';
import {
  Receipt as ReceiptType,
  receiptsService,
} from '../../../infrastructure/services/receiptsService';
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

export const ReceiptScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { receipts, receiptsError, receiptsLoading, receiptsSummary } = useAppSelector(
    (state) => state.payments
  );

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadReceipts();
  }, []);

  const loadReceipts = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      await dispatch(
        fetchReceipts({
          pagination: { limit: 20, page: 1 },
        })
      ).unwrap();
    } catch (error) {
      console.error('Error loading receipts:', error);
    }
  }, [dispatch, isAuthenticated]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadReceipts();
    setRefreshing(false);
  }, [loadReceipts]);

  const handleRetry = useCallback(() => {
    loadReceipts();
  }, [loadReceipts]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }, []);

  const renderReceiptItem = useCallback(
    ({ item }: { item: ReceiptType }) => (
      <ItemContainer>
        <ItemHeader>
          <ItemTitle numberOfLines={2}>
            Factura #{item.receiptNumber.slice(-8)} -{' '}
            {receiptsService.getReceiptTypeLabel(item.type)}
          </ItemTitle>
          <ItemAmount>{receiptsService.formatPrice(item.amount, item.currency)}</ItemAmount>
        </ItemHeader>

        <ItemSubtitle numberOfLines={1}>
          {item.payment.reservation.service.name} - {item.payment.reservation.venue.name}
        </ItemSubtitle>

        <ItemFooter>
          <ItemDate>{formatDate(item.issueDate)}</ItemDate>
          <StatusBadge color={receiptsService.getReceiptStatusColor(item.status)}>
            <StatusText>{receiptsService.getReceiptStatusLabel(item.status)}</StatusText>
          </StatusBadge>
        </ItemFooter>
      </ItemContainer>
    ),
    [formatDate]
  );

  const renderEmptyState = () => (
    <EmptyContainer>
      <EmptyIcon>
        <Receipt color='#ccc' size={48} />
      </EmptyIcon>
      <EmptyTitle>No tienes facturas</EmptyTitle>
      <EmptyText>
        Cuando se generen facturas de tus pagos, aparecerán aquí para que puedas descargarlas.
      </EmptyText>
    </EmptyContainer>
  );

  const renderSummary = () => {
    if (!receiptsSummary) return null;

    return (
      <SummaryContainer>
        <SummaryTitle>Resumen de Facturas</SummaryTitle>
        <SummaryRow>
          <SummaryLabel>Total de facturas:</SummaryLabel>
          <SummaryValue>{receiptsSummary.totalReceipts}</SummaryValue>
        </SummaryRow>
        <SummaryRow>
          <SummaryLabel>Monto total:</SummaryLabel>
          <SummaryValue highlight>
            {receiptsService.formatPrice(receiptsSummary.totalAmount)}
          </SummaryValue>
        </SummaryRow>
        <SummaryRow>
          <SummaryLabel>Verificadas:</SummaryLabel>
          <SummaryValue>{receiptsSummary.verifiedCount}</SummaryValue>
        </SummaryRow>
        <SummaryRow>
          <SummaryLabel>Pendientes:</SummaryLabel>
          <SummaryValue>{receiptsSummary.pendingCount}</SummaryValue>
        </SummaryRow>
      </SummaryContainer>
    );
  };

  if (!isAuthenticated) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorText>Inicia sesión para ver tus facturas</ErrorText>
        </ErrorContainer>
      </Container>
    );
  }

  if (receiptsLoading && !refreshing && receipts.length === 0) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator color='#FF8A00' size='large' />
          <LoadingText>Cargando facturas...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  if (receiptsError && receipts.length === 0) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorText>{receiptsError}</ErrorText>
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
          contentContainerStyle={receipts.length === 0 ? { flex: 1 } : { paddingVertical: 8 }}
          data={receipts}
          keyExtractor={(item: ReceiptType) => item.id}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              colors={['#FF8A00']}
              refreshing={refreshing}
              tintColor='#FF8A00'
              onRefresh={handleRefresh}
            />
          }
          renderItem={renderReceiptItem}
          showsVerticalScrollIndicator={false}
        />
      </ListContainer>
    </Container>
  );
};
