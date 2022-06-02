import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"
import Template from "./Template";

function Sounds({ setPrebuiltEvocations, writing, setWriting, image, setImage, sound, setSound }) {
    const [sounds, setSounds] = useState([])
    const rootURL = `http://localhost:3000`;

    useEffect(() => {
        fetch("http://localhost:3000/sounds").then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              setSounds(data);
            });
          } else {
            response.json();
            throw Error(response.status, response.statusText);
          }
        });
      }, []);

    function uploadSound(e) {
        e.preventDefault();

        const audio = e.target.audio_upload.files[0];
        const audio_name = e.target.audio_name.value

        const formData = new FormData();
        formData.append("audio", audio);
        formData.append("audio_name", audio_name)

        fetch("http://localhost:3000/sounds", {
          method: "POST",
          body: formData
        }).then(() => {
          fetch("http://localhost:3000/sounds").then((response) => {
            if (response.ok) {
              response.json().then((data) => {
                setSounds(data);
              });
            } else {
              response.json();
              throw Error(response.status, response.statusText);
            }
          })
        });
      }

      const soundData = sounds.map((s) => {
        return (
          <div id="each_sound" key={uuid().slice(0, 8)}>
            <p>&nbsp;{s.audio_name}</p>
            <audio controls>
              <source src={`${rootURL}${s.audio}`} />
            </audio>
            <button onClick={() => setSound(s.audio)}>Select Sound</button>
          </div>
        );
      });

    return (
      <div>
        <Template setPrebuiltEvocations={setPrebuiltEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound} />
        <p><b>Sounds</b></p>
            <form onSubmit={uploadSound}>
              <label for="audio_upload">Upload a sound: </label>
              <input type="file" name="audio_upload" accept="audio/*"></input>
              <label for="audio_name">Name your sound:</label>
              <input type="text" name="audio_name"></input>
              <button type="submit">Submit</button>
            </form>
          <div id="sounds">
            {soundData}
          </div>
      </div>
    );
}

export default Sounds;