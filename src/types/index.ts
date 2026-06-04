export type Game = {
  appid: number;
  peak_in_game: number;
  image: string;
};

export type GameDetail = {
  name: string;
  short_description: string;
  header_image: string;
  price_overview?: {
    final_formatted: string;
  };
  genres?: { id: string; description: string }[];
  developers?: string[];
};

export type RootStackParamList = {
  GameList: undefined;
  GameDetail: { appid: number };
  Favorites: undefined;
};