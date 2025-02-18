import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import styles from "./Data.module.css";

const AddData = ({ type }) => {
  const navigate = useNavigate();
  const { ingredients, handleAddIngredient, handleAddCoffee } =
    useContext(DataContext);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    strength: "",
    flavor: "",
    title: "",
    country: "",
    caffeine: "",
    selectedIngredients: [],
    totalPrice: "",
  });

  if (!Array.isArray(ingredients)) {
    return <div>Error: Ingredients data is not available.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIngredientChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      selectedIngredients: checked
        ? [...prevData.selectedIngredients, value]
        : prevData.selectedIngredients.filter(
            (ingredient) => ingredient !== value
          ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "ingredients") {
      if (!formData.name || !formData.price || !formData.flavor) {
        alert("Name, Price, and Flavor are required");
        return;
      }
      const priceWithSymbol = formData.price.includes("₾")
        ? formData.price
        : `${formData.price} ₾`;
      const ingredientPayload = { ...formData, price: priceWithSymbol };
      console.log("Payload:", ingredientPayload);
      await handleAddIngredient(ingredientPayload);
    } else {
      if (
        !formData.title ||
        !formData.country ||
        formData.selectedIngredients.length === 0
      ) {
        alert("Title, Country, and at least one Ingredient are required");
        return;
      }

      const ingredientPrices = formData.selectedIngredients.reduce(
        (sum, ingredientName) => {
          const foundIngredient = ingredients.find(
            (ing) => ing.name === ingredientName
          );
          return foundIngredient
            ? sum + parseFloat(foundIngredient.price.replace("₾", ""))
            : sum;
        },
        0
      );
      const basePrice = 2;
      const totalPrice = basePrice + ingredientPrices;
      const coffeePayload = {
        ...formData,
        totalPrice: `₾${totalPrice.toFixed(2)}`,
      };
      console.log("Payload:", coffeePayload);
      await handleAddCoffee(coffeePayload);
    }
    navigate(`/admin/${type}`);
  };

  return (
    <div className={styles.addDataPage}>
      <h1>Add {type === "ingredients" ? "Ingredient" : "Coffee"}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {type === "ingredients" ? (
          <>
            <label className={styles.label}>
              Name:
              <input
                className={styles.input}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Price:
              <input
                className={styles.input}
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Flavor:
              <input
                className={styles.input}
                type="text"
                name="flavor"
                value={formData.flavor}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Description:
              <input
                className={styles.input}
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Strength:
              <input
                className={styles.input}
                type="text"
                name="strength"
                value={formData.strength}
                onChange={handleChange}
              />
            </label>
          </>
        ) : (
          <>
            <label className={styles.label}>
              Title:
              <input
                className={styles.input}
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Country:
              <input
                className={styles.input}
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Caffeine:
              <input
                className={styles.input}
                type="text"
                name="caffeine"
                value={formData.caffeine}
                onChange={handleChange}
              />
            </label>
            <div className={styles.label}>
              Ingredients:
              <div className={styles.ingredientSelectionTable}>
                <table>
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Flavor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.map((ingredient) => (
                      <tr key={ingredient._uuid}>
                        <td>
                          <label>
                            <input
                              type="checkbox"
                              value={ingredient.name}
                              checked={formData.selectedIngredients.includes(
                                ingredient.name
                              )}
                              onChange={handleIngredientChange}
                            />
                          </label>
                        </td>
                        <td>{ingredient.name}</td>
                        <td>{ingredient.price}</td>
                        <td>{ingredient.flavor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        <button className={styles.submitButton} type="submit">
          Add {type === "ingredients" ? "Ingredient" : "Coffee"}
        </button>
      </form>
    </div>
  );
};

AddData.propTypes = {
  type: PropTypes.string.isRequired,
};

export default AddData;
