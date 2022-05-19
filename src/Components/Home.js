import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewEvocations from "./NewEvocations";
import PrebuiltEvocations from "./PrebuiltEvocations";


const Home = ({ currentUser, setCurrentUser, setSignedIn, newEvocations, setNewEvocations, prebuiltEvocations, setPrebuiltEvocations, setWriting, setImage, setSound }) => {
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
      <NewEvocations newEvocations={newEvocations} setNewEvocations={setNewEvocations}/>
      <PrebuiltEvocations prebuiltEvocations={prebuiltEvocations} setPrebuiltEvocations={setPrebuiltEvocations} />
    </div>
  );
};

export default Home;
