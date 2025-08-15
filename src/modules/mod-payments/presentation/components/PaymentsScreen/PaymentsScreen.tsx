import React from 'react';

import { PaymentScreen } from './PaymentScreen';
import { ReceiptScreen } from './ReceiptScreen';
import { setActiveTab } from '../../../infrastructure/state/paymentsSlice';
import { useAppDispatch, useAppSelector } from '../../../../../libs/infrastructure/store/hooks';

import { Container, Tab, TabContent, TabsContainer, TabText } from './PaymentsScreen.styled';

export const PaymentsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeTab } = useAppSelector((state) => state.payments);

  const handleTabPress = (tab: 'payments' | 'receipts') => {
    dispatch(setActiveTab(tab));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'payments':
        return <PaymentScreen />;
      case 'receipts':
        return <ReceiptScreen />;
      default:
        return <PaymentScreen />;
    }
  };

  return (
    <Container>
      <TabsContainer>
        <Tab active={activeTab === 'payments'} onPress={() => handleTabPress('payments')}>
          <TabText active={activeTab === 'payments'}>Pagos</TabText>
        </Tab>
        <Tab active={activeTab === 'receipts'} onPress={() => handleTabPress('receipts')}>
          <TabText active={activeTab === 'receipts'}>Facturas</TabText>
        </Tab>
      </TabsContainer>

      <TabContent>{renderTabContent()}</TabContent>
    </Container>
  );
};
