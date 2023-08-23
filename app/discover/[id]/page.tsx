import { NextPage } from "next";
import styles from "./Discover.module.css";
import DiscoverCard from "@/components/DiscoverCard";

export function generateStaticParams() {
  const discoverPages = [
    { id: "trendingmovies" },
    { id: "trendingshows" },
    { id: "theatres" },
    { id: "upcomingmovies" },
    { id: "topmovies" },
    { id: "topshows" },
    { id: "trendingpeople" },
  ];
  return discoverPages.map((page) => ({
    params: { id: page.id },
  }));
}

const fetchMovieData = async (url: string) => {
  const movieResponse = await fetch(url);
  if (!movieResponse.ok) {
    console.log("Could not fetch data.");
  }
  return await movieResponse.json();
};

type DiscoverProps = {
  params: {
    id: string;
  };
};

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  name: string;
  release_date: string;
  known_for_department: string;
  profile_path: string;
};

const Discover: NextPage<DiscoverProps> = async ({
  params,
}: {
  params: { id: string };
}) => {
  let apiURL = "";
  let heading;
  switch (params.id) {
    case "trendingmovies":
      apiURL =
        "https://api.themoviedb.org/3/trending/movie/week?api_key=d308de6f3b996ae3b334cbb6527cffc7";
      heading = "Movies Trending this Week";
      break;
    case "trendingshows":
      apiURL =
        "https://api.themoviedb.org/3/trending/tv/week?api_key=d308de6f3b996ae3b334cbb6527cffc7";
      heading = "TV Shows Trending this Week";
      break;
    case "trendingpeople":
      apiURL =
        "https://api.themoviedb.org/3/trending/person/week?api_key=d308de6f3b996ae3b334cbb6527cffc7";
      heading = "People Trending This Week";
      break;
    case "theatres":
      apiURL =
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=in&api_key=d308de6f3b996ae3b334cbb6527cffc7";
      heading = "Movies in Theatres Right Now";
      break;
    case "upcomingmovies":
      apiURL =
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=us&api_key=d308de6f3b996ae3b334cbb6527cffc7";
      heading = "Upcoming Movies";
      break;
    case "topmovies":
      apiURL =
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=d308de6f3b996ae3b334cbb6527cffc7";
      heading = "Top Rated Movies";
      break;
    case "topshows":
      apiURL =
        "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=d308de6f3b996ae3b334cbb6527cffc7";
      heading = "Top Rated Shows";
      break;
    default:
      heading = "No Data Found!";
  }

  const movieData = apiURL ? await fetchMovieData(apiURL) : [];
  console.log(movieData);

  return (
    <div className={styles.container}>
      {movieData.results?.length > 1 && (
        <>
          <h1 className={styles.heading}>{heading}</h1>
          <div className={styles.list}>
            {movieData.results.map((movie: Movie) => (
              <DiscoverCard
                key={movie.id}
                name={movie.release_date ? movie.title : movie.name}
                image={movie.poster_path || movie.profile_path}
                id={movie.id}
                release_date={movie.release_date}
                person_identity={movie.known_for_department}
              />
            ))}
          </div>
        </>
      )}
      {movieData.length < 1 && <div className="error">No Data Found!</div>}
    </div>
  );
};

export default Discover;
