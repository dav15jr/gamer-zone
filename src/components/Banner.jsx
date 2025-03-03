import Image from 'next/image'
import React from 'react'

export default function Banner({ gameBanner}) {



    
  return (
    <div className='relative h-[320px] md:h-[400px]'>
        <div className="absolute bottom-0">
            <h1 className="text-3xl font-bold text-white">{gameBanner.name} ({gameBanner.rating})</h1>
            <button className="bg-blue-700 text-white px-2 p-1">Add Now </button>
        </div>
        <Image src={gameBanner.background_image} width={400} height={400} className='h-[400px] w-full object-cover rounded-xl'/> 
    </div>
  )
}
