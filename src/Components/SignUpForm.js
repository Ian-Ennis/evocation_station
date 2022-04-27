import React, { useState } from "react";
import LoginForm from "./LoginForm";

const SignupForm = ({ setCurrentUser }) => {
  const [hasAccount, setHasAccount] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(...formData, e.target.name, e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    const userCreds = { ...formData };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log("response is okay, here's the user:", user);
          setCurrentUser(user);
          setFormData({
            username: "",
            password: "",
          });
        });
      } else {
        res.json().then((errors) => {
          console.error(errors);
        });
      }
    });
  }

  function userHasAccount() {
    setHasAccount(true);
  }

  return (
    <>
      {!hasAccount ? (
        <>
          <h1>Sign up here!</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              id="username-signup-input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <label htmlFor="password">Password:</label>
            <input
              id="password-signup-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          <button onClick={userHasAccount}>Have an account?</button>
        </>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default SignupForm;
