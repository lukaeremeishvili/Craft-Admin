import  { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import styles from "./Style.module.css"; 

const Ingredients = () => {
  const { ingredients, handleDeleteIngredient } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (!Array.isArray(ingredients)) {
    return <div>Error: Ingredients data is not available.</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ingredients.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(ingredients.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : 1));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : totalPages));
  };

  const navigate = useNavigate();

  const handleAddIngredient = () => {
    navigate("/admin/add-ingredient");
  };

  const handleEditIngredient = (id) => {
    navigate(`/admin/edit-ingredient/${id}`);
  };

  return (
    <div className={styles.page}> 
      <div className={styles.header}>
        <h1>Ingredients Page</h1>
        <button className={styles.addButton} onClick={handleAddIngredient}>
          Add Ingredient
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Flavor</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((ingredient) => (
              <tr key={ingredient._uuid}>
                <td>{ingredient.name}</td>
                <td>{ingredient.price}</td>
                <td>{ingredient.flavor}</td>
                <td>
                  <button
                    className={styles.editButton} 
                    onClick={() => handleEditIngredient(ingredient._uuid)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className={styles.deleteButton} 
                    onClick={() => handleDeleteIngredient(ingredient._uuid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage}>Previous</button>
        <span>
          Page {currentPage}/{totalPages}
        </span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default Ingredients;
