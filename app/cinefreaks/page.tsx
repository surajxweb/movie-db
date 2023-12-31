import Link from "next/link";
import styles from "./Cinefreaks.module.css";
import { AiFillHeart } from "react-icons/ai";

const Cinefreek = () => {
  return (
    <>
      <div className={styles.container}>
        This page is under construstion! When ready, this page will allow you to
        find other cinefreaks, follow them and view their lists and
        recommendations.
        <div></div>
        <div>
          Meanwhile check out my watchlist{" "}
          <Link
            style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
            href={"/cinefreaks/itssuzikat"}
          >
            here!
          </Link>{" "}
          <AiFillHeart />
        </div>
      </div>
    </>
  );
};

export default Cinefreek;
