import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OverviewPage from "./pages/Overview/OverviewPage";
import RegisterPage from "./pages/Register/RegisterPage";

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

function AppLayout() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
