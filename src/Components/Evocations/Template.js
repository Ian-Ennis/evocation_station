import { useNavigate } from "react-router-dom";

function Template({
  currentUser,
  setPrebuiltEvocations,
  writing,
  setWriting,
  image,
  setImage,
  sound,
  setSound,
}) {

  const navigate = useNavigate();
  const rootURL = `http://localhost:3000`;

  function uploadTemplate(e) {
    e.preventDefault();
    
    const user_id = currentUser.id
    
    const formData = new FormData();
    formData.append("user_id", user_id)
    if (writing) {
      formData.append("writing", writing);
    }
    if (image) formData.append("image", image);
    if (sound) formData.append("sound", sound);

    fetch(`${rootURL}/prebuiltevocations`, {
      method: "POST",
      headers: {
        Accepts: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    }).then(fetch(`${rootURL}/prebuiltevocations`, {
        method: "GET",
        headers: {
          Accepts: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setPrebuiltEvocations(data);
            navigate("/home");
          });
        } else {
          response.json().then(err => {
            console.log("error:", err)
          });
        }
      })
    )
  }

  return (
    <>
      {writing.length || image.length || sound.length ? (
        <>
          <p className="labels">
            <b>Your Evocation Template:</b>
          </p>
          <div id="controls_template_container">
            <div id="template">
              <div id="selected_materials">
                {image.length ? (
                  <img id="template_image" alt ="template_image" src={`${image}`} />
                ) : null}
                {sound.length ? (
                  <>
                    <audio controls className="audio_controls">
                      <source src={`${sound}`} />
                    </audio>
                  </>
                ) : null}
                {writing.length ? (
                  <p id="template_writing">
                    <b>{writing}</b>
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <p className="labels">Template actions:</p>
              <div id="controls">
                {image.length ? (
                  <button onClick={() => setImage([])}>Detach Image</button>
                ) : null}
                {sound.length ? (
                  <button onClick={() => setSound([])}>Detach Sound</button>
                ) : null}
                {writing.length ? (
                  <button onClick={() => setWriting([])}>Detach Writing</button>
                ) : null}
              </div>
              {writing.length || image.length || sound.length ? (
                <div id="commit_container">
                  <button
                    className="submit_button"
                    onClick={(e) => uploadTemplate(e)}
                  >
                    <b>Commit Evocation</b>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="labels">Select a crafting material</p>&nbsp;
        </>
      )}
    </>
  );
}

export default Template;
