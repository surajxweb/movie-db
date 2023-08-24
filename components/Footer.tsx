import React, { FC } from "react";
import Link from "next/link";
import logo from "@/resources/logo_yellow.png";
import styles from "./Footer.module.css";
import Image from "next/image";
import tapLogo from "@/resources/tapLogo.png";

const Footer: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href={"/"}>
            <Image src={logo} height={200} width={300} alt='logo' />
          </Link>
        </div>
        <ul className={styles.links}>
          <Link href={"/"}>
            <li className={styles.link}>Home</li>
          </Link>
          <Link href={"/"}>
            <li className={styles.link}>Search</li>
          </Link>
          <Link href={"/"}>
            <li className={styles.link}>IMDB Top 100</li>
          </Link>
          <Link href={"/"}>
            <li className={styles.link}>Trending Movies</li>
          </Link>
          <Link href={"/"}>
            <li className={styles.link}>Trending Shows</li>
          </Link>
          <Link href={"/"}>
            <li className={styles.link}>What&#39;s in Theatres?</li>
          </Link>
          <Link href={"/"}>
            <li className={styles.link}>Upcoming Movies</li>
          </Link>
          <Link href={"/"}>
            <li className={styles.link}>Top Rated Movies</li>
          </Link>
          <Link href={"/"}>
            <li className={styles.link}>Top Rated Shows</li>
          </Link>
        </ul>
        <div className={styles.tap}>
          <Link href={"https://www.tonyandpeter.com"} target='_blank'>
            <Image
              src={tapLogo}
              height={200}
              width={200}
              alt='tony and peter logo'
            />
          </Link>
        </div>
      </div>

      <div className={styles.credits}>Designed & Built by Suraj Katyayan.</div>
    </>
  );
};

export default Footer;

{
  /* <Link href={'/theaters'}>
        <li className={styles.link}>What&#39;s in Theaters?</li>
      </Link> */
}
