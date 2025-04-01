'use client';

import Image from 'next/image';
import { useGenreStore } from '../app/store/GenreStore';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export function GenreList({ genreList }) {
  const { activeGenre, setActiveGenre } = useGenreStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleGenreSelect = (genre) => {
    setActiveGenre({ id: genre.id, name: genre.name });
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-w-[120px]">
      {/* Mobile Dropdown */}
      <div className="md:hidden relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[30px] font-bold dark:text-white">Genre</h2>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white dark:bg-purple-700 rounded-lg hover:bg-purple-500 dark:hover:bg-purple-600 transition-colors"
          >
            <span className="font-semibold">
              {activeGenre.name || 'Select Genre'}
            </span>
            {isDropdownOpen ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
        </div>

        {isDropdownOpen && (
          <div className="absolute z-50 align-center w-full mt-2  dark:bg-gray-800 rounded-lg bg-purple-100 shadow-lg">
            {genreList.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreSelect(genre)}
                className={`w-full text-left p-3 flex justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  activeGenre.id === genre.id
                    ? 'bg-purple-100 dark:bg-purple-900'
                    : ''
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop List View */}
      <div className="hidden md:block">
        <h2 className="text-[30px] font-bold dark:text-white">Genre</h2>
        {genreList.map((genre) => (
          <div
            key={genre.id}
            onClick={() => handleGenreSelect(genre)}
            className={`flex flex-col xl:flex-row gap-5 items-center mb-2 cursor-pointer hover:bg-gray-300 p-2 group rounded-lg hover:dark:bg-gray-600 ${
              activeGenre.id === genre.id ? 'bg-gray-300 dark:bg-gray-600' : ''
            }`}
          >
            <Image
              src={genre.image_background}
              alt={genre.name}
              width={800}
              height={500}
              className={`object-cover rounded-lg group-hover:scale-105 transition-all ease-out duration-300 w-[200px] h-[100px] ${
                activeGenre.id === genre.id ? 'scale-105' : ''
              }`}
            />
            <h3
              className={`dark:text-white text-[18px] group-hover:font-bold transition-all ease-out duration-300 ${
                activeGenre.id === genre.id ? 'font-bold' : ''
              }`}
            >
              {genre.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
