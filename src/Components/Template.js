import React from "react";
import { useNavigate } from "react-router-dom";

function Template({ setNewEvocations, writing, setWriting, image, setImage, sound, setSound }) {
  const navigate = useNavigate();
  const rootURL = `http://localhost:3000`;

  function uploadTemplate(e) {
    e.preventDefault();

    console.log("Writing:", writing)
    console.log("Image:", image)
    console.log("Sound:", sound)

    fetch("http://localhost:3000/prebuiltevocations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: writing,
        image_url: `${rootURL}${image}`,
        sound_url: `${rootURL}${sound}`
      })
    }).then(() => {
      fetch("http://localhost:3000/prebuiltevocations").then((response) => {
        console.log(response);
        if (response.ok) {
          response.json().then((data) => {
            setNewEvocations(data)
            navigate("/home")
          });
        } else {
          response.json();
          throw Error(response.status, response.statusText);
        }
      })
    });
  }

    return (
      <div id="template">
        <b>Your Evocation Template:</b>

        {image.length ? <div id="template_image"><img id="image" src={`${rootURL}${image}`} />
        <button onClick={() => setImage([])}>Detach Image</button>
        </div> : null}

        {writing.length ? <><p>{writing}</p>
        <button onClick={() => setWriting([])}>Detach Writing</button></> : null}

        {sound.length ? <>
        <audio controls>
          <source src={`${rootURL}${sound}`} />
        </audio> 
        <button onClick={() => setSound([])}>Detach Sound</button></> : null}

        {writing.length || image.length || sound.length ? 
          <button onClick={(e) => uploadTemplate(e)}>Submit Evocation</button> : null}

      </div>
    );
}

export default Template;