import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"

function NewEvocation() {
  const [posts, setPosts] = useState([]);

  const rootURL = `http://localhost:3000`;

  useEffect(() => {
    fetch("http://localhost:3000/evocations").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setPosts(data);
          console.log('useEffect trigger')
        });
      } else {
        response.json();
        throw Error(response.status, response.statusText);
      }
    })
  }, [])

  function handleFileInput(e) {
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
            setPosts(data);
            console.log('fetch completed')
            console.log(posts)
          });
        } else {
          response.json();
          throw Error(response.status, response.statusText);
        }
      })
    });
  }

  const evocationData = posts.map(p => {
    return (
      <div id="evocations" key={uuid().slice(0,8)}>
        <p>{p.text}</p>
        <img src={`${rootURL}${p.image}`}/>
        <audio controls>
          <source src={`${rootURL}${p.audio}`} type="audio/wav"/>
        </audio>
      </div>
    )
  })

  return (
    <>
      <form id="new_evocation" onSubmit={handleFileInput}>
        <input
          type="file" name="image_upload" accept="image/png, image/jpeg, image/jpg"></input>
        <input type="file" name="audio_upload" accept="audio/*"></input>
        <input type="text" name="text"></input>
        <button type="submit">Submit</button>
      </form>
      {evocationData}
    </>
  );
}

export default NewEvocation;
