import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { storeApi } from '../services/steamApi';
import { GameDetail, RootStackParamList } from '../types';
import { WishlistContext } from '../context/WishlistContext';

type Props = NativeStackScreenProps<RootStackParamList, 'GameDetail'>;

export default function GameDetailScreen({ route }: Props) {
  const { appid } = route.params;
  const [game, setGame] = useState<GameDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toggleFavorite, isFavorite } = useContext(WishlistContext);

  useEffect(() => {
    fetchGameDetails();
  }, [appid]);

  const fetchGameDetails = async () => {
    try {
      const response = await storeApi.get('/appdetails', {
        params: { appids: appid, l: 'brazilian' }
      });

      const gameData = response.data[appid];

      if (gameData.success) {
        setGame(gameData.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#66c0f4" />
      </View>
    );
  }

  if (!game) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Erro ao carregar os dados do jogo.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: game.header_image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{game.name}</Text>
        
        <TouchableOpacity 
          style={[
            styles.favoriteButton, 
            isFavorite(appid) ? styles.favoriteActive : styles.favoriteInactive
          ]}
          onPress={() => toggleFavorite(appid)}
        >
          <Text style={styles.favoriteText}>
            {isFavorite(appid) ? '★ Remover da Wishlist' : '☆ Adicionar à Wishlist'}
          </Text>
        </TouchableOpacity>

        {game.price_overview && (
          <Text style={styles.price}>{game.price_overview.final_formatted}</Text>
        )}
        
        <Text style={styles.description}>{game.short_description}</Text>
        
        <View style={styles.genresContainer}>
          {game.genres?.map((genre) => (
            <Text key={genre.id} style={styles.genreTag}>{genre.description}</Text>
          ))}
        </View>

        {game.developers && (
          <Text style={styles.developer}>Desenvolvedor: {game.developers.join(', ')}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b2838',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#1b2838',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  favoriteButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  favoriteActive: {
    backgroundColor: '#4c6b22',
  },
  favoriteInactive: {
    backgroundColor: '#2a475e',
  },
  favoriteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#c6d4df',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#acb2b8',
    lineHeight: 20,
    marginBottom: 16,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  genreTag: {
    backgroundColor: '#2a475e',
    color: '#66c0f4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  developer: {
    color: '#8f98a0',
    fontSize: 12,
  }
});