import React from 'react';
import { useWishListStore } from '../app/store/WishListStore';
import { useGameStore } from '../app/store/GameStore';
import Image from 'next/image';
import { X } from 'lucide-react';

const SearchResults = ({ games, onGameSelect, selectedGame }) => {
  const { wishList, addToWishList, removeFromWishList } = useWishListStore();
  const { clearSearch } = useGameStore();
  const isInWishList = (gameId) => {
    return wishList.some((game) => game.id === gameId);
  };

  const handleWishList = (e, game) => {
    e.stopPropagation(); // Prevent triggering the game selection
    if (isInWishList(game.id)) {
      removeFromWishList(game.id);
    } else {
      addToWishList(game);
    }
  };

  if (!games || games.length === 0) {
    return <p>No games found matching your search.</p>;
  }

  return (
    <div className="search-results relative bg-purple-400 dark:bg-purple-950 p-3 rounded-lg">
      <h2 className="text-3xl font-bold py-3">Search Results</h2>
      <button
        onClick={clearSearch}
        className="absolute top-6 right-6 p-2 rounded-full hover:text-red-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
        title="Close search results"
      >
        <X size={20} />
      </button>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 py-5">
        {games.map((game) => (
          <div
            key={game.id}
            className=" bg-purple-300 dark:bg-purple-900 rounded-lg p-3 cursor-pointer hover:dark:bg-purple-700 hover:bg-purple-200 hover:scale-110 transition-all ease-in-out duration-300 relative"
            onClick={() => onGameSelect(game)}
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

            {game.background_image ? (
              <Image
                src={game.background_image}
                alt={game.name}
                width={500}
                height={300}
                className="object-cover w-full h-[150px] rounded-lg"
              />
            ) : (
              <div className="w-full h-[150px] bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">
                  No image available
                </span>
              </div>
            )}
            <h2 className="text-[20px] font-bold dark:text-white">
              {game.name}
              <span className="p-1 rounded-sm ml-2 text-sm bg-green-100 text-green-700 align-center font-medium">
                {game.metacritic ? game.metacritic : 'n/a'}
              </span>
            </h2>
            <h2 className="text-[16px] text-gray-600 dark:text-gray-300 justify-between">
              ⭐{game.rating} 🔞
              {game.esrb_rating ? game.esrb_rating?.name : 'N/A'}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
