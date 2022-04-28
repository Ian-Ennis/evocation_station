import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoggedIn = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  console.log("in logged in");

    fetch("http://localhost:3000/me")
      .then((r) => r.json())
      .then((data) => console.log(data));

  function logout() {
    fetch("http://localhost:3000/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      console.log(r);
      setCurrentUser(null);
      navigate("/");
    });
  }

  return (
    <div>
      <h1>Welcome, {currentUser.username}</h1>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default LoggedIn;
