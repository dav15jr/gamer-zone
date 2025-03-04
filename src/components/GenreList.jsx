'use client';

import Image from 'next/image';
import { useGenreStore } from '../app/store/GenreStore';

export function GenreList({ genreList }) {
  const { activeGenre, setActiveGenre } = useGenreStore();

  console.log('active', activeGenre);

  return (
    <div>
      <h2 className="text-[30px] font-bold dark:text-white ">Genre</h2>
      {genreList.map((genre) => (
        <div
          key={genre.id}
          onClick={() => setActiveGenre(genre.name)}
          className={`flex gap-5 items-center mb-2 cursor-pointer hover:bg-gray-300 p-2 group rounded-lg hover:dark:bg-gray-600 ${
            activeGenre === genre.name ? 'bg-gray-300 dark:bg-gray-600' : null
          }`}
        >
          <Image
            src={genre.image_background}
            alt={genre.name}
            width={800}
            height={500}
            className={`object-cover rounded-lg group-hover:scale-105 transition-all ease-out duration-300 w-[200px] h-[100px] ${
              activeGenre === genre.name ? 'scale-105' : null
            }`}
          />
          <h3
            className={`dark:text-white text-[18px] group-hover:font-bold transition-all ease-out duration-300 ${
              activeGenre === genre.name ? 'font-bold' : null
            }`}
          >
            {genre.name}
          </h3>
        </div>
      ))}
    </div>
  );
}
