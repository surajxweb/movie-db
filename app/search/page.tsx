'use client';

import { NextPage } from 'next';
import React, { useState, ChangeEvent } from 'react';
import styles from './Search.module.css';
import { BsSearch } from 'react-icons/bs';
import DiscoverCard from '@/components/DiscoverCard';

interface FormData {
  userInput: string;
  category: 'tv' | 'movie';
}

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  name: string;
  release_date: string;
};

const FormComponent: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    userInput: '',
    category: 'movie', // Default category
  });
  const [searchResults, setSearchResults] = useState<[]>([]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setFormData({ ...formData, userInput: inputValue });
    if (formData.userInput.length > 0) {
      await makeAPICall(formData.category, inputValue);
    }
  };

  const handleCategoryChange = async (selectedCategory: 'tv' | 'movie') => {
    setFormData({ ...formData, category: selectedCategory });

    // Make the API call based on the selected category and current input value
    if (formData.userInput.length > 0) {
      await makeAPICall(selectedCategory, formData.userInput);
    }
  };

  const makeAPICall = async (category: 'tv' | 'movie', input: string) => {
    const response = await fetch(
      `/search/api?query=${input}&category=${category}`
    );
    const data = await response.json();

    // Do something with the API response
    setSearchResults(data.movieData.results);
    
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div>
          <BsSearch size="3em" color="#ccc" className={styles.reactIcons} />
          <input
            type="text"
            value={formData.userInput}
            onChange={handleInputChange}
            placeholder={`${
              formData.category === 'tv'
                ? 'enter the tv show name'
                : 'enter the movie name'
            }`}
          />
        </div>

        <div className={styles.radios}>
          <label className={styles.radio}>
            <input
              type="radio"
              value="movie"
              checked={formData.category === 'movie'}
              onChange={() => handleCategoryChange('movie')}
            />
            <span className={styles.option}>Movie</span>
          </label>
          <label className={styles.radio}>
            <input
              type="radio"
              value="tv"
              checked={formData.category === 'tv'}
              onChange={() => handleCategoryChange('tv')}
            />
            <span className={styles.option}>TV Show</span>
          </label>
        </div>
      </div>
      <div className={styles.results}>
        {searchResults.length > 0 && <h2 className={styles.heading}>Search Results</h2>}
        <div className={styles.list}>{searchResults.length > 0 && searchResults.slice(0, 15).map((movie : Movie)=> (<DiscoverCard
              key={movie.id}
              name={movie.title || movie.name}
              image={movie.poster_path}
              id={movie.id}
              release_date={movie.release_date}
            />))}</div>
        
        
      </div>
    </div>
  );
};

export default FormComponent;
