import styled from 'styled-components/native';

import { theme } from '../../../../../libs/presentation/styles/theme';

export const Container = styled.View`
  background-color: ${theme.colors.white};
  flex: 1;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const LogoSection = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  min-height: 300px;
`;

export const LogoContainer = styled.View`
  align-items: center;
`;

export const AppLogo = styled.Image`
  height: 200px;
  width: 200px;
`;

export const TaglineText = styled.Text`
  color: ${theme.colors.gray[600]};
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 0.3px;
  text-align: center;
`;

export const FormSection = styled.View`
  background-color: ${theme.colors.white};
  flex: 1.2;
  justify-content: flex-start;
  min-height: 420px;
  padding-bottom: 40px;
  padding-horizontal: 32px;
  padding-top: 32px;
`;

export const InputContainer = styled.View`
  gap: 18px;
  margin-bottom: 32px;
`;

export const InputWrapper = styled.View`
  align-items: center;
  background-color: ${theme.colors.white};
  border: 1.5px solid ${theme.colors.gray[200]};
  border-radius: 14px;
  elevation: 2;
  flex-direction: row;
  height: 56px;
  padding-horizontal: 18px;
  shadow-color: ${theme.colors.gray[300]};
  shadow-offset: 0 2px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
`;

export const InputIcon = styled.View`
  margin-right: 15px;
`;

export const StyledInput = styled.TextInput`
  color: ${theme.colors.text.primary};
  flex: 1;
  font-size: 16px;
  font-weight: 500;
`;

export const PasswordToggle = styled.TouchableOpacity`
  margin-left: 10px;
  padding: 5px;
`;

export const LoginButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  align-items: center;
  background-color: ${(props) =>
    props.disabled ? theme.colors.gray[300] : theme.colors.primary[500]};
  border-radius: 14px;
  elevation: 4;
  height: 56px;
  justify-content: center;
  margin-top: 8px;
  shadow-color: ${theme.colors.primary[200]};
  shadow-offset: 0 3px;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
`;

export const LoginButtonText = styled.Text<{ disabled?: boolean }>`
  color: ${theme.colors.white};
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

export const ErrorText = styled.Text`
  background-color: ${theme.colors.error[50]};
  border: 1px solid ${theme.colors.error[200]};
  border-radius: 8px;
  color: ${theme.colors.error[500]};
  font-size: 14px;
  padding: 10px;
  text-align: center;
`;

export const DemoCredentials = styled.View`
  background-color: ${theme.colors.gray[25]};
  border: 1px solid ${theme.colors.gray[100]};
  border-radius: 14px;
  margin-top: 16px;
  padding: 24px;
`;

export const DemoTitle = styled.Text`
  color: ${theme.colors.gray[700]};
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.2px;
  margin-bottom: 16px;
  text-align: center;
`;

export const DemoItem = styled.TouchableOpacity`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[150]};
  border-radius: 12px;
  elevation: 1;
  margin-bottom: 8px;
  padding: 14px 18px;
  shadow-color: ${theme.colors.gray[300]};
  shadow-offset: 0 1px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
`;

export const DemoLabel = styled.Text`
  color: ${theme.colors.secondary[500]};
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 3px;
`;

export const DemoValue = styled.Text`
  color: ${theme.colors.gray[600]};
  font-size: 12px;
  font-weight: 500;
`;
