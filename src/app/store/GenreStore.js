import { create } from 'zustand';

export const useGenreStore = create((set) => ({
  activeGenre: {id : '4' , name : 'Action'},
  setActiveGenre: (genre) => set({ activeGenre: genre }),
}));
