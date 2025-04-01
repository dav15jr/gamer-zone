'use client';

import React from 'react';
import { useWishListStore } from '../store/WishListStore';
import WishListGame from '../../components/WishListGame';
import Link from 'next/link';
import GameSearch from '@/components/GameSearch';

export default function WishList() {
  const { wishList } = useWishListStore();

  if (!wishList || wishList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <h1 className="text-2xl font-bold mb-4">Your Wish List is Empty</h1>
        <p className="text-gray-600 mb-4">
          Start adding games to your wish list!
        </p>
        <Link
          href="/"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Search Games
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <GameSearch />
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl font-bold px-3">My Wish List</h1>
        <span className="text-gray-600 text-3xl">
          {' ('}{wishList.length} {wishList.length === 1 ? 'game)' : 'games)'}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishList.map((game) => (
          <WishListGame key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
