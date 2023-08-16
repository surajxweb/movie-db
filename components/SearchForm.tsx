import React, { useState, ChangeEvent } from 'react';

interface FormData {
  userInput: string;
  category: 'show' | 'movie';
}

function FormComponent() {
  const [formData, setFormData] = useState<FormData>({
    userInput: '',
    category: 'movie',
  });

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setFormData({ ...formData, userInput: inputValue });

    // Make the API call based on the current category and input value
    await makeAPICall(formData.category, inputValue);
  };

  //   const handleCategoryChange = async (selectedCategory: 'show' | 'movie') => {
  //     setFormData({ ...formData, category: selectedCategory });

  //     // Make the API call based on the selected category and current input value
  //     await makeAPICall(selectedCategory, formData.userInput);
  //   };

  const makeAPICall = async (category: 'show' | 'movie', input: string) => {
    const response = await fetch(
      `/api/route?input=${input}&category=${category}`
    );
    const data = await response.json();

    // Do something with the API response
    console.log(data);
  };

  return (
    <div>
      <input
        type="text"
        value={formData.userInput}
        onChange={handleInputChange}
        placeholder="Enter search term"
      />
      {/* <div>
        <label>
          <input
            type="radio"
            value="show"
            checked={formData.category === 'show'}
            onChange={() => handleCategoryChange('show')}
          />
          Show
        </label> */}
      {/* <label>
          <input
            type="radio"
            value="movie"
            checked={formData.category === 'movie'}
            onChange={() => handleCategoryChange('movie')}
          />
          Movie
        </label> 
      </div>*/}
    </div>
  );
}

export default FormComponent;
