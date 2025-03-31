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
      <div className="md:grid gap-4 mt-5 md:grid-cols-3 lg:grid-cols-4">
        {gamesList.map(
          (game, index) =>
            index < 4 && (
              <div
                key={index}
                className="bg-zinc-50 dark:bg-slate-800 rounded-lg shadow-md group hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer relative"
              >
                <button
                  onClick={(e) => handleWishList(e, game)}
                  className={`absolute top-2 right-2 p-2 rounded-full z-10 
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
                  src={game.background_image}
                  alt={game.name}
                  width={500}
                  height={400}
                  className="object-cover rounded-t-lg h-[270px]"
                />
                <h2 className="text-[20px] font-bold p-2">{game.name}</h2>
              </div>
            )
        )}
      </div>
    </div>
  );
}
