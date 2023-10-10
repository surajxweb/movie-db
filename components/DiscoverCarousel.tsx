"use client";

import DiscoverCard from "@/components/DiscoverCard";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import styles from "./DiscoverCarousel.module.css";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  name: string;
  release_date: string;
  known_for_department: string;
  profile_path: string;
};

interface DiscoverCarouselProps {
  discoverMovies: Movie[];
}

const CreditsCarousel: React.FC<DiscoverCarouselProps> = ({
  discoverMovies,
}) => {
  const [slidesToShow, setSlidesToShow] = useState(2);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 768) {
        setSlidesToShow(5.05); // Show 6 items on larger mobile screens (adjust the breakpoint as needed)
      } else {
        setSlidesToShow(2.05); // Show 2 items by default
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
        {discoverMovies?.map((movie) => (
          <DiscoverCard
            key={movie.id}
            name={movie.title || movie.name}
            image={movie.poster_path || movie.profile_path}
            id={movie.id}
            release_date={movie.release_date}
            person_identity={movie.known_for_department}
          />
        ))}
      </Slider>
    </div>
  );
};

export default CreditsCarousel;
