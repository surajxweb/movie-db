"use client";

import styles from "./Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "../resources/logo_yellow.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { HiOutlineLogin } from "react-icons/hi";
import { useClerk } from "@clerk/clerk-react";
import {
  BiTrendingUp,
  BiSolidStar,
  BiSkipNext,
  BiLaugh,
  BiSolidGhost,
  BiSolidPencil,
  BiLogIn,
  BiLogOut,
} from "react-icons/bi";
import { BsFillEmojiKissFill, BsFillHouseHeartFill } from "react-icons/bs";
import { FaSpider, FaMagic } from "react-icons/fa";
import { GiTheater, GiPistolGun, GiDramaMasks } from "react-icons/gi";
import { TbMoodCrazyHappy } from "react-icons/tb";
import {
  SignedIn,
  SignOutButton,
  SignInButton,
  SignedOut,
  OrganizationSwitcher,
} from "@clerk/nextjs";

export default function Navbar() {
  const [listVisibility, setListVisibility] = useState(false);
  const listVisibilityHandeller = () => {
    setListVisibility(!listVisibility);
  };
  const { signOut } = useClerk();
  const signOutKrrdo = () => {
    signOut();
  };
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.navIcons} onClick={listVisibilityHandeller}>
          {!listVisibility && <RxHamburgerMenu size='1.5em' color='#cccc' />}
          {listVisibility && <IoMdClose size='1.5em' color='#cccc' />}
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
          <Link href={"/cinefreaks"} className={styles.link}>
            Cinefreaks
          </Link>
          {/* <Link href={"/ratings"} className={styles.link}>
            Ratings
          </Link> */}
          <Link href={"/watchlist"} className={styles.link}>
            Watchlist
          </Link>
          <div className={styles.logout}>
            <SignedIn>
              <SignOutButton>
                <div className={styles.link}>Logout</div>
              </SignOutButton>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <div className={`${styles.link} ${styles.auth}`}>Login</div>
              </SignInButton>
            </SignedOut>
          </div>
        </ul>

        <div className={styles.navIcons}>
          <Link href={"/search"}>
            <BsSearch size='1.3em' color='#ccc' className={styles.reactIcons} />
          </Link>
        </div>
      </div>
      {listVisibility && (
        <div
          onClick={() => setListVisibility(!listVisibility)}
          className={`${styles.mpages} ${
            listVisibility ? styles.slideIn : styles.slideOut
          }`}
        >
          <div className={styles.msection}>
            <div className={styles.mheading}>Discover Movies</div>
            <div className={styles.mlists}>
              <Link href={"/discover/trendingmovies"}>
                <div className={styles.mlist}>
                  <BiTrendingUp size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Trending</div>
                </div>
              </Link>
              <Link href={"/discover/topmovies"}>
                <div className={styles.mlist}>
                  <BiSolidStar size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Top Rated</div>
                </div>
              </Link>
              <Link href={"/discover/upcomingmovies"}>
                <div className={styles.mlist}>
                  <BiSkipNext size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Upcomming</div>
                </div>
              </Link>
              <Link href={"/discover/theatres"}>
                <div className={styles.mlist}>
                  <GiTheater size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Theaters</div>
                </div>
              </Link>
              <Link href={"/genres/28/1"}>
                <div className={styles.mlist}>
                  <GiPistolGun size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Action</div>
                </div>
              </Link>
              <Link href={"/genres/35/1"}>
                <div className={styles.mlist}>
                  <BiLaugh size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Comedy</div>
                </div>
              </Link>
              <Link href={"/genres/27/1"}>
                <div className={styles.mlist}>
                  <BiSolidGhost size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Horror</div>
                </div>
              </Link>
              <Link href={"/genres/99/1"}>
                <div className={styles.mlist}>
                  <BiSolidPencil size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Documentry</div>
                </div>
              </Link>
              <Link href={"/genres/10749/1"}>
                <div className={styles.mlist}>
                  <BsFillEmojiKissFill size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Romance</div>
                </div>
              </Link>
              <Link href={"/genres/10749/1"}>
                <div className={styles.mlist}>
                  <FaSpider size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Sci Fi</div>
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.msection}>
            <div className={styles.mheading}>Discover TV Shows</div>
            <div className={styles.mlists}>
              <Link href={"/discover/trendingshows"}>
                <div className={styles.mlist}>
                  <BiTrendingUp size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Trending</div>
                </div>
              </Link>
              <Link href={"/discover/topshows"}>
                <div className={styles.mlist}>
                  <BiSolidStar size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Top Rated</div>
                </div>
              </Link>
              <Link href={"/tv/genres/10759/1"}>
                <div className={styles.mlist}>
                  <GiPistolGun size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Action & Adventure</div>
                </div>
              </Link>
              <Link href={"/tv/genres/10765/1"}>
                <div className={styles.mlist}>
                  <FaMagic size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Sci-Fi & Fantasy</div>
                </div>
              </Link>
              <Link href={"/tv/genres/18/1"}>
                <div className={styles.mlist}>
                  <GiDramaMasks size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Drama</div>
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.msection}>
            <div className={styles.mheading}>Accounts</div>
            <div className={styles.mlists}>
              <Link href={"/watchlist"}>
                <div className={styles.mlist}>
                  <BsFillHouseHeartFill size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Watchlist</div>
                </div>
              </Link>
              <Link href={"/cinefreaks"}>
                <div className={styles.mlist}>
                  <TbMoodCrazyHappy size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Cinefreaks</div>
                </div>
              </Link>
              <SignedOut>
                <Link href={"/sign-in"}>
                  <div className={styles.mlist}>
                    <BiLogIn size='1.5em' color='#fff' />
                    <div className={styles.mtext}>Log In</div>
                  </div>
                </Link>
              </SignedOut>
              <SignedIn>
                <div onClick={signOutKrrdo} className={styles.mlist}>
                  <BiLogOut size='1.5em' color='#fff' />
                  <div className={styles.mtext}>Log Out</div>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
