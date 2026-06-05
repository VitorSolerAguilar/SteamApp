import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  },
});