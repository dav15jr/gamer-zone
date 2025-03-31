import React from 'react'
const API_KEY = process.env.API_KEY;
import GamesList from './GamesList';
import Banner from './Banner';
import TrendingGames from './TrendingGames';
import GameSearch from './GameSearch';

export default async function GamesData() {

  const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const gamesList = data.results;

  
  return (
    <div>
      <Banner gameBanner ={gamesList[0]}/>
      <TrendingGames gamesList={gamesList} />
      <GamesList api={API_KEY} />
    </div>
  )
}
