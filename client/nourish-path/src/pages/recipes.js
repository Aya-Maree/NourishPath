import React from 'react';
import { useState, useEffect } from 'react';

function Recipes() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [expandedRecipe, setExpandedRecipe] = useState(null); 

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await fetch('/api/recipes/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: searchInput.split(',').map((ingredient) => ingredient.trim()),
        }),
      });

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for recipes:', error.message);
    }
  };

  const handleExpandToggle = async (recipeName) => {
    try {
      const response = await fetch (`/api/recipes/${recipeName}`);
      const data = await response.json();

      console.log('Recipe details: ', data);
    } catch (error) {
      console.error('Error retrieving recipe:', error.message);
    }
    setExpandedRecipe((prevRecipe) => (prevRecipe === recipeName ? null : recipeName));
  };


  return (
    <div>
      <h1>Recipe</h1>
      <input
        type="text"
        placeholder="Enter ingredients separated by commas"
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      <button onClick={handleSearchSubmit}>Search</button>

      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((recipe) => (
            <li key={recipe.name}>
              <p>{recipe.name}</p>
              <button onClick={() => handleExpandToggle(recipe.name)}>
                {expandedRecipe === recipe.name ? 'Collapse' : 'Expand'}
              </button>
              {expandedRecipe === recipe.name && (
                <div>
                  <p>Ingredients:</p>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.ingredientName} - {ingredient.measurement}
                      </li>
                    ))}
                  </ul>
                  <p>Instructions: {recipe.instructions}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes found. Try different ingredients.</p>
      )}
    </div>
  );
}

export default Recipes;
