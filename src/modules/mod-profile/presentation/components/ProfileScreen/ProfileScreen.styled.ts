import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
  padding: 16px;
`;

export const ProfileCard = styled.View`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

export const ProfileHeader = styled.View`
  align-items: center;
`;

export const ProfileAvatar = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #ff8a00;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

export const ProfileAvatarText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
`;

export const ProfileName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #212529;
  margin-bottom: 4px;
  text-align: center;
`;

export const ProfileEmail = styled.Text`
  font-size: 16px;
  color: #6c757d;
  text-align: center;
`;

export const ProfileSection = styled.View`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 16px;
`;

export const InfoItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f8f9fa;
`;

export const InfoIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f8f9fa;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const InfoLabel = styled.Text`
  font-size: 14px;
  color: #6c757d;
  flex: 1;
  font-weight: 500;
`;

export const InfoValue = styled.Text`
  font-size: 14px;
  color: #212529;
  flex: 2;
  text-align: right;
  font-weight: 400;
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

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px;
  background-color: #f8f9fa;
`;

export const EmptyText = styled.Text`
  color: #6c757d;
  font-size: 16px;
  text-align: center;
  margin-bottom: 8px;
`;
