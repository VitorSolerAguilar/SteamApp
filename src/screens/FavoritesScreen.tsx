import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { WishlistContext } from '../context/WishlistContext';
import { styles } from './FavoritesScreenStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

export default function FavoritesScreen({ navigation }: Props) {
  const { wishlist, toggleFavorite } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Sua Lista de desejos está vazia.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: number }) => (
    <View style={styles.card}>
      <Text style={styles.appidText}>AppID: {item}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('GameDetail', { appid: item })}
        >
          <Text style={styles.buttonText}>Ver Detalhes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => toggleFavorite(item)}
        >
          <Text style={styles.buttonText}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}