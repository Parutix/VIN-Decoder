import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import OverviewPage from "./pages/Overview/OverviewPage";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import { isValidToken } from "./helpers/authHelpers";
import Navbar from "./components/Navbar/Navbar";
import { UpdateAuthenticationType } from "./types/UpdateAuthenticationType";

function AppLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/login";

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const isValid = await isValidToken(token);
          setIsAuthenticated(isValid);
        } catch (error) {
          console.error("Error verifying token:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    window.addEventListener("loginSuccess", checkAuthentication);

    return () => {
      window.removeEventListener("loginSuccess", checkAuthentication);
    };
  }, []);

  console.log("isAuthenticated", isAuthenticated);

  const updateAuthentication: UpdateAuthenticationType = (value) => {
    setIsAuthenticated(value);
  };

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/login"
          element={<LoginPage updateAuthentication={updateAuthentication} />}
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
