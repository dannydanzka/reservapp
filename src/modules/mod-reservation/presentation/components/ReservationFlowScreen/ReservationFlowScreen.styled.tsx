import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;

export const HeaderContainer = styled.View`
  align-items: center;
  border-bottom-color: #e9ecef;
  border-bottom-width: 1px;
  flex-direction: row;
  padding: 20px 16px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-right: 16px;
  padding: 8px;
`;

export const HeaderTitle = styled.Text`
  color: #212529;
  font-size: 20px;
  font-weight: bold;
`;

export const StepsContainer = styled.View`
  background-color: #f8f9fa;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 16px;
`;

export const StepContainer = styled.View<{ active: boolean }>`
  align-items: center;
  flex: 1;
`;

export const StepIndicator = styled.View<{ active: boolean; completed: boolean }>`
  align-items: center;
  background-color: ${(props) =>
    props.completed ? '#4CAF50' : props.active ? '#FF8A00' : '#e9ecef'};
  border-radius: 20px;
  height: 40px;
  justify-content: center;
  margin-bottom: 8px;
  width: 40px;
`;

export const StepIcon = styled.View`
  /* Icon component will be rendered here */
`;

export const StepTitle = styled.Text<{ active: boolean }>`
  color: ${(props) => (props.active ? '#FF8A00' : '#6c757d')};
  font-size: 12px;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  text-align: center;
`;

export const StepText = styled.Text`
  color: #6c757d;
  font-size: 16px;
  margin: 16px 20px 8px;
`;

export const FormContainer = styled.View`
  padding: 0 20px;
`;

export const FormField = styled.View`
  margin-bottom: 20px;
`;

export const FormLabel = styled.Text`
  color: #212529;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const FormInput = styled.TextInput`
  background-color: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  color: #212529;
  font-size: 16px;
  padding: 12px 16px;
`;

export const ServiceInfo = styled.View`
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 12px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 16px;
`;

export const ServiceName = styled.Text`
  color: #212529;
  flex: 1;
  font-size: 18px;
  font-weight: bold;
`;

export const ServicePrice = styled.Text`
  color: #ff8a00;
  font-size: 20px;
  font-weight: bold;
`;

export const PriceBreakdown = styled.View`
  background-color: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 16px;
`;

export const PriceItem = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
`;

export const PriceTotal = styled.View`
  align-items: center;
  border-top-color: #e9ecef;
  border-top-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  padding: 12px 0;
`;

export const ContinueButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #ff8a00;
  border-radius: 12px;
  margin: 20px;
  padding: 16px;
`;

export const ContinueButtonText = styled.Text`
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
