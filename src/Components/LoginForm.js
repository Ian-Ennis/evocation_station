import React, { useState } from "react";
import SignupForm from "./SignUpForm";

const LoginForm = ({ setCurrentUser }) => {
  const [needsAccount, setNeedsAccount] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const userCreds = { ...formData };

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log(user);
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
  };

  function userNeedsAccount() {
    setNeedsAccount(true)
  }

  //   handle logout functionality
  const handleLogout = () => {
    fetch("http://localhost:3000/logout", { method: "DELETE" }).then((res) => {
      if (res.ok) {
        setCurrentUser(null);
      }
    });
  };

  return (
    <>
      {!needsAccount ? (
        <>
          <h1>Login here!</h1>
          <form onSubmit={handleSubmit}>
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
          </form>
          <button onClick={userNeedsAccount}>Create an account</button>
        </>
      ) : (
        <SignupForm />
      )}
    </>
  );
};

export default LoginForm;
