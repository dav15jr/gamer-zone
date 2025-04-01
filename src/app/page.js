import GamesData from '@/components/GamesData';
import GenreData from '@/components/GenreData';

export default function Home() {
  return (
    <div className="grid grid-cols-4 px-5">
      <div className="row col-span-4 sm:col-span-1 h-full md:block">
        <GenreData />
      </div>
      <div className="col-span-4 md:col-span-3">
        <GamesData />
      </div>
    </div>
  );
}
