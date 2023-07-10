import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate();
  function signup() {
    if (password !== confirmPassword) {
      alert("password and confirmPassword should be same");
    } else {
      fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password,
        }),
      }).then(navigate("/login-user"));
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <TextField
        style={{ width: "80%" }}
        type={"email"}
        id="filled-required-email"
        label="Email"
        required
        variant="filled"
        size="small"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <TextField
        style={{ width: "80%" }}
        id="filled-required-password"
        label="Password"
        required
        variant="filled"
        type={"password"}
        size="small"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <TextField
        style={{ width: "80%" }}
        onChange={(e) => setConfirmPassword(e.target.value)}
        id="filled-required-cofirmPassword"
        label="Confirm-Password"
        required
        variant="filled"
        size="small"
        type={"password"}
      />
      <br />
      <Button variant="contained" sx={{ margin: "10px" }} onClick={signup}>
        SignUP
      </Button>
    </div>
  );
}

export default Register;
