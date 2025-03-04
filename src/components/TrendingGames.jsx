import Image from 'next/image';
import React from 'react';

export default function TrendingGames({ gamesList }) {
  return (
    <div className="mt-5 hidden md:block">
          <h2 className='text-3xl font-bold mt-5' >Trending Games</h2>
    <div className="md:grid gap-4 mt-5 md:grid-cols-3 lg:grid-cols-4">
      {gamesList.map((game, index) => index<4&&(
        <div key={index} className='bg-zinc-50 dark:bg-slate-800 rounded-lg shadow-md group hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer'>
          <Image
            src={game.background_image}
            alt={game.name}
            width={500}
            height={400}
            
            className="object-cover rounded-t-lg  h-[270px]"
            />
            <h2 className='text-[20px] font-bold p-2' >{game.name}</h2>
        </div>
      ))}
    </div>
      </div>
  );
}
