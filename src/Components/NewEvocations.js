import React, { useEffect } from "react";
import { v4 as uuid } from "uuid"

function NewEvocations({ newEvocations, setNewEvocations }) {
  const rootURL = `http://localhost:3000`;

  useEffect(() => {
    fetch("http://localhost:3000/newevocations").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setNewEvocations(data);
        });
      } else {
        response.json();
        throw Error(response.status, response.statusText);
      }
    })
  }, [])

  function uploadNewEvocation(e) {
    e.preventDefault();

    const text = e.target.text.value;
    const picture = e.target.image_upload.files[0];
    const audio = e.target.audio_upload.files[0];

    const formData = new FormData();
    if (text) formData.append("text", text);
    if (picture) formData.append("image", picture);
    if (audio) formData.append("audio", audio);

    fetch("http://localhost:3000/newevocations", {
      method: "POST",
      body: formData
    }).then(() => {
      fetch("http://localhost:3000/newevocations").then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setNewEvocations(data);
          });
        } else {
          response.json();
          throw Error(response.status, response.statusText);
        }
      })
    });
  }

  function deleteNewEvocation(e, evoc) {
    e.preventDefault();

    fetch(`http://localhost:3000/newevocations/${evoc.id}`, {
      method: "DELETE",
    }).then(() => {
      fetch("http://localhost:3000/newevocations").then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setNewEvocations(data);
          });
        } else {
          response.json();
          throw Error(response.status, response.statusText);
        }
      });
    });
  }

  const evocationData = newEvocations.map(evocation => {
    return (
      <div id="evocations" key={uuid().slice(0,8)}>
        {evocation.text ? <p>{evocation.text}</p> : null}
        {evocation.image ? <img src={`${rootURL}${evocation.image}`}/> : null}
        {evocation.audio ? <audio controls>
          <source src={`${rootURL}${evocation.audio}`}/>
        </audio> : null}
        <button onClick={(e) => deleteNewEvocation(e, evocation)}>Delete</button>
      </div>
    )
  })

  function retrieveNewEvocations(e) {
    e.preventDefault();

    fetch("http://localhost:3000/newevocations").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setNewEvocations(data);
        });
      } else {
        response.json();
        throw Error(response.status, response.statusText);
      }
    })
  }

  return (
    <div id="new_evocations">
      <b>Make your own</b>
      <form id="new_evocation" onSubmit={uploadNewEvocation}>
        <label for="image_upload">Add an image</label>
        <input type="file" name="image_upload" accept="image/png, image/jpeg, image/jpg"></input>
        <label for="audio_upload">Add a sound</label>
        <input type="file" name="audio_upload" accept="audio/*"></input>
        <label for="text">Writing:</label>
        <textarea name="text"></textarea>
        <button type="submit">Submit</button>
      </form>
      {/* <button onClick={retrieveNewEvocations}>Retrieve evocations</button> */}
      {evocationData}
    </div>
  );
}

export default NewEvocations;
