import { useNavigate } from "react-router-dom";

function Template({ setPrebuiltEvocations, writing, setWriting, image, setImage, sound, setSound }) {
  const navigate = useNavigate();
  const rootURL = `https://evocation-station-api.herokuapp.com`;

  function uploadTemplate(e) {
    e.preventDefault();

    fetch(`${rootURL}/prebuiltevocations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: writing,
        image_url: `${image}`,
        sound_url: `${sound}`
      })
    }).then(() => {
      fetch(`${rootURL}/prebuiltevocations`).then((response) => {
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
          <p className="labels"><b>Your Evocation Template:</b></p>
          <div id="controls_template_container">
            <div id="template">
              <div id="selected_materials">
                {image.length ? <div id="template_image"><img id="image" src={`${image}`}/>
                  </div> : null}
                {sound.length ? <>
                  <audio controls>
                    <source src={`${sound}`} />
                  </audio> 
                </> : null}
                {writing.length ? <p className="labels"><b>{writing}</b></p>
                 : null}
              </div>
            </div>
            <div>
              <p className="labels">Template actions:</p>
              <div id="controls">
                {image.length ? <button onClick={() => setImage([])}>Detach Image</button> : null}
                {sound.length ? <button onClick={() => setSound([])}>Detach Sound</button> : null}
                {writing.length ? <button onClick={() => setWriting([])}>Detach Writing</button> : null}
              </div>
                {writing.length || image.length || sound.length ?
                <div id="commit_container"> 
                  <button onClick={(e) => uploadTemplate(e)}><b>Commit Evocation</b></button>
                </div>
                  : null}
             </div>
          </div>
        </>
        : <><p className="labels">Select a specific crafting material..</p>&nbsp;</>}
      </>
    );
}

export default Template;