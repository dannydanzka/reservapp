import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
  padding: 16px;
`;

export const PageTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #212529;
  margin-bottom: 24px;
  text-align: center;
`;

export const SectionCard = styled.View`
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
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 12px;
`;

export const InfoText = styled.Text`
  font-size: 16px;
  color: #6c757d;
  line-height: 24px;
  text-align: center;
`;

export const FeatureItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f8f9fa;
`;

export const FeatureIcon = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: #fff5f0;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const FeatureTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 4px;
  flex: 1;
`;

export const FeatureDescription = styled.Text`
  font-size: 14px;
  color: #6c757d;
  line-height: 20px;
  flex: 1;
`;
