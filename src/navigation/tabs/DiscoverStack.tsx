import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Heart, Menu } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

import { DiscoverStackParamList } from '@navigation/types';
import { theme } from '@styles/theme';
import DiscoverHomeScreen from '@presentation/screens/tabs/discover/DiscoverHomeScreen';
import ServiceDetailsScreen from '@presentation/screens/tabs/discover/ServiceDetailsScreen';
import VenueDetailsScreen from '@presentation/screens/tabs/discover/VenueDetailsScreen';
import VenueListScreen from '@presentation/screens/tabs/discover/VenueListScreen';

const Stack = createStackNavigator<DiscoverStackParamList>();

const DiscoverStack: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.white,
          elevation: 1,
          shadowOpacity: 0.1,
        },
        headerTintColor: theme.colors.gray[900],
        headerTitleStyle: {
          fontSize: theme.typography.fontSize.lg,
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        component={DiscoverHomeScreen}
        name='DiscoverHome'
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Menu color={theme.colors.gray[900]} size={24} />
            </TouchableOpacity>
          ),
          title: 'Descubrir',
        }}
      />

      <Stack.Screen
        component={VenueListScreen}
        name='VenueList'
        options={({ route }) => ({
          title: route.params?.category ? `${route.params.category}` : 'Lugares',
        })}
      />

      <Stack.Screen
        component={VenueDetailsScreen}
        name='VenueDetails'
        options={{
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }}>
              <Heart color={theme.colors.gray[600]} size={24} />
            </TouchableOpacity>
          ),
          title: 'Detalles del Lugar',
        }}
      />

      <Stack.Screen
        component={ServiceDetailsScreen}
        name='ServiceDetails'
        options={{
          title: 'Detalles del Servicio',
        }}
      />
    </Stack.Navigator>
  );
};

export default DiscoverStack;
