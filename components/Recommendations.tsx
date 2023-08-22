import { FC } from "react";
import styles from "./Recommendations.module.css";
import DiscoverCard from "./DiscoverCard";
import Link from "next/link";

type RecommendationProps = {
  similarArray: [Movie];
};

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  name: string;
  release_date: string;
};

const Recommendations: FC<RecommendationProps> = async ({ similarArray }) => {
  return (
    <div className={styles.container}>
      {similarArray.length > 0 ? (
        <h2 className={styles.heading}>Recommendation Section</h2>
      ) : (
        <Link href="/">
          <h2 className={styles.home}>Go Home</h2>
        </Link>
      )}
      <div className={styles.listContainer}>
        {similarArray?.map((movie: Movie) => (
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
