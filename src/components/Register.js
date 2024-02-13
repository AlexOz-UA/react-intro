import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [userName, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userEmail, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const isRegistered = localStorage.getItem("userName");

  const handleEmailValidation = (e) =>{
    setEmail(e.target.value)
    if (!userEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("")
    setEmail(e.target.value)
  }

  const handlePasswordValidation = (e) =>{
    setPassword(e.target.value)
    if (!userPassword.match(/^(?=.*[A-Za-z])(?=.*[!@#$%^&*()])/)) {
      setPasswordError("Your password must contain atleast one letter, number and a special symbol.");
      return;
    }
    setPasswordError("")
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!userPassword.match(/^(?=.*[A-Za-z])(?=.*[!@#$%^&*()])/)) {
      setPasswordError("Your password must contain atleast one letter, number and a special symbol.");
      return;
    }
    setPasswordError("")

    if (userPassword.length < 8 || userPassword.length > 20) {
      setPasswordError("Password must be between 8 and 20 characters");
      return;
    }
    let data = { username: userName, email: userEmail, password: userPassword };
    setEmailError("")
    console.log(data);
    const response = await axios.post("https://fathomless-garden-74281-01ac0e8623bc.herokuapp.com/user-register", {
      data,
    });
    if (response.data.message) {
      setMessage(response.data.message);
      return;
    }
    setMessage("The registration was succesful");
  };

  return (
    <div className="login">
      {!isRegistered && (
        <div>
          <form onSubmit={(e) => handleLogin(e)}>
            <h2>Register</h2>
            <label>
              Username:
              <input
                required
                maxLength={15}
                type="text"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                required
                type="text"
                value={userEmail}
                onChange={(e) => handleEmailValidation(e)}
              />
              <span style={{ color: "red" }}>{emailError}</span>
            </label>
            <br />
            <label>
              Password:
              <input
                required
                minLength={8}
                maxLength={20}
                type="password"
                value={userPassword}
                onChange={(e) => handlePasswordValidation(e)}
              />
              <span style={{ color: "red" }}>{passwordError}</span>
            </label>
            <br />
            <button>Register</button>
          </form>
        </div>
      )}

      {isRegistered && (
        <div>
          <form onSubmit={(e) => handleLogin(e)}>
            <h2>Register</h2>
            <label>
              Username:
              <input
                required
                maxLength={15}
                type="text"
                disabled
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                required
                type="text"
                disabled
                value={userEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                required
                minLength={8}
                maxLength={20}
                disabled
                type="password"
                value={userPassword}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <button disabled>Register</button>
          </form>
        </div>
      )}
      {message && <h1>{message}</h1>}
    </div>
  );
}
export default Register;
