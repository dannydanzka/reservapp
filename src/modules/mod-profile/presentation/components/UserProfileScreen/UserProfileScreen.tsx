import React, { useEffect, useState } from 'react';

import { Alert, ScrollView } from 'react-native';
import {
  Bell,
  Calendar,
  Camera,
  ChevronRight,
  CreditCard,
  Edit3,
  Key,
  LogOut,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react-native';
import styled from 'styled-components/native';

import { Badge, FeedbackBox, OptionCard, Tabs } from '@presentation/components';
import { logoutUser } from '@store/slices/authSlice';
import { theme } from '@styles/theme';
import { useAppDispatch, useAppSelector } from '@store/store';
import { useI18n } from '@hooks/useI18n';
import { User as UserType } from '@shared/types';
import Button from '@presentation/components/Button/Button';
import Input from '@presentation/components/Input/Input';
import ScreenLayout from '@presentation/components/ScreenLayout/ScreenLayout';

// import settingsService from '@libs/services/settings/settingsService';
// import userService from '@libs/services/users/userService';

// Mock hook implementations - replace with actual implementations when available
const useFormValidation = <T extends Record<string, any>>(config: any) => {
  const [formState, setFormState] = useState({
    errors: {} as any,
    isSubmitting: false,
    isValid: true,
    touched: {} as any,
    values: config.initialValues,
  });

  const setValue = (field: keyof T, value: any) => {
    setFormState((prev) => ({
      ...prev,
      values: { ...prev.values, [field]: value },
    }));
  };

  const markFieldAsTouched = (field: keyof T) => {
    setFormState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [field]: true },
    }));
  };

  const getFieldError = (field: keyof T) => formState.errors[field];
  const isFieldTouched = (field: keyof T) => formState.touched[field];

  const handleSubmit = async () => {
    setFormState((prev) => ({ ...prev, isSubmitting: true }));
    try {
      await config.onSubmit(formState.values);
    } finally {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const resetForm = () => {
    setFormState({
      errors: {},
      isSubmitting: false,
      isValid: true,
      touched: {},
      values: config.initialValues,
    });
  };

  return {
    formState,
    getFieldError,
    handleSubmit,
    isFieldTouched,
    markFieldAsTouched,
    resetForm,
    setValue,
  };
};

const useLoadingState = () => {
  const [state, setState] = useState({
    isError: false,
    isLoading: false,
    isSuccess: false,
  });

  return {
    ...state,
    setError: () => setState({ isError: true, isLoading: false, isSuccess: false }),
    setSuccess: () => setState({ isError: false, isLoading: false, isSuccess: true }),
    startLoading: () => setState({ isError: false, isLoading: true, isSuccess: false }),
    stopLoading: () => setState({ isError: false, isLoading: false, isSuccess: false }),
  };
};

const useNotifications = () => ({
  showError: (message: string, title?: string) => console.log('Error:', title || message),
  showSuccess: (message: string, title?: string) => console.log('Success:', title || message),
  showWarning: (message: string, title?: string) => console.log('Warning:', title || message),
});

const withErrorHandling = (fn: Function, options?: any) => fn;

// Mock LoadingState component
const LoadingState: React.FC<{ state: string; message: string; size?: string }> = ({ message }) => (
  <LoadingStateContainer>
    <LoadingStateText>{message}</LoadingStateText>
  </LoadingStateContainer>
);

interface UserProfileScreenProps {
  navigation: any;
}

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PROFILE_TABS = [
  { icon: <User />, id: 'profile', label: 'Perfil' },
  { icon: <Bell />, id: 'preferences', label: 'Preferencias' },
];

const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ navigation }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useI18n();
  const { showError, showSuccess, showWarning } = useNotifications();

  const [activeTab, setActiveTab] = useState('profile');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [userProfile, setUserProfile] = useState<UserType | null>(user);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    marketing: false,
    push: true,
  });

  const profileLoadingState = useLoadingState();
  const settingsLoadingState = useLoadingState();

  // Profile form validation
  const profileFormValidation = useFormValidation<ProfileFormData>({
    fields: [
      {
        label: 'Nombre',
        name: 'firstName',
        rules: [{ message: 'Nombre es requerido', type: 'required' }],
      },
      {
        label: 'Apellido',
        name: 'lastName',
        rules: [{ message: 'Apellido es requerido', type: 'required' }],
      },
      {
        label: 'Email',
        name: 'email',
        rules: [
          { message: 'Email es requerido', type: 'required' },
          { message: 'Email inválido', type: 'email' },
        ],
      },
      {
        label: 'Teléfono',
        name: 'phone',
        rules: [{ message: 'Teléfono inválido', type: 'phone' }],
      },
    ],
    initialValues: {
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
    },
    onSubmit: handleProfileUpdate,
    validateOnBlur: true,
    validateOnChange: true,
  });

  // Password form validation
  const passwordFormValidation = useFormValidation<PasswordFormData>({
    fields: [
      {
        label: 'Contraseña Actual',
        name: 'currentPassword',
        rules: [{ message: 'Contraseña actual es requerida', type: 'required' }],
      },
      {
        label: 'Nueva Contraseña',
        name: 'newPassword',
        rules: [
          { message: 'Nueva contraseña es requerida', type: 'required' },
          { message: 'Mínimo 6 caracteres', type: 'minLength', value: 6 },
        ],
      },
      {
        dependencies: ['newPassword'],
        label: 'Confirmar Nueva Contraseña',
        name: 'confirmPassword',
        rules: [
          {
            message: 'Confirmación de contraseña es requerida',
            type: 'required',
          },
          {
            field: 'newPassword',
            message: 'Las contraseñas no coinciden',
            type: 'matches',
          },
        ],
      },
    ],
    initialValues: {
      confirmPassword: '',
      currentPassword: '',
      newPassword: '',
    },
    onSubmit: handlePasswordChange,
    validateOnBlur: true,
    validateOnChange: true,
  });

  // Load user profile and settings
  const loadUserData = withErrorHandling(
    async () => {
      profileLoadingState.startLoading();

      try {
        // Mock data for now - replace with actual service calls when available
        const profile = {
          ...user,
          createdAt: user?.createdAt || new Date().toISOString(),
          email: user?.email || '',
          firstName: user?.firstName || '',
          isActive: true,
          lastName: user?.lastName || '',
          phone: user?.phone || '',
          role: user?.role || ('USER' as any),
        };

        const settings = {
          emailNotifications: true,
          marketingEmails: false,
          pushNotifications: true,
        };

        setUserProfile(profile);
        setNotificationSettings({
          email: settings.emailNotifications,
          marketing: settings.marketingEmails,
          push: settings.pushNotifications,
        });

        // Update form with loaded data
        profileFormValidation.setValue('firstName', profile.firstName);
        profileFormValidation.setValue('lastName', profile.lastName);
        profileFormValidation.setValue('email', profile.email);
        profileFormValidation.setValue('phone', profile.phone || '');

        profileLoadingState.setSuccess();
        setTimeout(() => profileLoadingState.stopLoading(), 500);
      } catch (error) {
        profileLoadingState.setError();
        throw error;
      }
    },
    {
      customMessage: 'Error al cargar perfil',
      showAlert: false,
    }
  );

  // Update profile
  async function handleProfileUpdate(values: ProfileFormData) {
    try {
      // Mock update for now - replace with actual service call when available
      const updatedProfile = {
        ...userProfile,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      };

      setUserProfile(updatedProfile);
      showSuccess('Perfil actualizado correctamente', 'Perfil Guardado');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar perfil';
      showError(errorMessage, 'Error');
    }
  }

  // Change password
  async function handlePasswordChange(values: PasswordFormData) {
    try {
      // Mock password change for now - replace with actual service call when available
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      passwordFormValidation.resetForm();
      showSuccess('Contraseña cambiada correctamente', 'Contraseña Actualizada');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cambiar contraseña';
      showError(errorMessage, 'Error');
    }
  }

  // Update notification settings
  const updateNotificationSetting = withErrorHandling(
    async (setting: keyof typeof notificationSettings, value: boolean) => {
      settingsLoadingState.startLoading();

      try {
        const updateData = {
          emailNotifications: setting === 'email' ? value : notificationSettings.email,
          marketingEmails: setting === 'marketing' ? value : notificationSettings.marketing,
          pushNotifications: setting === 'push' ? value : notificationSettings.push,
        };

        // Mock settings update for now - replace with actual service call when available
        await new Promise((resolve) => setTimeout(resolve, 500));

        setNotificationSettings((prev) => ({
          ...prev,
          [setting]: value,
        }));

        settingsLoadingState.setSuccess();
        showSuccess('Configuración actualizada');

        setTimeout(() => settingsLoadingState.stopLoading(), 500);
      } catch (error) {
        settingsLoadingState.setError();
        throw error;
      }
    },
    {
      customMessage: 'Error al actualizar configuración',
      showAlert: false,
    }
  );

  // Handle logout
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      showSuccess('Sesión cerrada correctamente', 'Hasta pronto');
      setShowLogoutConfirm(false);
    } catch (error) {
      showError('Error al cerrar sesión');
    }
  };

  // Load data on mount
  useEffect(() => {
    loadUserData();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <TabContent>
            {/* Profile Picture Section */}
            <ProfilePictureSection>
              <ProfilePicture>
                <User color={theme.colors.white} size={48} />
              </ProfilePicture>
              <ProfilePictureButton>
                <Camera color={theme.colors.primary[600]} size={16} />
                <ProfilePictureButtonText>Cambiar Foto</ProfilePictureButtonText>
              </ProfilePictureButton>
            </ProfilePictureSection>

            {/* Profile Form */}
            <FormContainer>
              <SectionTitle>Información Personal</SectionTitle>

              <FormRow>
                <FormHalfWidth>
                  <Input
                    label='Nombre'
                    placeholder='Tu nombre'
                    value={profileFormValidation.formState.values.firstName}
                    onBlur={() => profileFormValidation.markFieldAsTouched('firstName')}
                    onChangeText={(text) => profileFormValidation.setValue('firstName', text)}
                  />
                </FormHalfWidth>

                <FormHalfWidth>
                  <Input
                    label='Apellido'
                    placeholder='Tu apellido'
                    value={profileFormValidation.formState.values.lastName}
                    onBlur={() => profileFormValidation.markFieldAsTouched('lastName')}
                    onChangeText={(text) => profileFormValidation.setValue('lastName', text)}
                  />
                </FormHalfWidth>
              </FormRow>

              <Input
                autoCapitalize='none'
                editable={false} // Email usually not editable
                keyboardType='email-address'
                label='Email'
                placeholder='tu@email.com'
                value={profileFormValidation.formState.values.email}
                onBlur={() => profileFormValidation.markFieldAsTouched('email')}
                onChangeText={(text) => profileFormValidation.setValue('email', text)}
              />

              <Input
                keyboardType='phone-pad'
                label='Teléfono'
                placeholder='+52 555 123 4567'
                value={profileFormValidation.formState.values.phone}
                onBlur={() => profileFormValidation.markFieldAsTouched('phone')}
                onChangeText={(text) => profileFormValidation.setValue('phone', text)}
              />

              <Button
                disabled={
                  !profileFormValidation.formState.isValid ||
                  profileFormValidation.formState.isSubmitting
                }
                fullWidth
                loading={profileFormValidation.formState.isSubmitting}
                size='lg'
                variant='primary'
                onPress={profileFormValidation.handleSubmit}
              >
                Guardar Cambios
              </Button>
            </FormContainer>

            {/* Account Info */}
            <InfoSection>
              <InfoTitle>Información de la Cuenta</InfoTitle>

              <InfoItem>
                <InfoIcon>
                  <Calendar color={theme.colors.gray[500]} size={20} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Miembro desde</InfoLabel>
                  <InfoValue>
                    {userProfile?.createdAt &&
                      new Date(userProfile.createdAt).toLocaleDateString('es-MX', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                  </InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <InfoIcon>
                  <Badge
                    size='small'
                    text={userProfile?.isActive ? 'Activa' : 'Inactiva'}
                    variant={userProfile?.isActive ? 'success' : 'error'}
                  />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Estado de la cuenta</InfoLabel>
                  <InfoValue>{userProfile?.role || 'Usuario'}</InfoValue>
                </InfoContent>
              </InfoItem>
            </InfoSection>
          </TabContent>
        );

      case 'password':
        return (
          <TabContent>
            <FormContainer>
              <SectionTitle>Cambiar Contraseña</SectionTitle>

              <Input
                label='Contraseña Actual'
                placeholder='Ingresa tu contraseña actual'
                secureTextEntry
                value={passwordFormValidation.formState.values.currentPassword}
                onBlur={() => passwordFormValidation.markFieldAsTouched('currentPassword')}
                onChangeText={(text) => passwordFormValidation.setValue('currentPassword', text)}
              />

              <Input
                label='Nueva Contraseña'
                placeholder='Mínimo 6 caracteres'
                secureTextEntry
                value={passwordFormValidation.formState.values.newPassword}
                onBlur={() => passwordFormValidation.markFieldAsTouched('newPassword')}
                onChangeText={(text) => passwordFormValidation.setValue('newPassword', text)}
              />

              <Input
                label='Confirmar Nueva Contraseña'
                placeholder='Repite la nueva contraseña'
                secureTextEntry
                value={passwordFormValidation.formState.values.confirmPassword}
                onBlur={() => passwordFormValidation.markFieldAsTouched('confirmPassword')}
                onChangeText={(text) => passwordFormValidation.setValue('confirmPassword', text)}
              />

              <Button
                disabled={
                  !passwordFormValidation.formState.isValid ||
                  passwordFormValidation.formState.isSubmitting
                }
                fullWidth
                loading={passwordFormValidation.formState.isSubmitting}
                size='lg'
                variant='primary'
                onPress={passwordFormValidation.handleSubmit}
              >
                Cambiar Contraseña
              </Button>
            </FormContainer>

            {/* Security Tips */}
            <InfoSection>
              <InfoTitle>Consejos de Seguridad</InfoTitle>
              <SecurityTips>
                <SecurityTip>• Usa una contraseña única y fuerte</SecurityTip>
                <SecurityTip>• Combina letras, números y símbolos</SecurityTip>
                <SecurityTip>• Evita información personal fácil de adivinar</SecurityTip>
                <SecurityTip>• Cambia tu contraseña regularmente</SecurityTip>
              </SecurityTips>
            </InfoSection>
          </TabContent>
        );

      case 'preferences':
        return (
          <TabContent>
            <PreferencesSection>
              <SectionTitle>Notificaciones</SectionTitle>
              <NotificationOptionContainer>
                <OptionCardContent>
                  <Mail color={theme.colors.primary[600]} size={20} />
                  <NotificationOptionText>
                    <NotificationOptionTitle>Notificaciones por Email</NotificationOptionTitle>
                    <NotificationOptionSubtitle>
                      Recibe confirmaciones y recordatorios por email
                    </NotificationOptionSubtitle>
                  </NotificationOptionText>
                </OptionCardContent>
                <Switch
                  disabled={settingsLoadingState.isLoading}
                  value={notificationSettings.email}
                  onValueChange={(value) => updateNotificationSetting('email', value)}
                />
              </NotificationOptionContainer>

              <NotificationOptionContainer>
                <OptionCardContent>
                  <Bell color={theme.colors.primary[600]} size={20} />
                  <NotificationOptionText>
                    <NotificationOptionTitle>Notificaciones Push</NotificationOptionTitle>
                    <NotificationOptionSubtitle>
                      Recibe notificaciones en tiempo real
                    </NotificationOptionSubtitle>
                  </NotificationOptionText>
                </OptionCardContent>
                <Switch
                  disabled={settingsLoadingState.isLoading}
                  value={notificationSettings.push}
                  onValueChange={(value) => updateNotificationSetting('push', value)}
                />
              </NotificationOptionContainer>

              <NotificationOptionContainer>
                <OptionCardContent>
                  <Bell color={theme.colors.primary[600]} size={20} />
                  <NotificationOptionText>
                    <NotificationOptionTitle>Promociones y Ofertas</NotificationOptionTitle>
                    <NotificationOptionSubtitle>
                      Recibe ofertas especiales y promociones
                    </NotificationOptionSubtitle>
                  </NotificationOptionText>
                </OptionCardContent>
                <Switch
                  disabled={settingsLoadingState.isLoading}
                  value={notificationSettings.marketing}
                  onValueChange={(value) => updateNotificationSetting('marketing', value)}
                />
              </NotificationOptionContainer>
            </PreferencesSection>

            <PreferencesSection>
              <SectionTitle>Acciones de Cuenta</SectionTitle>
              <OptionCard
                icon={<Calendar />}
                showChevron
                subtitle='Ver y gestionar mis reservas'
                title='Mis Reservas'
                onPress={() => navigation.navigate('MyBookings')}
              />

              <OptionCard
                icon={<CreditCard />}
                showChevron
                subtitle='Gestionar tarjetas y métodos de pago'
                title='Métodos de Pago'
                onPress={() => navigation.navigate('PaymentMethods')}
              />

              <OptionCard
                icon={<Bell />}
                showChevron
                subtitle='Preferencias de idioma y tema'
                title='Configuración'
                onPress={() => navigation.navigate('Settings')}
              />
            </PreferencesSection>

            <DangerZone>
              <DangerTitle>Zona Peligrosa</DangerTitle>
              <OptionCard
                icon={<LogOut />}
                subtitle='Salir de tu cuenta'
                title='Cerrar Sesión'
                variant='default'
                onPress={() => setShowLogoutConfirm(true)}
              />
            </DangerZone>
          </TabContent>
        );

      default:
        return null;
    }
  };

  if (profileLoadingState.isLoading && !userProfile) {
    return (
      <ScreenLayout>
        <Container>
          <LoadingContainer>
            <LoadingState message='Cargando perfil...' size='large' state='loading' />
          </LoadingContainer>
        </Container>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <Container>
        {/* Header */}
        <Header>
          <HeaderContent>
            <Title>Mi Perfil</Title>
            <Subtitle>Gestiona tu información personal</Subtitle>
          </HeaderContent>
        </Header>

        {/* Tabs */}
        <TabsContainer>
          <Tabs
            activeTab={activeTab}
            tabs={PROFILE_TABS}
            variant='underlined'
            onTabChange={setActiveTab}
          />
        </TabsContainer>

        {/* Content */}
        <Content>
          <ScrollView showsVerticalScrollIndicator={false}>{renderTabContent()}</ScrollView>
        </Content>

        {/* Logout Confirmation */}
        {showLogoutConfirm && (
          <ModalOverlay>
            <ModalContainer>
              <FeedbackBox
                description='Tendrás que iniciar sesión nuevamente para acceder a tu cuenta.'
                negativeText='Cancelar'
                positiveText='Cerrar Sesión'
                question='¿Estás seguro de que quieres cerrar sesión?'
                variant='destructive'
                onNegative={() => setShowLogoutConfirm(false)}
                onPositive={handleLogout}
              />
            </ModalContainer>
          </ModalOverlay>
        )}
      </Container>
    </ScreenLayout>
  );
};

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.gray[25]};
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Header = styled.View`
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.default};
`;

