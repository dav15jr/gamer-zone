import { create } from 'zustand';

export const useGameStore = create((set) => ({
  gameList: [],
  setGameList: (gameList) => set({ gameList }),
}));