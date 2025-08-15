import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;

export const HeaderContainer = styled.View`
  height: 300px;
  position: relative;
`;

export const BackButton = styled.TouchableOpacity`
  background-color: rgb(255 255 255 / 0.9);
  border-radius: 20px;
  left: 16px;
  padding: 8px;
  position: absolute;
  top: 50px;
  z-index: 10;
`;

export const HeaderImage = styled.Image`
  height: 100%;
  width: 100%;
`;

export const PlaceholderContainer = styled.View`
  align-items: center;
  background-color: #f8f9fa;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export const PlaceholderText = styled.Text`
  color: #6c757d;
  font-size: 16px;
  margin-top: 8px;
`;

export const InfoContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

export const ServiceHeader = styled.View`
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const ServiceTitle = styled.Text`
  color: #212529;
  flex: 1;
  font-size: 24px;
  font-weight: bold;
  margin-right: 12px;
`;

export const ServiceRating = styled.View`
  align-items: center;
  background-color: #fff5f0;
  border-radius: 8px;
  flex-direction: row;
  padding: 6px 12px;
`;

export const ServiceLocation = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: 12px;
`;

export const ServiceCategory = styled.Text<{ categoryColor?: string }>`
  align-self: flex-start;
  background-color: ${(props) => props.categoryColor || '#e9ecef'};
  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  padding: 6px 12px;
`;

export const ServiceDescription = styled.Text`
  color: #6c757d;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 24px;
`;

export const DetailsCard = styled.View`
  background-color: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 16px;
`;

export const DetailsItem = styled.View`
  align-items: center;
  border-bottom-color: #e9ecef;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
`;

export const DetailsItemLabel = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const DetailsItemValue = styled.Text`
  color: #212529;
  font-size: 16px;
  font-weight: 500;
`;

export const ServiceFeatures = styled.View`
  flex-flow: row wrap;
  margin-bottom: 20px;
`;

export const ServiceFeature = styled.Text`
  background-color: #fff5f0;
  border-radius: 6px;
  color: #ff8a00;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  margin-right: 8px;
  padding: 6px 12px;
`;

export const PriceText = styled.Text`
  color: #ff8a00;
  font-size: 20px;
  font-weight: bold;
`;

export const FooterContainer = styled.View`
  background-color: #fff;
  border-top-color: #e9ecef;
  border-top-width: 1px;
  padding: 20px;
`;

export const BookButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  align-items: center;
  background-color: ${(props) => (props.disabled ? '#6c757d' : '#ff8a00')};
  border-radius: 12px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  padding: 16px;
`;

export const BookButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  background-color: #fff;
  flex: 1;
  justify-content: center;
`;

export const LoadingText = styled.Text`
  color: #6c757d;
  font-size: 16px;
  margin-top: 16px;
`;
