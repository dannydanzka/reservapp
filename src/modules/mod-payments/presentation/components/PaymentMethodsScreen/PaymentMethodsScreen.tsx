import React, { useEffect, useState } from 'react';

import { Alert, FlatList, RefreshControl } from 'react-native';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Edit3,
  MoreVertical,
  Plus,
  Shield,
  Trash2,
} from 'lucide-react-native';
import styled from 'styled-components/native';

import {
  Badge,
  FeedbackBox,
  LoadingState,
  SkeletonBox,
  SkeletonText,
  useLoadingState,
  useNotifications,
  withErrorHandling,
} from '@components';
import stripeService, { PaymentMethod } from '@libs/services/payments/stripeService';
import { theme } from '@styles/theme';
import Button from '@components/Form/Button';
import ScreenLayout from '@components/Layout/ScreenLayout';

interface PaymentMethodsScreenProps {
  navigation: any;
}

const PaymentMethodsScreen: React.FC<PaymentMethodsScreenProps> = ({ navigation }) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [actionMenuVisible, setActionMenuVisible] = useState<string | null>(null);

  const loadingState = useLoadingState('loading');
  const refreshLoadingState = useLoadingState('idle');
  const deleteLoadingState = useLoadingState('idle');
  const defaultLoadingState = useLoadingState('idle');
  const { showError, showSuccess } = useNotifications();

  // Load payment methods
  const loadPaymentMethods = withErrorHandling(
    async () => {
      loadingState.startLoading();

      try {
        const methods = await stripeService.getPaymentMethods();
        setPaymentMethods(methods);
        loadingState.setSuccess();

        setTimeout(() => loadingState.stopLoading(), 500);
      } catch (error) {
        loadingState.setError();
        throw error;
      }
    },
    {
      customMessage: 'Error al cargar métodos de pago',
      showAlert: false,
    }
  );

  // Refresh payment methods
  const onRefresh = withErrorHandling(
    async () => {
      refreshLoadingState.startLoading();
      await loadPaymentMethods();
      refreshLoadingState.stopLoading();
      showSuccess('Métodos de pago actualizados');
    },
    {
      showAlert: false,
    }
  );

  // Delete payment method
  const handleDeletePaymentMethod = withErrorHandling(
    async (paymentMethodId: string) => {
      deleteLoadingState.startLoading();

      try {
        await stripeService.deletePaymentMethod(paymentMethodId);

        setPaymentMethods((prev) => prev.filter((method) => method.id !== paymentMethodId));
        setShowDeleteConfirm(null);
        deleteLoadingState.setSuccess();

        showSuccess('Método de pago eliminado');
        setTimeout(() => deleteLoadingState.stopLoading(), 300);
      } catch (error) {
        deleteLoadingState.setError();
        showError('Error al eliminar método de pago');
      }
    },
    {
      showAlert: false,
    }
  );

  // Set default payment method
  const handleSetDefault = withErrorHandling(
    async (paymentMethodId: string) => {
      defaultLoadingState.startLoading();

      try {
        await stripeService.setDefaultPaymentMethod(paymentMethodId);

        // Update local state
        setPaymentMethods((prev) =>
          prev.map((method) => ({
            ...method,
            isDefault: method.id === paymentMethodId,
          }))
        );

        setActionMenuVisible(null);
        defaultLoadingState.setSuccess();
        showSuccess('Método de pago predeterminado actualizado');

        setTimeout(() => defaultLoadingState.stopLoading(), 300);
      } catch (error) {
        defaultLoadingState.setError();
        showError('Error al establecer método predeterminado');
      }
    },
    {
      showAlert: false,
    }
  );

  // Navigate to add payment method
  const handleAddPaymentMethod = () => {
    navigation.navigate('AddPaymentMethod', {
      onPaymentMethodAdded: (newMethod: PaymentMethod) => {
        setPaymentMethods((prev) => [...prev, newMethod]);
      },
    });
  };

  // Navigate to edit payment method
  const handleEditPaymentMethod = (paymentMethod: PaymentMethod) => {
    setActionMenuVisible(null);
    navigation.navigate('EditPaymentMethod', {
      onPaymentMethodUpdated: (updatedMethod: PaymentMethod) => {
        setPaymentMethods((prev) =>
          prev.map((method) => (method.id === updatedMethod.id ? updatedMethod : method))
        );
      },
      paymentMethod,
    });
  };

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const getCardBrandIcon = (brand: string) => {
    // In a real app, you would use actual card brand icons
    switch (brand?.toLowerCase()) {
      case 'visa':
        return '💳'; // Replace with actual Visa icon
      case 'mastercard':
        return '💳'; // Replace with actual Mastercard icon
      case 'amex':
        return '💳'; // Replace with actual Amex icon
      case 'discover':
        return '💳'; // Replace with actual Discover icon
      default:
        return '💳';
    }
  };

  const renderPaymentMethod = ({ item }: { item: PaymentMethod }) => (
    <PaymentMethodCard>
      <PaymentMethodContent>
        <PaymentMethodIcon>
          {item.type === 'card' ? (
            <CardIconContainer>
              <CardBrandText>{getCardBrandIcon(item.brand || '')}</CardBrandText>
            </CardIconContainer>
          ) : (
            <CreditCard color={theme.colors.primary[500]} size={24} />
          )}
        </PaymentMethodIcon>

        <PaymentMethodInfo>
          <PaymentMethodTitle>
            {item.type === 'card'
              ? `•••• •••• •••• ${item.last4}`
              : item.type.replace('_', ' ').toUpperCase()}
          </PaymentMethodTitle>

          <PaymentMethodDetails>
            {item.brand && <PaymentMethodBrand>{item.brand.toUpperCase()}</PaymentMethodBrand>}
            {item.expiryMonth && item.expiryYear && (
              <PaymentMethodExpiry>
                Exp: {item.expiryMonth.toString().padStart(2, '0')}/
                {item.expiryYear.toString().slice(-2)}
              </PaymentMethodExpiry>
            )}
          </PaymentMethodDetails>

          {item.holderName && <PaymentMethodHolder>{item.holderName}</PaymentMethodHolder>}
        </PaymentMethodInfo>
      </PaymentMethodContent>

      <PaymentMethodActions>
        {item.isDefault && (
          <DefaultBadge>
            <Badge size='small' text='Predeterminado' variant='success' />
          </DefaultBadge>
        )}

        <ActionButton
          onPress={() => setActionMenuVisible(actionMenuVisible === item.id ? null : item.id)}
        >
          <MoreVertical color={theme.colors.gray[500]} size={20} />
        </ActionButton>

        {actionMenuVisible === item.id && (
          <ActionMenu>
            {!item.isDefault && (
              <ActionMenuItem
                disabled={defaultLoadingState.isLoading}
                onPress={() => handleSetDefault(item.id)}
              >
                {defaultLoadingState.isLoading ? (
                  <LoadingState size='small' state='loading' />
                ) : (
                  <>
                    <CheckCircle color={theme.colors.success[500]} size={16} />
                    <ActionMenuText>Hacer predeterminado</ActionMenuText>
                  </>
                )}
              </ActionMenuItem>
            )}

            <ActionMenuItem onPress={() => handleEditPaymentMethod(item)}>
              <Edit3 color={theme.colors.primary[500]} size={16} />
              <ActionMenuText>Editar</ActionMenuText>
            </ActionMenuItem>

            <ActionMenuItem danger onPress={() => setShowDeleteConfirm(item.id)}>
              <Trash2 color={theme.colors.error[500]} size={16} />
              <ActionMenuText danger>Eliminar</ActionMenuText>
            </ActionMenuItem>
          </ActionMenu>
        )}
      </PaymentMethodActions>
    </PaymentMethodCard>
  );

  const renderLoadingSkeleton = () =>
    Array.from({ length: 3 }).map((_, index) => (
      <SkeletonPaymentCard key={`skeleton-${index}`}>
        <SkeletonIcon>
          <SkeletonBox borderRadius={20} height={40} width={40} />
        </SkeletonIcon>
        <SkeletonContent>
          <SkeletonText height={16} width='70%' />
          <SkeletonText height={14} width='50%' />
          <SkeletonText height={12} width='40%' />
        </SkeletonContent>
      </SkeletonPaymentCard>
    ));

  if (loadingState.isLoading && paymentMethods.length === 0) {
    return (
      <ScreenLayout>
        <Container>
          <Header>
            <BackButton onPress={() => navigation.goBack()}>
              <ArrowLeft color={theme.colors.primary[500]} size={24} />
            </BackButton>
            <HeaderTitle>Métodos de Pago</HeaderTitle>
            <HeaderPlaceholder />
          </Header>

          <LoadingContainer>{renderLoadingSkeleton()}</LoadingContainer>
        </Container>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <Container>
        {/* Header */}
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <ArrowLeft color={theme.colors.primary[500]} size={24} />
          </BackButton>
          <HeaderTitle>Métodos de Pago</HeaderTitle>
          <HeaderPlaceholder />
        </Header>

        {/* Security Notice */}
        <SecurityNotice>
          <SecurityIcon>
            <Shield color={theme.colors.primary[500]} size={20} />
          </SecurityIcon>
          <SecurityText>
            Tus datos de pago están protegidos con encriptación de nivel bancario
          </SecurityText>
        </SecurityNotice>

        {/* Add Payment Method Button */}
        <AddButtonContainer>
          <Button
            fullWidth
            icon={<Plus color={theme.colors.primary[500]} size={20} />}
            size='lg'
            variant='outline'
            onPress={handleAddPaymentMethod}
          >
            Agregar Método de Pago
          </Button>
        </AddButtonContainer>

        {/* Payment Methods List */}
        {paymentMethods.length > 0 ? (
          <PaymentMethodsList>
            <FlatList
              contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
              data={paymentMethods}
              ItemSeparatorComponent={() => <ItemSeparator />}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl refreshing={refreshLoadingState.isLoading} onRefresh={onRefresh} />
              }
              renderItem={renderPaymentMethod}
              showsVerticalScrollIndicator={false}
            />
          </PaymentMethodsList>
        ) : (
          <EmptyContainer>
            <CreditCard color={theme.colors.gray[300]} size={64} />
            <EmptyTitle>No hay métodos de pago</EmptyTitle>
            <EmptyMessage>
              Agrega un método de pago para realizar reservas más fácilmente
            </EmptyMessage>
          </EmptyContainer>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <ModalOverlay onPress={() => setShowDeleteConfirm(null)}>
            <ModalContainer>
              <FeedbackBox
                description='Esta acción no se puede deshacer. El método de pago será eliminado permanentemente.'
                loading={deleteLoadingState.isLoading}
                negativeText='Cancelar'
                positiveText='Eliminar'
                question='¿Eliminar método de pago?'
                variant='destructive'
                onNegative={() => setShowDeleteConfirm(null)}
                onPositive={() => handleDeletePaymentMethod(showDeleteConfirm)}
              />
            </ModalContainer>
          </ModalOverlay>
        )}
      </Container>
    </ScreenLayout>
  );
};

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.gray[25]};
`;

const LoadingContainer = styled.View`
  padding: ${theme.spacing.lg}px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.default};
