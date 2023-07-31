import React, { useState, useEffect } from "react";
import "./Home.css";
import FilterOptions from "../FilterOptions/FilterOptions";
import PantryFilter from "../PantryFilter/PantryFilter";
import RecipeGrid from "../RecipeGrid/RecipeGrid";
import AboutTeam from "../AboutTeam/AboutTeam";

export default function Home({ user }) {
  const [filterState, setFilterState] = useState({
    maxReadyTime: "",
    selectedSubOptions: {
      dietary: [],
      cuisine: [],
      meal: [],
    },
  });

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientsForAPI, setIngredientsForAPI] = useState([]);
  const [searchFilter, setSearchFilter] = useState(""); // the input when searching
  const [searchInput, setSearchInput] = useState(""); // what is writing by the user before submitting

  useEffect(() => {
    setSearchInput(searchFilter);
  }, [searchFilter]);

  const handleSearchFilter = () => {
    setSearchFilter(searchInput); // Use searchInput as the value for filtering
  };

  const handleDeleteSearch = () => {
    setSearchInput(""); // Clear the search input
    setSearchFilter(""); // Also clear the search filter
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value); // Update the searchInput state as the user types
  };
  const handleFormSubmit = (event) => {
    event.preventDefault(); // prevent the form from being submitted the normal way (page refresh)
    handleSearchFilter();
  };

  console.log("searchFilter", searchFilter);

  return (
    <div className="HomeContainer">
      <div className="Hero">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
          alt="Hero Image"
        />
        <div className="HeroOverlay">
          <form onSubmit={handleFormSubmit} className="SearchInput">
            <input
              type="text"
              placeholder="🔍 Search for recipe names"
              id="searchInput"
              value={searchInput}
              onChange={handleInputChange} // Handle input change
            />
            {/* <button type="submit">Filter</button> */}
            <button
              type="button"
              className="CloseButton"
              onClick={handleDeleteSearch}
            >
              X
            </button>
          </form>
        </div>
      </div>

      <FilterOptions
        filterState={filterState}
        setFilterState={setFilterState}
      />

      <div className="home-content">
        <RecipeGrid
          user={user}
          filterState={filterState}
          selectedIngredients={selectedIngredients}
          searchFilter={searchFilter}
          ingredientsForAPI={ingredientsForAPI}
        />

        <PantryFilter
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
          setIngredientsForAPI={setIngredientsForAPI}
        />
      </div>
      {/* <div className="aboutTeam">
        <AboutTeam />
      </div> */}
    </div>
  );
}
