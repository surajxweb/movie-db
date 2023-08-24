import { NextPage } from "next";
import { genreAndColors, genresAndNames } from "@/resources/genreAndColors";
import styles from "@/app/genres/[id]/Genres.module.css";
import DiscoverCard from "@/components/DiscoverCard";
import GenrePage from "@/components/GenrePage";

export function generateStaticParams() {
  const genresArray = Object.keys(genreAndColors);
  return genresArray.map((page) => ({
    params: { id: page },
  }));
}

const fetchGenreData = async (id: number, page: number) => {
  const genreResponse = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=d308de6f3b996ae3b334cbb6527cffc7&with_genres=${id}&sort_by=popularity.desc&page=${page}`
  );
  if (!genreResponse.ok) {
    console.log("Error fetching data.");
  }
  return await genreResponse.json();
};

type DiscoverProps = {
  params: {
    id: number;
    page: number;
  };
};

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  name: string;
  release_date: string;
  known_for_department: string;
};

const GenrePageNo: NextPage<DiscoverProps> = async ({
  params,
}: {
  params: { page: number; id: number };
}) => {
  const genreData = await fetchGenreData(params.id, params.page);
  let heading;
  for (const genre of genresAndNames.genres) {
    if (genre.id == params.id) {
      heading = genre.name;
      break; // Exit the loop once the desired genre is found
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{`${heading} / Page ${params.page}`}</h1>
      <div className={styles.list}>
        {genreData.results?.map((movie: Movie) => (
          <DiscoverCard
            key={movie.id}
            name={movie.release_date ? movie.title : movie.name}
            image={movie.poster_path}
            id={movie.id}
            release_date={movie.release_date}
            person_identity={movie.known_for_department}
          />
        ))}
        {!genreData.results && "Data not found!"}
      </div>
      <GenrePage id={params.id} page={params.page} />
    </div>
  );
};

export default GenrePageNo;
