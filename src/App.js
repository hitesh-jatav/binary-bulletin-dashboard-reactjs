import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import { protectedAxios } from "./utils/axiosInstances";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const verifyUserSession = async () => {
    try {
      await protectedAxios.post("/auth/check-user-session", {
        token: localStorage.getItem("token"),
      });
      setIsLoggedIn(true);
    } catch (error) {
      if (error.status === 404) {
        setIsLoggedIn(false);
        localStorage.clear();
        if (window.location.pathname !== "/login")
          window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    verifyUserSession();
  }, []);

  return (
    <div className="container-fluid h-100 border">
      <Router>
        {!isLoggedIn ? (
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        ) : (
          <div className="d-flex h-100">
            <div className="">
              <Sidebar />
            </div>
            <div className="w-100">
              <div className="content-wrapper h-100 p-3">
                <div className="py-3">
                  <AppRoutes />
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </Router>
    </div>
  );
};

export default App;
