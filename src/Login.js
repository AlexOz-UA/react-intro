import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogined, setIsLogined] = useState(false);

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      alert("Correct login information! Now you can delete and change Blogs");
      setIsLogined(true);
      document.cookie = "isLoginned=true";
      console.log(isLogined);
    } else {
      alert("Incorrect login information.");
      setIsLogined(false);
    }
  };
  return (
    <div className="login">
      <h2>Login or Sign in</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}
export default Login;

