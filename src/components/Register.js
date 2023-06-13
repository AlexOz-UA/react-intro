import React, { useState } from "react";
import axiosPost from "../helpFuncs/axiosPost";

function Register() {
  const [userName, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userEmail, setEmail] = useState("");

  const handleLogin = () => {
    let data = {username: userName, email: userEmail, password: userPassword};
    axiosPost("http://localhost:8800/user-register", data);
    alert("The registration was succesful.");
  };
  
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
      <h2>Register</h2>
      <label>
        Username:
        <input required
          type="text"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input required
          type="text"
          value={userEmail}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input required
          type="password"
          value={userPassword}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button>Register</button>
      </form>
    </div>
  );
}
export default Register;