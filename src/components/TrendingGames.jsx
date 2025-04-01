'use client';
import Image from 'next/image';
import React from 'react';
import { useWishListStore } from '../app/store/WishListStore';

export default function TrendingGames({ gamesList }) {
  const { wishList, addToWishList, removeFromWishList } = useWishListStore();

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

  return (
    <div className="mt-5 hidden md:block">
      <h2 className="text-3xl font-bold mt-5">Trending Games</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 py-5">
        {gamesList.map(
          (game, index) =>
            index < 4 && (
              <div
                key={game.id}
                className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 cursor-pointer hover:dark:bg-gray-800 hover:bg-gray-200 hover:scale-110 transition-all ease-in-out duration-300 relative"
              >
                <button
                  onClick={(e) => handleWishList(e, game)}
                  className={`absolute top-7 right-7 p-2 rounded-full z-10 
                ${
                  isInWishList(game.id)
                    ? 'bg-red-500 text-white'
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
                  src={game.background_image ? game.background_image : null}
                  alt={game.name}
                  width={800}
                  height={500}
                  priority
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
            )
        )}
      </div>
    </div>
  );
}
