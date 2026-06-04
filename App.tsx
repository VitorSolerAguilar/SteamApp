import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListScreen from './src/screens/ListScreen';
import DetailsScreen from './src/screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="List"
        screenOptions={{
          headerStyle: { backgroundColor: '#1b2838' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen 
          name="List" 
          component={ListScreen} 
          options={{ title: 'Loja Steam' }} 
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: 'Sobre o Jogo' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}