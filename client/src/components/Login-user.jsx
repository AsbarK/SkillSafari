import { Button, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
/// File is incomplete. You need to add input boxes to take input for users to login.
function LoginUser() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <TextField
        style={{ width: "80%", background: "#DAFFFB" }}
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
        style={{ width: "80%", background: "#DAFFFB" }}
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
        style={{ backgroundColor: "#DAFFFB", color: "#001C30", margin: "10px" }}
        variant="outlined"
        onClick={async () => {
          // fetch("http://localhost:3000/users/login", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //     username,
          //     password,
          //   }),
          // })
          //   .then((res) => res.json())
          //   .then((data) => {
          //     localStorage.setItem("token", data.token);
          //     navigate("/courses");
          //   })
          //   .catch((err) => {
          //     alert("Invalid");
          //     console.error(err);
          //   });
          const res = await axios
            .post("http://localhost:3000/users/login", {
              username,
              password,
            })
            .catch((err) => {
              alert("Invalid");
              console.error(err);
            });
          if (res && res.data && res.data.token) {
            localStorage.setItem("token", res.data.token);
            navigate("/courses");
          } else {
            alert("Invalid login credentials");
          }
        }}
      >
        Login
      </Button>
      <br />
    </div>
  );
}

export default LoginUser;
