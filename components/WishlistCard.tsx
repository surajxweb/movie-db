"use client";

import { useEffect, useState } from "react";
import styles from "./WishlistCard.module.css";
import DiscoverCard from "./DiscoverCard";

interface ListData {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    // Define the structure of belongs_to_collection here
    // You can use a similar approach as with ListData
  };
  budget: number;
  genres: any[]; // Define the structure of genres
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  known_for_department: string;
  title: string;
  poster_path: string;
  release_date: string;
}

const Wishlist = ({ id, type }: { id: string; type: string }) => {
  const [listData, setListData] = useState<ListData>({} as ListData);

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await fetch(
        `/api/get-tmdb-data?query=${id}&type=${type}`
      );
      const data = await response.json();
      setListData(data?.movieData);
    };
    fetchAddress(); // Now it won't trigger an infinite loop
  }, [id, type]);

  return (
    <DiscoverCard
      key={listData.id}
      name={listData.title}
      image={listData.poster_path}
      id={listData.id}
      release_date={listData.release_date}
      person_identity={listData.known_for_department}
    />
  );
};

export default Wishlist;
