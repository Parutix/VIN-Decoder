import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./LoginPageStyles.css";

const LoginPage = () => {
  useEffect(() => {
    document.body.classList.add("login_background");

    return () => {
      document.body.classList.remove("login_background");
    };
  }, []);

  return (
    <div className="login_background">
      <div className="login_container">
        <h1>Login</h1>
        <div className="login_form">
          <input type="text" placeholder="Username" className="login_input" />
          <input
            type="password"
            placeholder="Password"
            className="login_input"
          />
          <button className="login_button">Login</button>
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
