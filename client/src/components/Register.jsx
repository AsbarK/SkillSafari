import React from "react";
import { useNavigate } from "react-router-dom";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  function signup() {
    let confirmPassword = document.getElementById("confirm-password").value;
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
    <div>
      <h1>Register to the website</h1>
      <br />
      Email -{" "}
      <input
        type={"email"}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      Password -{" "}
      <input
        required
        type={"password"}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      Confirm-Password -{" "}
      <input id="confirm-password" required type={"password"} />
      <br />
      <button onClick={signup}>SignUP</button>
      Already a user? <a href="/login-admin">Login</a>
    </div>
  );
}

export default Register;