const HeaderContent = styled.View``;

const Title = styled.Text`
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const Subtitle = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

const TabsContainer = styled.View`
  background-color: ${theme.colors.white};
  padding: 0 ${theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.default};
`;

const Content = styled.View`
  flex: 1;
`;

const TabContent = styled.View`
  padding: ${theme.spacing.lg}px;
  gap: ${theme.spacing.xl}px;
`;

// Profile Picture Components
const ProfilePictureSection = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing.xl}px;
`;

const ProfilePicture = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${theme.colors.primary[500]};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const ProfilePictureButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  background-color: ${theme.colors.primary[50]};
  border-radius: ${theme.borderRadius.full}px;
  gap: ${theme.spacing.sm}px;
`;

const ProfilePictureButtonText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.primary[600]};
  font-weight: 500;
`;

// Form Components
const FormRow = styled.View`
  flex-direction: row;
  gap: ${theme.spacing.md}px;
`;

const FormHalfWidth = styled.View`
  flex: 1;
`;

// Form Container Components
const FormContainer = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  ${theme.shadows.sm}
  gap: ${theme.spacing.md}px;
`;

const SectionTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
`;

const PreferencesSection = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  ${theme.shadows.sm}
  gap: ${theme.spacing.sm}px;
`;

// Info Section Components
const InfoSection = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  ${theme.shadows.sm}
`;

const InfoTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
`;

const InfoItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.light};
`;

const InfoIcon = styled.View`
  margin-right: ${theme.spacing.md}px;
`;

const InfoContent = styled.View`
  flex: 1;
`;

const InfoLabel = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const InfoValue = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 500;
  color: ${theme.colors.text.primary};
`;

// Security Tips Components
const SecurityTips = styled.View`
  gap: ${theme.spacing.sm}px;
`;

const SecurityTip = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  line-height: 20px;
`;

// Switch Component
const Switch = styled.Switch.attrs(({ value }) => ({
  thumbColor: value ? theme.colors.primary[500] : theme.colors.gray[500],
  trackColor: {
    false: theme.colors.gray[300],
    true: theme.colors.primary[200],
  },
}))``;

// Danger Zone Components
const DangerZone = styled.View`
  background-color: ${theme.colors.error[25]};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  border: 1px solid ${theme.colors.error[200]};
`;

const DangerTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: 600;
  color: ${theme.colors.error[700]};
  margin-bottom: ${theme.spacing.md}px;
`;

// Modal Components
const ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(0 0 0 / 0.5);
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.View`
  margin: ${theme.spacing.lg}px;
  max-width: 400px;
  width: 100%;
`;

// Loading State Components
const LoadingStateContainer = styled.View`
  padding: ${theme.spacing.xl}px;
  align-items: center;
  justify-content: center;
`;

const LoadingStateText = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
`;

// Notification Option Components
const NotificationOptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md}px;
  background-color: ${theme.colors.surface.primary};
  border-radius: ${theme.borderRadius.lg}px;
  margin-bottom: ${theme.spacing.sm}px;
  ${theme.shadows.sm}
`;

const OptionCardContent = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const NotificationOptionText = styled.View`
  margin-left: ${theme.spacing.md}px;
  flex: 1;
`;

const NotificationOptionTitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const NotificationOptionSubtitle = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

export default UserProfileScreen;
