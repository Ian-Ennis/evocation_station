import "./index.css"
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./Components/Account/SignUpForm";
import LoginForm from "./Components/Account/LoginForm";
import Home from "./Components/Home";
import Writings from "./Components/Materials/Writings";
import Pictures from "./Components/Materials/Pictures";
import Sounds from "./Components/Materials/Sounds";
import Footer from "./Components/Footer";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [newEvocations, setNewEvocations] = useState([]);
  const [prebuiltEvocations, setPrebuiltEvocations] = useState([])
  const [writing, setWriting] = useState([])
  const [image, setImage] = useState([])
  const [sound, setSound] = useState([])

  return (
    <div id="application">
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm setCurrentUser={setCurrentUser} />} />
        <Route path="/home" element={<Home setCurrentUser={setCurrentUser} currentUser={currentUser} newEvocations={newEvocations} setNewEvocations={setNewEvocations} prebuiltEvocations={prebuiltEvocations} setPrebuiltEvocations={setPrebuiltEvocations} setWriting={setWriting} setImage={setImage} setSound={setSound} />} />
        <Route path="/writings" element={<Writings currentUser={currentUser} prebuiltEvocations={prebuiltEvocations} setPrebuiltEvocations={setPrebuiltEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound} />} />
        <Route path="/images" element={<Pictures currentUser={currentUser} prebuiltEvocations={prebuiltEvocations} setPrebuiltEvocations={setPrebuiltEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound} />} />
        <Route path="/sounds" element={<Sounds currentUser={currentUser} prebuiltEvocations={prebuiltEvocations} setPrebuiltEvocations={setPrebuiltEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
