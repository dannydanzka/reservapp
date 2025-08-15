import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

export const HeaderContainer = styled.View`
  background-color: #ffffff;
  padding: 20px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #e9ecef;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #212529;
`;

export const ContentContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

export const ReservationCard = styled.View`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const ReservationHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const ReservationVenue = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #212529;
  flex: 1;
  margin-right: 12px;
`;

export const StatusBadge = styled.View<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 6px;
  padding: 4px 8px;
`;

export const ReservationStatus = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
`;

export const ReservationDetails = styled.View`
  margin-bottom: 16px;
`;

export const ReservationService = styled.Text`
  font-size: 16px;
  color: #6c757d;
  margin-bottom: 8px;
`;

export const ReservationInfo = styled.View`
  gap: 6px;
`;

export const ReservationDate = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const ReservationDateText = styled.Text`
  font-size: 14px;
  color: #6c757d;
`;

export const ReservationFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ReservationPrice = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #ff8a00;
`;

export const ViewButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #fff5f0;
  border: 1px solid #ff8a00;
  border-radius: 8px;
  padding: 8px 12px;
  gap: 6px;
`;

export const ViewButtonText = styled.Text`
  color: #ff8a00;
  font-weight: 600;
  font-size: 14px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
`;

export const LoadingText = styled.Text`
  margin-top: 16px;
  color: #6c757d;
  font-size: 16px;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

export const EmptyText = styled.Text`
  color: #6c757d;
  font-size: 16px;
  text-align: center;
  margin-bottom: 8px;
`;
