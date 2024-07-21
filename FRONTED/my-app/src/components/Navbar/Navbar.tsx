import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Navbar.css";
import { isValidToken } from "../../helpers/authHelpers";
import { UpdateAuthenticationType } from "../../types/UpdateAuthenticationType";

const Navbar = () => {
  const token = localStorage.getItem("token");

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
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
