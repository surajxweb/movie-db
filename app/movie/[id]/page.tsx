import { NextPage } from "next";
import Image from "next/image";
import styles from "./Movie.module.css";
import { genreAndColors } from "@/resources/genreAndColors";
import { FaImdb } from "react-icons/fa";
import { SiRottentomatoes } from "react-icons/si";
import netflix from "@/resources/logos/netflix.png";
import primevideo from "@/resources/logos/primevideo.png";
import hotstar from "@/resources/logos/hotstar.png";
import zee5 from "@/resources/logos/zee5.png";
import bookmyshow from "@/resources/logos/bookmyshow.png";
import Link from "next/link";
import ReviewsAndTrailer from "@/components/ReviewsAndTrailer";
import Recommendations from "@/components/Recommendations";

const fetchTMDBData = async (id: string) => {
  const tmdbResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=d308de6f3b996ae3b334cbb6527cffc7`
  );
  if (!tmdbResponse.ok) {
    console.log("Failed");
  }
  return await tmdbResponse.json();
};

const fetchOMDBData = async (imdbid: string) => {
  const omdbResponse = await fetch(
    `http://www.omdbapi.com/?i=${imdbid}&plot=short&apikey=42a36590`
  );
  if (!omdbResponse.ok) {
    console.log("Failed");
  }
  return await omdbResponse.json();
};

