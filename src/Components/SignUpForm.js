import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm({ setCurrentUser }) {
  const [formData, setFormData] = useState({username: "", password: ""});
  const [accountExists, setAccountExists] = useState(false)

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

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
    }).then((res) => {
      if (res.ok) {
        console.log(res.ok)
        res.json()
        .then((user) => {
          console.log("response is okay, here's the user:", user);
          setAccountExists(false)
          setCurrentUser(user);
          localStorage.setItem('user', user.id)
          setFormData({
            username: "",
            password: "",
          });
          navigate("/login");
        });
      } else {res.json()
        setAccountExists(true)
        throw Error(res.status, res.statusText)
      }
    });
  }

  function userHasAccount(e) {
    e.preventDefault();
    navigate("/login")
  }

  return (
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
      {accountExists ? <div>An account already exists with this username/password. Please log in.</div> : null}
    </>
  );
}

export default SignupForm;
