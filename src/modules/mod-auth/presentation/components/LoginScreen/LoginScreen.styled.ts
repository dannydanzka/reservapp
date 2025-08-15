import styled from 'styled-components/native';

import { theme } from '../../../../../libs/presentation/styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.white};
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const LogoSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

export const LogoContainer = styled.View`
  align-items: center;
`;

export const AppLogo = styled.Image`
  width: 200px;
  height: 200px;
`;

export const TaglineText = styled.Text`
  font-size: 17px;
  color: ${theme.colors.gray[600]};
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.3px;
`;

export const FormSection = styled.View`
  flex: 1.2;
  justify-content: flex-start;
  padding-horizontal: 32px;
  padding-top: 32px;
  padding-bottom: 40px;
  min-height: 420px;
  background-color: ${theme.colors.white};
`;

export const InputContainer = styled.View`
  gap: 18px;
  margin-bottom: 32px;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.white};
  border-radius: 14px;
  padding-horizontal: 18px;
  height: 56px;
  border: 1.5px solid ${theme.colors.gray[200]};
  shadow-color: ${theme.colors.gray[300]};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  elevation: 2;
`;

export const InputIcon = styled.View`
  margin-right: 15px;
`;

export const StyledInput = styled.TextInput`
  flex: 1;
  color: ${theme.colors.text.primary};
  font-size: 16px;
  font-weight: 500;
`;

export const PasswordToggle = styled.TouchableOpacity`
  padding: 5px;
  margin-left: 10px;
`;

export const LoginButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${(props) =>
    props.disabled ? theme.colors.gray[300] : theme.colors.primary[500]};
  height: 56px;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  shadow-color: ${theme.colors.primary[200]};
  shadow-offset: 0px 3px;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  elevation: 4;
`;

export const LoginButtonText = styled.Text<{ disabled?: boolean }>`
  color: ${theme.colors.white};
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.error[500]};
  font-size: 14px;
  text-align: center;
  background-color: ${theme.colors.error[50]};
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.error[200]};
`;

export const DemoCredentials = styled.View`
  background-color: ${theme.colors.gray[25]};
  border-radius: 14px;
  padding: 24px;
  border: 1px solid ${theme.colors.gray[100]};
  margin-top: 16px;
`;

export const DemoTitle = styled.Text`
  color: ${theme.colors.gray[700]};
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
  letter-spacing: 0.2px;
`;

export const DemoItem = styled.TouchableOpacity`
  background-color: ${theme.colors.white};
  padding: 14px 18px;
  border-radius: 12px;
  margin-bottom: 8px;
  border: 1px solid ${theme.colors.gray[150]};
  shadow-color: ${theme.colors.gray[300]};
  shadow-offset: 0px 1px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
  elevation: 1;
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
