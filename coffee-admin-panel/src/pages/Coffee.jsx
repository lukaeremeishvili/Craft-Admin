import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import "./Style.css";

const Coffee = () => {
  const { coffee, handleDeleteCoffee } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  if (!Array.isArray(coffee)) {
    return <div>Error: Coffee data is not available.</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = coffee.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(coffee.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : 1));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : totalPages));
  };

  const handleAddCoffee = () => {
    navigate("/admin/add");
  };

  const handleEditCoffee = (id) => {
    navigate(`/admin/edit-coffee/${id}`);
  };

  return (
    <div className="page">
      <div className="header">
        <h1>Coffee Page</h1>
        <button className="add-button" onClick={handleAddCoffee}>
          Add Coffee
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Country</th>
              <th>Caffeine</th>
              <th>Total Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((coffee) => (
              <tr key={coffee._uuid}>
                <td>{coffee.title}</td>
                <td>{coffee.country}</td>
                <td>{coffee.caffeine}</td>
                <td>{coffee.totalPrice}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEditCoffee(coffee._uuid)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteCoffee(coffee._uuid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage}>Previous</button>
        <span>
          Page {currentPage}/{totalPages}
        </span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default Coffee;
