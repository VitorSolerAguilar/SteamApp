import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GameListScreen from './src/screens/GameListScreen';
import GameDetailScreen from './src/screens/GameDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import { RootStackParamList } from './src/types';
import { WishlistProvider } from './src/context/WishlistContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <WishlistProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="GameList"
          screenOptions={{
            headerStyle: { backgroundColor: '#1b2838' },
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen 
            name="GameList" 
            component={GameListScreen} 
            options={({ navigation }) => ({ 
              title: 'Loja Steam',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                  <Text style={{ color: '#66c0f4', fontWeight: 'bold', fontSize: 16 }}>
                    ⭐ Lista de desejos
                  </Text>
                </TouchableOpacity>
              )
            })} 
          />
          <Stack.Screen 
            name="GameDetail" 
            component={GameDetailScreen} 
            options={{ title: 'Sobre o Jogo' }} 
          />
          {}
          <Stack.Screen 
            name="Favorites" 
            component={FavoritesScreen} 
            options={{ title: 'Minha Wishlist' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WishlistProvider>
  );
}