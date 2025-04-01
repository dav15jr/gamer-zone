'use client';
import { useEffect, useState } from 'react';
import { useGenreStore } from '../app/store/GenreStore';
import { useWishListStore } from '../app/store/WishListStore';
import Image from 'next/image';

export default function GamesList() {
  const { activeGenre } = useGenreStore();
  const [genreGames, setGenreGames] = useState([]);
  const { wishList, addToWishList, removeFromWishList } = useWishListStore();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const isInWishList = (gameId) => {
    return wishList.some((game) => game.id === gameId);
  };

  const handleWishList = (e, game) => {
    e.stopPropagation();
    if (isInWishList(game.id)) {
      removeFromWishList(game.id);
    } else {
      addToWishList(game);
    }
  };

  useEffect(() => {
    async function fetchGames() {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&genres=${activeGenre.id}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const gamesResults = data.results;

      setGenreGames(gamesResults);
    }

    fetchGames();
  }, [activeGenre]);

  return (
    <div>
      <h2 className="text-3xl font-bold py-3">{activeGenre.name} Games</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 py-5">
        {genreGames.map((game) => (
          <div
            key={game.id}
            className="bg-gray-100 dark:bg-gray-700 rounded-lg p-5 cursor-pointer hover:dark:bg-gray-800 hover:bg-gray-200 hover:scale-110 transition-all ease-in-out duration-300 relative"
          >
            <button
              onClick={(e) => handleWishList(e, game)}
              className={`absolute top-7 right-7 p-2 rounded-full z-10 
                ${
                  isInWishList(game.id)
                    ? 'bg-red-300 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500'
                } transition-all duration-300`}
              title={
                isInWishList(game.id)
                  ? 'Remove from Wishlist'
                  : 'Add to Wishlist'
              }
            >
              {isInWishList(game.id) ? '❤️' : '🤍'}
            </button>

            <Image
              src={game.background_image}
              alt={game.name}
              width={800}
              height={500}
              className="object-cover w-full h-[200px] rounded-lg"
            />
            <h2 className="text-[20px] font-bold dark:text-white">
              {game.name}
              <span className="p-1 rounded-sm ml-2 text-sm bg-green-100 text-green-700 align-center font-medium">
                {game.metacritic ? game.metacritic : 'n/a'}
              </span>
            </h2>
            <h2 className="text-[16px] text-gray-500 dark:text-gray-400">
              ⭐{game.rating} 🎮 {game.playtime}
              {' hrs'} 🔞{game.esrb_rating ? game.esrb_rating?.name : 'N/A'}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
