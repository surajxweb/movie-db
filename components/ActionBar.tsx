"use client";

import styles from "./ActionBar.module.css";
import { SignedIn, SignInButton, SignedOut } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { IoMdAddCircleOutline, IoMdAddCircle } from "react-icons/io";
import { useAuth } from "@clerk/nextjs";
import { BiLogIn } from "react-icons/bi";

const ActionsBar = ({ type, id }: { type: number; id: string }) => {
  const { userId } = useAuth();
  const [watchList, setWatchList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/get-watch-list?query=${userId}`, {
        cache: "no-store",
      });
      const data = await response.json();
      if (type === 1) {
        const movieWishList = data?.movieList?.cinefreeks[0]?.movieWishList;
        setWatchList(movieWishList);
        setIsLoading(false);
      } else if (type === 2) {
        const tvWishList = data?.movieList?.cinefreeks[0]?.tvWishList;
        setWatchList(tvWishList);
        setIsLoading(false);
      }
    };

    fetchAddress(); // Now it won't trigger an infinite loop
  }, [userId, type]);

  const isIdInWishlist = watchList?.includes(id);

  const actioKaro = async () => {
    setIsLoading(true);
    const kyaKare = isIdInWishlist ? "hatoWahaSe" : "aawoAndar";
    let updatedWatchList = [...watchList]; // Create a copy of the watchList

    if (kyaKare === "hatoWahaSe") {
      updatedWatchList = updatedWatchList.filter((content) => content !== id);
    } else if (kyaKare === "aawoAndar") {
      updatedWatchList.push(id.toString());
    }

    // Update the state with the new watchList
    setWatchList(updatedWatchList);
    const requestPayload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type,
        clerkUserId: userId,
        list: updatedWatchList,
      }), // Send the cart data in the request body
    };

    const response = await fetch("/api/edit-watch-list", requestPayload);
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <SignedIn>
        {/* <div className={styles.actions}>
          {actionStatus.love ? (
            <AiFillHeart
              className={styles.icons}
              size='1.5em'
              color='rgb(237, 4, 4)'
              onClick={undoKaro}
            />
          ) : (
            <AiOutlineHeart
              className={styles.icons}
              size='1.5em'
              onClick={loveKaro}
            />
          )}
          {actionStatus.like ? (
            <AiFillLike
              className={styles.icons}
              size='1.5em'
              color='rgb(237, 4, 4)'
              onClick={undoKaro}
            />
          ) : (
            <AiOutlineLike
              className={styles.icons}
              size='1.5em'
              onClick={likeKaro}
            />
          )}
          {actionStatus.dislike ? (
            <AiFillDislike
              className={styles.icons}
              size='1.5em'
              color='rgb(237, 4, 4)'
              onClick={undoKaro}
            />
          ) : (
            <AiOutlineDislike
              className={styles.icons}
              size='1.5em'
              onClick={dislikeKaro}
            />
          )}
        </div> */}
        {isLoading && (
          <AiOutlineLoading3Quarters className={styles.loader} size='1.2em' />
        )}
        {!isLoading && (
          <button
            className={styles.wishlist}
            style={{
              backgroundColor: isIdInWishlist ? "rgb(237, 4, 4)" : "#111",
            }}
            onClick={actioKaro}
          >
            {isIdInWishlist ? (
              <TiTick className={styles.icons} size='1.5em' />
            ) : (
              <IoMdAddCircleOutline className={styles.icons} size='1.5em' />
            )}

            <div>
              {isIdInWishlist ? "Added to watchlist" : "Add to watchlist"}
            </div>
          </button>
        )}
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <button className={styles.signin}>
            <BiLogIn className={styles.icons} size='1.5em' />
            <div>Sign In to add this to your list.</div>
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default ActionsBar;
