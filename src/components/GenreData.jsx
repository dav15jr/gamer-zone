import React from 'react'
const API_KEY = process.env.API_KEY;
import GenreList from './GenreList';
export default async function GenreData() {

  const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const genreList = data.results;
  console.log(genreList);

  return (
        <GenreList genreList={genreList} />
  )
}
