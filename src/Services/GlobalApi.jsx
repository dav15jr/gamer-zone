const API_KEY = process.env.API_KEY;
console.log(API_KEY);

export default async function getGlobalData () {
  const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  const data = await response.json();
  console.log(data);
//   return data;
}