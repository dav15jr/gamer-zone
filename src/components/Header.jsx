'use client';

import logo from '@/assets/Images/logo.png';
import Image from 'next/image';
import { Moon, Sun, ScrollText, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import SearchForm from './SearchForm';
import Link from 'next/link';
import { useGameStore } from '../app/store/GameStore';
import { useState } from 'react';

export default function Header() {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const { setSearchQuery } = useGameStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full my-3 bg-white dark:bg-gray-900 shadow-sm">
      <div className="px-2  sm:max-w-10/12 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                width={50}
                height={50}
                alt="Gamer Zone Logo"
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center flex-1 max-w-2xl">
            <div className="w-full">
              <SearchForm onSearch={handleSearch} />
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="hidden justify-end md:flex md:items-center md:space-x-4">
            <Link
              href="/wishlist"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              <ScrollText size={24} />
            </Link>
            <button
              onClick={() =>
                setTheme(currentTheme === 'light' ? 'dark' : 'light')
              }
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              {currentTheme === 'light' ? (
                <Moon size={24} />
              ) : (
                <Sun size={24} />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <SearchForm onSearch={handleSearch} />
              <div className="flex items-center justify-center space-x-6">
                <Link
                  href="/wishlist"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <ScrollText size={24} />
                </Link>
                <button
                  onClick={() =>
                    setTheme(currentTheme === 'light' ? 'dark' : 'light')
                  }
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  {currentTheme === 'light' ? (
                    <Moon size={24} />
                  ) : (
                    <Sun size={24} />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
