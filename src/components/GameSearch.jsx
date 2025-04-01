'use client';

import React, { useState, useEffect } from 'react';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
import { useGameStore } from '../app/store/GameStore';
import SearchResults from './SearchResults';
import { useWishListStore } from '../app/store/WishListStore';
import { X } from 'lucide-react';

const GameSearch = ({ gamesData }) => {
  const [gameSearch, setGameSearch] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const { gamesList, setGameList, searchQuery, clearSearch } = useGameStore();
  const { wishList, addToWishList, removeFromWishList } = useWishListStore();

  useEffect(() => {
    if (gamesData) {
      setGameList(gamesData);
    }
  }, [gamesData, setGameList]);

  useEffect(() => {
    const searchGames = async () => {
      if (!searchQuery) return;

      if (!API_KEY) {
        setError('API key is missing. Check your environment variables.');
        return;
      }

      setLoading(true);
      setError(null);
      setSelectedGame(null);

      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchQuery}&search_precise=true&ordering=-added`
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

    searchGames();
  }, [searchQuery]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
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

  if (!searchQuery) {
    return null;
  }

  return (
    <div className="game-search-container p-4 relative">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <div className="flex justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-4">
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
            <div className="w-1/2 lg:w-1/3 h-full selected-game-details p-4 border rounded-lg bg-purple-200 dark:bg-purple-800">
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
                        ? 'bg-red-300 text-white'
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
                    className="text-gray-700 hover:text-red-700 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    <X size={20} />
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
                  <strong>MetaScore:</strong>{' '}
                  {selectedGame.metacritic ? selectedGame.metacritic : 'n/a'}
                </p>
                <p>
                  <strong>Rating:</strong> {selectedGame.rating}/5
                </p>
                <p>
                  <strong>Playtime:</strong> {selectedGame.playtime}
                  {' hour/s'}
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
