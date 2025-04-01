'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} >
      <div className="flex bg-slate-200 dark:bg-slate-800 p-1.5 rounded-full items-center">
        <Search height={20} className="text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for games..."
          className="flex-1 p-2 text-sm sm:text-base bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
        />
        <button
          type="submit"
          className="px-4 sm:px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-colors text-sm sm:text-base"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
