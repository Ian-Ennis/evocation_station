import { v4 as uuid } from "uuid";
import Title from "../Title";
import NavBar from "../NavBar"
import Template from "../Evocations/Template";

function Sounds({
  currentUser,
  setPrebuiltEvocations,
  writing,
  setWriting,
  image,
  setImage,
  sound,
  setSound,
}) {
  
  const awsSoundTable = [
    {
      id: 1,
      name: "Babbling Brook",
      url: "https://evocation-station.s3.amazonaws.com/Audio_Stream",
    },
    {
      id: 2,
      name: "Crickets",
      url: "https://evocation-station.s3.amazonaws.com/Audio_Nighttime_Crickets",
    },
    {
      id: 3,
      name: "Dinner Party",
      url: "https://evocation-station.s3.amazonaws.com/Audio_Dinner_Party",
    },
    {
      id: 4,
      name: "Breaking Waves",
      url: "https://evocation-station.s3.amazonaws.com/Audio_Breaking_Waves",
    },
    {
      id: 5,
      name: "Thunder and Rain",
      url: "https://evocation-station.s3.amazonaws.com/Audio_Thunderstorm",
    },
    {
      id: 6,
      name: "Departing",
      url: "https://evocation-station.s3.amazonaws.com/Audio_Train_Station",
    },
    {
      id: 7,
      name: "Symphony",
      url: "https://evocation-station.s3.amazonaws.com/Audio_Symphony",
    },
    {
      id: 8,
      name: "Round of Applause",
      url: "https://evocation-station.s3.amazonaws.com/Audio_Cheering",
    },
  ];

  const soundData = awsSoundTable.map((sound) => {
    return (
      <div id="each_sound" key={uuid().slice(0, 8)}>
        <p>&nbsp;{sound.name}</p>
        <audio controls className="audio_controls">
          <source src={`${sound.url}`} />
        </audio>
        &nbsp;
        <button id="select_sound_button" onClick={() => setSound(sound.url)}>
          Select Sound
        </button>
      </div>
    );
  });

  return (
    <>
      <Title />
      <NavBar />
      <div className="materials">
        <Template
          currentUser={currentUser}
          setPrebuiltEvocations={setPrebuiltEvocations}
          writing={writing}
          setWriting={setWriting}
          image={image}
          setImage={setImage}
          sound={sound}
          setSound={setSound}
        />
        <p className="labels">
          <b>Sounds:</b>
        </p>
        <div id="sounds">{soundData}</div>
      </div>
    </>
  );
}

export default Sounds;
