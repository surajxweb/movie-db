import { FC } from "react";
import styles from "./GenrePage.module.css";
import Link from "next/link";

type GenrePageProps = {
  id: number;
  page: number;
};

const GenrePage: FC<GenrePageProps> = ({ id, page }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.numbers}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pageNumber) => (
          <Link href={`/genres/${id}/${pageNumber}`} key={pageNumber}>
            <li
              style={{
                color: page == pageNumber ? "gold" : "#ccc",
                cursor: "pointer",
              }}
            >
              {pageNumber}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default GenrePage;
