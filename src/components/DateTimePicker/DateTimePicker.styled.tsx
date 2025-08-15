import styled from 'styled-components/native';

export const PickerContainer = styled.View`
  width: 100%;
`;

export const PickerButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  min-height: 56px;
`;

export const PickerIcon = styled.View`
  margin-right: 12px;
`;

export const PickerText = styled.Text<{ hasValue: boolean }>`
  flex: 1;
  font-size: 16px;
  color: ${(props: { hasValue: boolean }) => (props.hasValue ? '#212529' : '#6c757d')};
`;
