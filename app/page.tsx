import DiscoverCard from '@/components/DiscoverCard';
import styles from './home.module.css';
import Image from 'next/image';
import header from '@/resources/header.png';
import Link from 'next/link';
import { BsLink45Deg } from 'react-icons/bs';

const fetchTrending = async () => {
  const trendingResponse = await fetch(
    'https://api.themoviedb.org/3/trending/movie/week?api_key=d308de6f3b996ae3b334cbb6527cffc7'
  );

  if (!trendingResponse.ok) {
    console.log('Failed');
  }

  return await trendingResponse.json();
};

const fetchShows = async () => {
  const showResponse = await fetch(
    'https://api.themoviedb.org/3/trending/tv/week?api_key=d308de6f3b996ae3b334cbb6527cffc7'
  );

  if (!showResponse.ok) {
    console.log('Failed');
  }

  return await showResponse.json();
};

const fetchTheaterMovies = async () => {
  const theaterMoviesResponse = await fetch(
    'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=in&api_key=d308de6f3b996ae3b334cbb6527cffc7'
  );

  if (!theaterMoviesResponse.ok) {
    console.log('Failed');
  }
  return await theaterMoviesResponse.json();
};

const fetchUpcomingMovies = async () => {
  const uncomingMoviesResponse = await fetch(
    'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=us&api_key=d308de6f3b996ae3b334cbb6527cffc7'
  );

  if (!uncomingMoviesResponse.ok) {
    console.log('Failed');
  }
  return await uncomingMoviesResponse.json();
};

const fetchTopMovies = async () => {
  const topMoviesResponse = await fetch(
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=d308de6f3b996ae3b334cbb6527cffc7'
  );

  if (!topMoviesResponse.ok) {
    console.log('Failed');
  }
  return await topMoviesResponse.json();
};

const fetchTopShows = async () => {
  const topShowsResponse = await fetch(
    'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=d308de6f3b996ae3b334cbb6527cffc7'
  );

  if (!topShowsResponse.ok) {
    console.log('Failed');
  }
  return await topShowsResponse.json();
};

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  name: string;
  release_date: string;
};

const Home = async () => {
  const trendingData = await fetchTrending();
  const trendingShows = await fetchShows();
  const theaterMovies = await fetchTheaterMovies();
  const upcomingMovies = await fetchUpcomingMovies();
  const topMovies = await fetchTopMovies();
  const topShows = await fetchTopShows();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src={header}
          height={400}
          width={1500}
          alt="discover cinema like never before"
        />
      </div>
      {/* <h1 className={styles.heading}>Let&#39;s find you somthing to watch!</h1> */}
      <section>
        <h2 className={styles.subHeading}>
          Trending Movies
          <Link href={'/movies'}>
            load more <BsLink45Deg className="reactIcons" />
          </Link>
        </h2>
        <div className={styles.listContainer}>
          {trendingData.results.slice(0, 5).map((movie: Movie) => (
            <DiscoverCard
              key={movie.id}
              name={movie.title}
              image={movie.poster_path}
              id={movie.id}
              release_date={movie.release_date}
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className={styles.subHeading}>
          Trending Shows
          <Link href={'/movies'}>
            load more <BsLink45Deg className="reactIcons" />
          </Link>
        </h2>
        <div className={styles.listContainer}>
          {trendingShows.results.slice(0, 5).map((movie: Movie) => (
            <DiscoverCard
              key={movie.id}
              name={movie.name}
              image={movie.poster_path}
              id={movie.id}
              release_date={movie.release_date}
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className={styles.subHeading}>
          In Theatres
          <Link href={'/movies'}>
            load more <BsLink45Deg className="reactIcons" />
          </Link>
        </h2>
        <div className={styles.listContainer}>
          {theaterMovies.results.slice(0, 5).map((movie: Movie) => (
            <DiscoverCard
              key={movie.id}
              name={movie.title}
              image={movie.poster_path}
              id={movie.id}
              release_date={movie.release_date}
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className={styles.subHeading}>
          Upcoming Movies
          <Link href={'/movies'}>
            load more <BsLink45Deg className="reactIcons" />
          </Link>
        </h2>
        <div className={styles.listContainer}>
          {upcomingMovies.results.slice(0, 5).map((movie: Movie) => (
            <DiscoverCard
              key={movie.id}
              name={movie.title}
              image={movie.poster_path}
              id={movie.id}
              release_date={movie.release_date}
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className={styles.subHeading}>
          Top Rated Movies
          <Link href={'/movies'}>
            load more <BsLink45Deg className="reactIcons" />
          </Link>
        </h2>
        <div className={styles.listContainer}>
          {topMovies.results.slice(0, 5).map((movie: Movie) => (
            <DiscoverCard
              key={movie.id}
              name={movie.title}
              image={movie.poster_path}
              id={movie.id}
              release_date={movie.release_date}
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className={styles.subHeading}>
          Top Rated Shows
          <Link href={'/movies'}>
            load more
            <BsLink45Deg className="reactIcons" />
          </Link>
        </h2>
        <div className={styles.listContainer}>
          {topShows.results.slice(0, 5).map((movie: Movie) => (
            <DiscoverCard
              key={movie.id}
              name={movie.name}
              image={movie.poster_path}
              id={movie.id}
              release_date={movie.release_date}
            />
          ))}
        </div>
      </section>
      <div className={styles.search}>
        <div className={styles.text}>
          Did not find what you are looking for?
        </div>
        <Link href={'/search'} className={styles.button}>
          Search
        </Link>
      </div>
    </div>
  );
};

export default Home;
