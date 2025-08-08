import React, { useState } from 'react';
import { Switch, Alert } from 'react-native';
import styled from 'styled-components/native';
import { 
  Settings,
  Globe,
  Type,
  Bell,
  Shield,
  Moon,
  ChevronRight,
  Check
} from 'lucide-react-native';

import { theme } from '../../libs/ui/theme/theme';
import { useI18n } from '../../hooks/useI18n';
import { useFontScaling } from '../../hooks/useFontScaling';
import ScreenLayout from '../../components/Layout/ScreenLayout';
import { useToast } from '../../components/Toast/ToastProvider';
import { useModal } from '../../components/Modal/ModalProvider';
import Button from '../../components/Form/Button';

interface DrawerSettingsScreenProps {
  navigation: any;
}

const SettingsScreen: React.FC<DrawerSettingsScreenProps> = ({ navigation }) => {
  const { t, changeLanguage, currentLanguage } = useI18n();
  const { 
    currentScale, 
    setFontScale, 
    availableScales, 
    isAccessibleScale,
    createScaledTheme 
  } = useFontScaling();
  const { show: showToast } = useToast();
  const { show: showModal, hide: hideModal } = useModal();

  // Settings state
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Get current scaled theme
  const scaledTheme = createScaledTheme(theme);

  const handleLanguageChange = async (language: string) => {
    try {
      await changeLanguage(language);
      showToast({
        type: 'success',
        message: t('settings.languageChanged', { language: t(`settings.languages.${language}`) }),
        duration: 3000,
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: t('errors.general'),
        duration: 4000,
      });
    }
  };

  const handleFontSizeChange = async (fontSize: string) => {
    try {
      await setFontScale(fontSize as any);
      showToast({
        type: 'success',
        message: t('settings.fontSizeChanged'),
        duration: 3000,
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: t('errors.general'),
        duration: 4000,
      });
    }
  };

  const showLanguageSelector = () => {
    const languageOptions = [
      { label: t('settings.languages.es'), value: 'es' },
      { label: t('settings.languages.en'), value: 'en' },
    ];

    const modalId = showModal(
      <LanguageModalContent>
        <ModalTitle>{t('settings.language')}</ModalTitle>
        <LanguageOptions>
          {languageOptions.map((option) => (
            <LanguageOption 
              key={option.value}
              $selected={option.value === currentLanguage}
              onPress={() => {
                handleLanguageChange(option.value);
                hideModal(modalId);
              }}
            >
              <LanguageOptionText $selected={option.value === currentLanguage}>
                {option.label}
              </LanguageOptionText>
              {option.value === currentLanguage && (
                <Check size={20} color={theme.colors.primary[500]} />
              )}
            </LanguageOption>
          ))}
        </LanguageOptions>
      </LanguageModalContent>,
      {
        title: t('settings.language'),
        size: 'medium',
        closable: true,
      }
    );
  };

  return (
    <ScreenLayout
      scrollable={true}
      safeArea={true}
      paddingHorizontal={theme.spacing.lg}
      backgroundColor={theme.colors.gray[50]}
    >
      <Header>
        <HeaderIcon>
          <Settings size={28} color={theme.colors.primary[600]} />
        </HeaderIcon>
        <HeaderTitle>{t('settings.title')}</HeaderTitle>
      </Header>

      {/* General Settings */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>{t('settings.general')}</SectionTitle>
        </SectionHeader>
        
        <SettingItem onPress={showLanguageSelector}>
          <SettingIcon>
            <Globe size={24} color={theme.colors.gray[600]} />
          </SettingIcon>
          <SettingContent>
            <SettingLabel>{t('settings.language')}</SettingLabel>
            <SettingValue>{t(`settings.languages.${currentLanguage}`)}</SettingValue>
          </SettingContent>
          <ChevronRight size={20} color={theme.colors.gray[400]} />
        </SettingItem>

        <SettingItem onPress={() => {
          setFontScale(currentScale === 'small' ? 'medium' : 
                     currentScale === 'medium' ? 'large' :
                     currentScale === 'large' ? 'extraLarge' : 'small');
        }}>
          <SettingIcon>
            <Type size={24} color={theme.colors.gray[600]} />
          </SettingIcon>
          <SettingContent>
            <SettingLabel>{t('settings.fontSize')}</SettingLabel>
            <SettingValue>
              {t(`settings.fontSizes.${currentScale}`)}
              {isAccessibleScale() && ' • Accesible'}
            </SettingValue>
          </SettingContent>
          <ChevronRight size={20} color={theme.colors.gray[400]} />
        </SettingItem>
      </SectionCard>

      {/* Notification Settings */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>{t('settings.notifications')}</SectionTitle>
        </SectionHeader>
        
        <SettingItem>
          <SettingIcon>
            <Bell size={24} color={theme.colors.gray[600]} />
          </SettingIcon>
          <SettingContent>
            <SettingLabel>{t('settings.pushNotifications')}</SettingLabel>
          </SettingContent>
          <Switch
            value={pushNotifications}
            onValueChange={(value) => {
              setPushNotifications(value);
              showToast({
                type: 'success',
                message: 'Configuración actualizada',
                duration: 2000,
              });
            }}
            trackColor={{
              false: theme.colors.gray[300],
              true: theme.colors.primary[200],
            }}
            thumbColor={pushNotifications ? theme.colors.primary[500] : theme.colors.gray[500]}
          />
        </SettingItem>

        <SettingItem>
          <SettingIcon>
            <Bell size={24} color={theme.colors.gray[600]} />
          </SettingIcon>
          <SettingContent>
            <SettingLabel>{t('settings.emailNotifications')}</SettingLabel>
          </SettingContent>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{
              false: theme.colors.gray[300],
              true: theme.colors.primary[200],
            }}
            thumbColor={emailNotifications ? theme.colors.primary[500] : theme.colors.gray[500]}
          />
        </SettingItem>
      </SectionCard>

      {/* Demo Reset */}
      <ResetSection>
        <Button
          variant="outline"
          onPress={() => {
            showToast({
              type: 'success',
              message: 'Configuración restablecida',
              duration: 3000,
            });
          }}
          fullWidth={true}
        >
          Restablecer Configuración
        </Button>
      </ResetSection>
    </ScreenLayout>
  );
};

// Styled Components
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing.xl}px;
  margin-top: ${theme.spacing.lg}px;
