import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Evocations from "./Evocations";


const Home = ({ currentUser, setCurrentUser, setSignedIn, evocations, setEvocations, setWriting, setImage, setSound }) => {
  const navigate = useNavigate();

  function logout() {
    fetch("http://localhost:3000/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      setCurrentUser(null);
      setSignedIn(false)
      setWriting([])
      setImage([])
      setSound([])
      navigate("/");
    });
  }

  return (
    <div id="home">
      <h1>Welcome, {currentUser.username}</h1>
      <button onClick={logout}>Log out</button>
      <p>
        Welcome! Create your own evocation. An evocation is any combination of
        writing, imagery, and sound, that together convey meaning. There are materials to choose from, and you can upload your own materials too. Be creative
        and see what you can make!
      </p>
      <Evocations evocations={evocations} setEvocations={setEvocations}/>
    </div>
  );
};

export default Home;
