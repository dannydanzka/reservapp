import styled from 'styled-components/native';

import { theme } from '../../../../../libs/presentation/styles/theme';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.primary[25]};
`;

export const ContentContainer = styled.View`
  padding: 20px;
  padding-bottom: 40px;
`;

export const WelcomeSection = styled.View`
  margin-bottom: 24px;
`;

export const WelcomeText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${theme.colors.primary[600]};
  margin-bottom: 4px;
`;

export const SubtitleText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.secondary[600]};
  line-height: 22px;
`;

export const StatsSection = styled.View`
  margin-bottom: 28px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.primary[600]};
  margin-bottom: 16px;
`;

export const StatsGrid = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
`;

export const StatCard = styled.View`
  flex: 1;
  background-color: ${theme.colors.white};
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  border: 1px solid ${theme.colors.secondary[100]};
  shadow-color: ${theme.colors.secondary[200]};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

export const StatNumber = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.secondary[600]};
  margin-bottom: 4px;
`;

export const StatLabel = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${theme.colors.text.secondary};
  text-align: center;
  line-height: 16px;
`;

export const QuickActionsSection = styled.View`
  margin-bottom: 28px;
`;

export const ActionsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

export const ActionCard = styled.TouchableOpacity`
  flex: 1;
  min-width: 45%;
  background-color: ${theme.colors.white};
  border-radius: 12px;
  padding: 20px 16px;
  align-items: center;
  border: 1px solid ${theme.colors.border.light};
  shadow-color: ${theme.colors.gray[300]};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

export const ActionIconContainer = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${theme.colors.secondary[500]};
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`;

export const ActionTitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.primary[600]};
  text-align: center;
  margin-bottom: 4px;
`;

export const ActionSubtitle = styled.Text`
  font-size: 12px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  line-height: 16px;
`;

export const RecommendationsSection = styled.View`
  margin-bottom: 20px;
`;

export const RecommendationCard = styled.TouchableOpacity`
  background-color: ${theme.colors.white};
  border-radius: 12px;
  margin-bottom: 12px;
  border: 1px solid ${theme.colors.border.light};
  shadow-color: ${theme.colors.gray[300]};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
  overflow: hidden;
`;

export const RecommendationImage = styled.Image`
  width: 100%;
  height: 120px;
  background-color: ${theme.colors.gray[100]};
`;

export const RecommendationContent = styled.View`
  padding: 16px;
`;

export const RecommendationHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const RecommendationTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.primary[600]};
  flex: 1;
  margin-right: 8px;
`;

export const RecommendationBadge = styled.View`
  background-color: ${theme.colors.secondary[500]};
  border-radius: 12px;
  padding: 4px 8px;
`;

export const RecommendationBadgeText = styled.Text`
  font-size: 10px;
  font-weight: 600;
  color: ${theme.colors.white};
  text-transform: uppercase;
`;

export const RecommendationDescription = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  line-height: 20px;
  margin-bottom: 8px;
`;

export const RecommendationFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RecommendationRating = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RatingText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.primary[600]};
  margin-left: 4px;
`;

export const RecommendationPrice = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.secondary[600]};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.white};
  min-height: 200px;
`;

export const LoadingText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  margin-top: 12px;
`;

export const ErrorContainer = styled.View`
  background-color: ${theme.colors.error[50]};
  border: 1px solid ${theme.colors.error[200]};
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.error[600]};
  font-size: 14px;
  text-align: center;
`;

export const RetryButton = styled.TouchableOpacity`
  background-color: ${theme.colors.secondary[500]};
  border-radius: 8px;
  padding: 12px 24px;
  margin-top: 12px;
  align-self: center;
`;

export const RetryButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: 14px;
  font-weight: 600;
`;
