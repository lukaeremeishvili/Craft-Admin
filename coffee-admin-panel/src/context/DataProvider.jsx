import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DataContext } from "./DataContext";
import {
  fetchIngredients,
  fetchCoffee,
  addIngredient,
  addCoffee,
  updateIngredient,
  updateCoffee,
  deleteIngredient,
  deleteCoffee,
} from "../api";

const DataProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [coffee, setCoffee] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const ingredientsData = await fetchIngredients();
      const coffeeData = await fetchCoffee();
      setIngredients(Array.isArray(ingredientsData) ? ingredientsData : []);
      setCoffee(Array.isArray(coffeeData) ? coffeeData : []);
    };
    loadData();
  }, []);

  const handleAddIngredient = async (ingredient) => {
    const newIngredient = await addIngredient(ingredient);
    setIngredients([...ingredients, newIngredient]);
  };

  const handleAddCoffee = async (coffee) => {
    const newCoffee = await addCoffee(coffee);
    setCoffee((prevCoffee) => [...prevCoffee, newCoffee]);
  };

  const handleUpdateIngredient = async (id, ingredient) => {
    const updatedIngredient = await updateIngredient(id, ingredient);
    setIngredients((prevIngredients) =>
      prevIngredients.map((ing) => (ing._uuid === id ? updatedIngredient : ing))
    );
  };

  const handleUpdateCoffee = async (id, coffee) => {
    const updatedCoffee = await updateCoffee(id, coffee);
    setCoffee((prevCoffee) =>
      prevCoffee.map((cof) => (cof._uuid === id ? updatedCoffee : cof))
    );
  };

  const handleDeleteIngredient = async (id) => {
    await deleteIngredient(id);
    setIngredients(ingredients.filter((ing) => ing._uuid !== id));
  };

  const handleDeleteCoffee = async (id) => {
    await deleteCoffee(id);
    setCoffee((prevCoffee) => prevCoffee.filter((cof) => cof._uuid !== id));
  };

  return (
    <DataContext.Provider
      value={{
        ingredients,
        coffee,
        handleAddIngredient,
        handleAddCoffee,
        handleUpdateIngredient,
        handleUpdateCoffee,
        handleDeleteIngredient,
        handleDeleteCoffee,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
