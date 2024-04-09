import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPageStyles.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.body.classList.add("login_background");

    return () => {
      document.body.classList.remove("login_background");
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token;
        if (token) {
          localStorage.setItem("token", token);
          alert("User logged in successfully!");
          navigate("/home");
        } else {
          alert("Failed to login user!");
        }
      } else {
        if (response.status === 401) {
          alert("Invalid credentials!");
        } else {
          alert("Failed to login user!");
        }
      }
    } catch (error) {
      console.error("Failed to login user!", error);
    }
  };

  // HTML Part
  return (
    <div className="login_background">
      <div className="login_container">
        <h1>Login</h1>
        <div className="login_form">
          <input
            type="text"
            placeholder="Email"
            className="login_input"
            name="email"
            value={loginData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="login_input"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
          <button className="login_button" onClick={handleLogin}>
            Login
          </button>
          <h2 className="account_have_text">
            Don't have an account?
            <Link to="/register" className="account_have_link">
              Register Here
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
