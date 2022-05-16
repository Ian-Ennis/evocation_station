import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Template from "./Template";
import Evocations from "./Evocations";
import Writings from "./Writings";
import Images from "./Images";
import Sounds from "./Sounds";

const LoggedIn = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const [showWriting, setShowWriting] = useState(false)
  const [writing, setWriting] = useState([])

  const [showImagery, setShowImagery] = useState(false)
  const [image, setImage] = useState([])

  const [showSound, setShowSound] = useState(false)
  const [sound, setSound] = useState([])

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
      <Template writing={writing} image={image} sound={sound} />
      {showWriting ? <div><Writings setWriting={setWriting}/> </div> : null}
      {showImagery ? <div><Images setImage={setImage} /></div> : null}
      {showSound ? <div><Sounds setSound={setSound} /></div> : null}
    </div>
  );
};

export default LoggedIn;
