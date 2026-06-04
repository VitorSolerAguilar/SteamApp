import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ListScreen({ navigation }: any) {
  const fakeGameId = 730; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo da Steam</Text>
      
      <Button 
        title="Ver Detalhes do CS2" 
        onPress={() => navigation.navigate('Details', { appId: fakeGameId })} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#171A21',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    marginBottom: 20,
  }
});