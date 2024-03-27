import React from "react";
import "./OverviewPage.css";
import backgroundImage from "../../assets/background.jpg";
import { Link } from "react-router-dom";

const OverviewPage = () => {
  return (
    <div>
      <div className="main_container">
        <h1>Welcome to VIN Decoder App!</h1>
        <div className="buttons_container">
          <Link to="/login" className="button">
            Login
          </Link>
          <Link to="/register" className="button">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
