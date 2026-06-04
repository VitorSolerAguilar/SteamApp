import React, { createContext, useState, ReactNode } from 'react';

type WishlistContextData = {
  wishlist: number[];
  toggleFavorite: (appid: number) => void;
  isFavorite: (appid: number) => boolean;
};

export const WishlistContext = createContext<WishlistContextData>({} as WishlistContextData);

type ProviderProps = {
  children: ReactNode;
};

export function WishlistProvider({ children }: ProviderProps) {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleFavorite = (appid: number) => {
    setWishlist((prev) => {
      if (prev.includes(appid)) {
        return prev.filter((id) => id !== appid);
      } else {
        return [...prev, appid];
      }
    });
  };

  const isFavorite = (appid: number) => {
    return wishlist.includes(appid);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleFavorite, isFavorite }}>
      {children}
    </WishlistContext.Provider>
  );
}