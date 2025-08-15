import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #f8f9fa;
  flex: 1;
`;

export const HeaderContainer = styled.View`
  background-color: #fff;
  border-bottom-color: #e9ecef;
  border-bottom-width: 1px;
  padding: 16px;
`;

export const SearchBar = styled.View`
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 12px;
  flex-direction: row;
  margin-bottom: 16px;
  padding: 12px 16px;
`;

export const FilterContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const FilterButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #fff5f0;
  border: 1px solid #ff8a00;
  border-radius: 8px;
  flex-direction: row;
  padding: 8px 12px;
`;

export const FilterButtonText = styled.Text`
  color: #ff8a00;
  font-weight: 600;
  margin-left: 6px;
`;

export const ViewTypeContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const ToggleContainer = styled.View`
  background-color: #f8f9fa;
  border-radius: 8px;
  flex-direction: row;
  padding: 2px;
`;

export const ToggleButton = styled.TouchableOpacity<{ active: boolean }>`
  background-color: ${(props) => (props.active ? '#FF8A00' : 'transparent')};
  border-radius: 6px;
  margin: 2px;
  padding: 8px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

export const ServiceCard = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 12px;
  elevation: 3;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const ServiceImage = styled.Image`
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  height: 180px;
  width: 100%;
`;

export const ServiceInfo = styled.View`
  padding: 16px;
`;

export const ServiceHeader = styled.View`
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const ServiceTitle = styled.Text`
  color: #212529;
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  margin-right: 8px;
`;

export const ServiceRating = styled.View`
  align-items: center;
  background-color: #fff5f0;
  border-radius: 6px;
  flex-direction: row;
  padding: 4px 8px;
`;

export const ServiceDescription = styled.Text`
  color: #6c757d;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 12px;
`;

export const ServiceFooter = styled.View`
  align-items: center;
  flex-flow: row wrap;
  justify-content: space-between;
`;

export const ServiceLocation = styled.View`
  align-items: center;
  flex: 1;
  flex-direction: row;
  margin-right: 8px;
`;

export const ServiceCategory = styled.Text<{ categoryColor?: string }>`
  background-color: ${(props) => props.categoryColor || '#e9ecef'};
  border-radius: 4px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
  padding: 4px 8px;
`;

export const ServicePrice = styled.Text`
  color: #ff8a00;
  font-size: 16px;
  font-weight: bold;
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

export const NoResultsContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 32px;
`;

export const NoResultsText = styled.Text`
  color: #6c757d;
  font-size: 16px;
  text-align: center;
`;
