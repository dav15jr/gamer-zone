'use client';

import React, { useState, useEffect } from 'react';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
import { useGameStore } from '../app/store/GameStore';
import SearchResults from './SearchResults';
import { useWishListStore } from '../app/store/WishListStore';

const GameSearch = ({ gamesData }) => {
  const [query, setQuery] = useState('');
  const [gameSearch, setGameSearch] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const { gamesList, setGameList } = useGameStore();
  const { wishList, addToWishList, removeFromWishList } = useWishListStore();

  useEffect(() => {
    if (gamesData) {
      setGameList(gamesData);
    }
  }, [gamesData, setGameList]);

  const searchGames = async (e) => {
    e.preventDefault();
    if (!query) return;

    if (!API_KEY) {
      setError('API key is missing. Check your environment variables.');
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedGame(null); // Clear any previously selected game

    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}`
      );

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      setGameSearch(data.results);
    } catch (error) {
      console.error('Error searching games:', error);
      setError(`Failed to search games: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    // Here you can also add any additional actions when a game is selected
    // For example, updating your global store or navigating to a detail page
    console.log('Selected game:', game);
  };

  const isInWishList = (gameId) => {
    return wishList.some((game) => game.id === gameId);
  };

  const handleWishList = (game) => {
    if (isInWishList(game.id)) {
      removeFromWishList(game.id);
    } else {
      addToWishList(game);
    }
  };

  return (
    <div className="game-search-container p-4">
      <form onSubmit={searchGames} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for games..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <div className="flex justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="flex gap-6">
          {/* Search Results Section */}
          <div className="flex-1">
            {gameSearch && (
              <SearchResults
                games={gameSearch}
                onGameSelect={handleGameSelect}
                selectedGame={selectedGame}
              />
            )}
          </div>

          {/* Selected Game Details Section */}
          {selectedGame && (
            <div className="w-1/3 selected-game-details p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">Game Details</h2>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishList(selectedGame);
                    }}
                    className={`p-2 rounded-lg ${
                      isInWishList(selectedGame.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    title={
                      isInWishList(selectedGame.id)
                        ? 'Remove from Wishlist'
                        : 'Add to Wishlist'
                    }
                  >
                    {isInWishList(selectedGame.id) ? '❤️' : '🤍'}
                  </button>
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              </div>
              {selectedGame.background_image && (
                <img
                  src={selectedGame.background_image}
                  alt={selectedGame.name}
                  className="w-full rounded-lg mb-4"
                />
              )}
              <h3 className="text-lg font-semibold mb-2">
                {selectedGame.name}
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>Released:</strong> {selectedGame.released}
                </p>
                <p>
                  <strong>Rating:</strong> {selectedGame.rating}/5
                </p>
                <p>
                  <strong>Genres:</strong>{' '}
                  {selectedGame.genres?.map((g) => g.name).join(', ')}
                </p>
                <p>
                  <strong>Platforms:</strong>{' '}
                  {selectedGame.platforms
                    ?.map((p) => p.platform.name)
                    .join(', ')}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameSearch;
