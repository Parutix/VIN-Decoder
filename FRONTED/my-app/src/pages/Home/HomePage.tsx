import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home_container">
        <input type="text" placeholder="VIN" />
        <button>Submit</button>
      </div>
    </div>
  );
};

export default HomePage;
