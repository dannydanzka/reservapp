import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f8fafc;
`;

export const Header = styled.View`
  padding: 20px;
  padding-top: 60px;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #e5e7eb;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #1f2937;
  text-align: center;
`;

export const BalanceCard = styled.View`
  background-color: #6b46c1;
  margin: 20px;
  padding: 30px;
  border-radius: 16px;
  align-items: center;
  shadow-color: #6b46c1;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 8;
`;

export const BalanceLabel = styled.Text`
  color: #e0e7ff;
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: 500;
`;

export const BalanceAmount = styled.Text`
  color: #ffffff;
  font-size: 36px;
  font-weight: bold;
`;

export const Section = styled.View`
  margin: 0 20px 20px 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 16px;
`;

export const PaymentMethodCard = styled.View`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const PaymentMethodInfo = styled.View`
  margin-left: 12px;
  flex: 1;
`;

export const PaymentMethodNumber = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
`;

export const PaymentMethodExpiry = styled.Text`
  font-size: 14px;
  color: #6b7280;
`;

export const AddPaymentButton = styled.TouchableOpacity`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  border: 2px dashed #d1d5db;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

export const AddPaymentText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #6b46c1;
  margin-left: 8px;
`;

export const TransactionItem = styled.View`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 2px;
  elevation: 2;
`;

export const TransactionIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f3f4f6;
  align-items: center;
  justify-content: center;
`;

export const TransactionInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const TransactionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
`;

export const TransactionDate = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TransactionAmount = styled.Text<{ color: string }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.color};
`;
