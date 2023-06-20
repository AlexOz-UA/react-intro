import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [userName, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const handleLogin = () => {
    let data = { username: userName, password: userPassword };
    axios
      .post("http://localhost:8800/user-login", {
        data,
      })
      .then((response) => {
        console.log(JSON.stringify(response));
        if (response.data.message) {
          setLoginStatus(response.data.message);
        }
        if (response.data[1]) {
          setLoginStatus("Hello, admin " + response.data[0][0].username);
          localStorage.setItem("isAdmin", "true");
        }
        if (!response.data[1]) {
          setLoginStatus("Hello, " + response.data[0].username);
        }
      })
      .catch((error) => {
        alert("Error:", error);
      });
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <label>
        Username:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={userPassword}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Log In</button>

      <h1>{loginStatus}</h1>
    </div>
  );
}
export default Login;
