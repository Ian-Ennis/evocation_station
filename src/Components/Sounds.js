import { v4 as uuid } from "uuid"
import Template from "./Template";

function Sounds({ setPrebuiltEvocations, writing, setWriting, image, setImage, sound, setSound }) {
  
    const awsSoundTable = [
      {
        id: 1,
        name: "Babbling Brook",
        url: "https://evocation-station.s3.amazonaws.com/o5o2yq8cbrreigovrlh2j1t3btev"
      },
      {
        id: 2,
        name: "Crickets",
        url: "https://evocation-station.s3.amazonaws.com/Night_time_crickets.wav"
      },
      {
        id: 3,
        name: "Dinner Party",
        url: "https://evocation-station.s3.amazonaws.com/eihfb9iwq4af9bi397s7zv6fggt8"
      },
      {
        id: 4,
        name: "Breaking Waves",
        url: "https://evocation-station.s3.amazonaws.com/e4ir4czxtc35z2phul71vmg6otx7"
      },
      {
        id: 5,
        name: "Thunder and Rain",
        url: "https://evocation-station.s3.amazonaws.com/d2efb5dpf54q7ih3oiwk4tf1dzrd"
      },
      {
        id: 6,
        name: "Departing",
        url: "https://evocation-station.s3.amazonaws.com/7aehm2zmmo88ni6rv3x45wwn77fm"
      },
      {
        id: 7,
        name: "Symphony",
        url: "https://evocation-station.s3.amazonaws.com/28tbd8zcuk0m3p53aye533ikj4es"
      },
      {
        id: 8,
        name: "Round of Applause",
        url: "https://evocation-station.s3.amazonaws.com/yrjhhsdvfih53y5b4tnbyx058hit"
      }
    ]

  const soundData = awsSoundTable.map(sound => {
    return (
      <div id="each_sound" key={uuid().slice(0, 8)}>
        <p>&nbsp;{sound.name}</p>
        <audio controls>
          <source src={`${sound.url}`} />
        </audio>
        <button onClick={() => setSound(sound.url)}>Select Sound</button>
      </div>
    )
  })

    return (
      <div className="materials">
        <Template setPrebuiltEvocations={setPrebuiltEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound} />
        <p className="labels"><b>Sounds:</b></p>
          <div id="sounds">
            {soundData}
          </div>
      </div>
    );
}

export default Sounds;