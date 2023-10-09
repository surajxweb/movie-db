"use client";

import styles from "./Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "../resources/logo_yellow.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiCancel } from "react-icons/gi";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function Navbar() {
  const [listVisibility, setListVisibility] = useState(false);
  const listVisibilityHandeller = () => {
    setListVisibility(!listVisibility);
  };
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.navIcons} onClick={listVisibilityHandeller}>
          {!listVisibility && <GiHamburgerMenu size='1.5em' color='#cccc' />}
          {listVisibility && <GiCancel size='1.5em' color='#cccc' />}
        </div>
        <div className={styles.logo}>
          <Link href={"/"}>
            {" "}
            <Image alt='logo' height={60} width={60} src={logo} />
          </Link>
        </div>
        <ul className={styles.links}>
          <Link href={"/search"} className={styles.link}>
            Search
          </Link>
          <Link href={"/friends"} className={styles.link}>
            Friends
          </Link>
          <Link href={"/ratings"} className={styles.link}>
            Ratings
          </Link>
          <Link href={"/watchlist"} className={styles.link}>
            Watchlist
          </Link>
          <Link href={"/sign-in"} className={styles.link}>
            Sign In / Sign Up
          </Link>
        </ul>

        <div className={styles.navIcons}>
          <Link href={"/search"}>
            <BsSearch size='1.3em' color='#ccc' className={styles.reactIcons} />
          </Link>
        </div>
      </div>
      {listVisibility && (
        <ul className={styles.mobilelinks} onClick={listVisibilityHandeller}>
          <Link href={"/friends"} className={styles.mobilelink}>
            Friends
          </Link>
          <Link href={"/ratings"} className={styles.mobilelink}>
            Ratings
          </Link>
          <Link href={"/watchlist"} className={styles.mobilelink}>
            Watchlist
          </Link>
          <Link href={"/sign-in"} className={styles.mobilelink}>
            Sign In / Sign Up
          </Link>
        </ul>
      )}
    </>
  );
}
