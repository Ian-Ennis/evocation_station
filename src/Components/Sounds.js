import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"
import Template from "./Template";

function Sounds({ evocations, setEvocations, writing, setWriting, image, setImage, sound, setSound }) {
    const [sounds, setSounds] = useState([])
    const rootURL = `http://localhost:3000`;

    useEffect(() => {
        fetch("http://localhost:3000/sounds").then((response) => {
          console.log(response);
          if (response.ok) {
            response.json().then((data) => {
              setSounds(data);
              console.log(sounds)
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
            console.log(response);
            if (response.ok) {
              response.json().then((data) => {
                  console.log(data)
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
          <div id="soundData" key={uuid().slice(0, 8)}>
            <audio controls>
              <source src={`${rootURL}${s.audio}`} />
            </audio>
            <p>{s.audio_name}</p>
            <button onClick={() => setSound(s.audio)}>Select Sound</button>
          </div>
        );
      });

    return (
      <div id="sounds">
        <Template setEvocations={setEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound} />
        Sounds
        <form id="sounds" onSubmit={uploadSound}>
          <label for="audio_upload">Add a sound</label>
          <input type="file" name="audio_upload" accept="audio/*"></input>
          <label for="audio_name">Name your sound:</label>
          <input type="text" name="audio_name"></input>
          <button type="submit">Submit</button>
        </form>
        {soundData}
      </div>
    );
}

export default Sounds;