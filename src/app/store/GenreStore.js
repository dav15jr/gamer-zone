import { create } from 'zustand';

export const useGenreStore = create((set) => ({
  activeGenre: '',
  setActiveGenre: (genre) => set({ activeGenre: genre }),
}));
