import Image from 'next/image';
import React, { FC } from 'react';
import styles from './DiscoverCard.module.css';
import Link from 'next/link';

interface DiscoverCardProps {
  name: string;
  image: string;
  id: number;
  release_date: string;
}

const DiscoverCard: FC<DiscoverCardProps> = ({
  name,
  image,
  id,
  release_date,
}) => {
  const pathname = release_date ? `movie/${id}` : `tv/${id}`;
  return (
    <>
      <Link href={`/${pathname}`}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image
              src={`https://image.tmdb.org/t/p/original/${image}`}
              alt={`${name} - poster`}
              height={350}
              width={233}
            />
          </div>
          <div className={styles.name}>{name}</div>
        </div>
      </Link>
    </>
  );
};

export default DiscoverCard;
