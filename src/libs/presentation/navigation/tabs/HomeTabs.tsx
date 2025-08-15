import React from 'react';

import { Calendar, CreditCard, Home, Menu, Search, User } from 'lucide-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { DiscoverScreen } from '../../components/DiscoverScreen';
import { HomeScreen } from '../../components/HomeScreen';
import { ProfileScreen } from '../../../../modules/mod-profile/presentation/components/ProfileScreen';
import { ReservationsScreen } from '../../components/ReservationsScreen';
import { TabParamList } from '../types';
import { WalletScreen } from '../../../../modules/mod-payments/presentation/components/WalletScreen';

const Tab = createBottomTabNavigator<TabParamList>();

// Custom Header Component
const CustomHeader: React.FC<{ title: string }> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: '#ffffff' }}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderBottomColor: '#f3f4f6',
          borderBottomWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#f9fafb',
            borderRadius: 8,
            padding: 8,
          }}
          onPress={() => navigation.openDrawer()}
        >
          <Menu color='#4F46E5' size={24} />
        </TouchableOpacity>

        <Text
          style={{
            color: '#1f2937',
            flex: 1,
            fontSize: 18,
            fontWeight: '600',
            marginRight: 40,
            textAlign: 'center', // Para centrar considerando el botón izquierdo
          }}
        >
          {title}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export const HomeTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: ({ options }) => <CustomHeader title={options.headerTitle as string} />,
        headerShown: true,
        tabBarActiveTintColor: '#6B46C1',
        tabBarIcon: ({ color, focused, size }) => {
          const iconSize = focused ? size + 2 : size;

          switch (route.name) {
            case 'Home':
              return <Home color={color} size={iconSize} />;
            case 'Discover':
              return <Search color={color} size={iconSize} />;
            case 'Reservations':
              return <Calendar color={color} size={iconSize} />;
            case 'Wallet':
              return <CreditCard color={color} size={iconSize} />;
            case 'Profile':
              return <User color={color} size={iconSize} />;
            default:
              return <Home color={color} size={iconSize} />;
          }
        },
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 5,
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#E5E7EB',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 20 : 5,
          paddingTop: 8,
        },
      })}
    >
      <Tab.Screen
        component={HomeScreen}
        name='Home'
        options={{
          headerTitle: 'Inicio',
          tabBarAccessibilityLabel: 'Ir a la pantalla de inicio',
          tabBarLabel: 'Inicio',
        }}
      />
      <Tab.Screen
        component={DiscoverScreen}
        name='Discover'
        options={{
          headerTitle: 'Descubrir',
          tabBarAccessibilityLabel: 'Explorar venues y servicios',
          tabBarLabel: 'Descubrir',
        }}
      />
      <Tab.Screen
        component={ReservationsScreen}
        name='Reservations'
        options={{
          headerTitle: 'Mis Reservas',
          tabBarAccessibilityLabel: 'Ver mis reservas',
          tabBarLabel: 'Reservas',
        }}
      />
      <Tab.Screen
        component={WalletScreen}
        name='Wallet'
        options={{
          headerTitle: 'Wallet',
          tabBarAccessibilityLabel: 'Gestionar métodos de pago',
          tabBarLabel: 'Wallet',
        }}
      />
      <Tab.Screen
        component={ProfileScreen}
        name='Profile'
        options={{
          headerTitle: 'Mi Perfil',
          tabBarAccessibilityLabel: 'Ver mi perfil',
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
};
