import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #f8f9fa;
  flex: 1;
`;

export const HeaderContainer = styled.View`
  background-color: #fff;
  border-bottom-color: #e9ecef;
  border-bottom-width: 1px;
  padding: 20px 16px;
`;

export const HeaderTitle = styled.Text`
  color: #212529;
  font-size: 24px;
  font-weight: bold;
`;

export const ContentContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

export const ReservationCard = styled.View`
  background-color: #fff;
  border-radius: 12px;
  elevation: 3;
  margin-bottom: 16px;
  padding: 16px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const ReservationHeader = styled.View`
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const ReservationVenue = styled.Text`
  color: #212529;
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  margin-right: 12px;
`;

export const StatusBadge = styled.View<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 6px;
  padding: 4px 8px;
`;

export const ReservationStatus = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: 600;
`;

export const ReservationDetails = styled.View`
  margin-bottom: 16px;
`;

export const ReservationService = styled.Text`
  color: #6c757d;
  font-size: 16px;
  margin-bottom: 8px;
`;

export const ReservationInfo = styled.View`
  gap: 6px;
`;

export const ReservationDate = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 8px;
`;

export const ReservationDateText = styled.Text`
  color: #6c757d;
  font-size: 14px;
`;

export const ReservationFooter = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const ReservationPrice = styled.Text`
  color: #ff8a00;
  font-size: 18px;
  font-weight: bold;
`;

export const ViewButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #fff5f0;
  border: 1px solid #ff8a00;
  border-radius: 8px;
  flex-direction: row;
  gap: 6px;
  padding: 8px 12px;
`;

export const ViewButtonText = styled.Text`
  color: #ff8a00;
  font-size: 14px;
  font-weight: 600;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  background-color: #f8f9fa;
  flex: 1;
  justify-content: center;
`;

export const LoadingText = styled.Text`
  color: #6c757d;
  font-size: 16px;
  margin-top: 16px;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 32px;
`;

export const EmptyText = styled.Text`
  color: #6c757d;
  font-size: 16px;
  margin-bottom: 8px;
  text-align: center;
`;