const fetchMDBData = async (imdbid: string) => {
  const url = `https://mdblist.p.rapidapi.com/?i=${imdbid}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8e1c4ac21emshff43004a5fdfdfbp1ed383jsn44faf3e89dcb",
      "X-RapidAPI-Host": "mdblist.p.rapidapi.com",
    },
  };

  try {
    const mdbResponse = await fetch(url, options);
    return await mdbResponse.json();
  } catch (error) {
    console.error(error);
  }
};

// const fetchSDData = async (imdbid: string) => {
//   const url = `https://streaming-availability.p.rapidapi.com/get?imdb_id=${imdbid}&output_language=en`;
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "8e1c4ac21emshff43004a5fdfdfbp1ed383jsn44faf3e89dcb",
//       "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
//     },
//   };

//   try {
//     const sdResponse = await fetch(url, options);
//     return await sdResponse.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

const fetchTheaterMovies = async () => {
  const mdbResponse = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=in&api_key=d308de6f3b996ae3b334cbb6527cffc7`
  );
  if (!mdbResponse.ok) {
    console.log("Failed");
  }
  return await mdbResponse.json();
};

const Page: NextPage<{ params: { id: string } }> = async ({ params }) => {
  const tmdbData = await fetchTMDBData(params.id);
  const omdbData = await fetchOMDBData(tmdbData.imdb_id);
  const mdbData = await fetchMDBData(tmdbData.imdb_id);
  // const sdData = await fetchSDData(tmdbData.imdb_id);
  const theaterMovies = await fetchTheaterMovies();

  // Define the type for a single streaming info item
  interface StreamingInfoItem {
    service: string;
    streamingType: string;
    link: string;
    // Other properties...
  }

  // Define the array type for available streaming services
  type AvailableServicesArray = { service: string; link: string }[];

  const availableServicesArray: AvailableServicesArray = [];

  // sdData.result?.streamingInfo?.in?.forEach((item: StreamingInfoItem) => {
  //   if (
  //     item.service &&
  //     item.streamingType !== "rent" &&
  //     item.streamingType !== "buy" &&
  //     item.streamingType !== "addon"
  //   ) {
  //     const existingServiceIndex = availableServicesArray.findIndex(
  //       (serviceObj) => serviceObj.service === item.service
  //     );

  //     if (existingServiceIndex === -1) {
  //       availableServicesArray.push({ service: item.service, link: item.link });
  //     }
  //   }
  // });

  const isAvailableInTheaters = theaterMovies.results.some(
    (movie: { id: number }) => movie.id === tmdbData.id
  );

  // console.log(tmdbData.runtime);

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${tmdbData.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.contentContainer}>
        <div className={styles.posterContainer}>
          <Image
            src={`https://image.tmdb.org/t/p/original/${tmdbData.poster_path}`}
            height={350}
            width={233}
            alt={`${tmdbData.title} - movie poster`}
            quality={50}
          />
        </div>
        <div className={styles.info}>
          <h1 className={styles.movieName}>
            {`${tmdbData.title} (${omdbData.Year ? omdbData.Year : "N/A"})`}
          </h1>
          <div className={styles.genres}>
            {tmdbData.genres.map((genre: { id: number; name: string }) => (
              <div
                className={styles.genre}
                key={genre.id}
                style={{ backgroundColor: genreAndColors[genre.id] }}
              >
                {genre.name}
              </div>
            ))}
          </div>
          {/* <div className="delete">{tmdbData.imdb_id}</div> */}
          <div className={styles.plot}>{omdbData.Plot}</div>
          <div className={styles.director}>
            <div className={styles.title}>Director:</div>
            <div className={styles.data}>{omdbData.Director}</div>
          </div>
          <div className={styles.writer}>
            <div className={styles.title}>Writer:</div>
            <div className={styles.data}>{omdbData.Writer}</div>
          </div>
          <div className={styles.cast}>
            <div className={styles.title}>Cast:</div>
            <div className={styles.data}>{omdbData.Actors}</div>
          </div>
          <div className={styles.runtime}>
            <div className={styles.title}>Runtime:</div>
            <div className={styles.data}>{`${Math.floor(
              tmdbData.runtime / 60
            )}h ${tmdbData.runtime % 60}m`}</div>
          </div>
          <div className={styles.ratings}>
            <div className={styles.source}>
              <FaImdb size="2.8em" color="#dba506" />
              <div className={styles.rating}>
                {mdbData?.ratings && mdbData.ratings[0]?.source === "imdb"
                  ? mdbData.ratings[0]?.value > 0
                    ? mdbData.ratings[0].value
                    : "N/A"
                  : "N/A"}
              </div>
            </div>
            <div className={styles.source}>
              <SiRottentomatoes
                size="2.8em"
                color="#a94242"
                backgroundColor="black"
              />
              <div className={styles.rating}>
                {mdbData?.ratings && mdbData?.ratings[4]?.source === "tomatoes"
                  ? mdbData.ratings[4]?.value > 0
                    ? `${mdbData.ratings[4].value}%`
                    : "N/A"
                  : "N/A"}
              </div>
            </div>
          </div>
          <div className={styles.streamingInfo}>
            <div className={styles.title}>Watch Options in India: </div>
            {isAvailableInTheaters && (
              <Link
                href={"https://in.bookmyshow.com/explore/movies"}
                target="_blank"
              >
                <Image
                  src={bookmyshow}
                  height={40}
                  width={40}
                  alt="bookmyshow"
                />
              </Link>
            )}
            {!isAvailableInTheaters && (
              <div className={styles.streamingData}>
                {availableServicesArray.length > 0
                  ? availableServicesArray.map((service) => (
                      <div key={service.service}>
                        {(() => {
                          switch (service.service) {
                            case "netflix":
                              return (
                                <Link href={service.link} target="_blank">
                                  <Image
                                    src={netflix}
                                    height={40}
                                    width={40}
                                    alt="netflix"
                                  />
                                </Link>
                              );
                              break;
                            case "prime":
                              return (
                                <Link href={service.link} target="_blank">
                                  <Image
                                    src={primevideo}
                                    height={40}
                                    width={40}
                                    alt="primevideo"
                                  />
                                </Link>
                              );
                              break;
                            case "hotstar":
                              return (
                                <Link href={service.link} target="_blank">
                                  <Image
                                    src={hotstar}
                                    height={40}
                                    width={40}
                                    alt="hotstar"
                                  />
                                </Link>
                              );
                              break;
                            case "zee5":
                              return (
                                <Link href={service.link} target="_blank">
                                  <Image
                                    src={zee5}
                                    height={40}
                                    width={40}
                                    alt="zee5"
                                  />
                                </Link>
                              );
                              break;
                            default:
                              return `${service.service}`;
                          }
                        })()}
                      </div>
                    ))
                  : "Streaming data unavailable."}
              </div>
            )}
          </div>
          {/*  */}
        </div>
        <div className={styles.content2}>
          {/* Reviews and Trailer */}
          <ReviewsAndTrailer />
        </div>
      </div>
      <Recommendations category="movie" id={tmdbData.id} />
    </div>
  );
};

export default Page;
