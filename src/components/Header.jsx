import React from "react";
import { useLocation } from "react-router-dom";

// Function to generate header name
const generateHeaderTitle = (path) => {
  // Remove leading and trailing slashes, split by slashes
  const segments = path.replace(/^\/|\/$/g, "").split("/");

  // Capitalize the first letter of each segment and join them with spaces
  const title =
    segments
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(" ") || "Dashboard"; // Default to 'Home' if path is empty

  return title;
};

const Header = ({ titleSupport = "" }) => {
  const location = useLocation(); // Get the current route
  const title = generateHeaderTitle(location.pathname);

  return (
    <header className="border-bottom p-1 w-100 fw-bold">
      <h1 className="fw-bold text-my-primary">
        {title} {titleSupport}
      </h1>
    </header>
  );
};

export default Header;
