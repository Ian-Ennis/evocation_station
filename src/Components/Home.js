import { useNavigate } from "react-router-dom";
import UploadForm from "./UploadForm";
import UploadedEvocations from "./UploadedEvocations";
import PrebuiltEvocations from "./PrebuiltEvocations";


const Home = ({ currentUser, setCurrentUser, setSignedIn, newEvocations, setNewEvocations, prebuiltEvocations, setPrebuiltEvocations, setWriting, setImage, setSound }) => {
  const navigate = useNavigate();

  // console.log(currentUser.id)

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
      <div id="welcome_bar">
        <h1>Welcome, {currentUser.username}</h1>
        <button id="logout_button" onClick={logout}>Log out</button>
      </div>
      <p>
        Welcome! Create your own evocation. An evocation is any combination of
        writing, imagery, and sound, that together convey meaning. There are materials to choose from, and you can upload your own materials too. Be creative
        and see what you can make!
      </p>
      <UploadForm setNewEvocations={setNewEvocations}/>
      <UploadedEvocations newEvocations={newEvocations} setNewEvocations={setNewEvocations}/>
      <PrebuiltEvocations prebuiltEvocations={prebuiltEvocations} setPrebuiltEvocations={setPrebuiltEvocations} />
    </div>
  );
};

export default Home;
