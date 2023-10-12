"use client";
import { NextPage } from "next";
import styles from "@/app/watchlist/Watchlist.module.css";
import Wishlist from "@/components/WishlistCard";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { BiMoviePlay } from "react-icons/bi";
import Loader from "@/components/Loader";
import { PiTelevisionBold } from "react-icons/pi";

type DiscoverProps = {
  params: {
    id: string;
  };
};

const Page: NextPage<DiscoverProps> = ({
  params,
}: {
  params: { id: string };
}) => {
  const { userId } = useAuth();
  const [movieWatchList, setmovieWatchList] = useState<[]>([]);
  const [tvWatchList, setTvWatchList] = useState<[]>([]);
  const [showmovie, setShowMovie] = useState(true);
  const [isLoaoding, setIsLoading] = useState(false);

  useEffect(() => {
    // Call fetchAddress when the component mounts
    setIsLoading(true);
    const fetchAddress = async () => {
      const response = await fetch(`/api/get-watch-list?query=${userId}`, {
        cache: "no-store",
      });
      const data = await response.json();
      const tvWishList = data?.movieList?.cinefreeks[0]?.tvWishList;
      setTvWatchList(tvWishList.reverse());
      const movieWishList = data?.movieList?.cinefreeks[0]?.movieWishList;
      setmovieWatchList(movieWishList.reverse());
      setIsLoading(false);
    };

    fetchAddress();
  }, [userId]);

  return (
    <div className={styles.container}>
      <h1>itssuzikat&#39;s Watchlist</h1>
      <div className={styles.content}>
        <div className={styles.tabs}>
          <button
            style={{
              backgroundColor: showmovie
                ? "rgb(239, 239, 48)"
                : "rgb(133, 133, 73)",
            }}
            onClick={() => setShowMovie(true)}
          >
            <BiMoviePlay />
            <div>Movies</div>
          </button>
          <button
            style={{
              backgroundColor: !showmovie
                ? "rgb(239, 239, 48)"
                : "rgb(133, 133, 73)",
            }}
            onClick={() => setShowMovie(false)}
          >
            <PiTelevisionBold />
            <div>TV Shows</div>
          </button>
        </div>

        {showmovie && (
          <div className={styles.list}>
            {isLoaoding && <Loader />}
            {movieWatchList.map((movie: any) => (
              <Wishlist key={movie} type={"movie"} id={movie} />
            ))}
          </div>
        )}

        {!showmovie && (
          <div className={styles.list}>
            {isLoaoding && <Loader />}
            {tvWatchList.map((tvShow: any) => (
              <Wishlist key={tvShow} type={"tv"} id={tvShow} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
