import type { NextPage } from 'next';
import Top100Card from '@/components/Top100Card';
import styles from './Top100.module.css';
import Image from 'next/image';
import top100_header from '@/resources/top100_header.png';
import { top100DB } from '@/resources/top100DB';

type Movie = {
  id: string;
  title: string;
  rating: string;
  year: number;
  image: string;
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
  // const movies = await fetchData();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src={top100_header}
          height={400}
          width={1500}
          alt="discover cinema like never before"
        />
      </div>
      <h2 className={styles.subHeading}>Best of Cinema</h2>
      <div className={styles.list}>
        {top100DB.map((movie: Movie) => (
          <Top100Card
            key={movie.id}
            name={movie.title}
            rating={movie.rating}
            year={movie.year}
            image={movie.image}
            rank={movie.rank}
            id={movie.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Top100;
