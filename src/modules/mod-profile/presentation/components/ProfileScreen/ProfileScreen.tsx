import React, { useEffect } from 'react';

import { ActivityIndicator, ScrollView } from 'react-native';
import {
  Building,
  Calendar,
  Clock,
  Crown,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from 'lucide-react-native';

import { getProfile } from '../../../../../libs/infrastructure/state/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../../../../libs/infrastructure/store/hooks';

import {
  Container,
  EmptyContainer,
  EmptyText,
  InfoIcon,
  InfoItem,
  InfoLabel,
  InfoValue,
  LoadingContainer,
  LoadingText,
  ProfileAvatar,
  ProfileAvatarText,
  ProfileCard,
  ProfileEmail,
  ProfileHeader,
  ProfileName,
  ProfileSection,
  SectionTitle,
} from './ProfileScreen.styled';

export const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const dashboardUser = useAppSelector((state) => state.dashboard.data?.user);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // Use auth user data (more complete) as primary, dashboard user as fallback for name
  const displayUser = user || dashboardUser;

  // Debug log to see what data we have
  console.log('ProfileScreen user data:', {
    dashboardUser,
    displayUser,
    role: displayUser?.role,
    user,
  });

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated, user]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Fecha no válida';
      }
      return date.toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch (error) {
      console.log('Error formatting date:', dateString, error);
      return 'Fecha no válida';
    }
  };

  const getRoleLabel = (role: string) => {
    const roles: Record<string, string> = {
      ADMIN: 'Administrador',
      MANAGER: 'Gerente',
      SUPER_ADMIN: 'Super Administrador',
      USER: 'Usuario',
    };
    return roles[role] || role;
  };

  const getInitials = (firstName?: string, lastName?: string, name?: string) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (name) {
      const nameParts = name.split(' ');
      return nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
        : `${nameParts[0][0]}${nameParts[0][1] || ''}`.toUpperCase();
    }
    return 'U';
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator color='#FF8A00' size='large' />
        <LoadingText>Cargando perfil...</LoadingText>
      </LoadingContainer>
    );
  }

  if (!displayUser) {
    return (
      <EmptyContainer>
        <EmptyText>No se pudo cargar la información del perfil</EmptyText>
      </EmptyContainer>
    );
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <ProfileCard>
          <ProfileHeader>
            <ProfileAvatar>
              <ProfileAvatarText>
                {getInitials(displayUser.firstName, displayUser.lastName, displayUser.name)}
              </ProfileAvatarText>
            </ProfileAvatar>
            <ProfileName>
              {displayUser.firstName && displayUser.lastName
                ? `${displayUser.firstName} ${displayUser.lastName}`
                : displayUser.name || 'Usuario'}
            </ProfileName>
            <ProfileEmail>{displayUser.email}</ProfileEmail>
          </ProfileHeader>
        </ProfileCard>

        {/* Personal Information */}
        <ProfileSection>
          <SectionTitle>Información Personal</SectionTitle>

          <InfoItem>
            <InfoIcon>
              <Mail color='#666' size={20} />
            </InfoIcon>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>{displayUser.email}</InfoValue>
          </InfoItem>

          {displayUser.phone && (
            <InfoItem>
              <InfoIcon>
                <Phone color='#666' size={20} />
              </InfoIcon>
              <InfoLabel>Teléfono</InfoLabel>
              <InfoValue>{displayUser.phone}</InfoValue>
            </InfoItem>
          )}

          {displayUser.address && (
            <InfoItem>
              <InfoIcon>
                <MapPin color='#666' size={20} />
              </InfoIcon>
              <InfoLabel>Dirección</InfoLabel>
              <InfoValue>{displayUser.address}</InfoValue>
            </InfoItem>
          )}

          <InfoItem>
            <InfoIcon>
              <Shield color='#666' size={20} />
            </InfoIcon>
            <InfoLabel>Rol</InfoLabel>
            <InfoValue>
              {displayUser.role ? getRoleLabel(displayUser.role) : 'No especificado'}
            </InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <User color='#666' size={20} />
            </InfoIcon>
            <InfoLabel>Estado</InfoLabel>
            <InfoValue>{displayUser.isActive ? 'Activo' : 'Inactivo'}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <Crown color={displayUser.isPremium ? '#FFD700' : '#666'} size={20} />
            </InfoIcon>
            <InfoLabel>Membresía</InfoLabel>
            <InfoValue>{displayUser.isPremium ? 'Premium' : 'Básica'}</InfoValue>
          </InfoItem>
        </ProfileSection>

        {/* Business Information (if applicable) */}
        {(displayUser.businessName || displayUser.businessType) && (
          <ProfileSection>
            <SectionTitle>Información del Negocio</SectionTitle>

            {displayUser.businessName && (
              <InfoItem>
                <InfoIcon>
                  <Building color='#666' size={20} />
                </InfoIcon>
                <InfoLabel>Nombre del Negocio</InfoLabel>
                <InfoValue>{displayUser.businessName}</InfoValue>
              </InfoItem>
            )}

            {displayUser.businessType && (
              <InfoItem>
                <InfoIcon>
                  <Building color='#666' size={20} />
                </InfoIcon>
                <InfoLabel>Tipo de Negocio</InfoLabel>
                <InfoValue>{displayUser.businessType}</InfoValue>
              </InfoItem>
            )}
          </ProfileSection>
        )}

        {/* Account Information */}
        <ProfileSection>
          <SectionTitle>Información de la Cuenta</SectionTitle>

          <InfoItem>
            <InfoIcon>
              <Calendar color='#666' size={20} />
            </InfoIcon>
            <InfoLabel>Miembro desde</InfoLabel>
            <InfoValue>
              {displayUser.createdAt ? formatDate(displayUser.createdAt) : 'No disponible'}
            </InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <Clock color='#666' size={20} />
            </InfoIcon>
            <InfoLabel>Última actualización</InfoLabel>
            <InfoValue>
              {displayUser.updatedAt ? formatDate(displayUser.updatedAt) : 'No disponible'}
            </InfoValue>
          </InfoItem>
        </ProfileSection>
      </ScrollView>
    </Container>
  );
};