`;

const BackButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: ${theme.borderRadius.lg}px;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  flex: 1;
  text-align: center;
`;

const HeaderPlaceholder = styled.View`
  width: 44px;
`;

const SecurityNotice = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  background-color: ${theme.colors.primary[25]};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.primary[100]};
`;

const SecurityIcon = styled.View`
  margin-right: ${theme.spacing.sm}px;
`;

const SecurityText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.primary[700]};
  flex: 1;
`;

const AddButtonContainer = styled.View`
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.default};
`;

const PaymentMethodsList = styled.View`
  flex: 1;
`;

const PaymentMethodCard = styled.View`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.lg}px;
  margin: ${theme.spacing.sm}px ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  ${theme.shadows.md}
  position: relative;
`;

const PaymentMethodContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PaymentMethodIcon = styled.View`
  margin-right: ${theme.spacing.md}px;
`;

const CardIconContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${theme.colors.primary[100]};
  align-items: center;
  justify-content: center;
`;

const CardBrandText = styled.Text`
  font-size: 20px;
`;

const PaymentMethodInfo = styled.View`
  flex: 1;
`;

const PaymentMethodTitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const PaymentMethodDetails = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.xs}px;
`;

const PaymentMethodBrand = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
  font-weight: 500;
`;

const PaymentMethodExpiry = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
`;

