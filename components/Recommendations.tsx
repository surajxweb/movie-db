import { FC } from "react";
import styles from "./Recommendations.module.css";
import DiscoverCard from "./DiscoverCard";
import Link from "next/link";

interface RecommendationProps {
  category: string;
  id: number;
}

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  name: string;
  release_date: string;
};

const fetchSimilarMovies = async (catergory: string, id: number) => {
  const similarResponse = await fetch(
    `https://api.themoviedb.org/3/${catergory}/${id}/recommendations?api_key=d308de6f3b996ae3b334cbb6527cffc7`
  );
  if (!similarResponse.ok) {
    console.log("error fetching data");
  }
  return await similarResponse.json();
};

const Recommendations: FC<RecommendationProps> = async ({ id, category }) => {
  const similarData = await fetchSimilarMovies(category, id);

  return (
    <div className={styles.container}>
      {similarData.results.length > 0 ? (
        <h2 className={styles.heading}>Recommendation Section</h2>
      ) : (
        <Link href="/">
          <h2 className={styles.home}>Go Home</h2>
        </Link>
      )}
      <div className={styles.listContainer}>
        {similarData.results
          ?.slice(0, 5)
          .map((movie: Movie) => (
            <DiscoverCard
              key={movie.id}
              name={movie.title}
              image={movie.poster_path}
              id={movie.id}
              release_date={movie.release_date}
            />
          ))}
      </div>
    </div>
  );
};

export default Recommendations;
