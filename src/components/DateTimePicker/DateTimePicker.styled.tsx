import styled from 'styled-components/native';

export const PickerContainer = styled.View`
  width: 100%;
`;

export const PickerButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  flex-direction: row;
  min-height: 56px;
  padding: 16px;
`;

export const PickerIcon = styled.View`
  margin-right: 12px;
`;

export const PickerText = styled.Text<{ hasValue: boolean }>`
  color: ${(props: { hasValue: boolean }) => (props.hasValue ? '#212529' : '#6c757d')};
  flex: 1;
  font-size: 16px;
`;
