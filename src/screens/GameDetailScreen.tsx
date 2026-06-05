import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { storeApi } from '../services/steamApi';
import { GameDetail, RootStackParamList } from '../types';
import { WishlistContext } from '../context/WishlistContext';
import { styles } from './GameDetailScreenStyles';

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
            {isFavorite(appid) ? '★ Remover da lista de desejos' : '☆ Adicionar à lista de desejos'}
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