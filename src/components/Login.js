import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

function Login() {
  
  const [userName, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");
  const isRegistered = localStorage.getItem("userName");
  const [loginStatus, setLoginStatus] = useState("");
  const history = useHistory();
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [passwordShowButton, setPasswordShowButton] = useState("fa-solid fa-eye")

  const handleLogin = () => {
    let data = { username: userName, password: userPassword };
    axios
      .post("https://fathomless-garden-74281-01ac0e8623bc.herokuapp.com/user-login", {
        data,
      })
      .then((response) => {
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
          localStorage.setItem(
            "userId",
            `${response.data.userInfo[0].id}`
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
          localStorage.setItem(
            "userId",
            `${response.data.userInfo[0].id}`
          );
          localStorage.setItem("token", response.data.token);
        }
      })
      .catch((error) => {
        console.error("There is an error: " + error);
      });
  };

  const handlePasswordShowButton = () => {
    if(passwordInputType === "password"){
      setPasswordInputType("text")
      setPasswordShowButton("fa-solid fa-eye-slash")
    }
    else{
      setPasswordInputType("password")
      setPasswordShowButton("fa-solid fa-eye")
    }
  }

  useEffect(() => {
    if (isRegistered) {
      setTimeout(() => {
        history.push("/");
        window.location.reload()
      }, 1000);
    }
  }, [isRegistered, history ]);

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
              type={passwordInputType}
              value={userPassword}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              maxLength={20}
            />
            <button className="password__show" onClick={handlePasswordShowButton}><i className={passwordShowButton} style={{color: "white"}}></i></button>

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
              type={passwordInputType}
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
