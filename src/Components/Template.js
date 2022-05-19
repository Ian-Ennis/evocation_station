import React from "react";
import { useNavigate } from "react-router-dom";

function Template({ setEvocations, writing, setWriting, image, setImage, sound, setSound }) {
  const navigate = useNavigate();
  const rootURL = `http://localhost:3000`;

  function uploadTemplate(e) {
    e.preventDefault();

    console.log("Writing:", writing)
    console.log("Image:", image)

    fetch("http://localhost:3000/prebuiltevocations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: writing,
        image_url: `${rootURL}${image}`,
      })
    }).then(() => {
      fetch("http://localhost:3000/prebuiltevocations").then((response) => {
        console.log(response);
        if (response.ok) {
          response.json().then((data) => {
            console.log(data)
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
        <b>Template</b>

        {image.length ? <><img src={`${rootURL}${image}`} />
        <button onClick={() => setImage([])}>Detach Image</button>
        </> : null}

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