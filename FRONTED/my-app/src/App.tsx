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
import AboutPage from "./pages/About/AboutPage";
import HistoryPage from "./pages/History/HistoryPage";
import Navbar from "./components/Navbar/Navbar";
import { isValidToken } from "./helpers/authHelpers";
import { UpdateAuthenticationType } from "./types/UpdateAuthenticationType";

function AppLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    };

    checkAuthentication();

    window.addEventListener("loginSuccess", checkAuthentication);

    return () => {
      window.removeEventListener("loginSuccess", checkAuthentication);
    };
  }, []);

  console.log("isAuthenticated de acasa", isAuthenticated);

  const updateAuthentication: UpdateAuthenticationType = (value) => {
    setIsAuthenticated(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <OverviewPage />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <RegisterPage />
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <LoginPage updateAuthentication={updateAuthentication} />
            )
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/about"
          element={
            isAuthenticated ? <AboutPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/history"
          element={
            isAuthenticated ? <HistoryPage /> : <Navigate to="/login" replace />
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
