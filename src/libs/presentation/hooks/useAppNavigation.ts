import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

export const useAppNavigation = () => {
  const navigation = useNavigation<any>();

  const navigateToLogin = useCallback(() => {
    navigation.navigate('AuthStack', { screen: 'Login' });
  }, [navigation]);

  const navigateToRegister = useCallback(() => {
    navigation.navigate('AuthStack', { screen: 'Register' });
  }, [navigation]);

  const navigateToBooking = useCallback(
    (params?: any) => {
      navigation.navigate('BookingFlow', {
        screen: 'ServiceSelection',
        ...params,
      });
    },
    [navigation]
  );

  const navigateToVenueDetails = useCallback(
    (venueId: string) => {
      navigation.navigate('VenueDetails', { venueId });
    },
    [navigation]
  );

  const navigateToServiceDetails = useCallback(
    (serviceId: string, venueId: string) => {
      navigation.navigate('ServiceDetails', { serviceId, venueId });
    },
    [navigation]
  );

  const openDrawer = useCallback(() => {
    navigation.openDrawer?.();
  }, [navigation]);

  const closeDrawer = useCallback(() => {
    navigation.closeDrawer?.();
  }, [navigation]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const resetToMainStack = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainDrawer' }],
    });
  }, [navigation]);

  const resetToAuthStack = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AuthStack' }],
    });
  }, [navigation]);

  return {
    closeDrawer,
    goBack,
    navigateToBooking,
    navigateToLogin,
    navigateToRegister,
    navigateToServiceDetails,
    navigateToVenueDetails,
    navigation,
    openDrawer,
    resetToAuthStack,
    resetToMainStack,
  };
};
