'use client';

import logo from '@/assets/Images/logo.png';
import Image from 'next/image';
import { Moon, Sun, ScrollText } from 'lucide-react';
import { useTheme } from 'next-themes';
import SearchForm from './SearchForm';
import Link from 'next/link';
import { useGameStore } from '../app/store/GameStore';

export default function Header() {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const { setSearchQuery } = useGameStore();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex items-center p-3 justify-between">
      <Link href="/">
        <Image
          src={logo}
          width={60}
          height={60}
          alt="Gamer Zone Logo"
          className="cursor-pointer hover:opacity-80 transition-opacity"
        />
      </Link>

      <SearchForm onSearch={handleSearch} />

      <div className="cursor-pointer flex gap-4">
        <Link href="/wishlist">
          <ScrollText />
        </Link>
        {currentTheme === 'light' ? (
          <Moon className="" onClick={() => setTheme('dark')} />
        ) : (
          <Sun className="" onClick={() => setTheme('light')} />
        )}
      </div>
    </div>
  );
}
