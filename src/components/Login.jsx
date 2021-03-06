import React from 'react';
import { Link } from "react-router-dom";
import { Box, Modal, Button, Typography, TextField, FormControlLabel, Checkbox} from "@mui/material";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const Login = () => {
  return (
    <div>
        <Box component="form" noValidate sx={style}>
            <div>
            <TextField label="Username" margin="normal" required fullWidth variant="outlined" name="username" autoComplete="username" />
            <TextField id="password" type="password" margin="normal" required fullWidth label="Password" variant="outlined" name="password" autoComplete="current-password"/>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit">Login</Button>
            <Button>Register</Button>
            <Link to ="/news" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
            </div>
        </Box>
    </div>
  );
};

export default Login;
