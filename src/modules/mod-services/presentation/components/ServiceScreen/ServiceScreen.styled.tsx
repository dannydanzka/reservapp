import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

export const HeaderContainer = styled.View`
  background-color: #ffffff;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #e9ecef;
`;

export const SearchBar = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 16px;
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FilterButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #fff5f0;
  border: 1px solid #ff8a00;
  border-radius: 8px;
  padding: 8px 12px;
`;

export const FilterButtonText = styled.Text`
  color: #ff8a00;
  font-weight: 600;
  margin-left: 6px;
`;

export const ViewTypeContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ToggleContainer = styled.View`
  flex-direction: row;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2px;
`;

export const ToggleButton = styled.TouchableOpacity<{ active: boolean }>`
  background-color: ${(props) => (props.active ? '#FF8A00' : 'transparent')};
  border-radius: 6px;
  padding: 8px;
  margin: 2px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

export const ServiceCard = styled.TouchableOpacity`
  background-color: #ffffff;
  border-radius: 12px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const ServiceImage = styled.Image`
  width: 100%;
  height: 180px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export const ServiceInfo = styled.View`
  padding: 16px;
`;

export const ServiceHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const ServiceTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #212529;
  flex: 1;
  margin-right: 8px;
`;

export const ServiceRating = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff5f0;
  padding: 4px 8px;
  border-radius: 6px;
`;

export const ServiceDescription = styled.Text`
  font-size: 14px;
  color: #6c757d;
  line-height: 20px;
  margin-bottom: 12px;
`;

export const ServiceFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const ServiceLocation = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-right: 8px;
`;

export const ServiceCategory = styled.Text`
  background-color: #e9ecef;
  color: #495057;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
`;

export const ServicePrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #ff8a00;
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

export const NoResultsContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

export const NoResultsText = styled.Text`
  color: #6c757d;
  font-size: 16px;
  text-align: center;
`;
