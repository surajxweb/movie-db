"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import styles from "./CreditsCarousel.module.css";
import Link from "next/link";

interface Movie {
  title: string;
  poster_path: string;
  name: string;
  id: number;
}

interface CreditsCarouselProps {
  popularMovies: Movie[];
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3.1,
  centerMode: false,
  slidesToScroll: 2.8,
  swipeToSlide: true,
};

const CreditsCarousel: React.FC<CreditsCarouselProps> = ({ popularMovies }) => {
  return (
    <div className={styles.container}>
      <Slider className={styles.slider} {...settings}>
        {popularMovies?.map((movie) => (
          <div className={styles.movieCard} key={movie.id}>
            <Link href={`/movie/${movie.id}`}>
              <div className={styles.movieImage}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                />
              </div>
              <h3>{movie.title || movie.name}</h3>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CreditsCarousel;
