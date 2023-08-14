import type { NextPage } from 'next';
import Top100Card from '@/components/Top100Card';

type Movie = {
  id: string;
  title: string;
  rating: string;
  year: number;
  image: string;
  imdbid: string;
  trailer: string;
  rank: number;
};

async function fetchData() {
  const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8e1c4ac21emshff43004a5fdfdfbp1ed383jsn44faf3e89dcb',
      'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
    },
  };
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

const Top100: NextPage = async () => {
  const movies = await fetchData();
  return (
    <div className="flex flex-row flex-wrap justify-around">
      {movies.map((movie: Movie) => (
        <Top100Card
          key={movie.id}
          name={movie.title}
          rating={movie.rating}
          year={movie.year}
          image={movie.image}
          rank={movie.rank}
        />
      ))}
    </div>
  );
};

export default Top100;
