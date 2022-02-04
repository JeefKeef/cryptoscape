import "./register.css";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Modal,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";

const Register = () => {
  const username = useRef();
  const password = useRef();
  const email = useRef();
  const passwordRepeat = useRef();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (passwordRepeat.current.value !== password.current.value) {
      passwordRepeat.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-page-form" onSubmit={handleRegister}>
        <div>
          <input
            placeholder="Username"
            required
            className="register-username-input"
            ref={username}
          />
          <input
            placeholder="Email"
            type="email"
            required
            className="register-email-input"
            ref={email}
          />
          <input
            placeholder="Password"
            type="password"
            required
            className="register-password-input"
            minLength="6"
            ref={password}
          />
          <input
            placeholder="Renter Password"
            type="password"
            required
            className="register-password-repeat-input"
            minLength="6"
            ref={passwordRepeat}
          />
          <div className="register-btn-container">
            <button className="register-btn" type="submit">
              Register
            </button>
          </div>
          <div className="login-signup-container">
            <Link to="/news" variant="body2">
              {"Already have an account? Log In"}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
