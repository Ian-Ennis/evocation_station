import React, { useEffect } from "react";
import { v4 as uuid } from "uuid"

function PrebuiltEvocations({ prebuiltEvocations, setPrebuiltEvocations }) {
    const rootURL = `https://murmuring-caverns-44222.herokuapp.com`;

  useEffect(() => {
    fetch(`${rootURL}/prebuiltevocations`).then((response) => {
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

    fetch(`${rootURL}/prebuiltevocations/${evoc.id}`, {
      method: "DELETE",
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

  const evocationData = prebuiltEvocations.map(evocation => {
    return (
      <div id="evocations" key={uuid().slice(0,8)}>
        {evocation.text ? <p className="labels"><b>{evocation.text}</b></p> : null}
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

    fetch(`${rootURL}/prebuiltevocations`).then((response) => {
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
    </div>
  );
}

export default PrebuiltEvocations;
