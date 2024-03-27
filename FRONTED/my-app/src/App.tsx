import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OverviewPage from "./pages/Overview/OverviewPage";

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
      </Routes>
    </div>
  );
}

export default App;
