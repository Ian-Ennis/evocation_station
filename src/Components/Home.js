import { useNavigate } from "react-router-dom";
import Title from "./Title";
import NavBar from "./NavBar";
import NewEvocationForm from "./NewEvocationForm";
import NewEvocations from "./NewEvocations";
import PrebuiltEvocations from "./PrebuiltEvocations";

function Home({currentUser, setCurrentUser, newEvocations, setNewEvocations, prebuiltEvocations, setPrebuiltEvocations, setWriting, setImage, setSound}) {
  const navigate = useNavigate();

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
            <h2>Welcome, {localStorage.getItem("current user")}</h2>
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
            <NewEvocationForm
              newEvocations={newEvocations}
              setNewEvocations={setNewEvocations}
              currentUser={currentUser}
            />
            <NewEvocations
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
