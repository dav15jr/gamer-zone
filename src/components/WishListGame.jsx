'use client';

import React from 'react';
import { useWishListStore } from '../app/store/WishListStore';
import Image from 'next/image';

const WishListGame = ({ game }) => {
  const { removeFromWishList } = useWishListStore();

  return (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-5 cursor-pointer hover:dark:bg-gray-800 hover:bg-gray-200 hover:scale-110 transition-all ease-in-out duration-300 relative">
      <button
        onClick={() => removeFromWishList(game.id)}
        className="absolute top-7 right-7 p-2 rounded-full z-10 bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
        title="Remove from Wishlist"
      >
        ❤️
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
  );
};

export default WishListGame;
