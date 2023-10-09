import styles from "@/app/movie/[id]/Movie.module.css";
import { NextPage } from "next";
import Image from "next/image";
import { genreAndColors } from "@/resources/genreAndColors";
import imdb from "@/resources/logos/imdb.png";
import tmdb from "@/resources/logos/tmdb.png";
import Link from "next/link";
import Recommendations from "@/components/Recommendations";
import CrewAndCast from "@/components/CrewAndCast";

const fetchTMDBData = async (id: string) => {
  const tmdbResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDBchabi}&append_to_response=credits,videos,similar,reviews`,
    { next: { revalidate: 3600 } }
  );
  if (!tmdbResponse.ok) {
    console.log("Failed");
  }
  return await tmdbResponse.json();
};

const fetchOMDBData = async (name: string, year: number) => {
  const omdbResponse = await fetch(
    `http://www.omdbapi.com/?t=${name}&y=${year}&apikey=${process.env.OMDBchabi}`,
    { next: { revalidate: 3600 } }
  );
  if (!omdbResponse.ok) {
    console.log("Failed");
  }
  return await omdbResponse.json();
};

const fetchWatchProviders = async (id: string) => {
  const watchProvidersResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${process.env.TMDBchabi}`,
    { next: { revalidate: 3600 } }
  );
  if (!watchProvidersResponse.ok) {
    console.log("Failed");
  }
  return await watchProvidersResponse.json();
};

const TVPage: NextPage<{ params: { id: string } }> = async ({ params }) => {
  // api calls
  const tmdbData = await fetchTMDBData(params.id);
  const watchProvidersData = await fetchWatchProviders(tmdbData?.id);

  const year = parseInt(tmdbData?.first_air_date?.substr(0, 4));
  const omdbData = await fetchOMDBData(tmdbData?.name, year);

  const poster_image = `https://image.tmdb.org/t/p/original/${tmdbData?.poster_path}`;
  const background_image = `https://image.tmdb.org/t/p/original/${tmdbData?.backdrop_path}`;

  const name = tmdbData?.name;
  const plot = tmdbData?.overview;
  const runtime = tmdbData?.episode_run_time
    ? `${tmdbData?.episode_run_time[0]} minutes`
    : "N/A";

  const productionArray = tmdbData?.production_companies?.slice(0, 2);

  const imdbRating =
    omdbData?.Ratings?.find(
      (rating: { Source: string; value: string }) =>
        rating.Source === "Internet Movie Database"
    )?.Value ||
    omdbData?.imdbRating ||
    "N/A";
  const tmdb_rating =
    tmdbData?.vote_average > 0
      ? `${tmdbData?.vote_average?.toFixed(1)}/10`
      : "N/A";

  const watchOptionsArrayIN =
    watchProvidersData?.results?.IN?.flatrate ||
    watchProvidersData?.results?.IN?.ads ||
    "N/A";

  const creatorsArray = tmdbData?.created_by?.slice(0, 3);
  const castArray = tmdbData?.credits?.cast
    .filter((person: { profile_path: string }) => person.profile_path)
    .slice(0, 6);
  // const reviewsArray = tmdbData.reviews.results.slice(0, 5);
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
        {tmdbData?.name && (
          <div className={styles.section1}>
            <div className={styles.posterContainer}>
              <Image
                unoptimized
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
                      <Link href={`/tv/genres/${genre.id}/1`}>
                        {genre.name}
                      </Link>
                    </div>
                  )
                )}
              </div>
              <div className={styles.mobilePosterContainer}>
                <Image
                  unoptimized
                  src={poster_image}
                  height={350}
                  width={233}
                  alt={`${name} - movie poster`}
                  quality={80}
                />
              </div>
              <div className={styles.plot}>{plot}</div>
              <div className={styles.director}>
                <div className={styles.title}>Creators:</div>
                <div className={styles.data}>
                  {creatorsArray?.map(
                    (creator: { id: number; name: string }) => (
                      <div className={styles.credit} key={creator.id}>
                        <Link href={`/people/${creator.id}`}>
                          {creator.name}
                        </Link>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className={styles.writer}>
                <div className={styles.title}>Production Company:</div>
                <div className={styles.data}>
                  {productionArray
                    ?.slice(0, 3)
                    .map((company: { id: number; name: string }) => (
                      <div className={styles.credit} key={company.id}>
                        {company.name}
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
                  <Image
                    unoptimized
                    src={imdb}
                    alt='imdb'
                    height={40}
                    width={40}
                  />
                  <div className={styles.rating}>{imdbRating}</div>
                </div>
                <div className={styles.source}>
                  <Image
                    unoptimized
                    src={tmdb}
                    alt='tmdb'
                    height={40}
                    width={40}
                  />
                  <div className={styles.rating}>{tmdb_rating}</div>
                </div>
              </div>
              <div className={styles.streamingInfo}>
                <div className={styles.title}>Watch Options in India: </div>

                <div className={styles.streamingData}>
                  {watchOptionsArrayIN !== "N/A" &&
                  watchOptionsArrayIN.length > 0
                    ? watchOptionsArrayIN?.map(
                        (option: {
                          provider_id: number;
                          provider_name: string;
                          logo_path: string;
                        }) => (
                          <div key={option.provider_id}>
                            <Image
                              unoptimized
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
              </div>
            </div>
          </div>
        )}
        {tmdbData?.name ? (
          <CrewAndCast castArray={castArray} />
        ) : (
          <div className={styles.notFound}>
            TV Show Not Found
          </div>
        )}
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
      </div>
      <Recommendations similarArray={similarArray} />
    </div>
  );
};

export default TVPage;
