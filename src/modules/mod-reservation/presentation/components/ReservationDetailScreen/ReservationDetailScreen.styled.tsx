import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const HeaderContainer = styled.View`
  position: relative;
  height: 300px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 16px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 8px;
`;

export const HeaderImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const HeaderImagePlaceholder = styled.View`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  justify-content: center;
  align-items: center;
`;

export const InfoContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

export const ServiceHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const ServiceTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #212529;
  flex: 1;
  margin-right: 12px;
`;

export const ServiceRating = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff5f0;
  padding: 6px 12px;
  border-radius: 8px;
`;

export const ServiceLocation = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const ServiceCategory = styled.Text`
  background-color: #e9ecef;
  color: #495057;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 6px;
  align-self: flex-start;
  margin-bottom: 16px;
`;

export const ServiceDescription = styled.Text`
  font-size: 16px;
  color: #6c757d;
  line-height: 24px;
  margin-bottom: 24px;
`;

export const DetailsCard = styled.View`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
`;

export const DetailsItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom-width: 1px;
  border-bottom-color: #e9ecef;
`;

export const DetailsItemLabel = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DetailsItemValue = styled.Text`
  font-size: 16px;
  color: #212529;
  font-weight: 500;
`;

export const ServiceFeatures = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const ServiceFeature = styled.Text`
  background-color: #fff5f0;
  color: #ff8a00;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 6px;
  margin-right: 8px;
  margin-bottom: 8px;
`;

export const PriceText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #ff8a00;
`;

export const FooterContainer = styled.View`
  padding: 20px;
  border-top-width: 1px;
  border-top-color: #e9ecef;
  background-color: #ffffff;
`;

export const BookButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${(props: { disabled?: boolean }) => (props.disabled ? '#6c757d' : '#ff8a00')};
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  opacity: ${(props: { disabled?: boolean }) => (props.disabled ? 0.6 : 1)};
`;

export const BookButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

export const LoadingText = styled.Text`
  margin-top: 16px;
  color: #6c757d;
  font-size: 16px;
`;
