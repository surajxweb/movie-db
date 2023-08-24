"use client";

import { FC } from "react";
import styles from "./CrewAndCast.module.css";
import Image from "next/image";
import Link from "next/link";

type CastItem = {
  id: number;
  name: string;
  profile_path: string;
  character: string;
};

type CrewAndCastProps = {
  castArray: CastItem[];
};

const CrewAndCast: FC<CrewAndCastProps> = ({ castArray }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Cast</h3>
      <div className={styles.castList}>
        {castArray?.map((cast) => (
          <div className={styles.cardContainer} key={cast.id}>
            <Link href={`/people/${cast.id}`}>
              <Image
                unoptimized
                src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                height={384}
                width={256}
                alt={`${cast.name} - photo`}
              />
              <div className={styles.name}>{cast.name}</div>
              <div className={styles.character}>{cast.character}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewAndCast;
