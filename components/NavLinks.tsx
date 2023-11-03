import Image from "next/image";
import React, { FC } from "react";
import logo from "../resources/logo_yellow.png";
import Link from "next/link";
import styles from "./Navlinks.module.css";

const NavLinks: FC = () => {
  return (
    <div className={styles.container}>
      <Link href={`/`}>
        <div className={styles.logo}>
          <Image unoptimized src={logo} alt="logo" height={42} width={74.7} />
        </div>
      </Link>

      <ul className={styles.links}>
        <Link href={"/"}>
          <li className={styles.link}>Home</li>
        </Link>
        <Link href={"/search"}>
          <li className={styles.link}>Search</li>
        </Link>

        <Link href={"/top100"}>
          <li className={styles.link}>IMDb Top 100</li>
        </Link>
      </ul>
    </div>
  );
};

export default NavLinks;
