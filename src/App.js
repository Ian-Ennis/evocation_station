import { useState} from "react";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./Components/SignUpForm";
import LoginForm from "./Components/LoginForm";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Writings from "./Components/Writings";
import Images from "./Components/Images";
import Sounds from "./Components/Sounds";
import "./App.css";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

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
      <div id="menu_column">
        <h1>Evocation Station</h1>
        {signedIn ? <NavBar /> : null}
      </div>
      <div id="evocation_main">
        <Routes>
          <Route path="/" element={<SignUpForm setCurrentUser={setCurrentUser}/>} />
          <Route path="/login" element={<LoginForm setCurrentUser={setCurrentUser} currentUser={currentUser} setSignedIn={setSignedIn} />} />
          <Route path="/home" element={<Home setCurrentUser={setCurrentUser} currentUser={currentUser} setSignedIn={setSignedIn} newEvocations={newEvocations} setNewEvocations={setNewEvocations} prebuiltEvocations={prebuiltEvocations} setPrebuiltEvocations={setPrebuiltEvocations} setWriting={setWriting} setImage={setImage} setSound={setSound}/>} />
          <Route path="/writings" element={<Writings newEvocations={newEvocations} setNewEvocations={setNewEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound} />} />
          <Route path="/images" element={<Images newEvocations={newEvocations} setNewEvocations={setNewEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound} />} />
          <Route path="/sounds" element={<Sounds newEvocations={newEvocations} setNewEvocations={setNewEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
