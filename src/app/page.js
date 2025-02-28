import GenreData from "@/components/GenreData";

export default function Home() {
  return (
    <div className='grid grid-cols-4 px-5'>
      <div className='bg-amber-600 col-span-1 h-full hidden md:block'>
        <GenreData />
      </div>
      <div className='bg-purple-700 col-span-4 md:col-span-3'>Game List</div>
    </div>
  )
}
