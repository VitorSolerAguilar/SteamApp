import React, { useEffect, useState, useReducer } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput, StyleSheet, } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { steamApi } from '../services/steamApi';
import { Game, RootStackParamList } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'GameList'>;
};

type SortOrder = 'peak_desc' | 'peak_asc';

type SearchState = {
  query: string;
  sortOrder: SortOrder;
  results: Game[];
  isFiltering: boolean;
};

type SearchAction =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_SORT'; payload: SortOrder }
  | { type: 'SET_RESULTS'; payload: Game[] }
  | { type: 'CLEAR' };

const initialState: SearchState = {
  query: '',
  sortOrder: 'peak_desc',
  results: [],
  isFiltering: false,
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
        isFiltering: action.payload.trim().length > 0,
      };
    case 'SET_SORT':
      return {
        ...state,
        sortOrder: action.payload,
      };
    case 'SET_RESULTS':
      return {
        ...state,
        results: action.payload,
      };
    case 'CLEAR':
      return { ...initialState };
    default:
      return state;
  }
}

function applyFilter(games: Game[], state: SearchState): Game[] {
  let filtered = [...games];

  if (state.query.trim().length > 0) {
    filtered = filtered.filter((g) =>
      g.appid.toString().includes(state.query.trim())
    );
  }

  if (state.sortOrder === 'peak_desc') {
    filtered.sort((a, b) => b.peak_in_game - a.peak_in_game);
  } else {
    filtered.sort((a, b) => a.peak_in_game - b.peak_in_game);
  }

  return filtered;
}

export default function GameListScreen({ navigation }: Props) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchState, dispatch] = useReducer(searchReducer, initialState);

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    const filtered = applyFilter(games, searchState);
    dispatch({ type: 'SET_RESULTS', payload: filtered });
  }, [searchState.query, searchState.sortOrder, games]);

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
      dispatch({ type: 'SET_RESULTS', payload: gamesFormatted });
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
    <View style={{ flex: 1, backgroundColor: '#1b2838' }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por AppID..."
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={searchState.query}
        onChangeText={(text) =>
          dispatch({ type: 'SET_QUERY', payload: text })
        }
      />

      <View style={styles.sortRow}>
        <TouchableOpacity
          style={[
            styles.sortButton,
            searchState.sortOrder === 'peak_desc' && styles.sortActive,
          ]}
          onPress={() => dispatch({ type: 'SET_SORT', payload: 'peak_desc' })}
        >
          <Text style={styles.sortText}>Maior pico</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortButton,
            searchState.sortOrder === 'peak_asc' && styles.sortActive,
          ]}
          onPress={() => dispatch({ type: 'SET_SORT', payload: 'peak_asc' })}
        >
          <Text style={styles.sortText}>Menor pico</Text>
        </TouchableOpacity>
      </View>

      {searchState.results.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Nenhum jogo encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={searchState.results}
          keyExtractor={(item) => item.appid.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  searchInput: {
    backgroundColor: '#2a475e',
    color: '#fff',
    margin: 16,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
  },
  sortRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  sortButton: {
    flex: 1,
    backgroundColor: '#2a475e',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  sortActive: {
    backgroundColor: '#4c6b22',
  },
  sortText: {
    color: '#fff',
    fontSize: 13,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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