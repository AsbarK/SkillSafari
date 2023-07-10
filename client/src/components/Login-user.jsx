import React from "react";
import { useNavigate } from "react-router-dom";

/// File is incomplete. You need to add input boxes to take input for users to login.
function LoginUser() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  return (
    <div>
      <h1>Login</h1>
      <br />
      Email -{" "}
      <input
        type={"email"}
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <br />
      Password -{" "}
      <input
        type={"password"}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button
        onClick={() => {
          fetch("http://localhost:3000/users/login", {
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
              navigate("/courses");
            })
            .catch((err) => {
              alert("Invalid");
              console.error(err);
            });
        }}
      >
        Login
      </button>
      <br />
      New here? <a href="/register">Register</a>
    </div>
  );
}

export default LoginUser;
