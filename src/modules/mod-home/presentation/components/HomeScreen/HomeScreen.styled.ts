import styled from 'styled-components/native';

import { theme } from '../../../../../libs/presentation/styles/theme';

export const Container = styled.ScrollView`
  background-color: ${theme.colors.primary[25]};
  flex: 1;
`;

export const ContentContainer = styled.View`
  padding: 20px;
  padding-bottom: 40px;
`;

export const WelcomeSection = styled.View`
  margin-bottom: 24px;
`;

export const WelcomeText = styled.Text`
  color: ${theme.colors.primary[600]};
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const SubtitleText = styled.Text`
  color: ${theme.colors.secondary[600]};
  font-size: 16px;
  line-height: 22px;
`;

export const StatsSection = styled.View`
  margin-bottom: 28px;
`;

export const SectionTitle = styled.Text`
  color: ${theme.colors.primary[600]};
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const StatsGrid = styled.View`
  flex-direction: row;
  gap: 12px;
  justify-content: space-between;
`;

export const StatCard = styled.View`
  align-items: center;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.secondary[100]};
  border-radius: 12px;
  elevation: 2;
  flex: 1;
  padding: 16px;
  shadow-color: ${theme.colors.secondary[200]};
  shadow-offset: 0 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const StatNumber = styled.Text`
  color: ${theme.colors.secondary[600]};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const StatLabel = styled.Text`
  color: ${theme.colors.text.secondary};
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  text-align: center;
`;

export const QuickActionsSection = styled.View`
  margin-bottom: 28px;
`;

export const ActionsGrid = styled.View`
  flex-flow: row wrap;
  gap: 12px;
`;

export const ActionCard = styled.TouchableOpacity`
  align-items: center;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.border.light};
  border-radius: 12px;
  elevation: 2;
  flex: 1;
  min-width: 45%;
  padding: 20px 16px;
  shadow-color: ${theme.colors.gray[300]};
  shadow-offset: 0 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const ActionIconContainer = styled.View`
  align-items: center;
  background-color: ${theme.colors.secondary[500]};
  border-radius: 24px;
  height: 48px;
  justify-content: center;
  margin-bottom: 12px;
  width: 48px;
`;

export const ActionTitle = styled.Text`
  color: ${theme.colors.primary[600]};
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  text-align: center;
`;

export const ActionSubtitle = styled.Text`
  color: ${theme.colors.text.secondary};
  font-size: 12px;
  line-height: 16px;
  text-align: center;
`;

export const RecommendationsSection = styled.View`
  margin-bottom: 20px;
`;

export const RecommendationCard = styled.TouchableOpacity`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.border.light};
  border-radius: 12px;
  elevation: 2;
  margin-bottom: 12px;
  overflow: hidden;
  shadow-color: ${theme.colors.gray[300]};
  shadow-offset: 0 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const RecommendationImage = styled.Image`
  background-color: ${theme.colors.gray[100]};
  height: 120px;
  width: 100%;
`;

export const RecommendationContent = styled.View`
  padding: 16px;
`;

export const RecommendationHeader = styled.View`
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const RecommendationTitle = styled.Text`
  color: ${theme.colors.primary[600]};
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
`;

export const RecommendationBadge = styled.View`
  background-color: ${theme.colors.secondary[500]};
  border-radius: 12px;
  padding: 4px 8px;
`;

export const RecommendationBadgeText = styled.Text`
  color: ${theme.colors.white};
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const RecommendationDescription = styled.Text`
  color: ${theme.colors.text.secondary};
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
`;

export const RecommendationFooter = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const RecommendationRating = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const RatingText = styled.Text`
  color: ${theme.colors.primary[600]};
  font-size: 14px;
  font-weight: 600;
  margin-left: 4px;
`;

export const RecommendationPrice = styled.Text`
  color: ${theme.colors.secondary[600]};
  font-size: 14px;
  font-weight: 600;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  background-color: ${theme.colors.white};
  flex: 1;
  justify-content: center;
  min-height: 200px;
`;

export const LoadingText = styled.Text`
  color: ${theme.colors.text.secondary};
  font-size: 16px;
  margin-top: 12px;
`;

export const ErrorContainer = styled.View`
  background-color: ${theme.colors.error[50]};
  border: 1px solid ${theme.colors.error[200]};
  border-radius: 8px;
  margin: 16px 0;
  padding: 16px;
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.error[600]};
  font-size: 14px;
  text-align: center;
`;

export const RetryButton = styled.TouchableOpacity`
  align-self: center;
  background-color: ${theme.colors.secondary[500]};
  border-radius: 8px;
  margin-top: 12px;
  padding: 12px 24px;
`;

export const RetryButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: 14px;
  font-weight: 600;
`;