`;

const HeaderIcon = styled.View`
  margin-right: ${theme.spacing.md}px;
`;

const HeaderTitle = styled.Text`
  font-size: ${theme.typography.fontSize.xxl}px;
  font-weight: bold;
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
`;

const SectionCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  margin-bottom: ${theme.spacing.lg}px;
  ${theme.shadows.sm}
`;

const SectionHeader = styled.View`
  padding: ${theme.spacing.lg}px ${theme.spacing.lg}px ${theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.gray[100]};
`;

const SectionTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.primary.bold};
`;

const SettingItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.gray[100]};
`;

const SettingIcon = styled.View`
  margin-right: ${theme.spacing.md}px;
`;

const SettingContent = styled.View`
  flex: 1;
`;

const SettingLabel = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 500;
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.primary.medium};
  margin-bottom: ${theme.spacing.xs}px;
`;

const SettingValue = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.gray[600]};
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

const ResetSection = styled.View`
  margin-top: ${theme.spacing.xl}px;
  margin-bottom: ${theme.spacing.xl}px;
`;

// Modal Content Styled Components
const LanguageModalContent = styled.View`
  padding: ${theme.spacing.lg}px;
`;

const ModalTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${theme.colors.gray[900]};
  font-family: ${theme.typography.fontFamily.secondary.bold};
  margin-bottom: ${theme.spacing.lg}px;
  text-align: center;
`;

const LanguageOptions = styled.View`
  gap: ${theme.spacing.sm}px;
`;

const LanguageOption = styled.TouchableOpacity<{ $selected: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${({ $selected }) => 
    $selected ? theme.colors.primary[50] : theme.colors.gray[50]
  };
  border-width: 1px;
  border-color: ${({ $selected }) => 
    $selected ? theme.colors.primary[200] : theme.colors.gray[200]
  };
`;

const LanguageOptionText = styled.Text<{ $selected: boolean }>`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: ${({ $selected }) => $selected ? '600' : '400'};
  color: ${({ $selected }) => 
    $selected ? theme.colors.primary[700] : theme.colors.gray[700]
  };
  font-family: ${theme.typography.fontFamily.primary.regular};
`;

export default SettingsScreen;
