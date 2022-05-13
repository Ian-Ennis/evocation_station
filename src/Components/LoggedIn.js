import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Template from "./Template";
import Evocations from "./Evocations";
import Phrases from "./Phrases";
import Poems from "./Poems";
import Images from "./Images";
import Sounds from "./Sounds";

const LoggedIn = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const [writing, setWriting] = useState([])
  const [showWriting, setShowWriting] = useState(false)
  const [clickedWriting, setClickedWriting] = useState([])
  const [imagery, setImagery] = useState([])
  const [showImagery, setShowImagery] = useState(false)
  const [clickedImagery, setClickedImagery] = useState([])
  const [sound, setSound] = useState([])
  const [showSound, setShowSound] = useState(false)
  const [clickedSound, setClickedSound] = useState([])

  function renderWriting(e) {
    e.preventDefault();
    if (!showWriting) {
      setShowWriting(true)
    } else setShowWriting(false)
  }

  function renderImagery(e) {
    e.preventDefault();
    if (!showImagery) {
      setShowImagery(true)
    } else setShowImagery(false)
  }

  function renderSound(e) {
    e.preventDefault();
    if (!showSound) {
      setShowSound(true)
    } else setShowSound(false)
  }

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
      <div>
        Welcome! Create your own evocation. An evocation is any combination of
        writing, imagery, and sound, that together convey meaning. There are materials to choose from, and you can upload your own materials too. Be creative
        and see what you can make!
      </div>
      <Evocations />
      <div id="materials">
      <h3 onClick={renderWriting}>Writing</h3>
      <h3 onClick={renderImagery}>Imagery</h3>
      <h3 onClick={renderSound}>Sounds</h3>
      </div>
      <Template writing={writing} setWriting={setWriting} imagery={imagery} setImagery={setImagery} clickedImagery={clickedImagery} sound={sound} setSound={setSound} clickedSound={clickedSound}/>
      {showWriting ? <div><Phrases /> <Poems /></div> : null}
      {showImagery ? <div><Images setClickedImagery={setClickedImagery}/></div> : null}
      {showSound ? <div><Sounds setClickedSound={setClickedSound}/></div> : null}
    </div>
  );
};

export default LoggedIn;
