import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [accountExists, setAccountExists] = useState(false);
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

    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log("data:", data)
          localStorage.setItem("token", data.jwt);
          setAccountExists(false);
          setFormData({
            username: "",
            password: "",
          });
          navigate("/login");
        });
      } else {
        response.json().then((err) => {
          console.log("login response is bad")
          setAccountExists(true)
          console.log(err);
        });
      }
    });
  }

  function userHasAccount(e) {
    e.preventDefault();
    navigate("/login");
  }

  return (
    <div className="auth_background">
      <form className="auth_forms" onSubmit={handleSubmit}>
        <h1>...sign up</h1>
          <label htmlFor="username">Username</label>
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
        <button className="auth_form_switch" onClick={userHasAccount}>
          Have an account?
        </button>
        {accountExists ? (
          <div id="account_exists">
            An account already exists with this username/password. Please log
            in.
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default SignupForm;
