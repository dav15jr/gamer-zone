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
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex bg-slate-200 dark:bg-slate-800 p-2 rounded-full items-center">
        <Search height={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for games..."
          className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-400 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