const PaymentMethodHolder = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.tertiary};
`;

const PaymentMethodActions = styled.View`
  position: absolute;
  top: ${theme.spacing.lg}px;
  right: ${theme.spacing.lg}px;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.sm}px;
`;

const DefaultBadge = styled.View``;

const ActionButton = styled.TouchableOpacity`
  padding: ${theme.spacing.xs}px;
`;

const ActionMenu = styled.View`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md}px;
  ${theme.shadows.lg}
  min-width: 180px;
  z-index: 1000;
`;

const ActionMenuItem = styled.TouchableOpacity<{
  danger?: boolean;
  disabled?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.light};

  ${({ disabled }) => disabled && 'opacity: 0.5;'}

  &:last-child {
    border-bottom-width: 0;
  }
`;

const ActionMenuText = styled.Text<{ danger?: boolean }>`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${({ danger }) => (danger ? theme.colors.error[600] : theme.colors.text.primary)};
  margin-left: ${theme.spacing.sm}px;
`;

const ItemSeparator = styled.View`
  height: ${theme.spacing.xs}px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl}px;
`;

const EmptyTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-top: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.sm}px;
  text-align: center;
`;

const EmptyMessage = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  line-height: 22px;
`;

// Skeleton Components
const SkeletonPaymentCard = styled.View`
  flex-direction: row;
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.lg}px;
  margin: ${theme.spacing.sm}px ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
`;

const SkeletonIcon = styled.View`
  margin-right: ${theme.spacing.md}px;
`;

const SkeletonContent = styled.View`
  flex: 1;
  gap: ${theme.spacing.sm}px;
`;

const ModalOverlay = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(0 0 0 / 0.5);
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.View`
  margin: ${theme.spacing.lg}px;
  max-width: 400px;
  width: 100%;
`;

export default PaymentMethodsScreen;
