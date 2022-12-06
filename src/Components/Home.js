import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import NavBar from "./NavBar";
import UploadForm from "./UploadForm";
import UploadedEvocations from "./UploadedEvocations";
import PrebuiltEvocations from "./PrebuiltEvocations";

function Home({currentUser, setCurrentUser, newEvocations, setNewEvocations, prebuiltEvocations, setPrebuiltEvocations, setWriting, setImage, setSound}) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("in App use effect")
  })
  
  function logout() {
    // fetch("https://evocation-station-api.herokuapp.com/logout", {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((response) => {
    //   setWriting([]);
    //   setImage([]);
    //   setSound([]);
    //   setCurrentUser(null);
    //   navigate("/");
    // });
    setWriting([]);
    setImage([]);
    setSound([]);
    setCurrentUser(null);
    localStorage.clear()
    navigate("/");
  }

  return (
    <>
      <div id="home">
        <Title />
        <NavBar />
        <div id="evocation_main">
          <button id="logout_btn" onClick={logout}>
            Log out
          </button>
          <div id="welcome_bar">
            <h2>Welcome, {currentUser.username}</h2>
          </div>
          &nbsp;
          <div id="evocation_elements">
            <p id="user_directions">
              Create your own evocation. An evocation is any combination of
              writing, imagery, and sound, that together convey meaning. There
              are crafting materials to choose from on the left, or you can
              upload your own materials using the form below. Be creative, have
              fun, and see what you can make!
            </p>
            <UploadForm
              newEvocations={newEvocations}
              setNewEvocations={setNewEvocations}
            />
            <UploadedEvocations
              newEvocations={newEvocations}
              setNewEvocations={setNewEvocations}
            />
            <PrebuiltEvocations
              prebuiltEvocations={prebuiltEvocations}
              setPrebuiltEvocations={setPrebuiltEvocations}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
