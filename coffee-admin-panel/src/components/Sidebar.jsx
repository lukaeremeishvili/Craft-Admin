import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faSeedling } from "@fortawesome/free-solid-svg-icons";
import styles from "./Layout.module.css"; 

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h3>Admin Console</h3>
      <ul>
        <li>
          <NavLink
            to="/admin/ingredients"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <FontAwesomeIcon icon={faSeedling} className={styles.icon} />
            Ingredients
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/coffee"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <FontAwesomeIcon icon={faCoffee} className={styles.icon} />
            Coffee
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
