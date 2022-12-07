import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import parse from "html-react-parser";

function UploadedEvocations({ newEvocations, setNewEvocations }) {
  const rootURL = `http://localhost:3000`;

  useEffect(() => {
    console.log("in useEffect")
    fetch(`${rootURL}/newevocations`, {
      method: "GET",
      headers: {
        Accepts: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log("new evocation data:", data)
          setNewEvocations(data);
        });
      } else {
        response.json().then(err => {
          console.log("error:", err)
        })
      }
    });
  }, []);

  function deleteNewEvocation(e, evoc) {
    e.preventDefault();

    fetch(`${rootURL}/newevocations/${evoc.id}`, {
      method: "DELETE",
      headers: {
        Accepts: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(() => {
      fetch(`${rootURL}/newevocations/`, {
        method: "GET",
        headers: {
          Accepts: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
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

  const evocationData = newEvocations.map((evocation) => {
    return (
      <div id="evocations" key={uuid().slice(0, 8)}>
        {evocation.image ? (
          <img id="evocation_image" alt="evocation_image" src={`${rootURL}${evocation.image}`} />
        ) : null}
        {evocation.audio ? (
          <audio controls className="audio_controls">
            <source src={`${rootURL}${evocation.audio}`} />
          </audio>
        ) : null}
        {evocation.text ? <>{parse(evocation.text)}</> : null}
        &nbsp;
        <button
          className="delete_button"
          onClick={(e) => deleteNewEvocation(e, evocation)}
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <div id="uploaded_evocations_container">
      <p className="labels">
        <b>Evocations you've made from scratch:</b>
      </p>
      <div id="uploaded_evocations">{evocationData}</div>
    </div>
  );
}

export default UploadedEvocations;
