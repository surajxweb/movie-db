import Image from "next/image";
import React, { FC } from "react";
import styles from "./DiscoverCard.module.css";
import Link from "next/link";

interface DiscoverCardProps {
  name: string;
  image: string;
  id: number;
  release_date: string;
  person_identity: string;
}

const DiscoverCard: FC<DiscoverCardProps> = ({
  name,
  image,
  id,
  release_date,
  person_identity,
}) => {
  const pathname =
    release_date?.length >= 0
      ? `movie/${id}`
      : person_identity
      ? `people/${id}`
      : `tv/${id}`;
  return (
    <>
      {image && id !== 584150 && (
        <Link href={`/${pathname}`}>
          <div className={styles.container}>
            <div className={styles.imageContainer}>
              <Image
                unoptimized
                src={`https://image.tmdb.org/t/p/original/${image}`}
                alt={`${name} - poster`}
                height={350}
                width={233}
                quality={50}
              />
            </div>
            <div className={styles.name}>{name}</div>
          </div>
        </Link>
      )}
    </>
  );
};

export default DiscoverCard;
