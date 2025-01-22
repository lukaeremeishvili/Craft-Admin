import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faSeedling } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Admin Console</h3>
      <ul>
        <li>
          <NavLink
            to="/admin/ingredients"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FontAwesomeIcon icon={faSeedling} className="icon" />
            Ingredients
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/coffee"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FontAwesomeIcon icon={faCoffee} className="icon" />
            Coffee
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
