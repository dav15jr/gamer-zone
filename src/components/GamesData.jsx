import React from 'react'
const API_KEY = process.env.API_KEY;
import GamesList from './GamesList';
import Banner from './Banner';

export default async function GamesData() {

  const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const gamesList = data.results;
  console.log(gamesList);

  return (
    <div>
    <Banner gameBanner ={gamesList[0]}/>
    <GamesList gamesList={gamesList} />
    </div>
  )
}
