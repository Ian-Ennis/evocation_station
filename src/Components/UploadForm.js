import React, { useEffect } from "react";
import { v4 as uuid } from "uuid"

function UploadForm({ newEvocations, setNewEvocations }) {
  const rootURL = `http://localhost:3000`;

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
            console.log(data)
            setNewEvocations(data);
          });
        } else {
          response.json();
          throw Error(response.status, response.statusText);
        }
      })
    });
  }

  return (
    <div id="new_evocations">
      <b>Upload your own materials</b>
      <form id="new_evocation_form" onSubmit={uploadNewEvocation}>
        <label for="text">Writing: </label>
        <textarea name="text"></textarea>
        <label for="image_upload">Add an image: </label>
        <input type="file" name="image_upload" accept="image/png, image/jpeg, image/jpg"></input>
        <label for="audio_upload">Add a sound: </label>
        <input type="file" name="audio_upload" accept="audio/*"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UploadForm;
