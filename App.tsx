import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GameListScreen from './src/screens/GameListScreen';
import GameDetailScreen from './src/screens/GameDetailScreen';
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
            options={{ title: 'Loja Steam' }} 
          />
          <Stack.Screen 
            name="GameDetail" 
            component={GameDetailScreen} 
            options={{ title: 'Sobre o Jogo' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WishlistProvider>
  );
}