import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"
import Template from "./Template";

function Sounds({ setPrebuiltEvocations, writing, setWriting, image, setImage, sound, setSound }) {
    const [sounds, setSounds] = useState([])
    const rootURL = `http://localhost:3000`;

    const awsSoundTable = [
      {
        id: 1,
        name: "Babbling Brook",
        url: "https://evocation-station.s3.amazonaws.com/o5o2yq8cbrreigovrlh2j1t3btev"
      },
      {
        id: 2,
        name: "Crickets",
        url: "https://evocation-station.s3.amazonaws.com/lew4xxap3naemj83eky8gkj8oqt1"
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

  // function uploadSound(e) {
  //   e.preventDefault();

  //   const audio = e.target.audio_upload.files[0];
  //   const audio_name = e.target.audio_name.value;

  //   const formData = new FormData();
  //   formData.append("audio", audio);
  //   formData.append("audio_name", audio_name);

  //   fetch("http://localhost:3000/sounds", {
  //     method: "POST",
  //     body: formData,
  //   }).then(() => {
  //     fetch("http://localhost:3000/sounds").then((response) => {
  //       if (response.ok) {
  //         response.json().then((data) => {
  //           setSounds(data);
  //         });
  //       } else {
  //         response.json();
  //         throw Error(response.status, response.statusText);
  //       }
  //     });
  //   });
  // }

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
      <div>
        <Template setPrebuiltEvocations={setPrebuiltEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound} />
        <p><b>Sounds</b></p>
            {/* <form onSubmit={uploadSound}>
              <label for="audio_upload">Upload a sound: </label>
              <input type="file" name="audio_upload" accept="audio/*"></input>
              <label for="audio_name">Name your sound:</label>
              <input type="text" name="audio_name"></input>
              <button type="submit">Submit</button>
            </form> */}
          <div id="sounds">
            {soundData}
          </div>
      </div>
    );
}

export default Sounds;