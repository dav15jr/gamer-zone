import Image from 'next/image';
import React from 'react';

export default function Banner({ gameBanner }) {
  return (
    <div className="relative">
      <div className="absolute bottom-0 p-5 bg-gradient-to-t from-slate-900 to-transparent w-full rounded-b-2xl">
        <h1 className="text-3xl font-bold text-white">
          {gameBanner.name} - ⭐{gameBanner.rating}
        </h1>
      </div>
      <Image
        src={gameBanner.background_image}
        alt={gameBanner.name}
        width={800}
        height={800}
        priority
        className="h-[200px] sm:h-[300px] md:h-[400px] w-full object-cover rounded-2xl"
      />
    </div>
  );
}
