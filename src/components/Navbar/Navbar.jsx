import { NavLink, useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav>
      <ul>
        <li className={location.pathname == "/" ? "active-list" : ""}>
          <NavLink
            className={location.pathname == "/" ? "active-link" : ""}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className={location.pathname == "/analytics" ? "active-list" : ""}>
          <NavLink
            className={location.pathname == "/analytics" ? "active-link" : ""}
            to="/analytics"
          >
            Analytics
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
