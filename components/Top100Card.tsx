import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import styles from "./Top100Card.module.css";

interface Top100CardProps {
  image: string;
  name: string;
  rating: string;
  year: number;
  rank: number;
  id: string;
}

const Top100Card: FC<Top100CardProps> = ({ image, name, year, rating, id }) => {
  return (
    <>
      <Link href={`/top100/${id}`}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image
              src={image}
              height={443.68}
              width={300}
              alt={`${name} movie poster`}
            />
          </div>
          <div className={styles.name}>{`${name}`}</div>
          <div className={styles.info}>
            <div className={styles.year}>{year}</div>
            <div className={styles.rating}>{rating}</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Top100Card;
