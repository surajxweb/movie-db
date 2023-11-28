import React, { FC } from "react";
import Link from "next/link";
import logo from "../resources/screenlogo.png";
import styles from "./Footer.module.css";
import Image from "next/image";

const Footer: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href={"/"}>
            <Image unoptimized src={logo} height={200} width={300} alt="logo" />
          </Link>
        </div>
        <ul className={styles.links}>
          <Link href={"/"}>
            <li className={styles.link}>Home</li>
          </Link>
          <Link href={"/search"}>
            <li className={styles.link}>Search</li>
          </Link>

          <Link href={"/discover/trendingmovies"}>
            <li className={styles.link}>Trending Movies</li>
          </Link>
          <Link href={"/discover/trendingshows"}>
            <li className={styles.link}>Trending Shows</li>
          </Link>
          <Link href={"/discover/theatres"}>
            <li className={styles.link}>What&#39;s in Theatres?</li>
          </Link>
          <Link href={"/discover/upcomingmovies"}>
            <li className={styles.link}>Upcoming Movies</li>
          </Link>
          <Link href={"/discover/topmovies"}>
            <li className={styles.link}>Top Rated Movies</li>
          </Link>
          <Link href={"/discover/topshows"}>
            <li className={styles.link}>Top Rated Shows</li>
          </Link>
        </ul>
        <ul className={styles.links}>
          <Link href={"/genres/28/1"}>
            <li className={styles.link}>Action Movies</li>
          </Link>
          <Link href={"/genres/35/1"}>
            <li className={styles.link}>Comedy Movies</li>
          </Link>
          <Link href={"/genres/27/1"}>
            <li className={styles.link}>Horror Movies</li>
          </Link>
          <Link href={"/genres/99/1"}>
            <li className={styles.link}>Documentary</li>
          </Link>
          <Link href={"/genres/10749/1"}>
            <li className={styles.link}>Romantic Movies</li>
          </Link>

          <Link href={"/genres/878/1"}>
            <li className={styles.link}>Science Fiction Movies</li>
          </Link>
          <Link href={"/tv/genres/10759/1"}>
            <li className={styles.link}>Action & Adventure Shows</li>
          </Link>
          <Link href={"/tv/genres/18/1"}>
            <li className={styles.link}>Drama TV Shows</li>
          </Link>
        </ul>
      </div>

      <div className={styles.credits}>
        Designed & Built by{" "}
        <Link target="_blank" href={"https://www.surajxweb.dev/"}>
          Suraj Katyayan
        </Link>
        .
      </div>
    </>
  );
};

export default Footer;

{
  /* <Link href={'/theaters'}>
        <li className={styles.link}>What&#39;s in Theaters?</li>
      </Link> */
}
