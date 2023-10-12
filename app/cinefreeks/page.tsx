import Link from "next/link";
import styles from "./Cinefreeks.module.css";
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
          Mean while check out my watchlist{" "}
          <Link
            style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
            href={"/cinefreeks/clnk91wn626p10bppy5oe4h22"}
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
