import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishListStore = create(
  persist(
    (set) => ({
      wishList: [],
      addToWishList: (game) =>
        set((state) => ({
          wishList: state.wishList.some((item) => item.id === game.id)
            ? state.wishList
            : [...state.wishList, game],
        })),
      removeFromWishList: (gameId) =>
        set((state) => ({
          wishList: state.wishList.filter((game) => game.id !== gameId),
        })),
      isInWishList: (gameId) =>
        set((state) => state.wishList.some((game) => game.id === gameId)),
    }),
    {
      name: 'wish-list-storage', // name of the item in local storage
    }
  )
);
