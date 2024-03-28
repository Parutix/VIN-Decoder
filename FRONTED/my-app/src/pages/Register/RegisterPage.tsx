import React, { useEffect } from "react";
import "./RegisterPageStyles.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  useEffect(() => {
    document.body.classList.add("register_background");

    return () => {
      document.body.classList.remove("register_background");
    };
  }, []);

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
            />
            <input
              type="email"
              placeholder="Email"
              className="register_input"
            />
            <input
              type="password"
              placeholder="Password"
              className="register_input"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="register_input"
            />
            <button className="register_button">Register</button>
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
