import React from "react";
import { useNavigate } from "react-router-dom";

function Template({ setEvocations, writing, setWriting, image, setImage, sound, setSound }) {
  const navigate = useNavigate();
  const rootURL = `http://localhost:3000`;

  function uploadTemplate(e) {
    e.preventDefault();

    // const formData = new FormData();
    // if (writing) formData.append("text", writing);
    // if (image) formData.append("image", `${rootURL}${image}`);
    // if (sound) formData.append("audio", `${rootURL}${sound}`);

    // console.log("text:", writing)
    // console.log("image:", `${rootURL}${image}`)
    // console.log("audio:", `${rootURL}${sound}`)


    fetch("http://localhost:3000/evocations", {
      method: "POST",
      body: JSON.stringify({
        text: writing,
        image_url: `${rootURL}${image}`,
        audio_url: `${rootURL}${sound}`
      })
    }).then(() => {
      fetch("http://localhost:3000/evocations").then((response) => {
        console.log(response);
        if (response.ok) {
          response.json().then((data) => {
            console.log(data)
            // setEvocations(data);
            // navigate("/home")
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

        {writing.length ? <><p>{writing}</p>
        <button onClick={() => setWriting([])}>Detach Writing</button></> : null}

        {image.length ? <><img src={`${rootURL}${image}`} />
        <button onClick={() => setImage([])}>Detach Image</button>
        </> : null}

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