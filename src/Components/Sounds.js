import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"

function Sounds({ setSound }) {
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
        const formData = new FormData();
        formData.append("audio", audio);

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
            <button onClick={setSound(s.audio)}>Select Sound</button>
          </div>
        );
      });

    return (
      <div>
        Sounds
        <form id="sounds" onSubmit={uploadSound}>
          <label for="audio_upload">Add a sound</label>
          <input type="file" name="audio_upload" accept="audio/*"></input>
          <button type="submit">Submit</button>
        </form>
        {soundData}
      </div>
    );
}

export default Sounds;