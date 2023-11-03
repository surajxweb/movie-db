import styles from "./Homepage.module.css";
import Image from "next/image";
import header from "@/resources/header.png";
import Link from "next/link";
import DiscoverCarousel from "@/components/DiscoverCarousel";

const fetchTrending = async () => {
  const trendingResponse = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDBchabi}`,
    { next: { revalidate: 3600 } }
  );

  if (!trendingResponse.ok) {
    console.log("Failed");
  }

  return await trendingResponse.json();
};

const fetchShows = async () => {
  const showResponse = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.TMDBchabi}`,
    { next: { revalidate: 3600 } }
  );

  if (!showResponse.ok) {
    console.log("Failed");
  }

  return await showResponse.json();
};

const fetchPeople = async () => {
  const peopleResponse = await fetch(
    `https://api.themoviedb.org/3/trending/person/day?api_key=${process.env.TMDBchabi}`,
    { next: { revalidate: 3600 } }
  );

  if (!peopleResponse.ok) {
    console.log("Failed");
  }

  return await peopleResponse.json();
};

const fetchTheaterMovies = async () => {
  const theaterMoviesResponse = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=in&api_key=${process.env.TMDBchabi}`,
    { next: { revalidate: 3600 } }
  );

  if (!theaterMoviesResponse.ok) {
    console.log("Failed");
  }
  return await theaterMoviesResponse.json();
};

const fetchUpcomingMovies = async () => {
  const uncomingMoviesResponse = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=us&api_key=${process.env.TMDBchabi}`,
    { next: { revalidate: 3600 } }
  );

  if (!uncomingMoviesResponse.ok) {
    console.log("Failed");
  }
  return await uncomingMoviesResponse.json();
};

const fetchTopMovies = async () => {
  const topMoviesResponse = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${process.env.TMDBchabi}`,
    { next: { revalidate: 3600 } }
  );

  if (!topMoviesResponse.ok) {
    console.log("Failed");
  }
  return await topMoviesResponse.json();
};

const fetchTopShows = async () => {
  const topShowsResponse = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=${process.env.TMDBchabi}`,
    { next: { revalidate: 3600 } }
  );

  if (!topShowsResponse.ok) {
    console.log("Failed");
  }
  return await topShowsResponse.json();
};

const Home = async () => {
  const trendingData = await fetchTrending();
  const trendingShows = await fetchShows();
  const theaterMovies = await fetchTheaterMovies();
  const upcomingMovies = await fetchUpcomingMovies();
  const topMovies = await fetchTopMovies();
  const topShows = await fetchTopShows();
  const trendingPeople = await fetchPeople();

  return (
    <>
      <div className={styles.header}>
        <Image
          unoptimized
          src={header}
          height={400}
          width={1500}
          alt="discover cinema like never before"
        />
      </div>
      <div className={styles.container}>
        {/* <h1 className={styles.heading}>Let&#39;s find you somthing to watch!</h1> */}
        <section>
          <h2 className={styles.subHeading}>Trending Movies</h2>
          <div className={styles.listContainer}>
            <DiscoverCarousel discoverMovies={trendingData.results} />
          </div>
        </section>
        <section>
          <h2 className={styles.subHeading}>Trending Shows</h2>
          <div className={styles.listContainer}>
            <DiscoverCarousel discoverMovies={trendingShows.results} />
          </div>
        </section>
        <section>
          <h2 className={styles.subHeading}>Trending People</h2>
          <div className={styles.listContainer}>
            <DiscoverCarousel discoverMovies={trendingPeople.results} />
          </div>
        </section>
        <section>
          <h2 className={styles.subHeading}>In Theatres</h2>
          <div className={styles.listContainer}>
            <DiscoverCarousel discoverMovies={theaterMovies.results} />
          </div>
        </section>
        <section>
          <h2 className={styles.subHeading}>Upcoming Movies</h2>
          <div className={styles.listContainer}>
            <DiscoverCarousel discoverMovies={upcomingMovies.results} />
          </div>
        </section>
        <section>
          <h2 className={styles.subHeading}>Top Rated Movies</h2>
          <div className={styles.listContainer}>
            <DiscoverCarousel discoverMovies={topMovies.results} />
          </div>
        </section>
        <section>
          <h2 className={styles.subHeading}>Top Rated Shows</h2>
          <div className={styles.listContainer}>
            <DiscoverCarousel discoverMovies={topShows.results} />
          </div>
        </section>
        <div className={styles.search}>
          <div className={styles.text}>
            Did not find what you are looking for?
          </div>
          <Link href={"/search"} className={styles.button}>
            Search
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
