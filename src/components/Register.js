import React, { useState } from "react";
import axiosPost from "../helpFuncs/axiosPost";

function Register() {
  const [userName, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userEmail, setEmail] = useState("");

  const handleLogin = (e) => {
    let data = {username: userName, email: userEmail, password: userPassword};
    axiosPost("http://localhost:8800/user-register", data);
    alert("The registration was succesful.");
  };
  
  return (
    <div className="login">
      <form onSubmit={(e) => handleLogin(e)}>
      <h2>Register</h2>
      <label>
        Username:
        <input required
          maxLength={15}
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
          minLength={8}
          maxLength={20}
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