// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewEvocation from "./NewEvocation";

const LoggedIn = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log('in LoggedIn useEffect')
  //   fetch("http://localhost:3000/me")
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log("Status Text:", response.status)
  //         response.json().then(data => {
  //           setCurrentUser(data)
  //           navigate("/home");
  //         })
  //       }
  //     })
  // }, []);

  function logout() {
    fetch("http://localhost:3000/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      setCurrentUser(null);
      navigate("/");
    });
  }

  return (
    <div>
      <h1>Welcome, {currentUser.username}</h1>
      <button onClick={logout}>Log out</button>
      <NewEvocation />
    </div>
  );
};

export default LoggedIn;
