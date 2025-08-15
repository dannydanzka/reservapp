import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #e9ecef;
`;

export const BackButton = styled.TouchableOpacity`
  margin-right: 16px;
  padding: 8px;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #212529;
`;

export const StepsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 16px;
  background-color: #f8f9fa;
`;

export const StepContainer = styled.View<{ active: boolean }>`
  align-items: center;
  flex: 1;
`;

export const StepIndicator = styled.View<{ active: boolean; completed: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.completed ? '#4CAF50' : props.active ? '#FF8A00' : '#e9ecef'};
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const StepIcon = styled.View`
  /* Icon component will be rendered here */
`;

export const StepTitle = styled.Text<{ active: boolean }>`
  font-size: 12px;
  color: ${(props) => (props.active ? '#FF8A00' : '#6c757d')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  text-align: center;
`;

export const StepText = styled.Text`
  font-size: 16px;
  color: #6c757d;
  margin: 16px 20px 8px 20px;
`;

export const FormContainer = styled.View`
  padding: 0 20px;
`;

export const FormField = styled.View`
  margin-bottom: 20px;
`;

export const FormLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 8px;
`;

export const FormInput = styled.TextInput`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  color: #212529;
  background-color: #ffffff;
`;

export const ServiceInfo = styled.View`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ServiceName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #212529;
  flex: 1;
`;

export const ServicePrice = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #ff8a00;
`;

export const PriceBreakdown = styled.View`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
`;

export const PriceItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

export const PriceTotal = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-top-width: 1px;
  border-top-color: #e9ecef;
  margin-top: 8px;
`;

export const ContinueButton = styled.TouchableOpacity`
  background-color: #ff8a00;
  margin: 20px;
  padding: 16px;
  border-radius: 12px;
  align-items: center;
`;

export const ContinueButtonText = styled.Text`
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
