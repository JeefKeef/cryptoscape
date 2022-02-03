import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Modal,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Login = () => {

  const username = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    loginCall({username:username.current.value, password:password.current.value}, dispatch);
    // loginCall({username:username.current.value, password:password.current.value}, dispatch);
  };

  console.log(user);

  return (
    <div className="login-page-container">
      <form className="login-page-form" onSubmit={handleLogin}>
        <div>
          <input
            placeholder="Username"
            required
            type="username"
            className="login-page-username-input"
            ref={username}
          />
          <input
            placeholder="Password"
            required
            type="password"
            className="login-page-password-input"
            ref={password}
          />
          <div className="login-btn-container">
            <button className="login-btn" type="submit" >Log In</button>
            {/* <Button>Register</Button> */}
          </div>
          <div className="login-signup-container">
            <Link to="/news" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
