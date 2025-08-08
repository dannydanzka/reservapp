import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Compass, Search, Heart, Calendar, User } from 'lucide-react-native';

import { TabParamList } from '../types';
import { theme } from '../../libs/ui/theme/theme';

// Stack navigators para cada tab
import DiscoverStack from './DiscoverStack';
import SearchStack from './SearchStack';
import FavoritesScreen from '../../screens/tabs/FavoritesScreen';
import BookingsScreen from '../../screens/tabs/BookingsScreen';
import AccountScreen from '../../screens/tabs/AccountScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarInactiveTintColor: theme.colors.gray[400],
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopColor: theme.colors.gray[200],
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.fontSize.xs,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Discover"
        component={DiscoverStack}
        options={{
          title: 'Descubrir',
          tabBarIcon: ({ color, size }) => (
            <Compass color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <Search color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Heart color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          title: 'Reservas',
          tabBarIcon: ({ color, size }) => (
            <Calendar color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Cuenta',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;