import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #f8f9fa;
  flex: 1;
  padding: 16px;
`;

export const ProfileCard = styled.View`
  background-color: #fff;
  border-radius: 16px;
  elevation: 4;
  margin-bottom: 20px;
  padding: 24px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
`;

export const ProfileHeader = styled.View`
  align-items: center;
`;

export const ProfileAvatar = styled.View`
  align-items: center;
  background-color: #ff8a00;
  border-radius: 40px;
  height: 80px;
  justify-content: center;
  margin-bottom: 16px;
  width: 80px;
`;

export const ProfileAvatarText = styled.Text`
  color: #fff;
  font-size: 32px;
  font-weight: bold;
`;

export const ProfileName = styled.Text`
  color: #212529;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
  text-align: center;
`;

export const ProfileEmail = styled.Text`
  color: #6c757d;
  font-size: 16px;
  text-align: center;
`;

export const ProfileSection = styled.View`
  background-color: #fff;
  border-radius: 12px;
  elevation: 2;
  margin-bottom: 16px;
  padding: 20px;
  shadow-color: #000;
  shadow-offset: 0 1px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
`;

export const SectionTitle = styled.Text`
  color: #212529;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const InfoItem = styled.View`
  align-items: center;
  border-bottom-color: #f8f9fa;
  border-bottom-width: 1px;
  flex-direction: row;
  padding: 12px 0;
`;

export const InfoIcon = styled.View`
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 20px;
  height: 40px;
  justify-content: center;
  margin-right: 16px;
  width: 40px;
`;

export const InfoLabel = styled.Text`
  color: #6c757d;
  flex: 1;
  font-size: 14px;
  font-weight: 500;
`;

export const InfoValue = styled.Text`
  color: #212529;
  flex: 2;
  font-size: 14px;
  font-weight: 400;
  text-align: right;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  background-color: #f8f9fa;
  flex: 1;
  justify-content: center;
`;

export const LoadingText = styled.Text`
  color: #6c757d;
  font-size: 16px;
  margin-top: 16px;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  background-color: #f8f9fa;
  flex: 1;
  justify-content: center;
  padding: 32px;
`;

export const EmptyText = styled.Text`
  color: #6c757d;
  font-size: 16px;
  margin-bottom: 8px;
  text-align: center;
`;
