import React, { FC } from 'react';
import styles from "./ActorsComp.module.css";

interface ActorsCompProps {
    movieData: any;
    socialID: any;
}

const ActorsComp: FC<ActorsCompProps> = ({ movieData, socialID }) => {
  console.log(socialID);
  

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.toggleButtons}>
          <div className={styles.button}>Popular Films</div>
          <div className={styles.button}>Filmography</div>
          <div className={styles.button}>Images</div>
          <div className={styles.button}>Social Media</div>
        </div>
        <div className={styles.displayCard}>


        </div>
      </div>
    </div>
  );
};

export default ActorsComp;
