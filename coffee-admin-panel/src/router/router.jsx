import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Ingredients from "../pages/Ingredients";
import Coffee from "../pages/Coffee";
import AddData from "../components/AddData";
import EditData from "../components/EditData";
import Layout from "../components/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/coffee" />} />
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Navigate to="coffee" />} />
          <Route path="ingredients" element={<Ingredients />} />
          <Route path="coffee" element={<Coffee />} />
          <Route path="add" element={<AddData type="coffee" />} />
          <Route
            path="add-ingredient"
            element={<AddData type="ingredients" />}
          />
          <Route
            path="edit-ingredient/:id"
            element={<EditData type="ingredients" />}
          />
          <Route path="edit-coffee/:id" element={<EditData type="coffee" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
