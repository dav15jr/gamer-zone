'use client';

import logo from '@/assets/Images/logo.png';
import Image from 'next/image';
import { Moon, Sun, Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import GameSearch from './GameSearch';
import Link from 'next/link';

export default function Header() {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

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
      <div className="flex bg-slate-200 dark:bg-slate-800 p-2 w-full mx-5 rounded-full items-center">
        <Search height={20} />
        <GameSearch />
      </div>
      <div className="cursor-pointer">
        {currentTheme === 'light' ? (
          <Moon className="" onClick={() => setTheme('dark')} />
        ) : (
          <Sun className="" onClick={() => setTheme('light')} />
        )}
      </div>
    </div>
  );
}
