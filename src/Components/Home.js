import { useNavigate } from "react-router-dom";
import Title from "./Title";
import Menu from "./Menu";
import UploadForm from "./UploadForm";
import UploadedEvocations from "./UploadedEvocations";
import PrebuiltEvocations from "./PrebuiltEvocations";

const Home = ({
  currentUser,
  setCurrentUser,
  newEvocations,
  setNewEvocations,
  prebuiltEvocations,
  setPrebuiltEvocations,
  setWriting,
  setImage,
  setSound,
}) => {
  const navigate = useNavigate();

  function logout() {
    fetch("https://evocation-station-api.herokuapp.com/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setWriting([]);
      setImage([]);
      setSound([]);
      setCurrentUser(null);
      navigate("/");
    });
  }

  return (
    <>
      <div id="home">
        <Title />
        <Menu />
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
              fun, and see what you can make.
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


/* // function sortTitlesAscending( a, b ) {
  //   if ( a.title < b.title ){
  //     return -1;
  //   }
  //   if ( a.title > b.title ){
  //     return 1;
  //   }
  //   return 0;
  // }

  // function sortStartTimesAscending( a, b ) {
  //   if ( a.scheduledStartTime < b.scheduledStartTime ){
  //     return -1;
  //   }
  //   if ( a.scheduledStartTime > b.scheduledStartTime ){
  //     return 1;
  //   }
  //   return 0;
  // }

  // const titlesAscending = shows.sort( sortTitlesAscending )
  // console.log("titles ascending:", titlesAscending)

  // const startTimesAscending = shows.sort( sortStartTimesAscending )
  // console.log("start times ascending:", startTimesAscending)

  // const titlesAsc = shows.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
  // console.log("titles ascending:", titlesAsc)
  // const titlesDesc = undefined;
  // const startTimeAsc = shows.sort((a,b) => (a.scheduledStartTime > b.scheduledStartTime) ? 1 : ((b.scheduledStartTime > a.scheduledStartTime) ? -1 : 0));
  // console.log("start times ascending:", startTimeAsc)
  // const startTimeDesc = undefined; */