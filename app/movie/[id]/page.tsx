import { NextPage } from "next";
import Image from "next/image";
import styles from "./Movie.module.css";
import { genreAndColors } from "@/resources/genreAndColors";
import imdb from "@/resources/logos/imdb.png";
import bookmyshow from "@/resources/logos/bookmyshow.png";
import fail_tomatoe from "@/resources/logos/fail_tomatoe.png";
import fresh_tomatoe from "@/resources/logos/fresh_tomatoe.png";
import tmdb from "@/resources/logos/tmdb.png";
import tomatoes from "@/resources/logos/tomatoes.jpg";
import Link from "next/link";
import Recommendations from "@/components/Recommendations";
import CrewAndCast from "@/components/CrewAndCast";

//fetch api calls

const fetchTMDBData = async (id: string) => {
  try {
    const tmdbResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=d308de6f3b996ae3b334cbb6527cffc7&append_to_response=credits,videos,similar,reviews`
    );
    if (!tmdbResponse.ok) {
      console.log("Failed");
    }
    return await tmdbResponse.json();
  } catch (e) {
    console.log("Failed to fetch data: ", e);
  }
};

const fetchOMDBData = async (imdbid: string) => {
  try {
    const omdbResponse = await fetch(
      `http://www.omdbapi.com/?i=${imdbid}&plot=short&apikey=42a36590`
    );
    if (!omdbResponse.ok) {
      console.log("Failed");
    }
    return await omdbResponse.json();
  } catch (e) {
    console.log("Failed to fetch data: ", e);
  }
};

const fetchTheaterMovies = async () => {
  try {
    const fetchTheaterMovies = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=in&api_key=d308de6f3b996ae3b334cbb6527cffc7`
    );
    if (!fetchTheaterMovies.ok) {
      console.log("Failed");
    }
    return await fetchTheaterMovies.json();
  } catch (e) {
    console.log("Failed to fetch data: ", e);
  }
};

const fetchWatchProviders = async (id: string) => {
  try {
    const watchProvidersResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=d308de6f3b996ae3b334cbb6527cffc7`
    );
    if (!watchProvidersResponse.ok) {
      console.log("Failed");
    }
    return await watchProvidersResponse.json();
  } catch (e) {
    console.log("Failed to fetch data: ", e);
  }
};

//Main Function

