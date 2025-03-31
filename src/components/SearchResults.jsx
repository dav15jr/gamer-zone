import React from 'react';
import { useWishListStore } from '../app/store/WishListStore';

const SearchResults = ({ games, onGameSelect, selectedGame }) => {
  const { wishList, addToWishList, removeFromWishList } = useWishListStore();

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
    <div className="search-results">
      <h2 className="text-xl font-bold mb-4">Search Results</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 py-5">
        {games.map((game) => (
          <div
            key={game.id}
            className={`game-card p-4 rounded-lg border hover:shadow-lg transition-all relative
              ${
                selectedGame && selectedGame.id === game.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
            onClick={() => onGameSelect(game)}
          >
            {game.background_image && (
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
            )}
            <h3 className="font-semibold text-lg mb-2">{game.name}</h3>
            <div className="text-sm text-gray-600">
              <p>Released: {game.released}</p>
              <p>Rating: {game.rating}/5</p>
            </div>
            <button
              onClick={(e) => handleWishList(e, game)}
              className={`absolute top-2 right-2 p-2 rounded-full ${
                isInWishList(game.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              title={
                isInWishList(game.id)
                  ? 'Remove from Wishlist'
                  : 'Add to Wishlist'
              }
            >
              {isInWishList(game.id) ? '❤️' : '🤍'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
