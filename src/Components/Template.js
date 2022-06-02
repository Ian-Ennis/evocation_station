import React from "react";
import { useNavigate } from "react-router-dom";

function Template({ setPrebuiltEvocations, writing, setWriting, image, setImage, sound, setSound }) {
  const navigate = useNavigate();
  const rootURL = `http://localhost:3000`;

  function uploadTemplate(e) {
    e.preventDefault();

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
            setPrebuiltEvocations(data)
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
      <>
        {writing.length || image.length || sound.length ? 
        <>
          <p><b>Your Evocation Template:</b></p>
          <div id="template">
            <div id="actions">
            <p>Actions:</p>
              {writing.length ? <button onClick={() => setWriting([])}>Detach Writing</button> : null}
              {image.length ? <button onClick={() => setImage([])}>Detach Image</button> : null}
              {sound.length ? <button onClick={() => setSound([])}>Detach Sound</button> : null}
              {writing.length || image.length || sound.length ? 
                <button id="commit_evocation" onClick={(e) => uploadTemplate(e)}>Commit Evocation</button>
              : null}
          </div>
          <div id="selected_materials">
            {writing.length ? <><p>{writing}</p>
              </> : null}
            {image.length ? <div id="template_image"><img id="image" src={`${rootURL}${image}`} />
              </div> : null}
            {sound.length ? <>
              <audio controls>
                <source src={`${rootURL}${sound}`} />
              </audio> 
            </> : null}
            </div>
          </div>
        </>
        : null}
      </>
    );
}

export default Template;