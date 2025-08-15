import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #f8f9fa;
  flex: 1;
`;

export const TabsContainer = styled.View`
  background-color: white;
  border-bottom-color: #e9ecef;
  border-bottom-width: 1px;
  elevation: 2;
  flex-direction: row;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

export const Tab = styled.TouchableOpacity<{ active: boolean }>`
  align-items: center;
  background-color: ${(props) => (props.active ? '#ff8a00' : 'transparent')};
  border-radius: 20px;
  flex: 1;
  margin-horizontal: 16px;
  margin-vertical: 12px;
  padding: 12px 20px;
`;

export const TabText = styled.Text<{ active: boolean }>`
  color: ${(props) => (props.active ? 'white' : '#666')};
  font-size: 16px;
  font-weight: ${(props) => (props.active ? '600' : '500')};
`;

export const TabContent = styled.View`
  flex: 1;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

export const LoadingText = styled.Text`
  color: #666;
  font-size: 16px;
  margin-top: 10px;
`;

export const ErrorContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

export const ErrorText = styled.Text`
  color: #dc3545;
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
`;

export const RetryButton = styled.TouchableOpacity`
  background-color: #ff8a00;
  border-radius: 8px;
  padding: 12px 24px;
`;

export const RetryButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 40px 20px;
`;

export const EmptyIcon = styled.View`
  margin-bottom: 16px;
  opacity: 0.5;
`;

export const EmptyTitle = styled.Text`
  color: #333;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
`;

export const EmptyText = styled.Text`
  color: #666;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
`;

export const ListContainer = styled.View`
  flex: 1;
`;

export const List = styled.FlatList`
  flex: 1;
` as any;

export const ItemContainer = styled.View`
  background-color: white;
  border-radius: 12px;
  elevation: 2;
  margin-horizontal: 16px;
  margin-vertical: 6px;
  padding: 16px;
  shadow-color: #000;
  shadow-offset: 0 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

export const ItemHeader = styled.View`
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const ItemTitle = styled.Text`
  color: #333;
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
`;

export const ItemAmount = styled.Text`
  color: #28a745;
  font-size: 18px;
  font-weight: 700;
`;

export const ItemSubtitle = styled.Text`
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const ItemFooter = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const ItemDate = styled.Text`
  color: #999;
  font-size: 12px;
`;

export const StatusBadge = styled.View<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 12px;
  padding: 4px 8px;
`;

export const StatusText = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const SummaryContainer = styled.View`
  background-color: white;
  border-bottom-color: #e9ecef;
  border-bottom-width: 1px;
  elevation: 1;
  padding: 16px;
  shadow-color: #000;
  shadow-offset: 0 1px;
  shadow-opacity: 0.05;
  shadow-radius: 1px;
`;

export const SummaryTitle = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const SummaryRow = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const SummaryLabel = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const SummaryValue = styled.Text<{ highlight?: boolean }>`
  color: ${(props) => (props.highlight ? '#28a745' : '#333')};
  font-size: 14px;
  font-weight: ${(props) => (props.highlight ? '600' : '500')};
`;
