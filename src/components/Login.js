import React, { useState } from "react";
import axios from "axios";

function Login() {
  
  const [userName, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");
  const isRegistered = localStorage.getItem("userName");
  const [loginStatus, setLoginStatus] = useState("");

  const handleLogin = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    let data = { username: userName, password: userPassword };
    axios
      .post("http://localhost:8800/user-login", {
        data,
      })
      .then((response) => {
        console.log(JSON.stringify(response));
        if (response.data.message) {
          setLoginStatus(response.data.message);
          return;
        }
        if (response.data.isAdmin === true) {
          setLoginStatus("Hello, admin " + response.data.userInfo[0].username);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          localStorage.setItem(
            "userName",
            `${response.data.userInfo[0].username}`
          );
          localStorage.setItem("token", response.data.token);
        }
        if (!response.data.isAdmin === true) {
          setLoginStatus("Hello, " + response.data.userInfo[0].username);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          localStorage.setItem(
            "userName",
            `${response.data.userInfo[0].username}`
          );
          localStorage.setItem("token", response.data.token);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="login">
      {!isRegistered && (
        <div>
          <h2>Login</h2>
          <label>
            Username:
            <input
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              required
              maxLength={15}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={userPassword}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              maxLength={20}
            />
          </label>
          <br />
          <button onClick={handleLogin}>Log In</button>

          <h1>{loginStatus}</h1>
        </div>
      )}
      {isRegistered && (
        <div>
          <h2>Login</h2>
          <label>
            Username:
            <input
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              disabled
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={userPassword}
              onChange={(e) => setPassword(e.target.value)}
              disabled
            />
          </label>
          <br />
          <button onClick={handleLogin} disabled>
            Log In
          </button>

          <h1>{loginStatus}</h1>
        </div>
      )}
    </div>
  );
}
export default Login;
