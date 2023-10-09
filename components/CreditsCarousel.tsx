"use client";

import React, { useEffect, useState } from "react";
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

const CreditsCarousel: React.FC<CreditsCarouselProps> = ({ popularMovies }) => {
  const [slidesToShow, setSlidesToShow] = useState(2);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 768) {
        setSlidesToShow(6); // Show 6 items on larger mobile screens (adjust the breakpoint as needed)
      } else {
        setSlidesToShow(2); // Show 2 items by default
      }
    };

    // Initial call to set slidesToShow on component mount
    updateSlidesToShow();

    // Listen for window resize events to update slidesToShow
    window.addEventListener("resize", updateSlidesToShow);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 2,
    swipeToSlide: true,
    slidesToShow: slidesToShow,
  };

  return (
    <div className={styles.container}>
      <Slider className={styles.slider} {...settings}>
        {popularMovies?.map((movie) => (
          <div className={styles.movieCard} key={movie.id}>
            <Link href={`/movie/${movie.id}`}>
              <div className={styles.movieImage}>
                <Image
                  unoptimized
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
