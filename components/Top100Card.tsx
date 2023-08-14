import Image from 'next/image';
import { FC } from 'react';
import Link from 'next/link';

interface Top100CardProps {
  image: string;
  name: string;
  rating: string;
  year: number;
  rank: number;
}

function generateMoviePath(name: string, year: number) {
  const sanitizedPath = `${encodeURIComponent(name.toLowerCase())}+${year}`;
  return sanitizedPath;
}

const Top100Card: FC<Top100CardProps> = ({
  image,
  name,
  year,
  rating,
  rank,
}) => {
  return (
    <>
      <Link href={`/movies/${generateMoviePath(name, year)}`}>
        <div>
          <div>
            <Image
              src={image}
              height={369}
              width={250}
              alt={`${name} movie poster`}
            />
          </div>
          <div>{`${name}`}</div>
          <div>
            <div>{year}</div>
            <div>{rating}</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Top100Card;
