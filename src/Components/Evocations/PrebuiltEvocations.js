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
          console.log("Most recent request to prebuilt evocations:", data)
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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setPrebuiltEvocations([]);
          });
        } else {
          response.json().then(err => {
            console.log("error:", err)
          });
        }
      });
    };

      const evocationData = prebuiltEvocations.map((evocation) => {
        console.log("evocation:", evocation)
        return (
          <div id="evocations" key={uuid().slice(0, 8)}>
            {evocation.image ? (
              <img id="evocation_image" alt="evocation_image" src={`${evocation.image}`} />
            ) : null}
            {evocation.sound ? (
              <audio controls className="audio_controls">
                <source src={`${evocation.sound}`} />
              </audio>
            ) : null}
            {evocation.writing ? (
              <p className="labels">
                <b>{evocation.writing}</b>
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
        <b>Evocations you've created using crafting materials:</b>
      </p>
      <div id="prebuilt_evocations">{evocationData}</div>
    </div>
  );
}

export default PrebuiltEvocations;