const Page: NextPage<{ params: { id: string } }> = async ({ params }) => {
  // api calls
  const tmdbData = await fetchTMDBData(params?.id);
  const omdbData = await fetchOMDBData(tmdbData?.imdb_id);
  const theaterMovies = await fetchTheaterMovies();
  const watchProvidersData = await fetchWatchProviders(tmdbData?.id);

  // data assignment
  const poster_image = `https://image.tmdb.org/t/p/original/${tmdbData?.poster_path}`;
  const background_image = `https://image.tmdb.org/t/p/original/${tmdbData?.backdrop_path}`;

  const name = tmdbData?.title || omdbData?.Title;
  const year = omdbData?.Year || omdbData?.Released;
  const plot = omdbData?.Plot || tmdbData?.overview;

  const directorsArray = tmdbData?.credits?.crew.filter(
    (person: { job: string }) => person.job === "Director"
  );
  const writersArray = tmdbData?.credits?.crew
    .filter(
      (person: { job: string }) =>
        person.job === "Writer" ||
        person.job === "Screenplay" ||
        person.job === "Story"
    )
    .slice(0, 3);
  const writer = omdbData.Writer;

  const runtime = `${Math.floor(tmdbData?.runtime / 60)}h ${
    tmdbData?.runtime % 60
  }m`;

  const imdbRating =
    omdbData?.Ratings?.find(
      (rating: { Source: string; value: string }) =>
        rating.Source === "Internet Movie Database"
    )?.Value ||
    omdbData?.imdbRating ||
    "N/A";
  const tomatoes_rating =
    omdbData?.Ratings?.find(
      (rating: { Source: string; value: string }) =>
        rating.Source === "Rotten Tomatoes"
    )?.Value || "N/A";

  const tmdb_rating =
    tmdbData?.vote_average > 0
      ? `${tmdbData.vote_average.toFixed(1)}/10`
      : "N/A";
  const tomatoimage = !isNaN(parseInt(tomatoes_rating, 10))
    ? parseInt(tomatoes_rating, 10) > 60
      ? fresh_tomatoe
      : fail_tomatoe
    : tomatoes;

  const watchOptionsArrayIN =
    watchProvidersData?.results?.IN?.flatrate ||
    watchProvidersData?.results?.IN?.ads ||
    "N/A";
  const isAvailableInTheaters = theaterMovies?.results?.some(
    (movie: { id: number }) => movie.id === tmdbData?.id
  );

  const castArray = tmdbData?.credits?.cast
    .filter((person: { profile_path: string }) => person.profile_path)
    .slice(0, 6);
  const similarArray = tmdbData?.similar?.results
    .filter((movie: { poster_path: string }) => movie.poster_path)
    .slice(0, 5);
  const trailer = tmdbData?.videos?.results?.filter(
    (video: { type: string }) => video.type === "Trailer"
  );

  const isTrailerAvailable = trailer?.length > 0;

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${background_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.contentContainer}>
        {tmdbData?.title && (
          <div className={styles.section1}>
            <div className={styles.posterContainer}>
              <Image
                src={poster_image}
                height={350}
                width={233}
                alt={`${name} - movie poster`}
                quality={80}
              />
            </div>
            <div className={styles.info}>
              <h1 className={styles.movieName}>{`${name} (${
                year || "N/A"
              })`}</h1>
              <div className={styles.genres}>
                {tmdbData?.genres?.map(
                  (genre: { id: number; name: string }) => (
                    <div
                      className={styles.genre}
                      key={genre.id}
                      style={{ backgroundColor: genreAndColors[genre.id] }}
                    >
                      <Link href={`/genres/${genre.id}/1`}>{genre.name}</Link>
                    </div>
                  )
                )}
              </div>
              <div className={styles.plot}>{plot}</div>
              <div className={styles.director}>
                <div className={styles.title}>Director:</div>
                <div className={styles.data}>
                  {directorsArray?.map(
                    (director: { id: number; name: string }) => (
                      <div className={styles.credit} key={director.id}>
                        <Link href={`/people/${director.id}`}>
                          {director.name}
                        </Link>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className={styles.writer}>
                <div className={styles.title}>Writer:</div>
                <div className={styles.data}>
                  {writersArray?.map((writer: { id: number; name: string }) => (
                    <div className={styles.credit} key={writer.id}>
                      <Link href={`/people/${writer.id}`}>{writer.name}</Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.cast}>
                <div className={styles.title}>Cast:</div>
                <div className={styles.data}>
                  {castArray
                    ?.slice(0, 3)
                    .map((cast: { id: number; name: string }) => (
                      <div className={styles.credit} key={cast.id}>
                        <Link href={`/people/${cast.id}`}>{cast.name}</Link>
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.runtime}>
                <div className={styles.title}>Runtime:</div>
                <div className={styles.data}>{runtime}</div>
              </div>
              <div className={styles.ratings}>
                <div className={styles.source}>
                  <Image src={imdb} alt='imdb' height={40} width={40} />
                  <div className={styles.rating}>{imdbRating}</div>
                </div>
                <div className={styles.source}>
                  <Image src={tmdb} alt='tmdb' height={40} width={40} />
                  <div className={styles.rating}>{tmdb_rating}</div>
                </div>
                <div className={styles.source}>
                  <Image
                    src={tomatoimage}
                    alt='rotton tomatoes'
                    height={40}
                    width={40}
                  />
                  <div className={styles.rating}>{tomatoes_rating}</div>
                </div>
              </div>
              <div className={styles.streamingInfo}>
                <div className={styles.title}>Watch Options in India: </div>
                {isAvailableInTheaters && (
                  <Link
                    href={"https://in.bookmyshow.com/explore/movies"}
                    target='_blank'
                  >
                    <Image
                      src={bookmyshow}
                      alt='bookmyshow'
                      height={40}
                      width={40}
                    />
                  </Link>
                )}
                {!isAvailableInTheaters && (
                  <div className={styles.streamingData}>
                    {watchOptionsArrayIN !== "N/A" &&
                    watchOptionsArrayIN?.length > 0
                      ? watchOptionsArrayIN?.map(
                          (option: {
                            provider_id: number;
                            provider_name: string;
                            logo_path: string;
                          }) => (
                            <div key={option.provider_id}>
                              <Image
                                src={`https://image.tmdb.org/t/p/original/${option.logo_path}`}
                                alt={`${option.provider_name} - logo`}
                                height={40}
                                width={40}
                              />
                            </div>
                          )
                        )
                      : "N/A"}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Cast and Crew */}
        {tmdbData?.title ? (
          <CrewAndCast castArray={castArray} />
        ) : (
          <div style={{ color: "white", fontSize: "20px" }}>
            Movie Not Found
          </div>
        )}
        {/* Trailer Videos */}
        {isTrailerAvailable && (
          <div className={styles.trailer}>
            <iframe
              width='800'
              height='450'
              src={`https://www.youtube.com/embed/${trailer[0].key}`}
              title='YouTube Video'
              frameBorder='0'
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Reviews */}
      </div>
      <Recommendations similarArray={similarArray} />
    </div>
  );
};

export default Page;
