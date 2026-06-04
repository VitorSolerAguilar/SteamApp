import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { steamApi } from '../services/steamApi';
import { Game, RootStackParamList } from '../types';

type Props = {navigation: NativeStackNavigationProp<RootStackParamList, 'GameList'>;};

export default function GameListScreen({ navigation }: Props) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await steamApi.get(
        '/ISteamChartsService/GetMostPlayedGames/v1/'
      );

      const rawGames = response.data.response.ranks.slice(0, 30);

      const gamesFormatted: Game[] = rawGames.map((game: any) => ({
        appid: game.appid,
        peak_in_game: game.peak_in_game,
        image: `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
      }));

      setGames(gamesFormatted);
    } catch (err) {
      setError('Não foi possível carregar os jogos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4c6b22" />
        <Text style={styles.loadingText}>Carregando jogos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchGames}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Game }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('GameDetail', { appid: item.appid })}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.cardInfo}>
        <Text style={styles.appid}>AppID: {item.appid}</Text>
        <Text style={styles.players}>
          Pico de jogadores: {item.peak_in_game.toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.appid.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b2838',
  },
  loadingText: {
    color: '#c6d4df',
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    color: '#e62929',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 24,
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#4c6b22',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
    backgroundColor: '#1b2838',
  },
  card: {
    backgroundColor: '#2a475e',
    borderRadius: 10,
    marginBottom: 14,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
  },
  cardInfo: {
    padding: 10,
  },
  appid: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  players: {
    color: '#c6d4df',
    fontSize: 13,
    marginTop: 4,
  },
});