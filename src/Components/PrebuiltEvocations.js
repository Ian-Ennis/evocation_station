import React, { useEffect } from "react";
import { v4 as uuid } from "uuid"

function PrebuiltEvocations({ prebuiltEvocations, setPrebuiltEvocations }) {
    const rootURL = `http://localhost:3000`;

  useEffect(() => {
    console.log("in prebuilt evocations useEffect", prebuiltEvocations)
    fetch("http://localhost:3000/prebuiltevocations").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setPrebuiltEvocations(data);
        });
      } else {
        response.json();
        throw Error(response.status, response.statusText);
      }
    })
  }, [])

  function deletePrebuiltEvocation(e, evoc) {
    e.preventDefault();

    fetch(`http://localhost:3000/prebuiltevocations/${evoc.id}`, {
      method: "DELETE",
    }).then(() => {
      fetch("http://localhost:3000/prebuiltevocations").then((response) => {
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

  const evocationData = prebuiltEvocations.map(evocation => {
    return (
      <div id="evocations" key={uuid().slice(0,8)}>
        {evocation.text ? <p>{evocation.text}</p> : null}
        {evocation.image_url ? <img id="evocation_image" src={`${evocation.image_url}`}/> : null}
        {evocation.sound_url ? <audio controls>
          <source src={`${evocation.sound_url}`}/>
        </audio> : null}
        <button onClick={(e) => deletePrebuiltEvocation(e, evocation)}>Delete</button>
      </div>
    )
  })

  function retrievePrebuiltEvocations(e) {
    e.preventDefault();

    fetch("http://localhost:3000/prebuiltevocations").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setPrebuiltEvocations(data);
        });
      } else {
        response.json();
        throw Error(response.status, response.statusText);
      }
    })
  }

  return (
    <div id="prebuilt_evocations">
        <b>Prebuilt Evocations</b>
      {evocationData}
      {/* <button onClick={(e) => retrievePrebuiltEvocations(e)}>Retrieve prebuilts</button> */}
    </div>
  );
}

export default PrebuiltEvocations;
