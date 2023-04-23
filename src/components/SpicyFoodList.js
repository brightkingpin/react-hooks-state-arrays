// Import React and useState from "react", and PropTypes from "prop-types". Also import "spicyFoods" and "getNewRandomSpicyFood" from "../data"
import React, { useState } from "react";
import PropTypes from "prop-types";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

// Define a functional component called "SpicyFoodList".
function SpicyFoodList() {
  // Define two states using the useState hook. The first one is called "foods" and is initialized with the "spicyFoods" imported from "../data". The second one is called "filterBy" and is initialized with the string "All".
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");

  // Define a new constant called "foodsToDisplay" that filters the "foods" array based on the "filterBy" state. If "filterBy" is "All", return all the foods. Otherwise, return only the foods that match the "cuisine" value of "filterBy".
  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });

  // Define a function called "handleAddFood" that adds a new random spicy food to the "foods" array using the "getNewRandomSpicyFood" function. It logs the new food to the console and updates the "foods" state with the new food array using the "setFoods" function.
  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    console.log(newFood);
    const newFoodArray = [...foods, newFood];
    setFoods(newFoodArray);
  }

  // Define a function called "handleLiClick" that increases the "heatLevel" of a specific food in the "foods" array. It updates the "foods" state with the new food array using the "setFoods" function.

  function handleLiClick(id) {
    const newFoodArray = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      } else {
        return food;
      }
    });
    setFoods(newFoodArray);
  }

  // Define a function called "handleFilterChange" that updates the "filterBy" state with the value of the event target.(selected option of a dropdown menu)
  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }

  // Define a constant called "foodList" that maps over the "foodsToDisplay" array and creates an unordered list of foods. Each list item has a key that corresponds to the food id, and when clicked, it calls the "handleLiClick" function with the food id as an argument
  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  // Return the JSX of the component, which includes a button that calls the "handleAddFood" function, a dropdown menu that calls the "handleAddFood"
  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" onChange={handleFilterChange} value={filterBy}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  );
}

SpicyFoodList.propTypes = {
  foods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      cuisine: PropTypes.string.isRequired,
      heatLevel: PropTypes.number.isRequired,
    })
  ),
  filterBy: PropTypes.oneOf(["All", "American", "Sichuan", "Thai", "Mexican"]),
};

export default SpicyFoodList;
