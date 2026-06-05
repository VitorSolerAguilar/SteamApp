import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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