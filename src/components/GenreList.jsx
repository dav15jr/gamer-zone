import Image from "next/image";


export default function GenreList({genreList}) {
  return (
    <div>
    <h2 className='text-[30px] font-bold dark:text-white '>Genre
    </h2>
        {genreList.map((genre) => (
        <div key={genre.id} className='text-[20px] dark:text-white'>
            {genre.name}
            <Image src={genre.image_background} alt={genre.name} width={50} height={50} />
        </div>
        ))}
    </div>
  )
}
