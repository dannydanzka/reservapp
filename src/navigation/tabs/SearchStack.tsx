import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SearchStackParamList } from '../types';
import { theme } from '../../libs/ui/theme/theme';

// Screens
import SearchHomeScreen from '../../screens/tabs/search/SearchHomeScreen';
import SearchResultsScreen from '../../screens/tabs/search/SearchResultsScreen';
import MapViewScreen from '../../screens/tabs/search/MapViewScreen';

const Stack = createStackNavigator<SearchStackParamList>();

const SearchStack: React.FC = () => {
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
        name="SearchHome"
        component={SearchHomeScreen}
        options={{
          title: 'Buscar',
        }}
      />
      
      <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={({ route }) => ({
          title: `Resultados: "${route.params.query}"`,
        })}
      />
      
      <Stack.Screen
        name="MapView"
        component={MapViewScreen}
        options={{
          title: 'Mapa',
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;