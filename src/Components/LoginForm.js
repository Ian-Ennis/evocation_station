import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ setCurrentUser }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [noAccount, setNoAccount] = useState(false)
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const userCreds = { ...formData };

    fetch("https://evocation-station-api.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
    }).then((response) => {
      console.log(response)
      if (response.ok) {
        response.json()
        .then((user) => {
          setNoAccount(false);
          setCurrentUser(user);
          setFormData({
            username: "",
            password: "",
          });
          navigate("/home");
        });
      } else {
        setNoAccount(true);
        throw Error(response.status, response.statusText);
      }
    });
  }

  function userNeedsAccount(e) {
    e.preventDefault();
    navigate("/")
    }

  return (
    <div className="auth_background">
      <form className="auth_forms" onSubmit={handleSubmit}>
      <h1>...login</h1>
        <label htmlFor="username">Username:</label>
        <input
          id="username-input"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      <button className="auth_form_switch" onClick={userNeedsAccount}>Create an account</button>
      </form>
      {noAccount ? <div><em>Error: Please double-check your username and/or password.</em></div> : null}
    </div>
  );
};

export default LoginForm;
