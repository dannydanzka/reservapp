import styled from 'styled-components/native';

import { theme } from '../../styles/theme';

export const FullScreenContainer = styled.View`
  align-items: center;
  background-color: ${theme.colors.white};
  flex: 1;
  justify-content: center;
`;

export const InlineContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md}px;
`;

export const Message = styled.Text`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.typography.fontSize.md}px;
  margin-top: ${theme.spacing.md}px;
  text-align: center;
`;
