import { Button, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

/// File is incomplete. You need to add input boxes to take input for users to login.
function LoginAdmin() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

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
        onChange={(e) => setUsername(e.target.value)}
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
      <Button
        sx={{ margin: "10px" }}
        variant="contained"
        onClick={() => {
          fetch("http://localhost:3000/admin/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem("token", data.token);
              navigate("/create-course");
            })
            .catch((err) => {
              alert("Invalid");
              console.error(err);
            });
        }}
      >
        Login
      </Button>
    </div>
  );
}

export default LoginAdmin;
