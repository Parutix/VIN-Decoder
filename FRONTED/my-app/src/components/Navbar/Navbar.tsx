import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <a href="/home" className="siteTitle">
        VIN Decoder
      </a>
      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/home">History</a>
        </li>
        <li>
          <a href="/home">About</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
