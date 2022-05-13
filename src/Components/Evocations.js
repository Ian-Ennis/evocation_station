import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"

function Evocations() {
  const [evocations, setEvocations] = useState([]);
  const rootURL = `http://localhost:3000`;

  useEffect(() => {
    fetch("http://localhost:3000/evocations").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log('evocations useEffect trigger')
          setEvocations(data);
        });
      } else {
        response.json();
        throw Error(response.status, response.statusText);
      }
    })
  }, [])

  function uploadEvocation(e) {
    e.preventDefault();

    const image = e.target.image_upload.files[0];
    const audio = e.target.audio_upload.files[0];
    const text = e.target.text.value;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("audio", audio);
    formData.append("text", text);

    fetch("http://localhost:3000/evocations", {
      method: "POST",
      body: formData
    }).then(() => {
      fetch("http://localhost:3000/evocations").then((response) => {
        console.log(response);
        if (response.ok) {
          response.json().then((data) => {
            setEvocations(data);
            console.log(evocations)
          });
        } else {
          response.json();
          throw Error(response.status, response.statusText);
        }
      })
    });
  }

  function deleteEvocation(e, evoc) {
    e.preventDefault();

    fetch(`http://localhost:3000/evocations/${evoc.id}`, {
      method: "DELETE",
    }).then(() => {
      fetch("http://localhost:3000/evocations").then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setEvocations(data);
          });
        } else {
          response.json();
          throw Error(response.status, response.statusText);
        }
      });
    });
  }

  const evocationData = evocations.map(evocation => {
    return (
      <div id="evocations" key={uuid().slice(0,8)}>
        <p>{evocation.text}</p>
        <img src={`${rootURL}${evocation.image}`}/>
        <audio controls>
          <source src={`${rootURL}${evocation.audio}`}/>
        </audio>
        <button onClick={(e) => deleteEvocation(e, evocation)}>Delete</button>
      </div>
    )
  })

  function retrieveEvocations(e) {
    e.preventDefault();

    fetch("http://localhost:3000/evocations").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setEvocations(data);
        });
      } else {
        response.json();
        throw Error(response.status, response.statusText);
      }
    })
  }

  return (
    <>
      <form id="new_evocation" onSubmit={uploadEvocation}>
        <label for="image_upload">Add an image</label>
        <input type="file" name="image_upload" accept="image/png, image/jpeg, image/jpg"></input>
        <label for="audio_upload">Add a sound</label>
        <input type="file" name="audio_upload" accept="audio/*"></input>
        <label for="text">Writing:</label>
        <textarea name="text"></textarea>
        <button type="submit">Submit</button>
      </form>
      <button onClick={retrieveEvocations}>Retrieve evocations</button>
      {evocationData}
    </>
  );
}

export default Evocations;
