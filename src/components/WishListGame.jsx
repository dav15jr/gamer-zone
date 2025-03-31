'use client';

import React from 'react';
import { useWishListStore } from '../app/store/WishListStore';

const WishListGame = ({ game }) => {
  const { removeFromWishList } = useWishListStore();

  return (
    <div className="game-card p-4 rounded-lg border hover:shadow-lg transition-all relative">
      {game.background_image && (
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-48 object-cover rounded-md mb-2"
        />
      )}
      <h3 className="font-semibold text-lg mb-2">{game.name}</h3>
      <div className="text-sm text-gray-600 mb-4">
        <p>Released: {game.released}</p>
        <p>Rating: {game.rating}/5</p>
        <p>Genres: {game.genres?.map((g) => g.name).join(', ')}</p>
        <p>
          Platforms: {game.platforms?.map((p) => p.platform.name).join(', ')}
        </p>
      </div>
      <button
        onClick={() => removeFromWishList(game.id)}
        className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
        title="Remove from Wishlist"
      >
        ❤️
      </button>
    </div>
  );
};

export default WishListGame;
