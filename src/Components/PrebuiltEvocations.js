import { useEffect } from "react";
import { v4 as uuid } from "uuid";

function PrebuiltEvocations({ prebuiltEvocations, setPrebuiltEvocations }) {
  const rootURL = `http://localhost:3000`;

  useEffect(() => {
    fetch(`${rootURL}/prebuiltevocations`, {
      method: "GET",
      headers: {
        Accepts: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setPrebuiltEvocations(data);
        });
      } else {
        response.json().then(err => {
          console.log("error:", err)
        })
      }
    });
  }, []);

  function deletePrebuiltEvocation(e, evoc) {
    e.preventDefault();

    fetch(`${rootURL}/prebuiltevocations/${evoc.id}`, {
      method: "DELETE",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(() => {
      fetch(`${rootURL}/prebuiltevocations`).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setPrebuiltEvocations(data);
          });
        } else {
          response.json();
          throw Error(response.status, response.statusText);
        }
      });
    });
  }

  const evocationData = prebuiltEvocations.map((evocation) => {
    return (
      <div id="evocations" key={uuid().slice(0, 8)}>
        {evocation.image_url ? (
          <img id="evocation_image" alt="evocation_image" src={`${evocation.image_url}`} />
        ) : null}
        {evocation.sound_url ? (
          <audio controls className="audio_controls">
            <source src={`${evocation.sound_url}`} />
          </audio>
        ) : null}
        {evocation.text ? (
          <p className="labels">
            <b>{evocation.text}</b>
          </p>
        ) : null}
        &nbsp;<div className="bottom_aligner"></div>
        <button
          className="delete_button"
          onClick={(e) => deletePrebuiltEvocation(e, evocation)}
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <div id="prebuilt_evocations_container">
      <p className="labels">
        <b>Example Evocations</b>
      </p>
      <div id="prebuilt_evocations">{evocationData}</div>
    </div>
  );
}

export default PrebuiltEvocations;
