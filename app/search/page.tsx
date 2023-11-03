"use client";

import { NextPage } from "next";
import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./Search.module.css";
import { BsSearch } from "react-icons/bs";
import DiscoverCard from "@/components/DiscoverCard";

interface FormData {
  userInput: string;
  category: "tv" | "movie" | "person";
}

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  name: string;
  release_date: string;
  profile_path: string;
  known_for_department: string;
};

const FormComponent: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    userInput: "",
    category: "movie", // Default category
  });
  const [searchResults, setSearchResults] = useState<[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (formData.userInput.length > 2) {
        const response = await fetch(
          `/search/api?query=${formData.userInput}&category=${formData.category}`
        );
        const data = await response.json();

        // Do something with the API response
        setSearchResults(data.movieData.results);
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [formData]);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.question}>
          <BsSearch size="1.5em" color="#ccc" className={styles.reactIcons} />
          <input
            type="text"
            value={formData.userInput}
            onChange={(e) =>
              setFormData({ ...formData, userInput: e.target.value })
            }
            placeholder={`${
              formData.category === "tv"
                ? "Enter the tv show name"
                : formData.category === "movie"
                ? "Enter the movie name"
                : "Enter the person name"
            }`}
          />
        </div>

        <div className={styles.radios}>
          <label className={styles.radio}>
            <input
              type="radio"
              value="movie"
              checked={formData.category === "movie"}
              onChange={() => setFormData({ ...formData, category: "movie" })}
            />
            <span className={styles.option}>Movie</span>
          </label>
          <label className={styles.radio}>
            <input
              type="radio"
              value="tv"
              checked={formData.category === "tv"}
              onChange={() => setFormData({ ...formData, category: "tv" })}
            />
            <span className={styles.option}>TV Show</span>
          </label>
          <label className={styles.radio}>
            <input
              type="radio"
              value="tv"
              checked={formData.category === "person"}
              onChange={() => setFormData({ ...formData, category: "person" })}
            />
            <span className={styles.option}>Person</span>
          </label>
        </div>
      </div>
      <div className={styles.results}>
        {searchResults.length > 0 && (
          <h2 className={styles.heading}>Search Results</h2>
        )}
        <div className={styles.list}>
          {searchResults.length > 0 &&
            searchResults
              .slice(0, 15)
              .map((movie: Movie) => (
                <DiscoverCard
                  key={movie.id}
                  name={movie.title || movie.name}
                  image={movie.poster_path || movie.profile_path}
                  id={movie.id}
                  release_date={movie.release_date}
                  person_identity={movie.known_for_department}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
