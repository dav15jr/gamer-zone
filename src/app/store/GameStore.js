import { create } from 'zustand';

const useGameStore = create((set) => ({
  gamesList: [],
  searchQuery: '',
  setGameList: (games) => set({ gamesList: games }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  clearSearch: () => set({ searchQuery: '' }),
}));

export { useGameStore };
