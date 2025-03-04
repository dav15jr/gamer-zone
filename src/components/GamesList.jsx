'use client';
import { useGenreStore } from '../app/store/GenreStore';
export default function GamesList() {
  const { activeGenre } = useGenreStore();

  console.log('active NOW', activeGenre);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 py-5">
      <p>wow {activeGenre} my</p>
    </div>
  );
}
