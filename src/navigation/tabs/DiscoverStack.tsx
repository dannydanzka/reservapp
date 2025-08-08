import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Menu, Heart } from 'lucide-react-native';

import { DiscoverStackParamList } from '../types';
import { theme } from '../../libs/ui/theme/theme';

// Screens
import DiscoverHomeScreen from '../../screens/tabs/discover/DiscoverHomeScreen';
import VenueListScreen from '../../screens/tabs/discover/VenueListScreen';
import VenueDetailsScreen from '../../screens/tabs/discover/VenueDetailsScreen';
import ServiceDetailsScreen from '../../screens/tabs/discover/ServiceDetailsScreen';

const Stack = createStackNavigator<DiscoverStackParamList>();

const DiscoverStack: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
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
        name="DiscoverHome"
        component={DiscoverHomeScreen}
        options={{
          title: 'Descubrir',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ marginLeft: 16 }}
            >
              <Menu size={24} color={theme.colors.gray[900]} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <Stack.Screen
        name="VenueList"
        component={VenueListScreen}
        options={({ route }) => ({
          title: route.params?.category ? `${route.params.category}` : 'Lugares',
        })}
      />
      
      <Stack.Screen
        name="VenueDetails"
        component={VenueDetailsScreen}
        options={{
          title: 'Detalles del Lugar',
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }}>
              <Heart size={24} color={theme.colors.gray[600]} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <Stack.Screen
        name="ServiceDetails"
        component={ServiceDetailsScreen}
        options={{
          title: 'Detalles del Servicio',
        }}
      />
    </Stack.Navigator>
  );
};

export default DiscoverStack;