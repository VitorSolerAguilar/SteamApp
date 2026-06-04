import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen({ route }: any) {
  const { appId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Jogo</Text>
      <Text style={styles.text}>ID do jogo recebido: {appId}</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    color: '#66C0F4',
    fontSize: 18,
    marginTop: 10,
  }
});