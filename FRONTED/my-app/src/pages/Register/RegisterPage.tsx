import React, { useEffect, useState } from "react";
import "./RegisterPageStyles.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const { confirmPassword, ...dataWithoutConfirmPassword } = registerData;

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithoutConfirmPassword),
      });

      if (response.ok) {
        alert("User registered successfully!");
      } else {
        alert("Failed to register user!");
      }
    } catch (error) {
      console.error("Failed to register user!", error);
    }
  };

  // HTML Part
  return (
    <>
      <div className="register_background">
        <div className="register_container">
          <h1>Register</h1>
          <div className="register_form">
            <input
              type="text"
              placeholder="Username"
              className="register_input"
              name="username"
              value={registerData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="register_input"
              name="email"
              value={registerData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="register_input"
              name="password"
              value={registerData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="register_input"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleChange}
            />
            <button className="register_button" onClick={handleRegister}>
              Register
            </button>
            <h2 className="account_have_text">
              Already have an account?
              <Link to="/login" className="account_have_link">
                Login Here
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
