"use client";

import React, { FC, useState } from "react";
import styles from "./ActorsComp.module.css";
import ImageGalleryComponent from "./ImageGallery";
import SocialMedia from "./SocialMedia";
import CreditsCarousel from "./CreditsCarousel";

interface ActorsCompProps {
  creditsData: any;
  socialID: any;
  imageData: any;
}

const ActorsComp: FC<ActorsCompProps> = ({
  creditsData,
  socialID,
  imageData,
}) => {
  const [view, setView] = useState(1);

  const colors = {
    active: "yellow",
    passive: "lightyellow",
  };

  const buttonCommonStyle = {
    backgroundColor: colors.passive,
    ":hover": {
      backgroundColor: "aliceblue",
    },
  };

  const activeButtonStyle = {
    ...buttonCommonStyle,
    backgroundColor: colors.active,
  };

  const popularCredits = creditsData
    .filter(
      (movie: { poster_path: string; id: number }) =>
        movie.poster_path && movie.id !== 584150
    )
    .slice(0, 20)
    .sort(
      (a: { popularity: number }, b: { popularity: number }) =>
        b.popularity - a.popularity
    );

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.toggleButtons}>
          <div
            style={view === 1 ? activeButtonStyle : buttonCommonStyle}
            onClick={() => setView(1)}
            className={styles.button}
          >
            Popular Works
          </div>

          <div
            style={view === 2 ? activeButtonStyle : buttonCommonStyle}
            onClick={() => setView(2)}
            className={styles.button}
          >
            Images
          </div>
          <div
            style={view === 3 ? activeButtonStyle : buttonCommonStyle}
            onClick={() => setView(3)}
            className={styles.button}
          >
            Social Media
          </div>
        </div>
        <div className={styles.displayCard}>
          {view === 1 && <CreditsCarousel popularMovies={popularCredits} />}
          {view === 2 && <ImageGalleryComponent images={imageData} />}
          {view === 3 && <SocialMedia socialID={socialID} />}
        </div>
      </div>
    </div>
  );
};

export default ActorsComp;
