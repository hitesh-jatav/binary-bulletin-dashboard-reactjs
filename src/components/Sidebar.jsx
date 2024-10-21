import React from "react";
import { Link, useLocation } from "react-router-dom";
import TABS from "../constants/tabs";

const Sidebar = () => {
  const location = useLocation(); // Get the current route
  const logout = (status) => {
    if (status) {
      localStorage.clear();
      window.location.reload();
    }
  };
  return (
    <div
      className="d-flex flex-column h-100 p-3 border bg-light"
      style={{ width: "250px" }}
    >
      <h3 className="my-6">Binary Bulletin</h3>
      <ul className="nav nav-pills flex-column mb-auto my-4">
        {TABS.map((tab, index) => (
          <li key={index} className="nav-item mb-2">
            <Link
              to={tab.route}
              onClick={() => logout(tab.label === "Logout")}
              className={`nav-link d-flex align-items-center ${
                location.pathname === tab.route ? "bg-my-secondary " : ""
              }`} // Conditionally add 'active' class
            >
              <i className={`me-2 ${tab.iconClass}`} />
              <span className="fw-bold">{tab.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
