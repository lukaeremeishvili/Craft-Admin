import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import "./Data.css";

const EditData = ({ type }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { ingredients, coffee, handleUpdateIngredient, handleUpdateCoffee } =
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

  useEffect(() => {
    if (type === "ingredients") {
      const ingredient = ingredients.find((ing) => ing._uuid === id);
      if (ingredient) {
        setFormData(ingredient);
      }
    } else {
      const coffeeItem = coffee.find((cof) => cof._uuid === id);
      if (coffeeItem) {
        setFormData(coffeeItem);
      }
    }
  }, [id, type, ingredients, coffee]);

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
      await handleUpdateIngredient(id, ingredientPayload);
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
      await handleUpdateCoffee(id, coffeePayload);
    }
    navigate(`/admin/${type}`);
  };

  return (
    <div className="edit-data-page">
      <h1>Edit {type === "ingredients" ? "Ingredient" : "Coffee"}</h1>
      <form onSubmit={handleSubmit}>
        {type === "ingredients" ? (
          <>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </label>
            <label>
              Flavor:
              <input
                type="text"
                name="flavor"
                value={formData.flavor}
                onChange={handleChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
            <label>
              Strength:
              <input
                type="text"
                name="strength"
                value={formData.strength}
                onChange={handleChange}
              />
            </label>
          </>
        ) : (
          <>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </label>
            <label>
              Country:
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </label>
            <label>
              Caffeine:
              <input
                type="text"
                name="caffeine"
                value={formData.caffeine}
                onChange={handleChange}
              />
            </label>
            <label>
              Ingredients:
              <div className="ingredient-selection-table">
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
                          <input
                            type="checkbox"
                            value={ingredient.name}
                            checked={formData.selectedIngredients.includes(
                              ingredient.name
                            )}
                            onChange={handleIngredientChange}
                          />
                        </td>
                        <td>{ingredient.name}</td>
                        <td>{ingredient.price}</td>
                        <td>{ingredient.flavor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </label>
          </>
        )}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

EditData.propTypes = {
  type: PropTypes.string.isRequired,
};

export default EditData;
