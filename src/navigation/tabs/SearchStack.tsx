import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { SearchStackParamList } from '@navigation/types';
import { theme } from '@styles/theme';
import MapViewScreen from '@presentation/screens/tabs/search/MapViewScreen';
import SearchHomeScreen from '@presentation/screens/tabs/search/SearchHomeScreen';
import SearchResultsScreen from '@presentation/screens/tabs/search/SearchResultsScreen';

const Stack = createStackNavigator<SearchStackParamList>();

const SearchStack: React.FC = () => {
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
        component={SearchHomeScreen}
        name='SearchHome'
        options={{
          title: 'Buscar',
        }}
      />

      <Stack.Screen
        component={SearchResultsScreen}
        name='SearchResults'
        options={({ route }) => ({
          title: `Resultados: "${route.params.query}"`,
        })}
      />

      <Stack.Screen
        component={MapViewScreen}
        name='MapView'
        options={{
          title: 'Mapa',
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
