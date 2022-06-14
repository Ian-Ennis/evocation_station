import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./Components/SignUpForm";
import LoginForm from "./Components/LoginForm";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Writings from "./Components/Writings";
import Images from "./Components/Images";
import Sounds from "./Components/Sounds";
import "./App.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false)

  const [newEvocations, setNewEvocations] = useState([]);
  const [prebuiltEvocations, setPrebuiltEvocations] = useState([])
  const [writing, setWriting] = useState([])
  const [image, setImage] = useState([])
  const [sound, setSound] = useState([])

  return (
    <div id="application">
      <div id="title">
        <h1>Evocation Station</h1>
      </div>
      <div id="menu_and_main">
      <div id="menu_column">
        {signedIn ? <NavBar /> : null}
      </div>
      <div id="evocation_main">
        <Routes>
          <Route path="/" element={<SignUpForm setCurrentUser={setCurrentUser}/>} />
          <Route path="/login" element={<LoginForm setCurrentUser={setCurrentUser} currentUser={currentUser} setSignedIn={setSignedIn} />} />
          <Route path="/home" element={<Home setCurrentUser={setCurrentUser} currentUser={currentUser} setSignedIn={setSignedIn} newEvocations={newEvocations} setNewEvocations={setNewEvocations} prebuiltEvocations={prebuiltEvocations} setPrebuiltEvocations={setPrebuiltEvocations} setWriting={setWriting} setImage={setImage} setSound={setSound}/>} />
          <Route path="/writings" element={<Writings prebuiltEvocations={prebuiltEvocations} setPrebuiltEvocations={setPrebuiltEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound} />} />
          <Route path="/images" element={<Images prebuiltEvocations={prebuiltEvocations} setPrebuiltEvocations={setPrebuiltEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound} />} />
          <Route path="/sounds" element={<Sounds prebuiltEvocations={prebuiltEvocations} setPrebuiltEvocations={setPrebuiltEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound} />} />
        </Routes>
        <div id="footer">
          <p>Copyright © 2022 by Ian Ennis</p>
          <p>All rights reserved.</p>
          <p>Images provided by https://www.pexels.com/ &nbsp; | &nbsp; Sounds provided by https://freesound.org/</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default App;
